contacts = initContacts();
countryList = initCountryList();

function initCountryList() {
    var ukraine = {
        nameUa: "Україна",
        nameRu: "Украина",
        nameUs: "Ukraine",
        value: "ukraine",
        cityNameUa: ["Київ", "Львів", "Одесса", "Кировоград", "Чернівці"],
        cityNameRu: ["Киев", "Львов", "Одесса", "Кировоград", "Черновцы"],
        cityNameUs: ["Kiev", "Lviv", "Odessa", "Kirovohrad", "Сhernivtsi"],
        cityValue: ["kiev", "lviv", "odessa", "krg", "cnvs"]
    }
    var england = {
        nameUa: "Aнглія",
        nameRu: "Aнглия",
        nameUs: "England",
        value: "england",
        cityNameUa: ["Лондон"],
        cityNameRu: ["Лондон"],
        cityNameUs: ["London"],
        cityValue: ["london"]
    }
    var us = {
        nameUa: "США",
        nameRu: "США",
        nameUs: "USA",
        value: "us",
        cityNameUa: ["Лос-Анджелес"],
        cityNameRu: ["Лос-Анджелес"],
        cityNameUs: ["Los Angeles"],
        cityValue: ["la"]
    }
    return [ukraine, england, us];
}

function initContacts() {
    var kiev = {
        city: "kiev",
        phone: "+38 (063) 328-32-97",
        email: "kyiv@placeins.com"
    }
    var lviv = {
        city: "lviv",
        phone: "+38 (093) 818-86-46",
        email: "lviv@placeins.com"
    }

    var odessa = {
        city: "odessa",
        phone: "+38 (095) 192-83-44",
        email: "odessa@placeins.com"
    }

    var krg = {
        city: "krg",
        phone: "+38 (095) 735-66-57",
        email: "kirovograd@placeins.com"
    }

    var cnvs = {
        city: "cnvs",
        phone: "+38 (050) 374-47-24",
        email: "chernivtsi@placeins.com"
    }

    var london = {
        city: "london",
        phone: "+38 (063) 890-88-44",
        email: "london@placeins.com"
    }

    var la = {
        city: "la",
        phone: "+38 (063) 890-88-44",
        email: "la@placeins.com"
    }

    return [kiev, lviv, odessa, krg, cnvs, london, la];
}

function initContactMenus() {
    var country = document.getElementById("country");

    while (country.length > 0) {
        country.remove(0);
    }

    for (i = 0; i < countryList.length; i++) {
        var option = document.createElement("option");
        option.text = getCountryName(countryList[i]);
        option.value = countryList[i].value;
        country.add(option);
    }

    setCityList(0);
    setContacts();
}

function setCityList(index) {
    var city = document.getElementById("city");

    while (city.length > 0) {
        city.remove(0);
    }

    for (i = 0; i < countryList[index].cityValue.length; i++) {
        var option = document.createElement("option");
        option.text = getCityName(countryList[index], i);
        option.value = countryList[index].cityValue[i];
        city.add(option, i);
    }
}

function getCityName(country, index) {
    switch (LANGUAGE) {
    case "ua":
        return country.cityNameUa[index];
    case "ru":
        return country.cityNameRu[index];
    case "us":
        return country.cityNameUs[index];
    }
}

function getCountryName(country) {
    switch (LANGUAGE) {
    case "ua":
        return country.nameUa;
    case "ru":
        return country.nameRu;
    case "us":
        return country.nameUs;
    }
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

function changeCityList() {
    var country = document.getElementById("country").value;

    for (i = 0; i < countryList.length; i++) {
        if (country == countryList[i].value) {
            setCityList(i);
            setContacts();
            return;
        }
    }
}

initContactMenus();