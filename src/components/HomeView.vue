<template>
  <div class="homeview">
  <h1>Welcome to PARRO MAP</h1>
  <img v-if= "loggedin" :src="image">
  <h2 v-if="loggedin">Hi {{ this.accountName }} !</h2>
  <h2 v-else>Checkout what others are going!</h2>


  <input v-if="loggedin" type = "text" placeholder="Going somewhere?"
  v-model="pendingDestination"></input>
  <button v-if="loggedin" v-on:click = createTravel()>Submit</button>
  <ul v-if="loggedin">
     <li v-for = "destination in cityList" v-if="destination.matched" v-on:click=updateMap(destination.cityName)>
        {{ destination.cityName }}
     </li>
  </ul>

  <div v-if="showSuggestion === true"  v-for = "goer in goerList">
     <h2>{{ goer.username }} is going to {{ currentDest }}</h2>
     <img v-bind:src = "goer.profile_picture">
  </div>

  <button v-if="loggedin === false" v-on:click="loginFacebook()">Login with Facebook</button>
  <ul>
  <li v-for= "user in userList">
     {{user.name}} is going to {{currentDest}}
  </li>
  </ul>

  <div id="myMap"></div>
  </div>


</template>

<script>
const API_ENDPOINT = 'http://localhost:3000'
var axios=require('axios')
var firebase = require('firebase')
var FBconfig = require('../helpers/firebaseConfig')

var App = firebase.initializeApp(FBconfig.config);

var provider = new firebase.auth.FacebookAuthProvider();
firebase.auth().useDeviceLanguage();
provider.setCustomParameters({
  'display': 'popup'
});

var database = firebase.database();






import cityData from '../assets/cityData.json'



export default {
  name: 'HomeView',


  data () {
    return {
      goerList: [],
      userList: [],
      cityList: [],
      pendingDestination: '',
      currentDest: '',
      location: {lat: 35.6732619, lng: 139.5703037},
      loggedin: false,
      accountName: 'Default User',
      image:'',
      userEmail:'',
      userID:'',

      showSuggestion: false,

    }
  },
  methods: {

       createTravel() {
           firebase.database().ref( this.pendingDestination + '/' + this.userID).set({
            username: this.accountName,
            email: this.userEmail,
            profile_picture : this.image
           });
           this.currentDest = this.pendingDestination;
           this.getGoer(this.currentDest);
           this.showSuggestion = true;
      },

      getGoer: function(cityName) {
         var goerRef = database.ref().child(cityName + '');
         goerRef.once('value', (snapshot) => {
             var array = Object.values(snapshot.val());
            console.log('array:', array[0].email);
             console.log('Value returned:', Object.values(snapshot.val())[0].email);
             this.updateGoerList(array);
        });
      },

      updateGoerList: function(array) {
          console.log(array);
          this.goerList = array;
          console.log(this.goerList[0].email);
      },





       updateMap: function(destinationName) {
           this.pendingDestination = destinationName;
           for (var i = 0; i < this.cityList.length; i++) {
              if (this.pendingDestination === this.cityList[i].cityName) {
                  this.location = this.cityList[i].cityLocation;
                  break;
              }
           }
           this.updateLocation(this.location);
       },

       loginFacebook: function() {
           firebase.auth().signInWithPopup(provider).then((result) => {
           // This gives you a Facebook Access Token. You can use it to access the Facebook API.
           var token = result.credential.accessToken;
           // The signed-in user info.
           var user = result.user;
           //console.log('user info');


           var userId = user.providerData[0].uid
           var username = user.providerData[0].displayName
           var email = user.providerData[0].email
           var imageUrl = user.providerData[0].photoURL





           //create new user
           firebase.database().ref('users/' + userId).set({
            username: username,
            email: email,
            profile_picture : imageUrl
           });

           this.accountName = username;
           this.loggedin = true;
           this.image = imageUrl;
           this.userEmail = email;
           this.userID = userId;

           //get info of all users
           firebase.database().ref('/users/' ).once('value').then(function(snapshot) {
                 console.log(Object.values(snapshot.val()))

               });



           }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
           });
       },



       updateLocation: function (locationObj) {
          this.map.setCenter(new google.maps.LatLng(locationObj.lat, locationObj.lng));
       },



  },
  mounted: function() {
           database.ref().child('Singapore').on('value', (snapshot) => {
                 this.goerList = Object.values(snapshot.val());
           });


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
       pendingDestination: function (val) {
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
    position: left;
   }



</style>
