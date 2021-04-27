var buttonEl = document.querySelector('#sbmt-btn');
var displaySecEl = document.querySelector('#display-div');
var inputEl = document.querySelector('#input-sbmt');
var projectionEl = document.querySelector('#projectionDiv');
var recoverEl = document.querySelector('#recover-btn');


var saveArr = [];


var saveInfo = function () {
    localStorage.setItem('inputs', saveArr);
}

var getInfo = function (event) {
 
    event.preventDefault();  

    var inputRead = inputEl.value; //input is defined here and therefore always is that value upon the function call.
    saveArr.push(inputRead);
    console.log(inputRead)   
    //I want to change the variable "inputRead" here to be the value of a localStorage item only if my "recoverInfo" event executes 
    //if("recoverInfo" is clicked){ replaceVariable(); }
    projectionEl.innerHTML = "";
     

    if (inputRead) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputRead + '&appid=1c82bb4d8f20db1e69a427f00d909415&units=imperial')
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        const lat = data.coord.lat;
                        const long = data.coord.lon;

                        if (inputRead) {
                            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=minutely,hourly&appid=1c82bb4d8f20db1e69a427f00d909415&units=imperial')
                                .then(function (response) {
                                    if (response.ok) {
                                        response.json().then(function (locationData) {
                                            console.log(locationData);
                                            console.log(data);
                                            displayInfo1(data, locationData);

                                        })
                                    }
                                })
                        }

                    });
                }
            });
    } else {
        alert("You need to enter a location");
    }


}

var displayInfo1 = function (data, locationData) {
    var container = document.createElement('div');
    container.setAttribute('class', 'card submission');
    displaySecEl.appendChild(container);

    var location = document.createElement("h2");
    location.textContent = data.name;
    container.appendChild(location);
    location.setAttribute('class', 'card-header')

    var dateEl = document.createElement("h3");
    var a = new Date(locationData.current.dt * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    dateEl.textContent = time;
    container.appendChild(dateEl);
    dateEl.setAttribute('class', '');

    var temp = document.createElement("p");
    temp.setAttribute('class', "");
    var tempCon = data.main.temp;
    temp.textContent = tempCon + " F";
    container.appendChild(temp);

    var feels = document.createElement("p");
    feels.setAttribute('class', "");
    var feelCon = data.main.feels_like;
    feels.textContent = "feels like " + feelCon + " F";
    container.appendChild(feels)

    var wind = document.createElement("p");
    wind.setAttribute('class', "");
    wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    container.appendChild(wind);

    if (data.weather[0].main === "Rain") {
        var image = document.createElement('img');
        image.setAttribute("src", "./assets/raining-svgrepo-com.svg");
        image.setAttribute('height', "100px");
        image.setAttribute('width', "100px");
        image.setAttribute('class', "card-image");
        container.appendChild(image);
    } else if (data.weather[0].main === "Clear") {
        var image = document.createElement('img');
        image.setAttribute("src", "./assets/lights-sun-svgrepo-com.svg");
        image.setAttribute('height', "100px");
        image.setAttribute('width', "100px");
        image.setAttribute('class', "card-image");
        container.appendChild(image);
    } else if (data.weather[0].main === "Clouds") {
        var image = document.createElement('img');
        image.setAttribute("src", "./assets/cloudy-svgrepo-com.svg");
        image.setAttribute('height', "100px");
        image.setAttribute('width', "100px");
        image.setAttribute('class', "card-image");
        container.appendChild(image);
    };

    if (locationData.current.uvi > 7) {
        container.setAttribute('id', 'high-risk')
    } else if (locationData.current.uvi > 6 && locationData.current.uvi < 7) {
        container.setAttribute('id', 'some-risk ');
    } else if (locationData.current.uvi < 6) {
        container.setAttribute('id', 'low-risk');
    };

        var humidity1 = document.createElement("p");
        humidity1.textContent = locationData.current.humidity + "% Humidity";
        container.appendChild(humidity1);

        var location2 = document.createElement("h2");
        location2.textContent = data.name;
        projectionEl.appendChild(location2);

        var container2 = document.createElement('div');
        container2.setAttribute('class', 'card submission');
        projectionEl.appendChild(container2);

        for (var i = 0; i < locationData.daily.length; i++) {

            var dateEl = document.createElement("h3");
            var a = new Date(locationData.daily[i].dt * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = date + ' ' + month + ' ' + year;
            dateEl.textContent = time;
            container2.appendChild(dateEl);
            dateEl.setAttribute('class', '');

            var temp2 = document.createElement("p");
            temp2.setAttribute('class', "");
            var tempCon2 = locationData.daily[i].temp.day;
            temp2.textContent = tempCon2 + " F";
            container2.appendChild(temp2);

            if (locationData.daily[i].weather[0].main === "Rain") {
                var image2 = document.createElement('img');
                image2.setAttribute("src", "./assets/raining-svgrepo-com.svg");
                image2.setAttribute('height', "100px");
                image2.setAttribute('width', "100px");
                image2.setAttribute('class', "card-image");
                container2.appendChild(image2);
            } else if (locationData.daily[i].weather[0].main === "Clear") {
                var image2 = document.createElement('img');
                image2.setAttribute("src", "./assets/lights-sun-svgrepo-com.svg");
                image2.setAttribute('height', "100px");
                image2.setAttribute('width', "100px");
                image2.setAttribute('class', "card-image");
                container2.appendChild(image2);
            } else if (locationData.daily[i].weather[0].main === "Clouds") {
                var image2 = document.createElement('img');
                image2.setAttribute("src", "./assets/cloudy-svgrepo-com.svg");
                image2.setAttribute('height', "100px");
                image2.setAttribute('width', "100px");
                image2.setAttribute('class', "card-image");
                container2.appendChild(image2);
            };

            var humidity = document.createElement("p");
            humidity.textContent = locationData.daily[i].humidity + "% Humidity";
            container2.appendChild(humidity);

            var windSpeed = document.createElement("p");
            windSpeed.textContent = locationData.daily[i].wind_speed + " MPH";
        }
saveInfo();
}

var replaceVariable = function() {
    var inputRead = "tucson"; //tucson would be replaced with the localStorage value
};

var recoverInfo = function(event) {

    displayInfo1(); //it will execute the display function but "replaceVariable" needs to be selectively called after the original "inputRead" call 
}

recoverEl.addEventListener("click", recoverInfo);
buttonEl.addEventListener("click", getInfo)