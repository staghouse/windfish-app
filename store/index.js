import Vue from 'vue';
import Vuex from 'vuex';

import { dungeons } from '~/assets/js/data/dungeons';
import settings from '~/assets/js/data/settings';
import screens from '~/assets/js/data/screens';
import items from '~/assets/js/data/items';

let screensMarkersList = [...Array(screens.length)].fill([]);

const store = () => {
    return new Vuex.Store({
        state: {
            items: items,
            settings: settings,
            dungeonStates: dungeons(),
            screensMarkersList: screensMarkersList,
            socketConnected: false,
            socketAvailable: true,
            screenContext: null,
            socket: null,
        },
        getters: {
            items: state => state.items,
            settings: state => state.settings,
            dungeonStates: state => state.dungeonStates,
            screensMarkersList: state => state.screensMarkersList,
            screenContext: state => state.screenContext,
            socketConnected: state => state.socketConnected,
            socketAvailable: state => state.socketAvailable,
            socket: state => state.socket,
        },
        actions: {
            'update socket': async function(store, socket) {
                return await store.commit('UPDATE_SOCKET', socket);
            },
            'update socket connection': function(store, newSocketStatus) {
                store.commit('UPDATE_SOCKET_CONNECTION', newSocketStatus);
            },
            'update socket available': function(store, newServerStatus) {
                store.commit('UPDATE_SOCKET_AVAILABLE', newServerStatus);
            },
            'update dungeon states': function(store, newDungeonStates) {
                store.commit('UPDATE_DUNGEON_STATES', newDungeonStates);
            },
            'update item data': function(store, newItemData) {
                store.commit('UPDATE_ITEM_DATA', newItemData);
            },
            'update screen markers': function(store, newScreenData) {
                store.commit('UPDATE_SCREEN_MARKERS', newScreenData);
            },
            'update setting value': function(store, newOption) {
                store.commit('UPDATE_SETTING_VALUE', newOption);
            },
            'update settings': async function(store, newSettings) {
                return await store.commit('UPDATE_SETTINGS', newSettings);
            },
            'update screen context': function(store, newContext) {
                store.commit('UPDATE_SCREEN_CONTEXT', newContext);
            },
            'update user time': async function(store, savedTime) {
                return await store.commit('UPDATE_USER_TIME', savedTime);
            },
            'update broadcast data': function(store, newItemsData) {
                store.commit('UPDATE_BROADCAST_DATA', newItemsData);
            },
            'update item data': async function(store, data) {
                return await store.commit('UPDATE_ITEM_DATA', data);
            },
        },
        mutations: {
            UPDATE_SOCKET: function(state, data) {
                state.socket = data;
            },
            UPDATE_SOCKET_CONNECTION: function(state, data) {
                state.socketConnected = data;
            },
            UPDATE_SOCKET_AVAILABLE: function(state, data) {
                state.socketAvailable = data;
            },
            UPDATE_DUNGEON_STATES: function(state, data) {
                state.dungeonStates = data;
            },
            UPDATE_ITEM_DATA: function(state, data) {
                state.items[data.index] = data;
            },
            UPDATE_SCREEN_MARKERS: function(state, data) {
                Vue.set(state.screensMarkersList, data.id, data.markers);
            },
            UPDATE_SETTING_VALUE: function(state, data) {
                state.settings[data.index][data.id].value = data.value;
            },
            UPDATE_SETTINGS: function(state, data) {
                state.settings = data;
            },
            UPDATE_SCREEN_CONTEXT: function(state, data) {
                state.screenContext = data;
            },
            UPDATE_USER_TIME: function(state, data) {
                state.settings.user.savedTime = data;
            },
            UPDATE_BROADCAST_DATA: function(state, data) {
                state.items = data;
            },
            UPDATE_ITEM_DATA: function(state, data) {
                Vue.set(state.items, data.index, data.item);
            },
        },
    });
};

export default store;
