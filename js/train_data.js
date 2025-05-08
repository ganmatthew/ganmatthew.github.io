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

const LineData = {
    "LRT-1": {
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
    },
    "LRT-2": {
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
    },
    "MRT-3": {
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
}

export { Direction, DirectionMap, Ordinal, LineData }