const passwordField = document.getElementById("password");
const checkBox = document.getElementById("checkbox");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginText = document.getElementById("login-form");
const signLink = document.querySelector(".su-link");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signup-password");
const signupConfirmPassword = document.getElementById("signup-Confirmpassword");


checkBox.addEventListener('change' , function(){
    if(checkBox.checked){
        passwordField.type = `text`;
        } else {
            passwordField.type = `password`;
        }
});



loginBtn.onclick = function(){
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};


signupBtn.onclick = function (){
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
};


signLink.onclick = function () {
    signupBtn.click();
    return false;
};

signupForm.addEventListener('submit' , function(e){
    e.preventDefault();


    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;

    const savedEmail = localStorage.getItem("signupEmail");

    if(savedEmail === email){
        alert("You have already signed up!");
        clearSignupForm();
        return;
    }

    if(password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }


    localStorage.setItem("signupEmail", email);
    localStorage.setItem("signupPassword", password);


    alert("You have successfully signed up!");

    clearSignupForm();

    loginBtn.click();
});


loginForm.addEventListener('submit' , function(e){
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;

    const savedEmail = localStorage.getItem("signupEmail");
    const savedPassword = localStorage.getItem("signupPassword");

    if(email === savedEmail) {
        if(password === savedPassword) {
            alert("You have successfully logged in!");
            clearloginForm();
    } else{
        alert("Password not match! Please enter correct password.");
    }
}else{
    // alert("Email not found! Please enter correct email.");
    alert("User not found. Please sign up first.");

}

function clearloginForm (){
    loginEmail.value = "";
loginPassword.value = "";
}



});




function clearSignupForm(){
    signupEmail.value = "";
    signupPassword.value = "";
    signupConfirmPassword.value = "";
}