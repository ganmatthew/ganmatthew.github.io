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

const DirectionMap = {
    'Northbound': 'north', 
    'Southbound': 'south', 
    'Eastbound': 'east', 
    'Westbound': 'west', 
}

const Ordinal = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth'
}

const LRT1Data = {
    "numberOfCars": [3,4],
    "directions": [ Direction.NB, Direction.SB ],
    "stations": [
        { "name": "Fernando Poe Jr", "exitMap": { "north": [[2,3]], "south": [[2,3]] } }, // index 0
        { "name": "Balintawak", "exitMap": { "north": [[2,3]], "south": [[2,3]] } },
        { "name": "Monumento", "exitMap": { "north": [[2]], "south": [[3]] } },
        { "name": "5th Avenue", "exitMap": { "north": [[1,4]], "south": [[1,4]] } },
        { "name": "R. Papa", "exitMap": { "north": [[2,3]], "south": [[4]] } },
        { "name": "Abad Santos", "exitMap": { "north": [[1]], "south": [[4]] } },
        { "name": "Blumentritt", "exitMap": { "north": [[3]], "south": [[2]] } },
        { "name": "Tayuman", "exitMap": { "north": [[2,3]], "south": [[1]] } },
        { "name": "Bambang", "exitMap": { "north": [[3,4]], "south": [[2,3]] } },
        { "name": "Doroteo Jose", "exitMap": { "north": [[2]], "south": [[3]] } },
        { "name": "Carriedo", "exitMap": { "north": [[1,4]], "south": [[1,4]] } },
        { "name": "Central Terminal","exitMap": { "north": [[2,3]], "south": [[2,3]] } },
        { "name": "United Nations", "exitMap": { "north": [[1,4]], "south": [[1,4]] } },
        { "name": "Pedro Gil", "exitMap": { "north": [[3]], "south": [[2]] } },
        { "name": "Quirino", "exitMap": { "north": [[1,4]], "south": [[1,4]] } },
        { "name": "Vito Cruz", "exitMap": { "north":[[3]], "south": [[2]] } },
        { "name": "Gil Puyat", "exitMap": { "north": [[1,4]], "south": [[1,3]] } },
        { "name": "Libertad", "exitMap": { "north": [[1,4]], "south": [[1,4]] } },
        { "name": "EDSA", "exits": ["E1/E3: Taft Avenue", "E2/E4: MRT-3 Taft Avenue / Metro Point Mall"], "exitMap": { "north": [[1,2], [3,4]], "south": [[1,2], [3,4]] } },
        { "name": "Baclaran", "exits": ["E1/E3", "E2/E4"], "exitMap": { "north": [[2,3], [2,3]], "south": [[2,3], [2,3]] } },
        { "name": "Redemptorist-Aseana", "exitMap": { "north": [[1,4]], "south": [[1,4]] } },
        { "name": "MIA Road", "exitMap": { "north": [[1,4]], "south": [[1,4]] } },
        { "name": "PITX", "exitMap": { "north": [[1]], "south": [[4]] } },
        { "name": "Ninoy Aquino Avenue", "exitMap": { "north": [[1,4]], "south": [[1,4]] } },
        { "name": "Dr. Santos", "exitMap": { "north": [[1,2]], "south": [[3,4]] } } // index 24
    ]
}

const LRT2Data = {
    "numberOfCars": [4],
    "directions": [ Direction.WB, Direction.EB ],
    "stations": [
        { "name": "Recto", "exitMap": { "west": [[1,2,3,4]], "east": [[1,2,3,4]] } }, // index 0
        { "name": "Legarda", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "Pureza", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "V. Mapa", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "J. Ruiz", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "Gilmore", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "Betty Go-Belmonte", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "Araneta Center-Cubao", "exitMap": { "west": [[1,2,3,4]], "east": [[1,2,3,4]] } },
        { "name": "Anonas", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "Katipunan", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "Santolan", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "Marikina-Pasig", "exitMap": { "west": [[1,4]], "east": [[1,4]] } },
        { "name": "Antipolo", "exitMap": { "west": [[1,4]], "east": [[1,4]] } }, // index 12
    ]
}

const MRT3Data = {
    "numberOfCars": [3,4],
    "directions": [ Direction.NB, Direction.SB ],
    "stations": [
        { "name": "North Avenue", "exitMap": { "north": [[3]], "south": [[2]] } }, // index 0
        { "name": "Quezon Avenue", "exitMap": { "north": [[1]], "south": [[4]] } },
        { "name": "GMA-Kamuning", "exitMap": { "north": [[3]], "south": [[2]] } },
        { "name": "Araneta Center-Cubao", "exits": ["Farmers Plaza North", "Farmers Plaza South / Farmers Market / Arayat Market"], "exitMap": { "north": [[1,2], [3,4]], "south": [[3,4], [1,2]] } },
        { "name": "Santolan-Annapolis", "exitMap": { "north": [[3]], "south": [[1]] } },
        { "name": "Ortigas", "exitMap": { "north": [[3]], "south": [[2]] } },
        { "name": "Shaw Boulevard", "exits": ["Shangri-La / Starmall EDSA", "EDSA Central / Greenfield District"], "exitMap": { "north": [[1,2], [3,4]], "south": [[3,4], [1,2]] } },
        { "name": "Boni", "exits": ["GA Tower / SM Light", "Pinatubo St / Pioneer Woodlands"], "exitMap": { "north": [[1,2], [2,3]], "south": [[3,4], [1,2]] } },
        { "name": "Guadalupe", "exitMap": { "north": [[4]], "south": [[1]] } },
        { "name": "Buendia", "exitMap": { "north": [[1]], "south": [[4]] } },
        { "name": "Ayala", "exitMap": { "north": [[1,2,3,4]], "south": [[1,2,3,4]] } },
        { "name": "Magallanes", "exitMap": { "north": [[4]], "south": [[1]] } },
        { "name": "Taft Avenue", "exitMap": { "north": [[4]], "south": [[1]] } }, // index 12
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
        direction.value = originInd < destinationInd ? 'Southbound' : 'Northbound';
    } else if (directionsData.includes(Direction.WB, Direction.EB)) {
        direction.value = originInd < destinationInd ? 'Eastbound' : 'Westbound';
    } else {
        direction.value = '?';
    }
}

function checkForStationExits(stationsData, destinationInd, direction) {
    const directionText = DirectionMap[direction];
    let exitDropdown = document.getElementById('station-exit-dropdown');
    let select = document.getElementById('station-exit');
    let destination = stationsData[destinationInd];
    let carArr = destination.exitMap[directionText];
    let exitNames = destination['exits'] || []

    // Stations with array lengths of 2 and greater must have more than one exit for that direction
    if (carArr.length >= 2 && carArr.length === exitNames.length) {
        exitDropdown.hidden = false;
        // Clear existing data
        select.innerHTML = '';
        // Populate dropdown options
        exitNames.forEach((exitName, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = exitName;
            select.appendChild(option);
        });
        // Set default options
        select.selectedIndex = '0';
    } else {
        exitDropdown.hidden = true;
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
    const originInd = parseInt(origin.value);
    const destinationInd = parseInt(destination.value);

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

function generateMessage(data, originInd, destInd, directionText, exit, carArr) {
    const stationsData = data['stations'];

    const origin = stationsData[originInd].name;
    const destination = stationsData[destInd].name;
    const direction = directionText.toLowerCase();

    let carResult = '';
    let carText = '';
    let exitText = '';

    if (carArr.length >= 2) {
        carText = `the ${Ordinal[carArr[0]]} to ${Ordinal[carArr[carArr.length - 1]]} cars`;
        carResult = `Car Nos. ${carArr[0]} to ${carArr[carArr.length - 1]}`;
    } else {
        carText = `the ${Ordinal[carArr[0]]} car`;
        carResult = `Car No. ${carArr[0]}`;
    }
    let exitList = stationsData[destInd].exitMap[DirectionMap[directionText]]
    if (exitList.length > 1) {
        exitText = stationsData[destInd].exits[exit];
    }

    let message = `To arrive near the ${exitText} exit at ${destination}, board ${carText} at the ${direction} platform of ${origin}.`
    return [message, carResult];
}

function calculateTrainCar(data, originInd, destInd, directionText, usePriorityCar, configuration) {
    // Validate inputs
    const stationsData = data['stations'];
    if (!stationsData) {
        throw new Error('Invalid data')
    }
    if (!stationsData[originInd] || !stationsData[destInd]) {
        throw new Error('Invalid station indices');
    }
    // Get destination station exit cars
    const direction = DirectionMap[directionText];
    let carArr = stationsData[destInd].exitMap[direction];
    let exit = document.getElementById('station-exit');
    let exitValue = exit.value || 0

    carArr = carArr[exitValue];
    console.log(`Origin: ${stationsData[originInd].name} (${originInd})\nDestination: ${stationsData[destInd].name} (${destInd})\nDirection: ${directionText.toLowerCase()}\nExit Number: ${exitValue}\nUse Priority Car: ${usePriorityCar}\nTrain Configuration: ${configuration}\nCar Result: ${carArr}`);

    // If priorityCar is not checked, car 1 must be removed
    if (!usePriorityCar) {
        if (carArr[0] === 1) {
            // If the resulting car is car 1, shift to car 2
            // If it is both cars 1 and 2, retain only car 2
            const oldValue = carArr;
            carArr = [2]; // assume 1 is at the top
            console.log(`Priority Car disabled: Changed from ${oldValue} to ${carArr}`);
        } else {
            console.log(`Priority Car disabled: No changes made`);
        }
    } else if (usePriorityCar) {
        console.log(`Priority Car enabled: No changes made`);
    } else {
        throw new Error('Error in priority car checking condition')
    }

    // If not using 4-car, car 4 must be changed to car 3
    if (configuration === "3") {
        if (carArr[1] === 4) {
            // If the resulting car is car 4, shift to car 3
            // If it is both cars 3 and 4, retain only car 3
            const oldValue = carArr;
            carArr = [3]; // assume 4 is at the top
            console.log(`Using 3-car config: Changed from ${oldValue} to ${carArr}`);
        } else {
            console.log(`Using 3-car config: No changes made`);
        }
    } else if (configuration === "4") {
        console.log(`Using 4-car config: No changes made`);
    } else {
        throw new Error('Error in train car configuration checking condition')
    }

    return carArr;
}

function processData(data, origin, destination, direction, usePriorityCar, configuration, exit, results, resultsCar, resultsMsg) {
    const carArr = calculateTrainCar(
        data, origin.value, destination.value, direction.value, usePriorityCar, configuration
    )
    const [message, carResult] = generateMessage(
        data, origin.value, destination.value, direction.value, exit, carArr
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
    let line = document.getElementById('train-line');
    let origin = document.getElementById('origin-station');
    let destination = document.getElementById('destination-station');
    let direction = document.getElementById('direction');
    let exit = document.getElementById('station-exit');
    let priorityCar = document.getElementById('priority-car');
    let configuration = document.getElementById('configuration');
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
    [line, origin, destination].forEach(element => {
        element.addEventListener('change', (event) => {  
            const data = dataMap[line.value || 0];
            const numberOfCarsData = data['numberOfCars'];
            const stationsData = data['stations'];
            const directionsData = data['directions'];
            const originInd = parseInt(origin.value);
            const destinationInd = parseInt(destination.value);
            if (element === line) {
                // Update the list of origin and destination stations
                generateDropdownOptions(stationsData, [origin, destination])
                // Number of cars is fixed at 4 if the line only supports 4-car configuration
                configuration.disabled = numberOfCarsData.length === 1;
                if (numberOfCarsData.length === 1) {
                    // Switch to the option matching the line's number of cars
                    let defaultOption = configuration.querySelector(`[value='${numberOfCarsData[0]}']`)
                    configuration.selectedIndex = defaultOption.index;
                }
            }
            // Update the train direction based on origin and destination
            updateDirectionValue(
                directionsData, originInd, destinationInd, direction
            )
            // Update whether to allow selecting multiple exits
            checkForStationExits(stationsData, destinationInd, direction.value)
        });
    });

    // Attach event listener to the checkboxes to save their states
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', saveCheckboxStates);
    });

    loadCheckboxStates()

    function validate() {
        const data = dataMap[line.value || 0];
        const inputsValid = validateInputData(data);
        submitBtn.disabled = !inputsValid;
    }

    // Validate inputs
    [line, origin, destination, priorityCar, configuration].forEach(element => {
        element.addEventListener('change', validate);
    });

    function handleSubmit() {
        submitBtn.disabled = true;
        validate()
        if (!submitBtn.disabled) {
            const data = dataMap[line.value || 0];
            processData(
                data, origin, destination, direction, priorityCar.checked, configuration.value,
                exit.value, results, resultsCar, resultsMsg
            );
            submitBtn.disabled = false;
        }
    }

    // Handle button press
    submitBtn.addEventListener('click', handleSubmit);
    submitBtn.addEventListener('touchend', handleSubmit);
 })

