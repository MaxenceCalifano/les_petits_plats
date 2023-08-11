import { RecipesFactory } from "./factories/RecipesFactory.js"
import { Dropdown } from "./Components/Dropdown.js"
import { Tag } from "./Components/Tag.js"

let recipes;

let ingredients = []
let allIngredients = []

let selectedIngredients = []
let selectedAppliance = []
let selectedUstensils = []
let userInput = ""

let allUstensils = []
let ustensils = []

let allAppliances = []
let appliances = []

let sortedRecipes = [];

const main = document.querySelector("main")

async function getRecipes() {
 const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer: ${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}`);

    const myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "no-cors",
    cache: "default",
    };
    
    return await fetch('../Data/recipes.json')
        .then(res => res.json())
        .then(res => res.recipes)
        .catch(err => console.log('an error occurs', err))
}

function displayCards(recipesList) {
    //RECIPES

    // Remove cards if they already exist to replace them
    if(document.querySelector(".recipesCards") != null) {
        document.querySelector(".recipesCards").remove()
    }
    const recipesCards = document.createElement("div")
    recipesCards.className = "recipesCards"

    if(recipesList.length > 0) {
        recipesList.forEach(element => {
            const recipeCard =  new RecipesFactory(element)
     
            recipesCards.appendChild(recipeCard)
         });
    }

    if(recipesList.length < 1) {
        const noResult = document.createElement("p");
        noResult.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        recipesCards.appendChild(noResult)
    }

    main.append(recipesCards)
}

function searchWithUserInput() {
    if(userInput.length > 2 ) {
        /**
         * Search if user user input is in the title, description and ingredients
         */
        sortedRecipes = sortedRecipes.filter(recipe => {
            if(recipe.ingredients.some(ingredient =>  ingredient.ingredient.includes(userInput))) {
                return true
            }
            if(recipe.name.toLowerCase().includes(userInput.toLowerCase())) {
                return true
            }
            if(recipe.description.toLowerCase().includes(userInput.toLowerCase())) {
                return true
            }
        })
    }
}

function filterWithSelectedAppliances() {
    if(selectedAppliance.length > 0) {
        sortedRecipes = sortedRecipes.filter(recipe => selectedAppliance.includes(recipe.appliance))
    }
}
function filterWithSelectedUstensils() {
    if(selectedUstensils.length > 0) {
        sortedRecipes = sortedRecipes.filter( recipe =>{
            const lowerCasedUstensils = recipe.ustensils.map( elem => elem.toLowerCase())          
            return selectedUstensils.every(value => lowerCasedUstensils.includes(value.toLowerCase()))})
    }
}
function filterWithSelectedIngredients() {
    sortedRecipes = sortedRecipes.filter( recipe => {
        let array = []
        recipe.ingredients.forEach(ingredient => array.push(ingredient.ingredient.toLowerCase()))
        return selectedIngredients.every(value => array.includes(value))
    })
}

/**
* Get appliances from the selected recipes, used to update dropdowns
*/
function getAppliances() {
    appliances = []
      sortedRecipes.forEach(element => {
          if(!appliances.includes(element.appliance)) {
              appliances.push(element.appliance)
          }
      })
}

/**
* Get ustensils from the selected recipes
*/
function getUstensils() {
     ustensils = []
     sortedRecipes.forEach(element => element.ustensils.forEach(ustensil => {
        if(!ustensils.includes(ustensil.toLowerCase())) {
            ustensils.push(ustensil.toLowerCase())
         }
     }))
}

/**
* Get ingredients from the selected recipes
*/
function getIngredients() {
     ingredients = []
     sortedRecipes.forEach(element => element.ingredients.forEach(ingredient => {
         if(!ingredients.includes(ingredient.ingredient.toLowerCase())) {
             ingredients.push(ingredient.ingredient.toLowerCase())
         }
     }))
}

function updateDropdowns() {
     const dropdowns = document.querySelector(".dropdowns")
     const updatedAppliancesDropdown = new Dropdown(appliances, "Appareils", sortRecipes, selectedAppliance).render()
     const updatedUstensilsDropdown = new Dropdown(ustensils, "Ustensiles", sortRecipes, selectedUstensils).render()
     const updatedIngredientsDropdown = new Dropdown(ingredients, "Ingrédients", sortRecipes, selectedIngredients).render()

     const appliancesDropdown =  document.querySelector(".dropdownWrapper.appliances")
     dropdowns.removeChild(appliancesDropdown)

     dropdowns.firstChild.remove()
     dropdowns.lastChild.remove()
     dropdowns.insertAdjacentElement('beforeend', updatedIngredientsDropdown)
     dropdowns.insertAdjacentElement('beforeend', updatedAppliancesDropdown)
     dropdowns.insertAdjacentElement('beforeend', updatedUstensilsDropdown)
}

// TAGS : Remove previous tags, then create new ones
function tags(){
    const prevtags = document.querySelector(".tags")

    prevtags !=null ? prevtags.remove() : ""

    const tags = document.createElement("div");
    tags.className = "tags"


    selectedIngredients.forEach( ingredient => {
        const tag = new Tag(ingredient, "ingredient", selectedIngredients, sortRecipes).render()
        tags.appendChild(tag)
    })
    
    selectedAppliance.forEach( appliance => {
        const tag = new Tag(appliance, "appliance", selectedAppliance, sortRecipes).render()
        tags.appendChild(tag)
    })

    selectedUstensils.forEach( ustensil => {
        const tag = new Tag(ustensil, "ustensils", selectedUstensils, sortRecipes).render()
        tags.appendChild(tag)
    })

    const dropdowns = document.querySelector(".dropdowns")
    dropdowns.insertAdjacentElement("beforebegin", tags)
}

function sortRecipes() {
        sortedRecipes = recipes;

        searchWithUserInput()
        filterWithSelectedAppliances()
        filterWithSelectedUstensils()
        filterWithSelectedIngredients()
        getAppliances()
        getUstensils()
        getIngredients()
        updateDropdowns()
        tags()
        
        console.log(sortedRecipes)

        displayCards(sortedRecipes)
    }

async function init() {

    recipes = await getRecipes();
    sortedRecipes = recipes;

    //DROPDOWNS
    //Create list of ingredients without doubles
   /*  recipes.forEach(element => element.ingredients.forEach(ingredient => {
        if(!allIngredients.includes(ingredient.ingredient)) {
            allIngredients.push(ingredient.ingredient)
        }
    })) */
    recipes.forEach(element => element.ingredients.forEach(ingredient => {
        if(!allIngredients.includes(ingredient.ingredient.toLowerCase())) {
            allIngredients.push(ingredient.ingredient.toLowerCase())
        }
    }))
    

    //Create list of ustensils without doubles
    recipes.forEach(element => element.ustensils.forEach(ustensil => {
        if(!allUstensils.includes(ustensil.toLowerCase())) {
            allUstensils.push(ustensil.toLowerCase())
        }
    }))
   
    
    //Create list of appliances without doubles
    recipes.forEach(element => {
        if(!allAppliances.includes(element.appliance.toLowerCase())) {
            allAppliances.push(element.appliance.toLowerCase())
        }
    })
    console.log(allIngredients)
  

    const ingredientsDropdown = new Dropdown(allIngredients, "Ingrédients", sortRecipes, selectedIngredients).render()
    const ustensilsDropdown = new Dropdown(allUstensils, "Ustensiles", sortRecipes, selectedUstensils).render()
    const applianceDropdown = new Dropdown(allAppliances, "Appareils", sortRecipes, selectedAppliance).render()
    
    const dropdowns = document.createElement("div");
    dropdowns.className = "dropdowns"
    dropdowns.append(ingredientsDropdown, applianceDropdown, ustensilsDropdown)

    main.appendChild(dropdowns)

    displayCards(recipes)

    //SEARCH
    const search = document.querySelector(".search")
    search.value = ""

    search.addEventListener("keyup", (e) => {
       // if(e.target.value.length > 2) {
            //On déclenche la recherche
            userInput = e.target.value
            sortRecipes()
        //}
    })
}  

init();
