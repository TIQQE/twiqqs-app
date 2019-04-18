class TqNav extends HTMLElement {
  constructor() {
    super();
    this.nav;
    this.items = [];
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          display: block;
          min-width: 200px;
          background-color: var(--dark, black);
        }
        a {
          display: block;
          color: var(--light, black);
          margin: var(--space-s) 0;
          text-decoration: none;
        }
        .skeleton {
          background: rgba(0,0,0,0.1);
          width: 200px;
          color: transparent;
        }
      </style>
      <nav>
        <a href="#abc" class="skeleton">|</a>
        <a href="#abc" class="skeleton">|</a>
      </nav>
      `
  }
  connectedCallback() {
    console.log('Connected component');
    this.nav = this.shadowRoot.querySelector("nav");
  }
  disconnectedCallback() {
    console.log('Disconnected component');
  }
  updateUi(items, self) {
    self.nav.innerHTML = '';
    for (let item of items) {
      self.nav.innerHTML += `<a href="#${item.name}">${item.name}</a>`;
    }
  }
}
export default customElements.define('tq-nav', TqNav);