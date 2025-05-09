import { Direction, DirectionMap, Ordinal, LineData, CarConfig, TrainSVG } from "./train_data.js"

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

function calculateTrainCar(data, originInd, destInd, directionText, usePriorityCar, configValue) {
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
    if (configValue === CarConfig.ThreeCar) {
        if (carArr[1] === 4) {
            // If the resulting car is car 4, shift to car 3
            // If it is both cars 3 and 4, retain only car 3
            const oldValue = carArr;
            carArr = [3]; // assume 4 is at the top
            console.log(`Using 3-car config: Changed from ${oldValue} to ${carArr}`);
        } else {
            console.log(`Using 3-car config: No changes made`);
        }
    } else if (configValue === CarConfig.FourCar) {
        console.log(`Using 4-car config: No changes made`);
    } else {
        throw new Error('Error in train car configuration checking condition')
    }

    return carArr;
}

function loadTerminals(stationsData, directionText) {
    const terminus1 = document.getElementById('terminus1');
    const terminus2 = document.getElementById('terminus2');
    const terminus1Text = document.getElementById('terminus1-text')
    const terminus2Text = document.getElementById('terminus2-text')
    const direction = DirectionMap[directionText]
    const isNBOrWB = [DirectionMap.Northbound, DirectionMap.Westbound].includes(direction);
    const isSBOrEB = [DirectionMap.Southbound, DirectionMap.Eastbound].includes(direction);

    let station1 = stationsData[0];
    let station2 = stationsData[stationsData.length - 1];

    terminus1Text.innerHTML = `To ${station1.name}`
    terminus2Text.innerHTML = `To ${station2.name}`
    terminus1.classList.toggle('active-direction', isNBOrWB);
    terminus2.classList.toggle('active-direction', isSBOrEB);

    if (!isNBOrWB && !isSBOrEB) {
        terminus1Text.innerHTML = '';
        terminus2Text.innerHTML = '';
    }
}

function loadTrainSVG(svgContainer, directionText, configValue, carArr) {
    const direction = DirectionMap[directionText]
    const isNBOrWB = [DirectionMap.Northbound, DirectionMap.Westbound].includes(direction);
    const isSBOrEB = [DirectionMap.Southbound, DirectionMap.Eastbound].includes(direction);
    let svgStr = '';

    if (configValue === CarConfig.ThreeCar) {
        svgStr = isNBOrWB ? TrainSVG[0] : TrainSVG[1];
    } else if (configValue === CarConfig.FourCar) {
        svgStr = isSBOrEB ? TrainSVG[3] : TrainSVG[2];
    }

    svgContainer.innerHTML = svgStr;
    
    let svgCars = svgContainer.children[0].querySelectorAll('.mc-car, .m-car');

    carArr.forEach(element => {
        const carId = `Car${element}`;
        const svgCarObj = Array.from(svgCars).find(car => car.id === carId);
        if (svgCarObj) {
            svgCarObj.classList.add('selected');
        }
    });

    svgCars.forEach(car => {
        if (!carArr.includes(Number(car.id.replace('Car', '')))) {
            car.classList.remove('selected');
        }
    });

}

function processData(data, origin, destination, direction, usePriorityCar, configuration, exit, results, resultsCar, resultsMsg, svgContainer) {
    // Determine the terminals of the line based on direction
    const stationsData = data['stations'];
    const configValue = parseInt(configuration.value);
    
    loadTerminals(stationsData, direction.value);

    const carArr = calculateTrainCar(
        data, origin.value, destination.value, direction.value, usePriorityCar, configValue
    );

    const [message, carResult] = generateMessage(
        data, origin.value, destination.value, direction.value, exit, carArr
    );

    loadTrainSVG(
        svgContainer, direction.value, configValue, carArr
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
    let svgContainer = document.getElementById('train-car-graphic-container');

    // Generate the dropdown options
    [line, origin, destination].forEach(element => {
        element.addEventListener('change', (event) => {  
            const data = LineData[line.value || 0];
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
        const data = LineData[line.value || 0];
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
            const data = LineData[line.value || 0];
            processData(
                data, origin, destination, direction, priorityCar.checked, configuration,
                exit.value, results, resultsCar, resultsMsg, svgContainer
            );
            submitBtn.disabled = false;
        }
    }

    // Handle button press
    submitBtn.addEventListener('click', handleSubmit);
    submitBtn.addEventListener('touchend', handleSubmit);
 })

