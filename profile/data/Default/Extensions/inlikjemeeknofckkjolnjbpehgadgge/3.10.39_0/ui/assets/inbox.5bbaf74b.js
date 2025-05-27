import { s as serviceProxy, _ as __vitePreload } from "./service.04a32097.js";
import * as Sentry from "../../../../../ui/lib/sentry.min.js";
var jquery_atwho = "";
if ({ "dsn": "https://f856fd5cf4414e769b67a18668c3f233@o985892.ingest.sentry.io/5946006", "tracesSampleRate": 0.01, "environment": "ext", "release": '"3.10.39"', "ignoreErrors": ["ResizeObserver loop completed with undelivered notifications.", "ResizeObserver loop limit exceeded", "CreateHTMLCallback", "TemplateResult.getTemplateElement", "InvalidStateError: A mutation operation was attempted on a database that did not allow mutations."] }) {
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
}
(async () => {
  try {
    await serviceProxy.init();
    const CookieStore = (await __vitePreload(() => import("./store-cookie.cf48c6ed.js"), true ? [] : void 0)).default;
    const Store = serviceProxy.store.SimpleStore;
    const App = (await __vitePreload(() => import("./AppLocal.d8abe63b.js").then(function(n) {
      return n.A;
    }), true ? ["assets/AppLocal.d8abe63b.js","assets/AppLocal.81350a2b.css","assets/index.21aef151.js","assets/json-parser.7cb2f04e.js","assets/json-parser.f1628d7e.css","assets/service.04a32097.js","assets/Message.fcbba7db.js","assets/SchemaKeyTree.96209fd8.js","assets/SchemaKeyTree.9a96e0c5.css","assets/Card.0607fce4.js"] : void 0)).default;
    const cookieStore = new CookieStore();
    const store = new Store("ui:store");
    await store.__init__();
    let storeValues = cookieStore.getAll();
    storeValues.forEach((item) => {
      store.set(item.key, item.value);
      cookieStore.del(item.key);
    });
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
        title: "Error initializing extension",
        error: err
      }
    });
  }
})();
