let body = document.querySelector(".body")
let toggleThemeBtn = document.querySelector(".header__toggle-theme-btn")
let cardsContainer = document.querySelector(".main__cards-container")
let searchInput = document.querySelector(".main__search-input")
let theme;
let filter;
console.log(document.querySelector(".header__toggle-theme-img"));

//setting the theme value on local storage
if(localStorage.getItem("theme")){
    theme = JSON.parse(localStorage.getItem("theme"))
    if(theme === false){
        body.classList.add("body--dark-theme")
        changeThemeBtnAppearance()
    }
}else{
    localStorage.setItem("theme", true)
    theme = true
}


function fetchCountries(endpoint, keyword){
    fetch(`https://restcountries.com/v2/${endpoint}/${keyword}`)
    .then(result => result.json())
    .then(result => createCards(result))
}

function createCards(data){
    cardsContainer.innerHTML = ""

    data.forEach(e => {
        let singleContainer = document.createElement("a")
        cardsContainer.append(singleContainer)
        singleContainer.classList.add("main__single-container")
        singleContainer.setAttribute("href", "./country.html")
        singleContainer.innerHTML = `
            <div class="main__flag">
                <img src="${e.flags.png}"/>
            </div>
            <div class="main__info-container">
                <h3 class="main__name-item">${e.name}</h3>
                <p class="main__info-item--bold">Population: <span class="main__info-item--non-bold">${Number(e.population).toLocaleString()}</span></p>
                <p class="main__info-item--bold">Region: <span class="main__info-item--non-bold">${e.subregion}</span></p>
                <p class="main__info-item--bold">Capital: <span class="main__info-item--non-bold">${e.capital ? e.capital : "N/A"}</span></p>
            </div>
        `;
        singleContainer.addEventListener("click", ()=>{
            localStorage.setItem("transferred", e.alpha3Code)
        })
    })
    

}

function changeTheme(){
    console.log("usao u temu");
    console.log(theme);
    theme = !theme
    console.log(theme);
    localStorage.setItem("theme", theme)
    body.classList.toggle("body--dark-theme")
    changeThemeBtnAppearance()
}

function changeThemeBtnAppearance(){
    let img = document.querySelector(".header__toggle-theme-img");
    let text = document.querySelector(".header__toggle-theme-btn-text")
    theme ? img.src = "./Assets/moon.svg" : img.src = "./Assets/sun.svg"
    theme ? text.innerText = "Dark mode" : text.innerText = "Light mode" 
}

window.addEventListener("load", ()=>{
    fetchCountries("all", "")
})

toggleThemeBtn.addEventListener("click", ()=>{
    changeTheme()
    console.log("radi");
})

document.querySelector(".main__dropdown-container").addEventListener("mouseover", ()=>{
    document.querySelector(".main__dropdown-list").classList.remove("main__dropdown-list--hidden")
})

document.querySelector(".main__dropdown-container").addEventListener("mouseout", ()=>{
    document.querySelector(".main__dropdown-list").classList.add("main__dropdown-list--hidden")
})

document.querySelectorAll(".main__dropdown-list-item").forEach(element => {
    element.addEventListener("click", ()=>{
        filter = element.id;
        fetchCountries("region", filter)
    })
})

searchInput.addEventListener("input", (event)=>{
    if(event.target.value){
        fetchCountries("name", event.target.value)
    }else{
        fetchCountries("all", "")
    }
})