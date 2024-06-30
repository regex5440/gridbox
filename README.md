# Gridbox - E-commerce (Turborepo)

Live at https://gb.hdxdev.in

## Features

> - User CRUD operations
>   - Account Creation
>   - Updating Profile information
> - User Authentication
> - Product Search & Listing
> - Product details page
> - Order creation and tracking
> - Payment Checkout with [Stripe](https://stripe.com/)

## Pre-requisites

- Node >= 20.10.0

## Stack & Utilities

- Next.JS 14
- TypeScript
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- PostgreSQL (powered by [Supabase](https://supabase.com))
- [Prisma ORM](https://www.prisma.io/)
- [SWR](https://swr.vercel.app/)
- [Zod](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io)

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.js`. This was chosen for several reasons:

- Make sharing one `tailwind.config.js` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.js` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

### Environment Variables

```
productAPI=https://dummyjson.com (Currently used)
POSTGRES_PRISMA_URL=<postgresql database connection uri, pooling>
POSTGRES_URL_NON_POOLING=<postgresql data connection uri, direct>
ASSIGNED_URL=<assigned url for the app>
SECRET_KEY=<secret key for hashing>
SESSION_EXPIRY=604800 # 7 days in seconds
PASSWORD_HASH_SALT=10 #(optional, default is 10)
EMAIL_SERVICE=<Url for mailer service>
EMAIL_SERVICE_TOKEN=<mailer service static auth token>

#PAYMENT

PAYMENT_SECRET_KEY=<secret key from payment aggregator>
NEXT_PUBLIC_PUBLISHABLE_KEY=<public key from payment aggregator>
```
