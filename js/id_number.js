const YEAR_NAN = "N/A"
const VALID_ID_NUMBER = "Valid ID Number"
const INVALID_ID_NUMBER = "Invalid ID Number"

function clamp(num, min, max) {
   return Math.max(min, Math.min(num, max));
}

function getSumOfProducts(digits) {
   //console.log("Digits: " + digits)
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

   //console.log("Sum: " + digits)

   return sum
}

function checkIDNumber(digits) {
   let result = INVALID_ID_NUMBER
   let sumOfProducts = getSumOfProducts(digits)

   if (sumOfProducts > 0 && sumOfProducts % 11 == 0) {
      result = VALID_ID_NUMBER
   }

   return result
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

      if (isNaN(idNumber)) { idNumber = 0; }

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
})