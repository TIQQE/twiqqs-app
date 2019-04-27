import { getTopics } from '../scripts/twiqqsRepo.js';
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
    this.updateData = this.updateData.bind(this)
    this.updateData()
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  connectedCallback() {
    window.addEventListener("hashchange", this.render, false);
    document.addEventListener("login", this.updateData);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.render);
    document.addEventListener("login", this.updateData);
  }

  async updateData() {
    try {
      let result = await getTopics()
      this.data = result
    } catch (ex) {
      this.data = [];
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          display: block;
          overflow-x: hidden;
          background-color: var(--dark, black);
          margin-bottom: 16px;
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
        a.active {
          font-weight: 700;
        }
        .skeleton {
          background: rgba(255,255,255,0.3);
          margin: var(--space-s) 0;
          padding: 0;
          width: 100px;
          color: transparent;
          position: relative;
        }
        .title {
          font-weight: 100;
          font-size: 16px;
          padding: 0 var(--space-s);
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: space-between;
          justify-items: center;
        }
        .title button {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 8px;
          background: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
        .title button span {
          width: 20px;
          height: 20px;
        }
      </style>
      <div class="title">Channels<button><span>+</span></button></div>
      <nav>
      ${(() => {
        let topic = location.hash.substring(1).trim();
        let html = ''
        for (let item of this._data) {
          html += `<a class="${item.class ? item.class : ''}${item.name === topic ? ' active' : ''}" href="#${item.name}" >#${item.name}</a > `
        }
        return html;
      })()}
      </nav>
      <div class="title">Users</div>
      `
  }
}
export default customElements.define('tq-nav', TqNav)
