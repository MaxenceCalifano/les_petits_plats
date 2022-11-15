class Dropdown {
    constructor(options, name, updateSelection, selection) {
        this.options = options
        this.name = name
        this.isOpen = false
        this.updateSelection = updateSelection
        this.selection = selection
        // doit retourner toutes les options choisies
        /*  Bouton avec une fléche
            au click sur la fleche on display une div qui contient toutes les options possibles
            on stock les valeurs séléctionné par l'user
            au click sur chacune des valeur on change le style
        */

    }
    
    render() {
        let customClass = ""
        
        if(this.name === "Ustensiles") {
            customClass = "ustensils"
        }//this.name === "Ustensiles" ? "ustensils" : "appliances"
        if(this.name === "Appareils") {
            customClass = "appliances"
        }//this.name === "Ustensiles" ? "ustensils" : "appliances"
        if(this.name === "Ingrédients") {
            customClass = "ingredients"
        }//this.name === "Ustensiles" ? "ustensils" : "appliances"

        // Get tags div to create and remove tags in it
        const tags = document.querySelector(".tags")
        const dropdowns = document.querySelector(".dropdowns")

        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdownWrapper', customClass)

        const dropdownButton = document.createElement('button');
        dropdownButton.className = "dropdownButton";
        dropdownButton.textContent = this.name
        const svg = document.createElement("img")
        svg.setAttribute('src', 'Assets/chevron.svg');
        dropdownButton.insertAdjacentElement("beforeend", svg)

        dropdownButton.addEventListener('click', () => {

            if(this.isOpen) {
                dropdownOpen.style.display = "none"
                svg.style.transform = "rotate(0deg)"
                this.isOpen = false
            } else {
                dropdownOpen.style.display = "block"
                svg.style.transform = "rotate(180deg)"
                this.isOpen = true
                dropdownOpen.focus()
            }
        })
       

       const dropdownOpen = document.createElement("div")
       dropdownOpen.className = "dropdownOpen"

       const search = document.createElement("input")
       search.type = "text"
       search.placeholder = `Rechercher un ${this.name.toLowerCase().slice(0, this.name.length -1)}`

       dropdownOpen.appendChild(search)

       const optionWrapper = document.createElement('div')
       optionWrapper.className = "optionWrapper"

        this.options.forEach(value => {
            const option = document.createElement('button');
            option.textContent = value;
           
            option.value = value
            if(this.selection.includes(option.value)) {
                option.setAttribute("selected", true)
            }

            option.addEventListener('click', () => {
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
            optionWrapper.appendChild(option)
        })

        dropdownOpen.appendChild(optionWrapper)
        

        dropdown.append(dropdownButton,dropdownOpen);
        document.body.addEventListener('click', (e) => {
            if(!dropdown.contains(e.target)) {
                dropdownOpen.style.display = "none"
                svg.style.transform = "rotate(0deg)"
                this.isOpen = false
            }
            
        }
    )

        return dropdown;
    }
}
export { Dropdown }