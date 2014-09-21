var map;
var pair = initPair();
var contacts = initContacts();

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
    var us = {
        country: "США",
        cities: ["Лос-Анджелес"]
    }
    return [ukraine, england, us];
}

function initContacts() {
    var kyiv = {
        city: "Киев",
        phone: "+38 (097) 400-97-98",
        email: "kyiv@placeins.com"
    }
    var lviv = {
        city: "Львов",
        phone: "+38 (063) 890-88-44",
        email: "lviv@placeins.com"
    }

    var krg = {
        city: "Кировоград",
        phone: "+38 (095) 735-66-57",
        email: "kirovograd@placeins.com"
    }

    var cnvs = {
        city: "Черновцы",
        phone: "+38 (050) 374-47-24",
        email: "chernivtsi@placeins.com"
    }

    var odessa = {
        city: "Одесса",
        phone: "+38 (095) 192-83-44",
        email: "odessa@placeins.com"
    }

    var vinn = {
        city: "Винница",
        phone: "+38 (098) 388-86-20",
        email: "vinnitsa@placeins.com"
    }

    var london = {
        city: "Лондон",
        phone: "+38 (063) 890-88-44",
        email: "london@placeins.com"
    }

    var la = {
        city: "Лос-Анджелес",
        phone: "+38 (063) 890-88-44",
        email: "la@placeins.com"
    }

    return [kyiv, lviv, krg, cnvs, odessa, vinn, london, la];
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
    setContacts();
}

function setContacts() {
    var city = document.getElementById("city").value;
    for (i = 0; i < contacts.length; i++) {
        if (city == contacts[i].city) {
            document.getElementById("phone").innerHTML = contacts[i].phone;
            document.getElementById("email").innerHTML = contacts[i].email;
            return;
        }
    }

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
            setContacts();
            return;
        }
    }
}

function demo(){
 document.getElementById("demo").style.color = "red";
}