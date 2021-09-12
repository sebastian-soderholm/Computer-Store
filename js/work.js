import bank from "./bank.js";

const work = (function(){
  //Work
  const earningsElement = document.getElementById("earnings");
  const bankButton = document.getElementById("bank");
  const workButton = document.getElementById("work");
  const repayLoanButton = document.getElementById("repay");

  // Setup money handling globals
  let earningsFromWork = 0;

  bankButton.addEventListener("click", function () {
    depositToBank();
    update();
    bank.update();
  });
  workButton.addEventListener("click", function () {
    work()
    update();
  });

  repayLoanButton.addEventListener("click", function () {
    repayLoan();
  });

  //Transfer earnings from work to bank with possible loan payment
  function depositToBank() {
    let currentLoan = bank.getCurrentLoan()
    let balance = bank.getBalance()

    if (currentLoan == 0) {
      //No loan to pay back
      bank.setBalance(balance + earningsFromWork) 
    } else if (currentLoan < (0.1 * earningsFromWork)) {
      //remove currentLoan amount from pay and set rest to balance
      bank.setBalance(balance + (earningsFromWork - currentLoan))
      bank.setCurrentLoan(0);

      toggleRepayLoanButton()
    } else {
      //There is still loan left to pay after transfer
      bank.setCurrentLoan(currentLoan - (0.1 * earningsFromWork))
      bank.setBalance(balance + (earningsFromWork * 0.9))
    }
    earningsFromWork = 0;
  }

  function work() {
    earningsFromWork += 100;
  }
  function repayLoan() {
    let currentLoan = bank.getCurrentLoan()
    let balance = bank.getBalance()

    if (currentLoan > earningsFromWork) {
      bank.setCurrentLoan(currentLoan - earningsFromWork)
      earningsFromWork = 0;
    } else {
      //Loan will be payed completely back
      earningsFromWork -= currentLoan;
      bank.setBalance(balance + earningsFromWork)
      bank.setCurrentLoan(0)
      toggleRepayLoanButton();
    }
    update()
    bank.update()
  }

  function toggleRepayLoanButton() {
    //Toggle visibility on repayLoanButton
    repayLoanButton.classList.toggle("visibility-hidden");
  }

  function update() {
    earningsElement.innerHTML = earningsFromWork;
    bank.update();
  }

  return {
    update: update,
    toggleRepayLoanButton: toggleRepayLoanButton
  }
})();



export default work;
