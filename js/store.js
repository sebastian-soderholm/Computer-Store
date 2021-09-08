//Set globals
let computers = [];
let selectedComputer = {}

// Setup money variables
let balance = 0;
let currentLoan = 0;
let earningsFromWork = 0;
let ownedLaptops = [];

//Bank
const fundsInBankElement = document.getElementById("funds");
const currentLoanElement = document.getElementById("loan");
const getLoanButton = document.getElementById("loan");
//Work
const earningsElement = document.getElementById("earnings");
const bankButton = document.getElementById("bank");
const workButton = document.getElementById("work");
const repayLoanButton = document.getElementById("repay");
//Laptops dropdown area
const computersDropdown = document.getElementById("laptop_select");
const computerSpecs = document.getElementById("laptop_specs");
//Laptop info
const computerStoreImage = document.getElementById("computer_image");
const computerStoreTitle = document.getElementById("computer_title");
const computerStoreDescription = document.getElementById("computer_description");
const computerStorePrice = document.getElementById("computer_price");
const buyNowButton = document.getElementById("buy_now");

//Add event listeners
getLoanButton.addEventListener("click", function () {
  let requestedLoan = parseInt(prompt("Please enter amount", "100"));
  while (Number.isInteger(requestedLoan)) {
    requestedLoan = parseInt(prompt("Please enter amount", "100"));
    console.log("requestedLoan: " + requestedLoan);
  }
  if (canGetLoan(requestedLoan)) {
    fundsInBank += requestedLoan;
    currentLoan = requestedLoan;
    repayLoanButton.hidden = false
  }
});
bankButton.addEventListener("click", function () {
  if(currentLoan == 0) {
    balance += earningsFromWork
  }
  else if(currentLoan < 0.1 * earningsFromWork) {
    //remove currentLoan amount from pay and set rest to balance 
    balance += earningsFromWork - currentLoan    
  }else{
    currentLoan -= 0.1 * earningsFromWork
    balance += earningsFromWork * 0.9
  }

  earningsFromWork = 0
  updateBankWorkInfo()
});
workButton.addEventListener("click", function () {
  earningsFromWork += 100
  updateBankWorkInfo()
});
buyNowButton.addEventListener("click", function () {
  //selectedComputer ??
  if(balance >= selectedComputer.price) balance -= selectedComputer.price
  
  updateBankWorkInfo()
});

//Change computer selection in dropdown
computersDropdown.onchange = function () {
  console.log("this.value: " + this.value)
  //Find computer in array with same title as dropdown selection 
  selectedComputer = computers.find(
    computer => computer.title === this.value
  );
  updateComputerInfo(selectedComputer);
};

function updateBankWorkInfo(){
  fundsInBankElement.innerHTML = balance
  earningsElement.innerHTML = earningsFromWork
}

//Update info both in Laptops selection and info sections
function updateComputerInfo(selectedComputer) {

  // Set specs in Laptops dropdown section
  let computerFeatures = ""
  selectedComputer.specs.forEach(spec => {
    computerFeatures = computerFeatures + spec + "\r\n"
  });
  computerSpecs.innerText = computerFeatures
  
  //Set title
  computerStoreTitle.innerText = selectedComputer.title;
  //Set description
  computerStoreDescription.innerText = selectedComputer.description

  computerStorePrice.innerText = selectedComputer.price + " €";
  let imgURL = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image
  if(imageExists(imgURL)) computerStoreImage.src = imgURL
  else computerStoreImage.src = "https://http.cat/404"
}

function imageExists(image_url){

  var http = new XMLHttpRequest();

  try {
    http.open('HEAD', image_url, false);
    http.send();
  } catch {
    return false
  }
  return http.status != 404;

}

/* can get a loan only if 
1. bought at least 1 computer
2. has payed back previous loan (nothing to pay back)
3. loan amount is <= 2 * bank balance
*/
function canGetLoan(loan) {
  if (
    requestedLoan > 0 &&
    ownedLaptops.length > 0 &&
    currentLoan === 0 &&
    requestedLoan <= fundsInBank * 2
  )
    return true;

  return false;
}

//Fetch computers from API
async function getComputers() {
  try {
    const response = await fetch(
      "https://noroff-komputer-store-api.herokuapp.com/computers"
    );
    const computerData = await response.json();

    return computerData;
  } catch (error) {
    console.log("Error in fetching computer data: ", error);
  }
}

//Set computers to dropdown menu
(async () => {
  try {
    computers = await getComputers();
    console.log(computers);

    computers.forEach(computer => {
      let option = document.createElement("option");
      computersDropdown.appendChild(option);
      option.text = computer.title;
      computerSpecs.innerText = computer.specs;
      
      
    });
  } catch (error) {}

  //Set first computer from API response to selected
  updateComputerInfo(computers[0])
  //Initialize bank & work info
  updateBankWorkInfo()
})();
