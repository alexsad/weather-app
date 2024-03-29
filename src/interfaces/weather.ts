interface Coord {
  lon: number
  lat: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface Wind {
  speed: number
  deg: number
}

interface Clouds {
  all: number
}

interface Sys {
  type: number
  id: number
  message: number
  country: string
  sunrise: number
  sunset: number
}

export interface WeatherInfo {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

export interface Temp {
  temp: number
  type: string
  icon: string
}

export interface Hourly {
  dt: number
  temp: number
  hour: number
  icon: string
  weather: {
    main: string
    icon: string
  }[]
}

export interface FullWeather {
  type: string
  description: string
  icon: string
  temp: number
  maxTemp: number
  minTemp: number
  windSpeed: number
  humidity: number
  sunrise: string
  sunset: string
  dawn: Temp
  morning: Temp
  afternoon: Temp
  night: Temp
}
