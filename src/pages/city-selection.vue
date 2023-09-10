<script lang="ts">
import {defineComponent} from 'vue';
import { RouterLink } from 'vue-router';
import {useWeatherStore} from '@/store/weather-store';

export default defineComponent({
    mounted(){
        const weatherStore = useWeatherStore();
        weatherStore.resetWeather();
    },
})
</script>

<template lang="pug">
.box-selection
    .city-selection
        h1 WEATHER
        h2 select a city
        .icon
            .globe
        .locations
            nav.row
                RouterLink(to="/detail/ng/Dallol") Dallol
                RouterLink(to="/detail/us/Fairbanks") Fairbanks
                RouterLink(to="/detail/gb/London") London
            nav.row
                RouterLink(to="/detail/br/Recife") Recife
                RouterLink(to="/detail/ca/Vancouver") Vancouver
                RouterLink(to="/detail/ru/Yakutsk") Yakutsk
</template>

<style lang="scss">
.box-selection{
    background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
    padding-top: 148px;
    height: 100%;
    box-sizing: border-box;

    > .city-selection{
        width: 326px;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        color: #595959;
        margin: 0px auto;
        padding: 0px;

        @media (max-width: 768px) {
            width: 100%;
            padding: 16px;
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
            margin-bottom: 21px;
            margin-top: -3px;
        }

        > .icon {
            width: 100%;
            margin-bottom: 45px;

            > .globe {
                width: 119px;
                height: 119px;
                width: 100%;
                background-image: url("./assets/globe.svg");
                background-repeat: no-repeat;
                background-position: center center;
                background-size: contain;
            }
        }

        > .locations {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            > .row {
                display: flex;
                width: 100%;
                flex-direction: row;
                justify-content: space-around;
            }
        }
    }
}
</style>