import work from "./work.js";
import laptopBuy from "./laptop-buy.js";

const bank = (function(){
  let balance = 0
  let currentLoan = 0
  let fundsInBankElement = document.getElementById("funds")
  let currentLoanElement = document.getElementById("currentloan")
  let getLoanButton = document.getElementById("loan")

  //Add event listeners
  getLoanButton.addEventListener("click", function () {
    getLoan();
  });

  function getLoan() {
    let requestedLoan = parseInt(prompt("Please enter amount", 100));
    //Keep propmpting until valid number input
    while (!Number.isInteger(requestedLoan)) {
      requestedLoan = parseInt(prompt("Please enter amount", 100));
    }
    if (canGetLoan(requestedLoan)) {
      balance += requestedLoan;
      currentLoan = requestedLoan;

      //Toggle repay loan button
      work.toggleRepayLoanButton();
    }
    update();
  }

  function update() {
    fundsInBankElement.innerHTML = balance;
    currentLoanElement.innerHTML = currentLoan;
  }  

  /* can get a loan only if 
  1. bought at least 1 computer
  2. has payed back previous loan (nothing to pay back)
  3. loan amount is <= 2 * bank balance
  */
  function canGetLoan(requestedLoan) {
    if (requestedLoan <= 0) {
      alert("Cannot get loan: requested loan has to be above 0!");
      return false;
    }
    if (laptopBuy.getOwnedComputers().length === 0) {
      alert("Cannot get loan: you must buy at least one laptop!");
      return false;
    }
    if (currentLoan > 0) {
      alert("Cannot get loan: current loan must be paid back!");
      return false;
    }
    if (requestedLoan > balance * 2) {
      alert("Cannot get loan: requested cannot be above double your balance!");
      return false;
    }
    return true;
  }

  return {
    getBalance: function() {
      return balance
    },
    setBalance: function(newBalance) {
      balance = newBalance
    },
    getCurrentLoan: function() {
      return currentLoan
    },
    setCurrentLoan: function(newCurrentLoan) {
      currentLoan = newCurrentLoan
    },
    getLoan: getLoan,
    update: update  
  }

})();


export default bank ;
