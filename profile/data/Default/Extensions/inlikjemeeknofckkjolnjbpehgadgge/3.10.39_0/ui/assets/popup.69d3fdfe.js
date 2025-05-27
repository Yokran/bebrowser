import { s as serviceProxy, _ as __vitePreload } from "./service.04a32097.js";
import * as Sentry from "../../../../../ui/lib/sentry.min.js";
import { L as LSStore } from "./store-localstorage.f2df8c73.js";
Sentry.init({
  ...{ "dsn": "https://f856fd5cf4414e769b67a18668c3f233@o985892.ingest.sentry.io/5946006", "tracesSampleRate": 0.01, "environment": "ext", "release": '"3.10.39"', "ignoreErrors": ["ResizeObserver loop completed with undelivered notifications.", "ResizeObserver loop limit exceeded", "CreateHTMLCallback", "TemplateResult.getTemplateElement", "InvalidStateError: A mutation operation was attempted on a database that did not allow mutations."] },
  beforeSend(event, hint) {
    var _a, _b, _c, _d;
    if (((_a = hint == null ? void 0 : hint.originalException) == null ? void 0 : _a.status) === 401) {
      if (((_d = (_c = (_b = event == null ? void 0 : event.exception) == null ? void 0 : _b.values) == null ? void 0 : _c[0]) == null ? void 0 : _d.type) === "UnhandledRejection") {
        return null;
      }
    }
    return event;
  }
});
(async () => {
  try {
    await serviceProxy.init();
    const store = new LSStore();
    const App = (await __vitePreload(() => import("./AppPopup.dfb25574.js"), true ? ["assets/AppPopup.dfb25574.js","assets/AppPopup.32c5b2aa.css","assets/index.21aef151.js","assets/json-parser.7cb2f04e.js","assets/json-parser.f1628d7e.css","assets/service.04a32097.js","assets/Message.fcbba7db.js","assets/store.9300a34a.js"] : void 0)).default;
    const app = new App({
      target: document.body
    });
    app.store = store;
    window.App = app;
  } catch (err) {
    Sentry.captureException(err);
    const card = (await __vitePreload(() => import("./ErrorWithStack.32071ee9.js"), true ? ["assets/ErrorWithStack.32071ee9.js","assets/ErrorWithStack.b51a689d.css","assets/index.21aef151.js","assets/Card.0607fce4.js"] : void 0)).default;
    new card({
      target: document.body,
      props: {
        title: "Error initializing popup",
        error: err
      }
    });
  }
})();
