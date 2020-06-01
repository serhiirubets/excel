import './scss/index.scss';

import {Router} from '@core/routes/Router';
import {DashBoardPage} from '@/pages/DashBoard/DashBoardPage';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
  dashboard: DashBoardPage,
  excel: ExcelPage,
});
