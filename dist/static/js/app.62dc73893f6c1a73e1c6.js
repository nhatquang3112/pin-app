webpackJsonp([1],{ByaY:function(t,e){},MBVo:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},o=a("VU/8")({name:"app"},n,!1,function(t){a("MBVo")},null,null).exports,s=a("/ocq"),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h2",[t._v("Where you want to go? ")]),t._v(" "),t._m(0),t._v(" "),a("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("Core Docs")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("Forum")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("Community Chat")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("Twitter")])]),t._v(" "),a("br"),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("Docs for This Template")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("vue-router")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("vuex")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("vue-loader")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("awesome-vue")])])])}]},c=a("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Parro Map"}}},r,!1,function(t){a("ByaY")},"data-v-43a3eedc",null).exports,l=a("gRE1"),u=a.n(l),h=a("YkCc"),p=a.n(h),g=(a("mtWM"),a("Sazm")),m=a("nbjv"),d=(g.initializeApp(m.config),new g.auth.FacebookAuthProvider);g.auth().useDeviceLanguage(),d.setCustomParameters({display:"popup"});var v=g.database(),f={name:"HomeView",data:function(){return{goerList:[],userList:[],cityList:[],pendingDestination:"",currentDest:"",location:{lat:35.6732619,lng:139.5703037},loggedin:!1,accountName:"Default User",image:"",userEmail:"",userID:"",showSuggestion:!1}},methods:{createTravel:function(){g.database().ref(this.pendingDestination+"/"+this.userID).set({username:this.accountName,email:this.userEmail,profile_picture:this.image}),this.currentDest=this.pendingDestination,this.getGoer(this.currentDest),this.showSuggestion=!0},getGoer:function(t){var e=this;v.ref().child(t+"").once("value",function(t){var a=u()(t.val());console.log("array:",a[0].email),console.log("Value returned:",u()(t.val())[0].email),e.updateGoerList(a)})},updateGoerList:function(t){console.log(t),this.goerList=t,console.log(this.goerList[0].email)},updateMap:function(t){this.pendingDestination=t;for(var e=0;e<this.cityList.length;e++)if(this.pendingDestination===this.cityList[e].cityName){this.location=this.cityList[e].cityLocation;break}this.updateLocation(this.location)},loginFacebook:function(){var t=this;g.auth().signInWithPopup(d).then(function(e){e.credential.accessToken;var a=e.user,i=a.providerData[0].uid,n=a.providerData[0].displayName,o=a.providerData[0].email,s=a.providerData[0].photoURL;g.database().ref("users/"+i).set({username:n,email:o,profile_picture:s}),t.accountName=n,t.loggedin=!0,t.image=s,t.userEmail=o,t.userID=i,g.database().ref("/users/").once("value").then(function(t){console.log(u()(t.val()))})}).catch(function(t){t.code,t.message,t.email,t.credential})},updateLocation:function(t){this.map.setCenter(new google.maps.LatLng(t.lat,t.lng))}},mounted:function(){console.log("map: ",google.maps),this.map=new google.maps.Map(document.getElementById("myMap"),{center:{lat:61.180059,lng:-149.822075},scrollwheel:!1,zoom:4})},beforeMount:function(){this.cityList=p.a},watch:{pendingDestination:function(t){for(var e=0;e<this.cityList.length;e++)this.cityList[e].cityName.substr(0,t.length).toUpperCase()===t.toUpperCase()&&0!==t.length?this.cityList[e].matched=!0:this.cityList[e].matched=!1}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"homeview"},[a("h1",[t._v("Welcome to PARRO MAP")]),t._v(" "),t.loggedin?a("img",{attrs:{src:t.image}}):t._e(),t._v(" "),t.loggedin?a("h2",[t._v("Hi "+t._s(this.accountName)+" !")]):a("h2",[t._v("Checkout what others are going!")]),t._v(" "),t.loggedin?a("input",{directives:[{name:"model",rawName:"v-model",value:t.pendingDestination,expression:"pendingDestination"}],attrs:{type:"text",placeholder:"Going somewhere?"},domProps:{value:t.pendingDestination},on:{input:function(e){e.target.composing||(t.pendingDestination=e.target.value)}}}):t._e(),t._v(" "),t.loggedin?a("button",{on:{click:function(e){t.createTravel()}}},[t._v("Submit")]):t._e(),t._v(" "),t.loggedin?a("ul",t._l(t.cityList,function(e){return e.matched?a("li",{on:{click:function(a){t.updateMap(e.cityName)}}},[t._v("\n      "+t._s(e.cityName)+"\n   ")]):t._e()})):t._e(),t._v(" "),t._l(t.goerList,function(e){return!0===t.showSuggestion?a("div",[a("h2",[t._v(t._s(e.username)+" is going to "+t._s(t.currentDest))]),t._v(" "),a("img",{attrs:{src:e.profile_picture}})]):t._e()}),t._v(" "),!1===t.loggedin?a("button",{on:{click:function(e){t.loginFacebook()}}},[t._v("Login with Facebook")]):t._e(),t._v(" "),a("ul",t._l(t.userList,function(e){return a("li",[t._v("\n   "+t._s(e.name)+" is going to "+t._s(t.currentDest)+"\n")])})),t._v(" "),a("div",{attrs:{id:"myMap"}})],2)},staticRenderFns:[]},y=a("VU/8")(f,_,!1,function(t){a("k2Qq")},"data-v-03305fba",null).exports,b={name:"Detail",data:function(){return{name:this.$route.params.cityName,Descript:"None descrypt",ImageURL:"None Picture",msg:"Welcome to Parro Map"}},beforeMount:function(){for(var t=0;t<p.a.length;t++)p.a[t].cityName===this.name&&(this.Descript=p.a[t].cityDescription,this.ImageURL=p.a[t].cityImageURLs)}},w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"detail"},[e("h1",[this._v(this._s(this.$route.params.cityName))]),this._v(" "),e("router-link",{attrs:{to:"/"}},[this._v("Back")]),this._v(" "),e("h2",[this._v(this._s(this.Descript))]),this._v(" "),e("img",{attrs:{src:this.ImageURL,alt:"Some Picture"}})],1)},staticRenderFns:[]},L=a("VU/8")(b,w,!1,function(t){a("PIUM")},"data-v-40a02c5c",null).exports;i.a.use(s.a);var k=new s.a({routes:[{path:"/hello",name:"hello",component:c},{path:"/detail/:cityName",name:"detail",component:L},{path:"/",name:"homeview",component:y}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:k,template:"<App/>",components:{App:o}})},PIUM:function(t,e){},YkCc:function(t,e){t.exports=[{cityName:"Malacca",country:"Malaysia",matched:!1,cityDescription:"Before the arrival of the first Sultan, Malacca was a fishing village inhabited by local known as Orang Laut. Malacca was founded by Parameswara, also known as Iskandar Shah, the last Raja of Temasek (present day Singapore) following a Majapahit attack in 1377. He found his way to Malacca around 1400 where he found a good port—it was accessible in all seasons and on the strategically located narrowest point of the Malacca Straits",cityLocation:{lat:2.2373723,lng:102.1114169},cityImageURLs:"http://malacca.attractionsinmalaysia.com/img/photoState/malacca/theStadthuys/6.jpg"},{cityName:"Singapore",country:"Singapore",matched:!1,cityDescription:"Singapore, an island city-state off southern Malaysia, is a global financial center with a tropical climate and multicultural population. Its colonial core centers on the Padang, a cricket field since the 1830s and now flanked by grand buildings such as City Hall, with its 18 Corinthian columns. In Singapore's circa-1820 Chinatown stands the red-and-gold Buddha Tooth Relic Temple, said to house one of Buddha's teeth.",cityLocation:{lat:1.3440852,lng:103.6839563},cityImageURLs:""},{cityName:"Hanoi",country:"Thailand",matched:!1,cityDescription:"Hanoi, the capital of Vietnam, is known for its centuries-old architecture and a rich culture with Southeast Asian, Chinese and French influences. At its heart is the chaotic Old Quarter, where the narrow streets are roughly arranged by trade. There are many little temples, including Bach Ma, honoring a legendary horse, plus Đồng Xuân Market, selling household goods and street food.",cityLocation:{lat:21.022736,lng:105.8019441},cityImageURLs:"http://static.asiawebdirect.com/m/bangkok/portals/vietnam/shared/teasersL/hanoi/top10-hanoi/top10-hanoi-shopping/teaserMultiLarge/imageHilight/shopping-hanoi.jpg"}]},k2Qq:function(t,e){},nbjv:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),a.d(e,"config",function(){return i});var i={apiKey:"AIzaSyC2nJavmLjDO1-xBk5_R0c7a-e3sWz02sA",authDomain:"deployment-app-bb739.firebaseapp.com",databaseURL:"https://deployment-app-bb739.firebaseio.com",projectId:"deployment-app-bb739",storageBucket:"deployment-app-bb739.appspot.com",messagingSenderId:"26863422581"}}},["NHnr"]);
//# sourceMappingURL=app.62dc73893f6c1a73e1c6.js.map