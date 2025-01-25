const URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".drop select");
const button = document.querySelector("#but");
const amount = document.getElementById("amount");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const arrow = document.querySelector(".arrow");

const audio = new Audio("./mouse.wav");
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    if (select.name === "for" && currCode === "USD") {
      newOption.selected = "selected";
    }
    
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
  
    amount.value = 1; 
    updating_flag(evt.target);

    
  });
  
}

const updating_flag = (element) => {
  let currCode = element.value;
  let countrycode = countryList[currCode];
  let newsrc = "https://flagsapi.com/" + countrycode + "/flat/64.png";
  element.parentElement.querySelector("img").src = newsrc;
};
button.addEventListener("click", async (evt) => {
  audio.currentTime = 0;
  audio.play();
  let val = amount.value;
  evt.preventDefault();
  if (amount.value === 0) {
    amount.value = 1;
  }
  if (amount.value < 0) {
    let vv = amount.value;
    amount.value = vv * -1;
  }

  let fromcur = fromCurr.value.toLowerCase();
  
  let toCur = toCurr.value.toLowerCase();

  let URL_m = URL +"/"+ fromcur +  ".json";
  
  let responce = await fetch(URL_m);
  let data = await responce.json();
  let exchange_Rate = data[fromcur][toCur];
  console.log(exchange_Rate);

  let amt = exchange_Rate*amount.value;
  // amount.value = Math.round(amt)
  amount.value = amt;
  // console.log(data)
});
arrow.addEventListener("click", (evt)=>{
  amount.value = 1;
  let temp_var = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp_var;
  amount.value = 1;
  updating_flag(toCurr);
  updating_flag(fromCurr);
})
