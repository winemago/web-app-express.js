function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(300,300);
    video.position(1350, 80);

    const mymap = L.map('mapid').setView([0,0], 2);

    const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);

    world();
    setInterval(world,10000);

    document.getElementById('geolocate').addEventListener('click', event => {
        if(!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(async (pos) => {
            try{
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
                
                const perfil = L.icon({
                    iconUrl: image64,
                    iconSize: [60, 42],
                    iconAnchor: [25, 16],
                    popupAnchor:  [2, -15]
                  });
                const marker = L.marker([lat, lon], { icon: perfil }).addTo(mymap);
            }catch(error){
                console.error(error);
            }
            
            });
        }
    }); 
    
    async function world(){
        try{
            const response = await fetch('/api');
            const data = await response.json();
            console.log(data);
            
            data.data.forEach(item => {
                const perfil = L.icon({
                    iconUrl: item.image64,
                    iconSize: [60, 42],
                    iconAnchor: [25, 16],
                    popupAnchor:  [2, -15]
                });
                const marker = L.marker([item.lat, item.lon], { icon: perfil }).addTo(mymap);
            });  
        }catch(error){
            console.error(error);
        }
    }
} 

