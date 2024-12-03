var signup = document.getElementById("signup");
var signIn = document.getElementById("signIn");
var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var Loginbtn = document.getElementById("Loginbtn");
var SignUPbtn = document.getElementById("SignUPbtn");
var NoAccount = document.getElementById("NoAccount");
var HaveAccount = document.getElementById("HaveAccount");
var exist = document.getElementById("exist");
var success = document.getElementById("success");
var incorrect = document.getElementById("incorrect");
var LogOut = document.getElementById("LogOut");
var AllRequired = document.getElementById("AllRequired");
var PassMsg = document.getElementById("PassMsg");
var EmailMsg = document.getElementById("EmailMsg");
var NameMsg = document.getElementById("NameMsg");
var userData = [];
if (JSON.parse(localStorage.getItem("Data"))) {
  userData = JSON.parse(localStorage.getItem("Data"));
}

if (signup) {
  signup.addEventListener("click", function () {
    userName.classList.replace("d-none", "d-block");
    Loginbtn.classList.add("d-none");
    NoAccount.classList.add("d-none");
    HaveAccount.classList.replace("d-none", "d-block");
    SignUPbtn.classList.replace("d-none", "d-block");
    clearForm();
  });
}
if (signIn) {
  signIn.addEventListener("click", function () {
    userName.classList.replace("d-block", "d-none");
    Loginbtn.classList.replace("d-none", "d-block");
    NoAccount.classList.remove("d-none");
    HaveAccount.classList.replace("d-block", "d-none");
    SignUPbtn.classList.replace("d-block", "d-none");
    exist.classList.replace("d-block", "d-none");
    success.classList.replace("d-block", "d-none");
    clearForm();
  });
}
if (SignUPbtn) {
  SignUPbtn.addEventListener("click", function () {
    if (NameValidation() && EmailValidation() && passValidation()) {
      AllRequired.classList.replace("d-blok", "d-none");

      if (userExist() === "Exists") {
        success.classList.replace("d-block", "d-none");
        exist.classList.replace("d-none", "d-block");
        incorrect.classList.replace("d-block", "d-none");
      } else {
        exist.classList.replace("d-block", "d-none");
        success.classList.replace("d-none", "d-block");
        incorrect.classList.replace("d-block", "d-none");
        signUp();
        clearForm();
      }
    } else {
      AllRequired.classList.replace("d-none", "d-block");
    }
  });
}
if (userName) {
  userName.addEventListener("blur", function () {
    NameValidation();
  });
}
if (userPassword) {
  userPassword.addEventListener("blur", function () {
    passValidation();
  });
}
if (userEmail) {
  userEmail.addEventListener("blur", function () {
    EmailValidation();
  });
}

if (Loginbtn) {
  Loginbtn.addEventListener("click", function () {
    if (EmailValidation() && passValidation()) {
      AllRequired.classList.replace("d-blok", "d-none");
      userSignIn();
    } else {
      AllRequired.classList.replace("d-none", "d-block");
    }
  });
} else {
  userDisplayName();
}
if (LogOut) {
  LogOut.addEventListener("click", function () {
    location.href = "../index.html";
  });
}

function signUp() {
  var user = {
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value,
  };
  userData.push(user);
  localStorage.setItem("Data", JSON.stringify(userData));
}

function clearForm() {
  userName.value = null;
  userEmail.value = null;
  userPassword.value = null;
}

function userExist() {
  for (var i = 0; i < userData.length; i++) {
    if (userData[i].email === userEmail.value) {
      return "Exists";
    } else {
      return "success";
    }
  }
}

function userSignIn() {
  for (var i = 0; i < userData.length; i++) {
    if (
      userData[i].email === userEmail.value &&
      userData[i].password === userPassword.value
    ) {
      localStorage.setItem("username", userData[i].name);
      incorrect.classList.replace("d-block", "d-none");
      location.href = "pages/home.html";
      return;
    } else {
      incorrect.classList.replace("d-none", "d-block");
    }
  }
}
function userDisplayName() {
  var correctUserName = localStorage.getItem("username");
  document.getElementById("HomeH1").innerHTML = `Welcome ${correctUserName}`;
}
// function Validation(input) {
//   var regex = {
//     NameRegex: /^[A-Z][a-zA-Z]{3,19}$/,
//     EmailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//     PasswordRegex: /^[a-zA-Z0-9]{8,16}$/,
//   };
//   switch (input) {
//     case userName:
//       {
//         if (regex.NameRegex.test(userName.value)) {
//           NameMsg.classList.replace("d-block", "d-none");
//           return 1;
//         } else {
//           NameMsg.classList.replace("d-none", "d-block");
//           return 0;
//         }
//       }
//       break;
//     case userEmail:
//       {
//         if (regex.EmailRegex.test(userEmail.value)) {
//           EmailMsg.classList.replace("d-block", "d-none");
//           return 1;
//         } else {
//           EmailMsg.classList.replace("d-none", "d-block");
//           return 0;
//         }
//       }
//       break;
//     case userPassword:
//       {
//         if (regex.PasswordRegexRegex.test(userPassword.value)) {
//           PassMsg.classList.replace("d-block", "d-none");
//           return 1;
//         } else {
//           PassMsg.classList.replace("d-none", "d-block");
//           return 0;
//         }
//       }
//       break;
//   }
// }
function EmailValidation() {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(userEmail.value)) {
    EmailMsg.classList.replace("d-block", "d-none");
    return 1;
  } else {
    EmailMsg.classList.replace("d-none", "d-block");
    return 0;
  }
}
function NameValidation() {
  var regex = /^[A-Z].{3,19}$/;
  if (regex.test(userName.value)) {
    NameMsg.classList.replace("d-block", "d-none");
    return 1;
  } else {
    NameMsg.classList.replace("d-none", "d-block");
    return 0;
  }
}
function passValidation() {
  var regex = /^[a-zA-Z0-9]{8,16}$/;
  if (regex.test(userPassword.value)) {
    PassMsg.classList.replace("d-block", "d-none");
    return 1;
  } else {
    PassMsg.classList.replace("d-none", "d-block");
    return 0;
  }
}
