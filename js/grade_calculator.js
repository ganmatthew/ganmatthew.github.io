/*
   Data based on: https://imgur.com/a/DCpYxhv
  */

   const SCHEME_50 = {
      grade_40: { upper: 100, lower: 95, result: "4.0" },
      grade_35: { upper: 95, lower: 90, result: "3.5" },
      grade_30: { upper: 90, lower: 82, result: "3.0" },
      grade_25: { upper: 82, lower: 74, result: "2.5" },
      grade_20: { upper: 74, lower: 66, result: "2.0" },
      grade_15: { upper: 66, lower: 58, result: "1.5" },
      grade_10: { upper: 58, lower: 50, result: "1.0" },
      grade_00: { upper: 50, lower: 0, result: "0.0" },
   };

   const SCHEME_55 = {
      grade_40: { upper: 100, lower: 95, result: "4.0" },
      grade_35: { upper: 95, lower: 90, result: "3.5" },
      grade_30: { upper: 90, lower: 83, result: "3.0" },
      grade_25: { upper: 83, lower: 76, result: "2.5" },
      grade_20: { upper: 76, lower: 69, result: "2.0" },
      grade_15: { upper: 69, lower: 62, result: "1.5" },
      grade_10: { upper: 62, lower: 55, result: "1.0" },
      grade_00: { upper: 55, lower: 0, result: "0.0" },
   };

   const SCHEME_60 = {
      grade_40: { upper: 100, lower: 95, result: "4.0" },
      grade_35: { upper: 95, lower: 89, result: "3.5" },
      grade_30: { upper: 89, lower: 83, result: "3.0" },
      grade_25: { upper: 83, lower: 78, result: "2.5" },
      grade_20: { upper: 77, lower: 72, result: "2.0" },
      grade_15: { upper: 72, lower: 66, result: "1.5" },
      grade_10: { upper: 66, lower: 60, result: "1.0" },
      grade_00: { upper: 60, lower: 0, result: "0.0" },
   };

   const SCHEME_65 = {
      grade_40: { upper: 100, lower: 95, result: "4.0" },
      grade_35: { upper: 95, lower: 90, result: "3.5" },
      grade_30: { upper: 90, lower: 85, result: "3.0" },
      grade_25: { upper: 85, lower: 80, result: "2.5" },
      grade_20: { upper: 80, lower: 75, result: "2.0" },
      grade_15: { upper: 75, lower: 70, result: "1.5" },
      grade_10: { upper: 70, lower: 65, result: "1.0" },
      grade_00: { upper: 65, lower: 0, result: "0.0" },
   };

   const SCHEME_70 = {
      grade_40: { upper: 100, lower: 96, result: "4.0" },
      grade_35: { upper: 96, lower: 92, result: "3.5" },
      grade_30: { upper: 92, lower: 88, result: "3.0" },
      grade_25: { upper: 88, lower: 83, result: "2.5" },
      grade_20: { upper: 83, lower: 78, result: "2.0" },
      grade_15: { upper: 78, lower: 74, result: "1.5" },
      grade_10: { upper: 74, lower: 70, result: "1.0" },
      grade_00: { upper: 70, lower: 0, result: "0.0" },
   };

   function clamp(num, min, max) {
      return Math.max(min, Math.min(num, max));
   }

   function setGradingScheme(schemeType) {
      switch(schemeType) {
         case "50":
            return SCHEME_50; 
         case "55":
            return SCHEME_55; 
         case "65":
            return SCHEME_65;
         case "70":
            return SCHEME_70;
         default: // use 60% as default
            return SCHEME_60;
      }
   }

   function isFailingGrade(scheme, grade) {
      for (const [key, tier] of Object.entries(scheme)) {
         if (grade < scheme["grade_00"].upper) {
            return true;
         }
      }
      return false;
   }

   function getGrade(scheme, grade) {
      for (const [key, tier] of Object.entries(scheme)) {
         if (grade >= tier.lower && grade <= tier.upper) {
            console.log("Result: " + tier.result);
            return tier.result;
         }
      }
      return "Error";
   }

   function parseInput() {
      let resultValue = document.getElementById("grade-calcu-result-value");
      if (resultValue.classList.contains('invalid-result')) {
         resultValue.classList.remove('invalid-result')
      }

      let schemeType = document.getElementById("grade-calcu-passing").value;
      let grade = parseFloat(document.getElementById("grade-calcu-input").value);

      if (isNaN(schemeType)) { schemeType = "60"; }
      if (isNaN(grade)) { grade = 0; }

      grade = clamp(grade, 0, 100);
      document.getElementById("grade-calcu-input").value = grade;

      let scheme = setGradingScheme(schemeType);
      let result = getGrade(scheme, grade)

      if (isFailingGrade(scheme, grade)) {
         resultValue.classList.add('invalid-result')
      }
      resultValue.innerHTML = result;
   }

   document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("grade-calcu-input").addEventListener("keypress", function(event) {
         if (event.key === "Enter") {
            // Prevent default enter behavior
            event.preventDefault();
            parseInput();
         }
      });
      document.getElementById("grade-calcu-input").addEventListener("change", parseInput);

   })