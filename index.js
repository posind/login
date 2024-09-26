// Import necessary functions from whatsauth
import { qrController, deleteCookie } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/config.js";

// Set the WebSocket URL for authentication
wauthparam.auth_ws = "wss://your-backend-api-url/ws/whatsauth/public";  // Update with your backend WebSocket URL
wauthparam.keyword = "aHR0cHM6Ly93YS5tZS82Mjg5NTgwMDAwNjAwMD90ZXh0PXdoNHQ1YXV0aDA=";
wauthparam.tokencookiehourslifetime = 18;  // Set token lifetime
wauthparam.redirect = "/auth";  // Redirect after successful login

// Delete any existing token cookies before starting the login process
deleteCookie(wauthparam.tokencookiename);

// Function to handle QR login interaction with your backend
function customQRLogin() {
  // Make an API call to your backend to initiate the QR login process
  fetch("https://asia-southeast2-civil-epigram-429004-t8.cloudfunctions.net/webhook/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.status && data.token) {
      // Store the token in a cookie or localStorage
      document.cookie = `${wauthparam.tokencookiename}=${data.token}; max-age=${wauthparam.tokencookiehourslifetime * 3600}; path=/`;

      // Redirect after successful login
      window.location.href = wauthparam.redirect;
    } else {
      console.error("QR Login failed: ", data.message);
    }
  })
  .catch(error => {
    console.error("Error during QR login: ", error);
  });
}

// Trigger QR login controller to display QR code
qrController(wauthparam);

// Call custom QR login when the QR code is scanned successfully
customQRLogin();


// qr login punya pak rolly 
// import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/whatsauth.js";
// import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/config.js";

// wauthparam.auth_ws="d3NzOi8vYXBpLndhLm15LmlkL3dzL3doYXRzYXV0aC9wdWJsaWM=";
// //wauthparam.keyword="aHR0cHM6Ly93YS5tZS82MjgzMTMxODk1MDAwP3RleHQ9d2g0dDVhdXRoMA==";
// wauthparam.keyword="aHR0cHM6Ly93YS5tZS82Mjg5NTgwMDAwNjAwMD90ZXh0PXdoNHQ1YXV0aDA=";
// wauthparam.tokencookiehourslifetime=18;
// wauthparam.redirect ="/auth"
// deleteCookie(wauthparam.tokencookiename);
// qrController(wauthparam);
