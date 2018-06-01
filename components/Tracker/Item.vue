<template lang="pug">

.item(
v-bind:data-id="item.id",
v-bind:data-category="item.category",
v-bind:data-available="checkIfAvailable(item.category)",
v-bind:data-more-items="$store.getters.settings.items.showExtended.value",
v-bind:data-even-more-items="$store.getters.settings.items.showSuperExtended.value",
v-bind:data-vertical-layout="$store.getters.settings.items.verticalLayout.value",
v-bind:style="{backgroundColor: $store.getters.settings.trackers.backgroundColor.value}",
@click="update")
    
    .item__wrap(
    v-bind:data-active="item.listPosition > 0",
    v-bind:data-desaturate="$store.getters.settings.items.desaturateInactive.value",
    v-bind:style="{backgroundImage: `url(${imagePath}${item.list[item.listPosition > 0? item.listPosition-1: 0] + spriteExtension})` }")
        
        .item__wrap-text(
        v-if="item.text || item.currentCounter") {{item.text || item.currentCounter}}

</template>

<script>
import { generateStateItemUpdateData } from '~/assets/js/utils';
export default {
    name: 'Item',
    props: ['index'],
    data() {
        return {
            imagePath: '/images/sprites/',
            spriteExtension:
                this.$store.getters.items[this.index].category === 'dungeon'
                    ? '.gif'
                    : '.png',
        };
    },
    computed: {
        item() {
            return this.$store.getters.items[this.index];
        },
    },
    methods: {
        checkIfAvailable(category) {
            switch (category) {
                case 'goat':
                    return this.$store.getters.settings.items.showGoatMode
                        .value;
                    break;

                case 'chest':
                    return this.$store.getters.settings.items.showChests.value;
                    break;

                case 'extended':
                    return this.$store.getters.settings.items.showExtended
                        .value;
                    break;

                case 'super-extended':
                    return this.$store.getters.settings.items.showSuperExtended
                        .value;
                    break;
            }
        },
        update() {
            let dataToUpdate = generateStateItemUpdateData(
                this.$store.getters.items,
                this.item.id
            );

            this.$store.dispatch('update item data', dataToUpdate);

            if (this.$store.getters.socketConnected) {
                console.info('Client is sending data to the Socket Server.');

                this.$store.getters.socket.emit(
                    'send broadcast data',
                    this.$store.getters.items
                );
            }

            this.$emit('update', this.item);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars';
@import '../../assets/styles/mixins';

.item {
    grid-column-start: span 2;
    position: relative;
    user-select: none;
    display: flex;
    cursor: pointer;

    &[data-category='goat'],
    &[data-category='extended'],
    &[data-category='super-extended'],
    &[data-category='chest'] {
        display: none;

        &[data-available='true'] {
            display: block;
        }
    }

    &[data-vertical-layout='true'] {
        &[data-id='dungeon1-chests'],
        &[data-id='dungeon2-chests'],
        &[data-id='dungeon3-chests'],
        &[data-id='dungeon4-chests'] {
            grid-row-start: 6;

            &[data-even-more-items='true'],
            &[data-more-items='true'] {
                grid-row-start: 8;
            }

            &[data-more-items='true'][data-even-more-items='true'] {
                grid-row-start: 10;
            }
        }
    }

    &__wrap {
        width: 100%;
        padding-bottom: 100%;
        background-size: 85%;
        background-position: center;
        background-repeat: no-repeat;
        image-rendering: pixelated;
        opacity: 0.4;

        &[data-desaturate='true'] {
            filter: grayscale(100%);

            &[data-active='true'] {
                filter: grayscale(0%);
            }
        }

        &[data-active='true'] {
            opacity: 1;
        }

        &-text {
            position: absolute;
            right: 0;
            bottom: 0;
            color: white;
            font-size: 1.5rem;
            text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
                2px 2px 0 #000;
        }
    }

    &[data-id='goat_mode'] {
        position: absolute;
        display: none;
        left: 0;
        right: 0;
        top: -15px;
        bottom: auto;
        margin: 0 auto;
        width: 60px;
        height: 30px;
        padding: 0;
        background-color: $blue-1;
        grid-column: auto;

        &[data-show='true'] {
            display: block;
        }
    }

    &[data-id='mushroom'],
    &[data-id='magic_powder'] {
        grid-column-start: span 1;
        .item__wrap {
            background-size: auto 75%;
        }
    }
}
</style>
