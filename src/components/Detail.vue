<template>
  <div class="detail">
    <h1>{{ $route.params.cityName }}</h1>
    <router-link to="/">Back</router-link>
    <h2>{{ this.Descript}}</h2>
    <img :src="this.ImageURL" alt="Some Picture">
  </div>
</template>

<script>
import cityData from '../assets/cityData.json'
export default {
  name: 'Detail',
  data () {
    return {
      name: this.$route.params.cityName,
      Descript: 'None descrypt',
      ImageURL: 'None Picture',
      msg: 'Welcome to Parro Map'
    }
  },

  beforeMount: function() {
  for (var i = 0; i < cityData.length; i++) {
     if (cityData[i].cityName === this.name) {
        this.Descript = cityData[i].cityDescription;
        this.ImageURL = cityData[i].cityImageURLs;
     }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
