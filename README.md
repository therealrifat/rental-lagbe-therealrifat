# Rental Lagbe

**Project Name:** Rental Lagbe

**Live URL:** [https://rental-lagbe-therealrifat.vercel.app](https://rental-lagbe-therealrifat.vercel.app)

## Purpose

Rental Lagbe is a web application for listing, browsing, and renting equipment. It connects equipment owners with customers through role-based dashboards, a booking flow, and an online payment experience. The project is built with Next.js 16 (App Router), React 19, Tailwind CSS 4, Better Auth, MongoDB, and Stripe.

## Key Features

- **Authentication** — email/password and Google sign-in with Better Auth, backed by MongoDB.
- **Role-based dashboards** — dedicated areas for customers, owners, and admins.
- **Owner equipment management** — add new equipment, view a searchable-style table of listings, and remove equipment.
- **Equipment browsing** — approved equipment shown in a responsive 3-column card grid with search, category, rental type, price range, availability, and sorting controls (currently populated with dummy data).
- **Equipment details** — full information, owner details, and a booking dialog with date selection, quantity, and automatic total calculation.
- **Booking flow** — creates a booking record and redirects the customer to the payment page.
- **Payments** — payment information page and Stripe Checkout success page that verifies the session and displays transaction details.
- **My Rentals** — customer rental history table with payment and booking status (currently populated with dummy data).
- **Profile management** — update personal information and profile image, with live preview.
- **Responsive design** — mobile, tablet, and desktop layouts using Tailwind CSS 4 and reusable UI components.

> Note: some listing and rental views currently use local dummy data; connecting them to the live API is planned follow-up work.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

Create a `.env` file in the project root with:

```env
MONGO_DB_CLIENT_STRING=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_API_BASE_URL=
STRIPE_SECRET_KEY=
```

Equipment and booking data are provided by an external API through `NEXT_PUBLIC_API_BASE_URL`; MongoDB is used for authentication data.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production app |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## npm Packages Used

### Dependencies

- `@base-ui/react`
- `@better-auth/mongo-adapter`
- `@stripe/stripe-js`
- `better-auth`
- `class-variance-authority`
- `cn`
- `lucide-react`
- `mongodb`
- `next`
- `react`
- `react-dom`
- `react-icons`
- `shadcn`
- `stripe`
- `tw-animate-css`

### Dev dependencies

- `@tailwindcss/turbopack`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `babel-plugin-react-compiler`
- `eslint`
- `eslint-config-next`
- `tailwindcss`
- `typescript`
