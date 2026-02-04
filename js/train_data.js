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

const LineData = [
    {   
        "line": LineName.Line1,
        "numberOfCars": [CarConfig.FourCar],
        "directions": [Direction.NB, Direction.SB],
        "stations": [
          {
            "name": "Fernando Poe Jr",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  1,
                  2,
                  3
                ]
              ],
              "south": [
                []
              ]
            }
          },
          {
            "name": "Balintawak",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  1,
                  2,
                  3
                ]
              ],
              "south": [
                [
                  1,
                  2,
                  3
                ]
              ]
            }
          },
          {
            "name": "Monumento",
            "platformType": "Side",
            "exits": [
              "E1: First North Luzon Transit",
              "E2/E3: SM City Grand Central / LRT Caloocan Mall / North Mall",
              "E4: Jackman Plaza Caloocan"
            ],
            "exitMap": {
              "north": [
                [],
                [
                  2
                ],
                [
                  4
                ]
              ],
              "south": [
                [
                  3
                ],
                [],
                []
              ]
            }
          },
          {
            "name": "5th Avenue",
            "platformType": "Side",
            "exits": [
              "E1: Japan Parts / Palawan Express",
              "E2: Mercury Drug / TGP",
              "E3: Security Bank / Powertrac",
              "E4: Jollibee / 7-Eleven"
            ],
            "exitMap": {
              "north": [
                [],
                [],
                [
                  1
                ],
                [
                  4
                ]
              ],
              "south": [
                [
                  4
                ],
                [
                  1
                ],
                [],
                []
              ]
            }
          },
          {
            "name": "R. Papa",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  2
                ]
              ],
              "south": [
                [
                  4
                ]
              ]
            }
          },
          {
            "name": "Abad Santos",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  1
                ]
              ],
              "south": [
                [
                  4
                ]
              ]
            }
          },
          {
            "name": "Blumentritt",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  3
                ]
              ],
              "south": [
                [
                  2
                ]
              ]
            }
          },
          {
            "name": "Tayuman",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  2,
                  3
                ]
              ],
              "south": [
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Bambang",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  3,
                  4
                ]
              ],
              "south": [
                [
                  2,
                  3
                ]
              ]
            }
          },
          {
            "name": "Doroteo Jose",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  2
                ]
              ],
              "south": [
                [
                  3
                ]
              ]
            }
          },
          {
            "name": "Carriedo",
            "platformType": "Side",
            "exits": [
              "E1: Plaza Sta. Cruz / Good Earth Plaza / Parkson Square",
              "E4: Plaza Lacson / Isetann / SM Quiapo / FEATI"
            ],
            "exitMap": {
              "north": [
                [
                  1
                ],
                [
                  4
                ]
              ],
              "south": [
                [
                  4
                ],
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Central Terminal",
            "platformType": "Side",
            "exits": [
              "E1: Manila City Hall / Intramuros / Manila Hall of Justice",
              "E2: Park N' Ride / Metropolitan Theater",
              "E3: Manila City Hall / Universidad de Manila",
              "E4: DepEd SDO Manila / Arroceros Park",
              "E5: Manila City Hall / Manila Regional Trial Court"
            ],
            "exitMap": {
              "north": [
                [],
                [],
                [],
                [
                  2
                ],
                [
                  3
                ]
              ],
              "south": [
                [
                  4
                ],
                [
                  3
                ],
                [
                  2
                ],
                [],
                []
              ]
            }
          },
          {
            "name": "United Nations",
            "platformType": "Side",
            "exits": [
              "E1: Times Plaza / Rizal Park / National Museum of Natural History",
              "E2: World Health Organization / National Bureau of Investigation",
              "E3: Araullo High School / Metropolitan Trial Court",
              "E4: Manila Medical Center / Plaza Rueda"
            ],
            "exitMap": {
              "north": [
                [],
                [],
                [
                  1
                ],
                [
                  4
                ]
              ],
              "south": [
                [
                  4
                ],
                [
                  1
                ],
                [],
                []
              ]
            }
          },
          {
            "name": "Pedro Gil",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  3
                ]
              ],
              "south": [
                [
                  2
                ]
              ]
            }
          },
          {
            "name": "Quirino",
            "platformType": "Side",
            "exits": [
              "E1: Marc 2000 Tower / OWWA / Remedios Circle",
              "E2: Fidel Reyes Street / Leveriza Street",
              "E3: Harvard Suites / Mercury Drug",
              "E4: Jollibee / McDonald's / Embassy of the Holy See"
            ],
            "exitMap": {
              "north": [
                [
                  1
                ],
                [
                  4
                ],
                [],
                []
              ],
              "south": [
                [],
                [],
                [
                  4
                ],
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Vito Cruz",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  3
                ]
              ],
              "south": [
                [
                  2
                ]
              ]
            }
          },
          {
            "name": "Gil Puyat",
            "platformType": "Side",
            "exits": [
              "E1: DLTBCo / BBL Trans / JAC Liner",
              "E2: Hotel Sogo / ALPS",
              "E3: Otex / TGP / Mercury Drug"
            ],
            "exitMap": {
              "north": [
                [
                  1
                ],
                [
                  4
                ],
                [],
                []
              ],
              "south": [
                [],
                [],
                [
                  3
                ],
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Libertad",
            "platformType": "Side",
            "exits": [
              "E1: Cartimar Shopping Center",
              "E2: Victory Pasay Mall / Pasay City Wet Market",
              "E3: Iglesia Filipina Independiente",
              "E4: Welcome Plaza / Puregold Libertad"
            ],
            "exitMap": {
              "north": [
                [],
                [],
                [
                  1
                ],
                [
                  4
                ]
              ],
              "south": [
                [
                  4
                ],
                [
                  1
                ],
                [],
                []
              ]
            }
          },
          {
            "name": "EDSA",
            "platformType": "Side",
            "exits": [
              "E1: Pasay Rotonda Jeepney Terminal / 7-Eleven",
              "E2: Pasay Rotonda Jeepney Terminal / Lawson",
              "E3: LRT-MRT Footbridge / EDSA Carousel Taft Avenue",
              "E4: Metro Point Mall / MRT-3 Taft Avenue"
            ],
            "exitMap": {
              "north": [
                [],
                [
                  1
                ],
                [],
                [
                  4
                ]
              ],
              "south": [
                [
                  4
                ],
                [],
                [
                  1
                ],
                []
              ]
            }
          },
          {
            "name": "Baclaran",
            "platformType": "Side",
            "exits": [
              "E1: Baclaran Terminal Plaza 2",
              "E2: Baclaran Terminal Plaza 1 / Baclaran Church",
              "E3: Sunnyline Shopping Center",
              "E4: New Galleria Baclaran Mall / MyMall"
            ],
            "exitMap": {
              "north": [
                [],
                [],
                [
                  2,
                  3
                ],
                [
                  2,
                  3
                ]
              ],
              "south": [
                [
                  2
                ],
                [
                  3
                ],
                [],
                []
              ]
            }
          },
          {
            "name": "Redemptorist-Aseana",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  1,
                  4
                ]
              ],
              "south": [
                [
                  1,
                  4
                ]
              ]
            }
          },
          {
            "name": "MIA Road",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  1,
                  4
                ]
              ],
              "south": [
                [
                  1,
                  4
                ]
              ]
            }
          },
          {
            "name": "PITX",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  2
                ]
              ],
              "south": [
                [
                  4
                ]
              ]
            }
          },
          {
            "name": "Ninoy Aquino Avenue",
            "platformType": "Side",
            "exits": [
              "E1: PUP Parañaque / Puregold Parañaque / S&R Parañaque",
              "E2: PHLPost Parañaque / Duty Free Fiestamall / NAIA Terminal 1"
            ],
            "exitMap": {
              "north": [
                [
                  1
                ],
                [
                  4
                ]
              ],
              "south": [
                [
                  4
                ],
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Dr. Santos",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                []
              ],
              "south": [
                [
                  3,
                  4
                ]
              ]
            }
          }
        ]
    },
    {
        "line": LineName.Line2,
        "numberOfCars": [CarConfig.FourCar],
        "directions": [ Direction.WB, Direction.EB],
        "stations": [
          {
            "name": "Recto",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  3,
                  4
                ]
              ],
              "east": [
                []
              ]
            }
          },
          {
            "name": "Legarda",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  2
                ]
              ],
              "east": [
                [
                  1,
                  3,
                  4
                ]
              ]
            }
          },
          {
            "name": "Pureza",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  2,
                  4
                ]
              ],
              "east": [
                [
                  1,
                  3,
                  4
                ]
              ]
            }
          },
          {
            "name": "V. Mapa",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  2,
                  4
                ]
              ],
              "east": [
                [
                  1,
                  3,
                  4
                ]
              ]
            }
          },
          {
            "name": "J. Ruiz",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  3,
                  4
                ]
              ],
              "east": [
                [
                  1,
                  2,
                  4
                ]
              ]
            }
          },
          {
            "name": "Gilmore",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  3,
                  4
                ]
              ],
              "east": [
                [
                  1,
                  3,
                  4
                ]
              ]
            }
          },
          {
            "name": "Betty Go-Belmonte",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  3,
                  4
                ]
              ],
              "east": [
                [
                  1,
                  2,
                  4
                ]
              ]
            }
          },
          {
            "name": "Araneta Center-Cubao",
            "platformType": "Side",
            "exits": [
              "Diamond Arcade / Gateway Mall 1",
              "Gateway Mall 1"
            ],
            "exitMap": {
              "west": [
                [
                  1,
                  2
                ],
                [
                  3,
                  4
                ]
              ],
              "east": [
                [
                  3,
                  4
                ],
                [
                  1,
                  2
                ]
              ]
            }
          },
          {
            "name": "Anonas",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  2,
                  4
                ]
              ],
              "east": [
                [
                  1,
                  3,
                  4
                ]
              ]
            }
          },
          {
            "name": "Katipunan",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  3,
                  4
                ]
              ],
              "east": [
                [
                  1,
                  3,
                  4
                ]
              ]
            }
          },
          {
            "name": "Santolan",
            "platformType": "Island",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  2,
                  3,
                  4
                ]
              ],
              "east": [
                [
                  1,
                  2,
                  3,
                  4
                ]
              ]
            }
          },
          {
            "name": "Marikina-Pasig",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                [
                  1,
                  3
                ]
              ],
              "east": [
                [
                  2,
                  4
                ]
              ]
            }
          },
          {
            "name": "Antipolo",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "west": [
                []
              ],
              "east": [
                [
                  1,
                  2,
                  4
                ]
              ]
            }
          }
        ]
    },
    {
        "line": LineName.Line3,
        "numberOfCars": [CarConfig.ThreeCar, CarConfig.FourCar],
        "directions": [Direction.NB, Direction.SB],
        "stations": [
          {
            "name": "North Avenue",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  3
                ]
              ],
              "south": [
                []
              ]
            }
          },
          {
            "name": "Quezon Avenue",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  1
                ]
              ],
              "south": [
                [
                  4
                ]
              ]
            }
          },
          {
            "name": "GMA-Kamuning",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  3
                ]
              ],
              "south": [
                [
                  2
                ]
              ]
            }
          },
          {
            "name": "Araneta Center-Cubao",
            "platformType": "Side",
            "exits": [
              "Farmers Plaza North",
              "Farmers Plaza North",
              "Farmers Plaza South / Farmers Market / Arayat Market",
              "Farmers Plaza South / Farmers Market / Arayat Market"
            ],
            "exitMap": {
              "north": [
                [
                  2
                ],
                [
                  1
                ],
                [
                  3
                ],
                [
                  4
                ]
              ],
              "south": [
                [
                  3
                ],
                [
                  4
                ],
                [
                  2
                ],
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Santolan-Annapolis",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  4
                ]
              ],
              "south": [
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Ortigas",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  3
                ]
              ],
              "south": [
                [
                  2
                ]
              ]
            }
          },
          {
            "name": "Shaw Boulevard",
            "platformType": "Island",
            "exits": [
              "Shangri-La Plaza / Starmall EDSA",
              "EDSA Central / Greenfield District"
            ],
            "exitMap": {
              "north": [
                [
                  1,
                  2
                ],
                [
                  3,
                  4
                ]
              ],
              "south": [
                [
                  3,
                  4
                ],
                [
                  1,
                  2
                ]
              ]
            }
          },
          {
            "name": "Boni",
            "platformType": "Island",
            "exits": [
              "GA Tower / SM Light",
              "Pinatubo St / Pioneer Woodlands"
            ],
            "exitMap": {
              "north": [
                [
                  1,
                  2
                ],
                [
                  3,
                  4
                ]
              ],
              "south": [
                [
                  2,
                  3
                ],
                [
                  1,
                  2
                ]
              ]
            }
          },
          {
            "name": "Guadalupe",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  4
                ]
              ],
              "south": [
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Buendia",
            "platformType": "Island",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  1
                ]
              ],
              "south": [
                [
                  4
                ]
              ]
            }
          },
          {
            "name": "Ayala",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  1,
                  2,
                  3
                ]
              ],
              "south": [
                [
                  1,
                  2,
                  3
                ]
              ]
            }
          },
          {
            "name": "Magallanes",
            "platformType": "Side",
            "exits": [],
            "exitMap": {
              "north": [
                [
                  4
                ]
              ],
              "south": [
                [
                  1
                ]
              ]
            }
          },
          {
            "name": "Taft Avenue",
            "platformType": "Island",
            "exits": [],
            "exitMap": {
              "north": [
                []
              ],
              "south": [
                [
                  1,
                  2
                ]
              ]
            }
          }
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

export { Direction, DirectionMap, Ordinal, CarConfig, PlatformType, ExitType, LineName, LineData, TrainSVG }