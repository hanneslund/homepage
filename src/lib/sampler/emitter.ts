type EventListener<T> = (event: T) => void;
class Emitter<EventType> {
  listeners: Set<EventListener<EventType>> = new Set();
  listen(cb: EventListener<EventType>) {
    this.listeners.add(cb);
  }

  unlisten(cb: EventListener<EventType>) {
    this.listeners.delete(cb);
  }

  emit(event: EventType) {
    this.listeners.forEach((cb) => {
      cb(event);
    });
  }
}

export default Emitter;
