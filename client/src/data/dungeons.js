/*
*
* Note: Need to add color dungeon data
*
* id {Int}: Numeric identifier, matches literal dungeon number
* genericName {String}: Data safe name, matches overall object name including image names
* fancyName {String}: Display name
* chestCount {Int}: Literal count of chests within dungeon
* requirements {Object}: Contains Arrays of Objects defining the `any` required and `all` requirements for certain levels of access
*     -> minimum: Requirements for access to a single chest
*     -> accessible: Requirements for access to all chests
*     -> clearable: Requirements to access instrument
*     -> finished: Superfluous self requirement
*
*/

export let requirements = [
    {
        id: 1,
        genericName: 'dungeon_1',
        fancyName: 'Tail Cave',
        chestCount: 8,
        requirements: {
            minimum: false,
            accessible: [
                {
                    all: ['bomb', 'shield', 'rocs_feather'],
                    any: [
                        'sword',
                        'bow',
                        'hookshot',
                        'magic_rod',
                        'magic_powder',
                    ],
                },
            ],
            clearable: [
                {
                    all: ['sword'],
                    any: false,
                },
            ],
            finished: [
                {
                    all: ['dungeon_1'],
                    any: false,
                },
            ],
        },
    },
    {
        id: 2,
        genericName: 'dungeon_2',
        fancyName: 'Bottle Grotto',
        chestCount: 10,
        requirements: {
            minimum: [
                {
                    all: false,
                    any: ['sword', 'bomb', 'bow', 'magic_rod', 'hookshot'],
                },
            ],
            accessible: [
                {
                    all: ['power_bracelet', 'rocs_feather'],
                    any: ['sword', 'bomb', 'bow', 'hookshot', 'magic_rod'],
                },
            ],
            clearable: [
                {
                    all: false,
                    any: ['sword', 'magic_rod'],
                },
            ],
            finished: [
                {
                    all: ['dungeon_2'],
                    any: false,
                },
            ],
        },
    },
    {
        id: 3,
        genericName: 'dungeon_3',
        fancyName: 'Key Cavern',
        chestCount: 10,
        requirements: {
            minimum: false,
            accessible: [
                {
                    all: ['rocs_feather', 'pegasus_boots'],
                    any: ['sword', 'bomb', 'bow', 'hookshot', 'magic_rod'],
                },
            ],
            clearable: [
                {
                    all: false,
                    any: ['sword', 'firerod'],
                },
            ],
            finished: [
                {
                    all: ['dungeon_3'],
                    any: false,
                },
            ],
        },
    },
    {
        id: 4,
        genericName: 'dungeon_4',
        fancyName: "Angler's Tunnel",
        chestCount: 12,
        requirements: {
            minimum: false,
            accessible: [
                {
                    all: ['rocs_feather', 'pegasus_boots', 'bomb', 'shield'],
                    any: ['sword', 'bow'],
                },
            ],
            clearable: [
                {
                    all: ['zoras_flippers'],
                    any: ['sword', 'bow', 'magic_rod'],
                },
            ],
            finished: [
                {
                    all: ['dungeon_4'],
                    any: false,
                },
            ],
        },
    },
    {
        id: 5,
        genericName: 'dungeon_5',
        fancyName: "Catfish's Maw",
        chestCount: 10,
        requirements: {
            minimum: [
                {
                    all: ['hookshot'],
                    any: false,
                },
                {
                    all: false,
                    any: [
                        'sword',
                        'bomb',
                        'bow',
                        'magic_rod',
                        'magic_powder',
                        'hookshot',
                    ],
                },
            ],
            accessible: [
                {
                    all: [
                        'sword',
                        'hookshot',
                        'bomb',
                        'power_bracelet',
                        'zoras_flippers',
                    ],
                    any: ['bow', 'magic_rod', 'magic_powder'],
                },
            ],
            clearable: [
                {
                    all: false,
                    any: false,
                },
            ],
            finished: [
                {
                    all: ['dungeon_5'],
                    any: false,
                },
            ],
        },
    },
    {
        id: 6,
        genericName: 'dungeon_6',
        fancyName: 'Face Shrine',
        chestCount: 12,
        requirements: {
            minimum: [
                {
                    all: false,
                    any: [
                        'power_bracelet_l2',
                        'magic_rod',
                        'hookshot',
                        'sword',
                        'bomb',
                        'bow',
                    ],
                },
            ],
            accessible: [
                {
                    all: [
                        'power_bracelet_l2',
                        'pegasus_boots',
                        'rocs_feather',
                        'hookshot',
                        'bomb',
                    ],
                    any: ['magic_rod', 'bow'],
                },
            ],
            clearable: [
                {
                    all: false,
                    any: false,
                },
            ],
            finished: [
                {
                    all: ['dungeon_6'],
                    any: false,
                },
            ],
        },
    },
    {
        id: 7,
        genericName: 'dungeon_7',
        fancyName: "Eagle's Tower",
        chestCount: 9,
        requirements: {
            minimum: [
                {
                    all: false,
                    any: ['sword', 'bomb', 'bow', 'magic_rod', 'hookshot'],
                },
            ],
            accessible: [
                {
                    all: ['hookshot', 'bomb'],
                    any: ['power_bracelet', 'power_bracelet_l2'],
                },
            ],
            clearable: [
                {
                    all: false,
                    any: false,
                },
            ],
            finished: [
                {
                    all: ['dungeon_7'],
                    any: false,
                },
            ],
        },
    },
    {
        id: 8,
        genericName: 'dungeon_8',
        fancyName: 'Turtle Rock',
        chestCount: 13,
        requirements: {
            minimum: [
                {
                    all: false,
                    any: [
                        'sword',
                        'rocs_feather',
                        'magic_rod',
                        'hookshot',
                        'bow',
                    ],
                },
            ],
            accessible: [
                {
                    all: [
                        'sword',
                        'magic_rod',
                        'rocs_feather',
                        'hookshot',
                        'bomb',
                    ],
                    any: ['power_bracelet', 'power_bracelet_l2'],
                },
            ],
            clearable: [
                {
                    all: false,
                    any: false,
                },
            ],
            finished: [
                {
                    all: ['dungeon_8'],
                    any: false,
                },
            ],
        },
    },
];

export function dungeons() {
    let dungeons = [];
    let offset = 1;

    requirements.forEach((dungeon, index) => {
        let d = {
            id: index + offset,
            minimum: false,
            accessible: false,
            clearable: false,
            completable: false,
            finished: false,
        };

        dungeons.push(d);
    });

    return dungeons;
}
