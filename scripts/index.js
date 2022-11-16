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

    recipesList.forEach(element => {
        const recipeCard =  new RecipesFactory(element)
 
        recipesCards.appendChild(recipeCard)
     });
     
     main.append(recipesCards)
}

function sortRecipes() {
    sortedRecipes = recipes;
   /*  console.log('sortedREcipes: ',sortedRecipes)
    console.log('selected ustensils: ', selectedUstensils)
    console.log('selected appliances: ', selectedAppliance) */

    if(userInput.length > 2 ) {
        /**
         * chercher si la string de l'utilisateur est dans le titre, les ingrédients, et la description
         */
        sortedRecipes = sortedRecipes.filter(recipe => {
            if(recipe.ingredients.some(ingredient =>  ingredient.ingredient.includes(userInput))) {
                return true
            }
            if(recipe.name.includes(userInput)) {
                return true
            }
            if(recipe.description.includes(userInput)) {
                return true
            }
        })

       
    }
   
    /**
     * vérifie si des appareils ont été séléctionnés et tri les recettes en fonction
     */
    if(selectedAppliance.length > 0) {
        sortedRecipes = sortedRecipes.filter(recipe => selectedAppliance.includes(recipe.appliance))
    }
    if(selectedUstensils.length > 0) {
        sortedRecipes = sortedRecipes.filter( recipe => selectedUstensils.every(value => recipe.ustensils.includes(value)))
    }

    if(selectedIngredients.length > 0) {
        sortedRecipes = sortedRecipes.filter( recipe => {
            let testArray = []
            recipe.ingredients.forEach(ingredient => testArray.push(ingredient.ingredient))
            return selectedIngredients.every(value => testArray.includes(value))
            
            
        })
    }

     /**
         * Get appliances from the selected recipes
     */
      appliances = []
      sortedRecipes.forEach(element => {
          if(!appliances.includes(element.appliance)) {
              appliances.push(element.appliance)
          }
      })
      /**
       * Get ustensils from the selected recipes
       */
      ustensils = []
      sortedRecipes.forEach(element => element.ustensils.forEach(ustensil => {
          if(!ustensils.includes(ustensil)) {
              ustensils.push(ustensil)
          }
      }))
    
      /**
       * Get ingredients from the selected recipes
       */
      ingredients = []
      sortedRecipes.forEach(element => element.ingredients.forEach(ingredient => {
          if(!ingredients.includes(ingredient.ingredient)) {
              ingredients.push(ingredient.ingredient)
          }
      }))

      // Update dropdowns
      const dropdowns = document.querySelector(".dropdowns")
      const updatedAppliancesDropdown = new Dropdown(appliances, "Appareils", updateSelection, selectedAppliance).render()
      const updatedUstensilsDropdown = new Dropdown(ustensils, "Ustensiles", updateSelection, selectedUstensils).render()
      const updatedIngredientsDropdown = new Dropdown(ingredients, "Ingrédients", updateSelection, selectedIngredients).render()

      const appliancesDropdown =  document.querySelector(".dropdownWrapper.appliances")
      dropdowns.removeChild(appliancesDropdown)

      dropdowns.firstChild.remove()
      dropdowns.lastChild.remove()
      dropdowns.insertAdjacentElement('beforeend', updatedIngredientsDropdown)
      dropdowns.insertAdjacentElement('beforeend', updatedAppliancesDropdown)
      dropdowns.insertAdjacentElement('beforeend', updatedUstensilsDropdown)

     console.log(sortedRecipes)

    // TAGS : Remove previous tags, then create new ones
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

    dropdowns.insertAdjacentElement("beforebegin", tags)

    
        /**
         * pour chaque recette, on veut vérifier si elle contient dans ses ustensils, l'un des ustensils de la séléction
         * Ensuite on veut garder que celle qui a un des ustensils de la séléction
         */
        displayCards(sortedRecipes)
      
    }

    
    const updateSelection = (value) => {
        //selectedAppliance.push(value)
        /**
         * appel la fonction de tri
         * et re appel displays cards avec les recette triées
         */
        //console.log(selectedAppliance, selectedUstensils)
        sortRecipes()
    }

async function init() {

    recipes = await getRecipes();
    sortedRecipes = recipes;

    //DROPDOWNS


    //Create list of ingredients without doubles
    recipes.forEach(element => element.ingredients.forEach(ingredient => {
        if(!allIngredients.includes(ingredient.ingredient)) {
            allIngredients.push(ingredient.ingredient)
        }
    }))
    allIngredients.sort((a, b) => a.localeCompare(b))

    //Create list of ustensils without doubles
    recipes.forEach(element => element.ustensils.forEach(ustensil => {
        if(!allUstensils.includes(ustensil)) {
            allUstensils.push(ustensil)
        }
    }))
    allUstensils.sort((a, b) => a.localeCompare(b))
    
    //Create list of appliances without doubles
    recipes.forEach(element => {
        if(!allAppliances.includes(element.appliance)) {
            allAppliances.push(element.appliance)
        }
    })
    allAppliances.sort((a, b) => a.localeCompare(b))

    const ingredientsDropdown = new Dropdown(allIngredients, "Ingrédients", updateSelection, selectedIngredients).render()
    const ustensilsDropdown = new Dropdown(allUstensils, "Ustensiles", updateSelection, selectedUstensils).render()
    const applianceDropdown = new Dropdown(allAppliances, "Appareils", updateSelection, selectedAppliance).render()
    
    const dropdowns = document.createElement("div");
    dropdowns.className = "dropdowns"
    dropdowns.append(ingredientsDropdown, applianceDropdown, ustensilsDropdown)

    main.appendChild(dropdowns)

    displayCards(recipes)

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