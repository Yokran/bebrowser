window.PickerUI = (function () {
  const NS = Api.NS;
  const STYLES = `display: block; visibility: visible`;
  const shadow = Api.hostRoot
  // Common root for all UI elements.
  const root = domo.DIV({'class': NS+'ui', style: STYLES},
    domo.DIV({'class': 'xbrwsr_preload'},
      domo.I({'class': 'xbrwsr_action_expand'}),
      domo.I({'class': 'xbrwsr_action_collapse'}),
      domo.I({'class': 'xbrwsr_action_widen'}),
      domo.I({'class': 'xbrwsr_action_narrow'}),
      domo.I({'class': 'xbrwsr_action_delete'})
    )
  );

  shadow.appendChild(
    domo.STYLE({
      type: 'text/css',
      media: 'screen',
    },
    `[class*='xbrwsr_marker'] {
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", 
        Helvetica, Arial, "Lucida Grande", sans-serif;
    }
    
    .xbrwsr_ui {
      display: initial;
      position: initial;
      overflow: visible;
      width: 0;
      height: 0;
    }
    
    .xbrwsr_ui > * {
      position: absolute;
      width: auto;
      height: auto;
    }
    
    .xbrwsr_vbar {
      z-index: 100000001;
      background-color: rgba(0, 0, 0, .8);
      height: 20px;
    }
    
    .xbrwsr_vbar [class^='xbrwsr_action_'] {
      float: left;
      border-left: solid 1px #aaa;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    
    .xbrwsr_vbar [class^='xbrwsr_action_']:hover {
      background-color: rgba(0, 0, 0, 1);
    }
    
    [class*='xbrwsr_marker'] {
      z-index: 100000000;
      border: solid 1px #000;
      width: 0;
      height: 0;
    }
    
    .xbrwsr_marker_EXCLUDE  {
      border-color: rgba(170, 0, 0, .9);
      background-color: rgba(170, 0, 0, .9);
      width: 0;
      height: 0;
    }
    
    .xbrwsr_marker_INCLUDE {
      border-color: rgba(51, 51, 51, .9);
      background-color: rgba(51, 51, 51, .9);
      color: #eee;
    }
    
    .xbrwsr_info {
      padding: 0 6px 0;
      font-size: small;
      line-height: 1;
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      width: auto;
      height: auto;
    }
    
    .xbrwsr_preload {
      position: absolute;
      top: -999;
    }
    
    .xbrwsr_action_expand {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAAP3AAACDAAAAdsAAAO3AAAA6wAAAF43mb8RAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAB4SURBVCjPY2CgIfiPRuNXbPNfjLAixv9u/y//n/ifmaCZ/3n/d/2/+7+cgAP+MzAw/Jf4v/D/7f/JxChV/b/t/6X/oXiV/oco1fp/+v+R/45EBNF//f/n/+/6b4BsIhOxoUye1UR6hpTg4SEuwImPQmITBRpNawAAztVdXodOhsEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTEtMjNUMTQ6MzI6MzMrMDU6MDBEaL00AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTExLTIzVDE0OjMyOjMzKzA1OjAwNTUFiAAAAABJRU5ErkJggg==);
    }
    
    .xbrwsr_action_collapse {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAAP3AAACDAAAAdsAAAO3AAAA6wAAAF43mb8RAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAACESURBVCjPY2CgC/iPRuNTKvbfhgjz/jP/n/j/8n+3/4wELP1f/v/u/67/PISUJf+//X/hfwmcboQqC/1/6f+2/6oEvPLf8f/h/6f/azEw/Met8D/Df4P/u/6f/6+PLWiYUHi4fYnF6iNEWE20Z4gMHowA5yXkTmKiEK6YmERBUjKjAAAAy/VdXhttn10AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTEtMjNUMTQ6MzI6MTUrMDU6MDBlnY9zAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTExLTIzVDE0OjMyOjE1KzA1OjAwFMA3zwAAAABJRU5ErkJggg==);
    }
    
    .xbrwsr_action_widen {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAAP3AAACDAAAAdsAAAO3AAAA6wAAAF43mb8RAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAE8SURBVCjPxdKxThRRFIfx350wM2Q0ZikMyxIbIlnhCYj2PoHwBNRmoyZWxmhhA7yEJISCZyAhxocQpZMNsYKCZJld91jsYhhDYWM8zS3ud/5f7j2H/1ZpcsRji746daFOCHItC5adpc8wM21Y9Frt0pEPxsj0PFUpbU+AbAoeqxXuOEhjSGMHKqWRL02w79KV0rtoQ8x7b1Zt4LQJXjiy6ZuHtmIu7tmy4sSmQ+eNN4XIiHbsxosoIo9e7EeHyOL2T4hW5BB5zDVvsj/In2KqGN2eNFHPx8foRREz8Tz2on1TfZ2YexlLtq1ac1dlTddOLHmlaE7mvj2VWSd6qU+07XhkYGgj/biZuKBSuvI29SGdeWOgVOo01ctKI7X1yCAyzwwN5bpN9RMPHPvu/PdSFFo6uvrp07/Zx7+uX6D2bpaObWE1AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTExLTIzVDE0OjMwOjQ2KzA1OjAwGGBLtwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMS0yM1QxNDozMDo0NiswNTowMGk98wsAAAAASUVORK5CYII=);
    }
    
    .xbrwsr_action_narrow {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAAP3AAACDAAAAdsAAAO3AAAA6wAAAF43mb8RAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAEeSURBVCjPxdLPS1QBFMXxz2sRPRlxN4qSyKQzm4ro32jVRmgd7SOhP0KFobVLQYNwof9JENLOWUhMgiA4KS9/HBfTNPls713e8+Xce7iX+65IKwv/6bXrYCdfsp2ZSAkpI3P5nJ0sDokHf8jKpbauVz5GWPHaJ0viaggUfz1ndLXFvneubXiKnvfF4W1H+jYFTQ2labDlcCSPwdJL3xx5ZMqk0rF9L0yO5OKfQDzUMOWnmHVioBrLY8che+m3uHbuYhSjHmbCB09Mm/BWZdO5vgPdYlB3PPPVM02VE6cqTc9996s2OjS9AUcGzvTBstn6jo+t6/hhTU/lQs+qAy3rmb+dYik72U0r0oA0UmQu29lLp37txTstmb/zFPdRNxR5b4hFgyWxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTExLTIzVDE0OjMxOjM2KzA1OjAw/WcpkAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMS0yM1QxNDozMTozNiswNTowMIw6kSwAAAAASUVORK5CYII=);
    }
    
    .xbrwsr_action_delete {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsXCDkCNvNGSAAAAThJREFUOMu91D9OW0EQx/HPPFAICrJSUEBDG1GQmgNQcIG0FBwhJQdIywUo6ThAGm5AkQIkEKUFoqFAKBLGct6mGUeW/+D3IostZ37z3d/u7A7vtUop/5WLOdAOvuJThp7wKyL6s2qW5xjdxQHuc/MN/MBNY2ApRcQ/42u4wklqv4/WjGlnH7mUsodv+IJOQgoGeMYtziLivNEdllKuUeEVdcKG+gorqCNiu+kdHmEHm+nwY8Z76fABl22acpHF3XQ11A3S7VZb4BaO85nUY7kKn3GIu6bAHpbeyC+lZmJVMwp+jzRiat9S0wpYvwGs2wJ7DYCtjvwnC2LG/++lZj4wJ8kAL5mPMViVucG0qTPRxYhQSunjFPtYxYdM9xP2E/3xf9xkfK3nm+xk6BndiHhc2HBto1nI+guvSGYmqo4QzgAAAABJRU5ErkJggg==);
    }
    
    .xbrwsr_hide {
      display: none !important;
    }`)
  );
  shadow.appendChild(root);

  let markers = {};

  const selectMarker = new SelectionMarker({});

  // XXX Should we add listener to Api?
  Picker.addListener({
    'select:close': function(event) {
      // console.log('select:close', event)
      const id = event.id;
      const marker = markers[id];

      if (marker) {
        marker.close();
        delete markers[id];
      }
    },
    'select:display': function(event) {
      // console.log('select:display', event)
      const marker = markers[event.id];
      marker.update(event);
    },
    'select:frame_bounds': function(event) {
      // console.log('select:frame_bounds', event)
      // Redraw all markers
      _.each(markers, (marker) => marker.update());
      selectMarker.update();
    },
    'select:load': function(event) {
      // initialize
      // console.log('select:load', event)
    },
    'select:mark': function(event) {
      // console.log('select:mark', event)
      selectMarker.update(event);
      selectMarker.show(true);
    },
    'select:mark_none': function(event) {
      // console.log('select:mark_none', event)
      selectMarker.show(false);
    },
    'select:mode': function({mode}) {
      // console.log('select:mode', mode)

      const show = (mode == Picker.MODE_SELECT);
      _.each(markers, (selection) => selection.show(show));
    },
    'select:new': function(event) {
      // console.log('select:new', event)
      markers[event.id] = new SelectedMarker(event);
    },
    'select:reset': function() {
      _.each(markers, function(marker) {
        marker.close();
        delete markers[id];
      });
      markers = {};
    },
  });

  function RectMarker(options) {
    const els = _.reduce(['left', 'top', 'right', 'bottom'], (memo, dir) => {
      memo[dir] = domo.DIV({
        'class': NS + dir + ' ' + NS + 'marker',
        style: STYLES,
      });
      return memo;
    }, {});

    _.each(els, el => root.appendChild(el));

    update();

    this.close = close;
    this.show = show;
    this.update = update;

    function close() {
      _.each(els, function(el) {
        $(el).remove();
      });
    }

    function show(show) {
      _.each(els, function(el) {
        $(el)[show ? 'show' : 'hide']();
        update();
      });
    }

    function update(newOptions) {
      _.extend(options, newOptions);

      const
        frame_bounds = Picker.frame_bounds;


      const rect = _.clone(options.rect) || {
        top: frame_bounds.top, left: frame_bounds.left, width: 0, height: 0,
      };


      const op = options.op;

      // Shift to frame's coordinates.
      // rect.left = rect.left - frame_bounds.left;
      // rect.top = rect.top - frame_bounds.top;

      _.each(els, function(el) {
        el.className = NS + 'marker_' + op;
      });

      $(els.top).css({
        left: rect.left - 1,
        top: rect.top - 1,
        width: rect.width,
      });

      $(els.right).css({
        left: rect.left + rect.width - 1,
        top: rect.top - 1,
        height: rect.height,
      });

      $(els.bottom).css({
        left: rect.left - 1,
        top: rect.top + rect.height - 1,
        width: rect.width,
      });

      $(els.left).css({
        left: rect.left - 1,
        top: rect.top - 1,
        height: rect.height,
      });
    }
  }

  function SelectionMarker(options) {
    let rectMarkers = [];

    const els = {
      info: domo.DIV({'class': NS + 'select_info', style: STYLES}),
    };

    _.each(els, function(el) {
      root.appendChild(el);
    });

    this.close = close;
    this.show = show;
    this.update = update;

    function close() {
      closeRectMarkers();

      _.each(els, function(el) {
        $(el).remove();
      });
    }

    function closeRectMarkers() {
      _.each(rectMarkers, function(m) {
        m.close();
      });
    }

    function show(show) {
      _.each(rectMarkers, function(m) {
        m.show(show);
      });

      _.each(els, function(el) {
        $(el)[show ? 'show' : 'hide']();
        show && update();
      });
    }

    function update(newOptions) {
      _.extend(options, newOptions);

      closeRectMarkers();

      const frame_bounds = Picker.frame_bounds;
      const rects = options.rects;
      const rect = (rects && _.clone(rects[0])) || {
        top: frame_bounds.top,
        left: frame_bounds.left,
        width: 0,
        height: 0,
      };

      const {info, op} = options;

      rectMarkers = _.map(options.rects, function(rect) {
        return new RectMarker({op: op, rect: rect});
      });

      // Shift to frame's coordinates.
      // rect.left = rect.left - frame_bounds.left;
      // rect.top = rect.top - frame_bounds.top;

      _.each(els, function(el) {
        el.className = NS + 'marker_' + op;
      });

      els.info.className += ' ' + NS + 'info';
      els.info.textContent = info;

      $(els.info).css({
        left: rect.left - 1,
        top: rect.top + rect.height,
      });
    }
  }

  function SelectedMarker(options) {
    const clsHide = NS + 'hide';
    const marker = new SelectionMarker({op: options.op});

    let elExpand; let elActions;

    const els = {
      tbar: domo.DIV({
        'class': NS + 'vbar',
        style: STYLES,
      },
      // Expand
      elExpand = domo.DIV({
        'class': NS + 'action_expand ',
        'title': 'Show actions',
      }),
      // Expanded vbar
      elActions = domo.DIV({
        'class': clsHide,
      },
      // Collapse
      domo.DIV({
        'class': NS + 'action_collapse',
        'title': 'Hide actions',
      }),
      // Widen
      domo.DIV({
        'class': NS + 'action_widen',
        'title': 'Expand selection',
      }),
      // Shorten
      domo.DIV({
        'class': NS + 'action_narrow',
        'title': 'Narrow expanded selection',
      }),
      // Delete
      domo.DIV({
        'class': NS + 'action_delete',
        'title': 'Discard selection',
      })
      )
      ),
    };

    _.each(els, function(el) {
      root.appendChild(el);
    });

    $(els.tbar).on('click', '[class^=\'xbrwsr_action\']', function() {
      const action = this.className.trim().split('_').pop();

      switch (action) {
        case 'expand':
          $(elExpand).addClass(clsHide);
          $(elActions).removeClass(clsHide);
          break;

        case 'collapse':
          $(elExpand).removeClass(clsHide);
          $(elActions).addClass(clsHide);
          break;

        case 'widen':
          Api.call({
            path: 'picker_select_call',
            data: {
              id: options.id,
              method: 'widen',
            },
          }, function(err, res) {
            err && console.error('widen:', err, res);
          });
          break;

        case 'narrow':
          Api.call({
            path: 'picker_select_call',
            data: {
              id: options.id,
              method: 'narrow',
            },
          }, function(err, res) {
            err && console.error('narrow:', err, res);
          });
          break;

        case 'delete':
          Api.call({
            path: 'picker_select_call',
            data: {
              id: options.id,
              method: 'close',
            },
          }, function(err, res) {
            err && console.error('delete:', err, res);
          });
          break;

        default:
          break;
      }
    });

    this.close = close;
    this.show = show;
    this.update = update;

    function close() {
      marker.close();

      _.each(els, function(el) {
        $(el).remove();
      });
    }

    function show(show) {
      marker.show(show);

      _.each(els, function(el) {
        $(el)[show ? 'show' : 'hide']();
      });
    }

    function update(newOptions) {
      _.extend(options, newOptions);

      marker.update(options);

      const
        frame_bounds = Picker.frame_bounds;


      const rects = options.rects;


      const rect = (rects && _.clone(rects[0])) || {
        top: frame_bounds.top, left: frame_bounds.left, width: 0, height: 0,
      };

      // TODO: Preliminary testing shows we are receiving the normalized coordinates.
      // If not, we need to uncomment here (and in RectMarker and SelectionMarker) and normalize them.
      // Shift to frame's coordinates.
      // rect.left = rect.left - frame_bounds.left;
      // rect.top = rect.top - frame_bounds.top;

      $(els.tbar).css({
        left: rect.left - 1,
        top: Math.max(rect.top - 1 - 18, 0),
      });
    }
  }
})();