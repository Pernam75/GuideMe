let XMLHttpRequest = require('xhr2');
let request = new XMLHttpRequest();


request.open('POST', "https://api.openrouteservice.org/v2/matrix/foot-walking");

request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Authorization', '5b3ce3597851110001cf62488e507e8f47604f66ae8ba7a411f9f8bd');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    let array = JSON.parse(this.responseText);
    console.log(this.responseText)
    let choice = 'durations'; // durations ou distances
    console.log('\n\n', choice, ' : ',array[choice]);
    findShorterPath(array[choice]);
  }
};

//[[2.3556456565856934,48.787715911865234],[2.3691248893737793,48.79338073730469],[2.3862559,48.7928631]]

//Panthéon, Louvre, Palais Garnier, Notre Dame, Tour Eiffel
const monumentsMap = new Map();
const body = '{"locations":[[2.345876560484267, 48.84801727953965],[2.336792290124982, 48.86138199771364],[2.33118053722843, 48.87295800734902],[2.3500903111989238, 48.854060768080885], [2.2942992564516613, 48.85914188295359]],"metrics":["distance","duration"]}';

request.send(body);


function findShorterPath (adjMatrix){
  let FloydWarshall = require('floyd-warshall');

  let distMatrix = new FloydWarshall(adjMatrix).shortestPaths;
  let returning_list = [];
  for (let i = 0; i < distMatrix.length; i++) {
    returning_list.push(getMinimum(distMatrix[i].slice(0, i+1)));
  }

  console.log(returning_list);
}


function getMinimum(vector) {
  let min = vector[0];
  for (let i = 1; i < vector.length; i++) {
       if(min == 0 || (vector[i] <= min && vector[i] != 0)){
           min = vector[i];
       }
  }
  return min;
}