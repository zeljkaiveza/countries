window.addEventListener("load", fetchData)
const main = document.querySelector("main")
const body = document.querySelector("body")
const header = document.querySelector("header")
const title = document.querySelector(".title")
const switchTheme = document.querySelector(".switchThemeSection")
const switchLogo = document.querySelector(".switchLogo")
const themeBtn = document.querySelector(".themeBtn")
const searchContainer = document.querySelector(".searchInput")
const countriesContainer = document.querySelector(".countriesContainer")
const filter = document.querySelector(".filter")
const filterByRegion = document.querySelector(".filterByRegion")
const dropDownList = document.querySelector(".dropdownListRegion")
const regionItems = document.querySelectorAll(".regionItem")
const search = document.querySelector(".searchCountryInput")
const number = document.querySelector(".number")
searchLog = document.querySelector(".searchLogo")
let light;

if(localStorage.light === undefined){
    localStorage.setItem("light", true)
    light = JSON.parse(localStorage.light)
}else {
    light = JSON.parse(localStorage.light)    
}

if(light === false){
    toggleTheme()
}


filter.addEventListener("mouseover", () =>{
    dropDownList.style.display = "block"
})

filter.addEventListener("mouseout", () => {
    dropDownList.style.display = "none"
})

search.addEventListener("input", ()=>{
    if(search.value != ""){
        search.value = search.value.toLowerCase()
        fetchCountry(search.value)        
    }else{
        fetchData()
    }
})

function fetchCountry(input){
    fetch(`https://restcountries.com/v2/name/${input}`)
    .then((res) => res.json())
    .then((res) => createCards(res))
}

regionItems.forEach(e => {
    e.addEventListener("click", () =>{
        countriesContainer.innerHTML = ""
        fetch(`https://restcountries.com/v2/region/${e.id}`)
        .then((res) => res.json())
        .then((res) => createCards(res))
    })
})

function fetchData(){
    fetch("https://restcountries.com/v2/all")
    .then((res) => res.json())
    .then((res) => createCards(res))
}

function createCards(data){
    data.sort((a, b) => {
        return b.population - a.population
    })

    countriesContainer.innerHTML = ""
    data.forEach((e, i)=> {
        let singleContainer = document.createElement("a")
        let imageContainer = document.createElement("div")
        let image = document.createElement("img")
        let infoContainer = document.createElement("div")
        let name = document.createElement("h3")
        let population = document.createElement("p")
        let populationInfo = document.createElement("span")
        let region = document.createElement("p")
        let regionInfo = document.createElement("span")
        let capital = document.createElement("p")
        let capitalInfo = document.createElement("span")

        singleContainer.classList.add("singleContainer")
        singleContainer.setAttribute("href", "./country.html")
        singleContainer.addEventListener("click", () => {
            localStorage.setItem("alphaCode", e.alpha3Code)
        })
        imageContainer.classList.add("imageContainer")
        image.classList.add("image")
        image.setAttribute("src", e.flags.svg)
        infoContainer.classList.add("infoContainer")
        name.classList.add("name")
        name.innerText = e.name
        population.innerText = "Population: "
        populationInfo.innerText = Number(e.population).toLocaleString()
        region.innerText = "Region: "
        regionInfo.innerText = e.region
        capital.innerText = "Capital: "
        if(e.capital == undefined) capitalInfo.innerText = "N/A"
        else capitalInfo.innerText = e.capital
        population.classList.add("bold")
        region.classList.add("bold")
        capital.classList.add("bold")
        populationInfo.classList.add("nonBold")
        regionInfo.classList.add("nonBold")
        capitalInfo.classList.add("nonBold")
        
        countriesContainer.append(singleContainer)
        singleContainer.append(imageContainer, infoContainer)
        imageContainer.append(image)
        infoContainer.append(name, population, region, capital)
        population.append(populationInfo)
        region.append(regionInfo)
        capital.append(capitalInfo)

        if(light == false) singleContainer.classList.add("singleContainer-darkMode")
        else singleContainer.classList.remove("singleContainer-darkMode")
    })

}

switchTheme.addEventListener("click", ()=>{
    light = !light
    localStorage.setItem("light", light)
    toggleTheme()
})

function toggleTheme(){
    body.classList.toggle("body-darkMode")
    header.classList.toggle("header-darkMode")
    title.classList.toggle("title-darkMode")
    themeBtn.classList.toggle("themeBtn-darkMode")
    searchContainer.classList.toggle("searchInput-darkMode")
    search.classList.toggle("searchCountryInput-darkMode")
    filterByRegion.classList.toggle("filterByRegion-darkMode")
    dropDownList.classList.toggle("dropdownListRegion-darkMode")

    if(light == true){
        switchLogo.setAttribute("src", "./Assets/moon-outline.svg")
        themeBtn.innerText = "Dark mode"
    }else{
        switchLogo.setAttribute("src", "./Assets/icon-sun.svg")
        themeBtn.innerText = "Light mode"
    }
    
    let countries = document.querySelectorAll(".singleContainer")
    
    countries.forEach(e =>{
        if(light == false) e.classList.add("singleContainer-darkMode")
        else e.classList.remove("singleContainer-darkMode")
    })
}