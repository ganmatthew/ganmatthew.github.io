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
    Northbound: 'north', 
    Southbound: 'south', 
    Eastbound: 'east', 
    Westbound: 'west', 
}

const Ordinal = {
    1: 'first',
    2: 'second',
    3: 'third',
    4: 'fourth'
}

const CarConfig = {
    ThreeCar: { index: 3, name: '3-car' },
    FourCar: { index: 4, name: '4-car' }
}

const LineName = {
    Line1: { index: 0, name: 'LRT-1' },
    Line2: { index: 1, name: 'LRT-2' },
    Line3: { index: 2, name: 'MRT-3' }
}

const PlatformType = {
    Island: "Island",
    Side: "Side" 
}

const ExitType = {
	Concourse: "concourse",
	Elevator: "elevator",
	Escalator: "escalator",
	Stairs: "stairs"
}

const ThemeMap = {
  Line1: "lrt1",
  Line2: "lrt2",
  Line3: "mrt3"
}

const Mode = {
	NearestExit: "0",
	FurthestExit: "1"
}

const LineData = [
    {
        line: LineName.Line1,
        numberOfCars: [CarConfig.FourCar],
        directions: [Direction.NB, Direction.SB],
        stations: [
            { name: 'Fernando Poe Jr', platformType: PlatformType.Side },
            { name: 'Balintawak', platformType: PlatformType.Side },
            { name: 'Monumento', platformType: PlatformType.Side },
            { name: '5th Avenue', platformType: PlatformType.Side },
            { name: 'R. Papa', platformType: PlatformType.Side },
            { name: 'Abad Santos', platformType: PlatformType.Side },
            { name: 'Blumentritt', platformType: PlatformType.Side },
            { name: 'Tayuman', platformType: PlatformType.Side },
            { name: 'Bambang', platformType: PlatformType.Side },
            { name: 'Doroteo Jose', platformType: PlatformType.Side },
            { name: 'Carriedo', platformType: PlatformType.Side },
            { name: 'Central Terminal', platformType: PlatformType.Side },
            { name: 'United Nations', platformType: PlatformType.Side },
            { name: 'Pedro Gil', platformType: PlatformType.Side },
            { name: 'Quirino', platformType: PlatformType.Side },
            { name: 'Vito Cruz', platformType: PlatformType.Side },
            { name: 'Gil Puyat', platformType: PlatformType.Side },
            { name: 'Libertad', platformType: PlatformType.Side },
            { name: 'EDSA', platformType: PlatformType.Side },
            { name: 'Baclaran', platformType: PlatformType.Side },
            { name: 'Redemptorist-Aseana', platformType: PlatformType.Side },
            { name: 'MIA Road', platformType: PlatformType.Side },
            { name: 'PITX', platformType: PlatformType.Side },
            { name: 'Ninoy Aquino Avenue', platformType: PlatformType.Side },
            { name: 'Dr. Santos', platformType: PlatformType.Side }
        ]
    },

    {
        line: LineName.Line2,
        numberOfCars: [CarConfig.FourCar],
        directions: [Direction.WB, Direction.EB],
        stations: [
            { name: 'Recto', platformType: PlatformType.Side },
            { name: 'Legarda', platformType: PlatformType.Side },
            { name: 'Pureza', platformType: PlatformType.Side },
            { name: 'V. Mapa', platformType: PlatformType.Side },
            { name: 'J. Ruiz', platformType: PlatformType.Side },
            { name: 'Gilmore', platformType: PlatformType.Side },
            { name: 'Betty Go-Belmonte', platformType: PlatformType.Side },
            { name: 'Araneta Center-Cubao', platformType: PlatformType.Side },
            { name: 'Anonas', platformType: PlatformType.Side },
            { name: 'Katipunan', platformType: PlatformType.Side },
            { name: 'Santolan', platformType: PlatformType.Island },
            { name: 'Marikina-Pasig', platformType: PlatformType.Side },
            { name: 'Antipolo', platformType: PlatformType.Side }
        ]
    },

    {
        line: LineName.Line3,
        numberOfCars: [CarConfig.ThreeCar, CarConfig.FourCar],
        directions: [Direction.NB, Direction.SB],
        stations: [
            { name: 'North Avenue', platformType: PlatformType.Side },
            { name: 'Quezon Avenue', platformType: PlatformType.Side },
            { name: 'GMA-Kamuning', platformType: PlatformType.Side },
            { name: 'Araneta Center-Cubao', platformType: PlatformType.Side },
            { name: 'Santolan-Annapolis', platformType: PlatformType.Side },
            { name: 'Ortigas', platformType: PlatformType.Side },
            { name: 'Shaw Boulevard', platformType: PlatformType.Island },
            { name: 'Boni', platformType: PlatformType.Island },
            { name: 'Guadalupe', platformType: PlatformType.Side },
            { name: 'Buendia', platformType: PlatformType.Island },
            { name: 'Ayala', platformType: PlatformType.Side },
            { name: 'Magallanes', platformType: PlatformType.Side },
            { name: 'Taft Avenue', platformType: PlatformType.Island }
        ]
    }
]

/**
 * Array of train SVG. The contents are as follows:
 * - 0: 3-Car NB/WB Train
 * - 1: 3-Car SB/EB Train
 * - 2: 4-Car NB/WB Train
 * - 3: 4-Car SB/EB Train
 */
const TrainSVG = [
    `<svg id="train-car-graphic" data-name="3-Car NB/WB Train" xmlns="http://www.w3.org/2000/svg" width="900" height="90" viewBox="150 0 900 150">
        <path id="Car1" class="mc-car" d="M220,17H443a4,4,0,0,1,4,4V131a4,4,0,0,1-4,4H161a4,4,0,0,1-4-4l1-32c0.064-21.5,22.217-72.847,33-78C199.412,16.981,220,17,220,17Z"/>
        <rect id="Car2" class="m-car" x="455" y="17" width="290" height="118" rx="4" ry="4"/>
        <rect id="Car3" class="m-car" x="753" y="17" width="290" height="118" rx="4" ry="4"/>
        <text id="_1" data-name="1" class="car-number" x="304.787" y="110.112"><tspan x="304.787">1</tspan></text>
        <text id="_2" data-name="2" class="car-number" x="600.787" y="110.112"><tspan x="600.787">2</tspan></text>
        <text id="_3" data-name="3" class="car-number" x="897.787" y="110.112"><tspan x="897.787">3</tspan></text>
    </svg>
    `,
    `<svg id="train-car-graphic" data-name="3-Car SB/EB Train" xmlns="http://www.w3.org/2000/svg" width="900" height="90" viewBox="150 0 900 150">
        <path id="Car1" class="mc-car" d="M980,17.031H757a4,4,0,0,0-4,4V131a4,4,0,0,0,4,4h282a4,4,0,0,0,4-4l-1-31.992c-0.06-21.494-22.22-72.828-33-77.979C1000.59,17.012,980,17.031,980,17.031Z"/>
        <rect id="Car2" class="m-car" x="455" y="17.031" width="290" height="117.969" rx="4" ry="4"/>
        <rect id="Car3" class="m-car" x="157" y="17.031" width="290" height="117.969" rx="4" ry="4"/>
        <text id="_3" data-name="3" class="car-number" x="304.787" y="110.112"><tspan x="304.787">3</tspan></text>
        <text id="_2" data-name="2" class="car-number" x="600.787" y="110.112"><tspan x="600.787">2</tspan></text>
        <text id="_1" data-name="1" class="car-number" x="897.787" y="110.112"><tspan x="897.787">1</tspan></text>
    </svg>
    `,
    `<svg id="train-car-graphic" data-name="4-Car NB/WB Train" xmlns="http://www.w3.org/2000/svg" width="1200" height="90" viewBox="0 0 1200 150">
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
    `<svg id="train-car-graphic" data-name="4-Car SB/EB Train" xmlns="http://www.w3.org/2000/svg" width="1200" height="90" viewBox="0 0 1200 150">
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

export { Direction, DirectionMap, Ordinal, CarConfig, PlatformType, ExitType, Mode, LineName, LineData, TrainSVG, ThemeMap }