/******************************************************
 *
 * @prop {Int} id - Numeric identification
 * @prop {String} genericName - Data safe identification
 * @prop {String} fancyName - Display identification
 * @prop {Int} chestCount - Numeric chest count
 * @prop {Object} requirements
 *   @prop {Array => Object} accessible - Can access at least 1 chest
 *   @prop {Array => Object} clearable - Can access all chests
 *   @prop {Array => Object} finishable - Can defeat boss
 *   @prop {Array => Object} complete - Superfluous to track completed
 *
 *****************************************************/

export const requirements = [
    {
        id: 1,
        genericName: 'dungeon_1',
        fancyName: 'Tail Cave',
        chestCount: 8,
        requirements: {
            accessible: null,
            clearable: [
                {
                    all: ['bomb', 'shield', 'rocs_feather'],
                    any: null,
                },
            ],
            finishable: [
                {
                    all: ['sword'],
                    any: null,
                },
            ],
            complete: [
                {
                    all: ['dungeon_1'],
                    any: null,
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
            accessible: [
                {
                    all: null,
                    any: [
                        'sword',
                        'bomb',
                        'bow',
                        'magic_rod',
                        'hookshot',
                        'power_bracelet',
                    ],
                },
            ],
            clearable: [
                {
                    all: ['power_bracelet', 'rocs_feather'],
                    any: ['sword', 'bomb', 'bow', 'hookshot', 'magic_rod'],
                },
            ],
            finishable: [
                {
                    all: null,
                    any: ['sword', 'magic_rod'],
                },
            ],
            complete: [
                {
                    all: ['dungeon_2'],
                    any: null,
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
            accessible: null,
            clearable: [
                {
                    all: ['rocs_feather', 'pegasus_boots', 'bomb'],
                    any: null,
                },
            ],
            finishable: [
                {
                    all: ['sword'],
                    any: null,
                },
            ],
            complete: [
                {
                    all: ['dungeon_3'],
                    any: null,
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
            accessible: null,
            clearable: [
                {
                    all: [
                        'sword',
                        'rocs_feather',
                        'pegasus_boots',
                        'zoras_flippers',
                        'bomb',
                        'shield',
                    ],
                    any: null,
                },
            ],
            finishable: [
                {
                    all: null,
                    any: null,
                },
            ],
            complete: [
                {
                    all: ['dungeon_4'],
                    any: null,
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
            accessible: [
                {
                    all: null,
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
            clearable: [
                {
                    all: [
                        'sword',
                        'hookshot',
                        'bomb',
                        'power_bracelet',
                        'zoras_flippers',
                    ],
                    any: null,
                },
            ],
            finishable: [
                {
                    all: ['rocs_feather'],
                    any: null,
                },
            ],
            complete: [
                {
                    all: ['dungeon_5'],
                    any: null,
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
            accessible: [
                {
                    all: null,
                    any: ['power_bracelet_l2', 'magic_rod', 'bomb', 'bow'],
                },
            ],
            clearable: [
                {
                    all: [
                        'power_bracelet_l2',
                        'rocs_feather',
                        'hookshot',
                        'bomb',
                    ],
                    any: ['bow', 'pegasus_boots', 'sword', 'shield'],
                },
            ],
            finishable: [
                {
                    all: null,
                    any: null,
                },
            ],
            complete: [
                {
                    all: ['dungeon_6'],
                    any: null,
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
            accessible: [
                {
                    all: null,
                    any: ['sword', 'bomb', 'bow', 'magic_rod', 'hookshot'],
                },
            ],
            clearable: [
                {
                    all: ['hookshot', 'bomb'],
                    any: ['power_bracelet', 'power_bracelet_l2'],
                },
            ],
            finishable: [
                {
                    all: null,
                    any: null,
                },
            ],
            complete: [
                {
                    all: ['dungeon_7'],
                    any: null,
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
            accessible: [
                {
                    all: null,
                    any: [
                        'sword',
                        'rocs_feather',
                        'magic_rod',
                        'hookshot',
                        'bow',
                    ],
                },
                {
                    all: ['bomb', 'power_bracelet'],
                },
            ],
            clearable: [
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
            finishable: [
                {
                    all: null,
                    any: null,
                },
            ],
            complete: [
                {
                    all: ['dungeon_8'],
                    any: null,
                },
            ],
        },
    },
];

export async function dungeons() {
    let dungeons = [];

    requirements.forEach((dungeon, index) => {
        dungeons.push({
            id: index + 1,
            accessible: null,
            clearable: null,
            finishable: null,
            complete: null,
        });
    });

    return await dungeons;
}
