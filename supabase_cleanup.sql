-- ========================================================
-- BERSIHKAN AUTH USERS YANG RUSAK
-- Jalankan ini DULU di SQL Editor Supabase
-- ========================================================

-- Hapus semua data public terlebih dahulu
TRUNCATE TABLE public.messages CASCADE;
TRUNCATE TABLE public.orders CASCADE;
TRUNCATE TABLE public.gigs CASCADE;
TRUNCATE TABLE public.profiles CASCADE;

-- Hapus identities seed
DELETE FROM auth.identities WHERE user_id IN (
  'a1111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222',
  'a3333333-3333-3333-3333-333333333333', 'a4444444-4444-4444-4444-444444444444',
  'c1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222',
  'c3333333-3333-3333-3333-333333333333'
);

-- Hapus auth users seed
DELETE FROM auth.users WHERE id IN (
  'a1111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222',
  'a3333333-3333-3333-3333-333333333333', 'a4444444-4444-4444-4444-444444444444',
  'c1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222',
  'c3333333-3333-3333-3333-333333333333'
);

-- Hapus juga user dengan email seed (untuk jaga-jaga jika UUID nya berubah)
DELETE FROM auth.identities WHERE user_id IN (
  SELECT id FROM auth.users WHERE email IN (
    'aditya.pratama@ui.ac.id', 'siti.aminah@itb.ac.id',
    'rizky.ramadhan@ugm.ac.id', 'farah.quinn@its.ac.id',
    'arif@batiknusantara.com', 'budi@edutech.id', 'sarah@techflow.io'
  )
);
DELETE FROM auth.users WHERE email IN (
  'aditya.pratama@ui.ac.id', 'siti.aminah@itb.ac.id',
  'rizky.ramadhan@ugm.ac.id', 'farah.quinn@its.ac.id',
  'arif@batiknusantara.com', 'budi@edutech.id', 'sarah@techflow.io'
);

-- SELESAI! Sekarang coba "Add user" lagi dari Dashboard, atau daftar via Register page.
