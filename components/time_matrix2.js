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
      return findShorterPath(json.durations, selectedMonuments, positionLat, positionLong);
    } catch(e) {
      console.log('Failed request', e)
      return [];
    }
    
  }


  function monumentsInRadius(positionLat, positionLong, rayon){
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