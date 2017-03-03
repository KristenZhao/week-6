/* ================================
Week 6 Assignment: Basic Application

Take a look at the midterm prototype: https://marvelapp.com/bf2c9h/screen/10434841
Try clicking on the "Next" and "Previous" buttons. This task will ask you to write some functions
that will enable us to write an application like in the midterm.

Write three functions: clickNextButton, clickPreviousButton, and saySlideName.
clickNextButton and clickPreviousButtons should simulate what will happen when someone clicks
on a next or previous button in your application.

You don't need to create HTML buttons or a useable application—this exercise is asking you to create
functions that will be used in your application. To test it out, try calling the functions in your
console. For example, try running: clickNextButton() and see what it does. Use lots of console logs!
================================ */
/* =====================
STEP 1 - Leaflet Configuration
===================== */
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 11,
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* ===============================
STEP 2 - functions
==============================*/

var state = {
  "slideNumber": 0, // slideNumber keeps track of what slide you are on. It should increase when you
                    // click the next button and decrease when you click the previous button. It
                    // should never get so large that it is bigger than the dataset. It should never
                    // get so small that it is smaller than 0.
  "slideData": [
    {
      "name": "Overview",
      "content": "Philadelphia Bike Crashes with vehicles in 2014",
      "data overview": bikeCrash2014
    },
    {
      "name": "Bike Crash winter (Dec,Jan,Feb)",
      "language": "Javascript",
      "namespace": "_"
    },
    {
      "name": "Bike Crash spring (Mar,Apr,May)",
      "language": "Javascript",
      "namespace": "$"
    },
    {
      "name": "Bike Crash summer(Jun,Jul,Aug)",
      "language": "Javascript",
      "namespace": "L"
    },
    {
      "name": "Bike Crash fall(Sep,Oct,Nov)",
      "language": "Javascript",
      "namespace": "_"
    },
    {
      "name": "Bike Crash conclusion",
      "language": "Javascript",
      "namespace": "$"
    }
  ]
};

/* ===============================
STEP 3 - button functions
==============================*/
var clickNextButton = function() {
  state.slideNumber += 1;
  if (state.slideNumber < state.slideData.length-1){
    console.log('state.slideNumber: '+state.slideNumber);
    console.log("content "+state.slideData[state.slideNumber].name);
    $("#back").prop("disabled",false);
    $("#back-to-initial").prop("disabled",false);
  } else{
    console.log('state.slideNumber: '+state.slideNumber);
    console.log("content "+state.slideData[state.slideNumber].name);
    console.log('reached last page!');
    $("#next").prop("disabled",true);
    $("#to-the-end").prop("disabled",true);
  } return ($(".description").text("page number: "+state.slideNumber));
};

var clickPreviousButton = function() {
  state.slideNumber -=1;
  if (state.slideNumber > 0){
    console.log("state.slideNumber: "+state.slideNumber);
    console.log("content: "+state.slideData[state.slideNumber].name);
    $("#next").prop("disabled",false);
    $("#to-the-end").prop("disabled",false);
  } else{
    console.log('reached first page!');
    console.log("content "+state.slideData[state.slideNumber].name);
    $("#back").prop("disabled",true);
    $("#back-to-initial").prop("disabled",true);
  } return ($(".description").text("page number: "+state.slideNumber));
};

var theEndButton = function(){
    state.slideNumber = state.slideData.length-1;
    console.log('state number:'+state.slideData[state.slideNumber].name);
    $("#next").prop("disabled",true);
    $("#to-the-end").prop("disabled",true);
    $("#back").prop("disabled",false);
    $("#back-to-initial").prop("disabled",false);
    return ($(".description").text("page number: "+state.slideNumber));
};

var theFrontButton = function(){
    state.slideNumber = 0;
    console.log('state number:'+state.slideData[state.slideNumber].name);
    $("#next").prop("disabled",false);
    $("#to-the-end").prop("disabled",false);
    $("#back").prop("disabled",true);
    $("#back-to-initial").prop("disabled",true);
    return ($(".description").text("page number: "+state.slideNumber));
};

/* ===============================
STEP 4 - add content, change to a more legible icon
==============================*/
// convert to geoJSON, point features. and set style.
var makeMarkers = function(parsed) {
  var markersArray = _.map(parsed,function(parsedItem){
  console.log('L.marker:',L.marker([parsedItem.geometry.y,parsedItem.geometry.x]));
  return L.marker([parsedItem.geometry.y,parsedItem.geometry.x]);
  }); return markersArray;
};

var plotMarkers = function(markers) {
  _.map(markers,function(marker){marker.addTo(map);
  });
};

var newIcon = {};
// try point to layer
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};



////////////////
$(document).ready(function() {
    /* ===============================
    Page 1: add Bike Crash Map, disable buttons
    ==============================*/
    // var markers = makeMarkers(bikeCrash);
    // plotMarkers(markers);
    console.log("bike crash test",bikeCrashTest);
    L.geoJson(bikeCrashTest, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker([bikeCrashTest.geometry.y,bikeCrashTest.geometry.x], geojsonMarkerOptions);
      }
    }).addTo(map);


    $("#back").prop("disabled",true);
    $("#back-to-initial").prop("disabled",true);
    console.log(state.slideNumber);
    $(".description").text("page number: "+state.slideNumber); //?? why cannot print slideNumber?? need to use + not ,!!

    // Button Events
    $("#next").click(function(ev){
      clickNextButton();
      //console.log("both button are working!");
    });
    $("#back").click(function(event){
      clickPreviousButton();
    });
    $("#to-the-end").click(function(event){
      theEndButton();
    });
    $("#back-to-initial").click(function(event){
      theFrontButton();
    });
    // featureGroup = L.geoJson(parsedData, {
    //   style: myStyle,
    //   filter: myFilter
    // }).addTo(map);
    //
    // // quite similar to _.each
    // featureGroup.eachLayer(eachFeatureFunction);
});
