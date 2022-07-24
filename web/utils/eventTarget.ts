type Listener = Function

var EventTargets = function (this: any) {
  this.listeners = {}
}

EventTargets.prototype.addEventListener = function (
  type: string,
  callback: Listener
) {
  if (this.listeners[type]) {
  } else {
    this.listeners[type] = []
  }
  this.listeners[type].push(callback)
}

EventTargets.prototype.removeEventListener = function (
  type: string,
  callback: Listener
) {
  if (!this.listeners[type]) {
    return
  }
  var stack = this.listeners[type]
  stack = stack.filter((l: Listener) => callback !== l)
  this.listeners[type] = stack
}

EventTargets.prototype.dispatchEvent = function (event: any) {
  if (!this.listeners[event.type]) {
    return
  }
  var stack = this.listeners[event.type]
  event.target = this
  stack.forEach((l: Listener) => l.call(this, event))
}
