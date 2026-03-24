import { Direction, DirectionMap, Ordinal, CarConfig, PlatformType, ExitType, Mode, LineName, LineData, TrainSVG } from "./train_data.js"

const ERROR_MSG_SAME_STATION = "Origin and destination station cannot be the same";
const ERROR_MSG_NORTH_END = "Origin station is the northern terminus";
const ERROR_MSG_SOUTH_END = "Origin station is the southern terminus";
const ERROR_MSG_EAST_END = "Origin station is the eastern terminus";
const ERROR_MSG_WEST_END = "Origin station is the western terminus";

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

function createRadioCards(availableExits, exitCards, lineId) {
    availableExits.forEach((exit, index) => {
        const radioId = `exit-${index}`
        const card = document.createElement('label');
        card.classList.add('card', lineId, 'btn', 'mb-2', 'form-check', 'cursor-pointer');
        card.setAttribute('for', radioId);

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'station-exit';
        radio.value = index;
        radio.setAttribute('id', radioId);
        radio.classList.add('form-check-input', 'btn-check', 'me-2');

        if (index === 0) radio.checked = true;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h6');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = exit.name;

        // const cardText = document.createElement('p');
        // cardText.classList.add('card-text');
        // cardText.textContent = "";

        cardBody.appendChild(cardTitle);
        // cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        exitCards.appendChild(radio);
        exitCards.appendChild(card);
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

function checkForStationExits(lineObj, stationsData, destinationInd, direction) {
    const directionText = DirectionMap[direction];
    // const exitDropdown = document.getElementById('station-exit-dropdown');
    const exitCards = document.getElementById('station-exit-radio-cards');
    const exitInput = document.getElementById('station-exit-input');
    // const stationExit = document.getElementById('station-exit');
    const destination = stationsData[destinationInd];
    const exitNames = destination['exits'] || []
    const carsPerExit = destination.exitMap[directionText] || [];

    // Map available exits per direction
    const availableExits = exitNames
        .map((name, i) => ({ name, cars: carsPerExit[i] }))
        .filter(exit => Array.isArray(exit.cars) && exit.cars.length > 0);

    // Populate options for station exits

    // if (availableExits.length > 0) {
    //     exitDropdown.hidden = false;
    //     stationExit.innerHTML = '';
    //
    //     availableExits.forEach((exit) => {
    //         const option = document.createElement('option');
    //         // Use the index from the unfiltered array
    //         option.value = exitNames.indexOf(exit.name);
    //         option.textContent = exit.name;
    //         stationExit.appendChild(option);
    //     });
    //     // Set default options
    //     stationExit.selectedIndex = '0';
    // } else {
    //     exitDropdown.hidden = true;
    // }
    
    if (availableExits.length > 0) {
        exitCards.hidden = false;
        Array.from(exitInput.children).forEach(child => {
            if (child.classList.contains('card')) {
                exitInput.removeChild(child);
            }
        });
        createRadioCards(availableExits, exitInput, lineObj[0].id)
    } else {
        exitCards.hidden = true;
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

function generateMessage(data, mode, originInd, destInd, directionText, exit, carArr, useHighlight) {
    const stationsData = data['stations'];
    
    const origin = stationsData[originInd].name;
    const destination = stationsData[destInd].name;
    const direction = directionText.toLowerCase();
    
    let carResult = '';
    let carText = '';
    let modeText = '';
    let exitText = '';

    modeText = mode === Mode.FurthestExit ? 'away from' : 'near'

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
    
    const message = `To arrive ${modeText} ${exitText} at ${useHighlight ? markText(destination) : destination},<wbr> board the ${useHighlight ? markText(carText) : carText} on the ${useHighlight ? markText(direction) : direction} platform at ${useHighlight ? markText(origin) : origin}.`;
    return [message, carResult];
}

function getTrainCarDiff(carArr, config) {
    const fullSet = config === CarConfig.ThreeCar ? [1, 2, 3] : [1, 2, 3, 4];
    const filteredArr = fullSet.filter(car => !carArr.includes(car));
    console.log(`Changed [${carArr}] to [${filteredArr}]`)
    return filteredArr;
}

function filterAllowedTrainCars(carArr, numToRemove, newNum, minNum, maxNum) {
    let updatedCars = [...new Set(
        carArr.map(num => num === numToRemove ? newNum : num)
    )];
    return updatedCars.filter(num => (num >= minNum && num <= maxNum));
}

function calculateTrainCar(data, mode, originInd, destInd, directionText, usePriorityCar, exitValue, configValue) {
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
    // const exit = document.getElementById('station-exit');
    // const exitValue = exit ? exit.value : 0;
    const isLRT2 = data['line'].name === LineName.Line2.name;

    carArr = carArr[exitValue];

    const modeName = Object.keys(Mode).find(key => Mode[key] === mode);
    
    console.log(`Line: ${data['line'].name}\nMode: ${modeName}\nOrigin: ${stationsData[originInd].name} (${originInd})\nDestination: ${stationsData[destInd].name} (${destInd})\nDirection: ${directionText.toLowerCase()}\nExit Number: ${exitValue}\nUse Priority Car: ${usePriorityCar}\nTrain Configuration: ${configuration.value}\nCar Result: [${carArr}]`);
    
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

function loadTrainSVG(svgContainer, mode, platformType, line, configValue, carArr, carArrDiff) {
    const isIsland = platformType === PlatformType.Island;
    const svgIndex = configValue === CarConfig.ThreeCar.index ? (isIsland ? 0 : 1) : (isIsland ? 2 : 3);
    
    svgContainer.innerHTML = TrainSVG[svgIndex];
    const lineColorClass = line[0].id;
    
    const svgCars = svgContainer.children[0];
    svgCars.querySelectorAll('.mc-car, .m-car').forEach(car => {
        const carNum = Number(car.id.replace('Car', ''));
        car.classList.toggle('selected', carArr.includes(carNum));
        if (mode === Mode.FurthestExit) {
            car.classList.toggle('diff');
            car.classList.add(lineColorClass);
        } else if (carArr.includes(carNum)) {
            car.classList.add(lineColorClass);
        }
    });
}

function processData(payload) {
    const line = payload.line;
    const data = payload.data;
    const mode = payload.mode;
    const origin = payload.origin;
    const destination = payload.destination;
    const exitValue = payload.exitValue;
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
        data, mode, origin.value, destination.value, direction.value, priorityCar, exitValue, configValue
    );
    const carArrDiff = mode === Mode.FurthestExit ? getTrainCarDiff(carArr, configValue) : null;

    const [message, carResult] = generateMessage(
        data, mode, origin.value, destination.value, direction.value, exitValue, carArrDiff || carArr, highlightText
    );
    
    const platformType = data['stations'][Number(origin.value)].platformType;

    loadTrainSVG(
        svgContainer, mode, platformType, line, configValue, carArr, carArrDiff
    );
    
    loadTerminals(
        stationsData, direction.value, platformType
    );
    
    resultsCar.innerHTML = carResult;
    resultsMsg.innerHTML = message;
    resultsMsg.classList.add(lineColorClass);

    if (!results.classList.contains('show'))
        results.classList.toggle('show');
    
    // Move to bottom of page
    setTimeout(() => {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight - window.innerHeight - 125,
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

function getTrainModeValue() {
    return document.querySelector('input[name="train-mode"]:checked').value;
}

function getStationExitValue() {
    const exit = document.querySelector('input[name="station-exit"]:checked');
    return exit ? exit.value : 0;
}

function saveCheckboxStates() {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        localStorage.setItem(checkbox.id, checkbox.checked);
    });
}  

function toggleChangelogModal(modal) {
    modal.classList.toggle('show');
    const isOpen = modal.classList.contains('show');
    document.documentElement.style.overflow = isOpen ? 'hidden' : 'auto';
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
    const modes = document.querySelectorAll('input[name="train-mode"]');
    const origin = document.getElementById('origin-station');
    const destination = document.getElementById('destination-station');
    const direction = document.getElementById('direction');
    const exitInput = document.getElementById('station-exit-input');
    // const exit = document.getElementById('station-exit');
    const priorityCar = document.getElementById('priority-car');
    const highlightText = document.getElementById('highlight-text');
    const configuration = document.getElementById('configuration');
    const submitBtn = document.getElementById('train-car-calculator-submit');
    const results = document.getElementById('train-car-results');
    const resultsCar = document.getElementById('train-car-number-result');
    const resultsMsg = document.getElementById('train-car-message-result');
    const svgContainer = document.getElementById('train-car-graphic-container');
    const modal = document.getElementsByClassName('changelog-modal')[0];
    const openChangelogBtn = document.getElementById('toggle-train-car-calculator-changelog');
    const closeChangelogBtn = document.getElementById('modal-close')

    openChangelogBtn.addEventListener('click', () => toggleChangelogModal(modal)); 
    closeChangelogBtn.addEventListener('click', () => toggleChangelogModal(modal));
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) toggleChangelogModal(modal);
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
            // exit.innerHTML = null;
            exitInput.innerHTML = null;
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
        checkForStationExits(getSelected(lines), stationsData, destinationInd, direction.value)  
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
    
    function getSelected(objs) {
        return [...objs].filter(obj => obj.checked);
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
            const mode = getTrainModeValue();
            const exitValue = getStationExitValue();
            const payload = {
                data, mode, line: selectedLine,
                origin, destination, exitValue, direction, 
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
                exit: exitValue || 'N/A',
                priority_car: settings.priorityCar ? 'yes' : 'no',
                highlight_text: settings.highlightText ? 'yes' : 'no',
                configuration: configuration.options[configuration.selectedIndex].text
            });
            
            submitBtn.disabled = false;
        }
    }
    
    generate(true);
    loadCheckboxStates()
    
    let selectedLine = getSelected(lines)
    updateButtonTheme(selectedLine);
    
    // Generate the dropdown options
    lines.forEach(line => {
        line.addEventListener('change', () => {
            generate(true);
            validate();
            if (results.classList.contains('show'))
                results.classList.remove('show');
            selectedLine = getSelected(lines)
            updateButtonTheme(selectedLine);
        })
    });
    
    [origin, destination].forEach(select => {
        select.addEventListener('change', () => {
            generate(select === selectedLine);
            if (results.classList.contains('show'))
                results.classList.remove('show');
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

