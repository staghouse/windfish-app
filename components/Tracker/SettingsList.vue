<template lang="pug">

.settings-list
    .settings-group(
    v-for='(group, index) in $store.getters.settings',
    v-bind:key='index'
    v-if="index.toLowerCase() !== 'user'")
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

                //- button(
                //-     v-if='option.type === "button"'
                //-     @click="activateSettingButton(name)") {{ option.text }}

                label(
                v-if='option.label',
                v-bind:for='name') {{option.label}}
                
                .color-options(v-if="option.type === 'color'")
                    //- disabling for now as it has no value
                    //- output(v-bind:for='name') {{option.value}}
                    button(
                    @click='$store.getters.settings.trackers.backgroundColor.value = $store.getters.settings.trackers.backgroundColor.defaultValue') Reset
    //- Translate
</template>

<script>
export default {
    name: 'SettingsList',
    data() {
        return {
            storageName: 'windfishUserSettings',
        };
    },
    beforeMount() {
        let settings = this.$store.getters.settings;
        let storedSettings = window.localStorage.getItem(this.storageName);

        // Environment variables equate Bools to Strings
        if (this.$store.getters.flushSettings == 'true') {
            this.handleLocalData(this.storageName);
            return;
        }

        if (
            typeof storedSettings === 'string' &&
            storedSettings !== 'undefined' &&
            storedSettings.length > 0
        ) {
            let stored = JSON.parse(storedSettings);

            if (Object.keys(stored).length === Object.keys(settings).length) {
                console.log('Stored settings detected...');
                this.$store.dispatch('update settings', stored);
            }
        }
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
                this.handleLocalData(this.storageName, this.$store.getters.settings);
            } else {
                this.handleLocalData(this.storageName);
            }
        },
        handleLocalData( key, data ){
            if (typeof window !== 'undefined' || window) {
                if(data){
                    window.localStorage.setItem(key, JSON.stringify(data));
                } else {
                    window.localStorage.removeItem(key);
                }
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.color-options {
    margin-top: 10px;
}
</style>
