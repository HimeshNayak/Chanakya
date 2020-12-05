let email = document.getElementById("user-email");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    email.innerHTML = "Your Email: " + user.email;
    // User is signed in.
    console.log("Logged In");
  } else {
    // No user is signed in.
    off();
    //   document.getElementById("login").style.display = "inline";
    //   document.getElementById("username").style.display = "none";
    console.log("Not Logged In");
  }
});
