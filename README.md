# Elite Kingston Barbershop

Premium single-page React website for **Elite Kingston Barbershop**, designed for a dark luxury/vintage-modern aesthetic.

## Stack

- React + Vite
- CSS with responsive mobile-first layout
- Lucide React icons
- Supabase for appointment requests
- Netlify-ready configuration
- Google Fonts: Playfair Display + DM Sans

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then add your Supabase project URL and anon key to `.env.local`.

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor**.
3. Paste and run `supabase/schema.sql`.
4. In Supabase Project Settings, copy:
   - Project URL
   - Publishable/anon key
5. Put them in `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

The website only inserts appointment requests. Public reads are blocked by RLS.

## Netlify deployment

### GitHub method

1. Create a GitHub repository.
2. Upload/push this project.
3. In Netlify, choose **Add new site → Import an existing project**.
4. Select the GitHub repository.
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
8. Deploy.

`netlify.toml` already contains the SPA redirect so React routes work correctly.

## Important production notes

- Replace placeholder phone/email/address with the shop's real details.
- Replace the demo Unsplash images with properly licensed shop/barber photography.
- For production appointment scheduling, add availability validation/server-side rules before confirming appointments.
- Never put a Supabase service-role key in Vite client environment variables. Only use the public/publishable key in the browser.

## Netlify environment variables

Set these under Netlify -> Project configuration -> Environment variables, then redeploy:

- `VITE_SUPABASE_URL` = the exact Supabase **Project URL**, e.g. `https://xxxxxxxx.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = your Supabase publishable/anon key (never the service_role/secret key)

Do not include `VITE_SUPABASE_URL=` in the value, and do not paste quotes around the value.
