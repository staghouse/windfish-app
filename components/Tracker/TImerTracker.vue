<template lang="pug">

.timer-tracker.tracker
    .timer-wrap
        .timer-time
            span.current-time(
            @click='toggleTimer',
            ref='currentTime') {{currentTime.asString}}
                span.milis {{currentTime.milis}}

            .save-time-btn(@click='storeTime') Save

        small Best Saved
        
        .timer-time
            span.saved-time {{savedTime.asString}}
                span.milis {{savedTime.milis}}

</template>

<script>
export default {
    name: 'TimerTracker',
    data() {
        return {
            timerRunning: false,
            timerInterval: null,
            elapsedTime: null,
            startTime: null,
            currentTime: {
                asString: '00:00:00',
                hours: 0,
                minutes: 0,
                seconds: 0,
                milis: 0,
            },
            storageName: 'windfishUserSettings',
        };
    },
    computed: {
        savedTime() {
            return (
                this.$store.getters.settings.user.savedTime || this.currentTime
            );
        },
    },
    methods: {
        toggleTimer() {
            this.startTime = Date.now();

            this.timerInterval =
                this.timerInterval ||
                setInterval(() => {
                    let elapsedTime = Date.now() - this.startTime;

                    this.currentTime.milis = (elapsedTime / 1000)
                        .toFixed(1)
                        .split('.')[1];

                    let seconds = (elapsedTime / 1000).toFixed(1).split('.')[0];
                    let minutes = Math.floor(seconds / 60);

                    this.currentTime.hours = Math.floor(
                        this.currentTime.minutes / 60
                    );

                    this.currentTime.seconds =
                        seconds >= 60
                            ? Math.floor(seconds - minutes * 60)
                            : seconds;
                    this.currentTime.minutes =
                        minutes >= 60
                            ? Math.floor(minutes - hours * 60)
                            : minutes;

                    this.currentTime.asString = this.parseTimeAsString(
                        this.currentTime,
                        true
                    );
                }, 100);

            if (!this.timerRunning) {
                // that.timerInterval
                this.timerRunning = true;
                this.$refs.currentTime.classList.add('running');
            } else {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
                this.timerRunning = false;
                this.$refs.currentTime.classList.remove('running');
            }
        },

        calculatePace(time) {
            let currentTime = parseInt(time.asString.replace(/:/g, ''));
            let savedTime = parseInt(this.savedTime.asString.replace(/:/g, ''));

            if (savedTime > 0) {
                if (currentTime >= savedTime) {
                    this.$refs.currentTime.setAttribute('data-pace', 'behind');
                }
                // } else if (currentTime >= 80 / 100 * savedTime) {
                //     this.$refs.currentTime.setAttribute('data-pace', 'near');
                // }
            }
        },

        storeTime() {
            this.savedTime.hours = this.currentTime.hours;
            this.savedTime.minutes = this.currentTime.minutes;
            this.savedTime.seconds = this.currentTime.seconds;
            this.savedTime.milis = this.currentTime.milis;
            this.currentTime = {
                asString: '00:00:00',
                hours: 0,
                minutes: 0,
                seconds: 0,
                milis: 0,
            };
            this.$refs.currentTime.removeAttribute('data-pace');
            this.savedTime.asString = this.parseTimeAsString(this.savedTime);
            //
            this.$store.dispatch('update user time', this.savedTime);

            let that = this;

            if (this.$store.getters.settings.configuration.keepSettings.value) {
                this.$store
                    .dispatch('update user time', this.savedTime)
                    .then(resolved => {
                        window.localStorage.setItem(
                            that.storageName,
                            JSON.stringify(that.$store.getters.settings)
                        );
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        parseTimeAsString(time, shouldCalculate) {
            if (shouldCalculate) {
                this.calculatePace(time);
            }

            return (
                (time.hours < 10 ? '0' : '') +
                time.hours +
                ':' +
                (time.minutes < 10 ? '0' : '') +
                time.minutes +
                ':' +
                (time.seconds < 10 ? '0' : '') +
                time.seconds
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars';

.timer-tracker {
    max-width: $tracker-max-width;
    background-color: $blue-1;
    border-bottom-width: 0;
    margin: 0 auto;

    .current-time {
        color: white;

        &.running {
            color: darken(mediumseagreen, 5%);
            & + .save-time-btn {
                display: none;
            }
        }

        &[data-pace='behind'] {
            color: darken(tomato, 10%);
        }
    }

    .timer-wrap {
        margin: 0 auto;
        padding: 20px 20px 15px;
        text-align: center;

        .timer-time {
            margin: 0 auto;
            display: table;
            font-size: 40px;
            text-align: center;
            line-height: 1em;
            letter-spacing: 2px;
            cursor: pointer;
            position: relative;
            color: gray;

            .save-time-btn {
                position: absolute;
                right: -130px;
                top: 0;
                border: 1px solid $blue-3;
                background-color: $blue-2;
                padding: 7px 10px 4px;
                font-size: 16px;
                line-height: 1em;
                color: white;
            }

            .milis {
                position: absolute;
                right: -15px;
                bottom: -7px;
                font-size: 18px;
            }

            &:first-of-type {
                margin-bottom: 10px;
            }

            &:last-of-type {
                transform: scale(0.6);

                .milis {
                    bottom: -3px;
                }
            }
        }

        small {
            font-size: 14px;
            color: gray;
        }
    }
}
</style>
