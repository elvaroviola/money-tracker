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

    const startingBalance = document
        .getElementById("startingBalance")
        .value
        .replace(/,/g, "");

    const monthlyIncome = document
        .getElementById("monthlyIncome")
        .value
        .replace(/,/g, "");

    const monthlyBudget = document
        .getElementById("monthlyBudget")
        .value
        .replace(/,/g, "");

    const goalName = document
        .getElementById("goalName")
        .value;

    const goalAmount = document
        .getElementById("goalAmount")
        .value
        .replace(/,/g, "");

    const moneySetup = {
        startingBalance: Number(startingBalance) || 0,
        monthlyIncome: Number(monthlyIncome) || 0,
        monthlyBudget: Number(monthlyBudget) || 0,
        goalName: goalName,
        goalAmount: Number(goalAmount) || 0
    };

    localStorage.setItem(
        "moneySetup",
        JSON.stringify(moneySetup)
    );

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

    const savedData = localStorage.getItem("moneySetup");

    if (!savedData) {
        alert("Your money setup is not available yet ♡");
        return;
    }

    const moneyData = JSON.parse(savedData);

    // Sembunyikan Money Setup
    document.getElementById("moneySetupPage").style.display = "none";

    // Tampilkan Dashboard
    document.getElementById("dashboardPage").style.display = "block";

    // Tampilkan Starting Balance
    document.getElementById("dashboardBalance").textContent =
        formatRupiah(moneyData.startingBalance);

    // Tampilkan Monthly Income
    document.getElementById("dashboardIncome").textContent =
        formatRupiah(moneyData.monthlyIncome);

    // Tampilkan Monthly Budget
    document.getElementById("dashboardBudget").textContent =
        formatRupiah(moneyData.monthlyBudget);

    // Tampilkan Goal Name
    document.getElementById("dashboardGoalName").textContent =
        moneyData.goalName || "Your Goal";

    // Tampilkan Goal Amount
    document.getElementById("dashboardGoalAmount").textContent =
        formatRupiah(moneyData.goalAmount);

    // Goal baru dimulai dari 0%
    document.getElementById("goalProgressFill").style.width = "0%";

    document.getElementById("goalProgressText").textContent =
        "0% completed";

    window.scrollTo(0, 0);
}

function formatRupiah(amount) {

    return "Rp " + Number(amount || 0).toLocaleString("en-US");

}

/* ========================================
   AUTOMATIC MONEY FORMAT
======================================== */

function formatMoneyInput(input) {
    let value = input.value;

    // Ambil angka saja
    value = value.replace(/\D/g, "");

    // Kalau kosong, biarkan kosong
    if (value === "") {
        input.value = "";
        return;
    }

    // Tambahkan koma setiap 3 angka
    input.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener("DOMContentLoaded", function () {
    const moneyInputs = [
        "startingBalance",
        "monthlyIncome",
        "monthlyBudget",
        "goalAmount"
    ];

    moneyInputs.forEach(function (id) {
        const input = document.getElementById(id);

        if (input) {
            input.addEventListener("input", function () {
                formatMoneyInput(this);
            });
        }
    });
});
