<template lang="pug">
#app
    Navigation
    Masthead
    Section(
        v-for="(feature, key) in features",
        v-bind:key="key",
        v-bind="{ feature }")
    Footer
</template>

<script>
import marketing from '~/assets/js/data/marketing';
import Navigation from './Navigation';
import Masthead from './Masthead';
import Section from './Section';
import Footer from './Footer';

export default {
    name: 'App',
    components: {
        Navigation,
        Masthead,
        Section,
        Footer,
    },
    data() {
        return {
            features: marketing.features,
        };
    },
};
</script>

<style lang="scss">
@import '../../assets/styles/main.scss';

#app {
    font-family: $font-family-read;
}
</style>
