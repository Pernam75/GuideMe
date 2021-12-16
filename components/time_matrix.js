let XMLHttpRequest = require('xhr2');
let request = new XMLHttpRequest();


request.open('POST', "https://api.openrouteservice.org/v2/matrix/foot-walking");

request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Authorization', '5b3ce3597851110001cf62488e507e8f47604f66ae8ba7a411f9f8bd');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('\n\nHeaders:', this.getAllResponseHeaders());
    console.log('\n\nBody:', this.responseText);
  }
};

const body = '{"locations":[[2.3556456565856934,48.787715911865234],[2.3691248893737793,48.79338073730469],[2.3862559,48.7928631]],"metrics":["distance","duration"]}';

request.send(body);