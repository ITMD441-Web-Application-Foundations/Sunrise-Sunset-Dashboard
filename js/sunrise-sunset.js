// Location coordinates
const LOCATION_COORDINATES = {
    "1": {latitude: 34.05223, longitude: -118.24368},       // name: "Los Angeles, CA"
    "2": {latitude: 40.76078, longitude: -111.89105},       // name: "Salt Lake City, UT"
    "3": {latitude: 41.85003, longitude: -87.65005},        // name: "Chicago, IL"
    "4": {latitude: 40.71427, longitude: -74.00597},        // name: "New York, NY"
    "5": {latitude: 14.5948914, longitude: 120.9782618}     // name: "Manila, PHL";
}
const date = new Date();

// AJAX Method: fetch() API
function getSunriseSunsetData(formSelection = document.getElementById("dashboard_form_select")){
    //Prevent page refresh
    event.preventDefault();
    // Default hidden HTML element to later display output data
    const outputDiv = document.getElementById("dashboard_output");

    if (formSelection.value === "-1") {
        // Hide output elements when choosing placeholder value
        document.getElementById("sunrise_today").innerHTML = "";
        document.getElementById("noon_today").innerHTML = "";
        document.getElementById("sunset_today").innerHTML = "";

        document.getElementById("sunrise_tmr").innerHTML = "";
        document.getElementById("noon_tmr").innerHTML = "";
        document.getElementById("sunset_tmr").innerHTML = "";

        outputDiv.style.display = "none";
    } else {
        // Respective URL construction for each day
        const url_today =
            `https://api.sunrisesunset.io/json
            ?lat=${Object.values(LOCATION_COORDINATES)[formSelection.value].latitude}
            &lng=${Object.values(LOCATION_COORDINATES)[formSelection.value].longitude}
            &date=today`
        const url_tomorrow =
            `https://api.sunrisesunset.io/json
            ?lat=${Object.values(LOCATION_COORDINATES)[formSelection.value].latitude}
            &lng=${Object.values(LOCATION_COORDINATES)[formSelection.value].longitude}
            &date=tomorrow`

        /*{ EXAMPLE RETURNED DATA
            "results": {
                "sunrise": "5:49:47 AM",
                "sunset": "8:23:14 PM",
                "first_light": "3:57:44 AM",
                "last_light": "10:15:17 PM",
                "dawn": "5:18:56 AM",
                "dusk": "8:54:05 PM",
                "solar_noon": "1:06:31 PM",
                "golden_hour": "7:44:26 PM",
                "day_length": "14:33:26",
                "timezone": "America/New_York",
                "utc_offset": -240
            },
            "status": "OK"
        }*/
        fetch(url_today)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#sunrise_today').innerHTML = data.results.sunrise
                document.querySelector('#noon_today').innerHTML = data.results.solar_noon
                document.querySelector('#sunset_today').innerHTML = data.results.sunset
            })
            .catch(error => console.error('Error:', error))

        fetch(url_tomorrow)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#sunrise_tmr').innerHTML = data.results.sunrise
                document.querySelector('#noon_tmr').innerHTML = data.results.solar_noon
                document.querySelector('#sunset_tmr').innerHTML = data.results.sunset
            })
            .catch(error => console.error('Error:', error))

        // Show output elements when choosing non-placeholder values
        outputDiv.style.display = "block";
    }
}