import { RecipesFactory } from "./factories/RecipesFactory.js"

async function getRecipes() {
    
    return await fetch('../Data/recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
        .catch(err => console.log('an error occurs', err))
}

async function init() {
    const main = document.querySelector("main")
    
    const recipesCards = document.createElement("div")
    recipesCards.className = "recipesCards"

    recipes = await getRecipes();
    recipes.forEach(element => {
       const recipeCard =  new RecipesFactory(element)

       recipesCards.appendChild(recipeCard)
    });
    
    main.appendChild(recipesCards)
}
let recipes;
init();