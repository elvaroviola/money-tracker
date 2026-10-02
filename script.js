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

    document.getElementById("moneySetupPage").style.display = "none";

    document.getElementById("dashboardPage").style.display = "block";

    document.getElementById("dashboardBalance").textContent =
        formatRupiah(moneyData.startingBalance);

    document.getElementById("dashboardIncome").textContent =
        formatRupiah(moneyData.monthlyIncome);

    document.getElementById("dashboardBudget").textContent =
        formatRupiah(moneyData.monthlyBudget);

    document.getElementById("dashboardGoalName").textContent =
        moneyData.goalName || "Your Goal";

    document.getElementById("dashboardGoalAmount").textContent =
        formatRupiah(moneyData.goalAmount);

    document.getElementById("goalProgressFill").style.width = "0%";

    document.getElementById("goalProgressText").textContent =
        "0% completed";

    renderTransactions();
    updateBudgetOverview();

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

/* ===================================
   TRANSACTION SYSTEM
=================================== */

let selectedTransactionType = "income";


function openTransactionForm() {

    const form = document.getElementById("transactionFormPage");

    if (form) {
        form.style.display = "flex";
    }

    const dateInput = document.getElementById("transactionDate");

    if (dateInput && !dateInput.value) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(today.getMonth() + 1).padStart(2, "0");

        const day = String(today.getDate()).padStart(2, "0");

        dateInput.value = `${year}-${month}-${day}`;
    }

    window.scrollTo(0, 0);
}


function closeTransactionForm() {

    const form = document.getElementById("transactionFormPage");

    if (form) {
        form.style.display = "none";
    }

}


function selectTransactionType(type) {

    selectedTransactionType = type;

    const incomeButton =
        document.getElementById("incomeTypeButton");

    const expenseButton =
        document.getElementById("expenseTypeButton");

    incomeButton.classList.remove("selected");

    expenseButton.classList.remove("selected");

    if (type === "income") {
        incomeButton.classList.add("selected");
    } else {
        expenseButton.classList.add("selected");
    }

}


function saveTransaction() {

    const amountInput =
        document.getElementById("transactionAmount");

    const categoryInput =
        document.getElementById("transactionCategory");

    const dateInput =
        document.getElementById("transactionDate");

    const noteInput =
        document.getElementById("transactionNote");


    const amount =
        Number(
            amountInput.value.replace(/,/g, "")
        ) || 0;

    const category =
        categoryInput.value;

    const date =
        dateInput.value;

    const note =
        noteInput.value.trim();


    if (amount <= 0) {

        alert("Please enter an amount ♡");

        return;

    }


    if (!category) {

        alert("Please choose a category ♡");

        return;

    }


    if (!date) {

        alert("Please choose a date ♡");

        return;

    }


    const transaction = {

        id: Date.now(),

        type: selectedTransactionType,

        amount: amount,

        category: category,

        date: date,

        note: note

    };


    const existingTransactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];


    existingTransactions.push(transaction);


    localStorage.setItem(
        "transactions",
        JSON.stringify(existingTransactions)
    );


    // Reset form

    amountInput.value = "";

    categoryInput.value = "";

    noteInput.value = "";


    selectTransactionType("income");


    closeTransactionForm();
    renderTransactions();
    updateCurrentBalance();
    updateBudgetOverview();

}


function renderTransactions() {

    const transactionList =
        document.getElementById("transactionList");

    const emptyState =
        document.getElementById("emptyTransactions");


    if (!transactionList || !emptyState) {
        return;
    }


    const transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];


    transactionList.innerHTML = "";


    if (transactions.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    const sortedTransactions =
        [...transactions].sort(
            function (a, b) {
                return new Date(b.date) - new Date(a.date);
            }
        );


    sortedTransactions.forEach(
        function (transaction) {

            const item =
                document.createElement("div");

            item.className =
                "transaction-item";


            const icon =
                transaction.type === "income"
                    ? "✦"
                    : "♡";


            const sign =
                transaction.type === "income"
                    ? "+"
                    : "-";


            const amountClass =
                transaction.type === "income"
                    ? "income"
                    : "expense";


            const noteText =
                transaction.note
                    ? transaction.note
                    : transaction.category;


            item.innerHTML = `

                <div class="transaction-info">

                    <div class="transaction-icon">
                        ${icon}
                    </div>

                    <div>

                        <div class="transaction-name">
                            ${noteText}
                        </div>

                        <div class="transaction-category">
                            ${transaction.category}
                            ·
                            ${transaction.date}
                        </div>

                    </div>

                </div>


                <div
                    class="transaction-amount ${amountClass}"
                >
                    ${sign}${formatRupiah(transaction.amount)}
                </div>

            `;


            transactionList.appendChild(item);

        }
    );

}


function updateCurrentBalance() {

    const savedData =
        localStorage.getItem("moneySetup");

    if (!savedData) {
        return;
    }


    const moneyData =
        JSON.parse(savedData);


    const transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];


    let balance =
        Number(moneyData.startingBalance) || 0;


    transactions.forEach(
        function (transaction) {

            if (transaction.type === "income") {

                balance += Number(transaction.amount) || 0;

            } else {

                balance -= Number(transaction.amount) || 0;

            }

        }
    );


    const balanceElement =
        document.getElementById("dashboardBalance");


    if (balanceElement) {

        balanceElement.textContent =
            formatRupiah(balance);

    }

}


/* Transaction amount formatting */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const transactionAmount =
            document.getElementById(
                "transactionAmount"
            );


        if (transactionAmount) {

            transactionAmount.addEventListener(
                "input",
                function () {

                    formatMoneyInput(this);

                }
            );

        }

    }
);

/* ===================================
   BUDGET TRACKING
=================================== */

function updateBudgetOverview() {

    const savedData =
        localStorage.getItem("moneySetup");

    if (!savedData) {
        return;
    }

    const moneyData =
        JSON.parse(savedData);

    const transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];


    // Ambil bulan dan tahun sekarang

    const now = new Date();

    const currentMonth =
        now.getMonth();

    const currentYear =
        now.getFullYear();


    // Hitung total expense bulan ini

    let spent = 0;


    transactions.forEach(
        function (transaction) {

            if (transaction.type !== "expense") {
                return;
            }


            const transactionDate =
                new Date(transaction.date);


            if (
                transactionDate.getMonth() === currentMonth &&
                transactionDate.getFullYear() === currentYear
            ) {

                spent +=
                    Number(transaction.amount) || 0;

            }

        }
    );


    const monthlyBudget =
        Number(moneyData.monthlyBudget) || 0;


    const remaining =
        Math.max(
            monthlyBudget - spent,
            0
        );


    // Persentase budget yang sudah digunakan

    let percentage = 0;


    if (monthlyBudget > 0) {

        percentage =
            (spent / monthlyBudget) * 100;

    }


    percentage =
        Math.min(
            percentage,
            100
        );


    // Update angka

    const spentElement =
        document.getElementById(
            "dashboardSpent"
        );

    const remainingElement =
        document.getElementById(
            "dashboardRemaining"
        );


    if (spentElement) {

        spentElement.textContent =
            formatRupiah(spent);

    }


    if (remainingElement) {

        remainingElement.textContent =
            formatRupiah(remaining);

    }


    // Update progress bar

    const progressFill =
        document.getElementById(
            "budgetProgressFill"
        );


    if (progressFill) {

        progressFill.style.width =
            percentage + "%";

    }


    // Update text

    const progressText =
        document.getElementById(
            "budgetProgressText"
        );


    if (progressText) {

        progressText.textContent =
            formatRupiah(spent) +
            " spent of " +
            formatRupiah(monthlyBudget);

    }

}
