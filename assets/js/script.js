var buttonEl = document.querySelector('#sbmt-btn');
var displaySecEl = document.querySelector('#display-div');
var inputEl = document.querySelector('#input-sbmt');


var saveArr = [];

var pullLocations = localStorage.getItem('saveArr');

for (var i = 0; i < saveArr.length; i++) {
    displayInfo(saveArr);
}

var getInfo = function (event) {
    var inputRead = inputEl.value;

    saveArr.push(inputRead);

    localStorage.setItem('saveArr', JSON.stringify(saveArr));

    if (inputRead) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputRead + '&appid=1c82bb4d8f20db1e69a427f00d909415&units=imperial')
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        const lat = data.coord.lat;
                        const long = data.coord.lat;

                        if (inputRead) {
                            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=minutely,hourly&appid=1c82bb4d8f20db1e69a427f00d909415&units=imperial')
                                .then(function (response) {
                                    if (response.ok) {
                                        response.json().then(function (locationData) {
                                            console.log(locationData);
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

    var expButton = document.createElement("button");
    expButton.setAttribute("class", "btn");
    expButton.setAttribute("id", "expButton")
    expButton.textContent = "Expand Info"

    var 
    var displayExtended = function(locationData, data) {
        for (var i = 0; i < locationData.daily.array.length; i++) {
            
        }
    }
    expButton.addEventListener("click", displayExtended);
}



buttonEl.addEventListener("click", getInfo)