// import { sendSTP, verifySTP, resendSTP } from "./otp.js";

document.getElementById("sendButton").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;
  const captchaToken = document
    .querySelector(".cf-turnstile")
    .getAttribute("data-response");

  if (!phoneNumber || !captchaToken) {
    showResponse("Phone number and captcha are required.");
    return;
  }

  if (!validatePhoneNumber(phoneNumber)) {
    showResponse("Invalid phone number format.");
    return;
  }

  try {
    const response = await sendSTP(phoneNumber, captchaToken);
    showResponse(`STP sent successfully: ${JSON.stringify(response)}`);
  } catch (error) {
    showResponse(`Error: ${error.message}`);
  }
});

document.getElementById("verifyButton").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;

  if (!phoneNumber || !password) {
    showResponse("Phone number and password are required.");
    return;
  }

  try {
    const response = await verifySTP(phoneNumber, password);
    showResponse(`STP verified successfully: ${JSON.stringify(response)}`);
  } catch (error) {
    showResponse(`Error: ${error.message}`);
  }
});

document.getElementById("resendButton").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phoneNumber").value;

  if (!phoneNumber) {
    showResponse("Phone number is required.");
    return;
  }

  try {
    const response = await resendSTP(phoneNumber);
    showResponse(`STP resent successfully: ${JSON.stringify(response)}`);
  } catch (error) {
    showResponse(`Error: ${error.message}`);
  }
});

function showResponse(message) {
  const responseElement = document.getElementById("response");
  responseElement.textContent = message;
  responseElement.style.display = "block";
}

function validatePhoneNumber(number) {
  const phoneRegex = /^62\d{9,15}$/;
  return phoneRegex.test(number);
}
