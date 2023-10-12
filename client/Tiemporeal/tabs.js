function changeTab(tabIndex) {
    // Oculta todas las pestañas
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active-tab");
    }

    // Muestra la pestaña seleccionada
    var tab = document.getElementById("tab" + (tabIndex + 1));
    tab.classList.add("active-tab");

    // Resalta el botón de pestaña activa
    var buttons = document.querySelectorAll(".tab-button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active-button");
    }
    buttons[tabIndex].classList.add("active-button");
}

// Por defecto, muestra la primera pestaña
changeTab(0);