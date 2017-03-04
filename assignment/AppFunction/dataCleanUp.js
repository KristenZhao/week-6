var bikeCrashParsed = JSON.parse(BikeCrash2014geoJSON2.json);
console.log(bikeCrashParsed);
// /*----------------------------------
// create a function to filter out only
// data points that have valid lat longs
// -----------------------------------*/
// var bikeCrashValid;
// var validPoints = function(data){
//   _.each(bikeCrash,)
// }
//var bikeCrashValid = bikeCrash.geometry
var bikeCrashTest = bikeCrashParsed.slice(0,10);
console.log(bikeCrashTest);
