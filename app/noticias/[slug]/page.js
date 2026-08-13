import { publicQuery } from '../../../lib/supabase';
import { notFound } from 'next/navigation';

export async function generateMetadata({params}){
  const {slug}=await params;
  const rows=await publicQuery(`articles?select=seo_title,seo_description,title,excerpt,cover_url&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`);
  const a=rows?.[0];
  if(!a) return {title:'Notícia | Franca Têxtil'};
  return {title:a.seo_title||a.title,description:a.seo_description||a.excerpt||'',openGraph:{images:a.cover_url?[a.cover_url]:['/og.svg']}};
}

export default async function ArticlePage({params}){
  const {slug}=await params;
  const rows=await publicQuery(`articles?select=title,excerpt,body,cover_url,published_at&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`);
  const a=rows?.[0];
  if(!a) notFound();
  return <main className="articlePage"><header className="articleNav"><a href="/"><img src="/logo.svg" alt="Franca Têxtil"/></a><a href="/#noticias">← Notícias</a></header><article><span className="eyebrow">NOTÍCIAS · FRANCA TÊXTIL SUMMIT</span><h1>{a.title}</h1>{a.excerpt&&<p className="articleLead">{a.excerpt}</p>}{a.cover_url&&<img className="articleCover" src={a.cover_url} alt=""/>}<div className="articleBody">{String(a.body||'').split('\n').filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}</div></article></main>;
}
