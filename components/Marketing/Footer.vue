<template lang="pug">
footer
    .grid-container
        p Images &copy; Nintendo (where applicable)
</template>

<script>
export default {
    name: 'Footer',
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_vars';
footer {
    background-color: white;
    padding: 60px 0;
    text-align: center;

    p {
        color: $blue-1;
    }
}
</style>
