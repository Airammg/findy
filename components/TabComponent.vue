<template>
  <div id="app" width="100%">
    <v-app id="inspire">
      <v-card class="justify-center" width="100%" elevation="5">
        <v-tabs
          v-model="tab"
          background-color="#af429a"
          height="100px"
          dark
          centered
          icons-and-text
          active
        >
          <v-tabs-slider />

          <v-tab href="#tab-1">
            <div>{{ dateShortener(predictionDayOne[0].dt_txt) }}</div>
            <div>{{ getWeekDay(dateShortener(predictionDayOne[0].dt_txt)) }}</div>
            <v-img :src="`https://openweathermap.org/img/w/${predictionDayOne[0].weather[0].icon}.png`" alt="" />
          </v-tab>

          <v-tab href="#tab-2">
            <div>{{ dateShortener(predictionDayTwo[0].dt_txt) }}</div>
            <div>{{ getWeekDay(dateShortener(predictionDayTwo[0].dt_txt)) }}</div>

            <v-img :src="`https://openweathermap.org/img/w/${predictionDayTwo[0].weather[0].icon}.png`" alt="" />
          </v-tab>

          <v-tab href="#tab-3">
            <div>{{ dateShortener(predictionDayThree[0].dt_txt) }}</div>
            <div>{{ getWeekDay(dateShortener(predictionDayThree[0].dt_txt)) }}</div>
            <v-img :src="`https://openweathermap.org/img/w/${predictionDayThree[0].weather[0].icon}.png`" alt="" />
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <!-- {{ dateShortener(forecast[0].dt_txt) }} <br> -->
            <!-- {{ forecast[0].dt_txt }} <br> -->

            <!-- <pre>{{ predictionDayThree }} </pre><br> -->

            <!-- {{ predictionDayTwo }} <br> -->
            <!-- {{ predictionDayOne }} <br></br> -->
            <!-- <pre>{{ predictionDayOne[0].rain }} </pre><br> -->

            <ForecastDay :forecast="predictionDayOne" :selectedplace="selectedplace" />
          </v-tab-item>
          <v-tab-item value="tab-2">
            <!-- <pre>{{ predictionDayTwo[0].rain }} </pre><br> -->
            <ForecastDay :forecast="predictionDayTwo" :selectedplace="selectedplace" />
          </v-tab-item>
          <v-tab-item value="tab-3">
            <!-- <pre>{{ predictionDayThree[0].rain }} </pre><br> -->

            <ForecastDay :forecast="predictionDayThree" :selectedplace="selectedplace" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import ForecastDay from './ForecastDay.vue'
export default {
  components: {
    ForecastDay
  },
  props: {
    forecast: {
      type: Array,
      default () {
        return []
      }
    },
    selectedplace: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      tab: null,
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  computed: {
    predictionDayOne () {
      const prediction = this.forecast
      const firstDay = new Date(prediction[0].dt * 1000).getDate()
      const dayOne = prediction.filter((day) => {
        const result = parseInt(new Date(day.dt * 1000).getDate())
        return result === firstDay
      })
      return dayOne
    },
    predictionDayTwo () {
      const prediction = this.forecast
      const firstDay = new Date(prediction[0].dt * 1000).getDate()
      const secondDay = new Date()
      secondDay.setDate(firstDay + 1)
      const dayTwo = prediction.filter((day) => {
        const result = parseInt(new Date(day.dt * 1000).getDate())
        return result === secondDay.getDate()
      })
      return dayTwo
    },
    predictionDayThree () {
      const prediction = this.forecast
      const firstDay = new Date(prediction[0].dt * 1000).getDate()
      const thirdDay = new Date()
      thirdDay.setDate(firstDay + 2)
      const dayThree = prediction.filter((day) => {
        const result = parseInt(new Date(day.dt * 1000).getDate())
        return result === thirdDay.getDate()
      })
      return dayThree
    }

  },
  methods: {
    getWeekDay (date) {
      return this.weekdays[new Date(date).getDay()]
    },
    dateShortener (date) {
      return date.slice(0, 10)
    }
  }

}
</script>
