<template>
  <div v-if="hour" class="grey lighten-4 rounded-lg px-2">
    <div class="mb-5  rounded-lg">
      <v-row dense>
        <v-col v-for="(time, idx) in hour" :key="idx" class="grey lighten-3 px-0 ">
          <div class="d-flex justify-center">
            <img :src="`https://openweathermap.org/img/w/${time.weather[0].icon}.png`" alt="" width="35px" height="auto">
          </div>
          <div class="hour-label d-flex justify-center">
            {{ hour[idx].dt_txt.slice(10,16) }}
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="switch-wrapper">
      <v-switch v-model="temperatureSwitch" label="Temp" color="#af429a" class=" d-inline-block switcher" />
      <v-switch v-model="feelSwitch" label="Feel" color="#af429a" class=" d-inline-block switcher" />

      <v-switch v-model="windSwitch" label="Wind" color="#af429a" class=" d-inline-block switcher" />
      <v-switch v-model="gustSwitch" label="Gust" color="#af429a" class=" d-inline-block switcher" />

      <v-switch v-model="rainSwitch" label="Rain" color="#af429a" class=" d-inline-block switcher" />

      <!-- <v-switch v-model="rainSwitch" label="Rain" color="#af429a" class=" d-inline-block switcher" /> -->
      <!-- <v-switch v-model="snowSwitch" label="Snow" color="#af429a" class=" d-inline-block switcher" /> -->
    </div>

    <SparkLine
      v-if="temperatureSwitch"
      :hours="hour"
      :parameter="'temperature'"
      :titlename="'Temperature'"
      :unit="'°C'"
    />
    <SparkLine
      v-if="feelSwitch"
      :hours="hour"
      :parameter="'feel'"
      :unit="'°C'"
      :titlename="'Feels like'"
    />
    <SparkLine
      v-if="windSwitch"
      :hours="hour"
      :parameter="'wind'"
      :unit="'km/h'"
      :titlename="'Wind'"
    />
    <SparkLine
      v-if="gustSwitch"
      :hours="hour"
      :parameter="'gust'"
      :unit="'km/h'"
      :titlename="'Wind Gust'"
    />

    <SparkLine
      v-if="rainSwitch"

      :hours="hour"
      :parameter="'rain'"
      :unit="'%'"
      :titlename="'Rain probability'"
    />
  </div>
</template>

<script>
import SparkLine from '@/components/SparkLine.vue'

export default {
  components: {
    SparkLine
  },
  props: {
    hour: {
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
      // hourLabels: ['1:00', '4:00', '7:00', '10:00', '13:00', '16:00', '19:00', '22:00'],
      temperatureSwitch: true,
      feelSwitch: true,
      windSwitch: true,
      gustSwitch: true,
      rainSwitch: true,
      snowSwitch: false

    }
  },
  computed: {
    selectedHours () {
      return [this.hour[1], this.hour[4], this.hour[7], this.hour[10], this.hour[13], this.hour[16], this.hour[19], this.hour[22]]
    }
  }
}
</script>

<style scoped>
.switch-wrapper {
  margin-bottom: 10px;
  font-size: 10px;
}

div.switch-wrapper .switcher {
  font-size: 10px !important;
  font-weight: lighter;
}

.hour-label {
  font-size: 0.9rem;
}
</style>
