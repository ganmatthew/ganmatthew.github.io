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
   for (let i = 0; i < digits.length; i++) {
      //console.log(digits[i] + " * " + ctr)
      digits[i] *= ctr
      ctr--
   }

   for (let i = 0; i < digits.length; i++) {
      sum += digits[i]
   }
   //console.log("Digits: " + digits)
   //console.log("Sum: " + sum)

   return sum
}

function getYearLeftDigits(firstDigit, secondDigit) {
   let twoDigits = firstDigit.concat(secondDigit)
   return (twoDigits * 10) + 1900
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
   let list = []
   for (number = 0; number < MAX_ID_NUMBER; number++) {
      let idNumber = ((threeDigits * 100000) + number).toString()
      let digits = idNumber.split('')
      if (threeDigits >= 100) {
         let result = checkIDNumber(digits)
         if (result == VALID_ID_NUMBER && idNumber.length == 8) {
            list.push(idNumber)
            ctr++
         }
      } else {
         digits.unshift('0')
         let result = checkIDNumber(digits)
         if (result == VALID_ID_NUMBER && digits.length == 8) {
            list.push(digits.join(''))
            ctr++
         }
      }
   }
   console.log("ID " + threeDigits + "\tSize: " + ctr)
   return list
}

function displayListOfIDNumbers(list) {
   var textBox = document.getElementById('number-list');
   textBox.innerHTML = ""

   for (const element of list)  {
      textBox.innerHTML = textBox.innerHTML + element.toString() + `\n`
   }
}

$(document).ready(function(){
   $("#check-id-number-submit").click(function() {
      let resultValue = $("#check-id-number-result-value")
      if (resultValue.hasClass('valid-result')) {
         resultValue.removeClass('valid-result')
      }
      if (resultValue.hasClass('invalid-result')) {
         resultValue.removeClass('invalid-result')
      }

      let idNumber = $("#check-id-number-input-value").val();

      if (isNaN(idNumber)) { idNumber = "0"; }

      $("#check-id-number-input-value").val(idNumber)
      
      let result = checkIDNumber(idNumber.split(''))

      switch(result) {
         case VALID_ID_NUMBER:
            $("#check-id-number-result-value").addClass('valid-result')
            break;
         default:
            $("#check-id-number-result-value").addClass('invalid-result')
            break;
      }
      
      $("#check-id-number-result-value").html(result);
   });
   /*
   $("#check-id-number-clear").click(function() {
         $("#check-id-number-submit").val('');
   });
   */
   $("#generate-id-number-input-value").focusout(function() {
      let digits = $("#generate-id-number-input-value").val();
      $("#generate-id-number-year-value").html(getYearFromDigits(digits));
   });

   $("#generate-id-number-submit").click(function() {
      $("#generate-id-number-submit").prop("disabled", true)
      $("#generate-id-number-submit").html("Generating...")
      
      $("#number-list").css('visibility', 'hidden')
      $("#generate-id-number-result-value").html("")

      setTimeout(function() {
         let threeDigits = $("#generate-id-number-input-value").val()
         let list = generateIDNumbers(threeDigits)
         displayListOfIDNumbers(list)

         $("#generate-id-number-submit").html("Writing...")
         $("#number-list").css('visibility', 'visible')
         $("#number-list").prop('rows', list.length)
         $("#generate-id-number-result-value").html(list.length)
         
         $("#generate-id-number-submit").prop("disabled", false)
         $("#generate-id-number-submit").html("Generate")
       }, 100);
   });
})