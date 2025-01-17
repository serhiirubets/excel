import {Router} from './Router';
import {Page} from '../Page/Page';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';
    return root;
  }
}
class ExcelPage extends Page {}

describe('Router:', () => {
  let router;
  let $root;

  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    });
  });

  test('Should be defined', () => {
    expect(router).toBeDefined();
  });

  test('Should render dashboard page', async () => {
    await router.changePageHandler();
    expect($root.innerHTML).toBe('<div>dashboard</div>');
  });
});
