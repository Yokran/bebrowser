window.Picker = (function () {
  const Picker = {
    MODE_NOOP: 'NOOP',
    MODE_SELECT: 'SELECT',
    XPATH_ATTRS: ['id', 'data-id', 'name', 'class', 'data-name', 'role', 'title'],
    // Add local listener, used by pickerui.js to show feedback.
    addListener,
    removeListener,
    mode: 'NOOP', // or SELECT
    frame_bounds: { left: 0, top: 0, width: 0, height: 0 },
    selections: [],
    fieldConfig: {
      PROPS_COMMON: ["innerHTML", "innerText", "outerHTML", "outerText", "title", "textContent"],
      PROPS_EXTENDED: {
        A: ['href'],
        AREA: ['href'],
        BASE: ['href'],
        EMBED: ['src'],
        LINK: ['href', 'rel'],
        IMG: ['src'],
        INPUT: ['type'],
        META: ['name', 'charset', 'content', 'httpEquiv'],
        OPTION: ['value'],
        PORTAL: ['src'],
        SOURCE: ['src', 'type'],
        TRACK: ['src', 'kind', 'srcLang'],
        VIDEO: ['src'],
      }
    },
  };

  /**
   * returns a custom list of HTML Element property name based on the tag name
   * @param {HTMLElement} el
   * @returns string[]
   */
  function prepareSelectableProperties(el) {
    const properties = [...Picker.fieldConfig.PROPS_COMMON]
    if (!(el.nodeType === Node.ELEMENT_NODE)) {
      return properties
    }
    const extendedProperties = Picker.fieldConfig.PROPS_EXTENDED[el.tagName.toUpperCase()]
    if (extendedProperties) {
      properties.push(...extendedProperties)
    }

    properties.sort()
    return properties
  }

  function getOperationType(el) {
    const childBox = getFirstContainedSelection(el);
    if (childBox) return Picker.MODE_NOOP;

    const parentBox = getContainingSelections(el);
    if (parentBox) {
      return parentBox.getOp() == 'INCLUDE' ? 'EXCLUDE' : 'INCLUDE';
    }
    return 'INCLUDE';
  }

  function getSelection(el) {
    return _.find(Picker.selections, function (sel) {
      return _.any(sel.getTargets(), function (target) {
        return target == el;
      });
    });
  }

  function findSelectionById(id) {
    return _.find(Picker.selections, function (selection) {
      return selection.id == id;
    });
  }

  function getContainingSelections(el) {
    const parentEl = _.find($(el).parents().toArray(), getSelection);
    if (parentEl) return getSelection(parentEl);
  }

  function getFirstContainedSelection(el) {
    const selections = [];
    Locator.visitEls(el, function (child) {
      if (selections.length > 0) return false; // stop all visits

      const sel = getSelection(child);
      if (sel) {
        selections.push(sel);
        return false; // to stop visiting this subtree
      }
    });
    return selections.pop();
  }

  function getContainedSelections(el) {
    const selections = [];
    Locator.visitEls(el, function (_el) {
      if (el == _el) return; // this does not smell right.
      const sel = getSelection(_el);
      if (sel) {
        selections.push(sel);
        return false; // to stop visiting this subtree
      }
    });
    return selections;
  }

  function isMouseOutIntoIframe(event) {
    return (event.relatedTarget.nodeName == 'IFRAME' ||
      event.relatedTarget.nodeName == 'FRAME');
  }

  function isInternalEl(el) {
    return el.className.indexOf(Api.NS) >= 0;
  }

  const listeners = [];

  // A direct local bridge for modules in same environment.
  function addListener(listener) {
    listeners.push(listener);
  }

  function notifyListeners(type, event) {
    _.each(listeners, function (listener) {
      const call = listener[type];
      call && call.call(listener, event);
    });
  }

  function removeListener(listener) {
    const index = _.indexOf(listners, listener);
    listeners.splice(index, 1);
  }

  function trigger(type, event) {
    notifyListeners.call(this, type, event);
    Api.trigger({ type, event });
  }

  async function createLocator(target, type) {
    try {
      if (type == 'xpath') {
        expr = Locator.findXPath(target, Picker.XPATH_ATTRS);
      } else if (type == 'css') {
        expr = await Locator.findCSSPath(target);
      } else if (type == 'js') {
        expr = await Locator.findJSPath(target);
      } else {
        throw new Error('Unknown selector type: ' + type);
      }
      return {
        expr,
        type
      };
    } catch (e) {
      const expr = Locator.findXPath(target, Picker.XPATH_ATTRS);
      return {
        expr,
        type: 'xpath'
      };
    }
  }

  function Selection(options) {
    const self = this;
    const id = options.id || ID();

    // Reference element used to mark it on the webpage
    let targets = [];

    // Element that was originally selected by user. May be null?
    let originalTarget = options.originalTarget;

    let currentTarget = originalTarget;

    let locator = options.locator;

    if (!locator) throw new Error('Invalid options. A locator must be set');

    this.id = id;
    this.close = close;
    this.getOp = getOp;
    this.getLocator = getLocator;
    this.getTargets = getTargets;
    this.getCurrentTarget = getCurrentTarget;
    this.narrow = narrow;
    this.setLocator = setLocator;
    this.setLocatorType = setLocatorType;
    this.updateDisplay = updateDisplay;
    this.widen = widen;

    trigger('select:new', { id, op: options.op });

    setLocator(locator);

    function close() {
      const children = _.flatten(_.map(targets, getContainedSelections));
      const selections = Picker.selections;

      if (_.indexOf(selections, self) >= 0) {
        selections.splice(_.indexOf(selections, self), 1);
      }

      trigger('select:close', { id });
      _.each(children, (child) => child.close());
      setTimeout(() => trigger('select:mark_none'), 100);
    }

    function getOp() {
      return options.op;
    }

    function getLocator() {
      return locator;
    }

    function getTargets() {
      return targets;
    }

    function getCurrentTarget() {
      return currentTarget;
    }

    async function narrow() {
      // For now we support narrowing uniquely matched elements only.
      if (targets.length != 1) return;

      const
        // List of elements till originalTarget
        list = $(originalTarget).parents().add(originalTarget).toArray();


      const _target = _.find(targets[0].childNodes, function (child) {
        return _.indexOf(list, child) >= 0;
      });

      // XXX restrict narrowing till we have an item that is a marker
      if (_target && !getSelection(_target)) {
        await setElementLocator(_target);
      }
    }

    async function setElementLocator(target) {
      const locator = await createLocator(target, 'css');
      setLocator(locator);
    }

    function setLocator(_locator) {
      locator = _locator;
      // Set target based on locator expression
      Locator.locate(locator, function (err, _targets) {
        if (err) {
          // console.error('Error matching elements for locator: ', locator);
          _targets = [];
        }
        setTargets(_targets);
        // If originalTarget is not set, set it to the first matching element?
        !originalTarget && (originalTarget = _targets[0]);
        currentTarget = _targets[0];
      });
    }

    async function setLocatorType(type) {
      if (locator.type == type) return;
      let loc;
      if (!currentTarget) {
        if (type === 'css') {
          expr = '#enter-your-selector-here';
        } else if (type === 'xpath') {
          expr = '//enter-your-selector-here';
        } else if (type === 'js') {
          expr = 'document.querySelectorAll("#enter-your-selector-here")';
        }
        loc = {
          expr,
          type,
        };
      } else {
        loc = await createLocator(currentTarget, type);
      }
      setLocator(loc);
    }

    function setTargets(_targets) {
      targets = _targets || [];
      updateDisplay();
    }

    async function widen() {
      if (targets.length == 0) return;

      const _target = targets[0].parentElement;
      if (_target && !getSelection(_target)) {
        await setElementLocator(_target);
      }
    }

    function updateDisplay() {
      const rects = _.map(targets, function (el) {
        const rect = _.pick(el.getBoundingClientRect(),
          'bottom', 'height', 'left', 'right', 'top', 'width', 'x', 'y');
        rect.top += window.pageYOffset;
        rect.left += window.pageXOffset;
        return rect;
      });

      const allFields = []

      allFields.push({
        name: "text",
        type: Locator.FIELD_TYPES_BUILTIN,
      })

      if (targets.length > 0) {
        for (const attr of targets[0].attributes) {
          allFields.push({
            name: attr.name,
            type: Locator.FIELD_TYPES_ATTRIBUTE,
          })
        }

        const properties = prepareSelectableProperties(targets[0])
        properties.forEach(p => {
          allFields.push({
            name: p,
            type: Locator.FIELD_TYPES_PROPERTY,
          })
        })
      }

      trigger('select:display', {
        id,
        locator,
        rects,
        allFields,
        matchedElementCount: targets.length,
        info: targets.length > 0 ? elInfo(targets[0]) : '',
      });
    }
  }

  syncRects = _.debounce(syncRects);

  Api.extend({

    picker_getSelection: Api.syncToAsync(function () {
      const includes = _(Picker.selections).chain().filter(function (sel) {
        return sel.getOp() == 'INCLUDE';
      }).map(function (sel) {
        return sel.getLocator();
      }).value();
      const excludes = _(Picker.selections).chain().filter(function (sel) {
        return sel.getOp() == 'EXCLUDE';
      }).map(function (sel) {
        return sel.getLocator();
      }).value();

      return { excludes: excludes, includes: includes };
    }),

    picker_reset: Api.syncToAsync(reset),

    picker_select_call: function (input, callback) {
      const id = input.id; const args = input.args || []; const sel = findSelectionById(id);
      if (!sel) {
        callback({
          code: 'E_LOCATOR_NOT_FOUND',
          msg: 'Selection not found:' + id,
        });
      } else {
        const fn = sel[input.method];
        if (!fn) {
          callback({
            code: 'E_METHOD_NOT_FOUND',
            msg: 'Unknown method: ' + input.method,
          });
        } else {
          const val = fn.apply(sel, args);
          callback(null, val);
        }
      }
    },

    picker_select_new: function (input, callback) {
      Locator.locate(input.locator, function (err, _targets) {
        if (err) {
          _targets = [];
        }
        const selection = new Selection(_.extend({
          originalTarget: _targets[0],
        }, input));
        Picker.selections.push(selection);
        callback();
      });
    },

    picker_setMode: Api.syncToAsync(setMode),
  });

  trigger('select:load');

  function elInfo(el) {
    return (el.nodeName.toLowerCase() + (el.id ? '#' + el.id : '') +
      (el.className ? '.' + el.className : ''));
  }

  function reset() {
    _.each(Picker.selections.slice(0), function (selection) {
      selection.close();
    });
    trigger('select:mark_none');
    trigger('select:reset');
  }

  function setMode(input) {
    Picker.mode = input || Picker.MODE_NOOP;
    Picker.mode == Picker.MODE_SELECT ? start() : stop();
    trigger('select:mode', { mode: Picker.mode });
    trigger('select:mark_none');
  }

  function start() {
    window.addEventListener('click', VB_click, true);
    window.addEventListener('message', VB_message, true);
    window.addEventListener('pointerdown', VB_mousedown, true);
    window.addEventListener('pointerover', VB_mouseover, true);
    window.addEventListener('pointerout', VB_mouseout, true);
    window.addEventListener('pointerup', VB_mouseup, true);
    window.addEventListener('resize', VB_resize, true);
    window.addEventListener('scroll', VB_scroll, true);
    $('*').on('scroll', VB_scroll);

    syncRects();
  }

  function stop() {
    window.removeEventListener('click', VB_click, true);
    window.removeEventListener('message', VB_message, true);
    window.removeEventListener('pointerdown', VB_mousedown, true);
    window.removeEventListener('pointerover', VB_mouseover, true);
    window.removeEventListener('pointerout', VB_mouseout, true);
    window.removeEventListener('pointerup', VB_mouseup, true);
    window.removeEventListener('resize', VB_resize, true);
    window.removeEventListener('scroll', VB_scroll, true);
    $('*').off('scroll', VB_scroll);

    trigger('select:mark_none');
  }

  function syncRects() {
    // Set frame's bounds
    // console.log('syncRects');
    util.getWindowOffset(function (err, offset) {
      // console.log('getWindowOffset:', offset, location.href);

      Picker.frame_bounds = _.extend({
        width: $(window).outerWidth(),
        height: $(window).outerHeight(),
        pageYOffset: window.pageYOffset,
        pageXOffset: window.pageXOffset,
      }, offset);

      trigger('select:frame_bounds', Picker.frame_bounds);
    });

    // Update display for affected elements.
    _.each(Picker.selections, function (selection) {
      selection.updateDisplay();
    });

    // Send message to child frames to update their display coordinates
    // console.log('syncRects: send message to frames');
    $('iframe,frame').each(function () {
      // console.log('sending message to:' + this.src);
      this.contentWindow.postMessage({
        brwsr_type: Api.MSG_EVENT,
        type: 'layout_change',
      }, '*');
    });
  }

  function VB_click(event) {
    if (isInternalEl(event.target)) return;

    event.stopPropagation();
    event.preventDefault();
  }

  function VB_message(event) {
    const
      data = event.data;


    const type = data && data.brwsr_type;

    if (type == Api.MSG_EVENT) {
      if (event.data.type == 'layout_change') {
        syncRects();
      }
    }
  }

  // when user selects an element using VS
  async function VB_mousedown(event) {
    if (isInternalEl(event.target)) return;

    const op = getOperationType(event.target);

    if (op != Picker.MODE_NOOP) {
      trigger('select:mark_none');
      const locator = await createLocator(event.target, 'css');
      const selection = new Selection({
        locator,
        originalTarget: event.target,
        op
      });
      Picker.selections.push(selection);
    }
    event.stopPropagation();
    event.preventDefault();
  }

  var
    VB_mouseover = _.throttle(function (event) {
      const target = event.target;


      const op = getOperationType(target);

      if (isInternalEl(event.target)) return;

      if (op == Picker.MODE_NOOP) {
        trigger('select:mark_none');
      } else {
        const
          rect = target.getBoundingClientRect();
        trigger('select:mark', {
          op,
          rects: [{
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset,
            width: $(target).outerWidth(),
            height: $(target).outerHeight(),
          }],
          info: elInfo(target),
        });
      }
    }, 250, { leading: false });

  var
    VB_mouseout = _.throttle(function (event) {
      if (isInternalEl(event.target)) return;

      if (!event.relatedTarget || isMouseOutIntoIframe(event)) {
        trigger('select:mark_none');
      }
    }, 250, { leading: false });

  function VB_mouseup(event) {
    if (isInternalEl(event.target)) return;

    event.preventDefault();
    event.stopPropagation();
  }

  function VB_resize(event) {
    syncRects();
  }

  function VB_scroll(event) {
    // console.log('VB_scroll');
    syncRects();
  }


  return Picker;
})();

// console.log('picker:load', location.href);
