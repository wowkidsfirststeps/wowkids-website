# 🚀 WowKids First Steps - Complete Deployment Guide

This guide will walk you through getting your preschool website live on the internet — step by step. No coding experience needed!

---

## 📋 What We'll Set Up

1. **Supabase** — Your database (stores all enquiries from parents)
2. **Vercel** — Hosts your website (makes it accessible on the internet)
3. **Environment Variables** — Connects the website to the database

---

## Step 1: Create a Supabase Account & Project

1. Go to **[https://supabase.com](https://supabase.com)** and click **"Start your project"**
2. Sign up with your email or GitHub account
3. Once logged in, click **"New Project"**
4. Fill in:
   - **Name:** `wowkids-first-steps` (or any name you like)
   - **Database Password:** Create a strong password and **save it somewhere safe**
   - **Region:** Choose `Singapore` (closest to India for faster speeds)
5. Click **"Create new project"** and wait ~2 minutes for it to be ready

---

## Step 2: Run the Database Schema (Create Tables)

1. In your Supabase dashboard, go to the **"SQL Editor"** tab on the left sidebar
2. Click **"New Query"**
3. Open the file called `schema.sql` that came with this project (right-click > Open with Notepad)
4. **Copy ALL the text** from `schema.sql`
5. **Paste it** into the SQL Editor in Supabase
6. Click the **"Run"** button (or press Ctrl+Enter)
7. You should see "Success. No rows returned" or similar — this means the tables are created!

---

## Step 3: Create Your Super Admin Account

1. In the Supabase dashboard, go to **"Authentication"** > **"Users"** (left sidebar)
2. Click **"Add User"**
3. Enter:
   - **Email:** Your email address (e.g., `admin@wowkids.com`)
   - **Password:** Create a strong password (at least 8 characters)
   - **Auto Confirm User:** ✅ Toggle ON
4. Click **"Create User"**

5. Now go to **"SQL Editor"** again
6. Click **"New Query"**
7. Paste this SQL (replace the email with your email):

   ```sql
   UPDATE profiles
   SET role = 'super_admin', is_approved = true
   WHERE email = 'your-email@example.com';
   ```

8. Click **"Run"** — this makes you a Super Admin!

**Save these credentials somewhere safe:**
```
Admin Email: [your-email]
Admin Password: [the password you created]
Admin Login URL: https://[your-site].vercel.app/admin/login
```

---

## Step 4: Get Your Supabase API Keys (Environment Variables)

1. In Supabase, go to **"Project Settings"** > **"API"** (the gear icon on the left sidebar)
2. You will see two important values — **copy these exactly**:

   | Variable Name | Where to Find It |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Under "Project URL" — looks like `https://xxxxxxx.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Under "anon public" — a long string starting with `eyJ...` |

   **Keep these handy — we'll need them in Step 6!**

---

## Step 5: Deploy to Vercel

### 5.1. Push Your Code to GitHub

Since you have the code on your computer, you first need to upload it to GitHub:

1. Go to **[https://github.com](https://github.com)** and sign up/login
2. Click the **"+"** icon (top-right) > **"New repository"**
3. Name it `wowkids-website` and click **"Create repository"**
4. You'll see commands — here's what you need to run in your terminal/command prompt:

   ```bash
   git init
   git add .
   git commit -m "Initial commit - WowKids First Steps website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wowkids-website.git
   git push -u origin main
   ```

   *(Replace `YOUR_USERNAME` with your actual GitHub username)*

### 5.2. Import to Vercel

1. Go to **[https://vercel.com](https://vercel.com)** and click **"Sign Up"** (use GitHub)
2. Click **"Add New..."** > **"Project"**
3. Under "Import Git Repository", find and select **`wowkids-website`**
4. Click **"Import"**

---

## Step 6: Add Environment Variables in Vercel

This is the most important step — it connects your website to the database!

1. After importing, Vercel will show a configuration screen
2. Look for **"Environment Variables"** section
3. Add the following two variables exactly:

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Paste the Project URL from Step 4 |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Paste the anon key from Step 4 |

   **Make sure the names are EXACTLY as written above!**

4. Click **"Deploy"**
5. Wait ~2 minutes while Vercel builds your site
6. When it's done, you'll see a **"Congratulations!"** message with a URL like:
   ```
   https://wowkids-website.vercel.app
   ```

---

## Step 7: Verify Everything Works

1. **Visit your website:** Open the URL from Vercel
2. **Test the enquiry form:** Go to `/enquiry` and submit a test enquiry
3. **Log into Admin:** Go to `/admin/login` and sign in with the credentials you created in Step 3
4. **Check your dashboard:** You should see the test enquiry you submitted!

---

## 🆘 Troubleshooting

### "Failed to load enquiries" in Admin Dashboard
- Make sure you ran the `schema.sql` in Supabase SQL Editor
- Check that your Environment Variables are correctly set in Vercel

### "Invalid login credentials"
- Make sure the user was created in Supabase Auth (Authentication > Users)
- Make sure you ran the SQL to set the user as `super_admin`

### Website shows "404: Not Found"
- The page may not have been deployed correctly. Go to Vercel > Project > "Redeploy"

### Email not working for admin signup confirmation
- In Supabase, go to Authentication > Settings and disable email confirmation if needed, OR check the user's email inbox

---

## 📁 Files You Should Save & Keep Safe

| File | Why It's Important |
|---|---|
| `schema.sql` | Needed to recreate the database |
| `DEPLOYMENT_GUIDE.md` | This guide — keep for reference |
| Supabase project password | Cannot be recovered if lost |
| Admin login credentials | To access your admin dashboard |

---

## ✅ Your Website is LIVE!

**Your public URL:** `https://[your-site].vercel.app`
**Your admin login:** `https://[your-site].vercel.app/admin/login`

Congratulate yourself! You now have a fully functional preschool website with:
- ✅ Beautiful, mobile-friendly public pages
- ✅ Parent enquiry form that saves to database
- ✅ Admin dashboard to manage enquiries
- ✅ Multi-user admin system with approvals

**Need any help?** Reach out to your developer with the files in this folder!
