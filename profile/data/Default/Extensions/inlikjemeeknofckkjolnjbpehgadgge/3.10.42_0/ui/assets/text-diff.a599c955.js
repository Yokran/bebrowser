import { _ as __vitePreload } from "./service.04a32097.js";
import { s as setDiffStyle } from "./utils.fb792079.js";
function diff_match_patch() {
  this.Diff_Timeout = 1;
  this.Diff_EditCost = 4;
  this.Match_Threshold = 0.5;
  this.Match_Distance = 1e3;
  this.Patch_DeleteThreshold = 0.5;
  this.Patch_Margin = 4;
  this.Match_MaxBits = 32;
}
let DIFF_DELETE = -1;
let DIFF_INSERT = 1;
let DIFF_EQUAL = 0;
diff_match_patch.Diff;
diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines, opt_deadline) {
  if (typeof opt_deadline == "undefined") {
    if (this.Diff_Timeout <= 0) {
      opt_deadline = Number.MAX_VALUE;
    } else {
      opt_deadline = new Date().getTime() + this.Diff_Timeout * 1e3;
    }
  }
  var deadline = opt_deadline;
  if (text1 == null || text2 == null) {
    throw new Error("Null input. (diff_main)");
  }
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }
  if (typeof opt_checklines == "undefined") {
    opt_checklines = true;
  }
  var checklines = opt_checklines;
  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);
  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);
  var diffs = this.diff_compute_(text1, text2, checklines, deadline);
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};
diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines, deadline) {
  var diffs;
  if (!text1) {
    return [[DIFF_INSERT, text2]];
  }
  if (!text2) {
    return [[DIFF_DELETE, text1]];
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i2 = longtext.indexOf(shorttext);
  if (i2 != -1) {
    diffs = [
      [DIFF_INSERT, longtext.substring(0, i2)],
      [DIFF_EQUAL, shorttext],
      [DIFF_INSERT, longtext.substring(i2 + shorttext.length)]
    ];
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }
  if (shorttext.length == 1) {
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }
  var hm = this.diff_halfMatch_(text1, text2);
  if (hm) {
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }
  if (checklines && text1.length > 100 && text2.length > 100) {
    return this.diff_lineMode_(text1, text2, deadline);
  }
  return this.diff_bisect_(text1, text2, deadline);
};
diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
  var a3 = this.diff_linesToChars_(text1, text2);
  text1 = a3.chars1;
  text2 = a3.chars2;
  var linearray = a3.lineArray;
  var diffs = this.diff_main(text1, text2, false, deadline);
  this.diff_charsToLines_(diffs, linearray);
  this.diff_cleanupSemantic(diffs);
  diffs.push([DIFF_EQUAL, ""]);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = "";
  var text_insert = "";
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        if (count_delete >= 1 && count_insert >= 1) {
          diffs.splice(
            pointer - count_delete - count_insert,
            count_delete + count_insert
          );
          pointer = pointer - count_delete - count_insert;
          var a3 = this.diff_main(text_delete, text_insert, false, deadline);
          for (var j = a3.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, a3[j]);
          }
          pointer = pointer + a3.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = "";
        text_insert = "";
        break;
    }
    pointer++;
  }
  diffs.pop();
  return diffs;
};
diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  for (var x2 = 0; x2 < v_length; x2++) {
    v1[x2] = -1;
    v2[x2] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  var front = delta % 2 != 0;
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d3 = 0; d3 < max_d; d3++) {
    if (new Date().getTime() > deadline) {
      break;
    }
    for (var k1 = -d3 + k1start; k1 <= d3 - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d3 || k1 != d3 && v1[k1_offset - 1] < v1[k1_offset + 1]) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        k1end += 2;
      } else if (y1 > text2_length) {
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          var x22 = text1_length - v2[k2_offset];
          if (x1 >= x22) {
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
    for (var k2 = -d3 + k2start; k2 <= d3 - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x22;
      if (k2 == -d3 || k2 != d3 && v2[k2_offset - 1] < v2[k2_offset + 1]) {
        x22 = v2[k2_offset + 1];
      } else {
        x22 = v2[k2_offset - 1] + 1;
      }
      var y22 = x22 - k2;
      while (x22 < text1_length && y22 < text2_length && text1.charAt(text1_length - x22 - 1) == text2.charAt(text2_length - y22 - 1)) {
        x22++;
        y22++;
      }
      v2[k2_offset] = x22;
      if (x22 > text1_length) {
        k2end += 2;
      } else if (y22 > text2_length) {
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          x22 = text1_length - x22;
          if (x1 >= x22) {
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
  }
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};
diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x2, y3, deadline) {
  var text1a = text1.substring(0, x2);
  var text2a = text2.substring(0, y3);
  var text1b = text1.substring(x2);
  var text2b = text2.substring(y3);
  var diffs = this.diff_main(text1a, text2a, false, deadline);
  var diffsb = this.diff_main(text1b, text2b, false, deadline);
  return diffs.concat(diffsb);
};
diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
  var lineArray = [];
  var lineHash = {};
  lineArray[0] = "";
  function diff_linesToCharsMunge_(text) {
    var chars = "";
    var lineStart = 0;
    var lineEnd = -1;
    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf("\n", lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);
      lineStart = lineEnd + 1;
      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== void 0) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
    }
    return chars;
  }
  var chars1 = diff_linesToCharsMunge_(text1);
  var chars2 = diff_linesToCharsMunge_(text2);
  return { chars1, chars2, lineArray };
};
diff_match_patch.prototype.diff_wordsToChars_ = function(text1, text2) {
  var wordArray = [" "];
  var wordHash = { " ": 0 };
  function diff_wordsToCharsMunge_(text) {
    var chars = "";
    var wordStart = 0;
    var wordEnd = -1;
    var wordArrayLength = wordArray.length;
    var reachedEnd;
    while (wordEnd < text.length - 1) {
      wordEnd = text.indexOf(" ", wordStart);
      reachedEnd = wordEnd == -1;
      if (reachedEnd) {
        wordEnd = text.length - 1;
      }
      var word = text.substring(wordStart, wordEnd + (reachedEnd ? 1 : 0));
      wordStart = wordEnd + 1;
      if (wordHash.hasOwnProperty ? wordHash.hasOwnProperty(word) : wordHash[word] !== void 0) {
        chars += String.fromCharCode(wordHash[word]);
      } else {
        chars += String.fromCharCode(wordArrayLength);
        wordHash[word] = wordArrayLength;
        wordArray[wordArrayLength++] = word;
      }
      if (!reachedEnd) {
        chars += String.fromCharCode(0);
      }
    }
    return chars;
  }
  var chars1 = diff_wordsToCharsMunge_(text1);
  var chars2 = diff_wordsToCharsMunge_(text2);
  return { chars1, chars2, wordArray };
};
diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
  for (var x2 = 0; x2 < diffs.length; x2++) {
    var chars = diffs[x2][1];
    var text = [];
    for (var y3 = 0; y3 < chars.length; y3++) {
      text[y3] = lineArray[chars.charCodeAt(y3)];
    }
    diffs[x2][1] = text.join("");
  }
};
diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};
diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
  if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};
diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
  var text1_length = text1.length;
  var text2_length = text2.length;
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  if (text1 == text2) {
    return text_length;
  }
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
};
diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
  if (this.Diff_Timeout <= 0) {
    return null;
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;
  }
  var dmp = this;
  function diff_halfMatchI_(longtext2, shorttext2, i2) {
    var seed = longtext2.substring(i2, i2 + Math.floor(longtext2.length / 4));
    var j = -1;
    var best_common = "";
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext2.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(
        longtext2.substring(i2),
        shorttext2.substring(j)
      );
      var suffixLength = dmp.diff_commonSuffix(
        longtext2.substring(0, i2),
        shorttext2.substring(0, j)
      );
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength);
        best_longtext_a = longtext2.substring(0, i2 - suffixLength);
        best_longtext_b = longtext2.substring(i2 + prefixLength);
        best_shorttext_a = shorttext2.substring(0, j - suffixLength);
        best_shorttext_b = shorttext2.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext2.length) {
      return [
        best_longtext_a,
        best_longtext_b,
        best_shorttext_a,
        best_shorttext_b,
        best_common
      ];
    } else {
      return null;
    }
  }
  var hm1 = diff_halfMatchI_(
    longtext,
    shorttext,
    Math.ceil(longtext.length / 4)
  );
  var hm2 = diff_halfMatchI_(
    longtext,
    shorttext,
    Math.ceil(longtext.length / 2)
  );
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};
diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
  var changes = false;
  var equalities = [];
  var equalitiesLength = 0;
  var lastequality = null;
  var pointer = 0;
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastequality = diffs[pointer][1];
    } else {
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      if (lastequality && lastequality.length <= Math.max(length_insertions1, length_deletions1) && lastequality.length <= Math.max(
        length_insertions2,
        length_deletions2
      )) {
        diffs.splice(
          equalities[equalitiesLength - 1],
          0,
          [DIFF_DELETE, lastequality]
        );
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
          diffs.splice(
            pointer,
            0,
            [DIFF_EQUAL, insertion.substring(0, overlap_length1)]
          );
          diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
          diffs.splice(
            pointer,
            0,
            [DIFF_EQUAL, deletion.substring(0, overlap_length2)]
          );
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] = deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
};
diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      return 6;
    }
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch.whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch.whitespaceRegex_);
    var lineBreak1 = whitespace1 && char1.match(diff_match_patch.linebreakRegex_);
    var lineBreak2 = whitespace2 && char2.match(diff_match_patch.linebreakRegex_);
    var blankLine1 = lineBreak1 && one.match(diff_match_patch.blanklineEndRegex_);
    var blankLine2 = lineBreak2 && two.match(diff_match_patch.blanklineStartRegex_);
    if (blankLine1 || blankLine2) {
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      return 3;
    } else if (whitespace1 || whitespace2) {
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      return 1;
    }
    return 0;
  }
  var pointer = 1;
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];
      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }
      if (diffs[pointer - 1][1] != bestEquality1) {
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
};
diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
diff_match_patch.whitespaceRegex_ = /\s/;
diff_match_patch.linebreakRegex_ = /[\r\n]/;
diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];
  var equalitiesLength = 0;
  var lastequality = null;
  var pointer = 0;
  var pre_ins = false;
  var pre_del = false;
  var post_ins = false;
  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {
      if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastequality = diffs[pointer][1];
      } else {
        equalitiesLength = 0;
        lastequality = null;
      }
      post_ins = post_del = false;
    } else {
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      if (lastequality && (pre_ins && pre_del && post_ins && post_del || lastequality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
        diffs.splice(
          equalities[equalitiesLength - 1],
          0,
          [DIFF_DELETE, lastequality]
        );
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;
        lastequality = null;
        if (pre_ins && pre_del) {
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;
          pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};
diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
  diffs.push([DIFF_EQUAL, ""]);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = "";
  var text_insert = "";
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            commonlength = this.diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [
                  DIFF_EQUAL,
                  text_insert.substring(0, commonlength)
                ]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            commonlength = this.diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length - commonlength);
              text_delete = text_delete.substring(0, text_delete.length - commonlength);
            }
          }
          if (count_delete === 0) {
            diffs.splice(
              pointer - count_insert,
              count_delete + count_insert,
              [DIFF_INSERT, text_insert]
            );
          } else if (count_insert === 0) {
            diffs.splice(
              pointer - count_delete,
              count_delete + count_insert,
              [DIFF_DELETE, text_delete]
            );
          } else {
            diffs.splice(
              pointer - count_delete - count_insert,
              count_delete + count_insert,
              [DIFF_DELETE, text_delete],
              [DIFF_INSERT, text_insert]
            );
          }
          pointer = pointer - count_delete - count_insert + (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = "";
        text_insert = "";
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === "") {
    diffs.pop();
  }
  var changes = false;
  pointer = 1;
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
      if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};
diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
  var chars1 = 0;
  var chars2 = 0;
  var last_chars1 = 0;
  var last_chars2 = 0;
  var x2;
  for (x2 = 0; x2 < diffs.length; x2++) {
    if (diffs[x2][0] !== DIFF_INSERT) {
      chars1 += diffs[x2][1].length;
    }
    if (diffs[x2][0] !== DIFF_DELETE) {
      chars2 += diffs[x2][1].length;
    }
    if (chars1 > loc) {
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }
  if (diffs.length != x2 && diffs[x2][0] === DIFF_DELETE) {
    return last_chars2;
  }
  return last_chars2 + (loc - last_chars1);
};
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  for (var x2 = 0; x2 < diffs.length; x2++) {
    var op = diffs[x2][0];
    var data = diffs[x2][1];
    var text = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "&para;<br>");
    switch (op) {
      case DIFF_INSERT:
        html[x2] = '<ins class="diffMark inserted">' + text + "</ins>";
        break;
      case DIFF_DELETE:
        html[x2] = '<del class="diffMark removed">' + text + "</del>";
        break;
      case DIFF_EQUAL:
        html[x2] = "<span>" + text + "</span>";
        break;
    }
  }
  return html.join("");
};
diff_match_patch.prototype.diff_text1 = function(diffs) {
  var text = [];
  for (var x2 = 0; x2 < diffs.length; x2++) {
    if (diffs[x2][0] !== DIFF_INSERT) {
      text[x2] = diffs[x2][1];
    }
  }
  return text.join("");
};
diff_match_patch.prototype.diff_text2 = function(diffs) {
  var text = [];
  for (var x2 = 0; x2 < diffs.length; x2++) {
    if (diffs[x2][0] !== DIFF_DELETE) {
      text[x2] = diffs[x2][1];
    }
  }
  return text.join("");
};
diff_match_patch.prototype.diff_levenshtein = function(diffs) {
  var levenshtein = 0;
  var insertions = 0;
  var deletions = 0;
  for (var x2 = 0; x2 < diffs.length; x2++) {
    var op = diffs[x2][0];
    var data = diffs[x2][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        levenshtein += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
    }
  }
  levenshtein += Math.max(insertions, deletions);
  return levenshtein;
};
diff_match_patch.prototype.diff_toDelta = function(diffs) {
  var text = [];
  for (var x2 = 0; x2 < diffs.length; x2++) {
    switch (diffs[x2][0]) {
      case DIFF_INSERT:
        text[x2] = "+" + encodeURI(diffs[x2][1]);
        break;
      case DIFF_DELETE:
        text[x2] = "-" + diffs[x2][1].length;
        break;
      case DIFF_EQUAL:
        text[x2] = "=" + diffs[x2][1].length;
        break;
    }
  }
  return text.join("	").replace(/%20/g, " ");
};
diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
  var diffs = [];
  var diffsLength = 0;
  var pointer = 0;
  var tokens = delta.split(/\t/g);
  for (var x2 = 0; x2 < tokens.length; x2++) {
    var param = tokens[x2].substring(1);
    switch (tokens[x2].charAt(0)) {
      case "+":
        try {
          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
        } catch (ex) {
          throw new Error("Illegal escape in diff_fromDelta: " + param);
        }
        break;
      case "-":
      case "=":
        var n = parseInt(param, 10);
        if (isNaN(n) || n < 0) {
          throw new Error("Invalid number in diff_fromDelta: " + param);
        }
        var text = text1.substring(pointer, pointer += n);
        if (tokens[x2].charAt(0) == "=") {
          diffs[diffsLength++] = [DIFF_EQUAL, text];
        } else {
          diffs[diffsLength++] = [DIFF_DELETE, text];
        }
        break;
      default:
        if (tokens[x2]) {
          throw new Error("Invalid diff operation in diff_fromDelta: " + tokens[x2]);
        }
    }
  }
  if (pointer != text1.length) {
    throw new Error("Delta length (" + pointer + ") does not equal source text length (" + text1.length + ").");
  }
  return diffs;
};
diff_match_patch.prototype.match_main = function(text, pattern, loc) {
  if (text == null || pattern == null || loc == null) {
    throw new Error("Null input. (match_main)");
  }
  loc = Math.max(0, Math.min(loc, text.length));
  if (text == pattern) {
    return 0;
  } else if (!text.length) {
    return -1;
  } else if (text.substring(loc, loc + pattern.length) == pattern) {
    return loc;
  } else {
    return this.match_bitap_(text, pattern, loc);
  }
};
diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
  if (pattern.length > this.Match_MaxBits) {
    throw new Error("Pattern too long for this browser.");
  }
  var s3 = this.match_alphabet_(pattern);
  var dmp = this;
  function match_bitapScore_(e2, x2) {
    var accuracy = e2 / pattern.length;
    var proximity = Math.abs(loc - x2);
    if (!dmp.Match_Distance) {
      return proximity ? 1 : accuracy;
    }
    return accuracy + proximity / dmp.Match_Distance;
  }
  var score_threshold = this.Match_Threshold;
  var best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }
  var matchmask = 1 << pattern.length - 1;
  best_loc = -1;
  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;
  for (var d3 = 0; d3 < pattern.length; d3++) {
    bin_min = 0;
    bin_mid = bin_max;
    while (bin_min < bin_mid) {
      if (match_bitapScore_(d3, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }
      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    }
    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d3) - 1;
    for (var j = finish; j >= start; j--) {
      var charMatch = s3[text.charAt(j - 1)];
      if (d3 === 0) {
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
      } else {
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
      }
      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d3, j - 1);
        if (score <= score_threshold) {
          score_threshold = score;
          best_loc = j - 1;
          if (best_loc > loc) {
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            break;
          }
        }
      }
    }
    if (match_bitapScore_(d3 + 1, loc) > score_threshold) {
      break;
    }
    last_rd = rd;
  }
  return best_loc;
};
diff_match_patch.prototype.match_alphabet_ = function(pattern) {
  var s3 = {};
  for (var i2 = 0; i2 < pattern.length; i2++) {
    s3[pattern.charAt(i2)] = 0;
  }
  for (var i2 = 0; i2 < pattern.length; i2++) {
    s3[pattern.charAt(i2)] |= 1 << pattern.length - i2 - 1;
  }
  return s3;
};
diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
  if (text.length == 0) {
    return;
  }
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  var padding = 0;
  while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
    padding += this.Patch_Margin;
    pattern = text.substring(
      patch.start2 - padding,
      patch.start2 + patch.length1 + padding
    );
  }
  padding += this.Patch_Margin;
  var prefix = text.substring(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift([DIFF_EQUAL, prefix]);
  }
  var suffix = text.substring(
    patch.start2 + patch.length1,
    patch.start2 + patch.length1 + padding
  );
  if (suffix) {
    patch.diffs.push([DIFF_EQUAL, suffix]);
  }
  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;
  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
};
diff_match_patch.prototype.patch_make = function(a3, opt_b, opt_c) {
  var text1, diffs;
  if (typeof a3 == "string" && typeof opt_b == "string" && typeof opt_c == "undefined") {
    text1 = a3;
    diffs = this.diff_main(text1, opt_b, true);
    if (diffs.length > 2) {
      this.diff_cleanupSemantic(diffs);
      this.diff_cleanupEfficiency(diffs);
    }
  } else if (a3 && typeof a3 == "object" && typeof opt_b == "undefined" && typeof opt_c == "undefined") {
    diffs = a3;
    text1 = this.diff_text1(diffs);
  } else if (typeof a3 == "string" && opt_b && typeof opt_b == "object" && typeof opt_c == "undefined") {
    text1 = a3;
    diffs = opt_b;
  } else if (typeof a3 == "string" && typeof opt_b == "string" && opt_c && typeof opt_c == "object") {
    text1 = a3;
    diffs = opt_c;
  } else {
    throw new Error("Unknown call format to patch_make.");
  }
  if (diffs.length === 0) {
    return [];
  }
  var patches = [];
  var patch = new diff_match_patch.patch_obj();
  var patchDiffLength = 0;
  var char_count1 = 0;
  var char_count2 = 0;
  var prepatch_text = text1;
  var postpatch_text = text1;
  for (var x2 = 0; x2 < diffs.length; x2++) {
    var diff_type = diffs[x2][0];
    var diff_text = diffs[x2][1];
    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }
    switch (diff_type) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = diffs[x2];
        patch.length2 += diff_text.length;
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
        break;
      case DIFF_DELETE:
        patch.length1 += diff_text.length;
        patch.diffs[patchDiffLength++] = diffs[x2];
        postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
        break;
      case DIFF_EQUAL:
        if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x2 + 1) {
          patch.diffs[patchDiffLength++] = diffs[x2];
          patch.length1 += diff_text.length;
          patch.length2 += diff_text.length;
        } else if (diff_text.length >= 2 * this.Patch_Margin) {
          if (patchDiffLength) {
            this.patch_addContext_(patch, prepatch_text);
            patches.push(patch);
            patch = new diff_match_patch.patch_obj();
            patchDiffLength = 0;
            prepatch_text = postpatch_text;
            char_count1 = char_count2;
          }
        }
        break;
    }
    if (diff_type !== DIFF_INSERT) {
      char_count1 += diff_text.length;
    }
    if (diff_type !== DIFF_DELETE) {
      char_count2 += diff_text.length;
    }
  }
  if (patchDiffLength) {
    this.patch_addContext_(patch, prepatch_text);
    patches.push(patch);
  }
  return patches;
};
diff_match_patch.prototype.patch_deepCopy = function(patches) {
  var patchesCopy = [];
  for (var x2 = 0; x2 < patches.length; x2++) {
    var patch = patches[x2];
    var patchCopy = new diff_match_patch.patch_obj();
    patchCopy.diffs = [];
    for (var y3 = 0; y3 < patch.diffs.length; y3++) {
      patchCopy.diffs[y3] = patch.diffs[y3].slice();
    }
    patchCopy.start1 = patch.start1;
    patchCopy.start2 = patch.start2;
    patchCopy.length1 = patch.length1;
    patchCopy.length2 = patch.length2;
    patchesCopy[x2] = patchCopy;
  }
  return patchesCopy;
};
diff_match_patch.prototype.patch_apply = function(patches, text) {
  if (patches.length == 0) {
    return [text, []];
  }
  patches = this.patch_deepCopy(patches);
  var nullPadding = this.patch_addPadding(patches);
  text = nullPadding + text + nullPadding;
  this.patch_splitMax(patches);
  var delta = 0;
  var results = [];
  for (var x2 = 0; x2 < patches.length; x2++) {
    var expected_loc = patches[x2].start2 + delta;
    var text1 = this.diff_text1(patches[x2].diffs);
    var start_loc;
    var end_loc = -1;
    if (text1.length > this.Match_MaxBits) {
      start_loc = this.match_main(
        text,
        text1.substring(0, this.Match_MaxBits),
        expected_loc
      );
      if (start_loc != -1) {
        end_loc = this.match_main(
          text,
          text1.substring(text1.length - this.Match_MaxBits),
          expected_loc + text1.length - this.Match_MaxBits
        );
        if (end_loc == -1 || start_loc >= end_loc) {
          start_loc = -1;
        }
      }
    } else {
      start_loc = this.match_main(text, text1, expected_loc);
    }
    if (start_loc == -1) {
      results[x2] = false;
      delta -= patches[x2].length2 - patches[x2].length1;
    } else {
      results[x2] = true;
      delta = start_loc - expected_loc;
      var text2;
      if (end_loc == -1) {
        text2 = text.substring(start_loc, start_loc + text1.length);
      } else {
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
      }
      if (text1 == text2) {
        text = text.substring(0, start_loc) + this.diff_text2(patches[x2].diffs) + text.substring(start_loc + text1.length);
      } else {
        var diffs = this.diff_main(text1, text2, false);
        if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
          results[x2] = false;
        } else {
          this.diff_cleanupSemanticLossless(diffs);
          var index1 = 0;
          var index2;
          for (var y3 = 0; y3 < patches[x2].diffs.length; y3++) {
            var mod = patches[x2].diffs[y3];
            if (mod[0] !== DIFF_EQUAL) {
              index2 = this.diff_xIndex(diffs, index1);
            }
            if (mod[0] === DIFF_INSERT) {
              text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
            } else if (mod[0] === DIFF_DELETE) {
              text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(
                diffs,
                index1 + mod[1].length
              ));
            }
            if (mod[0] !== DIFF_DELETE) {
              index1 += mod[1].length;
            }
          }
        }
      }
    }
  }
  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  return [text, results];
};
diff_match_patch.prototype.patch_addPadding = function(patches) {
  var paddingLength = this.Patch_Margin;
  var nullPadding = "";
  for (var x2 = 1; x2 <= paddingLength; x2++) {
    nullPadding += String.fromCharCode(x2);
  }
  for (var x2 = 0; x2 < patches.length; x2++) {
    patches[x2].start1 += paddingLength;
    patches[x2].start2 += paddingLength;
  }
  var patch = patches[0];
  var diffs = patch.diffs;
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
    diffs.unshift([DIFF_EQUAL, nullPadding]);
    patch.start1 -= paddingLength;
    patch.start2 -= paddingLength;
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0][1].length) {
    var extraLength = paddingLength - diffs[0][1].length;
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }
  patch = patches[patches.length - 1];
  diffs = patch.diffs;
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
    diffs.push([DIFF_EQUAL, nullPadding]);
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }
  return nullPadding;
};
diff_match_patch.prototype.patch_splitMax = function(patches) {
  var patch_size = this.Match_MaxBits;
  for (var x2 = 0; x2 < patches.length; x2++) {
    if (patches[x2].length1 <= patch_size) {
      continue;
    }
    var bigpatch = patches[x2];
    patches.splice(x2--, 1);
    var start1 = bigpatch.start1;
    var start2 = bigpatch.start2;
    var precontext = "";
    while (bigpatch.diffs.length !== 0) {
      var patch = new diff_match_patch.patch_obj();
      var empty = true;
      patch.start1 = start1 - precontext.length;
      patch.start2 = start2 - precontext.length;
      if (precontext !== "") {
        patch.length1 = patch.length2 = precontext.length;
        patch.diffs.push([DIFF_EQUAL, precontext]);
      }
      while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
        var diff_type = bigpatch.diffs[0][0];
        var diff_text = bigpatch.diffs[0][1];
        if (diff_type === DIFF_INSERT) {
          patch.length2 += diff_text.length;
          start2 += diff_text.length;
          patch.diffs.push(bigpatch.diffs.shift());
          empty = false;
        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          empty = false;
          patch.diffs.push([diff_type, diff_text]);
          bigpatch.diffs.shift();
        } else {
          diff_text = diff_text.substring(
            0,
            patch_size - patch.length1 - this.Patch_Margin
          );
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          if (diff_type === DIFF_EQUAL) {
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
          } else {
            empty = false;
          }
          patch.diffs.push([diff_type, diff_text]);
          if (diff_text == bigpatch.diffs[0][1]) {
            bigpatch.diffs.shift();
          } else {
            bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
          }
        }
      }
      precontext = this.diff_text2(patch.diffs);
      precontext = precontext.substring(precontext.length - this.Patch_Margin);
      var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
      if (postcontext !== "") {
        patch.length1 += postcontext.length;
        patch.length2 += postcontext.length;
        if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
          patch.diffs[patch.diffs.length - 1][1] += postcontext;
        } else {
          patch.diffs.push([DIFF_EQUAL, postcontext]);
        }
      }
      if (!empty) {
        patches.splice(++x2, 0, patch);
      }
    }
  }
};
diff_match_patch.prototype.patch_toText = function(patches) {
  var text = [];
  for (var x2 = 0; x2 < patches.length; x2++) {
    text[x2] = patches[x2];
  }
  return text.join("");
};
diff_match_patch.prototype.patch_fromText = function(textline) {
  var patches = [];
  if (!textline) {
    return patches;
  }
  var text = textline.split("\n");
  var textPointer = 0;
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (textPointer < text.length) {
    var m3 = text[textPointer].match(patchHeader);
    if (!m3) {
      throw new Error("Invalid patch string: " + text[textPointer]);
    }
    var patch = new diff_match_patch.patch_obj();
    patches.push(patch);
    patch.start1 = parseInt(m3[1], 10);
    if (m3[2] === "") {
      patch.start1--;
      patch.length1 = 1;
    } else if (m3[2] == "0") {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = parseInt(m3[2], 10);
    }
    patch.start2 = parseInt(m3[3], 10);
    if (m3[4] === "") {
      patch.start2--;
      patch.length2 = 1;
    } else if (m3[4] == "0") {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = parseInt(m3[4], 10);
    }
    textPointer++;
    while (textPointer < text.length) {
      var sign = text[textPointer].charAt(0);
      try {
        var line = decodeURI(text[textPointer].substring(1));
      } catch (ex) {
        throw new Error("Illegal escape in patch_fromText: " + line);
      }
      if (sign == "-") {
        patch.diffs.push([DIFF_DELETE, line]);
      } else if (sign == "+") {
        patch.diffs.push([DIFF_INSERT, line]);
      } else if (sign == " ") {
        patch.diffs.push([DIFF_EQUAL, line]);
      } else if (sign == "@") {
        break;
      } else if (sign === "")
        ;
      else {
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
      }
      textPointer++;
    }
  }
  return patches;
};
diff_match_patch.patch_obj = function() {
  this.diffs = [];
  this.start1 = null;
  this.start2 = null;
  this.length1 = 0;
  this.length2 = 0;
};
diff_match_patch.patch_obj.prototype.toString = function() {
  var coords1, coords2;
  if (this.length1 === 0) {
    coords1 = this.start1 + ",0";
  } else if (this.length1 == 1) {
    coords1 = this.start1 + 1;
  } else {
    coords1 = this.start1 + 1 + "," + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ",0";
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = this.start2 + 1 + "," + this.length2;
  }
  var text = ["@@ -" + coords1 + " +" + coords2 + " @@\n"];
  var op;
  for (var x2 = 0; x2 < this.diffs.length; x2++) {
    switch (this.diffs[x2][0]) {
      case DIFF_INSERT:
        op = "+";
        break;
      case DIFF_DELETE:
        op = "-";
        break;
      case DIFF_EQUAL:
        op = " ";
        break;
    }
    text[x2 + 1] = op + encodeURI(this.diffs[x2][1]) + "\n";
  }
  return text.join("").replace(/%20/g, " ");
};
globalThis["diff_match_patch"] = diff_match_patch;
globalThis["DIFF_DELETE"] = DIFF_DELETE;
globalThis["DIFF_INSERT"] = DIFF_INSERT;
globalThis["DIFF_EQUAL"] = DIFF_EQUAL;
var diff_match_patch$1 = { diff_match_patch, DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL };
var diff_match_patch$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diff_match_patch,
  DIFF_DELETE,
  DIFF_INSERT,
  DIFF_EQUAL,
  "default": diff_match_patch$1
}, Symbol.toStringTag, { value: "Module" }));
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}
var defaultOptions$1 = {};
function getDefaultOptions() {
  return defaultOptions$1;
}
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}
function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}
var MILLISECONDS_IN_DAY = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}
var MILLISECONDS_IN_WEEK$1 = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}
var formatters$2 = {
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  h: function h(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var formatters$3 = formatters$2;
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return formatters$3.y(date, token);
  },
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return formatters$3.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  I: function I(date, token, localize2) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return formatters$3.d(date, token);
  },
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  B: function B(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  h: function h2(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return formatters$3.h(date, token);
  },
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return formatters$3.H(date, token);
  },
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return formatters$3.m(date, token);
  },
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return formatters$3.s(date, token);
  },
  S: function S2(date, token) {
    return formatters$3.S(date, token);
  },
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var formatters$1 = formatters;
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters$1 = longFormatters;
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var formatDistance$1 = formatDistance;
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatLong$1 = formatLong;
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative$1 = formatRelative;
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var localize$1 = localize;
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var match$1 = match;
var locale = {
  code: "en-US",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var defaultLocale = locale;
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters$1[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters$1[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
const UNHIDE = "unhide";
const NONDIFFHIDE = "nonDiffHide";
const INSERTED = "inserted";
const REMOVED = "removed";
const SNIPPEDCLASS = "snip";
const INS = "ins";
const MOV = "mov";
const DEL = "del";
const SPAN = "span";
const ANCHOR = "a";
const SNIPPEDTEXT = "[...snipped...]";
const HREF_ATTRIBUTE = { href: "#" };
function defaultOptions(options) {
  if (!options) {
    options = {};
  }
  if (!options.handleMove) {
    options.handleMove = false;
  }
  return options;
}
function diff_prettyHtml(diffs, unhide_char_limit = 200, options) {
  options = defaultOptions(options);
  let html = [];
  let pattern_amp = /&/g;
  let pattern_lt = /</g;
  let pattern_gt = />/g;
  let pattern_para = /\n/g;
  for (let x2 = 0; x2 < diffs.length; x2++) {
    let op = diffs[x2][0];
    let data = diffs[x2][1];
    const moveId = diffs[x2][2];
    let attributes = {};
    if (moveId) {
      attributes["data-move-id"] = moveId;
    }
    let nextOp;
    let prevOp;
    if (diffs[x2 + 1] && diffs[x2 + 1][0]) {
      nextOp = diffs[x2 + 1][0];
    }
    if (diffs[x2 - 1] && diffs[x2 - 1][0]) {
      prevOp = diffs[x2 - 1][0];
    }
    let text = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "&para;<br>");
    switch (op) {
      case DIFF_INSERT:
        if (moveId && options.handleMove) {
          html[x2] = addHtmlTags(MOV, INSERTED, text, attributes);
        } else {
          html[x2] = addHtmlTags(INS, INSERTED, text, attributes);
        }
        break;
      case DIFF_DELETE:
        if (moveId && options.handleMove) {
          html[x2] = addHtmlTags(MOV, REMOVED, text, attributes);
        } else {
          html[x2] = addHtmlTags(DEL, REMOVED, text, attributes);
        }
        break;
      case DIFF_EQUAL:
        if (text.length <= unhide_char_limit || text.length <= unhide_char_limit * 2) {
          html[x2] = addHtmlTags(SPAN, UNHIDE, text);
        } else if (text.length > unhide_char_limit * 2) {
          let unhideContentFront;
          let unhideContentRear;
          let remainingPartLength;
          let nonDiffHide;
          let parts = [];
          if (!prevOp && nextOp) {
            unhideContentRear = text.substring(text.length - unhide_char_limit);
            unhideContentFront = "";
            nonDiffHide = text.substring(0, text.length - unhide_char_limit);
          } else if (prevOp && !nextOp) {
            unhideContentRear = "";
            unhideContentFront = text.substring(0, unhide_char_limit);
            nonDiffHide = text.substring(unhide_char_limit);
          } else {
            unhideContentFront = text.substring(0, unhide_char_limit);
            unhideContentRear = text.substring(text.length - unhide_char_limit);
            remainingPartLength = Math.max(0, text.length - 2 * unhide_char_limit);
            nonDiffHide = text.substring(unhide_char_limit, unhide_char_limit + remainingPartLength);
          }
          if (unhideContentFront)
            parts.push(addHtmlTags(SPAN, UNHIDE, unhideContentFront));
          if (nonDiffHide)
            parts.push(addHtmlTags(SPAN, NONDIFFHIDE, nonDiffHide));
          parts.push(addHtmlTags(ANCHOR, SNIPPEDCLASS, SNIPPEDTEXT, HREF_ATTRIBUTE));
          if (unhideContentRear)
            parts.push(addHtmlTags(SPAN, UNHIDE, unhideContentRear));
          if (parts.length) {
            html[x2] = parts.join("");
          }
        }
        break;
    }
  }
  return html.join("");
}
function addHtmlTags(tagName, className, text, attributes) {
  const attributeString = Object.entries(attributes || {}).map(([key, value]) => `${key}="${value}"`).join(" ");
  return `<${tagName} class="${className}" ${attributeString}>${text}</${tagName}>`;
}
class TextDiff {
  constructor() {
    this.type = "text";
    this.unhide_char_limit = 200;
  }
  async init() {
    if (!this.dmp) {
      const diff_match_patch2 = await __vitePreload(() => Promise.resolve().then(function() {
        return diff_match_patch$2;
      }), true ? void 0 : void 0);
      this.dmp = new diff_match_patch2.diff_match_patch();
    }
  }
  async _diff(data1, data2) {
    await this.init();
    const a3 = this.dmp.diff_wordsToChars_(data1.replace(/\s+/g, " "), data2.replace(/\s+/g, " "));
    const diff = this.dmp.diff_main(a3.chars1, a3.chars2, false);
    this.dmp.diff_cleanupSemantic(diff);
    this.dmp.diff_charsToLines_(diff, a3.wordArray);
    return diff;
  }
  async diff(data1, data2) {
    const diff = await this._diff(data1, data2);
    const addedText = this.getAdditions(diff);
    const deletedText = this.getDeletions(diff);
    return {
      diff,
      addedText,
      deletedText
    };
  }
  async render(diff) {
    await this.init();
    return diff_prettyHtml(diff, this.unhide_char_limit);
  }
  isHTML(str) {
    return false;
  }
  async renderEmail(diffHtml, { emailOpts, newText } = {}) {
    const cheerio = await __vitePreload(() => import("./index.2db26bd4.js"), true ? ["assets/index.2db26bd4.js","assets/load-parse.47abd3e8.js","assets/index.821ff0ec.js"] : void 0);
    const { highlighted = true, mode = "SPLIT", snipped = true, oldTs } = emailOpts;
    if (!emailOpts) {
      throw new Error("Email options are required");
    }
    let result;
    if (highlighted) {
      let $1 = cheerio.load(diffHtml);
      let $2;
      setDiffStyle($1);
      if (snipped) {
        this.snip($1);
      } else {
        $1(".snip").css("display", "none");
      }
      switch (mode) {
        case "NONE":
          $1(".removed").remove();
          break;
        case "SPLIT":
          $2 = cheerio.load($1.html());
          $2(".inserted").remove();
          $1(".removed").remove();
          break;
      }
      if ($2) {
        let topHTML = $1("body").html(), bottomHTML = $2("body").html(), formattedDate = format(new Date(oldTs), "yyyy-MM-dd h:mm:ss a");
        result = `
            <div id="highlighted-split">
            <div id="v1" style='margin-bottom: 20px; padding: 10px; background-color: #fff;border-left: solid 1px #666;'>${topHTML}</div>
            <div>
              <h2 style='margin-bottom: 4px; padding: 0 2px'>Previous ${formattedDate}</h2>
            </div>
            <div id="v2" style="padding: 10px; background-color: #fff;border-left: solid 1px #666;">${bottomHTML}</div>
            </div>
            `;
      } else {
        result = `<div id='highlighted-inlined'>${$1("body").html()}</div>`;
      }
    } else {
      const diffHTML = this.isHTML(newText) ? newText : `<html><body>${newText}</body></html>`;
      return diffHTML.replace(/^<html/, `<html id='highlighted-none'`);
    }
    return result;
  }
  async diffAndRender(data1, data2) {
    const { diff } = await this.diff(data1, data2);
    return await this.render(diff);
  }
  async diffAndRenderEmail(oldText, newText, opts) {
    const diff = await this.diffAndRender(oldText, newText);
    return await this.renderEmail(diff, { ...opts, newText });
  }
  snip($1) {
    $1(".nonDiffHide").remove();
  }
  getAdditions(diff) {
    return diff.reduce(function(buff, aDiff) {
      if (aDiff[0] === 1) {
        buff.push(aDiff[1]);
      }
      return buff;
    }, []).join(" ");
  }
  getDeletions(diff) {
    return diff.reduce(function(buff, aDiff) {
      if (aDiff[0] === -1) {
        buff.push(aDiff[1]);
      }
      return buff;
    }, []).join(" ");
  }
}
var textDiff = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": TextDiff
}, Symbol.toStringTag, { value: "Module" }));
export { DIFF_EQUAL as D, TextDiff as T, DIFF_DELETE as a, diff_match_patch as d, textDiff as t };
