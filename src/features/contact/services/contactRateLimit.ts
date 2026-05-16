const CONTACT_RATE_LIMIT_KEY = 'aditya-portfolio-contact-rate-limit-v1';
const CONTACT_DEVICE_KEY = 'aditya-portfolio-contact-device-id-v1';
export const DAILY_CONTACT_LIMIT = 5;

const IP_ENDPOINTS = [
  'https://api.ipify.org?format=json',
  'https://api64.ipify.org?format=json',
];

const isBrowser = () => typeof window !== 'undefined' && window.localStorage;

const getTodayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const readStore = () => {
  if (!isBrowser()) {
    return { date: getTodayKey(), byIp: {} };
  }

  try {
    const parsedStore = JSON.parse(
      window.localStorage.getItem(CONTACT_RATE_LIMIT_KEY) || '{}',
    );

    if (parsedStore.date === getTodayKey() && parsedStore.byIp) {
      return parsedStore;
    }
  } catch {
    window.localStorage.removeItem(CONTACT_RATE_LIMIT_KEY);
  }

  return { date: getTodayKey(), byIp: {} };
};

interface RateLimitRecord { count: number; sentAt: string[]; }
interface RateLimitStore { date: string; byIp: Record<string, RateLimitRecord>; }

const writeStore = (store: RateLimitStore) => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(CONTACT_RATE_LIMIT_KEY, JSON.stringify(store));
};

const getStoredDeviceId = () => {
  if (!isBrowser()) {
    return 'server-render';
  }

  const existingDeviceId = window.localStorage.getItem(CONTACT_DEVICE_KEY);

  if (existingDeviceId) {
    return existingDeviceId;
  }

  const nextDeviceId =
    window.crypto?.randomUUID?.() ||
    `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(CONTACT_DEVICE_KEY, nextDeviceId);

  return nextDeviceId;
};

const fetchJsonWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 2200);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const getClientIpAddress = async () => {
  if (!isBrowser()) {
    return 'server-render';
  }

  for (const endpoint of IP_ENDPOINTS) {
    const data = await fetchJsonWithTimeout(endpoint);

    if (data?.ip) {
      return data.ip;
    }
  }

  return `browser:${getStoredDeviceId()}`;
};

export const getContactRateStatus = async () => {
  const ipAddress = await getClientIpAddress();
  const store = readStore();
  const record = store.byIp[ipAddress] || { count: 0, sentAt: [] };
  const remaining = Math.max(DAILY_CONTACT_LIMIT - record.count, 0);

  return {
    allowed: remaining > 0,
    count: record.count,
    ipAddress,
    limit: DAILY_CONTACT_LIMIT,
    remaining,
  };
};

export const recordContactMailSent = (ipAddress: string) => {
  const store = readStore();
  const record = store.byIp[ipAddress] || { count: 0, sentAt: [] };
  const nextRecord = {
    count: Math.min(record.count + 1, DAILY_CONTACT_LIMIT),
    sentAt: [...record.sentAt, new Date().toISOString()].slice(
      -DAILY_CONTACT_LIMIT,
    ),
  };

  store.byIp[ipAddress] = nextRecord;
  writeStore(store);

  return {
    count: nextRecord.count,
    remaining: Math.max(DAILY_CONTACT_LIMIT - nextRecord.count, 0),
  };
};
