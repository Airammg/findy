<template>
  <v-card class="justify-center mx-0 pb-3" width="100%" elevation="5">
    <div v-if="forecast" class="container-fluid px-3">
      <v-card-title class="main-color location px-0">
        {{ selectedplace }}
      </v-card-title>
      <v-row dense>
        <v-col
          xs="3"
          sm="6"
          md="6"
          lg="2"
          class="pt-5 "
          align="center"
        >
          <div class="grey lighten-3 rounded-lg  py-10 icon-bg">
            <img :src="`https://openweathermap.org/img/w/${forecast[0].weather[0].icon}.png`" alt="" width="100px" height="auto">
          </div>
        </v-col>
        <v-col class="" xs="9" sm="6" md="6" lg="2">
          <v-card-subtitle class="font-weight-black pb-0">
            <b>
              {{ forecast[0].weather[0].description }}
            </b>
          </v-card-subtitle>
          <v-card-text center>
            <div class="icon-data d-flex">
              <IconSun />&nbsp;
              {{ averageTemperature }} °C
            </div>

            <div class="icon-data d-flex">
              <IconTherm />&nbsp;
              {{ averageFeelslike }} °C
            </div>
            <div class="icon-data d-flex">
              <IconWind />&nbsp;
              {{ averageWind }} Km/h
            </div>
            <div class="icon-data d-flex">
              <IconGust />&nbsp;
              {{ averageGust }} Km/h
            </div>
            <div class="icon-data d-flex">
              <IconRain />&nbsp;
              {{ averageRainProbability }} %
            </div>
          </v-card-text>
        </v-col>
        <v-col class="" cols="12" xs="12" sm="12" lg="8">
          <!-- <pre>

            {{ forecast }}
          </pre> -->
          <ForecastHour :hour="forecast" />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import ForecastHour from '@/components/ForecastHour.vue'
import IconWind from '@/components/IconWind.vue'
import IconSun from '@/components/IconSun.vue'
import IconTherm from '@/components/IconTherm.vue'
import IconRain from '@/components/IconRain.vue'

export default {
  components: {
    ForecastHour,
    IconSun,
    IconWind,
    IconTherm,
    IconRain

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
  computed: {
    averageTemperature () {
      const allTemperatures = []
      for (let i = 0; i < this.forecast.length; i++) {
        allTemperatures.push(this.forecast[i].main.temp)
      }
      return Math.round(allTemperatures.reduce((a, b) => (a + b)) / allTemperatures.length)
    },
    averageFeelslike () {
      const allFeelslike = []
      for (let i = 0; i < this.forecast.length; i++) {
        allFeelslike.push(this.forecast[i].main.feels_like)
      }
      return Math.round(allFeelslike.reduce((a, b) => (a + b)) / allFeelslike.length)
    },
    averageWind () {
      const allWind = []
      for (let i = 0; i < this.forecast.length; i++) {
        allWind.push(this.forecast[i].wind.speed * 3.6)
      }
      return Math.round(allWind.reduce((a, b) => (a + b)) / allWind.length)
    },
    averageGust () {
      const allGust = []
      for (let i = 0; i < this.forecast.length; i++) {
        allGust.push(this.forecast[i].wind.gust * 3.6)
      }
      return Math.round(allGust.reduce((a, b) => (a + b)) / allGust.length)
    },
    averageRainProbability () {
      const allRain = []
      for (let i = 0; i < this.forecast.length; i++) {
        allRain.push(this.forecast[i].pop)
      }
      return Math.round((allRain.reduce((a, b) => (a + b)) / allRain.length) * 100)
    }
  }
}
</script>

<style scoped>
.main-color {
  color: #af429a;
}

.location {
  font-size: 16px;
}

.icon-data {
  font-size: 12px;
  margin: 6px 0;
  text-align: center;
  line-height: 24px;
  border-bottom: 5px solid  #af429970;
  padding-bottom: 3px;
}
</style>
