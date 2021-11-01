let selectedOwnedComputer = {}
let ownedComputers = [];
let ownedComputerPriceMultiplier = 0.5

// Owned laptops dropdown area
const ownedComputerDropdown = document.getElementById("owned_laptop_select");
const ownedComputerName = document.getElementById("owned_laptop_name");
const ownedComputerPrice = document.getElementById("owned_laptop_price");
const sellComputerButton = document.getElementById("sell_computer");


//Select owned computer
ownedComputerDropdown.onchange = function() {
  selectedOwnedComputer = ownedComputers.find(
    computer => computer.title === this.value
  );
  updateOwnedComputerInfo(selectedOwnedComputer)
}

sellComputerButton.addEventListener("click", function () {
  sellComputer(selectedOwnedComputer)
})

function addOwnedComputerToDropdown(newComputer) {
  let option = document.createElement("option");
  ownedComputerDropdown.appendChild(option);
  option.text = newComputer.title;

  //Update info when first computer added to list
  updateOwnedComputerInfo(ownedComputers[0])
}
function removeOwnedComputerFromDropdown(computerToSell){
    //Remove computer from array by filtering all other computers
    ownedComputers = ownedComputers.filter(computer => computer.title !== computerToSell.title);
    //empty dropdown content
    ownedComputerDropdown.innerHTML = '';
    //populate dropdown with updated array items
    ownedComputers.forEach(computer => 
      addOwnedComputerToDropdown(computer)
    );
}

//Update owned computer info based on selection
function updateOwnedComputerInfo(selectedOwnedComputer) {
  ownedComputerName.innerHTML = selectedOwnedComputer.title
  ownedComputerPrice.innerHTML = selectedOwnedComputer.price * ownedComputerPriceMultiplier

  // selectedOwnedComputer = this.selectedOwnedComputer
}

//Sell computer by adding to balance and remove from dropdown
function sellComputer(computerToSell) {
  console.log("Computer to sell .price" + computerToSell.price)

  let usedPrice = computerToSell.price * ownedComputerPriceMultiplier
  console.log("Selling for: " + usedPrice)

  //Add selling price to balance
  balance += computerToSell.price * ownedComputerPriceMultiplier

  //If only one computer in list, revert to default texts
  if(ownedComputers.length == 1) {
    ownedComputerDropdown.innerHTML = ""
    ownedComputerName.innerHTML = "None selected"
    ownedComputerPrice.innerHTML = "0"
  }else{
    //Revert to first selection
    updateOwnedComputerInfo(ownedComputers[0])
    //Remove selection from dropdown
    removeOwnedComputerFromDropdown(computerToSell)
  }

} 