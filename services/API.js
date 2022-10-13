import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/'
  // headers: {
  //   key: 'bdec674e5a34b7c36fe2a3145689d3cf'
  // }
})

async function searchRealTime (lat, lon) {
  const { data } = await API.get(`weather?lat=${lat}&lon=${lon}&appid=bdec674e5a34b7c36fe2a3145689d3cf&units=metric`).catch((error) => {
    console.log('Rejected: ', error)
  })
  return data
}

async function searchForecast (lat, lon) {
  const { data } = await API.get(`forecast?lat=${lat}&lon=${lon}&appid=bdec674e5a34b7c36fe2a3145689d3cf&units=metric`).catch((error) => {
    console.log('Rejected: ', error)
  })
  return data
}

export default {
  searchRealTime,
  searchForecast
}

// import axios from 'axios'

// const API = axios.create({
//   baseURL: 'https://api.weatherapi.com/v1/',
//   headers: {
//     key: '311ae98d4e3444e4a0d94150222009'
//   }
// })

// async function searchRealTime (place) {
//   const { data } = await API.get('current.json', {
//     params: {
//       q: place
//     }
//   }).catch((error) => {
//     console.log('Rejected: ', error)
//   })
//   return data
// }

// async function searchForecast (place, daysAhead) {
//   const { data } = await API.get('forecast.json', {
//     params: {
//       q: place,
//       days: daysAhead
//     }
//   }).catch((error) => {
//     console.log('Rejected: ', error)
//   })
//   return data
// }

// export default {
//   searchRealTime,
//   searchForecast
// }
