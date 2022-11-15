class Tag {
    constructor(tagName, type) {
        this.tagName = tagName
        this.type = type
    }

    render() {
        const tag = document.createElement("button")
        tag.className = `tag ${this.type}`
        tag.textContent = this.tagName

        return tag
    }
}

export { Tag }