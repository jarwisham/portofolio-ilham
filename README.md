# Portofolio — Ilham

Website portofolio **fullstack** dengan **arsitektur hybrid**: data project dikurasi manual (cerita, deskripsi, fitur) digabung dengan **stats live dari GitHub API** (stars, forks, bahasa, update terakhir), plus **Guestbook** yang benar-benar tersimpan di server lewat REST API + Server Action sendiri.

Dibangun dengan **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS 4** · **GSAP + ScrollTrigger** · **zod** · **date-fns**.

---

## ✨ Kata "Hybrid" — cara kerjanya

```
┌──────────────────────────┐      ┌───────────────────────────┐
│  lib/projects.ts         │      │  lib/github.ts            │
│  (KAMU yang kurasi)      │  +   │  (stats LIVE dari GitHub) │
│  · cerita project        │      │  · stars · forks          │
│  · fitur & stack         │      │  · bahasa · last update   │
│  · kategori              │      │  · link repo              │
└────────────┬─────────────┘      └─────────────┬─────────────┘
             │      digabung saat build/revalidate        │
             └───────────────────┬────────────────────────┘
                                 ▼
                     Halaman /projects & detail project
```

- **Data lokal** = yang bedain portfolio-mu: kamu tulis *cerita* tiap project.
- **Data live GitHub** = bukti otentik yang auto-refresh, tanpa kamu harus update manual.
- **Graceful fallback**: kalau repo belum ada / kena rate limit / GitHub down, halaman tetap tampil (cuma tanpa badge stats).

---

## 💌 Fitur fullstack — Guestbook

Ada **buku tamu** di beranda (`/#guestbook`). Ini bukan form pameran — pesan **tersimpan di server**, dan tampil di bawahnya. Bukti nyata sisi backend project ini.

```
┌─────────────────────────┐
│  <form> (client)        │
│   useActionState        │
└──────────┬──────────────┘
           │ Server Action
           ▼
┌──────────────────────────────────┐     ┌──────────────────────┐
│ app/actions/guestbook.ts         │     │ app/api/guestbook/   │
│ · validasi zod (2–40/2–280)      │     │ route.ts (REST API)  │
│ · defense-in-depth               │     │ · GET → daftar pesan │
└──────────┬───────────────────────┘     │ · POST → tambah      │
           └──────────┬──────────────────┘        │
                      ▼                            │
        ┌───────────────────────────┐              │
        │ lib/storage.ts (adapter)  │ ◄────────────┘
        │ GuestbookStore interface  │
        │ · fileStore (data/*.json) │
        └───────────────────────────┘
```

- **Server Action** `submitGuestbookEntry` — validasi zod dua lapis (schema sama dengan API).
- **REST API** `GET /api/guestbook` & `POST /api/guestbook` — boleh dipakai app lain.
- **Storage adapter** (`GuestbookStore`) — sekarang file lokal, besok tinggal ganti `store` ke `PostgresStore`/`RedisStore`; halaman & API tidak berubah.
- **Validasi** nama 2–40, pesan 2–280 karakter, keduanya `.trim()` (zod 4).
- **Cache header** GET `s-maxage=60` → CDN bisa menyajikan cepat tanpa mencekik storage.

Coba lewat curl:
```bash
curl -X POST http://localhost:3000/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{"name":"Kamu","message":"Halo Ilham!"}'
# → 201 {"ok":true,"data":{...}}

curl http://localhost:3000/api/guestbook
# → 200 {"data":[{...}]}
```

> ⚠️ Storage file lokal aman untuk portfolio, tapi data tidak dijamin bertahan di semua platform (Vercel memakai filesystem ephemeral). Untuk produksi sungguhan, ganti `store` di `lib/storage.ts` dengan Postgres/Redis — interface-nya sudah siap.

---

## 🚀 Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve hasil build
```

---

## ➕ Menambah project baru

1. Buat isi data di [`lib/projects.ts`](lib/projects.ts) — salin pola project yang sudah ada.
2. Isi `github` dengan nama repo kamu format `"owner/repo"` (contoh: `"ilham/todo-app"`).
3. **Push dulu repo-mu ke GitHub** supaya stats muncul.
4. Tambah screenshot di `public/projects/<slug>.png` (opsional) lalu referensikan.
5. Deploy ulang (atau tunggu revalidate 1 jam) — badge stats menyesuaikan otomatis.

### Struktur tiap project

```ts
{
  slug: "todo-app",            // URL: /projects/todo-app
  title: "Todo AI",
  tagline: "Prioritas otomatis dari AI",
  description: "Cerita singkat project - kenapa dibuat, apa yang kamu pelajari.",
  github: "ilham/todo-app",    // ← kunci: hook ke GitHub API. Kosongkan ("") kalau project
                               //   tidak punya repo (mis. demo API di situs ini sendiri).
  stack: ["Next.js", "TypeScript", "AI SDK"],
  year: "2026",
  features: [
    { title: "Fitur A", description: "Penjelasan fitur A..." },
  ],
  tags: ["ai", "productivity"],  // untuk filter (belum dipakai, siap dipakai)
  demo: "https://todo-app.vercel.app",  // opsional: link live demo (bisa juga "/#guestbook")
  category: "web" | "app" | "experiment",
}
```

> Project dengan `github: ""` tidak memanggil GitHub API (badge stats disembunyikan, diganti label "demo di situs ini") — cocok untuk proyek seperti Guestbook API yang memakai API-nya sendiri.

---

## 🧩 Arsitektur file

```
app/
├── layout.tsx            # Root layout, metadata, navbar + footer
├── page.tsx              # Beranda: hero + proyek unggulan (hybrid) + Guestbook
├── projects/
│   ├── page.tsx          # Daftar semua project (stats live)
│   └── [slug]/page.tsx   # Detail project — SSG + generateMetadata
├── about/page.tsx        # Halaman tentang
├── api/guestbook/
│   └── route.ts          # ★ REST API — GET (list) & POST (tambah pesan)
└── actions/
    └── guestbook.ts      # ★ Server Action — validasi zod lalu simpan
components/
├── hero.tsx              # Animasi GSAP ala-Apple (fade-up + blur mask)
├── navbar.tsx            # Navbar pill tengah atas — auto-hide saat scroll ke bawah
├── footer.tsx
├── project-card.tsx      # Kartu project — data lokal + stats GitHub
├── primitives.tsx        # Badge & SectionHeading
├── icons.tsx             # Ikon SVG minimal stroke-style
└── guestbook/
    ├── index.tsx         # ★ Section Guestbook + GuestbookList (server component)
    └── guestbook-form.tsx # Form client memakai useActionState
lib/
├── projects.ts           # ★ Data project yang kamu kurasi
├── github.ts             # ★ Layer API GitHub (fetch + fallback)
└── storage.ts            # ★ Storage adapter (GuestbookStore) — file lokal siap upgrade DB
data/
└── guestbook.json        # Entri buku tamu (di-ignore git — lihat .gitignore)
```

---

## ⚙️ Detail teknis penting

| Aspek | Cara kerja |
|---|---|
| **Caching GitHub API** | `fetch(..., { next: { revalidate: 3600 } })` — 1 jam, hemat rate limit (60 req/jam unauthenticated) |
| **Static generation** | `generateStaticParams()` di `[slug]/page.tsx` — semua detail project di-prerender saat build |
| **Fallback API gagal** | `Promise.allSettled` → repo gagal ditandai, tampil tanpa stats, situs tetap hidup |
| **Animasi** | `useGSAP` dari `@gsap/react` (pola resmi Next.js) — scope + auto-cleanup, aman StrictMode |
| **Font** | `next/font/google` Geist, self-hosted saat build, dipasang ke Tailwind via `@theme` |
| **Dark mode** | `prefers-color-scheme` — palet Tailwind v4 otomatis menyesuaikan |
| **Guestbook storage** | `lib/storage.ts` — adapter `GuestbookStore`; sekarang file lokal `data/guestbook.json`, siap ditukar ke Postgres/Redis tanpa ubah halaman/API |
| **Validasi input** | zod 4 dua lapis: Server Action + API route pakai schema yang sama (`.trim()` min 2 / max 40 & 280) |
| **Estado form** | `useActionState` — pending state otomatis, isi form dipertahankan saat validasi gagal |
| **Realtime visual** | GuestbookList = Server Component baca storage langsung — entri baru langsung muncul tanpa refresh manual |

---

## 🌍 Deploy

Mudah di Vercel:

1. Push project ke GitHub.
2. Import repo di [vercel.com](https://vercel.com) → **Deploy**.
3. Selesai → live. Karena fetch di-cache 1 jam (ISR), halaman di-*revalidate* otomatis di background — stats GitHub terbaru muncul dalam ≤1 jam tanpa redeploy manual.

> 💡 Caching 1 jam menjaga kamu tetap di bawah batas GitHub (60 req/jam/IP tanpa token). Kalau kamu punya >60 repo tampil atau mau refresh lebih sering, tambahkan `GITHUB_TOKEN` sebagai env & pakai header `Authorization: Bearer` pada fetch (batas naik ke 5.000 req/jam).