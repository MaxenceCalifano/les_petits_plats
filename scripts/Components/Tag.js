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
            console.log(tag)
            if(this.selection.includes(tag.textContent)) {
                // Remove the item
                this.selection.splice(this.selection.indexOf(tag.textContent), 1)
                this.sortRecipe()
                console.log(this.selection)
                //this.updateSelection()
            }
                
        })

        const svg = document.createElement("img")
        svg.src = "../../Assets/close.svg"

        tag.insertAdjacentElement("beforeend", svg)

        return tag
    }
}

/**
 * option.addEventListener('click', () => {
                if(this.selection.includes(option.value)) {
                    // Remove the item
                    this.selection.splice(this.selection.indexOf(option.value), 1)
                    this.updateSelection()
                    option.setAttribute("selected", false)
                } else {
                    this.selection.push(option.value)
                    this.updateSelection()
                    option.setAttribute("selected", true)
                }
                    
            })
 */

export { Tag }