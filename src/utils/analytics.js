import { supabase } from '../supabaseClient';

// Helper to generate a unique session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

// Parse User Agent to get Browser, OS, and Device
const parseUserAgent = (ua) => {
  let browser = "Diğer";
  let os = "Diğer";
  let deviceType = "Masaüstü";

  if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua)) browser = "Safari";
  else if (/Edge|Edg/i.test(ua)) browser = "Edge";
  else if (/Opera|OPR/i.test(ua)) browser = "Opera";

  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Macintosh|Mac OS/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) { os = "Android"; deviceType = "Mobil"; }
  else if (/iPhone|iPad|iPod/i.test(ua)) { os = "iOS"; deviceType = "Mobil"; }
  else if (/Linux/i.test(ua)) os = "Linux";

  if (/Mobi|Tablet|iPad/i.test(ua)) deviceType = "Mobil";

  return { browser, os, deviceType };
};

// Fetch visitor location (cached in sessionStorage)
const getGeoLocation = async () => {
  const cached = sessionStorage.getItem('visitor_geo_location');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  // 1. Try ipwho.is (Excellent regional POP mapping for Turkish ISPs, HTTPS free, up to 10k/day)
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        const geo = {
          ip: data.ip || 'Unknown',
          country: data.country || 'Türkiye',
          city: data.city || 'Rize'
        };
        sessionStorage.setItem('visitor_geo_location', JSON.stringify(geo));
        return geo;
      }
    }
  } catch (err) {
    console.warn("ipwho.is failed, trying next provider...", err.message);
  }

  // 2. Try ipinfo.io (Excellent fallback, HTTPS free, up to 50k/month)
  try {
    const res = await fetch('https://ipinfo.io/json');
    if (res.ok) {
      const data = await res.json();
      const geo = {
        ip: data.ip || 'Unknown',
        country: data.country === 'TR' ? 'Türkiye' : (data.country || 'Türkiye'),
        city: data.city || 'Rize'
      };
      sessionStorage.setItem('visitor_geo_location', JSON.stringify(geo));
      return geo;
    }
  } catch (err) {
    console.warn("ipinfo.io failed, trying next provider...", err.message);
  }

  // 3. Try ipapi.co (Third fallback)
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      const geo = {
        ip: data.ip || 'Unknown',
        country: data.country_name || 'Türkiye',
        city: data.city || 'Rize'
      };
      sessionStorage.setItem('visitor_geo_location', JSON.stringify(geo));
      return geo;
    }
  } catch (err) {
    console.error("All geo IP providers failed:", err);
  }

  return { ip: 'Bilinmeyen', country: 'Türkiye', city: 'Rize' };
};

// Page hash names in Turkish for beautiful charts
const getPageName = (hash) => {
  if (!hash || hash === '#' || hash === '#home') return 'Ana Sayfa';
  if (hash === '#hakkimizda' || hash === '#about') return 'Hakkımızda';
  if (hash === '#hizmetlerimiz') return 'Hizmetlerimiz';
  if (hash === '#calisma-alanlarimiz') return 'Çalışma Alanlarımız';
  if (hash === '#blog') return 'Blog';
  if (hash.startsWith('#blog/')) return 'Blog Detay';
  if (hash === '#randevu') return 'Randevu Planlama';
  if (hash === '#iletisim') return 'İletişim';
  if (hash === '#admin') return 'Yönetici Paneli';
  return hash;
};

// Track a page view
export const trackPageView = async (hash) => {
  try {
    const sessionId = getSessionId();
    const geo = await getGeoLocation();
    const ua = navigator.userAgent;
    const { browser, os, deviceType } = parseUserAgent(ua);
    const referrer = document.referrer ? new URL(document.referrer).hostname : 'Doğrudan';
    const language = navigator.language || 'tr-TR';
    const screenResolution = `${window.innerWidth}x${window.innerHeight}`;

    const { error } = await supabase.from('visitor_logs').insert([{
      session_id: sessionId,
      ip_address: geo.ip,
      country: geo.country,
      city: geo.city,
      pathname: getPageName(hash),
      user_agent: ua,
      browser,
      os,
      device_type: deviceType,
      referrer,
      language,
      screen_resolution: screenResolution
    }]);

    if (error) {
      console.warn("Analytics insertion failed (table may not exist yet):", error.message);
    }
  } catch (e) {
    console.error("Analytics error:", e);
  }
};

// Fetch all analytics stats for the admin dashboard
export const fetchAnalyticsStats = async () => {
  try {
    const now = new Date();
    const fiveMinsAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString();

    // Query 1: Active users in the last 5 minutes
    const { data: activeUsersData, error: activeErr } = await supabase
      .from('visitor_logs')
      .select('session_id')
      .gte('created_at', fiveMinsAgo);

    if (activeErr) throw activeErr;
    const activeUsers = activeUsersData ? new Set(activeUsersData.map(d => d.session_id)).size : 0;

    // Query 2: All visits in the last 30 days
    const { data: logs30Days, error: logsErr } = await supabase
      .from('visitor_logs')
      .select('*')
      .gte('created_at', thirtyDaysAgo)
      .order('created_at', { ascending: false });

    if (logsErr) throw logsErr;

    // Query 3: Yearly counts (just counts to keep payload light)
    const { count: yearlyCount, error: yearlyErr } = await supabase
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneYearAgo);

    if (yearlyErr) throw yearlyErr;

    // Query 4: Total count
    const { count: totalCount, error: totalErr } = await supabase
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true });

    if (totalErr) throw totalErr;

    const list = logs30Days || [];

    // Filter sub-ranges
    const todayLogs = list.filter(l => new Date(l.created_at) >= new Date(startOfToday));
    const yesterdayLogs = list.filter(l => {
      const d = new Date(l.created_at);
      return d >= new Date(startOfYesterday) && d < new Date(startOfToday);
    });
    const sevenDaysLogs = list.filter(l => new Date(l.created_at) >= new Date(sevenDaysAgo));

    // Stats card objects
    const cardStats = {
      realtime: activeUsers,
      today: {
        views: todayLogs.length,
        uniques: new Set(todayLogs.map(l => l.session_id)).size
      },
      yesterday: {
        views: yesterdayLogs.length,
        uniques: new Set(yesterdayLogs.map(l => l.session_id)).size
      },
      weekly: {
        views: sevenDaysLogs.length,
        uniques: new Set(sevenDaysLogs.map(l => l.session_id)).size
      },
      monthly: {
        views: list.length,
        uniques: new Set(list.map(l => l.session_id)).size
      },
      yearly: {
        views: yearlyCount || 0,
        uniques: 'N/A'
      },
      total: totalCount || 0
    };

    // --- Aggregations ---
    
    // A. Hourly page views (last 24 hours)
    const hourlyViews = {};
    const last24hLogs = list.filter(l => new Date(l.created_at) >= new Date(now.getTime() - 24 * 60 * 60 * 1000));
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hourStr = `${d.getHours().toString().padStart(2, '0')}:00`;
      hourlyViews[hourStr] = 0;
    }
    last24hLogs.forEach(l => {
      const hour = new Date(l.created_at).getHours();
      const hourStr = `${hour.toString().padStart(2, '0')}:00`;
      if (hourlyViews[hourStr] !== undefined) {
        hourlyViews[hourStr]++;
      }
    });

    // B. Daily page views (last 7 days) — tarih bazlı key kullan
    const dailyViews = {};
    const daysTurkish = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const dailyDateToName = {}; // dateStr -> display name
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0]; // "2025-05-18"
      const dayName = i === 0 ? 'Bugün' : i === 1 ? 'Dün' : daysTurkish[d.getDay()];
      dailyViews[dateStr] = 0;
      dailyDateToName[dateStr] = dayName;
    }
    sevenDaysLogs.forEach(l => {
      const dateStr = new Date(l.created_at).toISOString().split('T')[0];
      if (dailyViews[dateStr] !== undefined) {
        dailyViews[dateStr]++;
      }
    });
    // Convert to array with display names
    const dailyChartData = Object.entries(dailyViews).map(([dateStr, value]) => ({
      name: dailyDateToName[dateStr] || dateStr,
      value
    }));

    // C. Weekly page views (last 4 weeks / 30 days)
    const weeklyViews = { '3 Hafta Önce': 0, '2 Hafta Önce': 0, 'Geçen Hafta': 0, 'Bu Hafta': 0 };
    list.forEach(l => {
      const d = new Date(l.created_at);
      const diffDays = Math.floor((now.getTime() - d.getTime()) / (24 * 60 * 60 * 1000));
      if (diffDays <= 7) weeklyViews['Bu Hafta']++;
      else if (diffDays <= 14) weeklyViews['Geçen Hafta']++;
      else if (diffDays <= 21) weeklyViews['2 Hafta Önce']++;
      else if (diffDays <= 30) weeklyViews['3 Hafta Önce']++;
    });

    // D. Monthly page views (last 12 months)
    const { data: logs12Months, error: err12M } = await supabase
      .from('visitor_logs')
      .select('created_at')
      .gte('created_at', oneYearAgo);

    if (err12M) throw err12M;

    const monthlyViews = {};
    const monthsTurkish = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = `${monthsTurkish[d.getMonth()]} ${d.getFullYear()}`;
      monthlyViews[label] = 0;
    }
    if (logs12Months) {
      logs12Months.forEach(l => {
        const d = new Date(l.created_at);
        const label = `${monthsTurkish[d.getMonth()]} ${d.getFullYear()}`;
        if (monthlyViews[label] !== undefined) {
          monthlyViews[label]++;
        }
      });
    }

    // E. Pages breakdown
    const pages = {};
    // F. Referrers breakdown
    const referrers = {};
    // G. Devices breakdown
    const devices = { 'Mobil': 0, 'Masaüstü': 0 };
    // H. Browsers breakdown
    const browsers = {};
    // I. Cities breakdown
    const cities = {};

    list.forEach(l => {
      pages[l.pathname] = (pages[l.pathname] || 0) + 1;
      
      const ref = l.referrer || 'Doğrudan';
      referrers[ref] = (referrers[ref] || 0) + 1;
      
      if (l.device_type === 'Mobil') devices['Mobil']++;
      else devices['Masaüstü']++;
      
      const b = l.browser || 'Diğer';
      browsers[b] = (browsers[b] || 0) + 1;
      
      const cityLabel = l.city && l.city !== 'Unknown' && l.city !== 'Bilinmeyen'
        ? `${l.city}, ${l.country}`
        : `Rize, Türkiye`;
      cities[cityLabel] = (cities[cityLabel] || 0) + 1;
    });

    const sortBreakdown = (obj) => Object.entries(obj)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      success: true,
      stats: cardStats,
      charts: {
        hourly: Object.entries(hourlyViews).map(([name, value]) => ({ name, value })),
        daily: dailyChartData,
        weekly: Object.entries(weeklyViews).map(([name, value]) => ({ name, value })),
        monthly: Object.entries(monthlyViews).map(([name, value]) => ({ name, value })),
      },
      breakdowns: {
        pages: sortBreakdown(pages).slice(0, 5),
        referrers: sortBreakdown(referrers).slice(0, 5),
        devices: sortBreakdown(devices),
        browsers: sortBreakdown(browsers).slice(0, 5),
        cities: sortBreakdown(cities).slice(0, 5)
      },
      recentLogs: list.slice(0, 30) // Show last 30 visits in the table
    };
  } catch (err) {
    console.error("Error fetching analytics statistics:", err);
    return { success: false, error: err.message };
  }
};
