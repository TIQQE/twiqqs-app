class TqNav extends HTMLElement {
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
    this.render();
  }

  constructor() {
    super()
    this._data = [{ name: '...', value: '...', class: 'skeleton' }, { name: '...', value: '...', class: 'skeleton' }, { name: '...', value: '...', class: 'skeleton' }]
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.render()
  }
  connectedCallback() {
    console.log('Connected component')
    this.nav = this.shadowRoot.querySelector('nav')
  }
  disconnectedCallback() {
    console.log('Disconnected component')
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          display: block;
          overflow-x: hidden;
          background-color: var(--dark, black);
        }
        a:first-child {
          margin-top: var(--space-s);
        }
        a {
          display: block;
          color: var(--light, black);
          text-decoration: none;
          padding: var(--space-s);
        }
        a:hover {
          background: rgba(255,255,255,0.1);
        }
        .skeleton {
          background: rgba(255,255,255,0.3);
          margin: var(--space-s) 0;
          padding: 0;
          width: 100px;
          color: transparent;
          position: relative;
        }
      </style>
      <nav>
      ${(() => {
        let html = ''
        for (let item of this._data) {
          html += `<a class="${item.class}" href="#${item.name}" >#${item.name}</a > `
        }
        return html;
      })()}
      </nav >`
  }
}
export default customElements.define('tq-nav', TqNav)
