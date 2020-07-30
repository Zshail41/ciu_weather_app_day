var dia = document.getElementById('dia')
var temp = document.getElementById('temp')
var maxTemp = document.getElementById('maxTemp')
var minTemp = document.getElementById('minTemp')
var humidity = document.getElementById('humidity')
var pressure = document.getElementById('pressure')
var wind_speed = document.getElementById('wind_speed')
var fullDate = document.getElementById('fullDate')
var divSunrise =document.getElementById('sunrise')
var divSunset = document.getElementById('sunset')
var diveDayTime = document.getElementById('dayTime')
var mañana = document.getElementById('mañana')
var pasado = document.getElementById('pasado')
var pasado2 = document.getElementById('pasado2')
 


  


fetch('https://api.openweathermap.org/data/2.5/onecall?lat=-34.5708&lon=-58.6243&units=metric&appid=15b7d4f5fc82a16005bd8b8b7a0048c4')
    .then(clima => {return clima.json()})
    .then(datos)
;

function datos(clima){
    console.log(clima)

    let now = new Date();
    let date = document.getElementById('fullDate')
    
    var sunrise = `${clima.current.sunrise}`
    var sunset = `${clima.current.sunset}`
    var date_sunrise = new Date(sunrise*1000)
    var date_sunset = new Date(sunset*1000)
    
   
    

    date.innerHTML = (dateBuilder(now)) + '<br>' + now.getHours() + ':' + minutes(now.getMinutes()) + now.getMinutes()  + pmAm(now.getHours());
    

    dia.innerHTML = '<img id="icon" src="">' +  `${clima.current.weather[0].main}`

    var iconImg = document.getElementById('icon')
    
    
    iconImg.src = `http://openweathermap.org/img/wn/${clima.current.weather[0].icon}@2x.png`
    
    temp.innerHTML =  (`${Math.round(clima.current.temp)}`) + '°C'
    maxTemp.innerHTML =  (`${clima.daily[0].temp.max}`) + '°C ' + '&nbsp' + ' <img id="tiempo" src= "maxTemp.png">' 
    minTemp.innerHTML = (`${clima.daily[0].temp.min}`) + '°C' + '&nbsp' + ' <img id="tiempo" src= "minTemp.png">'
    humidity.innerHTML = '<img id="tiempo" src= "humedad.png">'  + '&nbsp' + (`${clima.current.humidity}`) + '%' +  '<br>' + '&nbsp' +   'Humedad'
    pressure.innerHTML = '<img id="tiempo" src= "presion.png">' + '&nbsp' + (`${clima.current.pressure}`) + ' mBar' + '<br>' +   'Presión'  
    wind_speed.innerHTML = '<img id="tiempo" src= "wind.png">' + '&nbsp' + (`${clima.current.wind_speed * 3.6}`) + ' km/h' + '<br>' +   'Viento'
    divSunrise.innerHTML = '<img id="tiempo" src= "sunrise.png">' + '&nbsp' + date_sunrise.getHours() + ':' + minutes(date_sunrise.getMinutes()) + date_sunrise.getMinutes()  + pmAm(date_sunrise.getHours()) + '<br>' + 'Sunrise'
    divSunset.innerHTML =  '<img id="tiempo" src= "sunset.png">' + '&nbsp' + date_sunset.getHours() + ':' + minutes(date_sunset.getMinutes()) + date_sunset.getMinutes() + pmAm(date_sunset.getHours()) + '<br>' + 'Sunset'
    diveDayTime.innerHTML = '<img id="tiempo" src= "dayTime.png">' + '&nbsp' + dayTimeH(date_sunset.getHours() - date_sunrise.getHours(), clima) + ":"  +  minutes(dayTimeMin(date_sunrise.getMinutes() + date_sunset.getMinutes(), clima)) + dayTimeMin(date_sunrise.getMinutes() + date_sunset.getMinutes(), clima) + pmAm(dayTimeH(date_sunset.getHours() - date_sunrise.getHours(), clima)) + '<br>' + 'DayTime'


    mañana.innerHTML = '<img id="icon1" src="">' + sliderBuilder (now, 1, 1) + '<br>' + `${clima.daily[1].weather[0].main}`
    pasado.innerHTML = '<img id="icon2" src="">' + sliderBuilder (now, 2, 2) + '<br>' + `${clima.daily[2].weather[0].main}`
    pasado2.innerHTML = '<img id="icon3" src="">' + sliderBuilder (now, 3, 3) + '<br>' + `${clima.daily[3].weather[0].main}`
    

    var iconImg1 = document.getElementById('icon1')
    var iconImg2 = document.getElementById('icon2')
    var iconImg3 = document.getElementById('icon3')

    iconImg1.src = `http://openweathermap.org/img/wn/${clima.daily[1].weather[0].icon}@2x.png`
    iconImg2.src = `http://openweathermap.org/img/wn/${clima.daily[2].weather[0].icon}@2x.png`
    iconImg3.src = `http://openweathermap.org/img/wn/${clima.daily[3].weather[0].icon}@2x.png`
}

function dateBuilder (d){
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let days = ["Domingo,", "Lunes,", "Martes,", "Miercoles,", "Jueves,", 
    "Viernes,", "Sabado,"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


function sliderBuilder (d, num, num2){
    let days = ["Domingo,", "Lunes,", "Martes,", "Miercoles,", "Jueves,", 
    "Viernes,", "Sabado,"];

    if(d.getDay() + num > 6){
        num += d.getDay()
        num -= 7
        
    } else {
        num += d.getDay()
    }

    let day = days[num];
    let date = new Date();
    let maniana = new Date(date)
    maniana = maniana.getDate(maniana.setDate(maniana.getDate()+ num2))
    

    return `${day}` + `${maniana}` ;
}

function pmAm (h){
    if(h >= 0 & h < 12){
        return 'AM'
    } else return 'PM'
}

function minutes(m){
    if(m < 10){
        return '0'
    } else return ''
}

function dayTimeH(h, clima){
    var sunrise = `${clima.current.sunrise}`
    var sunset = `${clima.current.sunset}`
    var date_sunrise = new Date(sunrise*1000)
    var date_sunset = new Date(sunset*1000)
    

    if((date_sunset.getMinutes() - date_sunrise.getMinutes()) < 0){
        return h - 1
    } else {
        return h
    }
}

function dayTimeMin(h, clima){
    var sunrise = `${clima.current.sunrise}`
    var sunset = `${clima.current.sunset}`
    var date_sunrise = new Date(sunrise*1000)
    var date_sunset = new Date(sunset*1000)
    

    var extra = 60 - date_sunrise.getMinutes()


    if(extra + date_sunset.getMinutes() >= 60){

        return extra + date_sunset.getMinutes() - 60
    }
        else  {
            return extra + date_sunset.getMinutes()
        }

    
   
}

