-- ========================================================
-- SKILLRENT REAL SEED DATA (DATA USER, GIGS, ORDERS, CHAT)
-- Jalankan query ini di SQL Editor Supabase kamu
-- ========================================================

-- 1. Bersihkan Data Lama
TRUNCATE TABLE public.messages CASCADE;
TRUNCATE TABLE public.orders CASCADE;
TRUNCATE TABLE public.gigs CASCADE;
TRUNCATE TABLE public.profiles CASCADE;

-- Hapus seed users lama di auth (agar bisa di-insert ulang dengan password yang benar)
DELETE FROM auth.identities WHERE user_id IN (
  'a1111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222',
  'a3333333-3333-3333-3333-333333333333', 'a4444444-4444-4444-4444-444444444444',
  'c1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222',
  'c3333333-3333-3333-3333-333333333333'
);
DELETE FROM auth.users WHERE id IN (
  'a1111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222',
  'a3333333-3333-3333-3333-333333333333', 'a4444444-4444-4444-4444-444444444444',
  'c1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222',
  'c3333333-3333-3333-3333-333333333333'
);

-- 2. Buat User di auth.users TERLEBIH DAHULU (agar foreign key profiles_id_fkey terpenuhi)
-- Password default: SkillRent123! (sudah di-hash dengan bcrypt)
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, aud, role, raw_app_meta_data, raw_user_meta_data, confirmation_token)
VALUES
  ('a1111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'aditya.pratama@ui.ac.id', crypt('SkillRent123!', gen_salt('bf', 10)), NOW(), NOW(), NOW(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"full_name":"Aditya Pratama"}', ''),
  ('a2222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'siti.aminah@itb.ac.id', crypt('SkillRent123!', gen_salt('bf', 10)), NOW(), NOW(), NOW(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"full_name":"Siti Aminah"}', ''),
  ('a3333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'rizky.ramadhan@ugm.ac.id', crypt('SkillRent123!', gen_salt('bf', 10)), NOW(), NOW(), NOW(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"full_name":"Rizky Ramadhan"}', ''),
  ('a4444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'farah.quinn@its.ac.id', crypt('SkillRent123!', gen_salt('bf', 10)), NOW(), NOW(), NOW(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"full_name":"Farah Quinn"}', ''),
  ('c1111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'arif@batiknusantara.com', crypt('SkillRent123!', gen_salt('bf', 10)), NOW(), NOW(), NOW(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"full_name":"M. ARIF"}', ''),
  ('c2222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'budi@edutech.id', crypt('SkillRent123!', gen_salt('bf', 10)), NOW(), NOW(), NOW(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"full_name":"Budi Santoso"}', ''),
  ('c3333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'sarah@techflow.io', crypt('SkillRent123!', gen_salt('bf', 10)), NOW(), NOW(), NOW(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{"full_name":"Sarah Wijaya"}', '')
ON CONFLICT (id) DO NOTHING;

-- Buat identity records agar user bisa login
INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
VALUES
  ('a1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', '{"sub":"a1111111-1111-1111-1111-111111111111","email":"aditya.pratama@ui.ac.id"}', 'email', 'a1111111-1111-1111-1111-111111111111', NOW(), NOW(), NOW()),
  ('a2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', '{"sub":"a2222222-2222-2222-2222-222222222222","email":"siti.aminah@itb.ac.id"}', 'email', 'a2222222-2222-2222-2222-222222222222', NOW(), NOW(), NOW()),
  ('a3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', '{"sub":"a3333333-3333-3333-3333-333333333333","email":"rizky.ramadhan@ugm.ac.id"}', 'email', 'a3333333-3333-3333-3333-333333333333', NOW(), NOW(), NOW()),
  ('a4444444-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', '{"sub":"a4444444-4444-4444-4444-444444444444","email":"farah.quinn@its.ac.id"}', 'email', 'a4444444-4444-4444-4444-444444444444', NOW(), NOW(), NOW()),
  ('c1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', '{"sub":"c1111111-1111-1111-1111-111111111111","email":"arif@batiknusantara.com"}', 'email', 'c1111111-1111-1111-1111-111111111111', NOW(), NOW(), NOW()),
  ('c2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', '{"sub":"c2222222-2222-2222-2222-222222222222","email":"budi@edutech.id"}', 'email', 'c2222222-2222-2222-2222-222222222222', NOW(), NOW(), NOW()),
  ('c3333333-3333-3333-3333-333333333333', 'c3333333-3333-3333-3333-333333333333', '{"sub":"c3333333-3333-3333-3333-333333333333","email":"sarah@techflow.io"}', 'email', 'c3333333-3333-3333-3333-333333333333', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Profiles Mahasiswa Freelancer & Klien
INSERT INTO public.profiles (id, full_name, email, campus_email, university, role, is_verified, avatar_url) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Aditya Pratama', 'aditya.pratama@ui.ac.id', 'aditya@ui.ac.id', 'Universitas Indonesia', 'freelancer', true, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
  ('a2222222-2222-2222-2222-222222222222', 'Siti Aminah', 'siti.aminah@itb.ac.id', 'siti@itb.ac.id', 'Institut Teknologi Bandung', 'freelancer', true, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'),
  ('a3333333-3333-3333-3333-333333333333', 'Rizky Ramadhan', 'rizky.ramadhan@ugm.ac.id', 'rizky@ugm.ac.id', 'Universitas Gadjah Mada', 'freelancer', true, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'),
  ('a4444444-4444-4444-4444-444444444444', 'Farah Quinn', 'farah.quinn@its.ac.id', 'farah@its.ac.id', 'Institut Teknologi Sepuluh Nopember', 'freelancer', true, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'),
  ('c1111111-1111-1111-1111-111111111111', 'M. ARIF (Batik Nusantara Store)', 'arif@batiknusantara.com', null, 'Batik Nusantara Store', 'client', true, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'),
  ('c2222222-2222-2222-2222-222222222222', 'Budi Santoso (EduTech Indonesia)', 'budi@edutech.id', null, 'EduTech Indonesia', 'client', true, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'),
  ('c3333333-3333-3333-3333-333333333333', 'Sarah Wijaya (TechFlow Startup)', 'sarah@techflow.io', null, 'TechFlow Startup', 'client', true, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  university = EXCLUDED.university,
  role = EXCLUDED.role,
  is_verified = EXCLUDED.is_verified;

-- 4. Insert Gigs Layanan Mahasiswa (UUID valid: huruf hex a-f saja)
INSERT INTO public.gigs (id, user_id, title, category, price, description, image_url, rating, reviews_count) VALUES
  ('d1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Redesign Website UMKM & E-Commerce Modern', 'Web Development', 15000000, 'Layanan pembuatan UI/UX & Redesign website UMKM profesional berbasis React/Next.js dengan integrasi sistem pembayaran otomatis.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80', 4.9, 124),
  ('d2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Desain Logo & Identitas Brand Startup EduTech', 'Desain Grafis', 4500000, 'Pembuatan identitas visual brand lengkap: Logo minimalis, kartu nama, panduan warna, dan aset media sosial.', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', 5.0, 89),
  ('d3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Integrasi API Backend & Mobile App Node.js', 'Pemrograman & IT', 8000000, 'Pengembangan REST API backend handal dengan autentikasi JWT, database PostgreSQL, dan integrasi Payment Gateway.', 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80', 4.8, 42),
  ('d4444444-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', 'Copywriting & Penulisan Artikel SEO Berbasis AI', 'Penulisan Konten', 2500000, 'Penulisan artikel profesional SEO friendly dan salinan iklan berkonversi tinggi untuk meningkatkan penjualan produk.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', 4.7, 56)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Active Orders (Koneksi Klien -> Proyek -> Mahasiswa)
INSERT INTO public.orders (id, gig_id, client_id, freelancer_id, status, total_price, escrow_released) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'active', 15000000, false),
  ('e2222222-2222-2222-2222-222222222222', 'd2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'active', 4500000, false)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Messages Interaktif Real Antara Klien & Mahasiswa
INSERT INTO public.messages (id, order_id, sender_id, text, created_at) VALUES
  ('f1111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Halo Pak M. ARIF! Saya Aditya dari UI. Desain wireframe & mockup UI tahap pertama untuk Redesign Website Batik Nusantara Store sudah selesai saya upload di sistem.', NOW() - INTERVAL '2 hours'),
  ('f2222222-2222-2222-2222-222222222222', 'e1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'Hasilnya sangat bagus dan responsif sekali Aditya! Saya dan tim sangat suka motif batik modernnya. Silakan lanjut ke tahap pembuatan frontend-nya ya.', NOW() - INTERVAL '1 hour')
ON CONFLICT (id) DO NOTHING;

-- ========================================================
-- SELESAI! Semua user bisa login dengan password: SkillRent123!
-- ========================================================
