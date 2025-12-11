# Authentication Setup Guide

## Environment Variables

Create a `.env.local` file in the `predictionxpert-frontend` directory with the following:

```
NEXT_PUBLIC_SUPABASE_URL=https://slkbrnhpmbyseovkbhuf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsa2JybmhwbWJ5c2VvdmtiaHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODI5MjIsImV4cCI6MjA4MDQ1ODkyMn0.8kwrKjcTYPCx3TGiqlaNMiOsQ7tsDJzFq1twdqqev9w
```

## Database Setup

The database has been configured with:
- `users` table with `first_name`, `last_name`, and `email` fields
- Automatic user profile creation trigger when users sign up

## Features Implemented

✅ **Login Page** (`/login`)
- Email and password authentication
- Error handling
- Link to signup page

✅ **Signup Page** (`/signup`)
- First Name, Last Name, Email, and Password fields
- Automatic user profile creation
- Link to login page

✅ **Authentication Context**
- Global auth state management
- User session handling
- Sign out functionality

✅ **Protected Routes**
- Middleware protection for authenticated routes
- Automatic redirect to login if not authenticated

✅ **Home Page**
- Shows welcome message when logged in
- Redirects to login if not authenticated
- Sign out button

## Running the Application

1. Make sure you have created the `.env.local` file with your Supabase credentials
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:3000`
4. You'll be redirected to `/login` if not authenticated
5. Create an account or login to access the application

## Next Steps

- Customize the dashboard page (`/dashboard`)
- Add password reset functionality
- Add email verification
- Customize the UI styling
