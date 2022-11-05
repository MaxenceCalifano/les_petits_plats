class Dropdown {
    constructor(options, name) {
        this.options = options
        this.name = name
        this.isOpen = false
        // doit retourner toutes les options choisies
        /*  Bouton avec une fléche
            au click sur la fleche on display une div qui contient toutes les options possibles
            on stock les valeurs séléctionné par l'user
            au click sur chacune des valeur on change le style
        */
    }
    render() {

        const customClass = this.name === "Ustensiles" ? "ustensils" : "appliance"

        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdownWrapper',customClass)

        const dropdownButton = document.createElement('button');
        dropdownButton.className = "dropdownButton";
        dropdownButton.textContent = this.name
        dropdownButton.insertAdjacentHTML("beforeend", '<svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.12 0.453369L8 6.56004L1.88 0.453369L0 2.33337L8 10.3334L16 2.33337L14.12 0.453369Z" fill="white"/></svg>')
        

        dropdownButton.addEventListener('click', () => {
            const svg = document.querySelector(".dropdownButton svg")
           

            if(this.isOpen) {
                dropdownOpen.style.display = "none"
                svg.style.transform = "rotate(0deg)"
                this.isOpen = false
            } else {
                dropdownOpen.style.display = "grid"
                svg.style.transform = "rotate(180deg)"
                this.isOpen = true
            }
        })

       const dropdownOpen = document.createElement("div")
       dropdownOpen.className = "dropdownOpen"

        this.options.forEach(value => {
            const option = document.createElement('button');
            option.textContent = value;

            dropdownOpen.appendChild(option)
        })


        dropdown.append(dropdownButton,dropdownOpen);

        return dropdown;
    }
}
export { Dropdown }