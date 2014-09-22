var pair = initPair();
var contacts = initContacts();

function initialize() {
    var myLatLng = new google.maps.LatLng(48.241100, 17.392782);
    var mapOptions = {
        zoom: 5,
        center: myLatLng,
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

    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var contentString = '<span style="font-family: calibri;"><b>PlaceInSpace</b> - это приложение, которое вы можете бессплатно скачать на AppStore и Android. Он разработан на основе Google Maps. Приложение показывает ваше местоположение, а вокруг вас точки, которые можно посетить. Фишка в том, что кроме стандартного описания локации и ссылки на сайт, вы имеете возможность просмотреть одноминутное видео об этом заведении. "Всего одна минута об одном заведении!" <br><b>ОФИЦИАЛЬНЫЙ ЗАПУСК ПРОЕКТА ЧЕРЕЗ</b>: <span id="counter" style="color:red;font-weight:bold;"></span></span>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'PlaceInSpace',
        icon: 'images/in.png'
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
        countIt();
    });
    infowindow.open(map, marker);

}

google.maps.event.addDomListener(window, 'load', initialize);
initSelections();


function initPair() {
    var ukraine = {
        country: "Украина",
        cities: ["Киев", "Львов", "Одесса", "Черновцы", "Кировоград", "Винница"],
        price: "200 $"
    }
    var england = {
        country: "Aнглия",
        cities: ["Лондон"],
        price: "500 £"
    }
    var us = {
        country: "США",
        cities: ["Лос-Анджелес"],
        price: "500 $"
    }
    return [ukraine, england, us];
}

function initContacts() {
    var kyiv = {
        city: "Киев",
        phone: "+38 (063) 328-32-97",
        email: "kyiv@placeins.com"
    }
    var lviv = {
        city: "Львов",
        phone: "+38 (093) 818-86-46",
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
    document.getElementById("price_value").innerHTML = pair[0].price;
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
    var city = document.getElementById("city");
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
            document.getElementById("price_value").innerHTML = pair[i].price;
            putCities(pair[i].cities);
            setContacts();
            return;
        }
    }
}