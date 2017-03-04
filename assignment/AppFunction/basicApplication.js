/* ================================
Midterm Project

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
  center: [39.97, -75.16],
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
var winterFilter = function(data){
  var condition;
  if (data.properties.CRASH_MONT === '12'||
      data.properties.CRASH_MONT === "1"||
      data.properties.CRASH_MONT === "2"){
    condition = true;
  } else {
    condition = false;
  }
  return condition;
};

var state = {
  "slideNumber": 0, // slideNumber keeps track of what slide you are on. It should increase when you
                    // click the next button and decrease when you click the previous button. It
                    // should never get so large that it is bigger than the dataset. It should never
                    // get so small that it is smaller than 0.
  "slideData": [
    {
      "name": "All crashes that involved with bike and cars", //<h2>
      "content": "There are 551 crashes in 2014. The majority of accidents happened" +
      "in the Center City and the University City area.", //<p>
      "page": "1 of 6",
      "map" : function (data){
                L.geoJson(data, {
                pointToLayer: function (point,style) {
                //console.log("index", index);
                  return L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]], geojsonMarkerOptions);
                }
              }).addTo(map);
            }
    },
    {
      "name": "Winter months (Dec,Jan,Feb)",
      "content": "In winter, bike crashes are concentrated in the center city area",
      "page": "2 of 6",
      "map" : function (data){
                L.geoJson(data, {
                  filter: winterFilter,
                  pointToLayer: function (point,style) {
                  //console.log("index", index);
                    return L.circleMarker([point.geometry.coordinates[1],point.geometry.coordinates[0]], geojsonMarkerOption_Winter);
                }
              }).addTo(map);
            }
    },
    {
      "name": "Spring months (Mar,Apr,May)",
      "content": "spring crash",
      "page": "3 of 6"
    },
    {
      "name": "Summer months (Jun,Jul,Aug)",
      "content": "summer crash",
      "page": "4 of 6"
    },
    {
      "name": "Fall months(Sep,Oct,Nov)",
      "content": "fall crash",
      "page": "5 of 6"
    },
    {
      "name": "Bike Crash Conclusion",
      "content": "conclusion",
      "page": "6 of 6"
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
  }
  var pageState = [
    $(".subtitle").text(state.slideData[state.slideNumber].name),
    $(".description").text(state.slideData[state.slideNumber].content),
    $(".page").text("page: " +state.slideData[state.slideNumber].page),
  ];
  return (pageState);
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
  }
  var pageState = [
    $(".subtitle").text(state.slideData[state.slideNumber].name),
    $(".description").text(state.slideData[state.slideNumber].content),
    $(".page").text("page: " +state.slideData[state.slideNumber].page)
  ];
  return (pageState);
};

var theEndButton = function(){
    state.slideNumber = state.slideData.length-1;
    console.log('state number:'+state.slideData[state.slideNumber].name);
    $("#next").prop("disabled",true);
    $("#to-the-end").prop("disabled",true);
    $("#back").prop("disabled",false);
    $("#back-to-initial").prop("disabled",false);
    var pageState = [
      $(".subtitle").text(state.slideData[state.slideNumber].name),
      $(".description").text(state.slideData[state.slideNumber].content),
      $(".page").text("page: " +state.slideData[state.slideNumber].page)
    ];
    return (pageState);
};

var theFrontButton = function(){
    state.slideNumber = 0;
    console.log('state number:'+state.slideData[state.slideNumber].name);
    $("#next").prop("disabled",false);
    $("#to-the-end").prop("disabled",false);
    $("#back").prop("disabled",true);
    $("#back-to-initial").prop("disabled",true);
    var pageState = [
      $(".subtitle").text(state.slideData[state.slideNumber].name),
      $(".description").text(state.slideData[state.slideNumber].content),
      $(".page").text("page: " +state.slideData[state.slideNumber].page)
    ];
    return (pageState);
    //return ($(".description").text("page number: "+state.slideNumber));
};

/* ===============================
STEP 4 -  set crash point data styles
==============================*/
// get geoJSON
var bikeCrash = "https://gist.githubusercontent.com/KristenZhao/f2f81e81ed6a47fdbad77b072ffc178f/raw/c9df3da2ad89e9cc44c0f949a35bfc42426c659d/BikeCrash2014Simplified.json";
// set "all" style
var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#ff7800",
    color: "#eeeeee",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// set "all" style
var geojsonMarkerOption_Winter = {
    radius: 3,
    fillColor: "#2155a8",
    color: "#eeeeee",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


//////////////// Execution /////////////////
$(document).ready(function() {
    $.ajax(bikeCrash).done(function(data){
      //console.log(data);
      var parsedCrash = JSON.parse(data);
      var crashFeatures = parsedCrash.features;
      //console.log(crashFeatures[0].geometry.coordinates);

      /* ===============================
      Page 1: add Bike Crash Map, disable buttons
      ==============================*/
      //plot all crash onto initial page
      $(".subtitle").text(state.slideData[0].name);
      $(".description").text(state.slideData[0].content);
      $(".page").text("page: " +state.slideData[0].page);
      state.slideData[0].map(crashFeatures);
      remove(state.slideData[0].map(crashFeatures));

      $("#back").prop("disabled",true);
      $("#back-to-initial").prop("disabled",true);
      console.log(state.slideNumber);
      //$(".description").text("page number: "+state.slideNumber); //?? why cannot print slideNumber?? need to use + not ,!!

      // Button Events
      $("#next").click(function(ev){
        map.removeLayer(state.slideData[0]); // ??????????????????? don't know how to remove existing layers  ??????????????
        clickNextButton();
        state.slideData[state.slideNumber].map(crashFeatures);
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
  });
});
