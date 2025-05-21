// Initialize an empty array to store expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
// Get DOM elements
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const quantityInput = document.getElementById("quantity"); // New input for quantity
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");
// Event listener for form submission
expenseForm.addEventListener("submit", addExpense);
// Event listener for deleting expenses
expenseList.addEventListener("click", deleteExpense);
// Render existing expenses
renderExpenses();
function renderExpenses() {
  expenseList.innerHTML = "";
  let totalAmount = 0;
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const expenseRow = document.createElement("tr");
    expenseRow.innerHTML = `  
            <td>${expense.name} (x${expense.quantity})</td> 
                        <td>$${(expense.amount * expense.quantity).toFixed(
                          2
                        )}</td>  
            <td class="delete-btn" data-id="${i}">Delete</td>  
        `;
    expenseList.appendChild(expenseRow);
    totalAmount += expense.amount * expense.quantity;
  }
  totalAmountElement.textContent = totalAmount.toFixed(2);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
function addExpense(event) {
  event.preventDefault();
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const quantity = parseInt(quantityInput.value);
  if (!expenseName || isNaN(expenseAmount) || isNaN(quantity)) {
    alert("Please enter valid expense details.");
    return;
  }
  const expense = {
    name: expenseName,
    amount: expenseAmount,
    quantity: quantity,
  };
  expenses.push(expense);
  renderExpenses();
  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  quantityInput.value = "";
}
function deleteExpense(event) {
  if (event.target.classList.contains("delete-btn")) {
    const expenseIndex = parseInt(event.target.getAttribute("data-id"));
    expenses.splice(expenseIndex, 1);
    renderExpenses();
  }
}
