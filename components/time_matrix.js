let math = require('mathjs')
let XMLHttpRequest = require('xhr2');
let request = new XMLHttpRequest();

request.open('POST', "https://api.openrouteservice.org/v2/matrix/foot-walking");

request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Authorization', '5b3ce3597851110001cf62488e507e8f47604f66ae8ba7a411f9f8bd');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    let array = JSON.parse(this.responseText);
    let choice = 'durations'; // durations ou distances
    //console.log(array[choice])
    const shorterPath = findShorterPath(array[choice]);
  }
};

//[[2.3556456565856934,48.787715911865234],[2.3691248893737793,48.79338073730469],[2.3862559,48.7928631]]

//Panthéon, Louvre, Palais Garnier, Notre Dame, Tour Eiffel

//Départ = Efrei
//[2.3637293404211572, 48.78866444019816]


const body = '{"locations":[[2.3637293404211572, 48.78866444019816],[2.345876560484267, 48.84801727953965],[2.336792290124982, 48.86138199771364],[2.33118053722843, 48.87295800734902],[2.3500903111989238, 48.854060768080885], [2.2942992564516613, 48.85914188295359]],"metrics":["distance","duration"]}';
const monumentsNames = ["Efrei", "Panthéon", "Louvre", "Palais Garnier", "Notre Dame", "Tour Eiffel"]
const monumentsMap = new Map();
const bodyArray = JSON.parse(body)
for (let i = 0; i < bodyArray.locations.length; i++){
  monumentsMap.set(i , [monumentsNames[i], bodyArray.locations[i][0], bodyArray.locations[i][1]]);
}

export default function returnDictionary(){
  return monumentsMap;
}
console.log(monumentsMap)

request.send(body);

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

  stringPath = monumentsMap.get(0)[0].toString();
  path.slice(1).forEach(element => {
    stringPath += '->'+monumentsMap.get(element)[0];
  });
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