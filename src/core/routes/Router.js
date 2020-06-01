import {$} from '../dom';
import {ActiveRoute} from '../routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler(e) {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();

    const path = ActiveRoute.path;
    const Page = path.includes('excel') ? this.routes.excel : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);

    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
