# Gravity Clinic - Staging Deployment Guide

This document outlines the manual steps required to deploy the Gravity Clinic project to a staging or production environment cleanly, without inheriting local development bugs.

## Prerequisites
- A server with PHP 8.2+ and Composer installed.
- Node.js (v18+) and npm/pnpm.
- A MySQL database.

---

## 1. Backend Setup

1. **Copy the Environment File:**
   Navigate to the `Backend-New` directory and copy the template:
   ```bash
   cp .env.example .env
   ```

2. **Configure `.env`:**
   Open `.env` and fill in the staging credentials. Critically ensure:
   - `APP_ENV=staging`
   - `APP_DEBUG=false` (To prevent debug stack traces bleeding to the client).
   - `APP_URL=https://api.yourstagingdomain.com` (Must match the exact API domain).
   - `FRONTEND_URL=https://yourstagingdomain.com` (Crucial for CORS! Without this, the frontend will be blocked).
   - `FILESYSTEM_DISK=public`

3. **Install Dependencies:**
   ```bash
   composer install --optimize-autoloader --no-dev
   ```

4. **Generate App Key:**
   ```bash
   php artisan key:generate
   ```

5. **Link Storage (CRITICAL for Media):**
   Run the storage link command. Without this, uploaded images will be broken in the frontend.
   ```bash
   php artisan storage:link
   ```

6. **Run Migrations (and optionally seed):**
   ```bash
   php artisan migrate --force
   ```
   *Note: Using `--force` is required when `APP_ENV` is not `local`.*

7. **Clear Caches:**
   ```bash
   php artisan optimize:clear
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

---

## 2. Frontend Setup

1. **Environment Configuration:**
   Navigate into the `Frontend` directory. Copy the template:
   ```bash
   cp .env.example .env.production
   ```
   Set `VITE_API_URL` to point to the backend domain you configured above:
   ```env
   VITE_API_URL=https://api.yourstagingdomain.com/api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Build the Project:**
   ```bash
   npm run build
   ```
   This will bundle the React application into the `/dist` directory. Serve this `/dist` directory via your web server (e.g., Nginx, Apache, or Vercel).

## Remaining Risks
- Ensure the production server enforces HTTPS, otherwise secure cookies and modern API requests may fail.
- Check the server's `upload_max_filesize` in `php.ini` to support large media uploads, as default PHP limits are usually 2MB.
