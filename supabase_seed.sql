-- ========================================================
-- SKILLRENT SEED DATA (Gigs, Orders, Messages)
-- Jalankan SETELAH 3 akun sudah terdaftar via Register
-- ========================================================

-- Bersihkan data lama (profil tidak dihapus, hanya di-update)
TRUNCATE TABLE public.messages CASCADE;
TRUNCATE TABLE public.orders CASCADE;
TRUNCATE TABLE public.gigs CASCADE;

-- Update profil dengan info lengkap (universitas, avatar, verifikasi)
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

-- Insert Gigs (layanan freelancer)
INSERT INTO public.gigs (id, user_id, title, category, price, description, image_url, rating, reviews_count)
VALUES
  (
    gen_random_uuid(),
    (SELECT id FROM public.profiles WHERE email = 'aditya.pratama@ui.ac.id'),
    'Redesign Website UMKM & E-Commerce Modern',
    'Web Development',
    15000000,
    'Layanan pembuatan UI/UX & Redesign website UMKM profesional berbasis React/Next.js dengan integrasi sistem pembayaran otomatis.',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    4.9, 124
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM public.profiles WHERE email = 'siti.aminah@itb.ac.id'),
    'Desain Logo & Identitas Brand Startup EduTech',
    'Desain Grafis',
    4500000,
    'Pembuatan identitas visual brand lengkap: Logo minimalis, kartu nama, panduan warna, dan aset media sosial.',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    5.0, 89
  );

-- Insert Orders (hubungkan Klien M. ARIF -> Freelancer Aditya)
INSERT INTO public.orders (id, gig_id, client_id, freelancer_id, status, total_price, escrow_released)
VALUES
  (
    gen_random_uuid(),
    (SELECT id FROM public.gigs WHERE title = 'Redesign Website UMKM & E-Commerce Modern' LIMIT 1),
    (SELECT id FROM public.profiles WHERE email = 'arif@batiknusantara.com'),
    (SELECT id FROM public.profiles WHERE email = 'aditya.pratama@ui.ac.id'),
    'active',
    15000000,
    false
  );

-- Insert Messages (Chat antara M. ARIF dan Aditya)
INSERT INTO public.messages (id, order_id, sender_id, text, created_at)
VALUES
  (
    gen_random_uuid(),
    (SELECT id FROM public.orders LIMIT 1),
    (SELECT id FROM public.profiles WHERE email = 'aditya.pratama@ui.ac.id'),
    'Halo Pak M. ARIF! Saya Aditya dari UI. Desain wireframe & mockup UI tahap pertama untuk Redesign Website Batik Nusantara Store sudah selesai saya upload di sistem.',
    NOW() - INTERVAL '2 hours'
  ),
  (
    gen_random_uuid(),
    (SELECT id FROM public.orders LIMIT 1),
    (SELECT id FROM public.profiles WHERE email = 'arif@batiknusantara.com'),
    'Hasilnya sangat bagus dan responsif sekali Aditya! Saya dan tim sangat suka motif batik modernnya. Silakan lanjut ke tahap pembuatan frontend-nya ya.',
    NOW() - INTERVAL '1 hour'
  );

-- ========================================================
-- SELESAI! Data Gigs, Orders, dan Messages sudah terisi.
-- Login: arif@batiknusantara.com / SkillRent123! (Klien)
-- Login: aditya.pratama@ui.ac.id / SkillRent123! (Freelancer)
-- Login: siti.aminah@itb.ac.id / SkillRent123! (Freelancer)
-- ========================================================
