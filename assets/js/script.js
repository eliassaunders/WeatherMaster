var buttonEl = document.querySelector('#sbmt-btn');
var displaySecEl = document.querySelector('#display-div');
var inputEl = document.querySelector('#input-sbmt');

var saveArr = [];

var displayInfo = function (event) {
   if (inputEl.value === "") {
        alert("You need to enter a location");
     }

     var inputRead = inputEl.value;

     fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputRead + '&appid=1c82bb4d8f20db1e69a427f00d909415')
     .then(function(reponse) {
         if(reponse.ok) {
            response.json().then(function(data) {
                var temp = main.temp

            console.log(data, temp);

              });
         }
     })
}

buttonEl.addEventListener("click", displayInfo)