/* ========================================
   MONEY TRACKER
   MAIN JAVASCRIPT
======================================== */


/* ========================================
   SPLASH → AUTH PAGE
======================================== */

function goToAuth() {

    document.getElementById("splashScreen").style.display = "none";

    document.getElementById("authPage").style.display = "flex";

}


/* ========================================
   SHOW LOGIN
======================================== */

function showLogin() {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");

    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const authFooter = document.getElementById("authFooter");


    loginForm.classList.remove("hidden");

    registerForm.classList.add("hidden");


    loginTab.classList.add("active");

    registerTab.classList.remove("active");


    authTitle.textContent = "Welcome back!";

    authSubtitle.textContent =
        "Let's keep your money journey organized ♡";


    authFooter.innerHTML = `
        New here?
        <button type="button" onclick="showRegister()">
            Create an account
        </button>
    `;

}


/* ========================================
   SHOW REGISTER
======================================== */

function showRegister() {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");

    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const authFooter = document.getElementById("authFooter");


    loginForm.classList.add("hidden");

    registerForm.classList.remove("hidden");


    loginTab.classList.remove("active");

    registerTab.classList.add("active");


    authTitle.textContent = "Start your journey!";

    authSubtitle.textContent =
        "A little step today, a better tomorrow ♡";


    authFooter.innerHTML = `
        Already have an account?
        <button type="button" onclick="showLogin()">
            Login
        </button>
    `;

}


/* ========================================
   LOGIN
======================================== */

function handleLogin(event) {

    event.preventDefault();

    goToWelcome();

}


/* ========================================
   REGISTER
======================================== */

function handleRegister(event) {

    event.preventDefault();


    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Your passwords don't match ♡");

        return;

    }


    goToWelcome();

}


/* ========================================
   GO TO WELCOME PAGE
======================================== */

function goToWelcome() {

    document.getElementById("authPage").style.display = "none";

    document.getElementById("welcomePage").style.display = "flex";

}


/* ========================================
   GO TO DASHBOARD
======================================== */

function goToDashboard() {

    alert("Dashboard is coming next ♡");

}
