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
    if(document.querySelector(".recipesCards") != null) {
        console.log("remove", document.querySelector(".recipesCards"))
        document.querySelector(".recipesCards").remove()
    }
    const recipesCards = document.createElement("div")
    recipesCards.className = "recipesCards"

    recipesList.forEach(element => {
        const recipeCard =  new RecipesFactory(element)
 
        recipesCards.appendChild(recipeCard)
     });
     
     main.append(recipesCards)
}

function sortRecipes() {
    const sortedRecipes = recipes.filter(recipe => selectedAppliance.includes(recipe.appliance))
    console.log(sortedRecipes)
        /**
         * pour chaque recette, on veut vérifier si elle contient dans ses ustensils, l'un des ustensils de la séléction
         */
        displayCards(sortedRecipes)
      
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

    const updateSelection = (value) => {
        //selectedAppliance.push(value)
        /**
         * appel la fonction de tri
         * et re appel displays cards avec les recette triées
         */
        //console.log(selectedAppliance, selectedUstensils)
        sortRecipes()
    }


    const ustensilsDropdown = new Dropdown(ustensils, "Ustensiles", updateSelection, selectedUstensils).render()
    const applianceDropdown = new Dropdown(appliances, "Appareils", updateSelection, selectedAppliance).render()
    
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