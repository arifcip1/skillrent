-- ========================================================
-- SKILLRENT ADVANCED SEED DATA (Gigs, Orders, Escrow Transactions)
-- Jalankan query ini di SQL Editor Supabase Anda
-- ========================================================

-- 1. Bersihkan data lama
TRUNCATE TABLE public.messages CASCADE;
TRUNCATE TABLE public.escrow_transactions CASCADE;
TRUNCATE TABLE public.orders CASCADE;
TRUNCATE TABLE public.gigs CASCADE;

-- 2. Update profil pengguna
UPDATE public.profiles SET
  university = 'Universitas Indonesia',
  is_verified = true,
  avatar_url = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
WHERE email = 'aditya.pratama@ui.ac.id';

UPDATE public.profiles SET
  university = 'Institut Teknologi Bandung',
  is_verified = true,
  avatar_url = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
WHERE email = 'siti.aminah@itb.ac.id';

UPDATE public.profiles SET
  full_name = 'M. ARIF (Batik Nusantara Store)',
  university = 'Batik Nusantara Store',
  is_verified = true,
  avatar_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
WHERE email = 'arif@batiknusantara.com';

-- 3. Insert Gigs Layanan Mahasiswa
INSERT INTO public.gigs (id, user_id, title, category, price, description, image_url, rating, reviews_count)
VALUES
  (
    'd1111111-1111-1111-1111-111111111111',
    (SELECT id FROM public.profiles WHERE email = 'aditya.pratama@ui.ac.id'),
    'Redesign Website UMKM & E-Commerce Modern',
    'Web Development',
    5000000,
    'Layanan pembuatan UI/UX & Redesign website UMKM profesional berbasis React/Next.js dengan integrasi sistem pembayaran otomatis.',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    4.9, 124
  ),
  (
    'd2222222-2222-2222-2222-222222222222',
    (SELECT id FROM public.profiles WHERE email = 'siti.aminah@itb.ac.id'),
    'Desain Logo & Identitas Brand Startup EduTech',
    'Desain Grafis',
    4500000,
    'Pembuatan identitas visual brand lengkap: Logo minimalis, kartu nama, panduan warna, dan aset media sosial.',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    5.0, 89
  );

-- 4. Insert Orders (Status: in_review, Current Milestone: 2)
INSERT INTO public.orders (id, gig_id, client_id, freelancer_id, status, current_milestone_step, requirement_submitted, requirement_notes, total_price)
VALUES
  (
    'e1111111-1111-1111-1111-111111111111',
    'd1111111-1111-1111-1111-111111111111',
    (SELECT id FROM public.profiles WHERE email = 'arif@batiknusantara.com'),
    (SELECT id FROM public.profiles WHERE email = 'aditya.pratama@ui.ac.id'),
    'in_review',
    2,
    true,
    'Tolong gunakan skema warna dominan Merah Marun dan Emas yang mencerminkan motif batik Nusantara.',
    5000000
  );

-- 5. Insert Escrow Transaction Parsial (Tahap 1 Telah Cair dengan Potongan Komisi 15%)
INSERT INTO public.escrow_transactions (id, order_id, milestone_step, gross_amount, platform_fee_percent, platform_fee_amount, net_freelancer_amount, status, auto_approved, released_at)
VALUES
  (
    gen_random_uuid(),
    'e1111111-1111-1111-1111-111111111111',
    1,
    1250000,
    15.0,
    187500,
    1062500,
    'released',
    false,
    NOW() - INTERVAL '1 day'
  );

-- 6. Insert Messages Interaktif
INSERT INTO public.messages (id, order_id, sender_id, text, created_at)
VALUES
  (
    gen_random_uuid(),
    'e1111111-1111-1111-1111-111111111111',
    (SELECT id FROM public.profiles WHERE email = 'aditya.pratama@ui.ac.id'),
    'Halo Pak M. ARIF! Saya Aditya dari UI. Desain wireframe & mockup UI Tahap 2 untuk Redesign Website Batik Nusantara Store sudah selesai saya upload di sistem.',
    NOW() - INTERVAL '2 hours'
  ),
  (
    gen_random_uuid(),
    'e1111111-1111-1111-1111-111111111111',
    (SELECT id FROM public.profiles WHERE email = 'arif@batiknusantara.com'),
    'Hasilnya sangat bagus dan responsif sekali Aditya! Saya sedang meninjau berkasnya.',
    NOW() - INTERVAL '1 hour'
  );

-- ========================================================
-- SELESAI! Data Advanced Escrow telah di-seed dengan sukses.
-- ========================================================
