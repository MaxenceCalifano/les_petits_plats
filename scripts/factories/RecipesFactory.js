import { RecipeCard } from "../Components/RecipeCard.js";

class RecipesFactory {
    constructor(data) {
        this.data = data;

        return new RecipeCard(data).render()
    }
}

export { RecipesFactory }