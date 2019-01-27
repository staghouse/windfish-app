<template lang="pug">
    App
</template>

<script>
import App from '~/components/Marketing/App';
export default {
    components: {
        App,
    },
    head(){
        return {
            htmlAttrs: {
                class: 'marketing-page'
            }
        }
    }
};
</script>