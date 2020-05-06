// VARIABLES 
const API_URL = "https://swapi.dev/api/people/?search=";
const DIV_CONTAINER = document.querySelector("#section");
const LOADER_CONTAINER = document.getElementById("myLoader");
const FORM_CONTAINER = document.querySelector("#form");

let data;

FORM_CONTAINER.addEventListener("submit", (event) => {

    //Show loader
    LOADER_CONTAINER.style.display = "initial";

    //Submit event not reload the page when launched
    event.preventDefault();

    //Obtain user input with FormData
    const formData = new FormData(FORM_CONTAINER);
    const inputValue = formData.get("searchInput");

    //Remove all child elements
    while (DIV_CONTAINER.firstChild) {
        DIV_CONTAINER.removeChild(DIV_CONTAINER.firstChild);
    }

    //Show character data
    loadData(inputValue);
});

//Search data
function loadData(searchInput) {
    fetch(API_URL + searchInput)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            if (myJson.count === 0) {
                let HTML_STRING = messageTemplate("Not found any character")
                let html = document.implementation.createHTMLDocument();
                html.body.innerHTML = HTML_STRING;
                DIV_CONTAINER.append(html.body.children[0]);
                hideLoader();
            } else {
                data = myJson.results;
                const LENGTH = myJson.results["length"];
                for (let i = 0; i < LENGTH; i++) {
                    let HTML_STRING = sectionTemplate(data[i].name, data[i].height, data[i].hair_color, data[i].eye_color);
                    let html = document.implementation.createHTMLDocument();
                    html.body.innerHTML = HTML_STRING;
                    DIV_CONTAINER.append(html.body.children[0]);
                }
                hideLoader();
            }
        });
}

// Data template 
function sectionTemplate(name, height, hair, eye) {
    return (
        `<section class="section-char">
            <div class="char-container">
              <p id="name"><span>Name:</span> ${name}</p>
              <p id="1"><span>Height:</span> ${height}</p>
              <p id="2"><span>Hair color:</span> ${hair}</p>
              <p id="3"><span>Eye color:</span> ${eye}</p>
            </div>
          </section>`
    )
}

// Not found data template
function messageTemplate(message) {
    return (
        `<section class="section-char">
            <div class="char-container">
              <p id="name">${message}</p>
            </div>
          </section>`
    )
}

// Hide loader gif
function hideLoader() {
    LOADER_CONTAINER.style.display = "none";
}

// Change background image
function changeTheme(theme) {
    switch (theme) {
        case 0:
            document.body.style.backgroundImage = "url('images/star-wars-background-0.jpg')";
            break;
        case 1:
            document.body.style.backgroundImage = "url('images/star-wars-background-1.jpg')";
            break;
        case 2:
            document.body.style.backgroundImage = "url('images/star-wars-background-2.jpg')";
            break;
        default:
            document.body.style.backgroundImage = "url('images/star-wars-background.jpg')";
            break;
    }
}