# PayMate - Payments & Wallet App

A full-stack digital payment platform built with modern web technologies, featuring user authentication, P2P money transfers, on-ramp payment processing, and real-time transaction management.

## 🚀 Features

- **User Authentication**: Secure login/signup with NextAuth.js
- **P2P Money Transfers**: Send money to other users using phone numbers
- **On-Ramp Payments**: Add money to wallet through payment providers
- **Real-time Balance Management**: Track available and locked balances
- **Transaction History**: View and manage payment history
- **Merchant Dashboard**: Separate merchant application for business users
- **Bank Webhook Integration**: Real-time payment processing with webhook handlers
- **Responsive UI**: Modern, mobile-friendly interface built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - Latest React with concurrent features

### Backend & Database

- **PostgreSQL** - Primary database
- **Prisma ORM** - Type-safe database client
- **NextAuth.js** - Authentication solution
- **Express.js** - Webhook handler server

### Development & Build Tools

- **Turbo** - Monorepo build system
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
paytm-clone/
├── apps/
│   ├── user-app/           # Main user application
│   ├── merchant-app/       # Merchant dashboard
│   └── bank-webhook-handler/ # Payment webhook processor
├── packages/
│   ├── database/           # Prisma schema and client
│   ├── ui/                 # Shared UI components
│   ├── eslint-config/      # Shared ESLint configuration
│   └── typescript-config/  # Shared TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm package manager
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd paytm-clone
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create `.env` files in the following directories:

   **Root directory:**

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/paymate"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   **apps/user-app/.env:**

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/paymate"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3001"
   ```

   **apps/merchant-app/.env:**

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/paymate"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   cd packages/database
   pnpm prisma generate
   pnpm prisma db push
   pnpm prisma db seed
   ```

5. **Start the development servers**

   ```bash
   # Start all applications
   pnpm dev

   # Or start specific applications
   pnpm dev --filter=user-app
   pnpm dev --filter=merchant-app
   pnpm dev --filter=bank-webhook-handler
   ```

### Application URLs

- **User App**: http://localhost:3001
- **Merchant App**: http://localhost:3000
- **Bank Webhook Handler**: http://localhost:3002

## 🏗️ Development

### Available Scripts

```bash
# Development
pnpm dev                    # Start all applications
pnpm dev --filter=user-app # Start specific app

# Build
pnpm build                 # Build all applications
pnpm build --filter=user-app # Build specific app

# Linting
pnpm lint                  # Lint all applications
pnpm lint --filter=user-app # Lint specific app

# Type checking
pnpm check-types           # Check types across all apps
```

### Database Management

```bash
cd packages/database

# Generate Prisma client
pnpm prisma generate

# Push schema changes
pnpm prisma db push

# Run migrations
pnpm prisma migrate dev

# Seed database
pnpm prisma db seed

# Open Prisma Studio
pnpm prisma studio
```

## 🔧 Key Features Implementation

### P2P Money Transfer

- Atomic database transactions for fund transfers
- Real-time balance updates
- Transaction history tracking
- Phone number-based user identification

### On-Ramp Payment Processing

- Webhook integration for payment providers
- Transaction status tracking (Success/Failure/Processing)
- Secure token-based transaction management
- Real-time balance updates on successful payments

### Authentication & Security

- NextAuth.js integration
- Secure password hashing with bcrypt
- Session-based authentication
- Protected API routes

## 📊 Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User accounts with authentication
- **Merchants**: Business user accounts
- **Balances**: User wallet balances
- **OnRampTransactions**: Payment processing transactions
- **P2PTransfers**: Peer-to-peer money transfers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database management with [Prisma](https://www.prisma.io/)
- Monorepo management with [Turborepo](https://turborepo.com/)
