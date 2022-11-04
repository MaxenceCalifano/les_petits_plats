import { RecipesFactory } from "./factories/RecipesFactory.js"

let recipes;
const main = document.querySelector("main")

async function getRecipes() {
    
    return await fetch('../Data/recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
        .catch(err => console.log('an error occurs', err))
}

function displayCards(recipesList) {
    
    if(document.querySelector(".recipesCard")!== null) {
        document.querySelector(".recipesCard").remove()
    }
    const recipesCards = document.createElement("div")
    recipesCards.className = "recipesCards"

    recipesList.forEach(element => {
        const recipeCard =  new RecipesFactory(element)
 
        recipesCards.appendChild(recipeCard)
     });
     
     main.appendChild(recipesCards)
}

async function init() {

    recipes = await getRecipes();
    displayCards(recipes)

    const search = document.querySelector(".search")
    search.addEventListener("keyup", (e) => {
        if(e.target.value.length > 2) {
            //On déclenche la recherche
        }
    })
}  

init();