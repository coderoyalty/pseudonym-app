export default class AuthObserver<T = string> {
  private observers: Map<T, VoidFunction[]> = new Map();

  subscribe(eventType: T, callback: VoidFunction) {
    const callbacks = this.observers.get(eventType);
    if (!callbacks) {
      this.observers.set(eventType, [callback]);
      return;
    }
    // avoid duplicate callbacks
    if (callbacks.includes(callback)) {
      return;
    }

    callbacks.push(callback);
  }

  unsubscribe(eventType: T, callback: VoidFunction) {
    const callbacks = this.observers.get(eventType);
    if (!callbacks) return;

    const index = callbacks.indexOf(callback);

    if (index != -1) {
      callbacks.splice(index, 1);
    }
  }

  async trigger(eventType: T) {
    const callbacks = this.observers.get(eventType);
    if (!callbacks) {
      return;
    }

    const promises = callbacks.map((callback) => {
      callback();
    });

    await Promise.all(promises);
  }
}
