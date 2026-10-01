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
   MONEY SETUP / MONEY JOURNEY
======================================== */


/* START MONEY SETUP */

function startMoneySetup() {

    document
        .getElementById("welcomePage")
        .style.display = "none";

    document
        .getElementById("moneySetupPage")
        .style.display = "flex";

    showSetupStep(1);

    window.scrollTo(0, 0);

}


/* ========================================
   SHOW SETUP STEP
======================================== */

function showSetupStep(step) {

    const steps =
        document.querySelectorAll(".setup-step");

    steps.forEach(function(stepElement) {

        stepElement.classList.remove("active");

    });


    const selectedStep =
        document.getElementById(
            "setupStep" + step
        );


    if (selectedStep) {

        selectedStep.classList.add("active");

    }


    updateSetupProgress(step);

}


/* ========================================
   MOVE BETWEEN STEPS
======================================== */

function nextSetupStep(step) {

    showSetupStep(step);

    window.scrollTo(0, 0);

}


/* ========================================
   PROGRESS DOTS
======================================== */

function updateSetupProgress(step) {

    const dots =
        document.querySelectorAll(".progress-dot");


    dots.forEach(function(dot, index) {

        if (index < step) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

    });

}


/* ========================================
   SELECT OPTIONS
======================================== */

function toggleOption(button) {

    button.classList.toggle("selected");

}


/* ========================================
   FINISH MONEY SETUP
======================================== */

function finishMoneySetup() {

    document
        .getElementById("setupStep4")
        .classList.remove("active");

    document
        .getElementById("setupComplete")
        .classList.add("active");

    window.scrollTo(0, 0);

}


/* ========================================
   ENTER MONEY WORLD
======================================== */

function enterMoneyWorld() {

    alert("Your Money World is coming next ♡");

}

/* ========================================
   AUTOMATIC MONEY FORMAT
======================================== */

function formatMoneyInput(input) {

    let value = input.value.replace(/,/g, "");

    value = value.replace(/\D/g, "");

    if (value === "") {
        input.value = "";
        return;
    }

    input.value = value.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
    );

}


/* ========================================
   APPLY MONEY FORMATTER
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const moneyInputs = document.querySelectorAll(
        "#startingBalance, #monthlyIncome, #monthlyBudget, #goalAmount"
    );

    moneyInputs.forEach(function (input) {

        input.addEventListener("input", function () {

            formatMoneyInput(input);

        });

    });

});
