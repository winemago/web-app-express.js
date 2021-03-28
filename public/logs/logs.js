async function GETdata(){
    const response = await fetch('/api');            
    const dat = await response.json();
    console.log(dat); 

    dat.data.forEach(element => {
        console.log(element);
        createDivInfo(element);
    }); 
}

document.getElementById('getall').addEventListener('click', event =>{
    GETdata();
})

async function GETbyname(){
    const response = await fetch('/api');            
    const data = await response.json();
    console.log(data);
    
    const name = document.getElementById('sname').value;
    data.data.forEach(element => {
        if(name === element.username){
            createDivInfo(element);
        }
    });
}
document.getElementById('getbyname').addEventListener('click', event =>{
    GETbyname();
})     

function createDivInfo(element){
        const info = document.createElement('div');
        const user = document.createElement('div');
        const lat = document.createElement('div');
        const lon = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        user.textContent = `Name: ${element.username}`;
        lat.textContent = `Latitude: ${element.lat}`;
        lon.textContent = `Longitude: ${element.lon}`;
        date.textContent = new Date(element.timestamp).toLocaleString();
        image.src = element.image64;

        info.style.padding = "2%";

        info.append(user,lat,lon,date,image);
        document.body.append(info);
}