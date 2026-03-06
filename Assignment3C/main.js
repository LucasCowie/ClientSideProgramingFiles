// IIFE
console.log("JS is running");
(() => {

    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([44.650627, -63.597140], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    L.marker([44.650690, -63.596537]).addTo(map)
        .bindPopup('This is a sample popup. You can put any html structure in this including extra bus data. You can also swap this icon out for a custom icon. A png file has been provided for you to use if you wish.')
        .openPopup();
})()
async function getBusData(){
    try{
        const url = "https://prog2700.onrender.com/hrmbuses";
        const response = await fetch(url);
        responseCheck(response); //response error handing
        const data = await response.json();

        return data;
    }catch(error){
        console.log(error);
    }
}
function responseCheck(res){
    if(!res.ok){
        throw new Error("Response Error: "+res.status);
    }
}
async function getRoute1x10(){
    try{
        let busData = await getBusData();
        let busRoutes = /^([1-9]|10)$/gi;
        let bus10 = busData.entity.filter(b => busRoutes.test(b.vehicle.trip.routeId));//b.vehicle.trip.routeId && b.vehicle.trip.routeId.includes(busRoutes))
        console.log(bus10);
        return bus10;
    }catch(error){
        console.log(error);
    }
}
getRoute1x10()


