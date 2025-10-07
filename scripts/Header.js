class Header {

    selectors = {
        root: '[data-js-header]',
        overlay: '[data-js-header-overlay]',
        burgerMenu: '[data-js-header-burger-menu]',
    };
    stateClasses = {
        isActive: 'active',
        isLock: 'lock',
    };

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
        this.burgerMenuElement = this.rootElement.querySelector(this.selectors.burgerMenu)
        this.bindEvents()
    }

    bindEvents() {
        this.burgerMenuElement.addEventListener('click', this.onBurgerMenuClick)
    }

    onBurgerMenuClick = () => {
        this.burgerMenuElement.classList.toggle(this.stateClasses.isActive)
        this.overlayElement.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)
    }

}

export default Header;