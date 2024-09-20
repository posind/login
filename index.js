import { qrController, deleteCookie } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/config.js";

wauthparam.auth_ws = "d3NzOi8vYXBpLndhLm15LmlkL3dzL3doYXRzYXV0aC9wdWJsaWM=";
wauthparam.keyword = "aHR0cHM6Ly93YS5tZS82Mjg5NTgwMDAwNjAwMD90ZXh0PXdoNHQ1YXV0aDA=";
wauthparam.tokencookiehourslifetime = 18;

// Keep redirect to /login only if the user has not scanned the QR code
wauthparam.redirect = "/login";

deleteCookie(wauthparam.tokencookiename);

// Start the QR Controller
qrController(wauthparam);

// Function to handle QR login after getting the QR code
async function handleQRLogin(privateKey) {
    try {
        const response = await fetch('https://asia-southeast2-civil-epigram-429004-t8.cloudfunctions.net/webhook/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ privateKey }) // Send the privateKey to your Go backend
        });

        if (!response.ok) {
            throw new Error(`Failed to login: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.Status) {
            // Store token in local storage or cookies for further use
            localStorage.setItem('authToken', data.Token);

            // Redirect to the dashboard upon successful login
            window.location.href = "https://pos.in.my.id/dashboard";
        } else {
            console.error('Login failed:', data.Message);
        }
    } catch (error) {
        console.error('Error during QR login:', error);
    }
}

// Assuming the QR code will give you a privateKey, call handleQRLogin with that privateKey
// Example:
let privateKeyFromQR = 'the-private-key-scanned-from-qr-code'; // Replace with the actual private key from QR code
handleQRLogin(privateKeyFromQR);


// punya pak rolly

// import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/whatsauth.js";
// import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/config.js";

// wauthparam.auth_ws="d3NzOi8vYXBpLndhLm15LmlkL3dzL3doYXRzYXV0aC9wdWJsaWM=";
// //wauthparam.keyword="aHR0cHM6Ly93YS5tZS82MjgzMTMxODk1MDAwP3RleHQ9d2g0dDVhdXRoMA==";
// wauthparam.keyword="aHR0cHM6Ly93YS5tZS82Mjg5NTgwMDAwNjAwMD90ZXh0PXdoNHQ1YXV0aDA=";
// wauthparam.tokencookiehourslifetime=18;
// wauthparam.redirect ="/auth"
// deleteCookie(wauthparam.tokencookiename);
// qrController(wauthparam);
