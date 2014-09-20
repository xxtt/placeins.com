var map;
var pair = initPair();

function initialize() {
    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(48.075001, 31.277330),
        //        disableDefaultUI: true,
        zoomControl: false,
        streetViewControl: false,
        panControl: false,
        mapTypeControl: false,
        styles: [{
            "featureType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "gamma": 0.5
            }]
        }],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
initSelections();


function initPair() {
    var ukraine = {
        country: "Украина",
        cities: ["Киев", "Львов", "Одесса", "Черновцы", "Кировоград", "Винница"]
    };
    var england = {
        country: "Aнглия",
        cities: ["Лондон"]
    }
    return [ukraine, england];
}

function initSelections() {
    var country = document.getElementById("country");
    var city = document.getElementById("city");
    for (i = 0; i < pair.length; i++) {
        var option = document.createElement("option");
        option.text = pair[i].country;
        country.add(option);
    }
    putCities(pair[0].cities);
}

function putCities(cities) {
    for (i = 0; i < cities.length; i++) {
        var option = document.createElement("option");
        option.text = cities[i];
        city.add(option);
    }
}

function removeCities() {
    var city = document.getElementById("city");
    while (city.length > 0) {
        city.remove(0);
    }

}

function changeCityList() {
    var country = document.getElementById("country");
    removeCities();
    for (i = 0; i < pair.length; i++) {
        if (country.value == pair[i].country) {
            putCities(pair[i].cities);
        }
    }
}