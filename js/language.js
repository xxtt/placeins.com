LANGUAGE = "ua";
ru = document.getElementById("ru");
ua = document.getElementById("ua");
us = document.getElementById("us");
categoryText = document.getElementById("category");
placeText = document.getElementById("place");
contactsText = document.getElementById("contacts");
p_country = document.getElementById("p_country");
p_city = document.getElementById("p_city");


function changeRu() {
    ru.style.color = "red";
    ua.style.color = "white";
    us.style.color = "white";

    categoryText.innerHTML = "выбор рубрики";
    placeText.innerHTML = "список мест";
    contactsText.innerHTML = "КОНТАКТЫ";
    p_country.innerHTML = "страна";
    p_city.innerHTML = "город";

    LANGUAGE = "ru";

    initCategoryList();
    showCategory();
    initContactMenus();

}

function changeUa() {
    ru.style.color = "white";
    ua.style.color = "red";
    us.style.color = "white";

    categoryText.innerHTML = "вибір рубрики";
    placeText.innerHTML = "список місць";
    contactsText.innerHTML = "КОНТАКТИ";
    p_country.innerHTML = "країна";
    p_city.innerHTML = "місто";

    LANGUAGE = "ua";

    initCategoryList();
    showCategory();
    initContactMenus();
}

function changeUs() {
    ru.style.color = "white";
    ua.style.color = "white";
    us.style.color = "red";

    categoryText.innerHTML = "choose place";
    placeText.innerHTML = "place list";
    contactsText.innerHTML = "CONTACTS";
    p_country.innerHTML = "country";
    p_city.innerHTML = "city";

    LANGUAGE = "us";

    initCategoryList();
    showCategory();
    initContactMenus();
}

changeUa();