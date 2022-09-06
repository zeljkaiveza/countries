window.addEventListener("load", fetchData)
const body = document.querySelector("body")
const header = document.querySelector("header")
const title = document.querySelector(".title")
const switchTheme = document.querySelector(".switchThemeSection")
const switchLogo = document.querySelector(".switchLogo")
const themeBtn = document.querySelector(".themeBtn")
const flag = document.querySelector(".flag")
const name = document.querySelector(".name")
const nativeName = document.querySelector(".nativeName")
const population = document.querySelector(".population")
const subRegion = document.querySelector(".subRegion")
const capital = document.querySelector(".capital")
const domain = document.querySelector(".domain")
const currencies = document.querySelector(".currencies")
const languages = document.querySelector(".languages")
const main = document.querySelector("main")
const countryButtons = document.querySelector(".countryButtons")
const countyContainer = document.querySelector(".countryContainer")
const backButton = document.querySelector(".backButton")
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


function fetchData(){
    let alpha = localStorage.getItem("alphaCode")
    alpha = alpha.toLowerCase()

    fetch(`https://restcountries.com/v2/alpha/${alpha}`)
    .then((res) => res.json())
    .then((res) => createCards(res))
}

function createCards(data){
    let country = data

    flag.setAttribute("src", country.flags.svg)
    name.innerText = country.name

    let nativeNameInfo = document.createElement("span")
    let populationInfo = document.createElement("span")
    let subRegionInfo = document.createElement("span")
    let capitalInfo = document.createElement("span")
    let domainInfo = document.createElement("span")
    let currenciesInfo = document.createElement("span")
    let languagesInfo = document.createElement("span")

    let arrLang = []
    country.languages.forEach(e => arrLang.push(e.name))

    nativeNameInfo.innerText = country.nativeName
    populationInfo.innerText = Number(country.population).toLocaleString() 
    subRegionInfo.innerText = country.subregion
    if(country.capital != undefined) capitalInfo.innerText = country.capital
    else capitalInfo.innerText = "N/A"
    domainInfo.innerText = country.topLevelDomain[0]
    if(country.currencies != undefined){
        currenciesInfo.innerText = country.currencies[0].name
    }else currenciesInfo.innerText = "N/A"
    languagesInfo.innerText = arrLang.join()
    nativeNameInfo.classList.add("nonBold")
    populationInfo.classList.add("nonBold")
    subRegionInfo.classList.add("nonBold")
    capitalInfo.classList.add("nonBold")
    domainInfo.classList.add("nonBold")
    currenciesInfo.classList.add("nonBold")
    languagesInfo.classList.add("nonBold")

    // border countries
    if (country.borders != undefined){
        country.borders.forEach((e, i) => {
            let alpha = e.toLowerCase()
    
            fetch(`https://restcountries.com/v2/alpha/${alpha}`)
            .then((res) => res.json())
            .then((res) => createBorder(res))
    
            function createBorder (borderCountry){
                let button = document.createElement("button")
                let snippet = document.createElement("div")
    
                button.classList.add("borderCountry")
                snippet.classList.add("snippet")
                button.innerText = borderCountry.alpha3Code
                snippet.innerText = borderCountry.name
                snippet.id = borderCountry.name
                button.addEventListener("click", goToBorderCountry)
                button.addEventListener("mouseover", ()=>{
                    snippet.style.display = "block"
                })
                button.addEventListener("mouseleave", ()=>{
                    snippet.style.display = "none"
                })

                function goToBorderCountry (){
                    localStorage.setItem("alphaCode", borderCountry.alpha3Code)
                    window.location.reload()
                }
    
                countryButtons.append(button)
                button.append(snippet)

                if (light === true){
                    button.classList.remove("borderCountry-darkMode")
                    snippet.classList.remove("snippet-darkMode")
                }else{
                    button.classList.add("borderCountry-darkMode")
                    snippet.classList.add("snippet-darkMode")
                }
                
                if(i == country.borders.length - 1){
                    main.style.visibility = "visible"
                }
            }
        })
    }else{
        countryButtons.innerText = "No border countries"
    }

    nativeName.append(nativeNameInfo)
    population.append(populationInfo)
    subRegion.append(subRegionInfo)
    capital.append(capitalInfo)
    domain.append(domainInfo)
    currencies.append(currenciesInfo)
    languages.append(languagesInfo)
    
    main.style.visibility = "visible"
    
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
    countyContainer.classList.toggle("countryContainer-darkMode")
    backButton.classList.toggle("backButton-darkMode")

    if(light == true){
        switchLogo.setAttribute("src", "./Assets/moon-outline.svg")
        themeBtn.innerText = "Dark mode"
    }else{
        switchLogo.setAttribute("src", "./Assets/icon-sun.svg")
        themeBtn.innerText = "Light mode"
    }

    let borderCountries = document.querySelectorAll(".borderCountry")
    if(borderCountries.length > 0){
        borderCountries.forEach(e => {
            if(light === true) e.classList.remove("borderCountry-darkMode")
            else e.classList.add("borderCountry-darkMode")
        })
        let snippets = document.querySelectorAll(".snippet")
        snippets.forEach(e => {
            if(light === true) e.classList.remove("snippet-darkMode")
            else e.classList.add("snippet-darkMode")
        })
    }
}