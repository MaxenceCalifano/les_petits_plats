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
        this.options.sort((a, b) => a.localeCompare(b))

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


    // Input
    const search = document.createElement("input")
    search.type = "text"
    search.placeholder = `Rechercher un ${this.name.toLowerCase().slice(0, this.name.length -1)}`

    console.log(this.options)

    search.addEventListener("keyup", (e) => {
        
        let options;
        if(this.name === "Ingrédients") {
            options = document.querySelectorAll(".optionWrapper")[0]
        }
        if(this.name === "Appareils") {
            options = document.querySelectorAll(".optionWrapper")[1]
        }
        if(this.name === "Ustensiles") {
            options = document.querySelectorAll(".optionWrapper")[2]
        }
        
        let filteredOptions = this.options.filter( element => element.includes(e.target.value));
        console.log(filteredOptions)
    
        options.innerHTML = "" 

        filteredOptions.forEach( option => {
            const button = document.createElement('button');
            button.textContent = option;
           
            button.value = option
            if(this.selection.includes(button.value)) {
                button.setAttribute("selected", true)
            }

            button.addEventListener('click', () => {
                if(this.selection.includes(button.value)) {
                    // Remove the item
                    this.selection.splice(this.selection.indexOf(button.value), 1)
                    this.updateSelection()
                    button.setAttribute("selected", false)
                } else {
                    this.selection.push(button.value)
                    this.updateSelection()
                    button.setAttribute("selected", true)
                }
                    
            })
            options.appendChild(button)
        })
    })

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