// Location coordinates
const LOCATION_COORDINATES = {
    "1": {latitude: 34.05223, longitude: -118.24368},       // name: "Los Angeles, CA"
    "2": {latitude: 40.76078, longitude: -111.89105},       // name: "Salt Lake City, UT"
    "3": {latitude: 41.85003, longitude: -87.65005},        // name: "Chicago, IL"
    "4": {latitude: 40.71427, longitude: -74.00597},        // name: "New York, NY"
    "5": {latitude: 14.5948914, longitude: 120.9782618}     // name: "Manila, PHL";
}

// AJAX Method: fetch() API
function getSunriseSunsetData(formSelection = document.getElementById("dashboard_form_select")){
    //Prevent page refresh
    event.preventDefault();

    if (formSelection.value === "-1") {
        document.getElementById("demo").innerHTML = "";
    } else {
        const latitude = Object.values(LOCATION_COORDINATES)[formSelection.value].latitude;
        const longitude = Object.values(LOCATION_COORDINATES)[formSelection.value].longitude;

        const URL = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`

        fetch(URL)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#sunrise').innerHTML = data.results.sunrise
                document.querySelector('#sunset').innerHTML = data.results.sunset
                document.querySelector('#raw-output').innerHTML = JSON.stringify(data)
            })
            .catch(error => console.error('Error:', error))
    }
}