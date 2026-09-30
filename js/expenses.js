// =====================================
// EXPENSE DATA
// =====================================

let expenses = [
    {
        id: 1,
        title: "Groceries",
        amount: 1200
    },

    {
        id: 2,
        title: "Internet",
        amount: 799
    }
];


// =====================================
// SELECT HTML ELEMENT
// =====================================

const expenseTotalEl =
    document.querySelector("#expenseTotal");


// =====================================
// CALCULATE EXPENSE TOTAL
// =====================================

function calculateExpenseTotal() {

    const total =
        expenses.reduce(
            (sum, expense) => {

                return sum + expense.amount;

            },
            0
        );

    return total;
}



// =====================================
// RENDER EXPENSES
// =====================================

export function renderExpenses() {

    const total =
        calculateExpenseTotal();

    if (expenseTotalEl) {

        expenseTotalEl.textContent =
            total;
    }
}