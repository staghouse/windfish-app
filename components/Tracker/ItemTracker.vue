<template lang="pug">

.item-tracker.tracker
    Item(
    v-for='(data, index) in $store.getters.items',
    v-bind='{index}',
    v-on:update='update($event)',
    v-bind:key='index')

</template>

<script>
import { requirements } from '~/assets/js/data/dungeons';
import { hasRequirements, checkRequirements } from '~/assets/js/utils';
import Item from '~/components/Tracker/Item';
export default {
    components: {
        Item,
    },
    mounted() {
        this.updateDungeonStates();
    },
    methods: {
        update() {
            this.updateDungeonStates();
        },
        updateDungeonStates() {
            let itemMap = this.$store.getters.items.filter(
                item => item.category === null || item.category === 'dungeon'
            );

            let newDungeonStates = [];

            requirements.forEach(dungeon => {
                let newDungeon = {};

                newDungeon.minimum = hasRequirements(
                    itemMap,
                    dungeon.requirements.minimum
                );
                newDungeon.accessible = hasRequirements(
                    itemMap,
                    dungeon.requirements.accessible
                );
                newDungeon.clearable = hasRequirements(
                    itemMap,
                    dungeon.requirements.clearable
                );
                newDungeon.finished = hasRequirements(
                    itemMap,
                    dungeon.requirements.finished
                );
                newDungeon.completable =
                    newDungeon.minimum &&
                    newDungeon.accessible &&
                    newDungeon.clearable;

                newDungeonStates.push(newDungeon);
            });

            this.$store.dispatch('update dungeon states', newDungeonStates);
        },
    },
};
</script>
