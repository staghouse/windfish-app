export default {
    user: {
        savedTime: {
            asString: '00:00:00',
            hours: 0,
            minutes: 0,
            seconds: 0,
            milis: 0,
        },
    },
    configuration: {
        keepSettings: {
            heading: 'Persistant Settings',
            label: 'Store My Settings',
            type: 'checkbox',
            value: false,
        },
        // resetCurrentSettings: {
        //     heading: 'Reset Current Settings',
        //     type: 'button',
        //     text: 'Reset',
        // },
    },
    trackers: {
        timerVisible: {
            heading: 'Timer',
            label: 'Show Timer',
            type: 'checkbox',
            value: false,
        },
        layoutHybrid: {
            heading: 'Layout',
            label: 'Hybrid',
            name: 'trackersLayout',
            type: 'radio',
            value: true,
        },
        layoutReverse: {
            label: 'Reverse',
            name: 'trackersLayout',
            type: 'radio',
            value: false,
        },
        layoutMap: {
            label: 'Map Only',
            name: 'trackersLayout',
            type: 'radio',
            value: false,
        },
        layoutItems: {
            label: 'Items Only',
            name: 'trackersLayout',
            type: 'radio',
            value: false,
        },
        showBorder: {
            heading: 'Border',
            label: 'Show Border',
            type: 'checkbox',
            value: true,
        },
        borderImageSilver: {
            label: 'Silver Border',
            name: 'borderImage',
            type: 'radio',
            value: true,
        },
        borderImageGold: {
            label: 'Gold Bolder',
            name: 'borderImage',
            type: 'radio',
            value: false,
        },
        backgroundColor: {
            heading: 'Background',
            label: 'Color',
            type: 'color',
            value: '#010619',
            defaultValue: '#010619',
        },
    },
    screens: {
        compactMarkers: {
            heading: 'Marker Menu',
            label: 'Compact Menu',
            type: 'checkbox',
            value: false,
        },
        autoClose: {
            label: 'Auto-close on select',
            type: 'checkbox',
            value: true,
        },
        mapTypeOriginal: {
            heading: 'Map Type',
            label: 'Original',
            name: 'mapType',
            type: 'radio',
            value: true,
        },
        mapTypeImproved: {
            label: 'Improved',
            name: 'mapType',
            type: 'radio',
            value: false,
        },
        mapTypeDetailed: {
            label: 'Detailed',
            name: 'mapType',
            type: 'radio',
            value: false,
        },
        mapOpacity: {
            heading: 'Map Opacity',
            label: '',
            type: 'range',
            value: '.3',
            step: '.1',
            minimum: '.1',
            maximum: '1',
        },
        showGutter: {
            label: 'Show Coordinates',
            type: 'checkbox',
            value: false,
        },
        showEntrances: {
            heading: 'Overlay',
            label: 'Highlight Entrances',
            type: 'checkbox',
            value: false,
        },
        overlayChests: {
            label: 'Show Overworld Chests',
            type: 'checkbox',
            value: false,
        },
        overlayPOHExterior: {
            label: 'Show Pieces of Heart (Exterior)',
            type: 'checkbox',
            value: false,
        },
        overlayPOHInterior: {
            label: 'Show Pieces of Heart (Interior)',
            type: 'checkbox',
            value: false,
        },
        overlayShells: {
            label: 'Show Seashells',
            type: 'checkbox',
            value: false,
        },
        overlayAdvanced: {
            label: 'Show Advanced Overlay',
            type: 'checkbox',
            value: false,
        },
    },
    items: {
        showChests: {
            heading: 'Sprites',
            label: 'Show Chests',
            type: 'checkbox',
            value: false,
        },
        showExtended: {
            label: 'Show More Items',
            type: 'checkbox',
            value: false,
        },
        showSuperExtended: {
            label: 'Show Even More Items',
            type: 'checkbox',
            value: false,
        },
        verticalLayout: {
            heading: 'Miscellaneous',
            label: 'Vertical Layout',
            type: 'checkbox',
            value: false,
        },
        desaturateInactive: {
            label: 'Desaturate Inactive Items',
            type: 'checkbox',
            value: false,
        },
        showGoatMode: {
            label: 'Enable Goat Mode Tracking',
            type: 'checkbox',
            value: false,
        },
    },
};
