import HtmlDiff from "./html-diff.f4fc7816.js";
import { T as TextDiff } from "./text-diff.a599c955.js";
import { l as load } from "./load-parse.47abd3e8.js";
import "./json-parser.7cb2f04e.js";
import "./service.04a32097.js";
import "./index.21aef151.js";
import "./index.821ff0ec.js";
import "./index-default.0d44a930.js";
import "./utils.fb792079.js";
function mergeDiffRows(diffRows) {
  const groups = {};
  const result = [];
  const diffRowsCopy = diffRows.map((row) => [...row]);
  for (const row of diffRowsCopy) {
    const [diffFlag, text, moveId, id] = row;
    if (!moveId) {
      result.push(row);
    } else {
      if (!groups[diffFlag + moveId]) {
        groups[diffFlag + moveId] = { diffFlag, texts: [], moveId, id };
      }
      groups[diffFlag + moveId].texts.push(text);
      if (id < groups[diffFlag + moveId].id) {
        groups[diffFlag + moveId].id = id;
      }
    }
  }
  for (const key in groups) {
    const group = groups[key];
    const mergedText = group.texts.join("");
    result.push([group.diffFlag, mergedText, group.moveId, group.id]);
  }
  result.sort((a, b) => a[3] - b[3]);
  return result;
}
function semanticCleanupWithMoves(diffs) {
  let i = 0;
  while (i < diffs.length) {
    const current = diffs[i];
    const currentType = getDiffRowType(current);
    if (currentType === "MOV" || currentType === "EQ") {
      i++;
      continue;
    }
    if (i + 1 < diffs.length) {
      const next = diffs[i + 1];
      const nextType = getDiffRowType(next);
      if (currentType === nextType && currentType !== "MOV") {
        current[1] += next[1];
        diffs.splice(i + 1, 1);
        continue;
      } else if (i + 2 < diffs.length) {
        const nextNext = diffs[i + 2];
        const nextNextType = getDiffRowType(nextNext);
        if (currentType === nextNextType && currentType !== "MOV") {
          current[1] += nextNext[1];
          diffs.splice(i + 2, 1);
          i++;
          continue;
        }
      }
    }
    i++;
  }
  return bringMovesCloser(diffs);
}
function bringMovesCloser(diffs) {
  let i = 0;
  while (i < diffs.length - 2) {
    const currentDiff = diffs[i];
    const nextDiff = diffs[i + 1];
    const nextNextDiff = diffs[i + 2];
    const currentType = getDiffRowType(currentDiff);
    const nextType = getDiffRowType(nextDiff);
    const nextNextType = getDiffRowType(nextNextDiff);
    let currentMoveType = null;
    let nextMoveType = null;
    let nextNextMoveType = null;
    if (currentType === "MOV") {
      currentMoveType = getMoveType(currentDiff);
    }
    if (nextType === "MOV") {
      nextMoveType = getMoveType(nextDiff);
    }
    if (nextNextType === "MOV") {
      nextNextMoveType = getMoveType(nextNextDiff);
    }
    if (currentType === "MOV" && nextType === "MOV" && currentMoveType === nextMoveType) {
      i++;
      continue;
    }
    if (currentType === "MOV" && nextType === "MOV" && nextNextType === "MOV") {
      if (currentMoveType === nextNextMoveType) {
        diffs[i + 1] = nextNextDiff;
        diffs[i + 2] = nextDiff;
        i++;
        continue;
      }
    }
    i++;
  }
  return diffs;
}
function getDiffRowType(diffRow) {
  switch (diffRow[0]) {
    case 1:
      if (diffRow[2]) {
        return "MOV";
      }
      return "INS";
    case -1:
      if (diffRow[2]) {
        return "MOV";
      }
      return "DEL";
    case 0:
      return "EQ";
    default:
      throw new Error(`Invalid diff row type: ${diffRow[0]}`);
  }
}
function getMoveType(diffRow) {
  if (getDiffRowType(diffRow) !== "MOV") {
    throw new Error("Invalid diff row type; expected MOV");
  }
  return diffRow[0] === -1 ? "SOURCE" : "TARGET";
}
const WHITE_SPACES = [" ", "\n"];
let __wordArr = [];
class TextDiffWithMove extends TextDiff {
  constructor(moveMergeThreshold = 3) {
    super();
    this.moveMergeThreshold = moveMergeThreshold;
  }
  async _diff(text1, text2) {
    const diffs = await super._diff(text1, text2);
    const [newWordArray, _] = this.wordDiffToCharDiff(diffs);
    this.markMoved(diffs);
    this.charDiffToWordDiff(diffs, newWordArray);
    return diffs;
  }
  async detectMoves(diffs, { retry, doMergeSameOps } = {}) {
    if (!retry && retry === void 0) {
      retry = true;
    }
    if (!doMergeSameOps && doMergeSameOps === void 0) {
      doMergeSameOps = true;
    }
    const [newWordArray, _] = this.wordDiffToCharDiff(diffs);
    __wordArr = newWordArray;
    this.markMoved(diffs, {
      doMergeSameOps
    });
    this.charDiffToWordDiff(diffs, newWordArray);
    let retryRunCount = 5;
    while (retry && retryRunCount > 0) {
      retryRunCount--;
      if (retryRunCount === 0) {
        this.moveMergeThreshold = 3;
      }
      let newDiff = [];
      const newIndexToOldIndex = {};
      for (let i = 0; i < diffs.length; i++) {
        const currentDiff = diffs[i];
        if (currentDiff[0] === 0) {
          continue;
        }
        if (currentDiff[2]) {
          continue;
        }
        if (currentDiff[0] === -1 || currentDiff[0] === 1) {
          currentDiff[1] = currentDiff[1].replace(/→/g, "").replace(/←/g, "");
          currentDiff[2] = void 0;
          currentDiff[3] = i;
          newDiff.push(currentDiff);
          newIndexToOldIndex[i] = i;
        }
      }
      JSON.parse(JSON.stringify(newDiff));
      await this.detectMoves(newDiff, { retry: false, doMergeSameOps: false });
      newDiff = mergeDiffRows(newDiff);
      const newDiffIds = new Set(newDiff.map((diff) => diff[3]));
      const indicesToRemove = Object.keys(newIndexToOldIndex).map((k) => parseInt(k)).filter((id) => !newDiffIds.has(id));
      for (let i = 0; i < indicesToRemove.length; i++) {
        const diffObj = diffs[indicesToRemove[i]];
        diffObj.toBeRemoved = true;
      }
      let lastDiffId = -1;
      let increments = 0;
      for (let i = 0; i < newDiff.length; i++) {
        const currenDiffRowId = newDiff[i][3];
        const diffIndex = newIndexToOldIndex[currenDiffRowId] + increments;
        if (lastDiffId !== currenDiffRowId) {
          diffs[diffIndex] = newDiff[i];
        } else {
          diffs.splice(diffIndex, 0, newDiff[i]);
          increments++;
        }
        lastDiffId = currenDiffRowId;
      }
      diffs = diffs.filter((diff) => !diff.toBeRemoved);
    }
    if (retry) {
      return semanticCleanupWithMoves(diffs);
    }
    return diffs;
  }
  markMoved(diffs, { doMergeSameOps } = {}) {
    return markMove(diffs, {
      moveMergeThreshold: this.moveMergeThreshold,
      doMergeSameOps
    });
  }
  wordDiffToCharDiff(diffs) {
    const wordArray = [...WHITE_SPACES];
    const wordHash = Object.fromEntries(WHITE_SPACES.map((w, i) => [w, i]));
    for (let i = 0; i < diffs.length; i++) {
      diffs[i] = [
        diffs[i][0],
        words2chars(diffs[i][1], wordArray, wordHash),
        void 0,
        diffs[i][3]
      ];
    }
    return [wordArray, wordHash];
  }
  charDiffToWordDiff(diffs, wordArray) {
    for (let i = 0; i < diffs.length; i++) {
      const newDiff = [
        diffs[i][0],
        Array.from(diffs[i][1]).map((c) => wordArray[c.charCodeAt(0)]).join("")
      ];
      if (diffs[i].length === 3) {
        newDiff.push(diffs[i][2]);
      }
      if (diffs[i].length === 4) {
        newDiff.push(diffs[i][2]);
        newDiff.push(diffs[i][3]);
      }
      diffs[i] = newDiff;
    }
  }
}
function getStringFromCharCode(charCode, wordArray = __wordArr) {
  return wordArray[charCode.charCodeAt(0)];
}
function words2chars(text, wordArray, wordHash) {
  const textArr = text.split(/(\s)/).filter((item) => item);
  let res = "";
  for (const item of textArr) {
    if (!(item in wordHash)) {
      wordHash[item] = wordArray.length;
      wordArray.push(item);
    }
    res += String.fromCharCode(wordHash[item]);
  }
  return res;
}
class Match {
  static getStringForMatch(match, diffs) {
    let deletedStr = "";
    for (let i = 0; i < match.length; i++) {
      deletedStr += getStringFromCharCode(diffs[match.delStart + i][1]);
    }
    let insertedStr = "";
    for (let i = 0; i < match.length; i++) {
      insertedStr += getStringFromCharCode(diffs[match.insStart + i][1]);
    }
    if (deletedStr !== insertedStr) {
      throw new Error(`Deleted and inserted strings do not match: ${deletedStr} !== ${insertedStr}`);
    }
    return deletedStr;
  }
  constructor(delStart, insStart, length, diffs) {
    this.delStart = delStart;
    this.insStart = insStart;
    this.length = length;
    this.score = 0;
  }
  generateStr(diff) {
    this.str = Match.getStringForMatch(this, diff);
  }
  overlaps(other) {
    return this.delStart < other.delStart + other.length && other.delStart < this.delStart + this.length || this.insStart < other.insStart + other.length && other.insStart < this.insStart + this.length;
  }
}
function markMove(diffs, { moveMergeThreshold, doMergeSameOps } = {}) {
  if (!doMergeSameOps && doMergeSameOps === void 0) {
    doMergeSameOps = true;
  }
  splitMultiChars(diffs);
  let matches = findAllMatches(diffs, moveMergeThreshold);
  scoreMatches(diffs, matches);
  matches = matches.filter((match) => {
    const str = Match.getStringForMatch(match, diffs);
    const countOfLeft = (str.match(/←/g) || []).length;
    const countOfRight = (str.match(/→/g) || []).length;
    if (countOfLeft !== countOfRight) {
      return false;
    }
    if (str.includes("\u2192")) {
      return str.trim().startsWith("\u2192");
    }
    if (str.includes("\u2190")) {
      return str.trim().endsWith("\u2190");
    }
    return !str.includes("\u2192") && !str.includes("\u2190");
  });
  matches.forEach((m) => {
    m.generateStr(diffs);
  });
  let bestMatches = selectBestMatches(matches);
  const diffsWithMove = applyMatches(bestMatches, diffs);
  if (doMergeSameOps) {
    mergeSameOps(diffsWithMove);
  }
  return diffsWithMove;
}
function splitMultiChars(diffs) {
  for (let i = 0; i < diffs.length; i++) {
    if (diffs[i][1].length > 1) {
      const arr = Array.from(diffs[i][1]).map((c) => [diffs[i][0], c, void 0, diffs[i][3]]);
      diffs.splice(i, 1, ...arr);
      i += arr.length - 1;
    }
  }
}
function findAllMatches(diffs, moveMergeThreshold) {
  const matches = [];
  const delIndices = diffs.map((d, i) => d[0] === -1 ? i : -1).filter((i) => i !== -1);
  const insIndices = diffs.map((d, i) => d[0] === 1 ? i : -1).filter((i) => i !== -1);
  for (const delStart of delIndices) {
    for (const insStart of insIndices) {
      let length = 0;
      while (delStart + length < diffs.length && insStart + length < diffs.length && diffs[delStart + length][0] === -1 && diffs[insStart + length][0] === 1 && diffs[delStart + length][1] === diffs[insStart + length][1]) {
        length++;
      }
      if (getEffectiveLength(diffs, delStart, length) >= moveMergeThreshold) {
        matches.push(new Match(delStart, insStart, length, diffs));
      }
    }
  }
  return matches;
}
function getGroup(groups, start, end) {
  let l = 0;
  let r = groups.length - 1;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (groups[mid][0] <= start && end <= groups[mid][1]) {
      return groups[mid];
    }
    if (groups[mid][0] > start) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return null;
}
function scoreMatches(diffs, matches) {
  const delGroups = [];
  const insGroups = [];
  let i = 0;
  while (i < diffs.length) {
    if (diffs[i][0] === 0) {
      i++;
      continue;
    }
    const op = diffs[i][0];
    const start = i;
    let end = start;
    while (end < diffs.length - 1 && diffs[end + 1][0] === op) {
      end++;
    }
    if (op === -1) {
      delGroups.push([start, end]);
    } else {
      insGroups.push([start, end]);
    }
    i = end + 1;
  }
  for (const match of matches) {
    const delGroup = getGroup(delGroups, match.delStart, match.delStart + match.length - 1);
    if (!delGroup) {
      throw new Error(
        `Del group not found for match spanning ${match.delStart} to ${match.delStart + match.length - 1}`
      );
    }
    const insGroup = getGroup(
      insGroups,
      match.insStart,
      match.insStart + match.length - 1
    );
    if (!insGroup) {
      throw new Error(
        `Ins group not found for match spanning ${match.insStart} to ${match.insStart + match.length - 1}`
      );
    }
    const delRatio = match.length / (delGroup[1] - delGroup[0] + 1);
    const insRatio = match.length / (insGroup[1] - insGroup[0] + 1);
    match.score = (delRatio + insRatio) / 2;
  }
}
function mergeSameOps(diffs) {
  for (let i = 0; i < diffs.length - 1; i++) {
    if (diffs[i][2] && diffs[i + 1][2] && diffs[i][0] === diffs[i + 1][0] && diffs[i][2] === diffs[i + 1][2] && !!diffs[i][2]) {
      diffs[i] = [diffs[i][0], diffs[i][1] + diffs[i + 1][1], diffs[i][2], diffs[i][3]];
      diffs.splice(i + 1, 1);
      i--;
    } else if (!diffs[i][2] && !diffs[i + 1][2] && diffs[i][0] === diffs[i + 1][0]) {
      diffs[i] = [diffs[i][0], diffs[i][1] + diffs[i + 1][1], void 0, diffs[i][3]];
      diffs.splice(i + 1, 1);
      i--;
    }
  }
}
function selectBestMatches(matches) {
  const sortedMatches = matches.sort((a, b) => b.str.length - a.str.length);
  const selected = [];
  for (const match of sortedMatches) {
    if (!selected.some((s) => match.overlaps(s))) {
      selected.push(match);
    }
  }
  return selected;
}
function applyMatches(bestMatches, diffs) {
  for (const [id, match] of bestMatches.entries()) {
    for (let i = match.delStart; i < match.delStart + match.length; i++) {
      diffs[i] = [diffs[i][0], diffs[i][1], id + "", diffs[i][3]];
    }
    for (let i = match.insStart; i < match.insStart + match.length; i++) {
      diffs[i] = [diffs[i][0], diffs[i][1], id + "", diffs[i][3]];
    }
  }
  return diffs;
}
function getEffectiveLength(diffs, start, length) {
  let l = length;
  for (let i = start; i < start + length; i++) {
    if (WHITE_SPACES.includes(diffs[i][1])) {
      l--;
    }
  }
  return l;
}
class TextDiffForSummary extends TextDiff {
  constructor() {
    super();
  }
  async diff(html1, html2) {
    try {
      await this.init();
      const htmlDiff = new HtmlDiff();
      const htmlDiffs = await htmlDiff.diff(html1, html2);
      const htmlDiffString = await htmlDiff.render(htmlDiffs.diff);
      const parsedDMPDiff = parseHtmlDiff(htmlDiffString);
      const textDiffWithMove = new TextDiffWithMove();
      const diffsWithMove = await textDiffWithMove.detectMoves(parsedDMPDiff);
      diffsWithMove.forEach((d) => {
        d[1] = d[1].replace(/→/g, "").replace(/←/g, "");
      });
      return diffsWithMove;
    } catch (e) {
      console.error("Error in diff", e);
      throw e;
    }
  }
  render(diffs) {
    const DIFF_DELETE = -1;
    const DIFF_INSERT = 1;
    const DIFF_EQUAL = 0;
    const html = [];
    const pattern_amp = /&/g;
    const pattern_lt = /</g;
    const pattern_gt = />/g;
    const pattern_para = /\n/g;
    for (let x = 0; x < diffs.length; x++) {
      let op = diffs[x][0];
      const data = diffs[x][1];
      const text = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "");
      const moveId = diffs[x][2];
      if (text.trim().length === 0 && moveId) {
        op = DIFF_EQUAL;
      }
      switch (op) {
        case DIFF_INSERT:
          if (moveId) {
            html[x] = '<mov data-move-id="' + moveId + '" target>' + text + "</mov>";
          } else {
            html[x] = "<ins>" + text + "</ins>";
          }
          break;
        case DIFF_DELETE:
          if (moveId) {
            html[x] = '<mov data-move-id="' + moveId + '" source>' + text + "</mov>";
          } else {
            html[x] = "<del>" + text + "</del>";
          }
          break;
        case DIFF_EQUAL:
          html[x] = "<span>" + text + "</span>";
          break;
      }
    }
    return Promise.resolve(html.join("").replace(/&para;/g, ""));
  }
}
function parseHtmlDiff(htmlString) {
  const $ = load(htmlString);
  const output = [];
  function updateOutput(operation, text) {
    if (text.trim() === "\u2192\u2190") {
      return;
    }
    if (output.length > 0 && output[output.length - 1][0] === operation) {
      if (trimText(text).trim().length > 0) {
        output[output.length - 1][1] += trimText(text);
      }
    } else {
      if (trimText(text).trim().length > 0) {
        output.push([operation, trimText(text)]);
      }
    }
  }
  function trimText(text) {
    text = text.replace(/^\n[\s\t]*/g, "\n");
    text = text.replace(/\t+/g, "");
    text = text.replace(/\s+/g, " ");
    return text.trim() + " ";
  }
  function extractText(element) {
    let text = "";
    function walk(node) {
      if (node.type === "text") {
        const nodeText = $(node).text().trim();
        if (nodeText) {
          text += " " + nodeText;
        }
      } else if (node.type === "tag") {
        node.children.forEach(walk);
      }
    }
    element[0].children.forEach(walk);
    return text;
  }
  function processNode(node) {
    var _a, _b, _c, _d;
    if (node[0].type === "text") {
      updateOutput(0, node.text());
    } else if (node[0].type === "tag" || node[0].type === "root") {
      const element = $(node);
      const classes = ((_b = (_a = element[0].attributes) == null ? void 0 : _a.filter((attr) => attr.name === "class")) == null ? void 0 : _b.map((attr) => attr.value).join(" ").trim()) || "";
      (_d = (_c = element[0].attributes) == null ? void 0 : _c.find((attr) => attr.name === "id")) == null ? void 0 : _d.value;
      element[0].tagName;
      if (classes.includes("diffMark") && classes.includes("inserted")) {
        element.contents().map((_, el) => $(el).text()).get().join(" ");
        const extractedText = extractText(element);
        updateOutput(1, " \u2192" + extractedText + "\u2190 ");
      } else if (classes.includes("diffMark") && classes.includes("removed")) {
        element.contents().map((_, el) => $(el).text()).get().join(" ");
        const extractedText = extractText(element);
        updateOutput(-1, " \u2192" + extractedText + "\u2190 ");
      } else {
        element.contents().each((_, childNode) => processNode($(childNode)));
      }
    }
  }
  processNode($.root());
  return output;
}
export { TextDiffForSummary, TextDiffForSummary as default };
