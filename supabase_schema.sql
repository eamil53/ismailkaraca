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

-- ====================================================================
-- SERVICES (ÇALIŞMA ALANLARI) TABLOSU VE RLS POLİTİKALARI
-- ====================================================================

create table if not exists public.services (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    "group" text not null default 'Özel Hukuk',
    icon text not null default 'Briefcase',
    "desc" text not null,
    detail text not null,
    "order" integer default 0
);

-- services tablosunda RLS'yi etkinleştir
alter table public.services enable row level security;

-- Politika 1: Herkese (anonim ziyaretçiler dahil) okuma izni
create policy "Services okuma politikası" on public.services
    for select to anon, authenticated
    using (true);

-- Politika 2: Admin panelinin yeni hizmet ekleyebilmesi için INSERT izni
create policy "Services ekleme politikası" on public.services
    for insert to anon, authenticated
    with check (true);

-- Politika 3: Admin panelinin hizmet GÜNCELLEYEBİLMESİ için UPDATE izni
create policy "Services güncelleme politikası" on public.services
    for update to anon, authenticated
    using (true)
    with check (true);

-- Politika 4: Admin panelinin hizmet SİLEBİLMESİ için DELETE izni
create policy "Services silme politikası" on public.services
    for delete to anon, authenticated
    using (true);

-- Varsayılan Verileri Ekle (Seeding)
-- Not: Her tablo oluşturulduğunda varsayılan hizmetler eklenir.
insert into public.services (title, "group", icon, "desc", detail, "order") values
('Ceza Hukuku', 'Özel Hukuk', 'Gavel', 'Soruşturma ve kovuşturma aşamalarında, sanık ve mağdur haklarının temsili.', 'Ceza hukuku, bireylerin özgürlük ve hak kısıtlamalarıyla en doğrudan karşılaştığı son derece hassas bir alandır. Karaca Hukuk, soruşturma aşamasından (ifade alım, kolluk ve savcılık işlemleri, sorgu hakimliğindeki tutuklama ve adli kontrol incelemeleri) kovuşturma aşamasına (Ağır Ceza Mahkemeleri, Asliye Ceza Mahkemeleri ve İcra Ceza Mahkemeleri) kadar müvekkillerine savunma haklarını en üst düzeyde kullanabilmeleri için etkin bir temsil sunar. Ayrıca istinaf ve temyiz (Yargıtay) başvuru süreçlerinde de titizlikle dosya takibi yaparak hak kayıplarını engellemektedir.', 1),

('Aile Hukuku', 'Özel Hukuk', 'Users', 'Boşanma, velayet, nafaka ve mal rejimi uyuşmazlıklarında çözüm odaklı yaklaşım.', 'Aile ve şahsın hukuku uyuşmazlıkları, taraflar açısından duygusal boyutu yüksek ve hassas süreçlerdir. Bu sebeple çalışmalarımız yüksek gizlilik, empati ve mesleki profesyonellik çerçevesinde yürütülmektedir. Anlaşmalı boşanma protokollerinin hazırlığı, çekişmeli boşanma davaları, velayet, nafaka talepleri, mal paylaşımı davaları, soybağının kurulması ve vesayet işlemleri gibi konularda yasal haklarınızı tam anlamıyla koruyacak etkin çözümler sunmaktayız.', 2),

('Gayrimenkul ve Kira Hukuku', 'Özel Hukuk', 'MapPin', 'Tapu iptal, tescil, ortaklığın giderilmesi ve kira uyuşmazlıkları danışmanlığı.', 'Gayrimenkul ve kira hukuku, taşınmazların mülkiyeti, yönetimi ve bunlardan doğan uyuşmazlıkları kapsar. Özellikle Tapu İptal ve Tescil davaları, ortaklığın giderilmesi (izale-i şuyu) davaları, kira bedeli tespiti ve tahliye davaları, kat karşılığı inşaat sözleşmeleri, kamulaştırma davalarında taşınmaz sahiplerine ve kiracılara profesyonel danışmanlık ve dava takibi sağlamaktayız.', 3),

('İş ve Sosyal Güvenlik Hukuku', 'Özel Hukuk', 'Briefcase', 'İşe iade, kıdem/ihbar tazminatları ve iş kazalarından doğan alacak davaları takibi.', 'İşçi ve işveren arasındaki ilişkilerin düzenlenmesi, hakların korunması ve uyuşmazlıkların çözümü temel uzmanlık alanlarımızdandır. İhbar ve kıdem tazminatı alacakları, fazla mesai, yıllık izin ücret alacakları, iş kazalarından kaynaklanan maddi ve manevi tazminat davaları ile SGK nezdinde hizmet tespiti davalarında müvekkillerimizi en iyi şekilde temsil ediyoruz. Ayrıca zorunlu iş arabuluculuğu süreçlerinde de aktif danışmanlık hizmeti sunmaktayız.', 4),

('Tazminat Hukuku', 'Özel Hukuk', 'Scale', 'Maddi ve manevi tazminat davalarında hak kayıplarını önleyen profesyonel süreç yönetimi.', 'Tazminat hukuku, haksız fiil, sözleşmeye aykırılık veya başka bir hukuka aykırı eylem sebebiyle uğranılan maddi ve manevi zararların tazmin edilmesini amaçlar. Trafik kazalarından doğan tazminat davaları, tıbbi uygulama hataları (malpraktis) davaları, iş kazalarından doğan tazminat talepleri, kişilik haklarına saldırı gibi nedenlerle açılan maddi ve manevi tazminat davalarında müvekkillerimizin kayıplarının telafisi için süreci büyük bir titizlikle yürütmekteyiz.', 5),

('İcra ve İflas Hukuku', 'Özel Hukuk', 'ShieldCheck', 'Alacak tahsili, icra takipleri ve borç ilişkilerinin hukuki zeminde yönetilmesi.', 'Alacaklerin hızlı, etkin ve hukuka uygun şekilde tahsili için icra-iflas mekanizmasının profesyonelce yönetilmesi gerekir. İlamsız, ilamlı ve kambiyo senedine dayalı icra takipleri, ihtiyati haciz kararlarının alınarak uygulanması, istihkak davaları, borca/imzaya itiraz davaları ile alacaklı veya borçlu konumdaki müvekkiller için borç tasfiyesi ve yapılandırma süreçlerinde hukuki destek sağlamaktayız.', 6),

('Miras Hukuku', 'Özel Hukuk', 'Scroll', 'Mirasçılık belgesi alınması, vasiyetname düzenleme ve ortaklık paylaşımları.', 'Miras hukuku, vefat eden bir kimsenin mal varlığının yasal ve atanmış mirasçılar arasında nasıl paylaştırılacağını düzenler. Veraset ilamı (mirasçılık belgesi) alınması, miras paylaşımları ve miras taksim sözleşmelerinin hazırlanması, vasiyetname ve mirasçı atama sözleşmelerinin yasal usullere uygun düzenlenmesi, tenkis ve muris muvazaası (mirastan mal kaçırma) davaları ile mirası reddetme (reddi miras) davalarında kapsamlı ve güvenilir danışmanlık hizmeti sunmaktayız.', 7),

('İdare ve Vergi Hukuku', 'Kamu Hukuku', 'Globe', 'İdari işlemlerin iptali, tam yargı davaları ve vergi cezaları uyuşmazlıkları.', 'Kamu kurumlarının yasalara aykırı eylem ve işlemlerine karşı bireylerin ve şirketlerin haklarını korumak hukuk devletinin gereğidir. İdari işlemlerin iptali davaları, idari para cezalarına karşı iptal başvuruları, tam yargı (tazminat) davaları, devlet memurları disiplin ve atama davaları ile haksız vergi tarhiyatı ve cezalarına karşı açılacak davalarda profesyonel dava takip hizmeti vermekteyiz.', 8),

('Ticaret ve Şirketler Hukuku', 'Özel Hukuk', 'Building2', 'Şirket kuruluşu, ticari sözleşmeler, birleşmeler ve ticari alacak davaları.', 'Şirketlerin ticari faaliyetlerini güvenli bir hukuki zeminde sürdürebilmeleri için koruyucu hukuk ve danışmanlık hizmeti sunmaktayız. Şirket kuruluş işlemleri, genel kurul kararlarının hukuki denetimi, ticari sözleşmelerin hazırlanması ve analizi, şirket birleşme ve devralmaları, haksız rekabet davaları ve ticari alacak/tazminat davalarında profesyonel danışmanlık ve avukatlık hizmeti sağlamaktayız.', 9),

('Tüketici Hukuku', 'Özel Hukuk', 'ShieldAlert', 'Ayıplı mal ve hizmet uyuşmazlıkları, Tüketici Hakem Heyeti başvuruları.', 'Tüketicilerin ve satıcıların haklarının korunması, tüketici uyuşmazlıklarının çözümü için Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri nezdinde temsil sağlıyoruz. Satın alınan ayıplı mal ve hizmetlerden doğan hak talepleri, tüketici sözleşmelerindeki haksız şartlar, konut ve tatil paketlerine dair tüketici davaları gibi konularda yasal haklarınızı koruyoruz.', 10);

