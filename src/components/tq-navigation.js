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
          overflow-x: hidden;
          width: calc(200px-var(--space-m));
          background-color: var(--dark, black);
        }
        a {
          display: block;
          color: var(--light, black);
          margin: var(--space-s) 0;
          text-decoration: none;
        }
        .skeleton {
          background: rgba(255,255,255,0.3);
          width: 200px;
          color: transparent;
        }
      </style>
      <nav>
        <a href="#abc" class="skeleton">|</a>
        <a href="#abc" class="skeleton">|</a>
        <a href="#abc" class="skeleton">|</a>
        <a href="#abc" class="skeleton">|</a>
        <a href="#abc" class="skeleton">|</a>
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