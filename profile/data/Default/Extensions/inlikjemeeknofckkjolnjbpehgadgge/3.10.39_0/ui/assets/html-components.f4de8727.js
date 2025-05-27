import { t as types, d as ChangeType } from "./AppLocal.d8abe63b.js";
import "./index.21aef151.js";
import "./json-parser.7cb2f04e.js";
import "./service.04a32097.js";
import "./Message.fcbba7db.js";
import "./SchemaKeyTree.96209fd8.js";
import "./Card.0607fce4.js";
const renderNodeChildren = (node, options) => {
  return '<ul style="padding-left:8px">' + node.getChildren().map(
    (child) => `<li style="margin-left:15px"> ${treeNode(child, options)} </li>`
  ).join("") + "</ul>";
};
function treeNode(node, options = {}) {
  const getLabelClassName = () => {
    if (node.label !== void 0 && node.changeType === ChangeType.ADDED) {
      return "diffMark inserted";
    }
    if (node.label !== void 0 && node.changeType === ChangeType.DELETED) {
      return "diffMark removed";
    }
    return "";
  };
  const renderLabel = () => {
    var _a;
    if (node.label === void 0 || types.ARRAY === ((_a = node.parent) == null ? void 0 : _a.type) && node.type !== types.OBJECT) {
      return "";
    }
    return `
      <div>
        <span style="font-weight:bold" class="${getLabelClassName()}"> 
          ${node.label}
        </span>
      </div>
    `;
  };
  const getOldValue = () => {
    if (node.isLeaf() && node.changeType === ChangeType.VALUE_CHANGED && node.oldValue !== void 0)
      return `<span class="diffMark removed">${node.getPrettyOldValue({
        trim: true
      })}</span>`;
    return "";
  };
  const getNewValue = () => {
    if (node.value === void 0)
      return "";
    let className = "";
    if (node.isLeaf()) {
      if (node.changeType === ChangeType.ADDED || node.changeType === ChangeType.VALUE_CHANGED) {
        className = "diffMark inserted";
      }
      if (node.isLeaf() && node.changeType === ChangeType.DELETED) {
        className = "diffMark removed";
      }
    }
    return `<span class="${className}">${node.getPrettyValue({
      trim: true
    })}</span>`;
  };
  return `

        ${renderLabel()}
     
        <div>
          ${node.isLeaf() ? getOldValue() + getNewValue() : renderNodeChildren(node, options)}
        </div>
  `;
}
function intoTree(root, options = {}) {
  return renderNodeChildren(root, options);
}
function body(content, id = "") {
  return `<body id="${id}" style="background:white">${content}</body>`;
}
function style(content) {
  return `<style>${content}</style>`;
}
function main(content, opts = {}) {
  let { classes = "" } = opts;
  return `<div class="${classes}">${content}</div>`;
}
function div(content, style2 = "", id = "") {
  return `<div id="${id}" style="${style2}">${content}</div>`;
}
export { body, div, intoTree, main, style, treeNode };
