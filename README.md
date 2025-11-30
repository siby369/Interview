# Next.js TypeScript Tailwind Motion Setup

A Next.js project skeleton with TypeScript, Tailwind CSS, and Motion animation library.

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Motion** - Animation library from motion.dev

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the production version:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles with Tailwind
├── public/             # Static assets
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## Using Motion

Motion can be imported and used in your components:

```tsx
import { motion } from "motion/react";

function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Animated content
    </motion.div>
  );
}
```

For more information on using Motion with Tailwind CSS, see the [official documentation](https://motion.dev/docs/react-tailwind).

