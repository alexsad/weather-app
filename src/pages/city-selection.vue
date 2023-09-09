<style lang="scss">
.box-selection{
    background-color: #0f0f0f;
    padding-top: 148px;
    height: 100%;
    box-sizing: border-box;

    > .city-selection{
        width: 326px;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        color: #efefef;
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
                background-image: url("./assets/globe.png");
                background-repeat: no-repeat;
                background-position: center center;
            }
        }

        > .locations {
         > .row {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                align-content: center;
                align-items: flex-start;
                margin-bottom: 20px;

                > span{
                    order: 0;
                    flex: 0 1 auto;
                    align-self: auto;
                    font-size: 20px;
                    font-weight: normal;
                }
            }
 
        }
    }
}

</style>

<template lang="pug">
.box-selection
    .city-selection
        h1 WEATHER
        h2 select a city
        .icon
            .globe
        .locations
            .row
                span(@click="onSelectCity('Dallol', 'ng')") Dallol
                span(@click="onSelectCity('Fairbanks','us')") Fairbanks
                span(@click="onSelectCity('London','gb')") London
            .row
                span(@click="onSelectCity('Recife','br')") Recife
                span(@click="onSelectCity('Vancouver','ca')") Vancouver
                span(@click="onSelectCity('Yakutsk','ru')") Yakutsk
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Location} from '../interfaces/location';

export default defineComponent({
    methods: {
        onSelectCity(city: string, country: string) {
            if(this.$props.cityChange){
				this.$props.cityChange({
                    city,
                    country
				});
			}
        }
    },
    props: {
		cityChange:{
			type: Function as PropType<(location: Location) => void>
		},
	},
})
</script>