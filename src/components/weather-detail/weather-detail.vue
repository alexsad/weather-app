<style lang="scss">
.box-weather {
    height: 100%;
    box-sizing: border-box;
    color: #efefef;
    background-color: #0f0f0f;

    > .btn-back {
        position: absolute;
        top: 14px;
        left: 14px;

        > i.icon-left {
            font-size: 23px;
        }
    }
    
    > .loading {
        background-image: url("./assets/loading.gif");
        background-repeat: no-repeat;
        width: 64px;
        height: 64px;
        margin: 0 auto;
        position: absolute;
        left: calc(50% - 32px);
        top: calc(50% - 32px);
    }

    @mixin weather-detail-fade-out() {
        > .weather-detail {
            opacity: 1;
            transition: opacity 1s ease-in-out;
        }
    }

    &.type-clear {
        background: #56cbdb;
        background: linear-gradient(0deg, #399bae 0%, #56cbdb 100%);

        @include weather-detail-fade-out();        
    }

    &.type-rainy {
        background: #383f4e;
        background: linear-gradient(0deg, #383f4e 0%, #616978 100%);

        @include weather-detail-fade-out();
    }

    &.type-clouds {
        background: #383f4e;
        background: linear-gradient(0deg, #383f4e 0%, #616978 100%);

        @include weather-detail-fade-out();
    }    

    &.type-snowy {
        background: #ababab;
        background: linear-gradient(0deg, #ababab 0%, #e0e0e0 100%);
        color: #1f1f1f;

        > .weather-detail > .more-weather-info-list > .weather-info {
            border-right: 1px solid rgba($color: #000000, $alpha: .1);
        }

        @include weather-detail-fade-out();
    }

    > .weather-detail {
        width: 326px;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
        margin: 0px auto;
        padding: 0px;
        opacity: 0;
        padding-top: 70px;

        @media (max-width: 768px) {
            width: 100%;
            padding: 16px;
            padding-top: 70px;
        }

        > h1 {
            font-weight: normal;
            text-align: center;
            margin: 0px;
        }

        > h2 {
            font-weight: lighter;
            text-align: center;
            margin: 0px;
            margin-bottom: 30px;
            margin-top: -3px;
        }

        > .temp {
            display: block;
            margin: 0px auto;
            width: auto;

            > span {
                float: left;
                width: 60%;
                height: 100%;
                font-size: 112px;
                margin-top: -32px;
                margin-bottom: -22px;
                text-align: right;
            }

            > .variants {
                float: right;
                width: 40%;

                > span {
                    width: 100%;
                    float: left;

                    &.metric {
                        font-size: 26px;
                        font-weight: bold;
                        margin-bottom: 12px;
                    }
                }
            }
        }

        > .icon {
            width: 100%;
            margin-bottom: 45px;

            > i {
                font-size: 118px;
                text-align: center;
                width: 100%;
                display: inline-block;
            }
        }

         > .weather-list {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-content: center;
            align-items: flex-start;
            margin-bottom: 20px;

            > .weather-prev {
                order: 0;
                flex: 0 1 auto;
                align-self: auto;

                > * {
                    display: block;
                    width: 100%;
                    text-align: center;
                    font-weight: normal;
                }

                > i {
                    font-size: 34px;
                }

                > span:first-child {
                    font-size: 15px;
                }
                
                > span:last-child {
                    font-size: 19px;
                }
            }
        }

        > .more-weather-info-list {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-content: center;
            align-items: flex-start;
            margin-top: 40px;

            > .weather-info:last-child {
                border-right: 1px solid transparent;
            }

            > .weather-info {
                order: 0;
                flex: 1 1 auto;
                align-self: auto;
                border-right: 1px solid rgba($color: #ffffff, $alpha: .1);

                > * {
                    display: block;
                    width: 100%;
                    text-align: center;
                }

                > span:first-child {
                    font-size: 15px;
                    font-weight: lighter;
                    margin-bottom: 5px;
                }
                
                > span:last-child {
                    font-size: 14px;
                    font-weight: normal;
                }
            }
        }
    }
}

</style>

<template lang="pug">
.box-weather(:class="'type-' + weather.type")
    .btn-back(@click="back")
            i.icon-left
    .loading(v-if="!weather.type")
    .weather-detail
        h1.location {{city.toUpperCase()}}
        h2.weather {{weather.description === 'clear' ? 'sunny' : weather.description}}
        .temp 
            span {{weather.temp}}
            .variants
                span.metric °C
                span &uarr;{{weather.maxTemp}}°
                span &darr;{{weather.minTemp}}°
        .icon
            i(:class="'icon-' + weather.type")
        .weather-list
            .weather-prev
                span dawn
                i(:class="'icon-' + weather.dawn.type")
                span {{weather.dawn.temp}}°C
            .weather-prev
                span morning
                i(:class="'icon-' + weather.morning.type")
                span {{weather.morning.temp}}°C
            .weather-prev
                span afternoon
                i(:class="'icon-' + weather.afternoon.type")
                span {{weather.afternoon.temp}}°C
            .weather-prev
                span night
                i(:class="'icon-night-' + weather.night.type")
                span {{weather.night.temp}}°C
        .more-weather-info-list
            .weather-info
                span wind speed
                span {{weather.windSpeed}} m/s
            .weather-info
                span sunrise
                span {{weather.sunrise}}
            .weather-info
                span sunset
                span {{weather.sunset}}
            .weather-info
                span humidity
                span {{weather.humidity}}%
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters(['weather'])
    },
    methods: {
        ...mapActions(['requestWeatherByCity', 'resetWeather']),
        back() {
            if(this.$props.onBack){
				this.$props.onBack();
            }
            this.resetWeather();
        }
    },
    props: {
        city: String,
        country: String,
        onBack:{
			type: Function as PropType<() => void>
		},
    },
    mounted(){
        this.requestWeatherByCity({ 
            city: this.city,
            country: this.country
        });
    },
    watch: {
        city: function() {
            this.requestWeatherByCity({ 
                city: this.city,
                country: this.country
            });
        }
    }
})
</script>