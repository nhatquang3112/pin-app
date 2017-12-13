<template>
  <div class="homeview">
  <h1>Welcome to PARRO MAP</h1>
  <h2>Choose your next destination!</h2>
  <input type = "text" placeholder="Choose the city" v-model="city"></input>
 
          <li v-for="item in cityList" v-if="item.matched">
            <span class="city" v-on:click="updateLocation(item.cityLocation)">{{ item.cityName }}</span>
            <router-link :to="{name:'detail',params:{ cityName:item.cityName }}">Go!</router-link>
          </li>
  <div id="myMap"></div>
  </div>


</template>

<script>
import cityData from '../assets/cityData.json'
export default {
  name: 'HomeView',
  
  
  data () {
    return {
      cityList: [],
      city: 'Hanoi',
      suggestion: 'None'
    }
  },
  methods: {
       updateLocation: function (locationObj) {
          this.map.setCenter(new google.maps.LatLng(locationObj.lat, locationObj.lng));
       }
  },
  mounted: function() {
        console.log("map: ", google.maps)
            this.map = new google.maps.Map(document.getElementById('myMap'), {
            center: {lat:61.180059, lng: -149.822075},
            scrollwheel: false,
            zoom: 4
            })
  },
  beforeMount: function() {
     this.cityList = cityData;
  },
  watch: {
       city: function (val) {
          for(var i = 0; i < this.cityList.length; i++){
             if(this.cityList[i].cityName.substr(0,val.length).toUpperCase() === val.toUpperCase() && val.length!== 0){
                 this.cityList[i].matched = true;
             }else{
                 this.cityList[i].matched = false;
             }
          }
       }
    }
}


</script>


<style scoped>


  .list {
    width: 100%;
    padding: 0;
  }
  #myMap {
    height:300px;
    width: 100%;
   }
</style>