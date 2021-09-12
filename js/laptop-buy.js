import bank from "./bank.js";
import work from "./work.js";
import laptopSelection from './laptop-selection.js';

const laptopInfo = (function () {
  let ownedComputers = [];

  //Laptop info elements
  const computerStoreImage = document.getElementById("computer_image");
  const computerStoreTitle = document.getElementById("computer_title");
  const computerStoreDescription = document.getElementById("computer_description");
  const computerStorePrice = document.getElementById("computer_price");
  const buyNowButton = document.getElementById("buy_now");

  computerStoreImage.addEventListener('error', function (event) {
    computerStoreImage.src = "https://http.cat/404";
  }, true);

  buyNowButton.addEventListener("click", function () {
    let balance = bank.getBalance()
    let selectedComputer = laptopSelection.getSelectedComputer()

    if (balance >= selectedComputer.price) {
      bank.setBalance(balance - selectedComputer.price)
      ownedComputers.push(selectedComputer);
      alert("You bought laptop: " + selectedComputer.title + "!");
    } else {
      alert("Not enough balance in the bank!");
    }
    bank.update();
    work.update();
  });

  //Update info in Laptop info section
  function update(computer) {
    computerStoreTitle.innerText = computer.title;
    computerStoreDescription.innerText = computer.description;

    computerStorePrice.innerText = computer.price + " €";
    let imgURL = "https://noroff-komputer-store-api.herokuapp.com/" + computer.image;
    computerStoreImage.src = imgURL
  }
  return {
    getOwnedComputers: function(){
      return ownedComputers
    },
    setOwnedComputers: function(computer){
      ownedComputers.push(computer);
    },
    update: update,
  }
})();

export default laptopInfo ;
