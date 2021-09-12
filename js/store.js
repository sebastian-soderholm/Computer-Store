import laptopSelection from './laptop-selection.js';
import laptopBuy from "./laptop-buy.js";
import bank from "./bank.js";
import work from "./work.js";

//Set computers to dropdown menu and init store
(async () => {
  try {
    let computers = await getComputers();
    laptopSelection.init(computers)
    laptopBuy.update(computers[0]);
  } catch (error) {}
  //Initialize bank & work info
  bank.update()
  work.update()
})();

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