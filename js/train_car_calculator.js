import { Direction, DirectionMap, Ordinal, CarConfig, PlatformType, ExitType, LineName, LineData, TrainSVG } from "./train_data.js"

const ERROR_MSG_SAME_STATION = "Origin and destination station cannot be the same";
const ERROR_MSG_NORTH_END = "Origin station is the northern terminus";
const ERROR_MSG_SOUTH_END = "Origin station is the southern terminus";
const ERROR_MSG_EAST_END = "Origin station is the eastern terminus";
const ERROR_MSG_WEST_END = "Origin station is the western terminus";

function getEnumKeyFromValue(enumObj, value) {
    return Object.keys(enumObj).find(k => enumObj[k] === value) || null;
}

function generateDropdownOptions(stationsData, selectList) {
    selectList.forEach(select => {
        // Clear existing data
        select.innerHTML = null;
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
    const exitDropdown = document.getElementById('station-exit-dropdown');
    const select = document.getElementById('station-exit');
    const destination = stationsData[destinationInd];
    const exitNames = destination['exits'] || []
    const carsPerExit = destination.exitMap[directionText] || [];

    // Map available exits per direction
    const availableExits = exitNames
        .map((name, i) => ({ name, cars: carsPerExit[i] }))
        .filter(exit => Array.isArray(exit.cars) && exit.cars.length > 0);

    if (availableExits.length > 0) {
        exitDropdown.hidden = false;
        // Clear existing data
        select.innerHTML = '';
        // Populate dropdown options
        availableExits.forEach((exit) => {
            const option = document.createElement('option');
            // Use the index from the unfiltered array
            option.value = exitNames.indexOf(exit.name);
            option.textContent = exit.name;
            select.appendChild(option);
        });
        // Set default options
        select.selectedIndex = '0';
    } else {
        exitDropdown.hidden = true;
    }
}

function validateInputData(data) {
    const origin = document.getElementById('origin-station');
    const originFeedback = document.getElementById('origin-station-feedback');
    const destination = document.getElementById('destination-station');
    const destinationFeedback = document.getElementById('destination-station-feedback');
    const direction = document.getElementById('direction');
    
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

function markText(text) {
    return `<mark>${text}</mark>`
}

function generateMessage(data, originInd, destInd, directionText, exit, carArr, useHighlight) {
    const stationsData = data['stations'];
    
    const origin = stationsData[originInd].name;
    const destination = stationsData[destInd].name;
    const direction = directionText.toLowerCase();
    
    let carResult = '';
    let carText = '';

    switch(carArr.length) {
        case 0:
            carText = '[no cars selected]';
            carResult = 'Cars No. —';
            break;
        case 1:
            carText = `${Ordinal[carArr[0]]} car`;
            carResult = `Car No. ${carArr[0]}`;
            break;
        case 2:
            carText = `${Ordinal[carArr[0]]} or ${Ordinal[carArr[1]]} cars`;
            carResult = `Car Nos. ${carArr[0]} or ${carArr[1]}`;
            break;
        case 3:
            carText = `${Ordinal[carArr[0]]}, ${Ordinal[carArr[1]]}, or ${Ordinal[carArr[2]]} cars`;
            carResult = `Car Nos. ${carArr[0]}, ${carArr[1]}, or ${carArr[2]}`;
            break;
        case 4:
            carText = `${Ordinal[carArr[0]]}, ${Ordinal[carArr[1]]}, ${Ordinal[carArr[2]]}, or ${Ordinal[carArr[3]]} cars`;
            carResult = `Car Nos. ${carArr[0]}, ${carArr[1]}, ${carArr[2]}, or ${carArr[3]}`;
            break;
    }
    
    const exitList = stationsData[destInd].exitMap[DirectionMap[directionText]]
    let exitText;
    
    if (exitList.length > 1) {
        exitText = stationsData[destInd].exits[exit];
        const isNumberedExit = exitText.charAt(0).toUpperCase() === 'E' && !isNaN(Number(exitText.charAt(1)));
        if (isNumberedExit) {
            const exitNumber = exitText.split(':')[0];
            exitText = `exit ${useHighlight ? markText(exitNumber) : exitNumber}`;
        } else {
            exitText = `the ${useHighlight ? markText(exitText) : exitText}`;
            exitText = data['line'] != LineName.Line1 ? exitText.concat(' exit') : exitText;
        }
    } else {
        exitText = `the exit`;
    }
    
    const message = `To arrive near ${exitText} at ${useHighlight ? markText(destination) : destination},<wbr> board the ${useHighlight ? markText(carText) : carText} on the ${useHighlight ? markText(direction) : direction} platform at ${useHighlight ? markText(origin) : origin}.`;
    return [message, carResult];
}

function filterAllowedTrainCars(carArr, numToRemove, newNum, minNum, maxNum) {
    let updatedCars = carArr.map(num => {
        return num === numToRemove ? newNum : num;
    });
    updatedCars = [...new Set(updatedCars)];
    updatedCars = updatedCars.filter(num => num >= minNum && num <= maxNum);
    return updatedCars;
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
    const exit = document.getElementById('station-exit');
    const exitValue = exit.value || 0
    const isLRT2 = data['line'].name === LineName.Line2.name;

    carArr = carArr[exitValue];
    
    console.log(`Line: ${data['line'].name}\nOrigin: ${stationsData[originInd].name} (${originInd})\nDestination: ${stationsData[destInd].name} (${destInd})\nDirection: ${directionText.toLowerCase()}\nExit Number: ${exitValue}\nUse Priority Car: ${usePriorityCar}\nTrain Configuration: ${configuration.value}\nCar Result: [${carArr}]`);
    
    // If not using 4-car, car 4 must be changed to car 3
    if (configValue === CarConfig.ThreeCar.index) {
        if (carArr.includes(4)) {
            const oldValue = carArr;
            carArr = filterAllowedTrainCars(carArr, 4, 3, 1, 3);
            console.log(`Using 3-car config: Changed from ${oldValue} to ${carArr}`);
        } else {
            console.log(`Using 3-car config: No changes made`);
        }
    } else if (configValue === CarConfig.FourCar.index) {
        console.log(`Using 4-car config: No changes made`);
    } else {
        throw new Error('Error in train car configuration checking condition')
    }
    
    // If priorityCar is not checked, car 1 must be removed
    if (!isLRT2 && !usePriorityCar) {
        if (carArr.includes(1)) {
            const oldValue = carArr;
            carArr = filterAllowedTrainCars(carArr, 1, 2, 2, 4);
            console.log(`Priority Car disabled: Changed from ${oldValue} to ${carArr}`);
        } else {
            console.log(`Priority Car disabled: No changes made`);
        }
    } else if (isLRT2) {
        console.log(`Using LRT-2: No changes made`);
    } else if (usePriorityCar) {
        console.log(`Priority Car enabled: No changes made`);
    } else {
        throw new Error('Error in priority car checking condition')
    }

    return carArr;
}

function loadTerminals(stationsData, directionText, platformType) {
    const direction = DirectionMap[directionText];
    const isNBOrWB = [DirectionMap.Northbound, DirectionMap.Westbound].includes(direction);
    const isIsland = platformType === PlatformType.Island;
    
    const terminus1 = document.getElementById('terminus1');
    const terminus2 = document.getElementById('terminus2');
    const terminus1Text = document.getElementById('terminus1-text');
    const terminus2Text = document.getElementById('terminus2-text');
    
    const station1 = stationsData[0];
    const station2 = stationsData[stationsData.length - 1];
    
    terminus1.classList.toggle('active-direction', isIsland);
    terminus2.classList.toggle('active-direction', !isIsland);
    
    const stationName1 = isNBOrWB ? station2.name : station1.name;
    const stationName2 = isNBOrWB ? station1.name : station2.name;
    terminus1Text.innerHTML = isIsland ? `To ${stationName2}` : `To ${stationName1}`
    terminus2Text.innerHTML = isIsland ? `To ${stationName1}` : `To ${stationName2}`
}

function loadTrainSVG(svgContainer, platformType, line, configValue, carArr) {
    const isIsland = platformType === PlatformType.Island;
    const svgIndex = configValue === CarConfig.ThreeCar.index ? (isIsland ? 0 : 1) : (isIsland ? 2 : 3);
    
    svgContainer.innerHTML = TrainSVG[svgIndex];
    const lineColorClass = line[0].id;
    
    const svgCars = svgContainer.children[0];
    svgCars.querySelectorAll('.mc-car, .m-car').forEach(car => {
        const carNum = Number(car.id.replace('Car', ''));
        car.classList.toggle('selected', carArr.includes(carNum));
        if (carArr.includes(carNum)) {
            car.classList.add(lineColorClass);
        }
    });
}

function processData(payload) {
    const line = payload.line;
    const data = payload.data;
    const origin = payload.origin;
    const destination = payload.destination;
    const exit = payload.exit;
    const direction = payload.direction;
    const settings = payload.settings;
    const configuration = payload.configuration;
    const results = payload.results;
    const resultsCar = payload.resultsCar;
    const resultsMsg = payload.resultsMsg;
    const svgContainer = payload.svgContainer;
    
    // Determine the terminals of the line based on direction
    const stationsData = data['stations'];
    const configValue = parseInt(configuration.value);
    const lineColorClass = line[0].id;
    
    const { priorityCar, highlightText } = settings;
    
    const carArr = calculateTrainCar(
        data, origin.value, destination.value, direction.value, priorityCar, configValue
    );

    const [message, carResult] = generateMessage(
        data, origin.value, destination.value, direction.value, exit.value, carArr, highlightText
    );
    
    const platformType = data['stations'][Number(origin.value)].platformType;
    
    loadTrainSVG(
        svgContainer, platformType, line, configValue, carArr
    );
    
    loadTerminals(
        stationsData, direction.value, platformType
    );
    
    resultsCar.innerHTML = carResult;
    resultsMsg.innerHTML = message;
    resultsMsg.classList.add(lineColorClass);
    results.hidden = false;
    
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

function getLabelColor(lineObj) {
    const label = lineObj[0].labels[0];
    const labelStyle = window.getComputedStyle(label);
    const backgroundColor = labelStyle.getPropertyValue('--line-color');
    const color = labelStyle.getPropertyValue('--line-text-color');
    return [backgroundColor, color];
}

function getTrainLineValue() {
    return document.querySelector('input[name="train-line"]:checked').value;
}

function saveCheckboxStates() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        localStorage.setItem(checkbox.id, checkbox.checked);
    });
}  

function loadCheckboxStates() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState !== null) {
            checkbox.checked = savedState === 'true';
        }
    });
}

document.addEventListener("DOMContentLoaded", (e) => {
    const lines = document.querySelectorAll('input[name="train-line"]');
    const origin = document.getElementById('origin-station');
    const destination = document.getElementById('destination-station');
    const direction = document.getElementById('direction');
    const exit = document.getElementById('station-exit');
    const priorityCar = document.getElementById('priority-car');
    const highlightText = document.getElementById('highlight-text');
    const configuration = document.getElementById('configuration');
    const submitBtn = document.getElementById('train-car-calculator-submit');
    const results = document.getElementById('train-car-results');
    const resultsCar = document.getElementById('train-car-number-result');
    const resultsMsg = document.getElementById('train-car-message-result');
    const svgContainer = document.getElementById('train-car-graphic-container');
    const modal = document.getElementsByClassName('changelog-modal')[0];
    const closeBtn = document.getElementById('modal-close')

    closeBtn.addEventListener('click', (event) => {
        if (!modal.hidden) {
            modal.hidden = true;
            document.documentElement.style.overflow = 'auto';
        }
    }); 
    
    function generate(getNewLineData) {
        const data = LineData[getTrainLineValue() || 0];
        const numberOfCarsData = data['numberOfCars'];
        const stationsData = data['stations'];
        const directionsData = data['directions'];
        if (getNewLineData) {
            // Update the list of origin and destination stations
            generateDropdownOptions(stationsData, [origin, destination])
            // Clear exit data
            exit.innerHTML = null;
            // Number of cars is fixed at 4 if the line only supports 4-car configuration
            configuration.disabled = numberOfCarsData.length === 1;
            if (numberOfCarsData.length === 1) {
                // Switch to the option matching the line's number of cars
                const defaultOption = configuration.querySelector(`[value='${numberOfCarsData[0].index}']`)
                configuration.selectedIndex = defaultOption.index;
            }
            // Enable priority car option permanently on LRT-2
            priorityCar.checked = data['line'].name === LineName.Line2.name;
            priorityCar.disabled = data['line'].name === LineName.Line2.name;
        }
        // NOTE: This must be declared here so that default stations are changed whenever the line changes
        const originInd = parseInt(origin.value);
        const destinationInd = parseInt(destination.value);
        // Update the train direction based on origin and destination
        updateDirectionValue(
            directionsData, originInd, destinationInd, direction
        )
        // Update whether to allow selecting multiple exits
        checkForStationExits(stationsData, destinationInd, direction.value)  
    }
    
    function validate() {
        const data = LineData[getTrainLineValue() || 0];
        const inputsValid = validateInputData(data);
        submitBtn.disabled = !inputsValid;
    }
    
    // Apply line theme to submit button
    function updateButtonTheme(lineObj) {
        const [backgroundColor, color] = getLabelColor(lineObj);
        submitBtn.style.backgroundColor = backgroundColor;
        submitBtn.style.color = color;
    }
    
    function getSelectedLine() {
        return [...lines].filter(line => line.checked);
    }
    
    function handleSubmit() {
        submitBtn.disabled = true;
        validate()
        if (!submitBtn.disabled) {
            const data = LineData[getTrainLineValue() || 0];
            const settings = {
                priorityCar: priorityCar.checked,
                highlightText: highlightText.checked
            }
            console.log(settings);
            const payload = {
                data, line: selectedLine, 
                origin, destination, exit, direction, 
                settings, configuration, 
                results, resultsCar, resultsMsg, svgContainer
            }
            processData(payload);
            
            // Send data to Google Analytics (completely anonymous)
            gtag('event', 'train_calculator_submit', {
                train_line: data.line.name,
                origin_station: data.stations[origin.value].name,
                destination_station: data.stations[destination.value].name,
                direction: direction.value,
                exit: exit.options[exit.selectedIndex]?.text || 'N/A',
                priority_car: settings.priorityCar ? 'yes' : 'no',
                highlight_text: settings.highlightText ? 'yes' : 'no',
                configuration: configuration.options[configuration.selectedIndex].text
            });
            
            submitBtn.disabled = false;
        }
    }
    
    generate(true);
    loadCheckboxStates()
    
    let selectedLine = getSelectedLine()
    updateButtonTheme(selectedLine);
    
    // Generate the dropdown options
    lines.forEach(line => {
        line.addEventListener('change', () => {
            generate(true);
            validate();
            results.hidden = true;
            selectedLine = getSelectedLine()
            updateButtonTheme(selectedLine);
        })
    });
    
    [origin, destination].forEach(select => {
        select.addEventListener('change', () => {
            generate(select === selectedLine);
        });
    });
    
    // Attach event listener to the checkboxes to save their states
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', saveCheckboxStates);
    });
    
    // Validate inputs
    [origin, destination, configuration].forEach(element => {
        element.addEventListener('change', validate);
    });
    
    
    // Handle button press
    submitBtn.addEventListener('click', handleSubmit);
    submitBtn.addEventListener('touchend', handleSubmit);
})

