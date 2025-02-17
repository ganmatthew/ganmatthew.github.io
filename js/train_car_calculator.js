/* 
    Notes:
    - The car number is relative to the direction of the train.
*/

const Direction = {
    NB: 'north',
    SB: 'south',
    EB: 'east',
    WB: 'west',
}

const Ordinal = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth'
}

const LRT1Data = {
    "numberOfCars": 4,
    "directions": [ Direction.NB, Direction.SB ],
    "stations": [
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
}

const LRT2Data = {
    "numberOfCars": 4,
    "directions": [ Direction.WB, Direction.EB ],
    "stations": [
        { "name": "Recto", "exitMap": { "west": [1,2,3,4], "east": [1,2,3,4] } }, // index 0
        { "name": "Legarda", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "Pureza", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "V. Mapa", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "J. Ruiz", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "Gilmore", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "Betty Go-Belmonte", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "Araneta Center-Cubao", "exitMap": { "west": [1,2,3,4], "east": [1,2,3,4] } },
        { "name": "Anonas", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "Katipunan", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "Santolan", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "Marikina-Pasig", "exitMap": { "west": [1,4], "east": [1,4] } },
        { "name": "Antipolo", "exitMap": { "west": [1,4], "east": [1,4] } }, // index 12
    ]
}

const MRT3Data = {
    "numberOfCars": 4,
    "directions": [ Direction.NB, Direction.SB ],
    "stations": [
        { "name": "North Avenue", "exitMap": { "north": [ ], "south": [ ] } }, // index 0
        { "name": "Quezon Avenue", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "GMA-Kamuning", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Araneta Center-Cubao", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Santolan-Annapolis", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Ortigas", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Shaw Bouelvard", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Boni", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Guadalupe", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Buendia", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Ayala", "exitMap": { "north": [ ], "south": [ ] } },
        { "name": "Magallanes", "exitMap": { "north": [4], "south": [1] } },
        { "name": "Taft Avenue", "exitMap": { "north": [3], "south": [1] } }, // index 12
    ]
}

const ERROR_MSG_SAME_STATION = "Origin and destination station cannot be the same";
const ERROR_MSG_NORTH_END = "Origin station is the northern terminus";
const ERROR_MSG_SOUTH_END = "Origin station is the southern terminus";
const ERROR_MSG_EAST_END = "Origin station is the eastern terminus";
const ERROR_MSG_WEST_END = "Origin station is the western terminus";

function generateDropdownOptions(stationsData, selectList) {
    selectList.forEach(select => {
        // Clear existing data
        select.innerHTML = '';
        // Populate dropdown options
        stationsData.forEach((station, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = station.name;
            select.appendChild(option);
        });
        // Set default options
        select.selectedIndex = select.id === 'destination-station' ? '1' : '0';
    });
    
}

function validateDirection(lastInd, originInd, direction, directionsData, origin, originFeedback) {
    const setError = (message) => {
        originFeedback.innerHTML = message;
        origin.classList.add('is-invalid');
        return false;
    };
    const isValidNB = direction === Direction.NB && direction === directionsData[0];
    const isValidWB = direction === Direction.WB && direction === directionsData[0];
    const isValidSB = direction === Direction.SB && direction === directionsData[1];
    const isValidEB = direction === Direction.EB && direction === directionsData[1];
    // Check if origin is at start heading in invalid direction
    if (originInd === 0) {
        const isInvalidStart = isValidSB || isValidEB;
        if (isInvalidStart) {
            const errorMsg = isValidSB ? ERROR_MSG_SOUTH_END : ERROR_MSG_EAST_END;
            return setError(errorMsg);
        }
    }
    // Check if origin is at end heading in invalid direction  
    if (originInd === lastInd) {
        const isInvalidEnd = isValidNB || isValidWB;
        if (isInvalidEnd) {
            const errorMsg = isValidNB ? ERROR_MSG_NORTH_END : ERROR_MSG_WEST_END;
            return setError(errorMsg);
        }
    }
    return true;
}

function updateDirectionValue(directionsData, originInd, destinationInd, direction) {
    if (directionsData.includes(Direction.NB, Direction.SB)) {
        direction.value = originInd < destinationInd ? 'Southbound' : 'Northbound'
    } else if (directionsData.includes(Direction.WB, Direction.EB)) {
        direction.value = originInd < destinationInd ? 'Eastbound' : 'Westbound'
    }
}

function validateInputData(data) {
    let origin = document.getElementById('origin-station');
    let originFeedback = document.getElementById('origin-station-feedback');
    let destination = document.getElementById('destination-station');
    let destinationFeedback = document.getElementById('destination-station-feedback');
    let direction = document.getElementById('direction');

    const stationsData = data['stations'];
    const directionsData = data['directions'];
    const lastInd = stationsData.length - 1

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

    // Flags if origin and direction are not valid based on direction and data rules
    passed = validateDirection(
        lastInd, originInd, direction, directionsData, origin, originFeedback
    )

    // Flag if the origin and destination are the same station
    if (originInd == destinationInd) {
        origin.classList.add('is-invalid');
        destination.classList.add('is-invalid');
        originFeedback.innerHTML = ERROR_MSG_SAME_STATION;
        destinationFeedback.innerHTML = ERROR_MSG_SAME_STATION;   
        passed = false;
    }
    // Flag if the direction is invalid for the origin and destination
    if (originInd == destinationInd) {
        direction.classList.add('is-invalid');
        passed = false;
    }
    // Determine direction from origin and destination
    if (passed) {
        updateDirectionValue(directionsData, originInd, destinationInd, direction)
    } else {
        direction.value = '?';
    }
    return passed;
}

function generateMessage(data, originInd, destInd, directionText, carArr) {
    const stationsData = data['stations'];

    const origin = stationsData[originInd].name;
    const destination = stationsData[destInd].name;
    const direction = directionText.toLowerCase();

    let carResult = '';
    let carText = '';

    if (carArr.length > 2) {
        carText = `the ${Ordinal[carArr[0]]} to ${Ordinal[carArr[carArr.length - 1]]} cars`;
        carResult = `Cars No. ${carArr[0]} to ${carArr[carArr.length - 1]}`;
    } else {
        carText = `the ${Ordinal[carArr[0]]} car`;
        carResult = `Car No. ${carArr[0]}`;
    }

    let message = `To arrive near the exit at ${destination}, board ${carText} at the ${direction} platform of ${origin}.`
    return [message, carResult];
}

function calculateTrainCar(data, originInd, destInd, directionText, usePriorityCar) {
    // Validate inputs
    const stationsData = data['stations'];
    if (!stationsData) {
        throw new Error('Invalid data')
    }
    if (!stationsData[originInd] || !stationsData[destInd]) {
        throw new Error('Invalid station indices');
    }
    const directionMap = {
        'Northbound': 'north', 
        'Southbound': 'south', 
        'Eastbound': 'east', 
        'Westbound': 'west', 
    }
    // Get destination station exit cars
    const direction = directionMap[directionText];
    let destExits = stationsData[destInd].exitMap[direction];
    console.log(`${stationsData[originInd].name} -> ${stationsData[destInd].name} ${directionText.toLowerCase()} result: Car ${destExits}`);

    // If priorityCar is not checked, car 1 must be removed
    if (!usePriorityCar && destExits[0] === 1 || (destExits.length === 2 && destExits[1] === 2)) {
        // If the resulting car is car 1, shift to car 2
        // If it is both cars 1 and 2, retain only car 2
        const oldValue = destExits;
        destExits = [2]; // assume 1 is at the top
        console.log(`Priority Car disabled: Changed from ${oldValue} to ${destExits}`);
    } else {
        console.log(`Priority Car enabled: car number is already ${destExits}`);
    }
    return destExits;
}

function processData(data, origin, destination, direction, usePriorityCar, results, resultsCar, resultsMsg) {
    const carArr = calculateTrainCar(
        data, origin.value, destination.value, direction.value, usePriorityCar
    )
    const [message, carResult] = generateMessage(
        data, origin.value, destination.value, direction.value, carArr
    );
    results.hidden = false;
    resultsCar.innerHTML = carResult;
    resultsMsg.innerHTML = message;
    // Move to bottom of page
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
    let line = document.getElementById('train-line');
    let origin = document.getElementById('origin-station');
    let destination = document.getElementById('destination-station');
    let direction = document.getElementById('direction');
    let priorityCar = document.getElementById('priority-car');
    let submitBtn = document.getElementById('train-car-calculator-submit');
    let results = document.getElementById('train-car-results');
    let resultsCar = document.getElementById('train-car-number-result');
    let resultsMsg = document.getElementById('train-car-message-result');

    const dataMap = {
        '0': LRT1Data,
        '1': LRT2Data,
        '2': MRT3Data,
    };

    // Generate the dropdown options
    line.addEventListener('change', (event) => {        
        const data = dataMap[line.value || 0];
        const stationsData = data['stations'];
        const directionsData = data['directions'];
        generateDropdownOptions(stationsData, [origin, destination]) 
        updateDirectionValue(
            directionsData, parseInt(origin.value), parseInt(destination.value), direction
        )
    });

    function validate() {
        const data = dataMap[line.value || 0];
        const inputsValid = validateInputData(data);
        submitBtn.disabled = !inputsValid;
    }

    // Validate inputs
    [line, origin, destination, priorityCar].forEach(element => {
        element.addEventListener('change', validate);
    });

    function handleSubmit() {
        submitBtn.disabled = true;
        validate()
        if (!submitBtn.disabled) {
            const data = dataMap[line.value || 0];
            processData(
                data, origin, destination, direction, priorityCar.checked,
                results, resultsCar, resultsMsg
            );
            submitBtn.disabled = false;
        }
    }

    // Handle button press
    submitBtn.addEventListener('click', handleSubmit);
    submitBtn.addEventListener('touchend', handleSubmit);
 })

