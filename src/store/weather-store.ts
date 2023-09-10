import { defineStore } from 'pinia'
import * as weather from '@/interfaces/weather'

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
      icon: ''
    },
    morning: {
      temp: 0,
      type: '',
      icon: ''
    },
    afternoon: {
      temp: 0,
      type: '',
      icon: ''
    },
    night: {
      temp: 0,
      type: '',
      icon: ''
    }
  } as weather.FullWeather
}

const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    weather: {
      ...resetedState()
    },
    currLocation: {
      country: '',
      city: ''
    }
  }),
  actions: {
    updateCurrLocation(city: string, country: string) {
      if (!this) {
        return
      }

      this.currLocation = { city, country }

      const stateToType = (state: string) => {
        const stateMap = new Map<string, string>()
        stateMap.set('Clear', 'clear')
        stateMap.set('Snow', 'snowy')
        stateMap.set('Rain', 'rainy')
        stateMap.set('Clouds', 'clouds')
        return stateMap.get(state) ?? ''
      }

      const requestForecast = async ({ lat, lon }: { lat: number; lon: number }) => {
        const { hourly }: { hourly: weather.Hourly[] } = await fetch(
          `/weather-api/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=daily,minutely,current`
        ).then((rs) => rs.json())
        const hourMap = new Map<number, string>()
        hourMap.set(3, 'dawn')
        hourMap.set(9, 'morning')
        hourMap.set(15, 'afternoon')
        hourMap.set(21, 'night')

        return hourly
          .map((item) => {
            const date = new Date(item.dt * 1000)
            return {
              ...item,
              hour: date.getHours()
            }
          })
          .filter((item) => hourMap.has(item.hour))
          .reduce(
            (prev, curr) => {
              const hourDescription = hourMap.get(curr.hour) ?? ''
              if (!(hourDescription in prev)) {
                const { main, icon } = curr.weather[0]
                prev[hourDescription] = {
                  temp: Math.round(curr.temp),
                  type: stateToType(main),
                  icon: icon
                }
              }
              return prev
            },
            {} as { [key: string]: weather.Temp }
          )
      }

      const fillWeather = async () => {
        const { main, sys, wind, weather, coord }: weather.WeatherInfo = await fetch(
          `/weather-api/weather?units=metric&q=${city},${country}`
        ).then((rs) => rs.json())
        const tempWeather = {} as weather.FullWeather
        tempWeather.temp = Math.round(main.temp)
        tempWeather.maxTemp = Math.round(main.temp_max)
        tempWeather.minTemp = Math.round(main.temp_min)
        tempWeather.windSpeed = wind.speed
        tempWeather.humidity = main.humidity

        const unixTimeToLocaleTimeString = (unixTime: number) =>
          new Date(unixTime * 1000).toLocaleTimeString('en-US').replace(/(:\d{2} )/g, ' ')

        tempWeather.sunrise = unixTimeToLocaleTimeString(sys.sunrise)
        tempWeather.sunset = unixTimeToLocaleTimeString(sys.sunset)

        const { main: mainType, description, icon } = weather[0]

        const type = stateToType(mainType)

        tempWeather.type = type
        tempWeather.description = description.toLowerCase()
        tempWeather.icon = icon

        if (type === '') {
          tempWeather.type = 'rainy'
        }
        const forecast = await requestForecast(coord)
        this.weather = { ...tempWeather, ...forecast }
      }

      fillWeather()
    },
    resetWeather() {
      this.currLocation = { city: '', country: '' }
      this.weather = {
        ...resetedState()
      }
    }
  }
})

export { useWeatherStore }
