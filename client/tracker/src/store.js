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
        'update user time': async function(store, savedTime) {
            return await store.commit('update user time', savedTime);
        },
        'update broadcast data': function(store, newItemsData) {
            store.commit('update broadcast data', newItemsData);
        },
        'update item data': async function(store, data) {
            return await store.commit('update item data', data);
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
        'update user time': function(state, data) {
            state.settings.user.savedTime = data;
        },
        'update broadcast data': function(state, data) {
            state.items = data;
        },
        'update item data': function(state, data) {
            Vue.set(state.items, data.index, data.item);
        },
    },
});