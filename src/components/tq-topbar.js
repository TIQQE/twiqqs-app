import { } from './tq-login.js';

class TqTopbar extends HTMLElement {

  constructor() {
    super()
    this._data;
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  connectedCallback() {
  }
  disconnectedCallback() {
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .topbar {
          height: 56px;
          width: 100vw;
          padding: 8px;
          background: var(--dark);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }
        .btn {
          padding: var(--space-s) calc(var(--space-m)*2);
          border: 1px solid var(--light);
          background: var(--dark);
          color: var(--light);
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.15);
          border-radius: var(--space-s);
        }
        .btn:hover {
          background: var(--chocolate);
        }
        .app-icon {
          width: 40px;
        }
        @media only screen and (max-width: 600px) {
          .btn {
            padding: var(--space-s);
          }
        }
      </style>
      <div class="topbar">
        <img class="app-icon" src="images/icons/icon-72x72.png" />
        <tq-login></tq-login>
      </div>
    `
  }
}
export default customElements.define('tq-topbar', TqTopbar)
