document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");
  const verifyButton = document.getElementById("verifyButton");
  const resendLink = document.getElementById("resendLink");
  const responseDiv = document.getElementById("response");

  sendButton.addEventListener("click", () => {
    const phoneNumber = document.getElementById("phoneNumber").value;
    if (phoneNumber) {
      responseDiv.textContent = "Sending STP to " + phoneNumber;
      // Implement your logic to send STP here
    } else {
      responseDiv.textContent = "Please enter a phone number.";
    }
  });

  verifyButton.addEventListener("click", () => {
    const password = document.getElementById("password").value;
    if (password) {
      responseDiv.textContent = "Verifying STP with password " + password;
      // Implement your logic to verify STP here
    } else {
      responseDiv.textContent = "Please enter the password.";
    }
  });

  resendLink.addEventListener("click", () => {
    responseDiv.textContent = "Resending STP...";
    // Implement your logic to resend STP here
  });
});
