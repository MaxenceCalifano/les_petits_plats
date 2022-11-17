class Tag {
    constructor(tagName, type, selection, sortRecipe) {
        this.tagName = tagName
        this.type = type
        this.selection = selection
        this.sortRecipe = sortRecipe
    }

    render() {
        const tag = document.createElement("button")
        tag.className = `tag ${this.type}`
        tag.textContent = this.tagName[0].toUpperCase() + this.tagName.slice(1).toLowerCase()

        tag.addEventListener('click', () => {
            if(this.selection.includes(this.tagName)) {
                // Remove the item
                this.selection.splice(this.selection.indexOf(this.tagName), 1)
                this.sortRecipe()
            }
                
        })

        const svg = document.createElement("img")
        svg.src = "../../Assets/close.svg"

        tag.insertAdjacentElement("beforeend", svg)

        return tag
    }
}

export { Tag }