import { s as base, ac as initStores, b2 as setValue, A as Api, b as Msg } from "./json-parser.f519fd70.js";
import { ae as get_store_value } from "./index.21aef151.js";
const DatasourceModel = base.Model.extend({
  urlRoot: `/datasources/`,
  setInvalid() {
    this.set("invalid", true);
  },
  parse(datasource, options) {
    const jsonStore = initStores(["."]);
    datasource["executingTestRun"] = false;
    datasource["testRunResult"] = false;
    datasource["invalid"] = false;
    datasource["visited"] = false;
    datasource["jsonStore"] = jsonStore;
    if (Object.keys(datasource.schema).length !== 0) {
      setValue(datasource.schema, "value", "");
    }
    return datasource;
  },
  filters() {
    return get_store_value(this.get("jsonStore").includedJson);
  },
  async fetchData(uri, params) {
    if (this.get("invalid")) {
      return;
    }
    if (this.get("executingTestRun")) {
      return;
    }
    this.set("executingTestRun", true);
    setValue(this.get("schema"), "value", "loading...");
    try {
      const body = { uri };
      if (params) {
        body.config = JSON.stringify({ params });
      }
      const res = await Api.utils(`/datasources/${this.id}/fetch`, "POST", body);
      if (res) {
        this.set("testRunResult", res);
      }
      this.set("testRunResultErr", false);
    } catch (e) {
      console.error("error while fetching data", e);
      if (e.status === 504) {
        Msg.error("Request timed out");
      } else if (e.status === 422) {
        Msg.error(e.message);
      }
      this.set("testRunResult", e);
      this.set("testRunResultErr", true);
    } finally {
      setValue(this.get("schema"), "value", "");
      this.get("jsonStore").originalJson.update((val) => {
        val = this.get("testRunResult");
        return val;
      });
      this.set("executingTestRun", false);
    }
  }
});
const Datasources = base.Collection.extend({
  model: DatasourceModel,
  url: `/datasources`,
  markDatasourceSelected(id) {
    if (this.get(id)) {
      this.get(id).set("visited", true);
    }
  },
  prepareDatasources(model, config) {
    var _a, _b;
    if (model.datasource_id && this.get(model.datasource_id)) {
      this.get(model.datasource_id).set("jsonStore", initStores(((_a = config == null ? void 0 : config.filters) == null ? void 0 : _a.included) ? (_b = config == null ? void 0 : config.filters) == null ? void 0 : _b.included : []));
    }
  }
});
base.Model.extend({
  urlRoot: `/datasource-requests`
});
export { Datasources as D, DatasourceModel as a };
