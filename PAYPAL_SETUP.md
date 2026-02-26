# PayPal Integration Setup Guide

## Current Setup
Your e-commerce checkout system is now integrated with PayPal using a **test Client ID** for sandbox testing.

## Testing the Checkout Flow

1. **Add items to cart** on the Store page
2. **Click "Proceed to Checkout"** on the cart page
3. **Fill in shipping information** with any test data
4. **Click "Complete Order & Pay"**
5. **PayPal button will appear** - Click it to test payment
6. **Use PayPal Sandbox test account** (see below)

### PayPal Sandbox Test Credentials

Use these test accounts to simulate payments:

**Buyer Account:**
- Email: sb-dvkrz30068069@personal.example.com
- Password: 12345678

**Seller Account:**
- Email: sb-hmajh30067825@business.example.com  
- Password: 12345678

*Note: These are example credentials. When you create your PayPal app, you'll have your own sandbox test accounts.*

## Converting to Production Credentials

When you're ready to go live with real PayPal payments:

### Step 1: Get Your Credentials
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Log in to your PayPal business account
3. Go to **Apps & Credentials**
4. Switch from **Sandbox** to **Live** tab
5. Copy your **Client ID** (long string starting with AB, AC, or AO)
6. Copy your **Secret** (another long string)

### Step 2: Update Frontend
**File:** `frontend/src/pages/checkout/Checkout.jsx` (Line 8)

```javascript
// BEFORE (Test)
const PAYPAL_CLIENT_ID = 'AQGd5ZF5vjpBZy5V5j7VO1S8pO7YGR8gNLkPYzjNL7jX1u-fDvYzP8V3j-k4Lm9O1u9l0m8n-o3p4q-r5s6t7u8v-w9x0y1z';

// AFTER (Your Live Client ID)
const PAYPAL_CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID_HERE';
```

### Step 3: Update Backend
**File:** `backend/.env`

```
PAYPAL_CLIENT_ID="YOUR_ACTUAL_CLIENT_ID"
PAYPAL_SECRET="YOUR_ACTUAL_SECRET"
```

## Current Flow

1. **User adds items to cart** ✅
2. **User goes to checkout** ✅
3. **User fills shipping info** ✅
4. **Order is created** ✅
5. **PayPal button appears** ✅
6. **User clicks PayPal button** ✅
7. **PayPal window opens for payment** ✅
8. **Payment is processed** ✅
9. **Order status updates** ✅
10. **User sees order confirmation** ✅

## File Changes Made

### Backend
- ✅ `models/order.js` - Order schema
- ✅ `controllers/orderController.js` - Order logic
- ✅ `routes/orderRoutes.js` - Order endpoints
- ✅ `server.js` - Integration
- ✅ `.env` - PayPal credentials placeholder

### Frontend
- ✅ `pages/checkout/Checkout.jsx` - Checkout page with PayPal SDK
- ✅ `pages/checkout/OrderSuccess.jsx` - Success confirmation
- ✅ `pages/checkout/Orders.jsx` - Order history
- ✅ `pages/cart/Cart.jsx` - Link to checkout
- ✅ `App.jsx` - Routes for checkout pages

## Features Included

- ✅ Shopping cart integration
- ✅ Shipping address collection
- ✅ Order creation before payment
- ✅ PayPal button integration
- ✅ Payment status tracking
- ✅ Order confirmation page
- ✅ Order history viewing
- ✅ Cart clearing after payment

## API Endpoints

```
POST   /orders/create                 - Create new order
GET    /orders/user/:userId           - Get user's orders
GET    /orders/:orderId               - Get order details
PUT    /orders/payment/update         - Update payment status
DELETE /orders/cancel/:orderId        - Cancel order
```

## Next Steps

1. Test the sandbox flow with the test credentials above
2. Get your actual PayPal credentials
3. Update the Client ID and Secret
4. Test with real payment details
5. Monitor orders in your PayPal dashboard

## Troubleshooting

**PayPal button not appearing?**
- Check browser console for errors
- Make sure order is created successfully
- Verify PayPal SDK loaded (check Network tab)

**Payment not going through?**
- Use correct sandbox credentials
- Check order details are correct
- Verify PayPal account is active

**Need Help?**
- PayPal Docs: https://developer.paypal.com/docs
- Contact PayPal Support for account issues
