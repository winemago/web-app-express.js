function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(200,200);

    document.getElementById('geolocate').addEventListener('click', event => {
        if(!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(async (pos) => {
                console.log(pos.coords);
                let lat = pos.coords.latitude;
                let lon = pos.coords.longitude;
                document.getElementById('lat').innerText = lat;
                document.getElementById('lon').innerText = lon;

                video.loadPixels();
                const image64 = video.canvas.toDataURL();
                
                const username = document.getElementById('fname').value;

                
                const data = {lat,lon,username,image64};                            //create an object.
                const options = {                                   
                    method: 'POST',                                 //there r differents atributes but for basic we need this ones        
                    headers:{'Content-type':'application/json'},    //I specify that I'd send a json.
                    body: JSON.stringify(data),                     //body: where I packaging all my data, in this case I wanna send it as json string,
                };
                const response = await fetch('/api',options);            //in order to send a POST I need a second argument in fetch, a JSON.
                const dat = await response.json();
                console.log(dat);  


                drawmap(lat,lon,username,image64);        
            });
        }
        function drawmap(lat,long,username,image64){
            //init map
            const mymap = L.map('mapid').setView([0,0], 2);

            const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(mymap);


            const perfil = L.icon({
                iconUrl: image64,
                iconSize: [60, 42],
                iconAnchor: [25, 16],
                popupAnchor:  [2, -15]
              });
            const marker = L.marker([lat, long], { icon: perfil }).addTo(mymap);
            marker.bindPopup(`Hi there ${username}!`).openPopup();
              
            /*const circle = L.circle([lat, long], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(mymap);
            circle.*/
        }
    }); 
    

} 