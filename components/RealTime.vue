<template>
  <v-card class="mx-0 pb-3 px-0 " width="100%" justify-center elevation="5">
    <div v-if="realtime.weather">
      <div class="container-fluid">
        <div class="branding-texture mb-3 rounded rounded-b-0 pa-5 location-real-time d-flex align-center" min-height="100px">
          {{ selectedplace }}
        </div>
        <v-row dense>
          <v-col class="pt-2 px-4" xs="3" sm="12" align="center">
            <div class="grey lighten-3 rounded-lg  py-10 icon-bg">
              <img :src="`https://openweathermap.org/img/w/${realtime.weather[0].icon}.png`" alt="" width="100px" height="auto">
            </div>
          </v-col>
          <v-col xs="9" sm="12">
            <v-card-subtitle class="font-weight-black pb-0 pt-2">
              <b>{{ realtime.weather[0].description }}</b>
            </v-card-subtitle>
            <v-card-text>
              <div class="icon-data d-flex">
                <IconSun />&nbsp;{{ temperatureRounded }} °C
              </div>
              <div class="icon-data d-flex">
                <IconTherm />&nbsp;{{ feelslikeRound }} °C
              </div>
              <div class="icon-data d-flex">
                <IconWind />&nbsp; {{ windToKmh }} Km/h
              </div>
              <div class="icon-data d-flex">
                <IconGust />&nbsp; {{ gustToKmh }} Km/h
              </div>

              <div class="icon-data d-flex">
                <IconPressure />&nbsp; {{ realtime.main.pressure }}
              </div>
              <div class="icon-data d-flex">
                <IconHumidity /> &nbsp;{{ realtime.main.humidity }} %
              </div>
              <!-- <div class="icon-data d-flex">
                &nbsp;<pre>

                  {{ realtime.main }} %
                  {{ realtime.rain }} %

                </pre>
              </div> -->

              <div class="updated">
                {{ timeStamp }}
              </div>
              <ToolTip />
            </v-card-text>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>

<script>
import IconWind from '@/components/IconWind.vue'
import IconSun from '@/components/IconSun.vue'
import IconHumidity from '@/components/IconHumidity.vue'
import IconTherm from '@/components/IconTherm.vue'
import IconPressure from '@/components/IconPressure.vue'
import IconGust from '@/components/IconGust.vue'
import ToolTip from '@/components/ToolTip'

export default {
  components: {
    IconWind,
    IconGust,
    IconSun,
    IconHumidity,
    IconTherm,
    IconPressure,
    ToolTip
  },

  props: {
    place: {
      type: String,
      default () {
        return ''
      }
    },
    realtime: {
      type: Object,
      default () {
        return {}
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
    timeStamp () {
      const unixTimestamp = this.realtime.dt
      /* Create a new JavaScript Date object based on Unix timestamp.
Multiplied it by 1000 to convert it into milliseconds */
      const date = new Date(unixTimestamp * 1000)

      const update = 'Updated: ' + date.toLocaleDateString(navigator.language) + ' at ' + date.getHours() + ':' + date.getMinutes()
      return update
    },
    windToKmh () {
      return Math.round(this.realtime.wind.speed * 3.6)
    },
    gustToKmh () {
      return Math.round(this.realtime.wind.gust * 3.6)
    },
    temperatureRounded () {
      return Math.round(this.realtime.main.temp)
    },
    feelslikeRound () {
      return Math.round(this.realtime.main.feels_like)
    }
  }
}
</script>
<style scoped>
.location-real-time {
  min-height: 100px;
}

.updated {
  color: #af429a;
  font-size: 12px;
}

.icon-data {
  font-size: 12px;
  margin: 6px 0;
  text-align: center;
  line-height: 24px;
  border-bottom: 5px solid #af429970;
  padding-bottom: 3px;
}
</style>
