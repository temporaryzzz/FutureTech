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
        ariaControls: 'aria-controls',
        tabIndex: 'tabindex',
    }

    constructor(tabsElement) {
        this.tabsElement = tabsElement
        this.buttonElements = this.tabsElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.tabsElement.querySelectorAll(this.selectors.content)
        this.state = {
            activeTabIndex: [...this.buttonElements]
            .findIndex((buttonElement) => {buttonElement.classList.contains(this.stateClasses.isActive)})
        }
        this.limitTabIndex = this.buttonElements.length - 1
        this.bindEvents()
    }

    updateUI() {
        const {activeTabIndex} = this.state

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex

            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex

            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
        })
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
        this.updateUI()
    }

    activateTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex
        this.buttonElements[newTabIndex].focus()
    }

    previousTab = () => {
        const newTabIndex = this.state.activeTabIndex === 0 
        ? this.limitTabIndex
        : this.state.activeTabIndex - 1

        this.activateTab(newTabIndex)
    }

    nextTab = () => {
        const newTabIndex = this.state.activeTabIndex ===  this.limitTabIndex
        ? 0
        : this.state.activeTabIndex + 1

        this.activateTab(newTabIndex)
    }

    homeTab = () => {
        this.activateTab(0)
    }

    endTab = () => {
        this.activateTab(this.limitTabIndex)
    }

    onKeyDown(event) {
        const {code, metakey} = event

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.homeTab,
            End: this.endTab,
        }[code]

        const isMacHomeKey = metakey && code === 'ArrowLeft'
        const isMacEndKey = metakey && code === 'ArrowRight'

        if(isMacHomeKey) {
            this.homeTab()
            this.updateUI()
            return
        }

        if(isMacEndKey) {
            this.endTab()
            this.updateUI()
            return
        }

        action?.()
        this.updateUI()
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => {this.onButtonClick(index)})
        })

        this.tabsElement.addEventListener('keydown', (event) => {this.onKeyDown(event)})
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