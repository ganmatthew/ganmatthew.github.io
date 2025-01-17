/* 
    Notes:
    - The car number is relative to the direction of the train.
*/

const Direction = {
    NB: 'north',
    SB: 'south'
}

const Ordinal = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth'
}

const LRT1Data = [
    { "name": "Fernando Poe Jr", "exitMap": { "north": [2,3], "south": [2,3] } }, // index 0
    { "name": "Balintawak", "exitMap": { "north": [2,3], "south": [2,3] } },
    { "name": "Monumento", "exitMap": { "north": [2], "south": [3] } },
    { "name": "5th Avenue", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "R. Papa", "exitMap": { "north": [2,3], "south": [4] } },
    { "name": "Abad Santos", "exitMap": { "north": [1], "south": [4] } },
    { "name": "Blumentritt", "exitMap": { "north": [3], "south": [2] } },
    { "name": "Tayuman", "exitMap": { "north": [2,3], "south": [1] } },
    { "name": "Bambang", "exitMap": { "north": [3,4], "south": [2,3] } },
    { "name": "Doroteo Jose", "exitMap": { "north": [2], "south": [3] } },
    { "name": "Carriedo", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "Central Terminal","exitMap": { "north": [2,3], "south": [2,3] } },
    { "name": "United Nations", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "Pedro Gil", "exitMap": { "north": [3], "south": [2] } },
    { "name": "Quirino", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "Vito Cruz", "exitMap": { "north": [3], "south": [2] } },
    { "name": "Gil Puyat", "exitMap": { "north": [1,4], "south": [1,3] } },
    { "name": "Libertad", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "EDSA", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "Baclaran", "exitMap": { "north": [2,3], "south": [2,3] } },
    { "name": "Redemptorist-Aseana", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "MIA Road", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "PITX", "exitMap": { "north": [1], "south": [4] } },
    { "name": "Ninoy Aquino Avenue", "exitMap": { "north": [1,4], "south": [1,4] } },
    { "name": "Dr. Santos", "exitMap": { "north": [1,2], "south": [3,4] } } // index 24
]

const ERROR_MSG_SAME_STATION = "Origin and destination station cannot be the same";
const ERROR_MSG_NORTH_END = "Origin station is the northern terminus";
const ERROR_MSG_SOUTH_END = "Origin station is the southern terminus";

function validateInputData(data) {
    let origin = document.getElementById('origin-station');
    let originFeedback = document.getElementById('origin-station-feedback');
    let destination = document.getElementById('destination-station');
    let destinationFeedback = document.getElementById('destination-station-feedback');
    let direction = document.getElementById('direction');

    // Remove old feedback
    originFeedback.innerHTML = '';
    destinationFeedback.innerHTML = '';
    origin.classList.remove('is-invalid');
    destination.classList.remove('is-invalid');
    direction.classList.remove('is-invalid');

    // Ensure values are typed to int
    originInd = parseInt(origin.value);
    destinationInd = parseInt(destination.value);

    let passed = true;

    // Flag if origin is not valid based on direction
    if (originInd == 0 && direction == Direction.NB) {
        originFeedback.innerHTML = ERROR_MSG_NORTH_END;
        origin.classList.add('is-invalid');
        passed = false;
    }   
    if (originInd == data.length - 1 && direction == Direction.SB) {
        originFeedback.innerHTML = ERROR_MSG_SOUTH_END;
        origin.classList.add('is-invalid');
        passed = false;
    }
    // Flag if the origin and destination are the same station
    if (originInd == destinationInd) {
        origin.classList.add('is-invalid');
        destination.classList.add('is-invalid');
        originFeedback.innerHTML = ERROR_MSG_SAME_STATION;
        destinationFeedback.innerHTML = ERROR_MSG_SAME_STATION;   
        direction.value = 'Cannot be determined';
        passed = false;
    } else {
        // Determine direction from origin and destination
        direction.value = originInd < destinationInd ? 'Southbound' : 'Northbound'
    }
    // Flag if the direction is invalid for the origin and destination
    if (originInd == destinationInd) {
        direction.classList.add('is-invalid');
        passed = false;
    }

    return passed;
}

function generateMessage(data, originInd, destInd, directionText, carArr) {
    const origin = data[originInd].name;
    const destination = data[destInd].name;
    const direction = directionText.toLowerCase();

    let carResult = '';
    let carText = '';
    if (carArr.length > 1) {
        carText = `${Ordinal[carArr[0]]} or ${Ordinal[carArr[1]]}`;
        carResult = `Car No. ${carArr[0]} or Car No. ${carArr[1]}`;
    } else {
        carText = Ordinal[carArr[0]];
        carResult = `Car No. ${carArr[0]}`;
    }

    let message = `To arrive near the exit at ${destination}, board the ${carText} car from the ${direction} platform at ${origin}.`
    return [message, carResult];
}

function calculateTrainCar(data, originInd, destInd, directionText) {
    // Validate inputs
    if (!data) {
        throw new Error('Invalid data')
    }
    if (!data[originInd] || !data[destInd]) {
        throw new Error('Invalid station indices');
    }
    const direction = directionText === 'Northbound' ? 'north' : 'south';
    // Get destination station exit cars
    const destExits = data[destInd].exitMap[direction];
    if (destExits) {
        return destExits;
    }
}

function processData(data, origin, destination, direction, results, resultsCar, resultsMsg) {
    const carArr = calculateTrainCar(
        data, origin.value, destination.value, direction.value
    )
    const [message, carResult] = generateMessage(
        data, origin.value, destination.value, direction.value, carArr
    );
    console.log(message)
    results.hidden = false;
    resultsCar.innerHTML = carResult;
    resultsMsg.innerHTML = message;
    setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight - window.innerHeight,
            left: 0,
            behavior: 'smooth',
          })
        })
      }, 3)
}

document.addEventListener("DOMContentLoaded", (e) => {
    let origin = document.getElementById('origin-station');
    let destination = document.getElementById('destination-station');
    let direction = document.getElementById('direction');
    let submitBtn = document.getElementById('train-car-calculator-submit');
    let results = document.getElementById('train-car-results');
    let resultsCar = document.getElementById('train-car-number-result');
    let resultsMsg = document.getElementById('train-car-message-result');

    let data = LRT1Data;
 
    [origin, destination].forEach(element => {
        element.addEventListener('click', () => {
            const inputsValid = validateInputData(data);
            submitBtn.disabled = !inputsValid;
        });
    });
 
    submitBtn.addEventListener('click', (e) => {
        submitBtn.disabled = true;
        processData(
            data, origin, destination, direction, results, resultsCar, resultsMsg
        );
        submitBtn.disabled = false;
    });

    submitBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        processData(
            data, origin, destination, direction, results, resultsCar, resultsMsg
        );
        submitBtn.disabled = false;
    });

 })

