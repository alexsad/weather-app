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
        }

        > .more-weather-info-list {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-content: center;
            align-items: flex-start;
            margin-top: 40px;
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
        h2.weather {{weather.description}}
        .temp 
            span {{weather.temp}}
            .variants
                span.metric °C
                span &uarr;{{weather.maxTemp}}°
                span &darr;{{weather.minTemp}}°
        .icon
            i(:class="'icon-' + weather.type")
        .weather-list
            ForecastItem(description="dawn" :type="weather.dawn.type" :temp="weather.dawn.temp")
            ForecastItem(description="morning" :type="weather.morning.type" :temp="weather.morning.temp")
            ForecastItem(description="afternoon" :type="weather.afternoon.type" :temp="weather.afternoon.temp")
            ForecastItem(description="night" :type="weather.night.type" :temp="weather.night.temp")
        .more-weather-info-list
            ExtraInfoItem(description="wind speed" :value="weather.windSpeed+' m/s'" :border-color="getExtraInfoItemBorderColor()")
            ExtraInfoItem(description="sunrise" :value="weather.sunrise" :border-color="getExtraInfoItemBorderColor()")
            ExtraInfoItem(description="sunset" :value="weather.sunset" :border-color="getExtraInfoItemBorderColor()")
            ExtraInfoItem(description="humidity" :value="weather.humidity+'%'")
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import { mapGetters, mapActions } from 'vuex';
import ForecastItem from './forecast-item.vue';
import ExtraInfoItem from './extra-info-item.vue';

export default defineComponent({
    components:{
        ForecastItem,
        ExtraInfoItem,
    },
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
        },
        getExtraInfoItemBorderColor() {
            return this.weather.type === 'snowy' ? 'rgba(0, 0, 0, .1)' : 'rgba(255, 255, 255, .1)'
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