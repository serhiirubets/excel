import {Page} from '@core/Page/Page';
import {$} from '@core/dom';
import {createRecords} from '@/pages/DashBoard/dashboard.functions';

export class DashBoardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'dash-board').html(`
   
    <div class="dash-board__header">
      <h1>Excel Dash Board</h1>
    </div>

    <div class="dash-board__new">
      <div class="dash-board__view">
        <a href="#excel/${now}" class="dash-board__create">Новая <br> таблица</a>
      </div>
    </div>

    <div class="dash-board__table dash-board__view">
      ${createRecords()}
    </div>
    `);
  }
}
