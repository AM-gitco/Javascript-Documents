const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromCurr =  document.querySelector(".from select");
let toCurr =  document.querySelector(".to select");
let msg =  document.querySelector(".msg");



for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "USD"){
          newOption.selected = "selected" ;
        } else if (select.name === "to" && currCode === "PKR") {
          newOption.selected = "selected" ;
        }
        select.append(newOption);
    }

    select.addEventListener("change" , (evt) => {
      updateFlag(evt.target);
    });

    
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img =  element.parentElement.querySelector("img");
  img.src = newSrc;
};

 btn.addEventListener("click" , async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}) ;



// btn.addEventListener("click", async (evt) => {
//   try {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if (amtVal === "" || amtVal < 1) {
//       amtVal = 1;
//       amount.value = "1";
//     }

//     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//     let response = await fetch(URL);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     let data = await response.json();
//     let rate = data[toCurr.value.toLowerCase()];
//     if (!rate) {
//       throw new Error("Rate not found in the response");
//     }
//     let finalAmount = amtVal * rate;

//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     msg.innerText = "An error occurred. Please try again.";
//   }
// });
