class RecipeCard {
    constructor(data) {
        this.data = data;
    }

    render() {
        const card = document.createElement("div")
        card.className = "recipeCard"
        
        const imagePlaceHolder = document.createElement("div")
        imagePlaceHolder.className = "imagePlaceHolder"

        const image = document.createElement("img")
        image.src = this.data.image

        imagePlaceHolder.appendChild(image)

        const infoWrapper = document.createElement("div")
        infoWrapper.className = "infoWrapper"


        const cardHeader = document.createElement("div")
        cardHeader.className =  "cardHeader"

        const title = document.createElement("h2")
        title.textContent = this.data.name

        const cookingtime = document.createElement("p")
        cookingtime.textContent = `${this.data.time} min`
        cookingtime.insertAdjacentHTML('afterbegin', '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/></svg>')

        cardHeader.append(title, cookingtime)

        const ingredientsAndDescription = document.createElement("div")
        ingredientsAndDescription.className = "ingredientsAndDescription"

        const ingredients = document.createElement("div")
        ingredients.className = "ingredients"


        this.data.ingredients.forEach( element => {
            let instructions = document.createElement("p")
            const ingredient = document.createElement("span")
            ingredient.textContent = element.ingredient
            ingredient.className = "ingredient"
            instructions.insertAdjacentHTML('afterbegin', `${ingredient.outerHTML}: ${typeof element.quantity !=="undefined" ? element.quantity : ""} ${typeof element.unit !== 'undefined' ? element.unit : ""}`) 

            ingredients.appendChild(instructions)
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