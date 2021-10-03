//need to create event listener for the signup btn for user to send info the back end
const newUser = async (event) => {
  console.log("TESTING");
  event.preventDefault();

  const username = document.getElementById("newUsername").value.trim();
  const userEmail = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && userEmail && password) {
    const response = await fetch("/api/user-routes", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: userEmail,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
      console.log("Account successfully created!");
      alert("User successfully created!");
    } else {
      alert("Please try again! Could not create account.");
      console.log("Error - User info not uploaded");
    }
  }
};

//event listener for signup
document.getElementById("signupBtn").addEventListener("submit", newUser);
