const math = require('mathjs');
const XMLHttpRequest = require('xhr2');

const adress = require('./monuments.json');

export function getMonuments() {
  const allMonumentsMap = new Map();
  /*
  for (let i = 0; i < adress.length; i++) {
    const coordonates = await getLocation(adress[i].Nom);
    allMonumentsMap.set(i , [adress[i].Nom, ...coordonates]);
    let stringcoord = {
      Nom : adress[i].Nom,
      Ville : adress[i].Ville,
      Latitude : coordonates[1],
      Longitude : coordonates[0]
    }
    let jsonCoord = JSON.stringify(stringcoord);  
    //adress[i].writeFile('./monuments.json', jsonCoord)
  }
  */
  for (let i = 0; i < adress.length; i++) {
    allMonumentsMap.set(i , adress[i]);
    }
  return allMonumentsMap;
}

async function getLocation(name) {
  try {
    const res = await fetch(
      'https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248cd2222fda36d44e7bbe890f25103028c&text='+name+'&focus.point.lon=48.85967&focus.point.lat=2.34703&sources=openstreetmap&size=1&boundary.country=FR',
      {
        method: 'GET',
        headers: {'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'}
      }
    );
    const json = await res.json();
    return json.features[0].geometry.coordinates;
  } catch(e) {
    console.log('Failed to load', name)
    return [2.34703, 48.85967];
  }
}



let requestMatrix = new XMLHttpRequest();

requestMatrix.open('POST', "https://api.openrouteservice.org/v2/matrix/foot-walking");

requestMatrix.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
requestMatrix.setRequestHeader('Content-Type', 'application/json');
requestMatrix.setRequestHeader('Authorization', '5b3ce3597851110001cf62488e507e8f47604f66ae8ba7a411f9f8bd');

requestMatrix.onreadystatechange = function () {
  if (this.readyState === 4) {
    let array = JSON.parse(this.responseText);
    //console.log(array)
    let choice = 'durations'; // durations ou distances
    const shorterPath = findShorterPath(array[choice]);
  }
};

//requestMatrix.send();

function findShorterPath(adjMatrix){
  let FloydWarshall = require('floyd-warshall');
  let distMatrix = new FloydWarshall(adjMatrix).shortestPaths;
  //Getting the shortest path between each point with the Floyd-Warshall algorithm
  
  //Now we're looking for the shortest path passing through all points once
  times = [0];
  path = [0];
  currentPlace = 0;
  while (path.length < distMatrix.length-1) {
    currentPlace = path.slice(-1);
    nextPlaceTime = getMinimum(distMatrix[currentPlace], times)[0];
    nextPlaceIndex = getMinimum(distMatrix[currentPlace], times)[1];
    times.push(nextPlaceTime);
    path.push(nextPlaceIndex);
  }

  for (let i = 0; i < distMatrix.length; i++) {
    if (nin(path, i)) {
      path.push(i);
      times.push(distMatrix[i, path.slice(-1)]);
    }
    
  }
  console.log("path : "+path);
  console.log("times : "+times);
  stringPath = monumentsMap.get(0)[0].toString();
  path.slice(1).forEach(element => {
    stringPath += '->'+monumentsMap.get(element)[0];
  });
  console.log(stringPath);
  console.log(totalTime(times));
}

function getMinimum(vector, times) {
  let min = 1000000;
  let position = 1000000;
  for (let i = 0; i < vector.length; i++) {
    if ((vector[i]<min) && nin(times, vector[i]) && (vector[i] != 0)) {
      min = vector[i];
      position = i;
    }
  }
  return [min, position];
}

function nin (list, element){
  if (list.includes(element)){
    return false;
  }else{
    return true;
  }
}

function totalTime(times) {
  let total = 0.0;
  times.forEach(time => {
    total += parseFloat(time);
  });
  total = total*0.65;
  h = math.floor(total/3600);
  min = math.floor((total%3600)/60)
  if(math.floor(total%60) >= 30){
    min += 1;
  }
  return h+" heures et "+min+" minutes";
}


// code Kais
/* VARIABLES */
var R = 6371 ; /* Radius of earth [km] */
var rayon = 15; /* en km */
var position = [48.78865493647841, 2.3638224559004315]; /* coordonnées Efrei Paris [latitude, longitude] */


function radian(delta){
    return delta * Math.PI / 180;
}


function distance (lat1, long1, lat2, long2){ /* calcul de la distance avec la formule de haversine */
    var delta_lat = radian(lat2 - lat1);
    var delta_long = radian(long2 - long1);
    var a = Math.pow(Math.sin(delta_lat / 2), 2) + Math.cos(radian(lat1)) * Math.cos(radian(lat2)) * Math.pow(Math.sin(delta_long/2), 2);
    var c = 2 * Math.atan(Math.sqrt(a) / Math.sqrt(1-a));
    var distance = R * c ;
    console.log("a :", a, "c :", c);
    return distance;
}

export function monumentsInRadius(positionLat, positionLong, rayon){
    rayon = rayon/1000;
    console.log(rayon);
    const monumentsMap = getMonuments();
    const liste_monuments = new Map();
    monumentsMap.forEach((value,key) => {
      console.log(value);
      if (distance(positionLat, positionLong, value.Latitude, value.Longitude) <= rayon){
        liste_monuments.set(key,[value.Nom, value.Longitude, value.Latitude]);
      }
    })
    return liste_monuments;
}