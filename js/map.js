LANGUAGE = "ua";
directionsDisplay = new google.maps.DirectionsRenderer();
directionsService = new google.maps.DirectionsService();
myLocation = null;
openWindow = null;
openMarker = null;
markers = places = [];
presentCategoryList = [];
presentCategoryList.push(0); // all places
map = null;

IsLocationMarkerThere = false;

var defaultLocation = new google.maps.LatLng(49.548206, 31.105966); // ukraine
var defaultZoom = 6;

function initialize() {

    var mapOptions = {
        zoom: defaultZoom,
        center: defaultLocation,
        zoomControl: true,
        streetViewControl: false,
        panControl: true,
        mapTypeControl: true,
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    setMarkers();
    checkLocation();

    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
        suppressMarkers: true
    });

}

function addMyLocationMarker() {
    if (!IsLocationMarkerThere) {
        marker = new google.maps.Marker({
            position: myLocation,
            map: map,
        });
        map.setCenter(myLocation);
        map.setZoom(12);
        IsLocationMarkerThere = true;
    }
}

function getCategoryIcon(category) {

    switch (category) {
    case "1":
        return 'images/categories/restaurant.png';
    case "2":
        return 'images/categories/pub.png';
    case "3":
        return 'images/categories/coffee.png';
    case "4":
        return 'images/categories/health.png';
    case "5":
        return 'images/categories/shopping.png';
    case "6":
        return 'images/categories/night.png';
    case "7":
        return 'images/categories/arts.png';
    case "8":
        return 'images/categories/intellectual.png';
    case "9":
        return 'images/categories/sport.png';
    case "10":
        return 'images/categories/beauty.png';
    case "11":
        return 'images/categories/hotels.png';
    case "12":
        return 'images/categories/city.png';
    case "13":
        return 'images/categories/other.png';
    case "14":
        return 'images/categories/office.png';
    default:
        return 'images/categories/all.png';
    }
}

function getAbout(place) {
    switch (LANGUAGE) {
    case "ua":
        return place.about_ua;
    case "ru":
        return place.about_ru;
    case "us":
        return place.about_us;

    }
}

function getAddress(place) {
    switch (LANGUAGE) {
    case "ua":
        return place.address_ua;
    case "ru":
        return place.address_ru;
    case "us":
        return place.address_us;
    }
}

function getNews(place) {
    switch (LANGUAGE) {
    case "ua":
        return "<b>Новини</b><br>" + place.news_ua;
    case "ru":
        return "<b>Новости</b><br> " + place.news_ru;
    case "us":
        return "<b>News</b><br>" + place.news_us;

    }
}

function setMarkers() {
    for (i = 0; i < markers.length; i++) {
        var place = markers[i];

        var latLng = new google.maps.LatLng(markers[i].x, markers[i].y);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: getCategoryIcon(place.category)
        });

        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setOptions({
            maxWidth: 300
        });

        google.maps.event.addListener(marker, 'click', (function (marker, place, infoWindow) {
            return function () {
                closeOpenWindow();
                infoWindow.setContent(createContent(place));
                infoWindow.open(map, marker);
                openWindow = infoWindow;
                openMarker = marker;
                clearRoute();
            };
        })(marker, place, infoWindow));

        places.push(marker);

        setPresentCategoryList(parseInt(place.category));

    }
}

function createContent(place) {
    var icons = "<div style='float:right;'>";

    if (parseInt(place.parking) == 1) {
        icons = icons + "<img src='images/parking.png' alt='parking'>";
    }

    if (parseInt(place.baby) == 1) {
        icons = icons + "<img src='images/baby.png' alt='baby'>";
    }

    if (parseInt(place.music) == 1) {
        icons = icons + "<img src='images/music.png' alt='music'>";
    }

    if (parseInt(place.smoking) == 1) {
        icons = icons + "<img src='images/smoking.png' alt='smoking'>";
    } else {
        icons = icons + "<img src='images/no_smoking.png' alt='no smoking'>";
    }

    if (parseInt(place.bill) == 1) {
        icons = icons + "<img src='images/1.png' alt='1 dollar'>";
    } else if (parseInt(place.bill) == 2) {
        icons = icons + "<img src='images/2.png' alt='2 dollar'>";
    } else if (parseInt(place.bill) == 3) {
        icons = icons + "<img src='images/3.png' alt='3 dollar'>";
    }

    icons = icons + "</div>";

    var yt = "<a href='http://www.youtube.com/watch?feature=player_embedded&v=" + place.yt + "' target='_blank'>";
    yt = yt + "<img src='http://img.youtube.com/vi/" + place.yt + "/0.jpg' alt='youtube' height='225' width='300'></a><br>";

    var content = "<b>" + place.title + "</b>" + "<br>" + getAbout(place) + "<br>" + icons + "<br>" +
        yt + "<br>" + place.phone + "<br>" + getAddress(place) +
        "<a href='" + place.link + "' target='_blank'><div id='link'>" + place.link + "</div></a>" +
        "<img style='float:right;cursor: pointer;' src='images/directions.png' alt='directions' onclick='showRoute()'>" +
        "" + getNews(place);
    return content;
}

function setPresentCategoryList(category) {
    if (presentCategoryList.indexOf(category) < 0) {
        presentCategoryList.push(category);
    }
}

function closeOpenWindow() {
    if (openWindow != null) {
        openWindow.close();
        openWindow = null;
    }
}

function checkLocation() {
    if (myLocation == null) {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        } else {
            handleNoGeolocation(false);
        }
    }

    function geoError() {
        handleNoGeolocation(true);
    }

    function geoSuccess(position) {
        var lats = position.coords.latitude;
        var lngs = position.coords.longitude;
        myLocation = new google.maps.LatLng(lats, lngs);
        addMyLocationMarker();

    };

    function handleNoGeolocation(errorFlag) {
        switch (LANGUAGE) {
        case "ua":
            var set_error = 'Ваше місце розташування не встановлено.';
            var support_error = 'Ваш браузер не підтримує геолокацію.';
            break;
        case "ru":
            var set_error = 'Ваше местоположение не установлено.';
            var support_error = 'Ваш браузер не поддерживает геолокацию.';
            break;
        case "us":
            var set_error = 'Your location has not been set.';
            var support_error = 'Your browser doesn\'t support geolocation.';
            break;
        }

        if (errorFlag) {
            alert(set_error);
        } else {
            alert(support_error);
        }
    }

}

function initCategoryList() {
    var categoryNameList = getCategoryNameList();
    var list = document.getElementById("categoryList");

    while (list.length > 0) {
        list.remove(0);
    }

    for (i = 0; i < presentCategoryList.length; i++) {
        var category = presentCategoryList[i];
        var option = document.createElement("option");
        option.text = categoryNameList[category];
        option.value = category;
        list.add(option, i);
    }
}

function getCategoryNameList() {
    switch (LANGUAGE) {
    case "ru":
        return ["Все рубрики",
                  "Рестораны",
                  "Пабы и бары",
                  "Кофе и Чай",
                  "Здоровье и Медицина",
                  "Шопинг",
                  "Ночная жизнь",
                  "Искусство и Развлечение",
                  "Интелектуальные клубы",
                  "Спорт и Фитнес",
                  "Салоны и СПА",
                  "Отели и хостелы",
                  "PlaceInCity",
                  "Другое",
                  "ЦЕНТРАЛЬНЫЙ ОФИС"];
    case "us":
        return ["All places",
                  "Restaurants",
                  "Pubs & Bars",
                  "Coffee & Tea",
                  "Health & Medical",
                  "Shopping",
                  "Nightlife",
                  "Arts & Entertainment",
                  "Intellectual clubs",
                  "Sport & Fitness",
                  "Beauty & Spa",
                  "Hotels & Hostels",
                  "PlaceInCity",
                  "Other",
                  "CENTRAL OFFICE"];
    case "ua":
        return ["Всі рубрики",
                  "Ресторани",
                  "Паби і бари",
                  "Кава та Чай",
                  "Здоров\'я та Медицина",
                  "Шопінг",
                  "Нічне життя",
                  "Мистецтво та Розваги",
                  "Інтелектуальні клуби",
                  "Спорт і Фітнес",
                  "Салони та СПА",
                  "Готелі та Хостели",
                  "PlaceInCity",
                  "Інше",
                  "ЦЕНТРАЛЬНИЙ ОФІС"];
    }
}


function initPlaceList() {

    var list = document.getElementById("placeList");

    for (i = 0; i < markers.length; i++) {
        var option = document.createElement("option");
        option.text = markers[i].title;
        list.add(option);
    }
}

function showPlace() {
    var list = document.getElementById("placeList");
    closeOpenWindow();
    clearRoute();

    var place = places[list.selectedIndex];

    place.setVisible(true);
    google.maps.event.trigger(place, 'click');
    map.setCenter(place.getPosition());

}

function showCategory() {

    closeOpenWindow();
    clearRoute();

    var visible = false;
    var list = document.getElementById("categoryList");
    var category = list.options[list.selectedIndex].value;

    for (i = 0; i < markers.length; i++) {
        if ((category == 0) || (category == parseInt(markers[i].category))) {
            visible = true;
        } else {
            visible = false;
        }
        places[i].setVisible(visible);
    }
}

function showRoute() {
    checkLocation();
    if (myLocation != null) {
        var end = openMarker.getPosition();
        var request = {
            origin: myLocation,
            destination: end,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        closeOpenWindow();
    } else {
        handleNoGeolocation(true);
    }
}

function clearRoute() {
    directionsDisplay.setDirections({
        routes: []
    });
}

function success(data) {
    markers = data.markers;
    success = data.success;
    initialize(); //google.maps.event.addDomListener(window, 'load', initialize);
    initCategoryList();
    initPlaceList();
}

var do_on_load = function () {
    //    $.get("get.php", "", success, "json");
    $.get("http://placeins.com/admin/get.php", "", success, "json");
};

$(document).ready(do_on_load);