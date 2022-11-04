class RecipeCard {
    constructor(data) {
        this.data = data;
    }

    render() {
        const card = document.createElement("div")
        card.className = "recipeCard"
        
        const title = document.createElement("h2")
        title.textContent = this.data.name

        const cookingtime = document.createElement("p")
        cookingtime.textContent = this.data.time

        const ingredients = document.createElement("div")
        ingredients.className = "ingredients"


        this.data.ingredients.forEach( element => {
            let ingredient = document.createElement("p")
            ingredient.textContent = `${element.ingredient} ${typeof element.quantity !=="undefined" ? element.quantity : ""} ${typeof element.unit !== 'undefined' ? element.unit : ""}`

            ingredients.appendChild(ingredient)
        })

        const description = document.createElement("p")
        description.textContent = `${this.data.description.slice(0,200)}...`

        card.append(title, cookingtime, ingredients, description)

        return card
    }
}

export { RecipeCard }