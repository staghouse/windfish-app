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
import { hasRequirements } from '~/assets/js/utils';
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

            requirements.forEach((dungeon, index) => {
                let newDungeon = {};

                newDungeon.accessible = hasRequirements(
                    itemMap,
                    dungeon.requirements.accessible,
                    dungeon.id
                );

                newDungeon.clearable =
                    newDungeon.accessible &&
                    hasRequirements(
                        itemMap,
                        dungeon.requirements.clearable,
                        dungeon.id
                    );

                newDungeon.finishable =
                    newDungeon.clearable &&
                    hasRequirements(
                        itemMap,
                        dungeon.requirements.finishable,
                        dungeon.id
                    );

                newDungeon.complete =
                    newDungeon.finishable &&
                    hasRequirements(
                        itemMap,
                        dungeon.requirements.complete,
                        dungeon.id
                    );

                newDungeonStates.push(newDungeon);
            });

            this.$store.dispatch('update dungeon states', newDungeonStates);
        },
    },
};
</script>

<style lang="scss">
.item-tracker {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: auto;

    &::after {
        content: none !important;
    }
}
</style>
