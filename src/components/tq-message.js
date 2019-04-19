class TqMessage extends HTMLElement {

  /**
   * {user: {name: 'David', img: 'absolute-url-to-s3-bucket'}, message: {content: 'aaa', created: '2019-04-19T19:02:10.510Z'} }
   */
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = data;
    this.render();
  }

  constructor() {
    super()
    this._data = JSON.parse(decodeURI(this.getAttribute('data')));
    this.imgElm;
    this.nameElm;
    this.timeElm;
    this.messageElm;
    this.render = this.render.bind(this)
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        .message {
          display: block;
          min-height: 20px;
          background: rgba(0,0,0,0.03);
          padding: var(--space-m);
          margin: 0 0 var(--space-s) 0;
          display: grid;
          grid-template-columns: auto 1fr;
          grid-gap: var(--space-s);
        }
        .img {
          width: 40px;
          height: 40px;
        }
      </style>
      <div class='message'>
        <img src='${this.getImage()}' class='img' />
        <div>
          <span class='name'>${this.getUserName()}</span>
          <span class='time'>${this.getCreated()}</span>
          <div class='content'>${this.getMessageContent()}</div>
        </div>
      </div>`
  }
  connectedCallback() {
    console.log('Connected tq-message')
    this.imgElm = this.shadowRoot.querySelector('.img')
    this.nameElm = this.shadowRoot.querySelector('.name')
    this.timeElm = this.shadowRoot.querySelector('.time')
    this.messageElm = this.shadowRoot.querySelector('.content')
  }

  disconnectedCallback() {
    console.log('Disconnected tq-message')
  }
  getImage() {
    return (this.data && this.data.user && this.data.user.img) ? this.data.user.img : '';
  }
  getUserName() {
    return (this.data && this.data.user && this.data.user.name) ? this.data.user.name : '';
  }
  getCreated() {
    let hasCreatedDate = (this.data && this.data.message && this.data.message.created) ? true : false;
    if (hasCreatedDate) {
      return new Date(this.data.message.created)
        .toLocaleTimeString()
        .substr(0, 5);
    } else {
      return '';
    }
  }
  getMessageContent() {
    return (this.data && this.data.message && this.data.message.content) ? this.data.message.content : '';
  }
  render() {
    // One optimization could be to only update if the data is different from the current. 
    this.imgElm.src = this.data.user.img;
    this.nameElm.innerText = this.data.user.name;
    this.timeElm.innerText = this.data.message.created;
    this.messageElm.innerHTML = this.data.message.content;
  }
}
export default customElements.define('tq-message', TqMessage)
