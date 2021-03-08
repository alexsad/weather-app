const APPID = '';

module.exports = {
  devServer: {
    proxy: {
      '^/weather-api' :{
        target: 'https://api.openweathermap.org/data/2.5',
        ws: false,
        changeOrigin: true,
        pathRewrite_2: {
          '^/weather-api' : ''
        },
        pathRewrite: (path, {query}) => {
          return path.replace('/weather-api', '') + `&APPID=${APPID}`;
        },
      },
    }
  }
}