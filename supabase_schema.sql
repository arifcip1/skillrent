-- ========================================================
-- SKILLRENT SUPABASE DATABASE SCHEMA (ADVANCED ESCROW TAHAP 2)
-- Jalankan query ini di SQL Editor dashboard Supabase Anda
-- ========================================================

-- 1. Tabel Profil User (public.profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  campus_email TEXT,
  university TEXT,
  role TEXT CHECK (role IN ('freelancer', 'client')) NOT NULL DEFAULT 'freelancer',
  is_verified BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile." 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Trigger Otomatis Pembuatan Profil saat Sign Up Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, campus_email, university, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'User Baru'),
    new.email,
    new.raw_user_meta_data->>'campus_email',
    new.raw_user_meta_data->>'university',
    COALESCE(new.raw_user_meta_data->>'role', 'freelancer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Tabel Jasa / Gigs
CREATE TABLE IF NOT EXISTS public.gigs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price INT NOT NULL,
  description TEXT,
  image_url TEXT,
  rating NUMERIC(2,1) DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gigs are viewable by everyone." ON public.gigs FOR SELECT USING (true);
CREATE POLICY "Freelancers can create gigs." ON public.gigs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Tabel Orders (Diperluas dengan Status & Current Milestone)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gig_id UUID REFERENCES public.gigs(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  freelancer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN (
    'pending_requirement',
    'in_progress',
    'in_review',
    'in_revision',
    'completed',
    'disputed',
    'cancelled'
  )) DEFAULT 'pending_requirement',
  current_milestone_step INT DEFAULT 1,
  requirement_submitted BOOLEAN DEFAULT FALSE,
  requirement_notes TEXT,
  total_price INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders." ON public.orders FOR SELECT 
  USING (auth.uid() = client_id OR auth.uid() = freelancer_id);

-- 5. Tabel Transaksi Escrow Parsial (public.escrow_transactions)
CREATE TABLE IF NOT EXISTS public.escrow_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  milestone_step INT NOT NULL,
  gross_amount INT NOT NULL,
  platform_fee_percent NUMERIC(4,1) NOT NULL DEFAULT 15.0,
  platform_fee_amount INT NOT NULL,
  net_freelancer_amount INT NOT NULL,
  status TEXT CHECK (status IN ('locked', 'released', 'disputed_held', 'refunded')) DEFAULT 'locked',
  auto_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  released_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.escrow_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Order participants can view escrow transactions" 
ON public.escrow_transactions FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE id = escrow_transactions.order_id 
  AND (client_id = auth.uid() OR freelancer_id = auth.uid())
));

-- 6. Fungsi Agregasi Saldo Freelancer On-the-Fly
CREATE OR REPLACE FUNCTION public.get_freelancer_balance(target_freelancer_id UUID)
RETURNS INT AS $$
DECLARE
  total_balance INT;
BEGIN
  SELECT COALESCE(SUM(t.net_freelancer_amount), 0)
  INTO total_balance
  FROM public.escrow_transactions t
  JOIN public.orders o ON t.order_id = o.id
  WHERE o.freelancer_id = target_freelancer_id
    AND t.status = 'released';
    
  RETURN total_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Tabel Messages / Chat
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  text TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Order participants can view messages." ON public.messages FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.orders WHERE id = messages.order_id 
    AND (client_id = auth.uid() OR freelancer_id = auth.uid())
  ));
CREATE POLICY "Order participants can send messages." ON public.messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);
