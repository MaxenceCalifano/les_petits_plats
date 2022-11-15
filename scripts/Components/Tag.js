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
        tag.textContent = this.tagName

        tag.addEventListener('click', () => {
            if(this.selection.includes(tag.textContent)) {
                // Remove the item
                this.selection.splice(this.selection.indexOf(tag.textContent), 1)
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