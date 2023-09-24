var btn = $('.getweather')
var txt = $('#text')
var swwthr = $('.mainweather')
var frcst =$('.forcast')
var hstry =$('.history')

var locations = [];
var wthrobj = {
    days: [], 
    temp: [],
    windspeed: [],
    humidity: [],
    icons:[]

}
var retrived = JSON.parse(localStorage.getItem('history')) 
nwret =  Array.from(new Set(retrived))
locations = nwret
console.log(locations)
console.log(typeof locations)
function bttns(e){
    console.log(e.target.innerText)
    coords(e.target.innerText)
}
function dsphis(){
    for(x = 0; x <locations.length; x++){
        hstry.append('<p>'+locations[x]+'</p>')
        // console.log(locations[x])

    }

}
function getweather(){
    plctext = txt.val()
    
    var nwtxt =JSON.stringify(plctext)
    console.log(nwtxt)
    console.log(typeof nwtxt)
    coords(plctext)

}

function futur(){
    frcst.empty();
    // frcst.prepend('<h1>'+'5 Day Forcast'+'</h1>')
    for(var x = 0; x < 5; x++){
        frcst.append('<article class="block testing'+ x +'" '+' syle = margin-left:10px>'+'</article>')
        // var wsh = $('.testing')
        // wsh.append( '<p>' + wthrobj.days[x]+'</p>');
        // wsh.append( '<p>' + wthrobj.temp[x]+'</p>');
        // wsh.append( '<p>' +  wthrobj.windspeed[x]+'</p>');
        // wsh.append( '<p>' +  wthrobj.humidity[x]+'</p>');
        
    }
    
    for(var x = 0; x < 5; x++){
    var wsh = $('.testing'+ x)
    var iconurl = 'http://openweathermap.org/img/w/'+ wthrobj.icons[x] +'.png'
    wsh.append( '<p syle = margin-left:10px>' + wthrobj.days[x]+'</p>');
    // wsh.append( '<p syle = margin-left:10px>' + wthrobj.temp[x]+'</p>');
    wsh.append( '<img src ='+iconurl+'>' + wthrobj.temp[x]+'</img>');
    wsh.append( '<p syle = margin-left:10px>' +  wthrobj.windspeed[x]+'</p>');
    wsh.append( '<p syle = margin-left:10px>' +  wthrobj.humidity[x]+'</p>');
    }


}

function coords(plctext){
    var target = plctext
    locations.push(plctext)
    localStorage.setItem('history', JSON.stringify(locations))
// $.get("http://api.openweathermap.org/geo/1.0/direct?q="+target+"&appid=83b0d84117b0611cf75759d190e0a63f", function(data){
    // $(".result").html(data)
    $.ajax({
        url: "https://api.openweathermap.org/geo/1.0/direct?q="+target+"&appid=83b0d84117b0611cf75759d190e0a63f",
        dataType: 'json',
        success:function(data){
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(data)
    weather(lat,lon,data[0].name)
        }


})
}
function test(){
    // var stuff = localStorage.getItem('temp');
    // console.log(stuff)
    console.log(wthrobj.temp[3])
    console.log(wthrobj)

}

function weather(lat, lon,target){
// $.get('https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid=83b0d84117b0611cf75759d190e0a63f', function(data){
    $.ajax({
        url: 'https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid=83b0d84117b0611cf75759d190e0a63f',
        dataType: 'json',
        success:function(data){
        swwthr.empty();
        var date = new Date()
        day = date.getDate()
        month = date.getMonth() + 1
        year = date.getFullYear()
        var curday = month + '/' + day + '/'+ year;
        
        // wthrobj.temp = data.current.temp;
        // wthrobj.humidity = data.current.humidity;
        // wthrobj.windspeed = data.current.wind_speed;
        for(var x = 0; x < 5; x++){
            var day2 = day + x + 1;
            var curday2 = month + '/' + day2 + '/'+ year
            wthrobj.days[x] = curday2;
            wthrobj.temp[x] = data.daily[x].temp.day;
            wthrobj.windspeed[x] = data.daily[x].wind_speed  + ' ';
            wthrobj.humidity[x] = data.daily[x].humidity + ' ';
            wthrobj.icons[x] = data.daily[x].weather[0].icon;
        }
        console.log(data)
        var imgcd = data.current.weather[0].icon;
        var iconurl = 'http://openweathermap.org/img/w/'+ imgcd +'.png'

        swwthr.prepend('<p>'+'Humidity: '+ data.current.humidity+ '%'+'</p>')
        swwthr.prepend('<p>'+'Wind: '+ data.current.wind_speed+ 'MPH' + '</p>')
        swwthr.prepend('<p>'+'Temp:'+ data.current.temp+ 'F'+'</p>')
        // swwthr.prepend('<img src ='+iconurl+'>'+ '</img>')
        // swwthr.prepend('<p>'+'('+ curday+')'+ '</p>')
        swwthr.prepend('<h2>'+ target+' '+ '('+ curday+')'+ '<img src ='+iconurl+'>'+ '</img>'+'</h2>')
        
        // console.log(curday)
        // console.log(data.current.temp)
        // console.log( wthrobj.temp)
        // console.log(data.current.wind_speed)
        // console.log(data.current.humidity)
        localStorage.setItem('temp', data.current.temp )
        test()
        futur()
        return wthrobj.temp;
    }
})


}

dsphis()
getweather()
test()
hstry.on('click', bttns)
// coords();
btn.on('click', getweather)