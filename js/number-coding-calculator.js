const Day = {
    0: 'Mon',
    1: 'Tue',
    2: 'Wed',
    3: 'Thu',
    4: 'Fri',
    5: 'Sat',
    6: 'Sun'
}

const Allowed = {
    NoMajor: 0,
    NoEDSA: 1,
    NoBoth: 2,
    Yes: 3,
}

const NumberCodingType = {
    NoMajor: 0,
    NoEDSA: 1,
    NoBoth: 2
}

const CodingMap = [
    { 'flag': Allowed.NoMajor, 'cssClass': 'major-restricted' },
    { 'flag': Allowed.NoEDSA, 'cssClass': 'edsa-restricted' },
    { 'flag': Allowed.Allowed, 'cssClass': 'allowed' },
    { 'flag': Allowed.NoBoth, 'cssClass': 'both-restricted' }
]

const NumberCodingData = [
    // Mon          Tue              Wed            Thu             Fri             Sat             Sun
    [Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.NoMajor, Allowed.NoEDSA, Allowed.Yes],   // digit 0
    [Allowed.NoBoth, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.Yes],       // digit 1
    [Allowed.NoMajor, Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes],   // digit 2
    [Allowed.NoEDSA, Allowed.NoMajor, Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.Yes],   // digit 3
    [Allowed.Yes, Allowed.NoBoth, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes],       // digit 4
    [Allowed.NoEDSA, Allowed.Yes, Allowed.NoBoth, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.Yes],       // digit 5
    [Allowed.Yes, Allowed.NoEDSA, Allowed.NoMajor, Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes],   // digit 6
    [Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.NoMajor, Allowed.NoEDSA, Allowed.Yes, Allowed.Yes],   // digit 7
    [Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.NoBoth, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes],       // digit 8
    [Allowed.NoEDSA, Allowed.Yes, Allowed.NoEDSA, Allowed.Yes, Allowed.NoBoth, Allowed.Yes, Allowed.Yes],       // digit 9
];

function clamp(min, max, value) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function validateInputs(lastDigit) {
    let passed = true;

    try {
        const min = parseInt(lastDigit.min);
        const max = parseInt(lastDigit.max);
        let value = parseInt(lastDigit.value);
        if (isNaN(value)) {
            value = parseInt(lastDigit.placeholder);
        }
        if (isNaN(min) || isNaN(max) || isNaN(value)) {
            passed = false;
        } else {
            lastDigit.value = clamp(min, max, value);
        }
    } catch (err) {
        passed = false;
        console.log(err);
    }

    return passed;
}

function loadWeekSVG(svgContainer, daysArr, numberCodingType) {
    const svgStr = `<svg id="number-coding-graphic" xmlns="http://www.w3.org/2000/svg" width="1650" height="100" viewBox="0 0 1650 100">
    <rect id="Day1" class="day-obj" x="16" y="16" width="220" height="118" rx="4" ry="4"/>
    <text id="_1" data-name="Day1" class="day-text" x="126.787" y="95.112"><tspan x="126.787">Mon</tspan></text>

    <rect id="Day2" data-name="Day2" class="day-obj" x="249" y="16" width="220" height="118" rx="4" ry="4"/>
    <text id="_2" data-name="2" class="day-text" x="359.787" y="95.112"><tspan x="359.787">Tue</tspan></text>

    <rect id="Day3" data-name="Day3" class="day-obj" x="482" y="15" width="220" height="118" rx="4" ry="4"/>
    <text id="_3" data-name="3" class="day-text" x="592.787" y="95.112"><tspan x="592.787">Wed</tspan></text>

    <rect id="Day4" data-name="Day4" class="day-obj" x="715" y="15" width="220" height="118" rx="4" ry="4"/>
    <text id="_4" data-name="4" class="day-text" x="825.787" y="95.112"><tspan x="825.787">Thu</tspan></text>

    <rect id="Day5" data-name="Day5" class="day-obj" x="948" y="15" width="220" height="118" rx="4" ry="4"/>
    <text id="_5" data-name="5" class="day-text" x="1058.787" y="95.112"><tspan x="1058.787">Fri</tspan></text>

    <rect id="Day6" data-name="Day6" class="day-obj" x="1181" y="16" width="220" height="118" rx="4" ry="4"/>
    <text id="_6" data-name="6" class="day-text" x="1291.787" y="95.112"><tspan x="1291.787">Sat</tspan></text>    

    <rect id="Day7" data-name="Day7" class="day-obj" x="1414" y="16" width="220" height="118" rx="4" ry="4"/>
    <text id="_7" data-name="7" class="day-text" x="1524.788" y="95.112"><tspan x="1524.788">Sun</tspan></text>
    </svg>`;

    svgContainer.innerHTML = svgStr;

    const svg = svgContainer.querySelector('svg');
    const svgDays = svg.querySelectorAll('.day-obj');

    svgDays.forEach((day, index) => {
        const dayFlag = daysArr[index];
        const cssClass = CodingMap[dayFlag].cssClass;
        if (cssClass) {
            day.classList.add(cssClass);
        }
    });

}

function generateDaysArray(lastDigit) {
    if (!lastDigit) return [];

    let digit = parseInt(lastDigit);
    let daysArr = NumberCodingData[digit];
    console.log(daysArr);

    return daysArr
}

// function loadCheckboxStates() {
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     checkboxes.forEach((checkbox) => {
//         const savedState = localStorage.getItem(checkbox.id);
//         if (savedState !== null) {
//             checkbox.checked = savedState === 'true';
//         }
//     });
// }

document.addEventListener("DOMContentLoaded", (e) => {
    let form = document.getElementById('number-coding-calculator').querySelector('form');
    let lastDigit = document.getElementById('last-digit');
    let numberCodingType = document.getElementById('number-coding-type');
    let submitBtn = document.getElementById('number-coding-calculator-submit');
    let results = document.getElementById('number-coding-results');
    let svgContainer = document.getElementById('number-coding-graphic-container');

    // Attach event listener to the checkboxes to save their states
    // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // checkboxes.forEach((checkbox) => {
    //     checkbox.addEventListener('change', saveCheckboxStates);
    // });

    // loadCheckboxStates()

    function validate() {
        const inputsValid = validateInputs(lastDigit);
        submitBtn.disabled = !inputsValid;
    }

    function handleSubmit() {
        submitBtn.disabled = true;
        validate()

        if (!submitBtn.disabled) {
            submitBtn.disabled = false;
        }

        let daysArr = generateDaysArray(lastDigit.value)

        loadWeekSVG(svgContainer, daysArr, numberCodingType.value)
        results.hidden = false;
    }

    // Validate inputs
    [lastDigit].forEach(element => {
        element.addEventListener('change', validate);
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit();
    });

    submitBtn.addEventListener('click', handleSubmit);
    submitBtn.addEventListener('touchend', handleSubmit);
 })