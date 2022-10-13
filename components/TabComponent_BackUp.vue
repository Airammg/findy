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
            <div>{{ forecast[0].dt_txt.slice(0, 10) }}</div>
            <!-- <div>{{ getWeekDay(forecast.forecastday[0].date) }}</div> -->
            <v-img :src="`https://openweathermap.org/img/w/${forecast[0].weather[0].icon}.png`" alt="" width="75px" />
          </v-tab>

          <v-tab href="#tab-2">
            <div>{{ forecast[7].dt_txt.slice(0, 10) }}</div>

            <!-- <div>{{ getWeekDay(forecast.forecastday[1].date) }}</div> -->
            <v-img :src="`https://openweathermap.org/img/w/${forecast[7].weather[0].icon}.png`" alt="" width="75px" />
          </v-tab>

          <v-tab href="#tab-3">
            <div>{{ forecast[15].dt_txt.slice(0, 10) }}</div>

            <!-- <div>{{ getWeekDay(forecast.forecastday[2].date) }}</div> -->
            <v-img :src="`https://openweathermap.org/img/w/${forecast[15].weather[0].icon}.png`" alt="" width="75px" />
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <!-- <ForecastDay
              :forecast="forecast.forecastday[0]"
              :selectedplace="selectedplace"
            /> -->
          </v-tab-item>
          <v-tab-item value="tab-2">
            <!-- <ForecastDay
              :forecast="forecast.forecastday[1]"
              :selectedplace="selectedplace"
            /> -->
          </v-tab-item>
          <v-tab-item value="tab-3">
            <!-- <ForecastDay
              :forecast="forecast.forecastday[2]"
              :selectedplace="selectedplace"
            /> -->
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-app>
  </div>
</template>

<script>
// import ForecastDay from './ForecastDay.vue'
export default {
  components: {
    // ForecastDay
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
    dateShortener (date) {
      return date.slice(0, 10)
    }
  },
  methods: {
    getWeekDay (date) {
      return this.weekdays[new Date(date).getDay()]
    }
  }

}
</script>
