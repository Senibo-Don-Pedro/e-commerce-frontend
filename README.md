# E-commerce Platform - Next.js Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-cyan.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive e-commerce frontend built with Next.js 15, serving as the client-side application for the **[E-commerce RESTful API](https://github.com/Senibo-Don-Pedro/e-commerce-api)**. This application delivers a seamless shopping experience from product discovery to secure checkout.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Configuration](#️-environment-configuration)
- [Project Structure](#-project-structure)
- [Key Features Breakdown](#-key-features-breakdown)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## ✨ Features

### User Experience
- **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS and shadcn/ui components
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Fast Performance** - Optimized loading times with Server-Side Rendering (SSR) and intelligent caching

### Authentication & Security
- **Email/Password Authentication** - Secure user registration and login
- **Google OAuth Integration** - Quick sign-in with Google accounts
- **Session Management** - Secure token-based authentication with JWT

### Shopping Features
- **Dynamic Product Catalog** - Browse products with real-time search and filtering
- **Smart Shopping Cart** - Lightning-fast cart management powered by Zustand
- **Order History** - Track past orders and their delivery status
- **Secure Checkout** - Integrated Paystack payment gateway for safe transactions

### Developer Features
- **Server Actions** - Next.js Server Actions for secure data mutations
- **Type Safety** - Full TypeScript support throughout the application
- **Form Validation** - Robust validation using Zod schemas
- **SEO Optimized** - Better search engine visibility with SSR

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js](https://nextjs.org/) 15 (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 5 |
| **UI Library** | [React](https://reactjs.org/) 18 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) 3 |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Form Validation** | [Zod](https://zod.dev/) |
| **Payment Processing** | [Paystack](https://paystack.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** - v18 or higher ([Download](https://nodejs.org/))
- **pnpm** - Recommended package manager ([Install](https://pnpm.io/installation))
  ```sh
  npm install -g pnpm
  ```
- **Backend API** - A running instance of the [E-commerce API](https://github.com/Senibo-Don-Pedro/e-commerce-api)

### Installation

1. **Clone the repository**
   ```sh
   git clone [YOUR_FRONTEND_REPOSITORY_URL]
   cd e-commerce-frontend
   ```

2. **Install dependencies**
   ```sh
   pnpm install
   ```
   
   *Alternative package managers:*
   ```sh
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the project root:
   ```sh
   cp .env.example .env.local
   ```
   
   Then update the variables (see [Environment Configuration](#️-environment-configuration))

4. **Start the development server**
   ```sh
   pnpm dev
   ```
   
   The application will be available at **http://localhost:3000**

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4403
NEXT_PUBLIC_API_IP=your-api-ip-address

# Authentication
JWT_SECRET=your-jwt-secret-key-here
```

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | Backend API base URL | `http://localhost:4403` |
| `NEXT_PUBLIC_API_IP` | ✅ Yes | Backend API IP address | `127.0.0.1` or production IP |
| `JWT_SECRET` | ✅ Yes | JWT signing secret (must match backend) | `your-secret-key` |

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never include sensitive secrets with this prefix.

## 📁 Project Structure

```
e-commerce-frontend/
├── app/                           # Next.js App Router
│   ├── (store)/                  # Store layout group
│   │   ├── cart/                 # Shopping cart page
│   │   ├── orders/               # Order history page
│   │   ├── payment/              # Payment pages
│   │   │   └── success/          # Payment success page
│   │   ├── products/             # Product pages
│   │   │   └── [productId]/      # Dynamic product detail page
│   │   └── layout.tsx            # Store layout
│   ├── auth/                     # Authentication page
│   ├── oauth-redirect/           # OAuth callback handler
│   ├── ui/                       # UI utilities (fonts)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles
├── actions/                       # Server Actions
│   ├── cart-actions.ts           # Cart operations
│   ├── create-user.ts            # User registration
│   ├── get-orders.ts             # Fetch user orders
│   ├── get-products.ts           # Fetch product list
│   ├── get-single-product.ts     # Fetch product details
│   ├── payment-actions.ts        # Payment processing
│   ├── set-session-cookie.ts     # Session management
│   ├── signin-user.ts            # User authentication
│   └── signout-user.ts           # User logout
├── components/                    # React Components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── password-input.tsx
│   │   ├── skeleton.tsx
│   │   └── ...
│   ├── auth/                     # Authentication components
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   ├── form-error.tsx
│   │   └── form-success.tsx
│   ├── products/                 # Product components
│   │   ├── product-list.tsx
│   │   ├── product-card.tsx
│   │   ├── product-details.tsx
│   │   ├── product-filters.tsx
│   │   └── pagination-controls.tsx
│   ├── cart/                     # Cart components
│   │   ├── cart-data.tsx
│   │   ├── cart-item-card.tsx
│   │   └── cart-initializer.tsx
│   ├── order/                    # Order components
│   │   ├── order-list.tsx
│   │   ├── order-card.tsx
│   │   └── order-filters.tsx
│   ├── payment/                  # Payment components
│   ├── header.tsx                # Site header
│   └── user-nav.tsx              # User navigation
├── lib/                           # Utility Functions
│   ├── auth-cookies.ts           # Cookie management
│   ├── session.ts                # Session handling
│   ├── utils.ts                  # Helper functions
│   └── placeholder-data.ts       # Mock data
├── schemas/                       # Zod Validation Schemas
│   └── auth-schema.ts            # Authentication validation
├── store/                         # Zustand State Management
│   ├── auth-store.ts             # Auth state
│   └── cart-store.ts             # Cart state
├── types/                         # TypeScript Definitions
│   ├── auth.ts                   # Auth types
│   ├── cart.ts                   # Cart types
│   ├── order.ts                  # Order types
│   ├── payment.ts                # Payment types
│   ├── products.ts               # Product types
│   └── index.ts                  # Type exports
├── public/                        # Static Assets
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
├── middleware.ts                  # Next.js middleware
├── components.json                # shadcn/ui config
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── next.config.ts                 # Next.js config
├── tailwind.config.ts             # Tailwind config
└── .env.local                     # Environment variables (create this)
```

## 🎯 Key Features Breakdown

### Authentication Flow
Users can create accounts, log in with email/password or Google OAuth, and maintain secure sessions across the application. JWT tokens are stored securely and automatically refreshed.

### Shopping Experience
The product catalog supports dynamic filtering and search, allowing users to quickly find items. The cart uses optimistic UI updates for instant feedback, with state managed efficiently by Zustand.

### Checkout Process
The checkout flow includes address validation, order summary review, and secure payment processing through Paystack. Users receive immediate confirmation and can track their order status.

### Performance Optimizations
- Server-Side Rendering for critical pages
- Image optimization with Next.js Image component
- Route prefetching for faster navigation
- Efficient code splitting and lazy loading

## 📜 Scripts

```sh
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler check
```

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js application is with [Vercel](https://vercel.com):

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

```sh
# Build the application
pnpm build

# Start the production server
pnpm start
```

Ensure all environment variables are configured in your hosting environment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Senibo Don-Pedro**

- GitHub: [@Senibo-Don-Pedro](https://github.com/Senibo-Don-Pedro)
- Email: senibodonpedro@gmail.com

---

<div align="center">

**[⬆ back to top](#e-commerce-platform---nextjs-frontend)**

Made with ❤️ using Next.js

</div>