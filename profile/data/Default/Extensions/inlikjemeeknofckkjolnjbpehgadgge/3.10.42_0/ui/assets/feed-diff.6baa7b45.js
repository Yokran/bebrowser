import { _ as __vitePreload } from "./service.04a32097.js";
import { _ } from "./index-default.0d44a930.js";
import { g as getDiffObj, D as DIFF_TYPE } from "./AppLocal.2fbeb786.js";
import { s as setDiffStyle } from "./utils.fb792079.js";
import "./index.21aef151.js";
import "./json-parser.f519fd70.js";
import "./Message.d6d97d2b.js";
import "./SchemaKeyTree.c700e647.js";
import "./Card.0607fce4.js";
const LABEL_UNCHANGED = "unchanged";
const LABEL_ADDED = "added";
const LABEL_UPDATED = "updated";
const LABEL_DELETED = "deleted";
function hashFeed(feed) {
  const entries = feed.entries;
  _.each(entries, function(entry) {
    entry._hash = [entry.link, entry.title, entry.description || entry.summary || ""].join(":");
  });
  return feed;
}
function findChanges(dict) {
  let changes = [], newEntries = dict.newHashedFeed.entries, oldEntries = dict.oldHashedFeed.entries, newHashes = _.pluck(newEntries, "_hash"), oldHashes = _.pluck(dict.oldHashedFeed.entries, "_hash");
  for (let i = 0; i < newHashes.length; i += 1) {
    let aHash = newHashes[i], oldIndex = oldHashes.indexOf(aHash), newEntry = newEntries[i];
    if (oldIndex < 0) {
      changes.push(newEntries[i]);
    } else {
      newEntry.label = LABEL_UNCHANGED;
      changes.push(newEntry);
    }
  }
  for (let i = 0; i < oldEntries.length; i += 1) {
    let oldEntry = oldEntries[i];
    let newEntry = _.find(newEntries, { link: oldEntry.link });
    if (!newEntry) {
      oldEntry.label = LABEL_DELETED;
      changes.push(oldEntry);
    }
  }
  return changes;
}
function findIndex(Entries, entry) {
  for (let i = 0; i < Entries.length; i++) {
    if (Entries[i].link == entry.link) {
      return i;
    }
  }
}
async function feedDiff(dict) {
  dict["newHashedFeed"] = hashFeed(dict["newHashedFeed"]);
  dict["oldHashedFeed"] = dict["oldHashedFeed"] && hashFeed(dict["oldHashedFeed"]);
  let changes = findChanges(dict), updEntries = 0, addedEntries = 0, deletedEntries = 0, oldEntries = dict.oldHashedFeed.entries, oldHashes = _.pluck(dict.oldHashedFeed.entries, "_hash");
  const htmlDiff = await getDiffObj(DIFF_TYPE.HTML);
  for (let entry of changes) {
    let index = findIndex(oldEntries, entry);
    if (index >= 0 && entry._hash != oldHashes[index]) {
      let doc1 = oldEntries[index].description || oldEntries[index].summary;
      let doc2 = entry.description || entry.summary;
      entry.title = await htmlDiff.diffAndRender(`<div>${oldEntries[index].title}</div>`, `<div>${entry.title}</div>`);
      entry.description = await htmlDiff.diffAndRender(`<div>${doc1}</div>`, `<div>${doc2}</div>`);
      entry.label = LABEL_UPDATED;
      updEntries++;
    } else if (entry.label !== LABEL_UNCHANGED && entry.label !== LABEL_DELETED) {
      entry.description || (entry.description = entry.summary);
      entry.label = LABEL_ADDED;
      addedEntries++;
    } else if (entry.label === LABEL_DELETED) {
      deletedEntries++;
    }
  }
  return { changes, newEntries: addedEntries, updatedEntries: updEntries, deletedEntries };
}
class FeedDiff {
  constructor() {
    this.type = "feed";
    this.renderEmail = this.render;
  }
  diff(data1, data2) {
    const feedOld = JSON.parse(data1);
    const feedNew = JSON.parse(data2);
    const feedDict = { newHashedFeed: feedNew, oldHashedFeed: feedOld };
    return feedDiff(feedDict);
  }
  async render(diff) {
    const cheerio = await __vitePreload(() => import("./index.2db26bd4.js"), true ? ["assets/index.2db26bd4.js","assets/load-parse.47abd3e8.js","assets/index.821ff0ec.js"] : void 0);
    let res = diff.changes.filter((entry) => entry.label === "added" || entry.label === "updated").map((entry) => {
      let doc = cheerio.load(`<html><body><div>${entry.description}</div></body></html>`);
      setDiffStyle(doc);
      return `<div style='margin-bottom: 20px; padding: 10px;'>
                      <h3>
                        <a href="${entry.link}">${entry.title}</a>
                      </h3>
                      <div class="summary" style="display: block">
                          ${doc("body").html()}
                      </div>
                    </div>`;
    }).join("");
    return `<div id='highlighted-inlined' style='margin-bottom: 20px; padding: 10px; background-color: #fff;border-left: solid 2px #0117ba;'>
                                <div style="width:700px;margin:0 auto;">
                                  ${res}
                                </div>
                              </div>`;
  }
  async diffAndRender(data1, data2) {
    const diff = await this.diff(data1, data2);
    return await this.render(diff);
  }
  async diffAndRenderEmail(data1, data2) {
    const diff = await this.diff(data1, data2);
    return await this.renderEmail(diff);
  }
}
export { FeedDiff as default };
