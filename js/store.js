//Set computer handling globals
let computers = [];
let selectedComputer = {}
let ownedComputerPriceMultiplier = 0.5
// let selectedOwnedComputer = {}

// Setup money handling globals
let balance = 0;
let currentLoan = 0;
let earningsFromWork = 0;
let ownedComputers = [];

//Bank
const fundsInBankElement = document.getElementById("funds");
const currentLoanElement = document.getElementById("currentloan");
const getLoanButton = document.getElementById("loan");

//Work
const earningsElement = document.getElementById("earnings");
const bankButton = document.getElementById("bank");
const workButton = document.getElementById("work");
const repayLoanButton = document.getElementById("repay");

//Owned laptops dropdown area
// const ownedComputerDropdown = document.getElementById("owned_laptop_select");
// const ownedComputerName = document.getElementById("owned_laptop_name");
// const ownedComputerPrice = document.getElementById("owned_laptop_price");
// const sellComputerButton = document.getElementById("sell_computer");

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
  while (!Number.isInteger(requestedLoan)) {
    requestedLoan = parseInt(prompt("Please enter amount", "100"));
  }
  if (canGetLoan(requestedLoan)) {
    balance += requestedLoan
    currentLoan = requestedLoan
    //Toggle visibility on repayLoanButton
    console.log("Setting repayLoan button visibility to visible")
    repayLoanButton.classList.toggle('visibility-hidden')
  }
  updateBankWorkInfo()
});
repayLoanButton.addEventListener("click", function() {
  if(currentLoan > earningsFromWork) {
    currentLoan -= earningsFromWork
    earningsFromWork = 0    
  }
  else {
    //Loan will be payed completely back
    earningsFromWork -= currentLoan
    balance += earningsFromWork
    currentLoan = 0
    repayLoanButton.classList.toggle('visibility-hidden')
  }
  updateBankWorkInfo()
});
bankButton.addEventListener("click", function () {
  if(currentLoan == 0) {
    balance += earningsFromWork
  }
  else if(currentLoan < 0.1 * earningsFromWork) {
    //remove currentLoan amount from pay and set rest to balance 
    balance += earningsFromWork - currentLoan  
    currentLoan = 0
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
  if(balance >= selectedComputer.price){
    balance -= selectedComputer.price
    ownedComputers.push(selectedComputer)
    addOwnedComputerToDropdown(selectedComputer)
    alert("You bought laptop: " + selectedComputer.title + "!")
  }else{
    alert("Not enough balance in the bank!")
  } 
  updateBankWorkInfo()
});

//Change computer selection in dropdown
computersDropdown.onchange = function () {
  selectedComputer = computers.find(
    computer => computer.title === this.value
  );
  updateComputerInfo(selectedComputer);
};

function updateBankWorkInfo(){
  fundsInBankElement.innerHTML = balance
  earningsElement.innerHTML = earningsFromWork
  currentLoanElement.innerHTML = currentLoan
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

  selectedComputer = this.selectedComputer
}

//asynchronous XMLHttpRequest on the main thread is deprecated
function imageExists(image_url){

  var http = new XMLHttpRequest();

  try {
    http.open('HEAD', image_url, false);
    http.send();
  } catch(e) {
    return false
  }
  return http.status != 404;
}

// //Select owned computer
// ownedComputerDropdown.onchange = function() {
//   selectedOwnedComputer = ownedComputers.find(
//     computer => computer.title === this.value
//   );
//   updateOwnedComputerInfo(selectedOwnedComputer)
// }

// sellComputerButton.addEventListener("click", function () {
//   sellComputer(selectedOwnedComputer)
// })

// function addOwnedComputerToDropdown(newComputer) {
//   let option = document.createElement("option");
//   ownedComputerDropdown.appendChild(option);
//   option.text = newComputer.title;

//   //Update info when first computer added to list
//   updateOwnedComputerInfo(ownedComputers[0])
// }
// function removeOwnedComputerFromDropdown(computerToSell){
//     //Remove computer from array by filtering all other computers
//     ownedComputers = ownedComputers.filter(computer => computer.title !== computerToSell.title);
//     //empty dropdown content
//     ownedComputerDropdown.innerHTML = '';
//     //populate dropdown with updated array items
//     ownedComputers.forEach(computer => 
//       addOwnedComputerToDropdown(computer)
//     );
// }

// //Update owned computer info based on selection
// function updateOwnedComputerInfo(selectedOwnedComputer) {
//   ownedComputerName.innerHTML = selectedOwnedComputer.title
//   ownedComputerPrice.innerHTML = selectedOwnedComputer.price * ownedComputerPriceMultiplier

//   // selectedOwnedComputer = this.selectedOwnedComputer
// }

// //Sell computer by adding to balance and remove from dropdown
// function sellComputer(computerToSell) {
//   console.log("Computer to sell .price" + computerToSell.price)

//   let usedPrice = computerToSell.price * ownedComputerPriceMultiplier
//   console.log("Selling for: " + usedPrice)

//   //Add selling price to balance
//   balance += computerToSell.price * ownedComputerPriceMultiplier

//   //If only one computer in list, revert to default texts
//   if(ownedComputers.length == 1) {
//     ownedComputerDropdown.innerHTML = ""
//     ownedComputerName.innerHTML = "None selected"
//     ownedComputerPrice.innerHTML = "0"
//   }else{
//     //Revert to first selection
//     updateOwnedComputerInfo(ownedComputers[0])
//     //Remove selection from dropdown
//     removeOwnedComputerFromDropdown(computerToSell)
//   }
  
// }

/* can get a loan only if 
1. bought at least 1 computer
2. has payed back previous loan (nothing to pay back)
3. loan amount is <= 2 * bank balance
*/
function canGetLoan(requestedLoan) {
  if(requestedLoan <= 0) {
    alert("Cannot get loan: requested loan has to be above 0!")
    return false
  }
  if(ownedComputers.length === 0){
    alert("Cannot get loan: you must buy at least one laptop!")
    return false
  }
  if(currentLoan > 0){
    alert("Cannot get loan: current loan must be payd back!")
    return false
  }
  if(requestedLoan > balance * 2){
    alert("Cannot get loan: requested cannot be above double your balance!")
    return false
  }

  return true;
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
  selectedComputer = computers[0]
  //Set first computer from API response to selected
  updateComputerInfo(computers[0])
  //Initialize bank & work info
  updateBankWorkInfo()
  
})();
