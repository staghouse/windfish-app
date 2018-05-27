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
import Navigation from '~/components/Marketing/Navigation';
import Masthead from '~/components/Marketing/Masthead';
import Section from '~/components/Marketing/Section';
import Footer from '~/components/Marketing/Footer';

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
