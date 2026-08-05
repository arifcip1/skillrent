-- ========================================================
-- SKILLRENT REAL SEED DATA (DATA USER, GIGS, ORDERS, CHAT)
-- Jalankan query ini di SQL Editor Supabase kamu
-- ========================================================

-- 1. Bersihkan Data Lama (opsional)
TRUNCATE TABLE public.messages, public.orders, public.gigs, public.profiles CASCADE;

-- 2. Insert Profiles Mahasiswa Freelancer & Klien
INSERT INTO public.profiles (id, full_name, email, campus_email, university, role, is_verified, avatar_url) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Aditya Pratama', 'aditya.pratama@ui.ac.id', 'aditya@ui.ac.id', 'Universitas Indonesia', 'freelancer', true, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
  ('a2222222-2222-2222-2222-222222222222', 'Siti Aminah', 'siti.aminah@itb.ac.id', 'siti@itb.ac.id', 'Institut Teknologi Bandung', 'freelancer', true, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'),
  ('a3333333-3333-3333-3333-333333333333', 'Rizky Ramadhan', 'rizky.ramadhan@ugm.ac.id', 'rizky@ugm.ac.id', 'Universitas Gadjah Mada', 'freelancer', true, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'),
  ('a4444444-4444-4444-4444-444444444444', 'Farah Quinn', 'farah.quinn@its.ac.id', 'farah@its.ac.id', 'Institut Teknologi Sepuluh Nopember', 'freelancer', true, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'),
  ('c1111111-1111-1111-1111-111111111111', 'M. ARIF (Batik Nusantara Store)', 'arcip@mail.com', null, 'Batik Nusantara Store', 'client', true, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'),
  ('c2222222-2222-2222-2222-222222222222', 'Budi Santoso (EduTech Indonesia)', 'budi@edutech.id', null, 'EduTech Indonesia', 'client', true, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'),
  ('c3333333-3333-3333-3333-333333333333', 'Sarah Wijaya (TechFlow Startup)', 'sarah@techflow.io', null, 'TechFlow Startup', 'client', true, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  university = EXCLUDED.university,
  role = EXCLUDED.role,
  is_verified = EXCLUDED.is_verified;

-- 3. Insert Gigs Layanan Mahasiswa
INSERT INTO public.gigs (id, user_id, title, category, price, description, image_url, rating, reviews_count) VALUES
  ('g1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Redesign Website UMKM & E-Commerce Modern', 'Web Development', 15000000, 'Layanan pembuatan UI/UX & Redesign website UMKM profesional berbasis React/Next.js dengan integrasi sistem pembayaran otomatis.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80', 4.9, 124),
  ('g2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Desain Logo & Identitas Brand Startup EduTech', 'Desain Grafis', 4500000, 'Pembuatan identitas visual brand lengkap: Logo minimalis, kartu nama, panduan warna, dan aset media sosial.', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', 5.0, 89),
  ('g3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Integrasi API Backend & Mobile App Node.js', 'Pemrograman & IT', 8000000, 'Pengembangan REST API backend handal dengan autentikasi JWT, database PostgreSQL, dan integrasi Payment Gateway.', 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80', 4.8, 42),
  ('g4444444-4444-4444-4444-444444444444', 'a4444444-4444-4444-4444-444444444444', 'Copywriting & Penulisan Artikel SEO Berbasis AI', 'Penulisan Konten', 2500000, 'Penulisan artikel profesional SEO friendly dan salinan iklan berkonversi tinggi untuk meningkatkan penjualan produk.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', 4.7, 56)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Active Orders (Koneksi Klien -> Proyek -> Mahasiswa)
INSERT INTO public.orders (id, gig_id, client_id, freelancer_id, status, total_price, escrow_released) VALUES
  ('o1111111-1111-1111-1111-111111111111', 'g1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'active', 15000000, false),
  ('o2222222-2222-2222-2222-222222222222', 'g2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'active', 4500000, false)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Messages Interaktif Real Antara Klien & Mahasiswa
INSERT INTO public.messages (id, order_id, sender_id, text, created_at) VALUES
  ('m1111111-1111-1111-1111-111111111111', 'o1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Halo Pak M. ARIF! Saya Aditya dari UI. Desain wireframe & mockup UI tahap pertama untuk Redesign Website Batik Nusantara Store sudah selesai saya upload di sistem.', NOW() - INTERVAL '2 hours'),
  ('m2222222-2222-2222-2222-222222222222', 'o1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'Hasilnya sangat bagus dan responsif sekali Aditya! Saya dan tim sangat suka motif batik modernnya. Silakan lanjut ke tahap pembuatan frontend-nya ya.', NOW() - INTERVAL '1 hour')
ON CONFLICT (id) DO NOTHING;
