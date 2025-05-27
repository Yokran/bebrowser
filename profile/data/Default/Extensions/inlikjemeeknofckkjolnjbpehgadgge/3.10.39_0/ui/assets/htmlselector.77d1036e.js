import { s as serviceProxy, _ as __vitePreload } from "./service.04a32097.js";
import * as Sentry from "../../../../../ui/lib/sentry.min.js";
import { L as LSStore } from "./store-localstorage.f2df8c73.js";
Sentry.init({
  ...{ "dsn": "https://f856fd5cf4414e769b67a18668c3f233@o985892.ingest.sentry.io/5946006", "tracesSampleRate": 0.01, "environment": "ext", "release": '"3.10.39"', "ignoreErrors": ["ResizeObserver loop completed with undelivered notifications.", "ResizeObserver loop limit exceeded", "CreateHTMLCallback", "TemplateResult.getTemplateElement", "InvalidStateError: A mutation operation was attempted on a database that did not allow mutations."] },
  release: "3.10.39",
  beforeSend(event, hint) {
    var _a, _b, _c, _d;
    if (((_a = hint == null ? void 0 : hint.originalException) == null ? void 0 : _a.status) === 401) {
      if (((_d = (_c = (_b = event == null ? void 0 : event.exception) == null ? void 0 : _b.values) == null ? void 0 : _c[0]) == null ? void 0 : _d.type) === "UnhandledRejection") {
        return null;
      }
    }
    return event;
  },
  ignoreErrors: [
    "ResizeObserver loop completed with undelivered notifications.",
    "ResizeObserver loop limit exceeded",
    "CreateHTMLCallback"
  ]
});
(async () => {
  await serviceProxy.init();
  const App = (await __vitePreload(() => import("./AppHTMLSelector.fa829ad3.js"), true ? ["assets/AppHTMLSelector.fa829ad3.js","assets/AppHTMLSelector.80408e6a.css","assets/index.21aef151.js","assets/json-parser.7cb2f04e.js","assets/json-parser.f1628d7e.css","assets/service.04a32097.js","assets/SchemaKeyTree.96209fd8.js","assets/SchemaKeyTree.9a96e0c5.css","assets/store-localstorage.f2df8c73.js","assets/store.9300a34a.js"] : void 0)).default;
  const app = new App({
    target: document.body
  });
  app.store = new LSStore();
  window.App = app;
})();
