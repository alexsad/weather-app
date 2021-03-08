<template lang="pug">
CitySelection(v-if="!location.city" :city-change="onSelectCity")
WeatherDetail(v-if="!!location.city" :city="location.city" :country="location.country" :on-back="onBack")
</template>

<script lang="ts">
import './assets/fontello-afd02c25/css/fontello.css';
import CitySelection from './pages/city-selection.vue';
import WeatherDetail from './components/weather-detail/weather-detail.vue';
import { Location } from './interfaces/location';
import { defineComponent } from 'vue';

export default defineComponent({
	components:{
		CitySelection,
		WeatherDetail,		
	},
	data() {
		return {
			location : {
				city: '',
				country: ''
			} as Location
		}
	},
	methods:{
		onSelectCity(location: Location) {
			this.location = {...location};
		},
		onBack() {
			this.location.city = '';
			this.location.country = '';
		}
	}
});
</script>

<style lang="scss">
#app, html, body {
	padding: 0;
	margin: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	font-family: 'Quicksand', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	padding: 0;
	margin: 0;
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
