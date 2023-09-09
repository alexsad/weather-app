import { createStore } from 'vuex'
import { WeatherInfo } from '../interfaces/weather';
import { Location } from '../interfaces/location';

export interface Temp{
  temp: number;
  type: string;
  icon: string;
}


export interface Weather {
  type: string;
  description: string;
  icon: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  windSpeed: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  dawn: Temp;
  morning: Temp;
  afternoon: Temp;
  night: Temp;
}

interface Hourly {
  dt: number; 
  temp: number;
  hour: number;
  icon: string;
  weather: {
    main: string;
    icon: string;
  }[];
}

const resetedState = () => {
  return {
    type: '',
    description: '',
    temp: 0,
    maxTemp: 0,
    minTemp: 0,
    windSpeed: 0,
    humidity: 0,
    sunrise: '0:00 AM',
    sunset: '0:00 PM',
    dawn: {
      temp: 0,
      type: '',
      icon: '',
    },
    morning: {
      temp: 0,
      type: '',
      icon: '',
    },
    afternoon: {
      temp: 0,
      type: '',
      icon: '',
    },
    night: {
      temp: 0,
      type: '',
      icon: '',
    },
  } as Weather;
}

export default createStore({
  state: {
    weather: {
      ...resetedState()
    },
  },
  mutations: {
    changeWeather(state, weather: Weather) {
      state.weather = {...state.weather, ...weather};
    }
  },
  actions: {
    resetWeather(context) {
      context.commit('changeWeather',  {
        ...resetedState()
      });
    },
    requestWeatherByCity(context, {city, country}: Location) {

      const stateToType = (state: string) => {
        const stateMap = new Map<string, string>();
        stateMap.set('Clear', 'clear');
        stateMap.set('Snow', 'snowy');
        stateMap.set('Rain', 'rainy');
        stateMap.set('Clouds', 'clouds');
        return stateMap.get(state) ?? '';
      }

      const requestForecast = ({lat, lon}: {lat: number; lon: number}) => {
        return fetch(`weather-api/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=daily,minutely,current`)
          .then(rs => rs.json())
          .then(({hourly}: {hourly: Hourly[]}) => {
            const hourMap = new Map<number, string>();
            hourMap.set(3, 'dawn');
            hourMap.set(9, 'morning');
            hourMap.set(15, 'afternoon');
            hourMap.set(21, 'night');

            return hourly
              .map(item => {
                const date = new Date(item.dt * 1000);
                return {
                  ...item,
                  hour: date.getHours()
                };
              })
              .filter(item => hourMap.has(item.hour) )
              .reduce((prev, curr) => {
                const hourDescription = hourMap.get(curr.hour) ?? '';
                if(!(hourDescription in prev)){
                  const {main, icon} = curr.weather[0];
                  prev[hourDescription] = {
                    temp: Math.round(curr.temp),
                    type: stateToType(main),
                    icon: icon
                  };
                }
                return prev;
              }, {} as {[key: string]: Temp});
          });
      }
     
      fetch(`weather-api/weather?units=metric&q=${city},${country}`)
            .then(rs => rs.json())
            .then(({main, sys, wind, weather, coord}: WeatherInfo) => {
                const tempWeather = {} as Weather;

                tempWeather.temp = Math.round(main.temp);
                tempWeather.maxTemp = Math.round(main.temp_max);
                tempWeather.minTemp = Math.round(main.temp_min);
                tempWeather.windSpeed = wind.speed;
                tempWeather.humidity = main.humidity;

                const unixTimeToLocaleTimeString = (unixTime: number) =>  new Date(unixTime * 1000).toLocaleTimeString("en-US").replace(/(:\d{2} )/g, ' ');

                tempWeather.sunrise = unixTimeToLocaleTimeString(sys.sunrise);
                tempWeather.sunset = unixTimeToLocaleTimeString(sys.sunset);

                const {main: mainType, description, icon} = weather[0];

                const type = stateToType(mainType);

                tempWeather.type = type;
                tempWeather.description = description.toLowerCase();
                tempWeather.icon = icon;

                if(type === ''){
                  tempWeather.type = 'rainy';
                }

                requestForecast(coord).then(forecast => {
                  context.commit('changeWeather', {...tempWeather, ...forecast});
                });
            });
    }
  },
  getters: {
    weather: state => state.weather,
	}
})
