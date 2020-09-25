let payload = '{"uwinloc":{"owner_id":"uwinloc"},"facets":[{"facet_id":"240c4d8f-c2eb-4d74-8dac-6e6fe6257203","facet_name":"tag","producer_id":"api","creation_time":"2019-10-25T15:28:59.042328+02:00","last_modification_time":"2019-10-25T15:28:59.042328+02:00","type_semantic":{"@context":"http://uwinloc.com","@type":"uwl.sem.tag"},"type_representation":"uwl.repr.tag","content":[{"ID":1234,"IsLandMark":false,"Pos":{"Cart":{"X":{"Pos":-26.87196988392871,"Acc":0},"Y":{"Pos":-2.3232603540908245,"Acc":0},"Z":{"Pos":-0.00005703233182430267,"Acc":0}},"LLA":{"Lat":-0.00002101032690404736,"Lon":-0.00024138895720227915,"Alt":160}},"Status":"ThreeD","Reliability":100,"Algorithm":"Placed","Filtered":false}],"flight_recorder":null}],"summary":[{"facet_id":"240c4d8f-c2eb-4d74-8dac-6e6fe6257203","status":"new"}],"history":null}';

let temp = JSON.parse(payload);

console.log(temp.facets[0].content[0]);

let locationObject = {
    facet_id : temp.facets[0].facet_id,
    last_modification_time : temp.facets[0].last_modification_time,
    lon : temp.facets[0].content[0].Pos.LLA.Lon,
    lat : temp.facets[0].content[0].Pos.LLA.Lat
}

let content = '{"ID":1234,"IsLandMark":false,"Pos":{"Cart":{"X":{"Pos":-26.87196988392871,"Acc":0},"Y":{"Pos":-2.3232603540908245,"Acc":0},"Z":{"Pos":-5.703233182430267e-5,"Acc":0}},"LLA":{"Lat":-2.101032690404736e-5,"Lon":-0.00024138895720227915,"Alt":160}},"Status":"ThreeD","Reliability":100,"Algorithm":"Placed","Filtered":false}'




// console.log(JSON.stringify(locationObject));

// console.log(JSON.parse(payload));

// console.log(Date.now())
console.log(JSON.parse(content));