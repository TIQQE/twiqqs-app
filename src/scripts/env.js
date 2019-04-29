const dev = {
  clientId: '2361f7ndpia7640dqacs83ml1n',
  twiqqsApi: 'https://pbkh6aqm1e.execute-api.eu-west-1.amazonaws.com/test',
  webSockets: 'wss://us9g1zlouc.execute-api.eu-west-1.amazonaws.com/test'

}

const test = {
  clientId: '2361f7ndpia7640dqacs83ml1n',
  twiqqsApi: 'https://pbkh6aqm1e.execute-api.eu-west-1.amazonaws.com/test',
  webSockets: 'wss://us9g1zlouc.execute-api.eu-west-1.amazonaws.com/test'
}

const prod = {
  clientId: '',
}

// TODO add prod discovery
let env = dev;
if (location.href.indexOf('localhost') > -1) {
  env = dev;
} else {
  env = test;
}

export { env };

