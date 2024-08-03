# TrustPay

TrustPay is a peer-to-peer payment platform with escrow functionality designed for online entrepreneurs. It facilitates secure transactions between buyers and sellers by holding funds in escrow until the transaction is complete. The platform includes user registration, secure payment processing, transaction status tracking, refund processing, and a simple dispute resolution system.

## Features

### Core Features

- [x] User registration and authentication
- [x] Secure payment processing
- [x] Escrow holding functionality
- [x] Transaction status tracking
- [x] Refund processing
- [x] Simple dispute resolution system
- [ ] Develop a mobile application using React Native

### Frontend (Next.js with TypeScript and Tailwind CSS)

- [x] Landing page explaining the service
- [x] User registration and login pages
- [x] Dashboard for transaction history
- [x] Payment initiation page
- [x] Transaction status page

### Backend (Node.js with Express and TypeScript)

- [x] User authentication API
- [x] Payment processing API (integrating with Stripe)
- [ ] Escrow management system
- [ ] Transaction status update API
- [ ] Refund processing API

### Database 

- [x] Users table
- [x] Transactions table
- [ ] Escrow holdings table

### Payment Integration

- [ ] Integrate with Stripe for payment processing


## How to Use

### Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/edielam/TrustPay.git
   cd TrustPay

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your environment variables (e.g., Stripe API keys).

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Open your browser and navigate to:**
   ```sh
   http://localhost:3000
   ```

### API Endpoints

- **User Registration:** POST `/api/register`
- **User Login:** POST `/api/login`
- **Initiate Transaction:** POST `/api/transactions`
- **Update Transaction Status:** POST `/api/transactions/:id/status`
- **Get Transaction Status:** GET `/api/transactions/:id`
- **Process Refund:** POST `/api/refund/:id`

## Future Enhancements

- [ ] Implement advanced dispute resolution system
- [ ] Add multi-currency support
- [ ] Integrate additional payment gateways
- [ ] Enhance security measures (e.g., 2FA)
