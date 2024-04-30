const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(let currCode in countryList) {
        const newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name == "from" && currCode == "USD") {
            newOption.selected = "selected";
        } else if(select.name == "to" && currCode == "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    const amount = document.querySelector(".amount input");
    const amtVal = amount.value;
    if(amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const response = await fetch(URL);
    const data = await response.json();
    const rate = data[toCurr.value.toLowerCase()];

    const finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

window.addEventListener("load", () => {
    updateExchangeRate()
});

