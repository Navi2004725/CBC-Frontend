# CBC Frontend

**Industry:** E-commerce / Retail (Online Storefront + Admin Management)

This is the frontend for a commerce platform with customer-facing shopping flows and an admin dashboard for product and order management. It is built with React and Vite, styled with Tailwind CSS, and integrates with a backend API via Axios. Authentication flows include standard login/registration and Google OAuth.

## Key Features
- Customer storefront pages: product listing, product overview, cart, and checkout
- Admin dashboard: product listing, add/update product, and order management
- Authentication: login, register, and forget password flows
- Google OAuth provider integration
- Responsive layout structure with reusable components

## Tech Stack
- React 19 + Vite 6
- React Router 7
- Tailwind CSS 4
- Axios
- React Hot Toast
- Google OAuth (frontend provider)
- Supabase JS (installed for backend integration when needed)

## Project Structure
```
src/
  components/        Reusable UI components
  pages/
    admin/           Admin routes (products, orders, add/update)
    client/          Client routes (products, cart, checkout)
  utils/             Helper utilities (cart, media upload)
  App.jsx            Routing and providers
```

## Environment Variables
Create a `.env` file in the project root and set:
```
VITE_BACKEND_URL=https://your-backend-domain
```

## Routes Overview
- `/*` Client routes (home, products, cart, checkout, overview)
- `/login` Login page
- `/register` Registration page
- `/forget` Forgot password page
- `/admin/*` Admin dashboard routes

## Getting Started
1. Install dependencies:
```
npm install
```

2. Run the development server:
```
npm run dev
```

3. Build for production:
```
npm run build
```

4. Preview the production build:
```
npm run preview
```

## Notes
- The Google OAuth client configuration is currently defined in `src/App.jsx`. For production, move secrets to environment variables and use a secure backend flow.
- The admin dashboard validates user role from the backend API before allowing access.
