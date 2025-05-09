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

const LineData = [
    {   
        "name": "LRT-1",
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
    {
        "name": "LRT-2",
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
    {
        "name": "MRT-3",
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
]

const TrainSVG = [
    `<svg id="NB_WB_3-Car" data-name="3-Car NB/WB Train" xmlns="http://www.w3.org/2000/svg" width="900" height="150" viewBox="150 0 900 150">
        <path id="Car1" class="mc-car" d="M220,17H443a4,4,0,0,1,4,4V131a4,4,0,0,1-4,4H161a4,4,0,0,1-4-4l1-32c0.064-21.5,22.217-72.847,33-78C199.412,16.981,220,17,220,17Z"/>
        <rect id="Car2" class="m-car" x="455" y="17" width="290" height="118" rx="4" ry="4"/>
        <rect id="Car3" class="m-car" x="753" y="17" width="290" height="118" rx="4" ry="4"/>
        <text id="_1" data-name="1" class="car-number" x="304.787" y="110.112"><tspan x="304.787">1</tspan></text>
        <text id="_2" data-name="2" class="car-number" x="600.787" y="110.112"><tspan x="600.787">2</tspan></text>
        <text id="_3" data-name="3" class="car-number" x="897.787" y="110.112"><tspan x="897.787">3</tspan></text>
    </svg>
    `,
    `<svg id="SB_EB_3-Car" data-name="3-Car SB/EB Train" xmlns="http://www.w3.org/2000/svg" width="900" height="150" viewBox="150 0 900 150">
        <path id="Car1" class="mc-car" d="M980,17.031H757a4,4,0,0,0-4,4V131a4,4,0,0,0,4,4h282a4,4,0,0,0,4-4l-1-31.992c-0.06-21.494-22.22-72.828-33-77.979C1000.59,17.012,980,17.031,980,17.031Z"/>
        <rect id="Car2" class="m-car" x="455" y="17.031" width="290" height="117.969" rx="4" ry="4"/>
        <rect id="Car3" class="m-car" x="157" y="17.031" width="290" height="117.969" rx="4" ry="4"/>
        <text id="_3" data-name="3" class="car-number" x="304.787" y="110.112"><tspan x="304.787">3</tspan></text>
        <text id="_2" data-name="2" class="car-number" x="600.787" y="110.112"><tspan x="600.787">2</tspan></text>
        <text id="_1" data-name="1" class="car-number" x="897.787" y="110.112"><tspan x="897.787">1</tspan></text>
    </svg>
    `,
    `<svg id="train-car-graphic" data-name="4-Car NB/WB Train" xmlns="http://www.w3.org/2000/svg" width="1200" height="150" viewBox="0 0 1200 150">
        <path id="Car1" class="mc-car" d="M71,17H294a4,4,0,0,1,4,4V131a4,4,0,0,1-4,4H12a4,4,0,0,1-4-4L9,99C9.064,77.5,31.217,26.153,42,21,50.412,16.981,71,17,71,17Z"/>
        <rect id="Car2" class="m-car" x="306" y="17" width="290" height="118" rx="4" ry="4"/>
        <rect id="Car3" class="m-car" x="604" y="17" width="290" height="118" rx="4" ry="4"/>
        <rect id="Car4" class="m-car" x="902" y="17" width="290" height="118" rx="4" ry="4"/>
        <text id="_1" data-name="1" class="car-number" x="155.788" y="110.112"><tspan x="155.788">1</tspan></text>
        <text id="_2" data-name="2" class="car-number" x="451.787" y="110.112"><tspan x="451.787">2</tspan></text>
        <text id="_3" data-name="3" class="car-number" x="748.787" y="110.112"><tspan x="748.787">3</tspan></text>
        <text id="_4" data-name="4" class="car-number" x="1046.788" y="110.112"><tspan x="1046.788">4</tspan></text>
    </svg>
    `,
    `<svg id="SB_EB_4-Car" data-name="4-Car SB/EB Train" xmlns="http://www.w3.org/2000/svg" width="1200" height="150" viewBox="0 0 1200 150">
        <path id="Car1" class="mc-car" d="M1129,17H906a4,4,0,0,0-4,4V131a4,4,0,0,0,4,4h282a4,4,0,0,0,4-4l-1-32c-0.06-21.5-22.22-72.847-33-78C1149.59,16.981,1129,17,1129,17Z"/>
        <rect id="Car2" class="m-car" x="604" y="17" width="290" height="118" rx="4" ry="4"/>
        <rect id="Car3" class="m-car" x="306" y="17" width="290" height="118" rx="4" ry="4"/>
        <rect id="Car4" class="m-car" x="8" y="17" width="290" height="118" rx="4" ry="4"/>
        <text id="_4" data-name="4" class="car-number" x="155.788" y="110.112"><tspan x="155.788">4</tspan></text>
        <text id="_3" data-name="3" class="car-number" x="451.787" y="110.112"><tspan x="451.787">3</tspan></text>
        <text id="_2" data-name="2" class="car-number" x="748.787" y="110.112"><tspan x="748.787">2</tspan></text>
        <text id="_1" data-name="1" class="car-number" x="1046.788" y="110.112"><tspan x="1046.788">1</tspan></text>
    </svg>
    `
]

export { Direction, DirectionMap, Ordinal, LineData, TrainSVG }