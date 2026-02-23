# Deployment Guide — VANDA STUDIO

## 1. Build

```bash
# Build both apps
npm run build

# Or individually
npm run build:public  → dist-public/
npm run build:admin   → dist-admin/
```

## 2. Rename HTML files after build (REQUIRED)

The build generates `index-admin.html` and `index-public.html`.
**Web servers expect `index.html`.** Rename them:

```bash
# After build:public
mv dist-public/index-public.html dist-public/index.html

# After build:admin
mv dist-admin/index-admin.html dist-admin/index.html
```

Or add these to your CI/CD pipeline.

## 3. Upload to server

```bash
# Admin app
rsync -avz dist-admin/ user@server:/var/www/app.vanda-studio.org/

# Public app
rsync -avz dist-public/ user@server:/var/www/vanda-studio.org/
```

## 4. Configure your web server

### Nginx (recommended)
Copy the config files from this directory:
- `nginx-admin.conf` → `/etc/nginx/sites-available/app.vanda-studio.org`
- `nginx-public.conf` → `/etc/nginx/sites-available/vanda-studio.org`

Then enable and reload:
```bash
ln -s /etc/nginx/sites-available/app.vanda-studio.org /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/vanda-studio.org /etc/nginx/sites-enabled/
nginx -t && nginx -s reload
```

### Apache (.htaccess)
Place the `admin.htaccess` file at the root of `dist-admin/` and rename it to `.htaccess`.
Place the `public.htaccess` file at the root of `dist-public/` and rename it to `.htaccess`.

## 5. Why the MIME error happened

The error `Expected a JavaScript module but got text/html` means:
- The server returned the HTML index page when the browser asked for a `.js` file.
- This happens when the server doesn't have a fallback for SPA routing.
- **Solution**: `try_files $uri $uri/ /index.html` in nginx, or `FallbackResource /index.html` in Apache.

## 6. Environment Variables Summary

| Variable | Development | Production |
|---|---|---|
| `VITE_ADMIN_URL` | `http://localhost:5173` | `https://app.vanda-studio.org` |
| `VITE_API_URL` | `http://localhost:8000/api` | `https://api.vanda-studio.org/api` |
