import {Page} from '@core/Page';

import {Excel} from '@/components/excel/excel';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Header} from '@/components/header/Header';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {normalizeInitialState} from '@/redux/initialState';

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString();
    const storageName = `excel:${params}`;
    const state = storage(storageName);
    const store = createStore(rootReducer, normalizeInitialState(state));

    function stateListener(state) {
      storage(storageName, state);
    }

    store.subscribe(debounce(stateListener, 300));

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
