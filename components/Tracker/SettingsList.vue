<template lang="pug">

.settings-list
    .settings-group(
    v-for='(group, index) in filteredSettings',
    v-bind:key='index')
        h5(v-bind:data-group-name="index") {{index}}
        ol.inner-settings-list
            li(
            v-for='(option, name) in group',
            v-bind:key='name')
                h6(v-if='option.heading') {{option.heading}}
                
                input(
                v-if="option.type === 'checkbox' || option.type === 'radio'",
                v-bind:checked='option.value',
                v-bind:id='name',
                v-bind:data-index='index',
                v-bind:name='option.name',
                v-bind:type='option.type',
                v-bind:value='option.value',
                v-bind:ref='option.name',
                @input='inputChange')

                input(
                v-else-if="option.type === 'range'",
                v-bind:id='name',
                v-bind:data-index='index',
                v-bind:name='option.name',
                v-bind:type='option.type',
                v-bind:value='option.value',
                v-bind:min='option.minimum',
                v-bind:max='option.maximum',
                v-bind:step='option.step',
                v-bind:ref='option.name',
                @input='inputChange')

                input(
                v-else-if='option.type === "color"',
                v-bind:id='name',
                v-bind:data-index='index',
                v-bind:name='option.name',
                v-bind:type='option.type',
                v-bind:value='option.value',
                v-bind:ref='option.name',
                @input='inputChange')

                input(
                v-else-if='option.type === "text"',
                v-bind:id='name',
                v-bind:data-index='index',
                v-bind:name='option.name',
                v-bind:type='option.type',
                v-bind:value='option.value',
                v-bind:ref='option.name',
                @input='inputChange')

                label(
                v-if='option.label && option.type !== "button"',
                v-bind:for='name') {{option.label}}
                
                .color-options(v-if="option.type === 'color'")
                    output(v-bind:for='name') {{option.value}}
                    button(
                    @click='$store.getters.settings.trackers.backgroundColor.value = $store.getters.settings.trackers.backgroundColor.defaultValue') Reset

</template>

<script>
import settings from '~/assets/js/data/settings';
import SettingsList from './SettingsList';

let defaultSettings = Object.assign({}, settings);

export default {
    name: 'SettingsList',
    components: {
        SettingsList,
    },
    data() {
        return {
            storageName: 'windfishUserSettings',
        };
    },
    computed: {
        filteredSettings() {
            let settings = this.$store.getters.settings;
            let filteredSettings = {};

            for (let key in settings) {
                if (key !== 'user') filteredSettings[key] = settings[key];
            }

            return filteredSettings;
        },
    },
    methods: {
        inputChange(event) {
            let target = event.target;
            let option = {
                index: target.getAttribute('data-index'),
                type: target.getAttribute('type'),
                id: target.getAttribute('id'),
                name: target.getAttribute('name'),
                value: target.value,
            };

            switch (option.type) {
                case 'checkbox':
                    option.value = target.checked;
                    break;

                case 'radio':
                    let falsedOption = {};
                    option.value = target.checked;

                    this.$refs[option.name].forEach(ref => {
                        let index = ref.getAttribute('data-index');
                        let id = ref.getAttribute('id');

                        if (id !== option.id) {
                            falsedOption.index = index;
                            falsedOption.id = id;
                            falsedOption.value = false;

                            this.$store.dispatch(
                                'update setting value',
                                falsedOption
                            );
                        }
                    });
                    break;

                default:
                    break;
            }

            this.$store.dispatch('update setting value', option);

            if (this.$store.getters.settings.configuration.keepSettings.value) {
                this.storeUserData(this.$store.getters.settings);
            } else {
                this.storeUserData(defaultSettings);
            }
        },
        storeUserData(data) {
            window.localStorage.setItem(this.storageName, JSON.stringify(data));
        },
    },
};
</script>