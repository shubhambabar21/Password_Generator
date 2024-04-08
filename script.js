const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const copyBtn = document.querySelector("[data-copy]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton  ");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = `!@#$%^&*()_+{}:"|<>?,/.';[]\=-~`;

//initially 
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
//set strength circle color to grey

// set passwordlength
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandomNumber() {
    return getRndNumber(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length)
    return symbols.charAt[randNum];
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6

    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("$f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
     catch (e) {
        copyMsg.innerText="Failed";
    }
    //to make copy wala spamm visible
    copyMsg.classList.add("active");

    setTimeout((() => {
    copyMsg.classList.remove("active");
   }),2000);
}

function shufflePassword(array){
    //fisher yates mehtod
for(let i = array.length - 1; i> 0; i--){
    const j= Math.floor(Math.random() * (i+1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
let str ="";
array.forEach((el) => (str +=el));
return str;
}


function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox)=>{
        if(checkbox.checked)
        checkCount++;
   });

// special condition
if(passwordLength <checkCount){
    passwordLength = checkCount;
    handleSlider();
}

      allCheckBox.forEach( (checkbox) =>{
      checkbox.addEventListener('change', handleCheckBoxChange)
     
})
}
inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',() =>{
     if(passwordDisplay.value)
     copyContent();
})

generateBtn.addEventListener('click',()=>{
    console.log('inside btn');
    // none of the checkbox selected 
    if(checkCount !== 0){
        console.log('not selected');
        return;
    }
     

    if(passwordLength < checkCount){
        console.log('inside if');
        passwordLength = checkCount;
        handleSlider;
    }

    //let find the journey with new password
 console.log("Starting the journey");
    //remove old password
   password = "";

   //lets put the stuff mentioned by checkboxes
  
//    if(uppercaseCheck.checked){
//     password += generateUpperCase();
//    }
   
//    if(lowercaseCheck.checked){
//     password += generatelowerCase();
//    }

//    if(numberCheck.checked){
//     password += generateRaandomNumber();
//    }

//    if(symbolsCheck.checked){
//     password += generateSymbol();
//    }

 let funcArr =[];
 
 if(uppercaseCheck.checked)
   funcArr.push(generateUpperCase);

 if(lowercaseCheck.checked)
   funcArr.push(generateLowerCase);

 if(numberCheck.checked)
   funcArr.push(generateRandomNumber);

 if(symbolsCheck.checked)
   funcArr.push(generateSymbol);

//compulsory addition
for(let i=0; i<funcArr.length; i++){
    password += funcArr[i]();
    console.log("compulsory addition done ");

}
console.log("compulsory addition done ");

//remaining addition
 for(let i=0; i<passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0,funcArr.length);
console.log("randIndex done" +randIndex);
 password += funcArr[randIndex]();
 }
 console.log("remaining addition done ");
 //shuflle the password
 password = shufflePassword(array.from(password));
 console.log("shuffling done ");
 // show in ui
 passwordDisplay.value = password;
 console.log("UI addition done ");

 //calc strength
 
 calcStrength();


});