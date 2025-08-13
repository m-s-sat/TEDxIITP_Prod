const dotenv = require("dotenv");
dotenv.config();
const { Merch } = require("../models/merch");
const createRazorPayInstance = require("../config/razorpayConfig");
const crypto = require("crypto");
const razorpayInstance = createRazorPayInstance();

// Function to create organized notes based on order type (Max 15 fields for Razorpay)
const createPaymentNotes = (orderDetails, customerDetails, orderType) => {
  if (orderType === "campus_student") {
    // Campus Student Notes (14 fields - within limit)
    return {
      // Order Identification (3 fields)
      orderType: "CAMPUS_STUDENT",
      customerCategory: "IIT PATNA CAMPUS STUDENT",
      orderTime: new Date().toLocaleString("en-IN"),

      // Customer Info (3 fields)
      studentName: customerDetails.name || customerDetails.studentName,
      email: customerDetails.email,
      whatsapp: customerDetails.whatsapp_number || customerDetails.whatsappNo,

      // Student Academic Info (4 fields)
      rollNo: customerDetails.rollNo || "Not provided",
      hostel: customerDetails.hostel || "Not provided",
      program: customerDetails.programType || "Not provided",
      year: customerDetails.year || "Not provided",

      // Product Info (3 fields)
      product: `${orderDetails.name} (${orderDetails.type})`,
      size: orderDetails.size,
      price: `₹${orderDetails.offerPrice || orderDetails.price}`,

      // Delivery Info (1 field)
      delivery: "CAMPUS PICKUP - Contact via WhatsApp",
    };
  } else {
    // Outside Campus Notes (15 fields - at limit)
    return {
      // Order Identification (3 fields)
      orderType: "OUTSIDE_CAMPUS",
      customerCategory: "OUTSIDE CAMPUS CUSTOMER",
      orderTime: new Date().toLocaleString("en-IN"),

      // Customer Info (3 fields)
      customerName: customerDetails.name,
      email: customerDetails.email,
      whatsapp: customerDetails.whatsapp_number,

      // Address Info (5 fields)
      street: customerDetails.street || "Not provided",
      city: customerDetails.city || "Not provided",
      state: customerDetails.state || "Not provided",
      pincode: customerDetails.pincode || "Not provided",
      fullAddress: customerDetails.address || "Not provided",

      // Product Info (3 fields)
      product: `${orderDetails.name} (${orderDetails.type})`,
      size: orderDetails.size,
      price: `₹${orderDetails.offerPrice || orderDetails.price}`,

      // Alumni Status (1 field)
      alumniStatus: customerDetails.iitp_mail_id
        ? `ALUMNUS: ${customerDetails.iitp_mail_id}`
        : "EXTERNAL CUSTOMER",
    };
  }
};

// Create Order Controller
exports.createOrder = async (req, res) => {
  try {
    console.log("=== CREATE ORDER REQUEST ===");
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    // For testing - use placeholder credentials if not set
    if (!process.env.RAZORPAY_KEY_ID) {
      console.log(
        "⚠️  Using test credentials - Please set your actual Razorpay credentials in .env file"
      );
      process.env.RAZORPAY_KEY_ID = "rzp_test_placeholder";
      process.env.RAZORPAY_KEY_SECRET = "test_secret_placeholder";
    }

    const { orderDetails, customerDetails, orderType } = req.body;

    // Validate required fields
    if (!orderDetails || !customerDetails || !orderType) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: orderDetails, customerDetails, orderType",
      });
    }

    // Additional security validations
    if (!orderDetails.name || !orderDetails.type || !orderDetails.size) {
      return res.status(400).json({
        success: false,
        message: "Invalid order details: name, type, and size are required",
      });
    }

    if (!customerDetails.name || !customerDetails.email) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer details: name and email are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerDetails.email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate order type
    if (!["campus_student", "outside_campus"].includes(orderType)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order type. Must be 'campus_student' or 'outside_campus'",
      });
    }

    // For testing - skip database lookup and use price from frontend
    console.log("💰 Using price from frontend:", orderDetails.offerPrice);
    const finalPrice = orderDetails.offerPrice;

    if (!finalPrice || finalPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid price provided",
      });
    }

    // Create organized notes
    const paymentNotes = createPaymentNotes(
      { ...orderDetails, price: finalPrice },
      customerDetails,
      orderType
    );

    // Create Razorpay order options
    const options = {
      amount: Math.round(finalPrice * 100), // Amount in paisa
      currency: "INR",
      receipt: `order_${orderType}_${new Date().getTime()}`,
      notes: paymentNotes,
    };

    // Create order with Razorpay
    let order;
    if (process.env.RAZORPAY_KEY_ID === "rzp_test_placeholder") {
      // Mock order for testing without real Razorpay credentials
      console.log("🧪 Creating mock order for testing...");
      order = {
        id: `order_test_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: "created",
      };
    } else {
      // Real Razorpay order creation
      order = await new Promise((resolve, reject) => {
        razorpayInstance.orders.create(options, (err, order) => {
          if (err) {
            reject(err);
          } else {
            resolve(order);
          }
        });
      });
    }

    // Return order details with customer info for frontend
    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
      orderDetails: {
        name: orderDetails.name,
        type: orderDetails.type,
        size: orderDetails.size,
        price: finalPrice,
        image: orderDetails.image,
      },
      customerDetails: {
        name: customerDetails.name || customerDetails.studentName,
        email: customerDetails.email,
        contact: customerDetails.whatsapp_number || customerDetails.whatsappNo,
      },
      orderType,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Error in creating order",
      error: error.message,
    });
  }
};

// Verify Payment Controller
exports.verifyPayment = async (req, res) => {
  try {
    console.log("=== VERIFY PAYMENT REQUEST ===");
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification parameters",
      });
    }

    // Create signature for verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // Verify signature
    if (expectedSignature === razorpay_signature) {
      // Payment is successful and verified
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });
    } else {
      // Signature doesn't match
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      success: false,
      message: "Error in payment verification",
      error: error.message,
    });
  }
};
