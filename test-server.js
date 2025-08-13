// Simple test script to check if server endpoints work
const fetch = require("node-fetch").default || require("node-fetch");

const API_BASE_URL = "http://localhost:3000/api";

async function testServer() {
  console.log("🔍 Testing server endpoints...\n");

  try {
    // Test 1: Check if server is running
    console.log("1. Testing server health...");
    const healthResponse = await fetch(`${API_BASE_URL}/test`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log("✅ Server is running:", healthData.message);
    } else {
      console.log("❌ Server health check failed");
      return;
    }

    // Test 2: Test payment order creation
    console.log("\n2. Testing payment order creation...");
    const orderData = {
      orderDetails: {
        name: "Test T-Shirt",
        type: "tshirt",
        size: "L",
        offerPrice: 500,
        image: "test-image.jpg",
      },
      customerDetails: {
        name: "Test User",
        email: "test@example.com",
        whatsapp_number: "+919876543210",
        address: "Test Address",
      },
      orderType: "outside_campus",
    };

    const orderResponse = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const orderResult = await orderResponse.json();
    console.log(
      "Order creation response:",
      JSON.stringify(orderResult, null, 2)
    );

    if (orderResult.success) {
      console.log("✅ Order creation successful!");
    } else {
      console.log("❌ Order creation failed:", orderResult.message);
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.log("\n💡 Make sure your server is running with: node index.js");
  }
}

// Run the test
testServer();
