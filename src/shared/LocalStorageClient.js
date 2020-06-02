import {storage} from '../core/utils';

export class LocalStorageClient {
  constructor(name) {
    this.name = `excel:${name}`;
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return Promise.resolve(storage(this.name));
  }
}
