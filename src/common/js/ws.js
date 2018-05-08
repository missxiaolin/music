export class KongWebSocket {
  static getInstance() {
    console.log(0)
    if (!KongWebSocket.instance) {
      KongWebSocket.instance = new KongWebSocket()
    }
    console.log(1)
    return KongWebSocket.instance
  }

  constructor() {
    /* eslint-disable no-unused-vars */
    var ws = new WebSocket(process.env.WS_URL)/* eslint-disable no-unused-vars */
    ws.onopen = function (evt) {
      console.log('connected websocket!')
    }
    ws.onclose = function (evt) {
      console.log('disconnected websocket!')
    }
    ws.onmessage = function (evt) {
      console.log(evt)
    }
    ws.onerror = function (evt) {
      ws.close()
    }

    this.ws = ws
  }
}
