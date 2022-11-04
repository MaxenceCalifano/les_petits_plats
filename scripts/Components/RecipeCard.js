class RecipeCard {
    constructor(data) {
        this.data = data;
    }

    render() {
        const card = document.createElement("div")
        card.className = "recipeCard"
        
        const imagePlaceHolder = document.createElement("div")
        imagePlaceHolder.className = "imagePlaceHolder"

        const infoWrapper = document.createElement("div")
        infoWrapper.className = "infoWrapper"


        const cardHeader = document.createElement("div")
        cardHeader.className =  "cardHeader"

        const title = document.createElement("h2")
        title.textContent = this.data.name

        const cookingtime = document.createElement("p")
        cookingtime.textContent = this.data.time

        cardHeader.append(title, cookingtime)

        const ingredientsAndDescription = document.createElement("div")
        ingredientsAndDescription.className = "ingredientsAndDescription"

        const ingredients = document.createElement("div")
        ingredients.className = "ingredients"


        this.data.ingredients.forEach( element => {
            let ingredient = document.createElement("p")
            ingredient.textContent = `${element.ingredient} ${typeof element.quantity !=="undefined" ? element.quantity : ""} ${typeof element.unit !== 'undefined' ? element.unit : ""}`

            ingredients.appendChild(ingredient)
        })

        const description = document.createElement("p")
        description.textContent = `${this.data.description.slice(0,200)}...`

        ingredientsAndDescription.append(ingredients, description)

        infoWrapper.append(cardHeader, ingredientsAndDescription)

        card.append(imagePlaceHolder, infoWrapper)

        return card
    }
}

export { RecipeCard }