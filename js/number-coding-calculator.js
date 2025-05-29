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
    { 'flag': Allowed.NoBoth, 'cssClass': 'both-restricted' },
    { 'flag': Allowed.Allowed, 'cssClass': 'allowed' }
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

function generateDaySVG(index, text, rect_x, rect_y, text_x, text_y, tspan_x) {
    if (isNaN(index) || text.length === 0 || isNaN(rect_x) || isNaN(rect_y) || isNaN(text_x) || isNaN(text_y) || isNaN(tspan_x)) {
        console.error("One or more parameters for generateDaySVG() is not valid");
        return ``
    }
    return `<rect id="Day${index}" class="day-obj" x="${rect_x}" y="${rect_y}" width="220" height="118" rx="4" ry="4"/>
    <text id="_${index}" data-name="Day${index}" class="day-text" x="${text_x}" y="${text_y}"><tspan x="${tspan_x}">${text}</tspan></text>`;
}

function generateWeekSVG(numOfDays, width=1650, height=100) {
    const shapeWidth = 220;
    const shapeSpacing = 233; // 220px width + 13px space
    const totalWidth = numOfDays * shapeSpacing;
    const startX = (width - totalWidth) / 2;

    const svgOpenTag = `<svg id="number-coding-graphic" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    const svgCloseTag = `</svg>`;
    const dayNames = Object.values(Day);

    let svg = svgOpenTag;

    for (let index = 0; index < numOfDays; index++) {
        const rect_x = startX + index * shapeSpacing;
        const rect_y = 16;
        const text_x = rect_x + shapeWidth / 2;
        const text_y = 95.112;
        const tspan_x = text_x;
        const text = dayNames[index];
        svg += generateDaySVG(index + 1, text, rect_x, rect_y, text_x, text_y, tspan_x);
    }

    svg += svgCloseTag;
    return svg;
}

function loadWeekSVG(svgContainer, daysArr, numOfDays) {
    const svgStr = generateWeekSVG(numOfDays);
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

function saveCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      localStorage.setItem(checkbox.id, checkbox.checked);
    });
}  

function loadCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState !== null) {
            checkbox.checked = savedState === 'true';
        }
    });
}

document.addEventListener("DOMContentLoaded", (e) => {
    let form = document.getElementById('number-coding-calculator').querySelector('form');
    let lastDigit = document.getElementById('last-digit');
    let numberCodingType = document.getElementById('number-coding-type');
    let includeSundays = document.getElementById('include-sundays');
    let submitBtn = document.getElementById('number-coding-calculator-submit');
    let results = document.getElementById('number-coding-results');
    let svgContainer = document.getElementById('number-coding-graphic-container');

    // Attach event listener to the checkboxes to save their states
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', saveCheckboxStates);
    });

    loadCheckboxStates()

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
        const numOfDays = includeSundays.checked ? 7 : 6;

        loadWeekSVG(svgContainer, daysArr, numOfDays)
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