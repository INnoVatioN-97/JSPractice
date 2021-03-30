const weather = document.querySelector(".js-weather"); 

const COORDS = 'coords';
const API_KEY = '1ffe25225a402e192a7cedcc5cfbdd06';

function getWeather(lat, lon){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
      return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        
        weather.innerText =`현재 위치 : ${place} / 온도 : ${temperature}`;
    });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj ={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Can\'t access geo location... sad');
}
function askForCoord(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoord();
    }else{
        askForCoord();
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    // console.log(API_KEY);
    loadCoords();
}

init();