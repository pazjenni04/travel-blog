//form to login to an existing account
const form = {
  submit: document.querySelector("#submitBtn"),
};

let submitForm = form.submit.addEventListener("click", (event) => {
  event.preventDefault();

  let email = document.querySelector("#userEmail").value.trim();
  let password = document.querySelector("#userPassword").value.trim();

  if (email && password) {
    const response = fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Login failed. Try again.");
      }
    });
  }
});

//new sign-up (account)
const newAccount = async (event) => {
  event.preventDefault();

  const newEmail = document.getElementById("email-signup").value.trim();
  const newPassword = document.getElementById("password-signup").value.trim();
  const newUsername = document.getElementById("newUsername").value.trim();

  if (newUsername && newEmail && newPassword) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        newEmail,
        newPassword,
        newUsername,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up");
    }
  }
};

//event listener for signup

document.getElementById("signupBtn").addEventListener("submit", newAccount);
