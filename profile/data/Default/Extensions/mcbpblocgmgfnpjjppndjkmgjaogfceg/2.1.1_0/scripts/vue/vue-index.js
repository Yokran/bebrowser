/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 14:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(8674);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(9601);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__(7727);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(4916);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(3123);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(2262);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler = __webpack_require__(9963);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/dialog/style/css.mjs + 3 modules
var css = __webpack_require__(677);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/button/style/css.mjs + 1 modules
var style_css = __webpack_require__(444);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/checkbox/style/css.mjs + 1 modules
var checkbox_style_css = __webpack_require__(5508);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/input-number/style/css.mjs + 1 modules
var input_number_style_css = __webpack_require__(6709);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/row/style/css.mjs + 1 modules
var row_style_css = __webpack_require__(4965);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/select/style/css.mjs + 9 modules
var select_style_css = __webpack_require__(4929);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/option/style/css.mjs + 1 modules
var option_style_css = __webpack_require__(1715);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/col/style/css.mjs + 1 modules
var col_style_css = __webpack_require__(9426);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/dialog/index.mjs + 13 modules
var dialog = __webpack_require__(8788);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/button/index.mjs + 11 modules
var components_button = __webpack_require__(9085);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/checkbox/index.mjs + 4 modules
var components_checkbox = __webpack_require__(6270);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/input-number/index.mjs + 3 modules
var input_number = __webpack_require__(3726);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/row/index.mjs + 2 modules
var row = __webpack_require__(3632);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/select/index.mjs + 71 modules
var components_select = __webpack_require__(9836);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/col/index.mjs + 2 modules
var col = __webpack_require__(2040);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(6252);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(3577);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PDFSettingsDialog.vue?vue&type=template&id=303727ee&scoped=true
/* unplugin-vue-components disabled */









var _withScopeId = function _withScopeId(n) {
  return (0,runtime_core_esm_bundler/* pushScopeId */.dD)("data-v-303727ee"), n = n(), (0,runtime_core_esm_bundler/* popScopeId */.Cn)(), n;
};

var _hoisted_1 = {
  "class": "flex_container"
};
var _hoisted_2 = {
  "class": "flex_item_left"
};
var _hoisted_3 = {
  id: "canvas_holder",
  ref: "pageRenderPanel"
};
var _hoisted_4 = {
  key: 0,
  id: "divMargins"
};
var _hoisted_5 = {
  key: 1,
  id: "divWarning"
};

var _hoisted_6 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,runtime_core_esm_bundler/* createElementVNode */._)("div", null, " Warning: page margins are bigger than page! ", -1);
});

var _hoisted_7 = [_hoisted_6];
var _hoisted_8 = {
  "class": "flex_item_right"
};
var _hoisted_9 = {
  id: "pageOptions",
  "class": "groupBox"
};
var _hoisted_10 = {
  "class": "topic"
};
var _hoisted_11 = {
  id: "extras",
  "class": "groupBox"
};
var _hoisted_12 = {
  "class": "topic"
};
var _hoisted_13 = {
  "class": "control-and-label"
};
var _hoisted_14 = ["title"];
var _hoisted_15 = {
  "class": "control-and-label"
};
var _hoisted_16 = ["title"];
var _hoisted_17 = {
  "class": "control-and-label"
};
var _hoisted_18 = ["title"];
var _hoisted_19 = {
  "class": "dialog-footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_col = col/* ElCol */.Dv;

  var _component_el_option = components_select/* ElOption */.BT;

  var _component_el_select = components_select/* ElSelect */.km;

  var _component_el_row = row/* ElRow */.dq;

  var _component_el_input_number = input_number/* ElInputNumber */.d6;

  var _component_el_checkbox = components_checkbox/* ElCheckbox */.Xb;

  var _component_el_button = components_button/* ElButton */.mi;

  var _component_el_dialog = dialog/* ElDialog */.d0;

  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_dialog, {
    modelValue: $props.visible,
    "onUpdate:modelValue": _cache[31] || (_cache[31] = function ($event) {
      return $props.visible = $event;
    }),
    title: _ctx.$i18n('action_save_pdf | Save to PDF'),
    width: 900,
    "before-close": $options.handleClose,
    "append-to-body": "",
    onOpened: $options.init,
    onOpen: $options.preinit
  }, {
    footer: (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_19, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        style: {
          "float": "left"
        },
        onClick: _cache[28] || (_cache[28] = function ($event) {
          return $options.defaultValues();
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_defaults | Restore to defaults')), 1)];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        type: "primary",
        onClick: _cache[29] || (_cache[29] = function ($event) {
          $props.visible = false;
          $options.closeDialog(true);
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('action_ok | OK')), 1)];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        onClick: _cache[30] || (_cache[30] = function ($event) {
          $props.visible = false;
          $options.closeDialog(false);
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_cancel | Cancel')), 1)];
        }),
        _: 1
      })])];
    }),
    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_3, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        justify: "end",
        align: "middle",
        gutter: 20
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            "class": "canvas-label canvas-label-right col-rubber"
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_units | Units')) + ": ", 1)];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 6
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.cmbMarginsMeasurement,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                  return $props.options.cmbMarginsMeasurement = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vUnits, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle",
        style: {
          "flex-grow": "1"
        }
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, null, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
                align: "middle",
                justify: "center"
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
                    span: 6,
                    title: _ctx.$i18n('pdf_dialog_top | Top')
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                        size: "mini",
                        placeholder: _ctx.$i18n('pdf_dialog_top | Top'),
                        modelValue: $props.options.edtTopMargin,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
                          return $props.options.edtTopMargin = $event;
                        }),
                        "controls-position": "right",
                        min: 0,
                        max: 999,
                        step: $data.sizeStep,
                        precision: $data.sizePrecision,
                        onChange: $options.changed
                      }, null, 8, ["placeholder", "modelValue", "step", "precision", "onChange"])];
                    }),
                    _: 1
                  }, 8, ["title"])];
                }),
                _: 1
              }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
                gutter: 10,
                align: "middle",
                justify: "center"
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
                    span: 6
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, null, {
                        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
                            title: _ctx.$i18n('pdf_dialog_left | Left')
                          }, {
                            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                                size: "mini",
                                placeholder: _ctx.$i18n('pdf_dialog_left | Left'),
                                modelValue: $props.options.edtLeftMargin,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                                  return $props.options.edtLeftMargin = $event;
                                }),
                                "controls-position": "right",
                                min: 0,
                                max: 999,
                                step: $data.sizeStep,
                                precision: $data.sizePrecision,
                                onChange: $options.changed
                              }, null, 8, ["placeholder", "modelValue", "step", "precision", "onChange"])];
                            }),
                            _: 1
                          }, 8, ["title"])];
                        }),
                        _: 1
                      })];
                    }),
                    _: 1
                  }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
                    span: 12
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
                        id: "divPagePreview",
                        ref: "pageRenderPage",
                        style: (0,shared_esm_bundler/* normalizeStyle */.j5)({
                          width: $data.pagePreviewWidth,
                          height: $data.pagePreviewHeight,
                          padding: $data.pageMargins
                        })
                      }, [$data.pageMarginsValid ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_4)) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), !$data.pageMarginsValid ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_5, _hoisted_7)) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)], 4)];
                    }),
                    _: 1
                  }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
                    span: 6
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, null, {
                        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
                            title: _ctx.$i18n('pdf_dialog_right | Right')
                          }, {
                            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                                size: "mini",
                                placeholder: _ctx.$i18n('pdf_dialog_right | Right'),
                                modelValue: $props.options.edtRightMargin,
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                                  return $props.options.edtRightMargin = $event;
                                }),
                                "controls-position": "right",
                                min: 0,
                                max: 999,
                                step: $data.sizeStep,
                                precision: $data.sizePrecision,
                                onChange: $options.changed
                              }, null, 8, ["placeholder", "modelValue", "step", "precision", "onChange"])];
                            }),
                            _: 1
                          }, 8, ["title"])];
                        }),
                        _: 1
                      })];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
                align: "middle",
                justify: "center"
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
                    span: 6,
                    title: _ctx.$i18n('pdf_dialog_bottom | Bottom')
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                        size: "mini",
                        placeholder: _ctx.$i18n('pdf_dialog_bottom | Bottom'),
                        modelValue: $props.options.edtBottomMargin,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
                          return $props.options.edtBottomMargin = $event;
                        }),
                        "controls-position": "right",
                        min: 0,
                        max: 999,
                        step: $data.sizeStep,
                        precision: $data.sizePrecision,
                        onChange: $options.changed
                      }, null, 8, ["placeholder", "modelValue", "step", "precision", "onChange"])];
                    }),
                    _: 1
                  }, 8, ["title"])];
                }),
                _: 1
              })];
            }),
            _: 1
          })];
        }),
        _: 1
      })], 512)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_8, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_9, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_10, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_paging_options | Paging options')), 1), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox, {
            modelValue: $props.options.chkMultipagePDF,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
              return $props.options.chkMultipagePDF = $event;
            }),
            label: _ctx.$i18n('pdf_dialog_split_screenshots | Split long screenshots to pages'),
            onChange: $options.changed
          }, null, 8, ["modelValue", "label", "onChange"])];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox, {
            modelValue: $props.options.chkSmartPageBreaks,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
              return $props.options.chkSmartPageBreaks = $event;
            }),
            label: _ctx.$i18n('pdf_dialog_enable_smart_pagebreaks | Enable smart page breaks'),
            disabled: !$props.options.chkMultipagePDF
          }, null, 8, ["modelValue", "label", "disabled"])];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_page_size | Page size') + ":"), 1)];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 16
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [$props.options.chkMultipagePDF ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_select, {
                key: 0,
                size: "mini",
                modelValue: $props.options.cmbPageSize,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
                  return $props.options.cmbPageSize = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vPageSizes, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item.type,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), !$props.options.chkMultipagePDF ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_select, {
                key: 1,
                size: "mini",
                modelValue: $props.options.cmbPageSizeSingle,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
                  return $props.options.cmbPageSizeSingle = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vPageSizesNoSplit, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)];
            }),
            _: 1
          })];
        }),
        _: 1
      }), $props.options.chkMultipagePDF && $props.options.cmbPageSize > 0 && $props.options.cmbPageSize < 6 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 0,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_width | Width') + ":"), 1)];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: _ctx.$i18n('pdf_dialog_width | Width'),
                modelValue: $props.options.edtWidth,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
                  return $props.options.edtWidth = $event;
                }),
                "controls-position": "right",
                min: $data.sizeMin,
                max: $data.sizeMax,
                step: $data.sizeStep,
                precision: $data.sizePrecision,
                disabled: $props.options.cmbPageSize > 0
              }, null, 8, ["placeholder", "modelValue", "min", "max", "step", "precision", "disabled"])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: 1,
            span: 7
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.cmbWidthMeasurement,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
                  return $props.options.cmbWidthMeasurement = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                disabled: $props.options.cmbPageSize > 0
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vUnits, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "disabled"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.options.chkMultipagePDF && $props.options.cmbPageSize > 0 && $props.options.cmbPageSize < 6 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 1,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_height | Height') + ":"), 1)];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: _ctx.$i18n('pdf_dialog_height | Height'),
                modelValue: $props.options.edtHeight,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
                  return $props.options.edtHeight = $event;
                }),
                "controls-position": "right",
                min: $data.sizeMin,
                max: $data.sizeMax,
                step: $data.sizeStep,
                precision: $data.sizePrecision,
                disabled: $props.options.cmbPageSize > 0
              }, null, 8, ["placeholder", "modelValue", "min", "max", "step", "precision", "disabled"])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: 1,
            span: 7
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.cmbHeightMeasurement,
                "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
                  return $props.options.cmbHeightMeasurement = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                disabled: $props.options.cmbPageSize > 0
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vUnits, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "disabled"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.options.chkMultipagePDF && $props.options.cmbPageSize == 6 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 2,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_width | Width') + ":"), 1)];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: _ctx.$i18n('pdf_dialog_width | Width'),
                modelValue: $props.options.edtCustomWidth,
                "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
                  return $props.options.edtCustomWidth = $event;
                }),
                "controls-position": "right",
                min: $data.sizeMin,
                max: $data.sizeMax,
                step: $data.sizeStep,
                precision: $data.sizePrecision,
                onChange: $options.changed
              }, null, 8, ["placeholder", "modelValue", "min", "max", "step", "precision", "onChange"])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: 1,
            span: 7
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.cmbCustomWidthUnits,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = function ($event) {
                  return $props.options.cmbCustomWidthUnits = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vUnits, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), !$props.options.chkMultipagePDF && $props.options.cmbPageSizeSingle === 1 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 3,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_width | Width') + ":"), 1)];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: _ctx.$i18n('pdf_dialog_width | Width'),
                modelValue: $props.options.edtWidthSingle,
                "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
                  return $props.options.edtWidthSingle = $event;
                }),
                "controls-position": "right",
                min: $data.sizeMin,
                max: $data.sizeMax,
                step: $data.sizeStep,
                precision: $data.sizePrecision,
                onChange: $options.changed
              }, null, 8, ["placeholder", "modelValue", "min", "max", "step", "precision", "onChange"])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: 1,
            span: 7
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.cmbWidthMeasurementSingle,
                "onUpdate:modelValue": _cache[16] || (_cache[16] = function ($event) {
                  return $props.options.cmbWidthMeasurementSingle = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vUnits, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.options.chkMultipagePDF && $props.options.cmbPageSize == 6 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 4,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_height | Height') + ":"), 1)];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: "Height",
                modelValue: $props.options.edtCustomHeight,
                "onUpdate:modelValue": _cache[17] || (_cache[17] = function ($event) {
                  return $props.options.edtCustomHeight = $event;
                }),
                "controls-position": "right",
                min: $data.sizeMin,
                max: $data.sizeMax,
                step: $data.sizeStep,
                precision: $data.sizePrecision,
                onChange: $options.changed
              }, null, 8, ["modelValue", "min", "max", "step", "precision", "onChange"])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: 1,
            span: 7
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.cmbCustomHeightUnits,
                "onUpdate:modelValue": _cache[18] || (_cache[18] = function ($event) {
                  return $props.options.cmbCustomHeightUnits = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vUnits, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.options.chkMultipagePDF && $props.options.cmbPageSize > 0 && $props.options.cmbPageSize < 6 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 5,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_orientation | Orientation') + ":"), 1)];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 16
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.cmbOrientation,
                "onUpdate:modelValue": _cache[19] || (_cache[19] = function ($event) {
                  return $props.options.cmbOrientation = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vOrientations, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.options.chkMultipagePDF && $props.options.cmbPageSize === 0 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 6,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 24,
            "class": "hint"
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("p", null, " * " + (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_page_size_width_warning_1 | Page width will be set to fit the page entirely, and page height will be set according to the A4 format ratio.')), 1), (0,runtime_core_esm_bundler/* createElementVNode */._)("p", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_page_size_width_warning_2 | If resulting document consists of 2 pages, and the last page is 50% empty or more, the pages will be joined altogether.')), 1)];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), !$props.options.chkMultipagePDF && $props.options.cmbPageSizeSingle === 0 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_col, {
        key: 7,
        span: 24,
        "class": "hint"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createElementVNode */._)("p", null, " * " + (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_page_size_warning_1 | Page Size will be set to fit the capture entirely. ')), 1)];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), !$props.options.chkMultipagePDF && $props.options.cmbPageSizeSingle === 1 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_col, {
        key: 8,
        span: 24,
        "class": "hint"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createElementVNode */._)("p", null, " * " + (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_page_size_warning_2 | Page Height will be set to fit the capture entirely. ')), 1)];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)])]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_11, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_12, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_extras | Extras')), 1), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox, {
            modelValue: $props.options.chkSearchablePDF,
            "onUpdate:modelValue": _cache[20] || (_cache[20] = function ($event) {
              return $props.options.chkSearchablePDF = $event;
            }),
            label: _ctx.$i18n('pdf_dialog_create_text_searchable_pdfs | Create text-selectable and searchable PDF')
          }, null, 8, ["modelValue", "label"])];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox, {
            modelValue: $props.options.chkEnableWebLinks,
            "onUpdate:modelValue": _cache[21] || (_cache[21] = function ($event) {
              return $props.options.chkEnableWebLinks = $event;
            }),
            label: _ctx.$i18n('pdf_dialog_enable_web_links | Enable web links')
          }, null, 8, ["modelValue", "label"])];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "top",
        justify: "space-around"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_13, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox, {
                modelValue: $props.options.chkAddHeader,
                "onUpdate:modelValue": _cache[22] || (_cache[22] = function ($event) {
                  return $props.options.chkAddHeader = $event;
                })
              }, null, 8, ["modelValue"]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
                "class": (0,shared_esm_bundler/* normalizeClass */.C_)([{
                  checkboxDisabled: $options.isHeaderDisabled
                }, "link"]),
                onClick: _cache[23] || (_cache[23] = function ($event) {
                  return $options.setupHFW('header');
                }),
                title: _ctx.$i18n('options_button_setup | Click to setup') + '...'
              }, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_headers | Headers')), 11, _hoisted_14)])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_15, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox, {
                modelValue: $props.options.chkAddFooter,
                "onUpdate:modelValue": _cache[24] || (_cache[24] = function ($event) {
                  return $props.options.chkAddFooter = $event;
                })
              }, null, 8, ["modelValue"]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
                "class": (0,shared_esm_bundler/* normalizeClass */.C_)([{
                  checkboxDisabled: $options.isFooterDisabled
                }, "link"]),
                onClick: _cache[25] || (_cache[25] = function ($event) {
                  return $options.setupHFW('footer');
                }),
                title: _ctx.$i18n('options_button_setup | Click to setup') + '...'
              }, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_footers | Footers')), 11, _hoisted_16)])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_17, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox, {
                modelValue: $props.options.chkAddWatermark,
                "onUpdate:modelValue": _cache[26] || (_cache[26] = function ($event) {
                  return $props.options.chkAddWatermark = $event;
                })
              }, null, 8, ["modelValue"]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
                "class": (0,shared_esm_bundler/* normalizeClass */.C_)([{
                  checkboxDisabled: $options.isWatermarkDisabled
                }, "link"]),
                onClick: _cache[27] || (_cache[27] = function ($event) {
                  return $options.setupHFW('watermark');
                }),
                title: _ctx.$i18n('options_button_setup | Click to setup') + '...'
              }, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_watermarks | Watermarks')), 11, _hoisted_18)])];
            }),
            _: 1
          })];
        }),
        _: 1
      })])])])])];
    }),
    _: 1
  }, 8, ["modelValue", "title", "before-close", "onOpened", "onOpen"]);
}
;// CONCATENATED MODULE: ./src/components/PDFSettingsDialog.vue?vue&type=template&id=303727ee&scoped=true
/* unplugin-vue-components disabled */
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__(2564);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(3087);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(2833);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__(8862);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.parse-float.js
var es_parse_float = __webpack_require__(4678);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__(2772);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim-end.js
var es_string_trim_end = __webpack_require__(8702);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__(9554);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
;// CONCATENATED MODULE: ./src/common/graph-utils.ts










//***********************************************************************************************
var TRect = /*#__PURE__*/function () {
  function TRect(left, top, right, bottom) {
    (0,classCallCheck/* default */.Z)(this, TRect);

    this.Left = 0;
    this.Top = 0;
    this.Right = 0;
    this.Bottom = 0;
    this.Left = left;
    this.Top = top;
    this.Right = right;
    this.Bottom = bottom;
  }

  (0,createClass/* default */.Z)(TRect, [{
    key: "clone",
    value: function clone() {
      return new TRect(this.Left, this.Top, this.Right, this.Bottom);
    }
  }, {
    key: "equalsTo",
    value: function equalsTo(r) {
      return r.Left == this.Left && r.Top == this.Top && r.Right == this.Right && r.Bottom == this.Bottom;
    }
  }, {
    key: "Width",
    value: function Width() {
      return this.Right - this.Left;
    }
  }, {
    key: "Height",
    value: function Height() {
      return this.Bottom - this.Top;
    }
  }, {
    key: "midX",
    value: function midX() {
      return this.Left + (this.Right - this.Left) / 2;
    }
  }, {
    key: "midY",
    value: function midY() {
      return this.Top + (this.Bottom - this.Top) / 2;
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(nX, nY) {
      return nX >= this.Left && nX <= this.Right && nY >= this.Top && nY <= this.Bottom;
    }
  }, {
    key: "floorCoords",
    value: function floorCoords() {
      this.Left = Math.floor(this.Left);
      this.Top = Math.floor(this.Top);
      this.Right = Math.floor(this.Right);
      this.Bottom = Math.floor(this.Bottom);
    }
  }, {
    key: "offsetRect",
    value: function offsetRect(dx, dy) {
      this.Left += dx;
      this.Right += dx;
      this.Top += dy;
      this.Bottom += dy;
    }
  }]);

  return TRect;
}(); //***********************************************************************************************

var TSimpleRgn = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function TSimpleRgn() {
    _classCallCheck(this, TSimpleRgn);

    this.rectangles = [];
    this.boundsRect = new TRect(0, 0, 0, 0);
  }

  _createClass(TSimpleRgn, [{
    key: "addRect",
    value: function addRect(v) {
      var rect = v.clone();
      GraphUtils.normalizeRect(rect);
      if (this.rectangles.length == 0) this.boundsRect = rect.clone();else {
        this.boundsRect.Left = Math.min(this.boundsRect.Left, rect.Left);
        this.boundsRect.Top = Math.min(this.boundsRect.Top, rect.Top);
        this.boundsRect.Right = Math.max(this.boundsRect.Right, rect.Right);
        this.boundsRect.Bottom = Math.max(this.boundsRect.Bottom, rect.Bottom);
      }
      this.rectangles.push(rect);
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(x, y) {
      for (var i = this.rectangles.length - 1; i >= 0; i--) {
        if (this.rectangles[i].containsPoint(x, y)) return true;
      }

      return false;
    }
  }, {
    key: "getBoundsRect",
    value: function getBoundsRect() {
      return this.boundsRect.clone();
    }
  }]);

  return TSimpleRgn;
}())); //***********************************************************************************************
//***********************************************************************************************
//***********************************************************************************************

var TPoint = /*#__PURE__*/function () {
  function TPoint() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    (0,classCallCheck/* default */.Z)(this, TPoint);

    this.x = x;
    this.y = y;
  }

  (0,createClass/* default */.Z)(TPoint, [{
    key: "clone",
    value: function clone() {
      return new TPoint(this.x, this.y);
    }
  }, {
    key: "equalsTo",
    value: function equalsTo(r) {
      return r.x == this.x && r.y == this.y;
    }
  }]);

  return TPoint;
}(); //***********************************************************************************************
//***********************************************************************************************
//***********************************************************************************************

var TSize = /*#__PURE__*/function () {
  function TSize() {
    var cx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var cy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    (0,classCallCheck/* default */.Z)(this, TSize);

    this.cx = cx;
    this.cy = cy;
  }

  (0,createClass/* default */.Z)(TSize, [{
    key: "clone",
    value: function clone() {
      return new TSize(this.cx, this.cy);
    }
  }, {
    key: "equalsTo",
    value: function equalsTo(r) {
      return r.cx == this.cx && r.cy == this.cy;
    }
  }]);

  return TSize;
}(); //***********************************************************************************************
//**********************************************************************************************
//***********************************************************************************************

var GraphUtils = /*#__PURE__*/function () {
  function GraphUtils() {
    (0,classCallCheck/* default */.Z)(this, GraphUtils);
  }

  (0,createClass/* default */.Z)(GraphUtils, null, [{
    key: "normalizeRect",
    value: function normalizeRect(rect) {}
  }, {
    key: "createCanvas",
    value: function createCanvas(width, height) {
      var canvas;

      if (typeof OffscreenCanvas === "undefined") {
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
      } else canvas = new OffscreenCanvas(width, height);

      return canvas;
    } //***********************************************************************************************

  }, {
    key: "setupCtx",
    value: function setupCtx(canvas) {
      var transparent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var ctx = canvas.getContext('2d', {
        alpha: transparent
      });

      if (ctx) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.translate(0.5, 0.5);
      }

      return ctx;
    } //***********************************************************************************************

  }, {
    key: "blendRect",
    value: function blendRect(ctx, opacity, rect, blendColor, frameWidth, frameColor) {
      ctx.fillStyle = blendColor;
      ctx.globalAlpha = 1 - opacity;
      ctx.fillRect(rect.Left, rect.Top, rect.Width(), rect.Height());
      ctx.globalAlpha = 1;

      if (frameWidth > 0) {
        ctx.strokeStyle = frameColor;
        ctx.lineWidth = frameWidth;
        ctx.strokeRect(rect.Left, rect.Top, rect.Width(), rect.Height());
      }
    } //*************************************************************************************

  }, {
    key: "dashRect",
    value: function dashRect(ctx, x, y, width, height, step) {
      var w = Math.max(width, height) + Math.min(width, height);
      ctx.beginPath();
      ctx.strokeStyle = '#eee';
      ctx.lineWidth = 1;

      for (var i = 0; i < w; i += step) {
        ctx.moveTo(x + 0, y + i);
        ctx.lineTo(x + i, y);
        ctx.moveTo(x + width - i, y);
        ctx.lineTo(x + width, y + i);
      }

      ctx.stroke();
    } //*************************************************************************************

  }, {
    key: "drawTextSingle",
    value: function drawTextSingle(ctx, text, options, position, maxWidth) {
      var draw = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var bold = options.fontStyle.indexOf("B") !== -1 ? "bold" : "";
      var italic = options.fontStyle.indexOf("I") !== -1 ? "italic" : "";
      var underlined = options.fontStyle.indexOf("U") !== -1;
      var strikeout = options.fontStyle.indexOf("S") !== -1;

      var calcRealWidth = function calcRealWidth(element) {
        element.realWidth = Math.max(element.width, element.actualBoundingBoxLeft + element.actualBoundingBoxRight);
      };

      ctx.font = "".concat(bold, " ").concat(italic, " ").concat(options.fontSize, "px ").concat(options.fontName), ctx.fillStyle = options.fontColor;
      var words = text.trimEnd().split(' ');
      if (!words.length) return {
        width: 0,
        height: 0,
        nextLineY: 0,
        gap: 0
      };
      var lines = [];
      var prevLine = words[0],
          prevMetrics = ctx.measureText(prevLine),
          fontHeight = 0,
          calcMaxWidth = 0;
      calcRealWidth(prevMetrics);

      for (var i = 1; i <= words.length; ++i) {
        var fLast = i == words.length;
        var nextLine = prevLine + (fLast ? "" : " " + words[i]);
        var nextMetrics = ctx.measureText(nextLine.trimEnd());
        calcRealWidth(nextMetrics);

        if (maxWidth > 0 && nextMetrics.realWidth > maxWidth || fLast) {
          lines.push({
            string: prevLine,
            metrics: prevMetrics
          });
          calcMaxWidth = Math.max(calcMaxWidth, prevMetrics.realWidth);

          if (!fLast) {
            prevLine = words[i];
            prevMetrics = ctx.measureText(words[i]);
            calcRealWidth(prevMetrics);
          }
        } else {
          prevMetrics = nextMetrics;
          prevLine = nextLine;
        }
      }

      ctx.textBaseline = 'top';
      var t = ctx.measureText("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
      var tDown = typeof t.fontBoundingBoxDescent === "undefined" ? t.actualBoundingBoxDescent : t.fontBoundingBoxDescent;
      fontHeight = typeof t.fontBoundingBoxDescent === "undefined" ? (t.actualBoundingBoxDescent - t.actualBoundingBoxAscent) * 1.2 : t.fontBoundingBoxDescent + t.fontBoundingBoxAscent;
      var curY = 0;
      var gap = fontHeight * 0.2;

      if (draw) {
        if (maxWidth > 0) {
          ctx.save();
          ctx.rect(position.x - 0.5, position.y - 0.5, maxWidth, 9999999);
          ctx.clip();
        }

        lines.forEach(function (element) {
          var line = element.string;
          var ellipsis = "";

          while (maxWidth > 0 && element.metrics.realWidth > maxWidth && line.length > 0) {
            ellipsis = ellipsis || "...";
            line = line.substring(0, line.length - 1);
            element.metrics = ctx.measureText(line + ellipsis);
            calcRealWidth(element.metrics);
          }

          var nOffsetX = 0;
          if (maxWidth <= 0) maxWidth = calcMaxWidth;

          switch (options.alignment) {
            case 'right':
              nOffsetX = maxWidth - element.metrics.realWidth;
              break;

            case 'center':
              nOffsetX = Math.floor((maxWidth - element.metrics.realWidth) / 2);
              break;
          }

          ctx.fillText(line + ellipsis, nOffsetX + position.x, position.y + curY);

          if (strikeout || underlined) {
            ctx.strokeStyle = options.fontColor;
            ctx.lineWidth = Math.ceil(options.fontSize / 15);
            ctx.beginPath();
            var modifiedHeight = Math.floor(fontHeight * 0.85) - ctx.lineWidth;

            if (strikeout) {
              ctx.moveTo(Math.floor(nOffsetX + position.x), Math.floor(position.y + curY + modifiedHeight / 2));
              ctx.lineTo(Math.floor(nOffsetX + position.x + element.metrics.realWidth), Math.floor(position.y + curY + modifiedHeight / 2));
            }

            if (underlined) {
              ctx.moveTo(Math.floor(nOffsetX + position.x), Math.floor(position.y + curY + tDown));
              ctx.lineTo(Math.floor(nOffsetX + position.x + element.metrics.realWidth), Math.floor(position.y + curY + tDown));
            }

            ctx.stroke();
          }

          curY += fontHeight + gap;
        });
        ctx.restore();
      }

      var nextLineY = (fontHeight + gap) * lines.length;
      t = ctx.measureText(lines[lines.length - 1].string);
      var lastLineHeight = t.fontBoundingBoxDescent ? t.fontBoundingBoxDescent : t.actualBoundingBoxDescent - t.actualBoundingBoxAscent;
      var textHeight = (lines.length > 1 ? nextLineY - (fontHeight + gap) : 0) + lastLineHeight; //let textHeight = (lines.length > 1 ? (nextLineY - (fontHeight + gap)) : 0) + t.fontBoundingBoxDescent;

      return {
        width: maxWidth > 0 ? Math.min(maxWidth, calcMaxWidth) : calcMaxWidth,
        height: textHeight,
        nextLineY: nextLineY + position.y,
        gap: gap
      };
    } //*************************************************************************************

  }, {
    key: "drawText",
    value: function drawText(ctx, text, options, position, maxWidth) {
      var _this = this;

      var draw = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      if (text === "") return {
        width: 0,
        height: 0,
        gap: 0,
        nextLineY: 0
      };
      var lines = text.split('\n'),
          calcMaxWidth = 0,
          lastGap = 0,
          nextLineY = position.y,
          actualHeight = 0;
      lines.forEach(function (element) {
        var line = element == "" ? " " : element;

        var exts = _this.drawTextSingle(ctx, line, options, new TPoint(position.x, nextLineY), maxWidth, draw);

        actualHeight = nextLineY + exts.height;
        nextLineY = exts.nextLineY;
        calcMaxWidth = Math.max(calcMaxWidth, exts.width);
        lastGap = exts.gap;
      });
      return {
        width: Math.ceil(calcMaxWidth),
        height: Math.ceil(actualHeight),
        gap: lastGap,
        nextLineY: nextLineY
      };
    } //***********************************************************************************************

  }, {
    key: "measureTextSingle",
    value: function measureTextSingle(ctx, text, options, maxWidth) {
      return this.drawTextSingle(ctx, text, options, new TPoint(0, 0), maxWidth, false);
    } //***********************************************************************************************

  }, {
    key: "measureText",
    value: function measureText(ctx, text, options, maxWidth) {
      var metrics = this.drawText(ctx, text, options, new TPoint(0, 0), maxWidth, false);
      return new TSize(metrics.width, metrics.height);
    }
    /*********************************************************************************/

  }, {
    key: "textInBox",
    value: function textInBox(ctx, text, options, position, maxWidth) {
      var draw = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var enlargeToMax = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
      var textMargin = 12 + Math.ceil(options.frameWidth / 2);
      var metrics = this.drawText(ctx, text, options, position, maxWidth > 0 ? maxWidth - textMargin * 2 : maxWidth, false);
      var boxWidth = metrics.width + textMargin * 2;
      var boxHeight = metrics.height + textMargin * 2; // Если явно задана ширина, то при отрисовке используем её.

      if (enlargeToMax && maxWidth > 0) {
        metrics.width = maxWidth - textMargin * 2;
        boxWidth = maxWidth - 1;
      }

      if (draw) {
        var x = position.x + textMargin,
            y = position.y + textMargin;
        this.blendRect(ctx, options.backgroundOpacity, new TRect(position.x, position.y, position.x + boxWidth, position.y + boxHeight), options.backgroundColor, options.frameWidth, options.frameColor);
        this.drawText(ctx, text, options, new TPoint(x, y), metrics.width, true);
      }

      return new TSize(boxWidth, boxHeight);
    }
  }]);

  return GraphUtils;
}();
;// CONCATENATED MODULE: ./src/common/pdf-page-metrics.ts





var DEFAULT_PAGE_WIDTH = 8.3;
var DEFAULT_PAGE_HEIGHT = 11.7;
var PDFSettings = /*#__PURE__*/function () {
  function PDFSettings(data) {
    (0,classCallCheck/* default */.Z)(this, PDFSettings);

    this.chkMultipagePDF = true;
    this.chkSmartPageBreaks = true;
    this.cmbPageSize = 0;
    this.cmbPageSizeSingle = 0;
    this.edtCustomWidth = 8.3;
    this.cmbCustomWidthUnits = 0;
    this.edtWidthSingle = 8.3;
    this.cmbWidthMeasurementSingle = 0;
    this.edtCustomHeight = 11.7;
    this.cmbCustomHeightUnits = 0;
    this.edtWidth = 8.3;
    this.cmbWidthMeasurement = 0;
    this.edtHeight = 11.7;
    this.cmbHeightMeasurement = 0;
    this.cmbOrientation = 0;
    this.chkSearchablePDF = true;
    this.chkEnableWebLinks = true;
    this.chkAddHeader = true;
    this.chkAddFooter = true;
    this.chkAddWatermark = false;
    this.cmbMarginsMeasurement = 0;
    this.edtLeftMargin = 0.5;
    this.edtTopMargin = 0.5;
    this.edtRightMargin = 0.5;
    this.edtBottomMargin = 0.5;

    if (data) {
      var t = JSON.parse(data);

      for (var key in t) {
        this[key] = t[key];
      }
    }
  }

  (0,createClass/* default */.Z)(PDFSettings, [{
    key: "serialize",
    value: function serialize() {
      return JSON.stringify(this);
    }
  }]);

  return PDFSettings;
}();
/*********************************************************************************/

var PDFPageMetrics = /*#__PURE__*/function () {
  /*********************************************************************************/
  function PDFPageMetrics(options) {
    (0,classCallCheck/* default */.Z)(this, PDFPageMetrics);

    this.options = options;
  }

  (0,createClass/* default */.Z)(PDFPageMetrics, [{
    key: "getUnitsRatio",
    value: function getUnitsRatio(control) {
      switch (control) {
        case 0:
          return 1;

        case 1:
          return 2.54;

        case 2:
          return 25.4;

        case 3:
          return 72;

        case 4:
          return 6;

        default:
          return 1;
      }
    }
  }, {
    key: "getSelectedStockSize",
    value:
    /*********************************************************************************/
    function getSelectedStockSize() {
      var result = new TSize(0, 0);

      switch (this.options.cmbPageSize) {
        case 1:
          result = new TSize(11.7, 16.5);
          break;
        //A3

        case 2:
          result = new TSize(8.3, 11.7);
          break;
        //A4

        case 3:
          result = new TSize(5.8, 8.3);
          break;
        //A5

        case 4:
          result = new TSize(8.5, 11.0);
          break;
        //Letter

        case 5:
          result = new TSize(8.5, 14.0);
          break;
        //Legal
      }

      if (this.options.cmbOrientation == 1) {
        var t = result.cx;
        result.cx = result.cy;
        result.cy = t;
      }

      return result;
    }
  }, {
    key: "areMarginsValid",
    value:
    /*********************************************************************************/
    function areMarginsValid() {
      var rfMargins = this.getPageMargins(),
          pageExtents = this.getPageSize();

      if (!this.options.chkMultipagePDF) {
        if (this.isCustomSize()) return rfMargins.Left + rfMargins.Right < pageExtents.cx;else return true;
      } else {
        if (this.options.cmbPageSize === 0) return true;else return rfMargins.Left + rfMargins.Right < pageExtents.cx && rfMargins.Top + rfMargins.Bottom < pageExtents.cy;
      }
    }
    /*********************************************************************************/

  }, {
    key: "toDoubleDef",
    value: function toDoubleDef(string, def) {
      var result = parseFloat(string);
      return isNaN(result) ? def : result;
    }
  }, {
    key: "loadConfig",
    value: function loadConfig() {}
  }, {
    key: "saveConfig",
    value: function saveConfig() {}
    /*********************************************************************************/

  }, {
    key: "getPageSize",
    value: function getPageSize() {
      var fltPageWidth = 0,
          fltPageHeight = 0;

      if (this.options.chkMultipagePDF) {
        if (this.isCustomSize()) {
          fltPageWidth = this.options.edtCustomWidth / this.getUnitsRatio(this.options.cmbCustomWidthUnits);
          if (fltPageWidth <= 0) fltPageWidth = DEFAULT_PAGE_WIDTH;
          fltPageHeight = this.options.edtCustomHeight / this.getUnitsRatio(this.options.cmbCustomHeightUnits);
          if (fltPageHeight <= 0) fltPageHeight = DEFAULT_PAGE_HEIGHT;
        } else {
          var sz = this.getSelectedStockSize();
          fltPageWidth = sz.cx;
          fltPageHeight = sz.cy;
        }
      } else {
        if (this.isCustomSize()) {
          fltPageWidth = this.options.edtWidthSingle / this.getUnitsRatio(this.options.cmbWidthMeasurementSingle);
          if (fltPageWidth <= 0) fltPageWidth = DEFAULT_PAGE_WIDTH;
        }
      }

      return new TSize(fltPageWidth, fltPageHeight);
    }
    /*********************************************************************************/

  }, {
    key: "getPageMargins",
    value: function getPageMargins() {
      var fltRatio = this.getUnitsRatio(this.options.cmbMarginsMeasurement);

      var D = function D(val) {
        return Math.max(0, val / fltRatio);
      };

      return new TRect(D(this.options.edtLeftMargin), D(this.options.edtTopMargin), D(this.options.edtRightMargin), D(this.options.edtBottomMargin));
    }
    /*********************************************************************************/

  }, {
    key: "isCustomSize",
    value: function isCustomSize() {
      return this.options.chkMultipagePDF ? this.options.cmbPageSize === 6 : this.options.cmbPageSizeSingle === 1;
    }
  }, {
    key: "isAutocalcHeight",
    value: function isAutocalcHeight() {
      return !this.options.chkMultipagePDF && this.options.cmbPageSizeSingle == 1;
    }
  }, {
    key: "isSinglePage",
    value: function isSinglePage() {
      return !this.options.chkMultipagePDF; //- закомментировал это, непонятно, по какой логике это было здесь: && this.options.cmbPageSizeSingle == 0;
    }
  }, {
    key: "isSpecificSize",
    value: function isSpecificSize() {
      return this.options.chkMultipagePDF && this.options.cmbPageSize > 0 || !this.options.chkMultipagePDF && this.options.cmbPageSizeSingle == 1;
    }
  }, {
    key: "linksEnabled",
    value: function linksEnabled() {
      return this.options.chkEnableWebLinks;
    }
  }, {
    key: "textEnabled",
    value: function textEnabled() {
      return this.options.chkSearchablePDF;
    }
  }, {
    key: "headersEnabled",
    value: function headersEnabled() {
      return this.options.chkAddHeader;
    }
  }, {
    key: "footersEnabled",
    value: function footersEnabled() {
      return this.options.chkAddFooter;
    }
  }, {
    key: "watermarksEnabled",
    value: function watermarksEnabled() {
      return this.options.chkAddWatermark;
    }
  }, {
    key: "optimizationEnabled",
    value: function optimizationEnabled() {
      return false;
    }
  }, {
    key: "smartPageBreaksEnabled",
    value: function smartPageBreaksEnabled() {
      return this.options.chkSmartPageBreaks;
    }
  }]);

  return PDFPageMetrics;
}();
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PDFSettingsDialog.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */


/* harmony default export */ const PDFSettingsDialogvue_type_script_lang_js = ({
  name: "pdfMetricsDialog",
  data: function data() {
    return {
      divPageRender: null,
      maxWidth: 0,
      maxHeight: 0,
      pagePreviewWidth: "",
      pagePreviewHeight: "100%",
      pageMargins: 0,
      pageMarginsValid: true,
      initInterval: undefined,
      vPageSizes: [{
        type: this.$i18n("pdf_dialog_pagesize_auto | Auto"),
        width: 0,
        height: 0
      }, {
        type: "A3",
        width: 11.7,
        height: 16.5
      }, {
        type: "A4",
        width: 8.3,
        height: 11.7
      }, {
        type: "A5",
        width: 5.8,
        height: 8.3
      }, {
        type: "Letter",
        width: 8.5,
        height: 11
      }, {
        type: "Legal",
        width: 8.5,
        height: 14
      }, {
        type: this.$i18n("pdf_dialog_pagesize_custom_wh | Custom Width and Height") + "...",
        width: 0,
        height: 0
      }],
      vPageSizesNoSplit: [this.$i18n("pdf_dialog_pagesize_auto | Auto"), this.$i18n("pdf_dialog_pagesize_custom_width | Custom Width") + "..."],
      vUnits: [this.$i18n("pdf_dialog_inches | inches"), "cm", "mm", "pt", "pc"],
      vOrientations: [this.$i18n("pdf_dialog_orientation_portrait | Portrait"), this.$i18n("pdf_dialog_orientation_landscape | Landscape")],
      sizeMin: 0.1,
      sizeMax: 999,
      sizeStep: 0.1,
      sizePrecision: 1
    };
  },
  computed: {
    isHeaderDisabled: function isHeaderDisabled() {
      return !this.options.chkAddHeader;
    },
    isFooterDisabled: function isFooterDisabled() {
      return !this.options.chkAddFooter;
    },
    isWatermarkDisabled: function isWatermarkDisabled() {
      return !this.options.chkAddWatermark;
    }
  },
  props: {
    visible: Boolean,
    options: PDFSettings
  },
  emits: ["dialogResult", "showHFWStyle"],
  watch: {
    options: function options(val) {
      if (this.$refs.pageRenderPanel) this.changed();
    }
  },
  methods: {
    preinit: function preinit() {
      var _this = this;

      this.initInterval = setInterval(function () {
        _this.init();
      }, 100);
    },
    init: function init() {
      if (!this.$refs.pageRenderPanel) return;else clearInterval(this.initInterval);
      this.divPageRender = this.$refs.pageRenderPanel;
      this.divPageRender.style.display = "flex";
      var rectMain = this.divPageRender.getBoundingClientRect();
      var rectPage = this.$refs.pageRenderPage.getBoundingClientRect();
      this.maxWidth = rectPage.width;
      this.maxHeight = rectMain.height * 0.6;
      this.updateCanvas();
    },
    defaultValues: function defaultValues() {
      Object.assign(this.options, new PDFSettings());
      this.changed();
    },
    handleClose: function handleClose(done) {
      if (!document.querySelector("div.cpicker-selector[aria-hidden='false']")) {
        done();
        this.closeDialog(false);
      }
    },
    closeDialog: function closeDialog(save) {
      this.$emit("dialogResult", save ? {
        config: this.options
      } : undefined);
    },
    changed: function changed() {
      if (this.options.cmbPageSize > 0 && this.options.cmbPageSize < 6) {
        if (this.options.cmbOrientation == 0) {
          this.options.edtWidth = this.vPageSizes[this.options.cmbPageSize].width;
          this.options.edtHeight = this.vPageSizes[this.options.cmbPageSize].height;
        } else {
          this.options.edtWidth = this.vPageSizes[this.options.cmbPageSize].height;
          this.options.edtHeight = this.vPageSizes[this.options.cmbPageSize].width;
        }
      }

      this.updateCanvas();
    },
    updateCanvas: function updateCanvas() {
      var pdfMetrics = new PDFPageMetrics(this.options);
      var size = pdfMetrics.getPageSize();
      var nMaxPreviewWidth = this.maxWidth,
          nMaxPreviewHeight = this.maxHeight;
      var fltPageWidth = size.cx,
          fltPageHeight = size.cy;
      this.pageMarginsValid = pdfMetrics.areMarginsValid();
      var fDefaultSize = size.cy === 0 || size.cx === 0 || !this.pageMarginsValid;

      if (fDefaultSize) {
        fltPageWidth = size.cx === 0 ? DEFAULT_PAGE_WIDTH : size.cx;
        fltPageHeight = fltPageWidth * DEFAULT_PAGE_HEIGHT / DEFAULT_PAGE_WIDTH;
      }

      var nShapePageWidth, nShapePageHeight;

      if (fltPageWidth >= fltPageHeight) {
        nShapePageWidth = nMaxPreviewWidth;
        nShapePageHeight = nShapePageWidth * fltPageHeight / fltPageWidth;

        if (nShapePageHeight > nMaxPreviewHeight) {
          nShapePageWidth = nShapePageWidth * nMaxPreviewHeight / nShapePageHeight;
          nShapePageHeight = nMaxPreviewHeight;
        }
      } else {
        nShapePageHeight = nMaxPreviewHeight;
        nShapePageWidth = nShapePageHeight * fltPageWidth / fltPageHeight;

        if (nShapePageWidth > nMaxPreviewWidth) {
          nShapePageHeight = nShapePageHeight * nMaxPreviewWidth / nShapePageWidth;
          nShapePageWidth = nMaxPreviewWidth;
        }
      }

      this.pagePreviewWidth = nShapePageWidth + "px";
      this.pagePreviewHeight = nShapePageHeight + "px";
      var margins = pdfMetrics.getPageMargins();
      var ratio = nShapePageHeight / fltPageHeight;
      if (this.pageMarginsValid) this.pageMargins = "".concat(margins.Top * ratio, "px ").concat(margins.Right * ratio, "px ").concat(margins.Bottom * ratio, "px ").concat(margins.Left * ratio, "px");else this.pageMargins = 0; //this.$refs.pageRenderPage.style = `width: ${nShapePageWidth}px, height: ${nShapePageHeight}px`;
    },
    setupHFW: function setupHFW(mode) {
      this.$emit("showHFWStyle", mode);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/PDFSettingsDialog.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */ 
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PDFSettingsDialog.vue?vue&type=style&index=0&id=303727ee&lang=scss&scoped=true
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/PDFSettingsDialog.vue?vue&type=style&index=0&id=303727ee&lang=scss&scoped=true
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PDFSettingsDialog.vue?vue&type=style&index=1&id=303727ee&lang=css
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/PDFSettingsDialog.vue?vue&type=style&index=1&id=303727ee&lang=css
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/PDFSettingsDialog.vue?vue&type=style&index=2&id=303727ee&scoped=true&lang=css
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/PDFSettingsDialog.vue?vue&type=style&index=2&id=303727ee&scoped=true&lang=css
/* unplugin-vue-components disabled */
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(3744);
;// CONCATENATED MODULE: ./src/components/PDFSettingsDialog.vue
/* unplugin-vue-components disabled */



;




const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(PDFSettingsDialogvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-303727ee"]])

/* harmony default export */ const PDFSettingsDialog = (__exports__);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/input/style/css.mjs + 1 modules
var input_style_css = __webpack_require__(4367);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/input/index.mjs + 5 modules
var input = __webpack_require__(8280);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWSettingsDialog.vue?vue&type=template&id=43c0176c&scoped=true
/* unplugin-vue-components disabled */






var HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_withScopeId = function _withScopeId(n) {
  return _pushScopeId("data-v-43c0176c"), n = n(), _popScopeId(), n;
};

var HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_hoisted_1 = {
  id: "wildcardHolder"
};
var HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_hoisted_2 = ["onClick"];
var HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_hoisted_3 = {
  "class": "dialog-footer"
};
function HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_col = col/* ElCol */.Dv;

  var _component_el_row = row/* ElRow */.dq;

  var _component_el_input = input/* ElInput */.EZ;

  var _component_el_button = components_button/* ElButton */.mi;

  var _component_el_dialog = dialog/* ElDialog */.d0;

  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_dialog, {
    modelValue: $props.visible,
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $props.visible = $event;
    }),
    title: $options.title,
    width: 850,
    "append-to-body": "",
    "lock-scroll": false,
    onOpened: $options.init
  }, {
    footer: (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_hoisted_3, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        style: {
          "float": "left"
        },
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.defaultValues();
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_defaults | Restore to defaults')), 1)];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        type: "primary",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          $options.closeDialog(true);
          $props.visible = false;
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('action_ok | OK')), 1)];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        onClick: _cache[3] || (_cache[3] = function ($event) {
          $props.visible = false;
          $options.closeDialog(false);
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_cancel | Cancel')), 1)];
        }),
        _: 1
      })])];
    }),
    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        "class": "topic"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 24
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_template | Template')), 1)];
            }),
            _: 1
          })];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, null, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: 24 - $data.offset
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input, {
                ref: "templateInput",
                modelValue: $props.options.template,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                  return $props.options.template = $event;
                }),
                rows: 4,
                autofocus: "",
                type: "textarea",
                placeholder: _ctx.$i18n('pdf_dialog_please_specify_template | Please specify template') + '...'
              }, null, 8, ["modelValue", "placeholder"])];
            }),
            _: 1
          }, 8, ["offset", "span"])];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, null, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("p", null, [(0,runtime_core_esm_bundler/* createElementVNode */._)("b", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_label_template_values | The following predefined values can be used (click to insert)') + ':'), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_hoisted_1, [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.wildcards, function (column, index1) {
                return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
                  key: index1
                }, [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)(column, function (item, index2) {
                  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
                    id: "wildcard",
                    onClick: function onClick($event) {
                      return $options.addWildcard(item[0]);
                    },
                    key: index2
                  }, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", null, (0,shared_esm_bundler/* toDisplayString */.zw)(item[0]), 1), (0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, "- " + (0,shared_esm_bundler/* toDisplayString */.zw)(item[1]), 1)], 8, HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_hoisted_2);
                }), 128))]);
              }), 128))])];
            }),
            _: 1
          }, 8, ["offset"])];
        }),
        _: 1
      })];
    }),
    _: 1
  }, 8, ["modelValue", "title", "onOpened"]);
}
;// CONCATENATED MODULE: ./src/components/HFWSettingsDialog.vue?vue&type=template&id=43c0176c&scoped=true
/* unplugin-vue-components disabled */
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js + 1 modules
var objectSpread2 = __webpack_require__(4648);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(3806);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 5 modules
var createSuper = __webpack_require__(1481);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__(3710);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.to-string.js
var es_error_to_string = __webpack_require__(6647);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(9714);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5306);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__(285);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.js
var web_url_search_params = __webpack_require__(1637);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(3210);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__(5061);
;// CONCATENATED MODULE: ./src/common/hfw-component.ts


















/*********************************************************************************/

var HFWVars = /*#__PURE__*/(0,createClass/* default */.Z)(function HFWVars() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Page title";
  var URL = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Page URL";
  var created = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
  var extents = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new TSize(1000, 1000);

  (0,classCallCheck/* default */.Z)(this, HFWVars);

  this.title = title;
  this.URL = URL;
  this.created = created;
  this.extents = extents;
});
/*********************************************************************************/

var HFWSettings = /*#__PURE__*/function () {
  function HFWSettings(mode, data) {
    (0,classCallCheck/* default */.Z)(this, HFWSettings);

    this.type = "text";
    this.fontName = "Verdana";
    this.fontSize = Math.ceil(15 * self.devicePixelRatio);
    this.fontColor = "#666";
    this.fontStyle = [];
    this.backgroundColor = "#f0f0f0";
    this.frameColor = "#ddd";
    this.frameWidth = 1;
    this.textAlignment = "left";
    this.margin = 50;
    this.template = "Page %p\n%t\n%u";
    this.opacity = 0;
    this.bitmap = "";
    this.bitmapLink = "";
    this.position = 8;

    switch (mode) {
      case "header":
        this.template = "Page %p\n%t\n%u";
        break;

      case "footer":
        this.template = "Captured by FireShot Pro: %d %B %y, %H:%M:%S\nhttps://getfireshot.com";
        this.textAlignment = "center";
        break;

      case "watermark":
        this.template = "Page %p";
        this.opacity = 85;
        this.frameWidth = 0;
        this.fontSize = Math.ceil(150 * self.devicePixelRatio);
        this.backgroundColor = "#fff";
        break;
    }

    if (data) {
      var t = JSON.parse(data);

      for (var key in t) {
        this[key] = t[key];
      }
    }
  }

  (0,createClass/* default */.Z)(HFWSettings, [{
    key: "serialize",
    value: function serialize() {
      return JSON.stringify(this);
    }
  }]);

  return HFWSettings;
}();
/*********************************************************************************/

/*********************************************************************************/

/*********************************************************************************/

/*********************************************************************************/

var HeaderFooter = /*#__PURE__*/function () {
  //URL: string, private title: string, private date: Date, protected imageSize: TSize
  function HeaderFooter(options, vars) {
    (0,classCallCheck/* default */.Z)(this, HeaderFooter);

    this.options = options;
    this.vars = vars;
    this.pageNumber = 1;
    this.options = Object.assign({}, options);
  }

  (0,createClass/* default */.Z)(HeaderFooter, [{
    key: "setPageNumber",
    value: function setPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
    }
    /*********************************************************************************/

  }, {
    key: "padString",
    value: function padString(str, padding, length) {
      str = str.toString();

      while (str.length < length) {
        str = padding + str;
      }

      return str;
    }
    /*********************************************************************************/

  }, {
    key: "processTemplate",
    value: function processTemplate() {
      var template = this.options.template;
      template = template.replace(/%y/g, this.vars.created.getFullYear().toString());
      template = template.replace(/%m/g, this.padString((this.vars.created.getMonth() + 1).toString(), "0", 2));
      template = template.replace(/%d/g, this.padString(this.vars.created.getDate().toString(), "0", 2));
      template = template.replace(/%H/g, this.padString(this.vars.created.getHours().toString(), "0", 2));
      template = template.replace(/%M/g, this.padString(this.vars.created.getMinutes().toString(), "0", 2));
      template = template.replace(/%S/g, this.padString(this.vars.created.getSeconds().toString(), "0", 2));
      template = template.replace(/%A/g, this.vars.created.toLocaleDateString(navigator.language, {
        weekday: 'long'
      }));
      template = template.replace(/%B/g, this.vars.created.toLocaleDateString(navigator.language, {
        month: 'long'
      }));
      var domain = "";

      try {
        domain = new URL(this.vars.URL).hostname;
      } catch (_a) {
        domain = "<Error acquiring domain>";
      }

      ;
      template = template.replace(/%e/g, domain);
      template = template.replace(/%t/g, this.vars.title);
      template = template.replace(/%u/g, this.vars.URL);
      template = template.replace(/%w/g, this.vars.extents.cx.toString());
      template = template.replace(/%h/g, this.vars.extents.cy.toString());
      template = template.replace(/%p/g, this.pageNumber.toString());
      return template;
    }
    /*********************************************************************************/

  }, {
    key: "getText",
    value: function getText() {
      return this.processTemplate();
    }
    /*********************************************************************************/

  }, {
    key: "getMargin",
    value: function getMargin() {
      return this.options.margin;
    }
    /*********************************************************************************/

  }, {
    key: "getOpacity",
    value: function getOpacity() {
      return this.options.opacity;
    }
    /*********************************************************************************/
    // Для хедеров и футеров в расчёт берётся только cx

  }, {
    key: "getRect",
    value: function getRect(pageSize) {
      var canvas = GraphUtils.createCanvas(1, 1);
      var ctx = GraphUtils.setupCtx(canvas, false); //let ctx = canvas.getContext('2d', {alpha: false});

      var size = this.draw(ctx, new TSize(pageSize.cx, -1), true);
      size.cx++;
      size.cy++;
      return new TRect(0, 0, size.cx, size.cy);
    }
    /*********************************************************************************/

  }, {
    key: "getURLFromImage",
    value: function getURLFromImage() {
      if (this.options.type === "bitmap" && this.options.bitmapLink.length) {
        var _URL = this.options.bitmapLink.trim();

        if (_URL.length && /(^[a-zA-Z]+:\/\/)/.test(_URL)) return _URL;else return "https://" + _URL;
      } else return "";
    }
    /*********************************************************************************/

  }, {
    key: "getURLFromText",
    value: function getURLFromText() {
      var vURLs = /([a-zA-Z]+:\/\/.+?)(\s|$)/.exec(this.getText());
      return vURLs && vURLs.length > 1 ? vURLs[1] : "";
    }
    /*********************************************************************************/

  }, {
    key: "getURL",
    value: function getURL() {
      if (this.options.type === "bitmap") return this.getURLFromImage();else return this.getURLFromText();
    }
    /*********************************************************************************/

  }, {
    key: "getBitmap",
    value: function getBitmap(pageSize) {
      var rect = this.getRect(pageSize);
      if (!rect.Width() && !rect.Height()) return new ImageData(0, 0);
      var ctx = this.getCanvas(pageSize).getContext('2d', {
        alpha: false
      });

      if (ctx) {
        //ctx.translate(0.5, 0.5);
        //this.draw(ctx, pageSize);
        return ctx.getImageData(0, 0, rect.Width(), rect.Height());
      } else return new ImageData(0, 0);
    }
    /*********************************************************************************/

  }, {
    key: "getCanvas",
    value: function getCanvas(pageSize) {
      var rect = this.getRect(pageSize);
      var canvas = GraphUtils.createCanvas(rect.Width(), rect.Height());
      var ctx = GraphUtils.setupCtx(canvas, false);
      if (ctx) this.draw(ctx, pageSize);
      return canvas;
    }
    /*********************************************************************************/

  }, {
    key: "draw",
    value: function draw(ctx, pageExtents) {
      var onlySize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var options = {
        fontStyle: this.options.fontStyle,
        fontSize: this.options.fontSize,
        fontName: this.options.fontName,
        fontColor: this.options.fontColor,
        alignment: this.options.textAlignment,
        backgroundColor: this.options.backgroundColor,
        backgroundOpacity: 0,
        frameColor: this.options.frameColor,
        frameWidth: this.options.frameWidth
      };
      return GraphUtils.textInBox(ctx, this.getText(), options, new TPoint(0, 0), pageExtents.cx, !onlySize, true);
    }
  }]);

  return HeaderFooter;
}();
/*********************************************************************************/

/*********************************************************************************/

/*********************************************************************************/

/*********************************************************************************/

var Watermark = /*#__PURE__*/function (_HeaderFooter) {
  (0,inherits/* default */.Z)(Watermark, _HeaderFooter);

  var _super = (0,createSuper/* default */.Z)(Watermark);

  function Watermark() {
    (0,classCallCheck/* default */.Z)(this, Watermark);

    return _super.apply(this, arguments);
  }

  (0,createClass/* default */.Z)(Watermark, [{
    key: "getSize",
    value: function getSize(pageExtents) {
      var canvas = GraphUtils.createCanvas(1, 1);
      var ctx = GraphUtils.setupCtx(canvas, false);
      return this.draw(ctx, pageExtents, true);
    }
    /*********************************************************************************/

  }, {
    key: "draw",
    value: function draw(ctx, pageExtents) {
      var onlySize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var strConstraints = new TSize(pageExtents.cx - this.options.margin * 2, 0);
      var options = {
        fontStyle: this.options.fontStyle,
        fontSize: this.options.fontSize,
        fontName: this.options.fontName,
        fontColor: this.options.fontColor,
        alignment: this.options.textAlignment,
        backgroundColor: this.options.backgroundColor,
        backgroundOpacity: 0,
        frameColor: this.options.frameColor,
        frameWidth: this.options.frameWidth
      };
      return GraphUtils.textInBox(ctx, this.getText(), options, new TPoint(0, 0), strConstraints.cx, !onlySize, false);
    }
    /*********************************************************************************/

  }, {
    key: "getRect",
    value: function getRect(pageSize) {
      var strSize = this.getSize(pageSize);
      strSize.cx++;
      strSize.cy++;
      var nWMWidth = strSize.cx;
      var nWMHeight = strSize.cy;
      var nWMX = 0;
      var nWMY = 0;
      var nMargin = this.options.margin;
      var rect = new TRect(0, 0, pageSize.cx, pageSize.cy);

      switch (this.options.position) {
        // smTopLeft
        case 0:
          nWMX = nMargin;
          nWMY = nMargin;
          break;
        // smTopCenter

        case 1:
          nWMX = (rect.Width() - nWMWidth) / 2;
          nWMY = nMargin;
          break;
        // smTopRight

        case 2:
          nWMX = rect.Width() - (nWMWidth + nMargin);
          nWMY = nMargin;
          break;
        // smLeftCenter

        case 3:
          nWMX = nMargin;
          nWMY = (rect.Height() - nWMHeight) / 2;
          break;
        // smRightCenter

        case 4:
          nWMX = rect.Width() - (nWMWidth + nMargin);
          nWMY = (rect.Height() - nWMHeight) / 2;
          break;
        //  smBottomLeft

        case 5:
          nWMX = nMargin;
          nWMY = rect.Height() - (nMargin + nWMHeight);
          break;
        //  smBottomCenter

        case 6:
          nWMX = (rect.Width() - nWMWidth) / 2;
          nWMY = rect.Height() - (nMargin + nWMHeight);
          break;
        //  smBottomRight

        case 7:
          nWMX = rect.Width() - (nWMWidth + nMargin);
          nWMY = rect.Height() - (nMargin + nWMHeight);
          break;
        // Centered

        case 8:
          nWMX = (rect.Width() - nWMWidth) / 2;
          nWMY = (rect.Height() - nWMHeight) / 2;
          break;
      }

      return new TRect(nWMX, nWMY, nWMX + strSize.cx, nWMY + strSize.cy);
    }
  }]);

  return Watermark;
}(HeaderFooter);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/color-picker/style/css.mjs + 1 modules
var color_picker_style_css = __webpack_require__(7891);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/checkbox-group/style/css.mjs + 1 modules
var checkbox_group_style_css = __webpack_require__(3734);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/checkbox-button/style/css.mjs + 1 modules
var checkbox_button_style_css = __webpack_require__(2319);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/color-picker/index.mjs + 9 modules
var color_picker = __webpack_require__(3229);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/FontPicker.vue?vue&type=template&id=3487514e
/* unplugin-vue-components disabled */


function FontPickervue_type_template_id_3487514e_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_el_option = components_select/* ElOption */.BT;

  var _component_el_select = components_select/* ElSelect */.km;

  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_select, {
    modelValue: $props.modelValue,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $props.modelValue = $event;
    }),
    filterable: "",
    placeholder: _ctx.$i18n('pdf_dialog_specify_font_style | Specify font style'),
    size: "mini"
  }, {
    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.fonts, function (font, index) {
        return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
          key: index,
          label: font,
          value: font,
          onClick: function onClick($event) {
            _this.$emit('update:modelValue', font);

            _ctx.selected = font;
          },
          style: (0,shared_esm_bundler/* normalizeStyle */.j5)({
            fontFamily: font
          })
        }, null, 8, ["label", "value", "onClick", "style"]);
      }), 128))];
    }),
    _: 1
  }, 8, ["modelValue", "placeholder"]);
}
;// CONCATENATED MODULE: ./src/components/FontPicker.vue?vue&type=template&id=3487514e
/* unplugin-vue-components disabled */
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(7327);
// EXTERNAL MODULE: ./node_modules/@element-plus/icons-vue/dist/es/arrow-down.mjs
var arrow_down = __webpack_require__(8647);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/FontPicker.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */


var fontsList = ["consolas", 'monospace', 'sans-serif', 'serif', "Arial", "Comic Sans", "Courier New", "Georgia", "Impact", "Palatino", "Tahoma", "Times New Roman", "Trebuchet", "Verdana"];
/* harmony default export */ const FontPickervue_type_script_lang_js = ({
  name: "FontPicker",
  props: ['modelValue'],
  emits: ['update:modelValue', 'change'],
  components: {
    ArrowDown: arrow_down/* default */.Z
  },
  data: function data() {
    return {
      fonts: []
    };
  },
  beforeMount: function beforeMount() {
    this.fonts = fontsList.filter(function (v) {
      return document.fonts.check("11px ".concat(v));
    }); //this.fonts = fontsList
  }
});
;// CONCATENATED MODULE: ./src/components/FontPicker.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */ 
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/FontPicker.vue?vue&type=style&index=0&id=3487514e&lang=css
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/FontPicker.vue?vue&type=style&index=0&id=3487514e&lang=css
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./src/components/FontPicker.vue
/* unplugin-vue-components disabled */



;


const FontPicker_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(FontPickervue_type_script_lang_js, [['render',FontPickervue_type_template_id_3487514e_render]])

/* harmony default export */ const FontPicker = (FontPicker_exports_);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWStyleDialog.vue?vue&type=template&id=04548b46&scoped=true
/* unplugin-vue-components disabled */












var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_withScopeId = function _withScopeId(n) {
  return (0,runtime_core_esm_bundler/* pushScopeId */.dD)("data-v-04548b46"), n = n(), (0,runtime_core_esm_bundler/* popScopeId */.Cn)(), n;
};

var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_1 = {
  "class": "flex_container"
};
var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_2 = {
  "class": "flex_item_left"
};

var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_3 = /*#__PURE__*/HFWStyleDialogvue_type_template_id_04548b46_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,runtime_core_esm_bundler/* createElementVNode */._)("i", null, "I", -1);
});

var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_4 = /*#__PURE__*/HFWStyleDialogvue_type_template_id_04548b46_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,runtime_core_esm_bundler/* createElementVNode */._)("b", null, "B", -1);
});

var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_5 = /*#__PURE__*/HFWStyleDialogvue_type_template_id_04548b46_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,runtime_core_esm_bundler/* createElementVNode */._)("u", null, "U", -1);
});

var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_6 = /*#__PURE__*/HFWStyleDialogvue_type_template_id_04548b46_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,runtime_core_esm_bundler/* createElementVNode */._)("s", null, "S", -1);
});

var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_7 = {
  style: {
    "padding-bottom": "5px"
  }
};
var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_8 = {
  "class": "flex_item_right"
};
var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_9 = {
  ref: "divCanvas",
  style: {
    "position": "relative"
  }
};
var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_10 = {
  style: {
    "position": "absolute",
    "right": "20px",
    "bottom": "20px",
    "height": "auto",
    "padding": "2px",
    "background": "#fff",
    "border": "0px"
  }
};
var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_11 = {
  ref: "mainCanvas"
};
var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_12 = ["title"];
var HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_13 = {
  "class": "dialog-footer"
};
function HFWStyleDialogvue_type_template_id_04548b46_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_col = col/* ElCol */.Dv;

  var _component_el_row = row/* ElRow */.dq;

  var _component_font_picker = FontPicker;

  var _component_el_input_number = input_number/* ElInputNumber */.d6;

  var _component_el_checkbox_button = components_checkbox/* ElCheckboxButton */.lm;

  var _component_el_checkbox_group = components_checkbox/* ElCheckboxGroup */.z5;

  var _component_el_color_picker = color_picker/* ElColorPicker */.$;

  var _component_el_option = components_select/* ElOption */.BT;

  var _component_el_select = components_select/* ElSelect */.km;

  var _component_el_button = components_button/* ElButton */.mi;

  var _component_el_dialog = dialog/* ElDialog */.d0;

  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_dialog, {
    modelValue: $props.visible,
    "onUpdate:modelValue": _cache[18] || (_cache[18] = function ($event) {
      return $props.visible = $event;
    }),
    title: $options.title,
    width: 1000,
    "before-close": $options.handleClose,
    "lock-scroll": false,
    "append-to-body": "",
    onOpened: $options.init,
    onOpen: $options.preinit
  }, {
    footer: (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_13, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        style: {
          "float": "left"
        },
        onClick: _cache[15] || (_cache[15] = function ($event) {
          return $options.defaultValues();
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_defaults | Restore to defaults')), 1)];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        type: "primary",
        onClick: _cache[16] || (_cache[16] = function ($event) {
          $props.visible = false;
          $options.closeDialog(true);
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('action_ok | OK')), 1)];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        onClick: _cache[17] || (_cache[17] = function ($event) {
          $props.visible = false;
          $options.closeDialog(false);
        })
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_cancel | Cancel')), 1)];
        }),
        _: 1
      })])];
    }),
    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_2, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        "class": "topic"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 24
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_text | Text')), 1)];
            }),
            _: 1
          })];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: $data.span1
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_font | Font') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset", "span"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 9
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_font_picker, {
                modelValue: $props.options.fontName,
                "onUpdate:modelValue": [_cache[0] || (_cache[0] = function ($event) {
                  return $props.options.fontName = $event;
                }), $options.changed]
              }, null, 8, ["modelValue", "onUpdate:modelValue"])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 7
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: _ctx.$i18n('pdf_dialog_size | Size'),
                modelValue: $props.options.fontSize,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
                  return $props.options.fontSize = $event;
                }),
                min: 0,
                "controls-position": "right",
                max: 9999,
                onChange: $options.changed
              }, null, 8, ["placeholder", "modelValue", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: $data.span1
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_style | Style') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset", "span"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 13
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox_group, {
                modelValue: $props.options.fontStyle,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                  return $props.options.fontStyle = $event;
                }),
                size: "mini",
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox_button, {
                    label: "I"
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_3];
                    }),
                    _: 1
                  }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox_button, {
                    label: "B"
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_4];
                    }),
                    _: 1
                  }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox_button, {
                    label: "U"
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_5];
                    }),
                    _: 1
                  }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_checkbox_button, {
                    label: "S"
                  }, {
                    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                      return [HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_6];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              }, 8, ["modelValue", "onChange"])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 3,
            align: "right"
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_7, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_color_picker, {
                modelValue: $props.options.fontColor,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                  return $props.options.fontColor = $event;
                }),
                predefine: $data.predefineColors,
                onChange: $options.changed,
                onActiveChange: _cache[4] || (_cache[4] = function ($event) {
                  $props.options.fontColor = $event;
                  $options.changed();
                }),
                "popper-class": "cpicker-selector",
                style: {
                  "margin-bottom": "5px"
                }
              }, null, 8, ["modelValue", "predefine", "onChange"])])];
            }),
            _: 1
          })];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: $data.span1
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_align | Align') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset", "span"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: $data.span2
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.textAlignment,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
                  return $props.options.textAlignment = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_option, {
                    key: "1",
                    label: _ctx.$i18n('pdf_dialog_left | Left'),
                    value: "left"
                  }, null, 8, ["label"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_option, {
                    key: "2",
                    label: _ctx.$i18n('pdf_dialog_center | Center'),
                    value: "center"
                  }, null, 8, ["label"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_option, {
                    key: "3",
                    label: _ctx.$i18n('pdf_dialog_right | Right'),
                    value: "right"
                  }, null, 8, ["label"])];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])];
            }),
            _: 1
          }, 8, ["span"])];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: $data.span1
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_bg_color | Background color') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset", "span"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: $data.span2
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_color_picker, {
                modelValue: $props.options.backgroundColor,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
                  return $props.options.backgroundColor = $event;
                }),
                predefine: $data.predefineColors,
                onChange: $options.changed,
                onActiveChange: _cache[7] || (_cache[7] = function ($event) {
                  $props.options.backgroundColor = $event;
                  $options.changed();
                })
              }, null, 8, ["modelValue", "predefine", "onChange"])];
            }),
            _: 1
          }, 8, ["span"])];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        "class": "topic"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 24
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_frame | Frame')), 1)];
            }),
            _: 1
          })];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: $data.span1
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_width | Width') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset", "span"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 8
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: _ctx.$i18n('pdf_dialog_width | Width'),
                modelValue: $props.options.frameWidth,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
                  return $props.options.frameWidth = $event;
                }),
                "controls-position": "right",
                min: 0,
                max: 999,
                onChange: $options.changed
              }, null, 8, ["placeholder", "modelValue", "onChange"])];
            }),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: 4
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_color | Color') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 2,
            align: "right"
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_color_picker, {
                modelValue: $props.options.frameColor,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = function ($event) {
                  return $props.options.frameColor = $event;
                }),
                predefine: $data.predefineColors,
                onChange: $options.changed,
                onActiveChange: _cache[10] || (_cache[10] = function ($event) {
                  $props.options.frameColor = $event;
                  $options.changed();
                }),
                "popper-class": "cpicker-selector"
              }, null, 8, ["modelValue", "predefine", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        "class": "topic"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 24
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_placement | Placement')), 1)];
            }),
            _: 1
          })];
        }),
        _: 1
      }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, {
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: 12
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_margin_pixels | Margin in pixels') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 10
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: _ctx.$i18n('pdf_dialog_margin | Margin'),
                modelValue: $props.options.margin,
                "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
                  return $props.options.margin = $event;
                }),
                min: 0,
                "controls-position": "right",
                max: 9999,
                onChange: $options.changed
              }, null, 8, ["placeholder", "modelValue", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      }), $props.mode == 'watermark' ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 0,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: 12
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_position | Position') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 10
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_select, {
                size: "mini",
                modelValue: $props.options.position,
                "onUpdate:modelValue": _cache[12] || (_cache[12] = function ($event) {
                  return $props.options.position = $event;
                }),
                placeholder: _ctx.$i18n('pdf_dialog_placeholder_select | Select'),
                onChange: $options.changed
              }, {
                "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
                  return [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)($data.vPositions, function (item, index) {
                    return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_option, {
                      key: index,
                      label: item,
                      value: index
                    }, null, 8, ["label", "value"]);
                  }), 128))];
                }),
                _: 1
              }, 8, ["modelValue", "placeholder", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), $props.mode == 'watermark' ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_row, {
        key: 1,
        align: "middle"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            offset: $data.offset,
            span: 12
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_opacity | Opacity') + ':'), 1)];
            }),
            _: 1
          }, 8, ["offset"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
            span: 10
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
              return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input_number, {
                size: "mini",
                placeholder: _ctx.$i18n('pdf_dialog_opacity | Opacity'),
                modelValue: $props.options.opacity,
                "onUpdate:modelValue": _cache[13] || (_cache[13] = function ($event) {
                  return $props.options.opacity = $event;
                }),
                "controls-position": "right",
                min: 0,
                max: 100,
                onChange: $options.changed
              }, null, 8, ["placeholder", "modelValue", "onChange"])];
            }),
            _: 1
          })];
        }),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_8, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_9, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_10, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        type: "primary",
        size: "small",
        title: _ctx.$i18n('pdf_dialog_configure_template | Configure template') + '...',
        onClick: $options.showHFWTemplate
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
          return [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(_ctx.$i18n('pdf_dialog_configure_template | Configure template') + '...'), 1)];
        }),
        _: 1
      }, 8, ["title", "onClick"])]), (0,runtime_core_esm_bundler/* createElementVNode */._)("canvas", HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_11, null, 512), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        style: (0,shared_esm_bundler/* normalizeStyle */.j5)([{
          "position": "absolute",
          "background-color": "transparent",
          "cursor": "pointer",
          "border": "0px"
        }, $data.overlayStyle]),
        onClick: _cache[14] || (_cache[14] = function () {
          return $options.showHFWTemplate && $options.showHFWTemplate.apply($options, arguments);
        }),
        title: _ctx.$i18n('pdf_dialog_click_to_configure_template | Click to configure template') + '...'
      }, null, 12, HFWStyleDialogvue_type_template_id_04548b46_scoped_true_hoisted_12)], 512)])])];
    }),
    _: 1
  }, 8, ["modelValue", "title", "before-close", "onOpened", "onOpen"]);
}
;// CONCATENATED MODULE: ./src/components/HFWStyleDialog.vue?vue&type=template&id=04548b46&scoped=true
/* unplugin-vue-components disabled */
// EXTERNAL MODULE: ./node_modules/@element-plus/icons-vue/dist/es/tools.mjs
var tools = __webpack_require__(5157);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWStyleDialog.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */








var ownProperties = ["fontName", "fontSize", "fontStyle", "fontColor", "textAlignment", "backgroundColor", "frameWidth", "frameColor", "opacity", "margin", "position"];
var drawCanvasTimeout;
var isSafari = false; // Эта переменная проинитится ниже

/* harmony default export */ const HFWStyleDialogvue_type_script_lang_js = ({
  name: "HFWStyleDialog",
  data: function data() {
    return {
      resizeObserver: null,
      div: null,
      canvas: null,
      offset: 2,
      span1: 6,
      span2: 16,
      initInterval: undefined,
      overlayStyle: {
        width: "10px",
        height: "10px",
        left: "10px",
        top: "10px"
      },
      vPositions: [this.$i18n("pdf_dialog_top_left | Top Left"), this.$i18n("pdf_dialog_top_center | Top Center"), this.$i18n("pdf_dialog_top_right | Top Right"), this.$i18n("pdf_dialog_middle_left | Middle Left"), this.$i18n("pdf_dialog_middle_right | Middle Right"), this.$i18n("pdf_dialog_bottom_left | Bottom Left"), this.$i18n("pdf_dialog_bottom_center | Bottom Center"), this.$i18n("pdf_dialog_bottom_right | Bottom Right"), this.$i18n("pdf_dialog_centered | Centered")],
      predefineColors: ["#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#1e90ff", "#c71585", "#000", "#666", "#bbb", "#fff"]
    };
  },
  components: {
    FontPicker: FontPicker,
    Tools: tools/* default */.Z
  },
  props: {
    visible: Boolean,
    mode: String,
    options: HFWSettings,
    templateVars: HFWVars
  },
  emits: ["saveConfig", "showHFWTemplate"],
  watch: {
    options: function options() {
      this.changed();
    }
  },
  computed: {
    title: function title() {
      switch (this.mode) {
        case "header":
          return this.$i18n("pdf_dialog_setup_hs | Setup Header Style");
          break;

        case "footer":
          return this.$i18n("pdf_dialog_setup_fs | Setup Footer Style");
          break;

        case "watermark":
          return this.$i18n("pdf_dialog_setup_ws | Setup Watermark Style");
          break;
      }
    }
  },
  methods: {
    preinit: function preinit() {
      var _this = this;

      this.initInterval = setInterval(function () {
        _this.init();
      }, 100);
    },
    init: function init() {
      if (!this.$refs.divCanvas) return;else clearInterval(this.initInterval);
      this.div = this.$refs.divCanvas;
      this.canvas = this.$refs.mainCanvas;
      this.canvas.style.display = "block";
      this.resizeObserver = new ResizeObserver(this.canvasResized);
      this.resizeObserver.observe(this.div); // Чтобы при отрисовке при появлении диалога не мерцало

      setTimeout(function () {
        isSafari = /apple/i.test(navigator.vendor);
      }, 500);
    },
    defaultValues: function defaultValues() {
      var _this2 = this;

      var t = new HFWSettings(this.mode);
      ownProperties.forEach(function (element) {
        _this2.options[element] = t[element];
      });
      this.changed();
    },
    closeDialog: function closeDialog(save) {
      var _this3 = this;

      isSafari = false;
      this.resizeObserver.disconnect();

      if (save) {
        var t = {};
        ownProperties.forEach(function (element) {
          t[element] = _this3.options[element];
        });
        this.$emit("saveConfig", {
          mode: this.mode,
          config: t
        });
      }
    },
    showHFWTemplate: function showHFWTemplate() {
      this.$emit("showHFWTemplate", this.mode);
    },
    handleClose: function handleClose(done) {
      if (!document.querySelector("div.cpicker-selector[aria-hidden='false']")) done();
    },
    changed: function changed() {
      this.drawCanvas();
    },
    canvasResized: function canvasResized() {
      this.canvas.width = this.div.clientWidth - 20;
      this.canvas.height = this.div.clientHeight - 20;
      this.drawCanvas();
    },
    // Для Сафари отрисовка делается через тайм-аут, иначе подвисает при частых вызовах
    drawCanvas: function drawCanvas() {
      var _this4 = this;

      var drawFn = function drawFn() {
        var canvas = _this4.$refs.mainCanvas;
        if (!canvas) return;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        GraphUtils.dashRect(ctx, 0, 0, canvas.width, canvas.height, 8);
        var className = _this4.mode === "watermark" ? Watermark : HeaderFooter;
        var HFWElement = new className(_this4.options, _this4.templateVars);
        var zoom = window.devicePixelRatio;
        var tempCanvas = HFWElement.getCanvas(new TSize(canvas.width * zoom - 50, 0));
        var tempCanvasResized = GraphUtils.createCanvas(tempCanvas.width / zoom, tempCanvas.height / zoom);
        var tempCtxResized = tempCanvasResized.getContext("2d");
        tempCtxResized.drawImage(tempCanvas, 0, 0, tempCanvasResized.width, tempCanvasResized.height);
        ctx.globalAlpha = 1 - _this4.options.opacity / 100;
        var x, y;

        if (_this4.mode === "watermark") {
          var r = HFWElement.getRect(new TSize(canvas.width * zoom, canvas.height * zoom));
          x = r.Left / zoom;
          y = r.Top / zoom;
        } else {
          x = (canvas.width - tempCanvasResized.width) / 2;
          y = (canvas.height - tempCanvasResized.height) / 2;
        }

        ctx.drawImage(tempCanvasResized, Math.round(x), Math.round(y));
        ctx.globalAlpha = 1;
        _this4.overlayStyle = {
          left: "".concat(x + 10, "px"),
          top: "".concat(y + 10, "px"),
          width: "".concat(tempCanvasResized.width, "px"),
          height: "".concat(tempCanvasResized.height, "px")
        };
      };

      if (isSafari) {
        clearTimeout(drawCanvasTimeout);
        drawCanvasTimeout = setTimeout(drawFn, 15);
      } else drawFn();
    }
  }
});
;// CONCATENATED MODULE: ./src/components/HFWStyleDialog.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */ 
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWStyleDialog.vue?vue&type=style&index=0&id=04548b46&lang=scss&scoped=true
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/HFWStyleDialog.vue?vue&type=style&index=0&id=04548b46&lang=scss&scoped=true
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWStyleDialog.vue?vue&type=style&index=1&id=04548b46&scoped=true&lang=css
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/HFWStyleDialog.vue?vue&type=style&index=1&id=04548b46&scoped=true&lang=css
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWStyleDialog.vue?vue&type=style&index=2&id=04548b46&lang=css
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/HFWStyleDialog.vue?vue&type=style&index=2&id=04548b46&lang=css
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./src/components/HFWStyleDialog.vue
/* unplugin-vue-components disabled */



;




const HFWStyleDialog_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(HFWStyleDialogvue_type_script_lang_js, [['render',HFWStyleDialogvue_type_template_id_04548b46_scoped_true_render],['__scopeId',"data-v-04548b46"]])

/* harmony default export */ const HFWStyleDialog = (HFWStyleDialog_exports_);
// EXTERNAL MODULE: ./node_modules/@element-plus/icons-vue/dist/es/operation.mjs
var es_operation = __webpack_require__(3230);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWSettingsDialog.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */





var HFWSettingsDialogvue_type_script_lang_js_ownProperties = ["template"];
/* harmony default export */ const HFWSettingsDialogvue_type_script_lang_js = ({
  name: "HFWSettingsDialog",
  components: {
    HFWStyleDialog: HFWStyleDialog,
    Operation: es_operation/* default */.Z
  },
  data: function data() {
    return {
      wildcards: [[["%y", this.$i18n("options_label_template_year | Year")], ["%m", this.$i18n("options_label_template_month | Month") + " (1-12)"], ["%d", this.$i18n("options_label_template_day | Day") + " (1 - 31)"]], [["%H", this.$i18n("options_label_template_hour | Hours")], ["%M", this.$i18n("options_label_template_minutes | Minutes")], ["%S", this.$i18n("options_label_template_seconds | Seconds")]], [["%B", this.$i18n("pdf_dialog_month_name | Month name")], ["%A", this.$i18n("pdf_dialog_weekday | Weekday")]], [["%w", this.$i18n("pdf_dialog_screenshot_width | screenshot Width")], ["%h", this.$i18n("pdf_dialog_screenshot_height | screenshot Height")], ["%e", this.$i18n("options_label_template_website | Domain name")]], [["%u", this.$i18n("options_label_template_url | Page URL")], ["%t", this.$i18n("options_label_template_title | Page Title")], ["%p", this.$i18n("pdf_dialog_page_number | PDF Page number")]]],
      offset: 1,
      controls: (0,objectSpread2/* default */.Z)({}, this.options)
    };
  },
  props: {
    visible: Boolean,
    mode: String,
    options: HFWSettings
  },
  emits: ["saveConfig"],
  watch: {// options: function (val) {
    //     this.controls = {...val};
    // },
    // visible: function (val) {
    //     console.log("watch" + val);
    //     if (val) debugger;
    // }
  },
  computed: {
    title: function title() {
      switch (this.mode) {
        case "header":
          return this.$i18n("pdf_dialog_setup_header_template | Setup Header template");
          break;

        case "footer":
          return this.$i18n("pdf_dialog_setup_footer_template | Setup Footer template");
          break;

        case "watermark":
          return this.$i18n("pdf_dialog_setup_watermark_template | Setup Watermark template");
          break;
      }
    },
    operation: function operation() {
      return es_operation/* default */.Z;
    }
  },
  methods: {
    init: function init() {},
    defaultValues: function defaultValues() {
      var _this = this;

      var t = new HFWSettings(this.mode);
      HFWSettingsDialogvue_type_script_lang_js_ownProperties.forEach(function (element) {
        _this.options[element] = t[element];
      });
      this.changed();
    },
    closeDialog: function closeDialog(save) {
      var _this2 = this;

      if (save) {
        var t = {};
        HFWSettingsDialogvue_type_script_lang_js_ownProperties.forEach(function (element) {
          t[element] = _this2.options[element];
        });
        this.$emit("saveConfig", {
          mode: this.mode,
          config: t
        });
      }
    },
    changed: function changed() {},
    addWildcard: function addWildcard(wc) {
      this.options.template += wc;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/HFWSettingsDialog.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */ 
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWSettingsDialog.vue?vue&type=style&index=0&id=43c0176c&lang=scss&scoped=true
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/HFWSettingsDialog.vue?vue&type=style&index=0&id=43c0176c&lang=scss&scoped=true
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HFWSettingsDialog.vue?vue&type=style&index=1&id=43c0176c&lang=css
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/HFWSettingsDialog.vue?vue&type=style&index=1&id=43c0176c&lang=css
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./src/components/HFWSettingsDialog.vue
/* unplugin-vue-components disabled */



;



const HFWSettingsDialog_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(HFWSettingsDialogvue_type_script_lang_js, [['render',HFWSettingsDialogvue_type_template_id_43c0176c_scoped_true_render],['__scopeId',"data-v-43c0176c"]])

/* harmony default export */ const HFWSettingsDialog = (HFWSettingsDialog_exports_);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=template&id=5e04d224
/* unplugin-vue-components disabled */




var Appvue_type_template_id_5e04d224_hoisted_1 = /*#__PURE__*/(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("Setup header style");

var Appvue_type_template_id_5e04d224_hoisted_2 = {
  key: 0
};
function Appvue_type_template_id_5e04d224_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_h_f_w_style_dialog = HFWStyleDialog;

  var _component_h_f_w_settings_dialog = HFWSettingsDialog;

  var _component_p_d_f_settings_dialog = PDFSettingsDialog;

  var _component_progress_element = (0,runtime_core_esm_bundler/* resolveComponent */.up)("progress-element");

  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_h_f_w_style_dialog, {
    visible: $data.HFWStyleDlgVisible,
    mode: $data.HFWMode,
    options: $data.HFWSettings,
    "template-vars": $options.PDFDialog.templateVars,
    onClose: _cache[0] || (_cache[0] = function ($event) {
      return $data.HFWStyleDlgVisible = false;
    }),
    onSaveConfig: $options.saveHFWSettingsEvent,
    onShowHFWTemplate: $options.showHFWDialog
  }, null, 8, ["visible", "mode", "options", "template-vars", "onSaveConfig", "onShowHFWTemplate"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_h_f_w_settings_dialog, {
    visible: $data.HFWSettingsDlgVisible,
    mode: $data.HFWMode,
    options: $data.HFWTemplate,
    onClose: _cache[1] || (_cache[1] = function ($event) {
      return $data.HFWSettingsDlgVisible = false;
    }),
    onSaveConfig: $options.saveHFWSettingsEvent
  }, null, 8, ["visible", "mode", "options", "onSaveConfig"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_p_d_f_settings_dialog, {
    visible: $options.PDFDialog.visible,
    options: $data.PDFSettings,
    onDialogResult: $options.PDFSettingsResultEvent,
    onShowHFWStyle: $options.showHFWStyleDialog
  }, {
    header: (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [Appvue_type_template_id_5e04d224_hoisted_1];
    }),
    _: 1
  }, 8, ["visible", "options", "onDialogResult", "onShowHFWStyle"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_progress_element, {
    visible: $options.ProgressBar.visible,
    percentage: $options.ProgressBar.percentage
  }, null, 8, ["visible", "percentage"]), $options.isDebug ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", Appvue_type_template_id_5e04d224_hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */._)("button", {
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.showPDFDialog && $options.showPDFDialog.apply($options, arguments);
    }),
    "class": "btn btn-default"
  }, "Test PDF Dlg"), (0,runtime_core_esm_bundler/* createElementVNode */._)("button", {
    onClick: _cache[3] || (_cache[3] = function () {
      return _ctx.showProgress && _ctx.showProgress.apply(_ctx, arguments);
    }),
    "class": "btn btn-default"
  }, "Progress`")])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)], 64);
}
;// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=5e04d224
/* unplugin-vue-components disabled */
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/notification/index.mjs + 3 modules
var notification = __webpack_require__(9996);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/notification/style/css.mjs + 1 modules
var notification_style_css = __webpack_require__(9029);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/progress/style/css.mjs + 1 modules
var progress_style_css = __webpack_require__(6160);
// EXTERNAL MODULE: ./node_modules/element-plus/es/components/progress/index.mjs + 2 modules
var progress = __webpack_require__(2018);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Progress.vue?vue&type=template&id=1be332a4
/* unplugin-vue-components disabled */


var Progressvue_type_template_id_1be332a4_hoisted_1 = {
  id: "progress"
};
var Progressvue_type_template_id_1be332a4_hoisted_2 = {
  "class": "percentage-value"
};

var Progressvue_type_template_id_1be332a4_hoisted_3 = /*#__PURE__*/(0,runtime_core_esm_bundler/* createElementVNode */._)("span", {
  "class": "percentage-label"
}, "Creating PDF", -1);

function Progressvue_type_template_id_1be332a4_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_el_progress = progress/* ElProgress */.Xh;

  var _component_el_dialog = dialog/* ElDialog */.d0;

  return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", Progressvue_type_template_id_1be332a4_hoisted_1, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_dialog, {
    "show-close": false,
    modelValue: $props.visible,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $props.visible = $event;
    }),
    "close-on-click-modal": false,
    "close-on-press-escape": false,
    "lock-scroll": false,
    modal: false,
    onClose: $options.progressClosed
  }, {
    "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function () {
      return [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_progress, {
        type: "circle",
        "stroke-width": 5,
        percentage: $props.percentage
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.w5)(function (_ref) {
          var percentage = _ref.percentage;
          return [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", Progressvue_type_template_id_1be332a4_hoisted_2, (0,shared_esm_bundler/* toDisplayString */.zw)(percentage) + "%", 1), Progressvue_type_template_id_1be332a4_hoisted_3];
        }),
        _: 1
      }, 8, ["percentage"])];
    }),
    _: 1
  }, 8, ["modelValue", "onClose"])]);
}
;// CONCATENATED MODULE: ./src/components/Progress.vue?vue&type=template&id=1be332a4
/* unplugin-vue-components disabled */
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(9653);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Progress.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */
/* harmony default export */ const Progressvue_type_script_lang_js = ({
  name: "ProgressElement",
  components: {},
  data: function data() {
    return {};
  },
  props: {
    visible: Boolean,
    percentage: Number
  },
  methods: {
    progressClosed: function progressClosed() {//console.log("closed");
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Progress.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */ 
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Progress.vue?vue&type=style&index=0&id=1be332a4&lang=scss
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/Progress.vue?vue&type=style&index=0&id=1be332a4&lang=scss
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./src/components/Progress.vue
/* unplugin-vue-components disabled */



;


const Progress_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Progressvue_type_script_lang_js, [['render',Progressvue_type_template_id_1be332a4_render]])

/* harmony default export */ const Progress = (Progress_exports_);
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */






/* harmony default export */ const Appvue_type_script_lang_js = ({
  name: "App",
  inject: ["PDFDialog", "ProgressBar"],
  data: function data() {
    return {
      HFWMode: "header",
      HFWSettings: null,
      HFWTemplate: null,
      HFWSettingsDlgVisible: false,
      HFWStyleDlgVisible: false,
      PDFSettings: null
    };
  },
  beforeMount: function beforeMount() {
    /*this.HFWSettings = new HFWSettings(
        this.HFWMode,
        PDFDialog.preferences.getOption(this.HFWMode)
    );
     this.PDFSettings = new PDFSettings(
        PDFDialog.preferences.getOption("pdfSettings")
    );*/
  },
  components: {
    HFWStyleDialog: HFWStyleDialog,
    PDFSettingsDialog: PDFSettingsDialog,
    HFWSettingsDialog: HFWSettingsDialog,
    ProgressElement: Progress
  },
  computed: {
    isDialogVisible: function isDialogVisible() {
      return this.PDFDialog.visible;
    },
    isProgressBarVisible: function isProgressBarVisible() {
      return this.ProgressBar.visible;
    },
    isDebug: function isDebug() {
      return false; //    return !('extensionId' in window);
    }
  },
  watch: {
    isDialogVisible: function isDialogVisible(val) {
      if (val) {
        this.showPDFDialog();
      }
    }
  },
  methods: {
    showHFWDialog: function showHFWDialog(mode) {
      this.HFWMode = mode;
      this.HFWTemplate = new HFWSettings(this.HFWMode, PDFDialog.preferences.getOption(this.HFWMode));
      this.HFWSettingsDlgVisible = true;
    },
    showHFWStyleDialog: function showHFWStyleDialog(mode) {
      this.HFWMode = mode;
      this.HFWSettings = new HFWSettings(this.HFWMode, PDFDialog.preferences.getOption(this.HFWMode));
      this.HFWStyleDlgVisible = true;
    },
    saveHFWSettingsEvent: function saveHFWSettingsEvent(data) {
      var _this = this;

      // Склеиваем данные
      var t = Object.assign(new HFWSettings(this.HFWMode, PDFDialog.preferences.getOption(this.HFWMode)), data.config);
      var newHFWSettings = Object.assign(new HFWSettings(), this.HFWSettings, data.config); // for (const key in data.config) {
      //     if (Object.hasOwnProperty.call(data.config, key)) {
      //         t[key] = data.config[key];
      //         newHFWSettings[key] = data.config[key];
      //     }
      // }

      setTimeout(function () {
        _this.HFWSettings = newHFWSettings;
      }, 100); // Присваивается только через тайм-аут, иначе диалог не закрывается почему-то

      PDFDialog.preferences.setOption(data.mode, t.serialize());
    },
    showPDFDialog: function showPDFDialog() {
      this.PDFSettings = new PDFSettings(PDFDialog.preferences.getOption("pdfSettings" + (this.PDFDialog.multipage ? "Multi" : "")));
      this.PDFDialog.visible = true;
    },
    PDFSettingsResultEvent: function PDFSettingsResultEvent(data) {
      this.PDFDialog.visible = false;
      if (data) PDFDialog.preferences.setOption("pdfSettings" + (this.PDFDialog.multipage ? "Multi" : ""), data.config.serialize());
      this.PDFDialog.callback(data !== undefined);
    },
    showNotification: function showNotification() {
      // <el-button plain @click="open1"> Top Right </el-button>
      (0,notification/* ElNotification */.bM)({
        title: "Custom Position",
        message: h("el-button", {
          style: "color: teal",
          plain: ""
        }, "This is a reminder"),
        duration: 0
      });
    }
  }
});
;// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js
/* unplugin-vue-components disabled */ 
;// CONCATENATED MODULE: ./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[38].use[0]!./node_modules/unplugin/dist/webpack/loaders/transform.js??ruleSet[1].rules[39].use[0]!./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=style&index=0&id=5e04d224&lang=css
/* unplugin-vue-components disabled */// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/App.vue?vue&type=style&index=0&id=5e04d224&lang=css
/* unplugin-vue-components disabled */
;// CONCATENATED MODULE: ./src/App.vue
/* unplugin-vue-components disabled */



;


const App_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Appvue_type_script_lang_js, [['render',Appvue_type_template_id_5e04d224_render]])

/* harmony default export */ const App = (App_exports_);
;// CONCATENATED MODULE: ./src/main.ts









 //import i18n from "vue-plugin-webextension-i18n";
//import { Vue } from 'vue-class-component';
// Эта переменная позволяет управлять состоянием приложения VUE извне

var main_PDFDialog = (0,reactivity_esm_bundler/* reactive */.qj)({
  callback: function callback(value) {},
  show: function show(multipage) {
    var _this = this;

    return new Promise(function (resolve) {
      _this.multipage = multipage;
      _this.visible = true;
      _this.callback = resolve;
    });
  },
  visible: false,
  multipage: true,
  templateVars: new HFWVars(),
  preferences: null
});
var ProgressBar = (0,reactivity_esm_bundler/* reactive */.qj)({
  visible: false,
  percentage: 0
});

function init() {
  var app = (0,runtime_dom_esm_bundler/* createApp */.ri)(App); // Инициализируем глобальную переменную i18n
  // Запрос на локализацию приходит в виде строки "localization-variable | комментарий"

  app.config.globalProperties.$i18n = function (item) {
    return chrome.i18n.getMessage(item.split(" | ")[0]);
  };

  app.provide('PDFDialog', main_PDFDialog).provide('ProgressBar', ProgressBar).mount('#app');
  /*if (!('extensionId' in window)) {
      PDFDialog.show(true).then(result => {console.log(result)});
      PDFDialog.templateVars = new HFWVars("123", "456", new Date(), new TSize(500, 500));
      setTimeout(() => {PDFDialog.templateVars = new HFWVars("789", "101112", new Date(), new TSize(500, 500));}, 2000);
  }*/

  window.PDFDialog = main_PDFDialog;
  window.ProgressBar = ProgressBar;
} // Если определён промис, то это локальная реализация для тестирования в режиме дебага
// Если промиса нет, то это работа из расширения


if (typeof fsi18nReadyPromise !== "undefined") fsi18nReadyPromise.then(function () {
  return init();
});else init();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			826: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktest_js"] = self["webpackChunktest_js"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [998], () => (__webpack_require__(14)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="873bd380-549d-5d95-b8ce-8efcec83df1c")}catch(e){}}();
//# debugId=873bd380-549d-5d95-b8ce-8efcec83df1c
