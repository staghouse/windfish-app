import Vue from 'vue';
import Vuex from 'vuex';

import { dungeons } from './data/dungeons';
import settings from './data/settings';
import screens from './data/screens';
import items from './data/items';

Vue.use(Vuex);

let screensMarkersList = [...Array(screens.length)].fill([]);

export default new Vuex.Store({
    state: {
        items: items,
        settings: settings,
        dungeonStates: dungeons(),
        screensMarkersList: screensMarkersList,
        socketConnected: false,
        screenContext: null,
        user: {
            savedTime: {
                asString: '00:00:00',
                hours: 0,
                minutes: 0,
                seconds: 0,
                milis: 0,
            },
        },
    },
    getters: {
        items: state => state.items,
        settings: state => state.settings,
        dungeonStates: state => state.dungeonStates,
        screensMarkersList: state => state.screensMarkersList,
        screenContext: state => state.screenContext,
        socketConnected: state => state.socketConnected,
        user: state => state.user,
    },
    actions: {
        'update socket connection': function(store, newSocketStatus) {
            store.commit('update socket connection', newSocketStatus);
        },
        'update dungeon states': function(store, newDungeonStates) {
            store.commit('update dungeon states', newDungeonStates);
        },
        'update item data': function(store, newItemData) {
            store.commit('update item data', newItemData);
        },
        'update screen markers': function(store, newScreenData) {
            store.commit('update screen markers', newScreenData);
        },
        'update setting value': function(store, newOption) {
            store.commit('update setting value', newOption);
        },
        'update screen context': function(store, newContext) {
            store.commit('update screen context', newContext);
        },
        'update broadcast data': function(store, newItemsData) {
            store.commit('update broadcast data', newItemsData);
        },
        'update item data': function(store, spriteToUpdate) {
            store.commit('update item data', spriteToUpdate);
        },
    },
    mutations: {
        'update socket connection': function(state, data) {
            state.socketConnected = data;
        },
        'update dungeon states': function(state, data) {
            state.dungeonStates = data;
        },
        'update item data': function(state, data) {
            state.items[data.index] = data;
        },
        'update screen markers': function(state, data) {
            state.screensMarkersList[data.id] = data.markers;
        },
        'update setting value': function(state, data) {
            state.settings[data.index][data.id].value = data.value;
        },
        'update screen context': function(state, data) {
            state.screenContext = data;
        },
        'update broadcast data': function(state, data) {
            state.items = data;
        },
        'update item data': function(state, data) {
            let item = null;
            let index = null;
            let items = state.items;

            // +-----------------------------------------------------+
            // |                                                     |
            // |  @todo: Think about putting this in a utility file  |
            // |                                                     |
            // +-----------------------------------------------------+

            state.items.forEach((currentItem, itemIndex) => {
                if (
                    currentItem.id === data.id ||
                    currentItem.commands.includes(data.id)
                ) {
                    index = itemIndex;

                    item = Object.assign({}, currentItem);
                }
            });

            if (item && index) {
                // Okay, got our correct item...
                if (data.fromSocket) {
                    item.listPosition =
                        item.list.length === item.listPosition
                            ? 0
                            : item.listPosition + 1;
                } else {
                    // i need to update the list position or counter if applicable
                    let itemHasCounter = Number.isInteger(item.counter);

                    if (itemHasCounter) {
                        if (item.category === 'chest') {
                            item.currentCounter =
                                item.currentCounter === 0
                                    ? item.counter
                                    : item.currentCounter - 1;
                        } else {
                            item.currentCounter =
                                item.currentCounter < item.counter
                                    ? item.currentCounter + 1
                                    : 0;
                        }

                        // If the count can still go, keep the active state,
                        // otherwise make it look inactive;
                        item.listPosition = item.currentCounter > 0 ? 1 : 0;
                    } else {
                        item.listPosition =
                            item.list.length === item.listPosition
                                ? 0
                                : item.listPosition + 1;
                    }
                }

                Vue.set(state.items, index, item);
            } else {
                console.log(
                    `Could not find item and at index location: ${index}`
                );
            }
        },
    },
});
