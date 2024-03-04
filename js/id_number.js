const YEAR_NAN = "N/A"
const VALID_ID_NUMBER = "Valid ID Number"
const INVALID_ID_NUMBER = "Invalid ID Number"
const INVALID_YEAR_DIGITS = ""
const MAX_ID_NUMBER = 99999

function clamp(num, min, max) {
   return Math.max(min, Math.min(num, max));
}

function getSumOfProducts(digits) {
   let sum = 0
   let ctr = digits.length
   for (let i = 0; i < digits.length; i++, ctr--) {
      sum += digits[i] * ctr
   }
   return sum
}

function getYearLeftDigits(firstDigit, secondDigit) {
   if (firstDigit.length !== 1 || secondDigit.length !== 1) {
      throw new Error("Invalid input: expected two digits")
   }
   let twoDigits = firstDigit.toString() + secondDigit.toString()
   return (parseInt(twoDigits) * 10) + 1900
}

function getYearFromDigits(digits) {
   let result = INVALID_YEAR_DIGITS
   let left = getYearLeftDigits(digits[0], digits[1])
   let right = digits[2]

   if (!isNaN(left) && !isNaN(right)) {
      result = left + parseInt(right)
   }

   return result
}

function checkIDNumber(digits) {
   let result = INVALID_ID_NUMBER
   // had to do this because it was mutating the multiplied digits whenever it was ID 099 and below
   let sumOfProducts = getSumOfProducts(new Array().concat(digits))

   if (sumOfProducts > 0 && sumOfProducts % 11 == 0) {
      result = VALID_ID_NUMBER
   }

   return result
}

function generateIDNumbers(threeDigits) {
   let ctr = 0
   let number = 0
   let list = []
   while (number < MAX_ID_NUMBER) {
      let idNumber = ((threeDigits * 100000) + number).toString()
      let digits = idNumber.split('')
      // Append 0 if two digit year
      if (threeDigits < 100) {
         digits.unshift('0')
      }
      if (checkIDNumber(digits) == VALID_ID_NUMBER && digits.length == 8) {
         // If digits were passed, combine them
         if (idNumber.constructor === Array) {
            idNumber = idNumber.join('')
         }
         // Push the new entry to the list of entries
         let row = {
            'id': ctr + 1,
            'id_number': idNumber
         }
         //console.log(row)
         list.push(row)
         ctr++
      }
      number++
   }
   console.log("ID " + threeDigits + "\tSize: " + ctr)
   return list
}

function validateIDNumber() {
   let resultValue = document.getElementById('check-id-number-result-value')
   if (resultValue.classList.contains('valid-result')) {
      resultValue.classList.remove('valid-result')
   }
   if (resultValue.classList.contains('invalid-result')) {
      resultValue.classList.remove('invalid-result')
   }

   let checkIdInput = document.getElementById('check-id-number-input-value').value;

   if (isNaN(checkIdInput)) { checkIdInput = "0"; }

   let result = checkIDNumber(checkIdInput.split(''))

   switch(result) {
      case VALID_ID_NUMBER:
         resultValue.classList.add('valid-result')
         break;
      default:
         resultValue.classList.add('invalid-result')
         break;
   }
      
   resultValue.innerHTML = result;
}

document.addEventListener("DOMContentLoaded", (e) => {
   let generateIdInput = document.getElementById("generate-id-number-input-value");
   let generateIdResult = document.getElementById('generate-id-number-year-value');
   let generateIdSubmit = document.getElementById('generate-id-number-submit');
   let checkIdInput = document.getElementById("check-id-number-input-value");
   let idNumberContainer = document.getElementById("id_number_table_container");
   let idNumberHeader = document.getElementById("id-number-table-header");
   let clearResultsTable = document.getElementById("clear-result-table");

   generateIdInput.addEventListener("keypress", function(event) {
      if (event.key == "Enter") {
         // Prevent default enter behavior
         event.preventDefault();
         generateIdSubmit.click();
      }
   });
   checkIdInput.addEventListener("keypress", function(event) {
      if (event.key == "Enter") {
         // Prevent default enter behavior
         event.preventDefault();
         validateIDNumber();
      }
   });

   checkIdInput.addEventListener('focusout', validateIDNumber);
   
   generateIdInput.addEventListener('focusout', (event) => {
      let digits = generateIdInput.value;
      generateIdResult.value = getYearFromDigits(digits);
   });

   generateIdInput.addEventListener('keypress', (event) => {
      let digits = generateIdInput.value;
      if (digits == "") {
         generateIdSubmit.disabled = true
      } else {
         generateIdSubmit.disabled = false
      }
   });

   generateIdSubmit.addEventListener('click', (event) => {
      generateIdSubmit.disabled = true
      generateIdSubmit.value = "Generating..."

      setTimeout(function() {
         let threeDigits = generateIdInput.value
         let list = generateIDNumbers(threeDigits)

         $("#id_number_table").bootstrapTable('load', list)

         clearResultsTable.hidden = false;
         idNumberContainer.hidden = false;
         idNumberHeader.hidden = false;
         generateIdInput.disabled = true;
         generateIdSubmit.hidden = true;
       }, 100);

       clearResultsTable.addEventListener('click', (event) => {
         clearResultsTable.hidden = true;
         idNumberContainer.hidden = true;
         idNumberHeader.hidden = true;
         generateIdInput.disabled = false;
         generateIdSubmit.hidden = false;
         generateIdSubmit.disabled = false;
         generateIdSubmit.innerHTML = "Generate";
      });
   });
})