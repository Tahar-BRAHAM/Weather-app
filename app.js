//declaring variables 
var searchButton = $('.search-btn');
var inputValue = $('.inputValue');
var arrayOfDesc = [];
var arrayOfTemp = [];

$(document).ready(function(){

//every changes will be after the click on the search button 

    searchButton.on("click",function(){
        console.log("click")
        var cityName = $("#input-text").val();
        if(cityName != ""){

            // 'GET'ting the request from the weather API using ajax method : ( $.ajax )  

            $.ajax({
                url:"https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&lang=en&appid=c4e477bbbadbc1ea649b6de02ab1cc4b&units=metric",
                type:"GET",
                dataType:"json",
                // getting each data from the JSON and assign it to variables
                success:function(data){

                    var city = data.name+", "+data.sys.country;
                    var temperature = Math.round(data.main.temp)+"°C";
                    var feelLike = "Feels like "+Math.round(data.main.feels_like)+"°C";
                    var desc = data.weather[0].description;
                    var iconId = data.weather[0].icon;
                    var humidity = data.main.humidity+" % of humidity";
                    var wind = Math.round(data.wind.speed)*3.6+" Km/h wind";

                    // pushing the weather descriptions to use them to change the background 

                    arrayOfDesc.push(desc);
                    arrayOfTemp.push(temperature);

                    // changing the background depending on the weather and displaying funny messages

                    for(var i=0;i<arrayOfDesc.length;i++){
                        if(arrayOfDesc[i]==="clear sky"){
                            $("body").css("background-image","url('./images/clear-sky.jpg')");
                            $("#comment").text("A sunny day is a happy day !")
                        }else if(arrayOfDesc[i]==="broken clouds"){
                            $("body").css("background-image","url('./images/broken-cloud.jpg')")
                            $("#comment").text("The sky might be nice today !")
                        }else if(arrayOfDesc[i]==="few clouds"){
                            $("body").css("background-image","url('./images/few-clouds.jpg')")
                        }else if(arrayOfDesc[i]==="shower rain"){
                            $("body").css("background-image","url('./images/shower-rain.jpg')")
                            $("#comment").text("Don't forget your umbrella !")
                        }else if(arrayOfDesc[i]==="rain"){
                            $("body").css("background-image","url('./images/rain.jpg')")
                            $("#comment").text("Don't wear your fancy shoes today !")
                        }else if(arrayOfDesc[i]==="thunderstorm"){
                            $("body").css("background-image","url('./images/thunderstorm.jpg')")
                            $("#comment").text("Don't go out, bad idea !")
                        }else if(arrayOfDesc[i]==="snow"){
                            $("body").css("background-image","url('./images/snow.jpg')")
                            $("#comment").text("So cold outside!")
                        }else if(arrayOfDesc[i]==="mist"){
                            $("body").css("background-image","url('./images/mist.jpg')")
                            $("#comment").text("Warning if you drive!")
                        }else if(arrayOfDesc[i]==="scattered clouds"){
                            $("body").css("background-image","url('./images/scattered-clouds.jpg')")
                        }else if(arrayOfDesc[i]==="overcast clouds"){
                            $("body").css("background-image","url('./images/overcast-clouds.jpg')")
                            $("#comment").text("Hmm maybe it will rain today")
                        }else if(arrayOfDesc[i]==="light snow"){
                            $("body").css("background-image","url('./images/light-snow.jpg')")
                            $("#comment").text("Perfect weather for a snow-ball fight!")
                        }else if(arrayOfDesc[i]==="light rain"){
                            $("body").css("background-image","url('./images/light-rain.jpg')")
                            $("#comment").text("It's okay, just a few drops !")
                        }else{
                            $("body").css("background-image","url('./images/default.jpg')")
                        }
                    };

                    for(var i=0;i<arrayOfTemp.length;i++){
                        if(arrayOfTemp[i]>30){
                            $("#comment").text("Too hot today, don't forget you sunscreen !")
                        }else if(arrayOfTemp[i]<0){
                            $("#comment").text("So cold today !!")
                        }else if(arrayOfTemp[i]<-10){
                            $("#comment").text("Stay in front of the chimney bro !")
                        }
                    }
                // appending the value of the jason elements to the html body tags

                    $("#cityLi").text(city);
                    $("#temperatureLi").text(temperature);
                    $("#feelsLike").html(feelLike);
                    $("#descriptionLi").text(desc);
                    $("#icon").attr("src","https://openweathermap.org/img/w/"+iconId+".png");
                    $("#humidityLi").text(humidity);
                    $("#windLi").text(wind);
                },
                // if the name of the city is wrong, a msg is displayed 
                error:function(data){
                    if(data.hasOwnProperty(cityName)!==true){
                        $("#cityLi").empty();
                        $("#descriptionLi").empty();
                        $("#icon").attr("class","far fa-times-circle");
                        $("#temperatureLi").empty();
                        $("#humidityLi").empty();
                        $("#windLi").empty();
                        $("#cityLi").text("wrong city! Try again!");
                    }
                }
            });
        }else{
            $("#cityLi").text("Field empty !");
            $("#descriptionLi").text("Tap your city above");
    };
});
}); 