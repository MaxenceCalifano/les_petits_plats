import { RecipesFactory } from "./factories/RecipesFactory.js"
import { Dropdown } from "./Components/Dropdown.js"

let recipes;
let selectedAppliance = []
const main = document.querySelector("main")

async function getRecipes() {
    
    return await fetch('../Data/recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
        .catch(err => console.log('an error occurs', err))
}

function displayCards(recipesList) {
    let ustensils = []
    let appliances = []
    
    

    //DROPDOWNS
    //Create list of ustensils without doubles
    recipesList.forEach(element => element.ustensils.forEach(ustensil => {
        if(!ustensils.includes(ustensil)) {
            ustensils.push(ustensil)
        }
    }))
    
    //Create list of appliances without doubles
    recipesList.forEach(element => {
        if(!appliances.includes(element.appliance)) {
            appliances.push(element.appliance)
        }
    })

    console.log(appliances)

    const updateSelectedApplicance = (value) => {
        selectedAppliance.push(value)
        console.log(selectedAppliance)
    }

    const ustensilsDropdown = new Dropdown(ustensils, "Ustensiles", updateSelectedApplicance).render()
    const applianceDropdown = new Dropdown(appliances, "Appareils").render()
    
    const dropdowns = document.createElement("div");
    dropdowns.className = "dropdowns"
    dropdowns.append(applianceDropdown, ustensilsDropdown)

    //RECIPES
    if(document.querySelector(".recipesCard")!== null) {
        document.querySelector(".recipesCard").remove()
    }
    const recipesCards = document.createElement("div")
    recipesCards.className = "recipesCards"

    recipesList.forEach(element => {
        const recipeCard =  new RecipesFactory(element)
 
        recipesCards.appendChild(recipeCard)
     });
     
     main.append(dropdowns, recipesCards)
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