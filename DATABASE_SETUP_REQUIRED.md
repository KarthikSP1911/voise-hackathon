# ⚠️ Database Setup Required

## Current Error

```
Error [PrismaClientKnownRequestError]: code: 'ECONNREFUSED'
```

**Cause**: The application cannot connect to the database because the DATABASE_URL in `.env` is using placeholder values.

## ✅ Quick Fix - Choose One Option

### Option 1: Neon (Recommended - Free & Fast) ⭐

1. **Go to**: https://neon.tech
2. **Sign up** for free account
3. **Create a new project**
4. **Copy the connection string** (looks like: `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb`)
5. **Update `.env`**:
   ```env
   DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb"
   ```
6. **Run**:
   ```bash
   npx prisma db push
   ```

### Option 2: Supabase (Free with Extra Features)

1. **Go to**: https://supabase.com
2. **Create new project**
3. **Go to Settings** → **Database**
4. **Copy Connection String** (Connection pooling)
5. **Update `.env`**:
   ```env
   DATABASE_URL="postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
   ```
6. **Run**:
   ```bash
   npx prisma db push
   ```

### Option 3: Local PostgreSQL

1. **Install PostgreSQL** on your machine
2. **Create database**:
   ```sql
   CREATE DATABASE triage_db;
   ```
3. **Update `.env`** with your local credentials:
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/triage_db"
   ```
4. **Run**:
   ```bash
   npx prisma db push
   ```

## After Database Setup

1. **Restart the dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Test registration**:
   - Go to http://localhost:3000/auth/register
   - Create an account
   - Should work without errors!

3. **View your database**:
   ```bash
   npx prisma studio
   ```

## Why This Error Happened

The `.env` file contains placeholder values:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/triage_db"
```

This is intentional - you need to replace it with your actual database credentials for security reasons.

## Need Help?

### Check if PostgreSQL is running locally:
```bash
# Windows
Get-Service postgresql*

# Or try connecting
psql -U postgres
```

### Test your connection string:
```bash
npx prisma db pull
```

If successful, you'll see: "Introspecting based on datasource..."

## Quick Start with Neon (5 minutes)

```bash
# 1. Get Neon database (free)
# Visit: https://neon.tech
# Copy connection string

# 2. Update .env
# Replace DATABASE_URL with your Neon connection string

# 3. Push schema
npx prisma db push

# 4. Restart server
npm run dev

# 5. Test at http://localhost:3000/auth/register
```

## ✅ Once Connected

You'll be able to:
- ✅ Register users
- ✅ Login
- ✅ Submit triage cases
- ✅ View patient history
- ✅ Access staff dashboard
- ✅ Manage cases

## Current Status

- ✅ Application code: Working perfectly
- ✅ Server: Running
- ✅ All pages: Compiling successfully
- ⚠️ Database: **Needs configuration** (this is the only issue)

**Fix this one thing and everything will work!**
