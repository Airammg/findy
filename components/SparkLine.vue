<template>
  <div>
    <v-card class="my-2 px-2" elevation="0">
      <v-card-subtitle>
        &#x21f5;{{ getMinAndMax }}
        <div class="title-name">
          {{ titlename }}
        </div>
      </v-card-subtitle>
      <v-sparkline
        class="sparkline"
        :value="selectedParam"
        :gradient="selectedGradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        :labels="graphAxis"
        auto-draw
        color="grey"
      />
    </v-card>
  </div>
</template>

<script>
const gradients = {
  default: ['black'],
  temperature: ['red', 'yellow', 'cyan'],
  feel: ['red'],
  wind: ['blue'],
  gust: ['cyan'],
  rain: ['blue'],
  snow: ['purple']

}

export default {
  props: {
    hours: {
      type: Array,
      default () {
        return []
      }
    },
    parameter: {
      type: String,
      default: ''
    },
    titlename: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    hourtemperature: 0,
    width: 2,
    radius: 10,
    padding: 10,
    lineCap: 'round',
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,
    showLabels: true
  }),
  computed: {
    selectedParam () {
      const positions = []
      for (let i = 0; i < this.hours.length; i++) {
        if (this.parameter === 'temperature') { positions.push(this.hours[i].main.temp) }
        if (this.parameter === 'feel') { positions.push(this.hours[i].main.feels_like) }

        if (this.parameter === 'wind') { positions.push(this.hours[i].wind.speed * 3.6) }
        if (this.parameter === 'gust') { positions.push(this.hours[i].wind.gust * 3.6) }
      }
      return positions
    },
    getMinAndMax () {
      const min = this.selectedParam.reduce(function (a, b) {
        return parseInt(Math.min(a, b))
      })

      const max = this.selectedParam.reduce(function (a, b) {
        return parseInt(Math.max(a, b))
      })
      return ` ${min} / ${max} ${this.unit} `
    },
    selectedGradient () {
      if (this.parameter === 'temperature') { return this.gradients.temperature }
      if (this.parameter === 'wind') { return this.gradients.wind }
      if (this.parameter === 'gust') { return this.gradients.gust }
      if (this.parameter === 'feel') { return this.gradients.feel }
      if (this.parameter === 'chance_of_rain') { return this.gradients.rain }
      if (this.parameter === 'chance_of_snow') { return this.gradients.snow }

      return this.gradients.default
    },
    graphAxis () {
      const times = []
      for (let i = 0; i < this.hours.length; i++) {
        times.push(this.hours[i].dt_txt.slice(10, 16))
      }
      return times
    }

  }
}
</script>

<style scoped>
  .sparkline {
    font-size: 18px;
  }

  .title-name {
    font-size: 0.9rem;
  }
</style>
