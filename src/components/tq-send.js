class TqSend extends HTMLElement {

  constructor() {
    super()
    this._data;
    this.isLoggedIn = false;
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.init()
    this.render()
  }

  init() {
    let hash = window.location.hash;
    if (hash.indexOf('access_token') !== -1) {
      let parts = location.hash.substring(1).split('&')
      let id_token = parts[0].split('=')[1]
      let access_token = parts[1].split('=')[1]
      let expires_in = parts[2].split('=')[1]
      let token_type = parts[3].split('=')[1]
      let jwt = { id_token, access_token, expires_in, token_type }

      localStorage.setItem('jwt', JSON.stringify(jwt))
      location.hash = 'random'
      this.isLoggedIn = true;
    } else {
      let jwt = JSON.parse(localStorage.getItem('jwt'))
      this.isLoggedIn = !!jwt;
      console.log(jwt)
    }
  }

  connectedCallback() {
    this.messageBox = this.shadowRoot.querySelector('.message-box')
    this.messageBox.addEventListener('keypress', this.typing.bind(this))
  }
  disconnectedCallback() {
    if (this.messageBox) {
      this.messageBox.removeEventListener('keypress', this.typing)
    }
  }

  typing(e) {
    if (e.which === 13 && !e.shiftKey) {
      console.log('enter and not shift')
    } else {
      console.log('normal typing', e)
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        textarea {
          display: block;
          min-height: 20px;
          width: 100%;
          resize: none;
        }
      </style>
      <textarea class="message-box"></textarea>
    `
  }
}
export default customElements.define('tq-send', TqSend)
