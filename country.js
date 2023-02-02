let body = document.querySelector(".body")
let toggleThemeBtn = document.querySelector(".header__toggle-theme-btn")
let theme;
let data;
let countryContainer = document.querySelector(".main__country-container")
let borders = []

//setting the theme value on local storage
if(localStorage.getItem("theme")){
    theme = JSON.parse(localStorage.getItem("theme"))
    if(theme === false){
        body.classList.add("body--dark-theme")
        changeThemeBtnAppearance()
    }
}else{
    localStorage.setItem("theme", true) 
}

window.addEventListener("load", ()=>{
    fetchCountry(localStorage.getItem("transferred"))
    setTimeout(()=>{
        createCountry(data)
    }, 500)
})

function fetchCountry (keyword){
    fetch(`https://restcountries.com/v3.1/alpha/${keyword}`)
    .then(res => res.json())
    .then(res => {
        data = res[0]
        if(res[0].borders){
            res[0].borders.forEach(e =>{
                fetchBorderCountries(e)
            })
        }
    })
    .catch(error => {
        console.log(error);
    })
}

function fetchBorderCountries(keyword){
    fetch(`https://restcountries.com/v3.1/alpha/${keyword}`)
    .then(res => res.json())
    .then(res => {
        borders.push(res[0])
    })
    .catch(error => console.log(error))
}

function createCountry(data){
    if(data.languages){
        var languages = Object.values(data.languages).join(", ")
    }
    if(data.name.nativeName){
        var nativeName = Object.values(data.name.nativeName)
    }
    if(data.currencies){
        var currencies = Object.values(data.currencies)
    }

    countryContainer.innerHTML = `
        <img class="main__flag" src="${data.flags.svg}"/>
        <div class="main__info-container">
            <h2 class="main__name">${data.name.common}</h2>
            <div class="main__sub-info-container">
                <div class="main__information-first-part">
                    <p>Native Name:  <span>${nativeName ? nativeName[0].common : "N/A"}</span></p>
                    <p>Population:  <span>${data.population.toLocaleString()}</span></p>
                    <p>Region:  <span>${data.region ? data.region : "N/A"}</span></p>
                    <p>Sub Region:  <span>${data.subregion ? data.subregion : "N/A"}</span></p>
                    <p>Capital:  <span>${data.capital ? data.capital[0] : "N/A"}</span></p>
                </div>
                <div class="main__information-second-part">
                    <p>Top Level Domain:  <span>${data.tld ? data.tld[0] : "N/A"}</span></p>
                    <p>Currencies:  <span>${currencies ? currencies[0].name : "N/A"}</span></p>
                    <p>Languages:  <span>${languages ? languages : "N/A"}</span></p>
                </div>
            </div>
            <div class="main__borders-container">
                <p class="main__borders-title">Borders:</p>
                <div class="main__borders-items"></div>
            </div>
        </div>
    `;

    if(borders.length){
        borders.forEach((e, i) => {    
            let borderItem = document.createElement("span")
            borderItem.innerText = `${e.cca3}`
            borderItem.classList.add("main__border-item")
            document.querySelector(".main__borders-items").appendChild(borderItem)
    
            borderItem.addEventListener("click", ()=>{
                localStorage.setItem("transferred", e.cca3)
                window.location.reload()
            })
        })
    }else{
        document.querySelector(".main__borders-items").innerHTML = `<span>No bordering countries</span>`
    }
}

function changeTheme(){
    theme = !theme
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

toggleThemeBtn.addEventListener("click", ()=>{
    changeTheme()
})