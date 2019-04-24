class TqLogin extends HTMLElement {

  constructor() {
    super()
    this._data;
    this.isLoggedIn = false;
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  connectedCallback() {
    document.addEventListener('login', (evt) => {
      console.log('login event', evt)
    })
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
    } else {
      console.log(JSON.parse(localStorage.getItem('jwt')))
    }
    let loginEvent = new CustomEvent("login", {
      bubbles: true,
      cancelable: false,
      composed: true
    })
    document.dispatchEvent(loginEvent)
  }
  disconnectedCallback() {
    document.removeEventListener('login')
  }

  getButton() {
    let clientId = '2361f7ndpia7640dqacs83ml1n'
    if (this.isLoggedIn) {
      return `
      <a href="https://twiqqs-test.auth.eu-west-1.amazoncognito.com/logout?response_type=token&client_id=${clientId}&redirect_uri=http://localhost:3000">
        Logout
      </a>`
    } else {
      return `
      <a href="https://twiqqs-test.auth.eu-west-1.amazoncognito.com/login?response_type=token&client_id=${clientId}&redirect_uri=http://localhost:3000">
        Login
      </a>`
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        div {
          display: block;
          min-height: 20px;
        }
      </style>
      ${this.getButton()}
    `
  }
}
export default customElements.define('tq-login', TqLogin)
