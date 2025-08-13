# TEDx Server-Side Razorpay Integration Guide

## Overview

This guide explains how to set up and use the secure server-side Razorpay payment integration for your TEDx merchandise and ticket sales.

## Security Features Implemented

### Backend Security

1. **Server-side order creation** - Orders are created securely on your server
2. **Payment verification** - All payments are verified using HMAC SHA256 signatures
3. **Rate limiting** - Protection against spam and brute force attacks
4. **Input sanitization** - XSS and injection protection
5. **Request size limits** - Protection against large payload attacks
6. **CORS configuration** - Proper cross-origin resource sharing setup
7. **Environment variables** - Sensitive data stored securely

### Frontend Security

1. **No sensitive keys exposed** - Razorpay Key ID is fetched from server
2. **Payment verification** - All payments verified on server before success
3. **Error handling** - Comprehensive error handling and user feedback
4. **Loading states** - Prevents multiple payment attempts

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in your backend root with:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Server Configuration
PORT=3000
NODE_ENV=production

# CORS Origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourdomain.com
```

### 2. Install Dependencies

Run the following command in your backend directory:

```bash
npm install express-rate-limit helmet cors express-validator
```

### 3. Frontend Configuration

Update the API_BASE_URL in your payment component:

```javascript
// In payment_Merch_ServerSide.vue
const API_BASE_URL = "http://localhost:3000/api"; // Development
// const API_BASE_URL = 'https://your-backend-domain.com/api' // Production
```

### 4. Include Razorpay Script

Add this to your main HTML file:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

## API Endpoints

### POST /api/payments/create-order

Creates a new payment order on the server.

**Request Body:**

```json
{
  "orderDetails": {
    "name": "TEDx T-Shirt",
    "type": "tshirt",
    "size": "L",
    "offerPrice": 500,
    "image": "image_url"
  },
  "customerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "whatsapp_number": "+919876543210",
    "address": "Complete address" // for outside_campus
  },
  "orderType": "campus_student" // or "outside_campus"
}
```

**Response:**

```json
{
  "success": true,
  "order": {
    "id": "order_xyz123",
    "amount": 50000,
    "currency": "INR"
  },
  "razorpayKeyId": "rzp_test_xxxxx",
  "orderDetails": { ... },
  "customerDetails": { ... }
}
```

### POST /api/payments/verify-payment

Verifies the payment signature.

**Request Body:**

```json
{
  "razorpay_order_id": "order_xyz123",
  "razorpay_payment_id": "pay_abc456",
  "razorpay_signature": "signature_hash"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment verified successfully",
  "paymentId": "pay_abc456",
  "orderId": "order_xyz123"
}
```

## Payment Flow

### 1. Frontend Initiates Payment

- User fills form and clicks "Pay"
- Frontend calls `/api/payments/create-order`
- Server creates Razorpay order and returns order details

### 2. Razorpay Checkout Opens

- Frontend opens Razorpay checkout with server-provided details
- User completes payment
- Razorpay returns payment response

### 3. Payment Verification

- Frontend sends payment details to `/api/payments/verify-payment`
- Server verifies signature using HMAC SHA256
- Server confirms payment success/failure

### 4. Order Completion

- On successful verification, order is confirmed
- User receives success confirmation
- Order details are stored with payment information

## Error Handling

### Common Error Scenarios

1. **Network errors** - Connection issues with server
2. **Validation errors** - Invalid form data
3. **Payment failures** - Card declined, insufficient funds
4. **Verification failures** - Signature mismatch

### Error Response Format

```json
{
  "success": false,
  "message": "Descriptive error message",
  "code": "ERROR_CODE" // Optional
}
```

## Rate Limiting

### Payment Endpoints

- **Limit:** 10 requests per 15 minutes per IP
- **Purpose:** Prevent spam and abuse

### General Endpoints

- **Limit:** 100 requests per 15 minutes per IP
- **Purpose:** General API protection

## Security Best Practices

### Server-Side

1. Never expose Razorpay Key Secret to frontend
2. Always verify payment signatures
3. Use HTTPS in production
4. Implement proper logging for payment events
5. Store sensitive data in environment variables
6. Use rate limiting and input validation

### Frontend

1. Never store sensitive payment information
2. Always verify payments on server
3. Handle errors gracefully
4. Show loading states during processing
5. Implement proper CORS configuration

## Testing

### Test Mode

1. Use Razorpay test keys for development
2. Test with Razorpay test card numbers
3. Verify all error scenarios

### Production Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting active
- [ ] Error handling tested
- [ ] Payment verification working
- [ ] Logging implemented

## Troubleshooting

### Common Issues

1. **CORS errors**

   - Check allowed origins in security middleware
   - Verify frontend URL is included

2. **Payment verification fails**

   - Check Razorpay Key Secret
   - Verify signature generation logic

3. **Rate limit exceeded**

   - Check if too many requests from same IP
   - Adjust rate limit if needed for legitimate traffic

4. **Order creation fails**
   - Verify merchandise exists in database
   - Check required field validation

## Support

For issues with this integration:

1. Check server logs for detailed error messages
2. Verify environment variables are set correctly
3. Test with Razorpay test credentials first
4. Check network connectivity between frontend and backend

## Production Deployment

### Backend Deployment

1. Set NODE_ENV=production
2. Use production Razorpay keys
3. Enable HTTPS
4. Set proper CORS origins
5. Configure proper logging

### Frontend Deployment

1. Update API_BASE_URL to production backend
2. Ensure Razorpay script is loaded
3. Test complete payment flow
4. Monitor error rates

---

**Note:** Always test thoroughly in development before deploying to production. Keep your Razorpay credentials secure and never commit them to version control.
