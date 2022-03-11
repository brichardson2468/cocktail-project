
const select = document.querySelector('#selectAlcohol')
const drinkImg = document.querySelector("#drinkPic")
const drinkNameHeader = document.querySelector("#drinkNameHeader")
const drinkName = document.querySelector("#drinkName")
const directions = document.querySelector("#directions")
const directionsParagraph = document.querySelector("#directionsParagraph")
const chosenAlcohol = document.querySelector("#selectAlcohol")
const button = document.querySelector("#nextDrinkButton")
const ul = document.querySelector("#ul")
const li = document.querySelector('li')
const ingredientsHeader = document.querySelector('#ingredientsHeader')
const imgDiv = document.querySelector(".container-main")
const mainPic = document.querySelector("#mainPhoto")

chosenAlcohol.addEventListener('change', () =>{
    const chosenAlcohol = document.querySelector("#selectAlcohol").value;
    alcoholData(chosenAlcohol)
    ul.innerText = ''
    mainPic.remove()
    
})

function alcoholData(chosenAlcohol){
fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${chosenAlcohol}`)
.then(res => res.json())
.then((alcoholData) => {
    const randomAlcohol = alcoholData.drinks[Math.floor(Math.random()* alcoholData.drinks.length)]

    drinkImg.src = randomAlcohol.strDrinkThumb
    drinkNameHeader.innerText = "COCKTAIL NAME" 
    drinkName.innerText = `${randomAlcohol.strDrink}` 

    const alcoholID = randomAlcohol.idDrink
    otherAlcoholInfo(alcoholID)
})
}

function otherAlcoholInfo(alcoholID) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${alcoholID}`)
    .then((res) => res.json())
    .then((moreAlcoholInfo) => {
        directions.innerText = "DIRECTIONS"
        directionsParagraph.innerText = `${moreAlcoholInfo.drinks[0].strInstructions}`
        generateIngredients(moreAlcoholInfo)
    })
}


function generateIngredients(moreAlcoholInfo) {
    ingredientsHeader.innerText = "INGREDIENTS"
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    nums.forEach(number => {
        const interpolatedIngredient = moreAlcoholInfo.drinks[0][`strIngredient${number}`]
        const interpolatedMeasurement = moreAlcoholInfo.drinks[0][`strMeasure${number}`]
 

        if (interpolatedIngredient !== null && interpolatedMeasurement !==null && interpolatedIngredient !== "" && interpolatedMeasurement !== "") {
            const li = document.createElement('li')
            li.innerText = interpolatedMeasurement + " " + interpolatedIngredient
            ul.append(li)
            
        }
    })
}

button.addEventListener('click', () => {
    const chosenAlcohol = document.querySelector("#selectAlcohol").value;
    alcoholData(chosenAlcohol)
    ul.innerText = ''
})
