-- ====================================================================
-- KARACA HUKUK & DANIŞMANLIK - ZİYARETÇİ LOGLAMA & ANALİTİK SİSTEMİ
-- ====================================================================
-- Bu SQL betiği, web sitesini ziyaret edenleri anlık, saatlik, günlük,
-- haftalık ve yıllık olarak izlemek amacıyla kullanılacak olan 
-- `visitor_logs` tablosunu ve güvenlik (RLS) politikalarını oluşturur.
--
-- Bu betiği Supabase panelindeki "SQL Editor" kısmına yapıştırıp 
-- "Run" butonuna basarak kolayca çalıştırabilirsiniz.
-- ====================================================================

-- 1. Ziyaretçi Günlüğü Tablosunu Oluştur
create table if not exists public.visitor_logs (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    session_id text not null,
    ip_address text,
    country text default 'Türkiye',
    city text default 'Rize',
    pathname text not null,
    user_agent text,
    browser text,
    os text,
    device_type text,
    referrer text,
    language text,
    screen_resolution text
);

-- Tabloya hızlı indeksler ekle (Saatlik, Günlük, Haftalık sorguları hızlandırmak için)
create index if not exists visitor_logs_created_at_idx on public.visitor_logs (created_at desc);
create index if not exists visitor_logs_session_id_idx on public.visitor_logs (session_id);

-- 2. Supabase Row Level Security (RLS) Güvenliğini Aktif Et
alter table public.visitor_logs enable row level security;

-- 3. RLS Güvenlik Politikalarını Tanımla

-- Politika A: Ziyaretçilerin (public) kendi ziyaret verilerini eklemesine (INSERT) izin ver
create policy "Ziyaretçi veri ekleme politikası" on public.visitor_logs
    for insert to anon
    with check (true);

-- Politika B: Yönetici ve Anonim kullanıcıların verileri çekmesine (SELECT) izin ver
-- (Not: Admin paneline giriş yapan yetkili kullanıcının verileri okuyabilmesi içindir.)
create policy "Veri okuma politikası" on public.visitor_logs
    for select to anon, authenticated
    using (true);

-- ====================================================================
-- BLOGS TABLOSU İÇİN RLS POLİTİKALARI
-- ====================================================================
-- ÖNEMLİ: Eğer "blogs" tablosunda RLS (Row Level Security) aktifse,
-- aşağıdaki politikaları da Supabase SQL Editor'da çalıştırmanız GEREKİYOR.
-- Aksi takdirde admin panelinden kaydetme/güncelleme/silme işlemleri
-- sessizce başarısız olur (hata mesajı göstermeden eski hali kalır).
-- ====================================================================

-- blogs tablosunda RLS'yi etkinleştir (zaten aktifse hata vermez)
alter table public.blogs enable row level security;

-- Politika 1: Herkese (anonim ziyaretçiler dahil) blog okuma izni
create policy "Blogs okuma politikası" on public.blogs
    for select to anon, authenticated
    using (true);

-- Politika 2: Admin panelinin yeni blog ekleyebilmesi için INSERT izni
create policy "Blogs ekleme politikası" on public.blogs
    for insert to anon, authenticated
    with check (true);

-- Politika 3: Admin panelinin blog GÜNCELLEYEBİLMESİ için UPDATE izni
-- (Bu politika eksik olduğunda düzenleme kaydedilmiyor!)
create policy "Blogs güncelleme politikası" on public.blogs
    for update to anon, authenticated
    using (true)
    with check (true);

-- Politika 4: Admin panelinin blog SİLEBİLMESİ için DELETE izni
create policy "Blogs silme politikası" on public.blogs
    for delete to anon, authenticated
    using (true);

-- ====================================================================
-- APPOINTMENTS TABLOSU İÇİN RLS POLİTİKALARI
-- ====================================================================

-- appointments tablosunda RLS'yi etkinleştir
alter table public.appointments enable row level security;

-- Politika 1: Herkese randevu görüntüleme izni (admin panel için)
create policy "Appointments okuma politikası" on public.appointments
    for select to anon, authenticated
    using (true);

-- Politika 2: Ziyaretçilerin randevu talebi oluşturabilmesi için INSERT izni
create policy "Appointments ekleme politikası" on public.appointments
    for insert to anon, authenticated
    with check (true);

-- Politika 3: Admin panelinin randevu SİLEBİLMESİ için DELETE izni
create policy "Appointments silme politikası" on public.appointments
    for delete to anon, authenticated
    using (true);

-- ====================================================================
-- SİSTEMİN ÇALIŞMA MANTIĞI (AR-GE):
-- 1. Kullanıcı siteye girdiğinde `sessionStorage` üzerinden tekil bir `session_id` atanır.
-- 2. IP ve Coğrafi Konum (Ülke, Şehir) bilgileri `ipapi.co` üzerinden HTTPS ile 
--    sadece ilk sayfa yüklemesinde çekilir ve oturum boyunca önbelleğe (cache) alınır.
--    Böylece harici servise gereksiz istek atılması engellenir ve site performansı korunur.
-- 3. Kullanıcı site içi sekmelerde (Ana Sayfa, Hakkımızda, Blog, Randevu vb.) 
--    gezindikçe, tarayıcı bilgileri, ekran çözünürlüğü ve referans kaynakları 
--    Supabase'e anlık olarak loglanır.
-- 4. Admin panelindeki Ar-Ge paneli bu logları anlık analiz ederek çevrimiçi kullanıcı sayısını,
--    saatlik, günlük, haftalık ve yıllık grafikler ile coğrafi harita verilerini dinamik olarak çizer.
-- ====================================================================
