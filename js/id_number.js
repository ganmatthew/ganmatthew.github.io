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
   let twoDigits = `${firstDigit}${secondDigit}`
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
}

$(document).ready(function(){
   document.getElementById("generate-id-number-input-value").addEventListener("keypress", function(event) {
      if (event.key == "Enter") {
         // Prevent default enter behavior
         event.preventDefault();
         $("#generate-id-number-submit").click();
      }
   });
   document.getElementById("check-id-number-input-value").addEventListener("keypress", function(event) {
      if (event.key == "Enter") {
         // Prevent default enter behavior
         event.preventDefault();
         validateIDNumber();
      }
   });

   $("#check-id-number-input-value").keypress(function() {
      let digits = $("#check-id-number-input-value").val();
      if (digits == "") {
         $("#check-id-number-submit").attr("disabled", true)
      } else {
         $("#check-id-number-submit").attr("disabled", false)
      }
   });

   $("#check-id-number-input-value").focusout(validateIDNumber);
   
   $("#generate-id-number-input-value").focusout(function() {
      let digits = $("#generate-id-number-input-value").val();
      $("#generate-id-number-year-value").html(getYearFromDigits(digits));
   });

   $("#generate-id-number-input-value").keypress(function() {
      let digits = $("#generate-id-number-input-value").val();
      if (digits == "") {
         $("#generate-id-number-submit").attr("disabled", true)
      } else {
         $("#generate-id-number-submit").attr("disabled", false)
      }
   });

   $("#generate-id-number-submit").click(function() {
      $("#generate-id-number-submit").prop("disabled", true)
      $("#generate-id-number-submit").html("Generating...")
      
      //$("#number-list").css('visibility', 'hidden')
      //$("#generate-id-number-result-value").html("")

      setTimeout(function() {
         let threeDigits = $("#generate-id-number-input-value").val()
         let list = generateIDNumbers(threeDigits)

         $('#id_number_table').bootstrapTable('load', list)

         $("#clear-result-table").attr('hidden', false)
         $("#id_number_table_container").attr('hidden', false)
         $("#id-number-table-header").attr('hidden', false)
         $("#generate-id-number-input-value").attr('disabled', true)
         $("#generate-id-number-submit").attr('hidden', true)
       }, 100);

       $("#clear-result-table").click(function() {
         $("#clear-result-table").attr('hidden', true)
         $("#id_number_table_container").attr('hidden', true)
         $("#id-number-table-header").attr('hidden', true)
         $("#generate-id-number-input-value").attr('disabled', false)
         $("#generate-id-number-submit").attr('hidden', false)
         $("#generate-id-number-submit").attr("disabled", false)
         $("#generate-id-number-submit").html("Generate")
      });
   });
})