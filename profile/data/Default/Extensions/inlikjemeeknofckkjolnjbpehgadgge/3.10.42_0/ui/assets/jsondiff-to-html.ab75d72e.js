import { _ as __vitePreload } from "./service.04a32097.js";
import "./index-default.0d44a930.js";
import { intoTree, body, div, main } from "./html-components.5825f149.js";
import { a as setJSONDiffStyle } from "./utils.fb792079.js";
import "./AppLocal.2fbeb786.js";
import "./index.21aef151.js";
import "./json-parser.f519fd70.js";
import "./Message.d6d97d2b.js";
import "./SchemaKeyTree.c700e647.js";
import "./Card.0607fce4.js";
async function diffNodeToHTML(root, options = {}) {
  let { inlineCss = true, highlighted = true } = options;
  let html = intoTree(root, options);
  if (inlineCss) {
    const cheerio = await __vitePreload(() => import("./index.2db26bd4.js"), true ? ["assets/index.2db26bd4.js","assets/load-parse.47abd3e8.js","assets/index.821ff0ec.js"] : void 0);
    let $1 = cheerio.load(html);
    setJSONDiffStyle($1);
    html = $1.html();
  }
  return html;
}
function generateHtml(root, opts = {}) {
  let { wrapBody = true, classes = "", showArrayIndex = true } = opts;
  let options = { maxDepth: root.maxDepth, showArrayIndex };
  let html = intoTree(root, options);
  html = main(html, { classes });
  return wrapBody ? body(html) : html;
}
function getSplitView(view1, view2) {
  return body(
    div(view1, "display:inline-block;width:45%;vertical-align:top;", "v1") + div(view2, "display:inline-block;border-left:1px solid #9f9999;width:45%;margin-left:1rem;vertical-align:top;", "v2"),
    "highlighted-split"
  );
}
export { diffNodeToHTML, generateHtml, getSplitView };
