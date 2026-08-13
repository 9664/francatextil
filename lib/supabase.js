export const SUPABASE_URL = 'https://psqxnscthiyhossgqyzn.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_mrO_3ecMtuNLAWs7CRnJuA_RE-zynvb';

export async function publicQuery(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    next: { revalidate: 60 }
  });
  if (!response.ok) return [];
  return response.json();
}
