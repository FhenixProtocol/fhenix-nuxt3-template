import mitt from 'mitt'

type ApplicationEvents = {
  'network:connected': boolean
};

const emitter = mitt<ApplicationEvents>()
const emitEvent = emitter.emit
const listenToEvent = emitter.on

const EventBus = {
  emitEvent,
  listenToEvent,
};

export default EventBus;