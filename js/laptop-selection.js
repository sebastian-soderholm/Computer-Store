import laptopBuy from "./laptop-buy.js";

const laptopSelection = (function(){
  let availableComputers = [];
  let selectedComputer = {};

  //Laptops dropdown area
  const computersDropdown = document.getElementById("laptop_select");
  const computerSpecs = document.getElementById("laptop_specs");

  //Change computer selection in dropdown
  computersDropdown.onchange = function () {
    selectedComputer = availableComputers.find(
      (computer) => computer.title === this.value
    );
    setSelectedComputer(selectedComputer);
  };

  function init(computers) {
    computers.forEach((computer) => {
      let option = document.createElement("option");
      computersDropdown.appendChild(option);
      option.text = computer.title;
    });
    availableComputers = computers;
    selectedComputer = availableComputers[0];
    setSelectedComputer(selectedComputer);
  }

  function setSelectedComputer(computer) {
    // Set specs in Laptops dropdown section
    let computerFeatures = "";

    computer.specs.forEach((spec) => {
      computerFeatures = computerFeatures + spec + "\r\n";
    });
    computerSpecs.innerText = computerFeatures;
    selectedComputer = computer;

    //Update computer in info section
    laptopBuy.update(selectedComputer);
  }
  
  return {
    init: init,
    setSelectedComputer: setSelectedComputer,
    getSelectedComputer: function (){
      return selectedComputer
    }

  }
  

})();


export default laptopSelection;
