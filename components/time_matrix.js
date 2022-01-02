const math = require('mathjs');
const XMLHttpRequest = require('xhr2');
const adress = require('./monuments.json');
//const fetch = require('node-fetch');
const { map } = require('mathjs');

//getMonumentsOrder(48.85684, 2.35009, 3000); // centre de Paris


export async function getMonumentsOrder(positionLat, positionLong, radius) {
  
  const selectedMonuments = monumentsInRadius(positionLat, positionLong, radius);
  if (selectedMonuments.size === 0){
    return[];
  }
  let locationsArray = [[positionLong, positionLat]]
  selectedMonuments.forEach((value, key) => {
    locationsArray.push([value[1], value[2]])
  });
  let body = '{"locations":['
  locationsArray.forEach((location, index) => {
    body += `[${location[0]},${location[1]}]${index < locationsArray.length-1 ? "," : ""}`;
  });
  body += '],"metrics":["distance","duration"]}'
  //const body = '{"locations":[[2.3637293404211572, 48.78866444019816],[2.345876560484267, 48.84801727953965],[2.336792290124982, 48.86138199771364],[2.33118053722843, 48.87295800734902],[2.3500903111989238, 48.854060768080885], [2.2942992564516613, 48.85914188295359]],"metrics":["distance","duration"]}'
  //console.log(body)  
  try {
    const res = await fetch(
      'https://api.openrouteservice.org/v2/matrix/foot-walking',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
          'Content-Type': 'application/json',
          'Authorization': '5b3ce3597851110001cf62488e507e8f47604f66ae8ba7a411f9f8bd',
        },
        body
      }
    );
    const json = await res.json();
    return findShorterPath(json.durations, selectedMonuments);
  } catch(e) {
    console.log('Failed request', e)
    return [];
  }
  
}


function getMonuments() {
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





function findShorterPath(adjMatrix, monumentsMap){
  let FloydWarshall = require('floyd-warshall');
  //console.log(adjMatrix);
  let distMatrix = new FloydWarshall(adjMatrix).shortestPaths;
  //Getting the shortest path between each point with the Floyd-Warshall algorithm
  
  //Now we're looking for the shortest path passing through all points once
  let times = [0];
  let path = [0];
  let currentPlace = 0;
  while (path.length < distMatrix.length) {
    currentPlace = path.slice(-1);
    times.push(getMinimum(distMatrix[currentPlace], path)[0]);
    path.push(getMinimum(distMatrix[currentPlace], path)[1]);
  }
  //console.log("path : "+path);
  //console.log("times : "+times);
  const result =  [{Nom : monumentsMap.get(0)[0], Longitude : monumentsMap.get(0)[1], Latitude : monumentsMap.get(0)[2], time:times[0]}];
  let i = 1;
  path.slice(1).forEach(element => {
    result.push({Nom : monumentsMap.get(element-1)[0], Longitude : monumentsMap.get(element-1)[1], Latitude : monumentsMap.get(element-1)[2], time:times[i]});
    i++;
  });
  //console.log(totalTime(times));
  //console.log(result);
  return result;
}

function getMinimum(vector, path) {
  let min = 1000000;
  let position = 1000000;
  for (let i = 0; i < vector.length; i++) {
    if ((vector[i]<min) && nin(path, i) && (vector[i] != 0)) {
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

export function totalTime(times) {
  let total = 0.0;
  times.forEach(time => {
    total += parseFloat(time);
  });
  total = total;
  h = math.floor(total/3600);
  min = math.floor((total%3600)/60)
  if(math.floor(total%60) >= 30){
    min += 1;
  }
  return h+" heures et "+min+" minutes";
}


// code Kais
/* VARIABLES */


function radian(delta){
    return delta * Math.PI / 180;
}


function distance (lat1, long1, lat2, long2){ /* calcul de la distance avec la formule de haversine */
    const R = 6371 ; /* Radius of earth [km] */
    const delta_lat = radian(lat2 - lat1);
    const delta_long = radian(long2 - long1);
    const a = Math.pow(Math.sin(delta_lat / 2), 2) + Math.cos(radian(lat1)) * Math.cos(radian(lat2)) * Math.pow(Math.sin(delta_long/2), 2);
    const c = 2 * Math.atan(Math.sqrt(a) / Math.sqrt(1-a));
    const distance = R * c ;
    return distance;
}

export function monumentsInRadius(positionLat, positionLong, rayon){
    rayon = rayon/1000;
    const monumentsMap = getMonuments();
    const liste_monuments = new Map();
    let i = 0;
    monumentsMap.forEach(value => {
      if (distance(positionLat, positionLong, value.Latitude, value.Longitude) <= rayon){
        liste_monuments.set(i,[value.Nom, value.Longitude, value.Latitude]);
        i++;
      }
    })
    return liste_monuments;
}