import {$} from '@core/dom';

export function resizeHandler(e, $root) {
  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const index = $parent.data.col;
  const cells = $root.findAll(`[data-col="${index}"]`);
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value = 0;

  $resizer.css({opacity: 1, [sideProp]: '-5000px'});

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;

      $resizer.css({right: -delta + 'px'});
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;

      $resizer.css({bottom: -delta + 'px'});
    }
  };

  document.onmouseup = () => {
    $resizer.css({opacity: 0, [sideProp]: '0', right: 0});

    if (type === 'col') {
      $parent.css({width: value + 'px'});
      cells.forEach(el => el.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }

    document.onmouseup = null;
    document.onmousemove = null;
  };
}
