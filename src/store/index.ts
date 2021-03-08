import { createStore } from 'vuex'
import { WeatherInfo } from '../interfaces/weather';
import { Location } from '../interfaces/location';

export interface Temp{
  temp: number;
  type: string;
}


export interface Weather {
  type: string;
  description: string;
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
  weather: {
    main: string;
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
    },
    morning: {
      temp: 0,
      type: '',
    },
    afternoon: {
      temp: 0,
      type: '',
    },
    night: {
      temp: 0,
      type: '',
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
                  prev[hourDescription] = {
                    temp: Math.round(curr.temp),
                    type: stateToType(curr.weather[0].main)
                  };
                }
                return prev;
              }, {} as {[key: string]: Temp});
          });
      }
     
      fetch(`weather-api/weather?units=metric&q=${city},${country}`)
            .then(rs => rs.json())
            .then((data: WeatherInfo) => {
                const weather = {} as Weather;

                weather.temp = Math.round(data.main.temp);
                weather.maxTemp = Math.round(data.main.temp_max);
                weather.minTemp = Math.round(data.main.temp_min);
                weather.windSpeed = data.wind.speed;
                weather.humidity = data.main.humidity;

                weather.sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US").replace(/(:\d{2} )/g, ' ');
                weather.sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US").replace(/(:\d{2} )/g, ' ');

                const {main} = data.weather[0];

                const type = stateToType(main);

                weather.type = type;
                weather.description = type;

                if(!type && typeof main === 'string'){
                    weather.description = main.toLowerCase();
                    weather.type = 'rainy';
                }

                requestForecast(data.coord).then(forecast => {
                  context.commit('changeWeather', {...weather, ...forecast});
                });
            });
    }
  },
  getters: {
    weather: state => state.weather,
	}
})
