class TqLogin extends HTMLElement {

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
      location.hash = location.hash.length > 0 ? location.hash : 'random'
      let jwt = JSON.parse(localStorage.getItem('jwt'))
      this.isLoggedIn = !!jwt;
    }
    if (this.isLoggedIn) {
      document.dispatchEvent(new CustomEvent('login'))
    }
  }

  connectedCallback() {
    this.logoutBtn = this.shadowRoot.querySelector('.logout')
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener('click', this.logout.bind(this))
    }
  }
  disconnectedCallback() {
    if (this.logoutBtn) {
      this.logoutBtn.removeEventListener('click', this.logout)
    }
  }

  logout() {
    localStorage.removeItem('jwt')
  }

  getButton() {
    let clientId = '2361f7ndpia7640dqacs83ml1n'
    let redirect = location.href.indexOf('localhost') > -1 ? 'http://localhost:3000' : 'https://d26bupu8rknfjq.cloudfront.net/'
    if (this.isLoggedIn) {
      return `
      <a class="btn logout" href="https://twiqqs-test.auth.eu-west-1.amazoncognito.com/logout?response_type=token&client_id=${clientId}&redirect_uri=${redirect}">
        Logout
      </a>`
    } else {
      return `
      <a class="btn login" href="https://twiqqs-test.auth.eu-west-1.amazoncognito.com/login?response_type=token&client_id=${clientId}&redirect_uri=${redirect}">
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
        .btn {
          padding: var(--space-s) calc(var(--space-m)*2);
          border: 1px solid var(--light);
          background: var(--dark);
          color: var(--light);
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.15);
        }
        .btn:hover {
          background: var(--chocolate);
        }
        @media only screen and (max-width: 600px) {
          .btn {
            padding: var(--space-s);
          }
        }
      </style>
      ${this.getButton()}
    `
  }
}
export default customElements.define('tq-login', TqLogin)
