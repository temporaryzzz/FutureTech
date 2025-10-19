const rootTabs = '[data-js-tabs]'

class Tabs {

    selectors = {
        tabs: rootTabs,
        button: '[data-js-tab-button]',
        content: '[data-js-tabs-content]',
    };

    stateClasses = {
        isActive: 'active',
    };

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(tabsElement) {
        this.tabsElement = tabsElement
        this.buttonElements = this.tabsElement.querySelectorAll(this.selectors.button)
        this.contensElements = this.tabsElement.querySelectorAll(this.selectors.content)
        this.bindEvents()
    }

    bindEvents() {
        this.buttonElements.forEach(button => {
            button.addEventListener('click', event => {this.onButtonClick(event.target)})
        })
    }

    onButtonClick = (button) => {
        this.buttonElements.forEach(button => {
            if(button.classList.contains(this.stateClasses.isActive)) {
                button.classList.toggle(this.stateClasses.isActive)
                button.setAttribute(this.stateAttributes.ariaSelected, false)
            }
        })
        button.classList.toggle(this.stateClasses.isActive)
        button.setAttribute(this.stateAttributes.ariaSelected, true)
    }

    switchContent = () => {
        
    }

}

class TabsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootTabs).forEach(tabsElement => {
            new Tabs(tabsElement)
        })
    }
}

export default TabsCollection;