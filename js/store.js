// Setup money variables
let bankMoney = 0
let workMoney = 0

//Get element references
const computersDropdown = document.getElementById("laptop_select")
const computerSpecs = document.getElementById("laptop_specs")
const getLoanButton = document.getElementById("loan")
const bankButton = document.getElementById("bank")
const workButton = document.getElementById("work")
const buyNowButton = document.getElementById("buy_now")

//Add event listeners
getLoanButton.addEventListener("click", function () {
  alert("Mene töihin!")
})
bankButton.addEventListener("click", function () {
  alert("Mene töihin!")
})
workButton.addEventListener("click", function () {
  alert("Mene töihin!")
})
buyNowButton.addEventListener("click", function () {
  alert("Mene töihin!")
})
computersDropdown.onchange = function () {
  console.log("Laptop selected: " + this.value)

  const selectedCpmuter = computerSpecs.filter(computer => {
      return computer.title === this.value
  })
  computerSpecs.innerText = selectedSpecs.specs
};

async function getComputers() {
  try {
    const response = await fetch(
      "https://noroff-komputer-store-api.herokuapp.com/computers"
    );
    const computerData = await response.json()
    return computerData
  } catch (error) {
    console.log("Error in fetching computer data: ", error)
  }
}

(async () => {
  try {
    let computers = await getComputers();

    computers.forEach((computer) => {
      let option = document.createElement("option")
      computersDropdown.appendChild(option)
      option.text = computer.title
      computerSpecs.innerText = computer.specs
    })
  } catch (error) {}
})()
