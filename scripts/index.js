import { RecipesFactory } from "./factories/RecipesFactory.js"
import { Dropdown } from "./Components/Dropdown.js"

let recipes;
let selectedAppliance = []
let selectedUstensils = []

let ustensils = []
let appliances = []

const main = document.querySelector("main")

async function getRecipes() {
    
    return await fetch('../Data/recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
        .catch(err => console.log('an error occurs', err))
}

function displayCards(recipesList) {
    //RECIPES

    // Remove cards if they already exist to replace them
    if(document.querySelector(".recipesCard")!== null) {
        document.querySelector(".recipesCard").remove()
    }
    const recipesCards = document.createElement("div")
    recipesCards.className = "recipesCards"

    recipesList.forEach(element => {
        const recipeCard =  new RecipesFactory(element)
 
        recipesCards.appendChild(recipeCard)
     });
     
     main.append(recipesCards)
}

async function init() {

    recipes = await getRecipes();
    //DROPDOWNS
    //Create list of ustensils without doubles
    recipes.forEach(element => element.ustensils.forEach(ustensil => {
        if(!ustensils.includes(ustensil)) {
            ustensils.push(ustensil)
        }
    }))
    
    //Create list of appliances without doubles
    recipes.forEach(element => {
        if(!appliances.includes(element.appliance)) {
            appliances.push(element.appliance)
        }
    })

    const updateSelectedAppliance = (value) => {
        //selectedAppliance.push(value)
        console.log(selectedAppliance)
    }
    const updateSelectedUstensils = (value) => {
        //selectedUstensils.push(value)
        console.log(selectedUstensils)
    }

    const ustensilsDropdown = new Dropdown(ustensils, "Ustensiles", updateSelectedUstensils, selectedUstensils).render()
    const applianceDropdown = new Dropdown(appliances, "Appareils", updateSelectedAppliance, selectedAppliance).render()
    
    const dropdowns = document.createElement("div");
    dropdowns.className = "dropdowns"
    dropdowns.append(applianceDropdown, ustensilsDropdown)
    main.appendChild(dropdowns)

    displayCards(recipes)

    const search = document.querySelector(".search")
    search.addEventListener("keyup", (e) => {
        if(e.target.value.length > 2) {
            //On déclenche la recherche
        }
    })
}  

init();