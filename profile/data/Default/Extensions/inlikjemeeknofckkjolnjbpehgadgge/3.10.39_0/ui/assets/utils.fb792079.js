const JSON_MAIL_STYLES = {
  "inserted": {
    "background": "#bbffbb",
    "padding": "2px 6px"
  },
  "removed": {
    "background": "#ffbbbb",
    "padding": "2px 6px"
  },
  "tv-sm": {
    "padding": "6px",
    "height": "fit-content",
    "align-items": "center"
  },
  "tv-md": {
    "padding": "8px",
    "height": "fit-content",
    "align-items": "center"
  },
  "tv-lg": {
    "padding": "10px",
    "height": "fit-content",
    "align-items": "center"
  },
  "break-long-words": {
    "word-break": "break-all",
    "white-space": "normal"
  },
  "tv-tree-item": {
    "outline": "none",
    "border-left": "4px solid transparent"
  },
  "tv-tree-meta": {
    "outline": "none",
    "border-right": "#eeeeee 1px solid"
  },
  "tv-tree-item:hover": {
    "background-color": "#e5e5e5"
  },
  "tv-container:hover": {
    "background-color": "#e5e5e5"
  },
  "tv-container": {
    "border-bottom": "#eeeeee 1px solid",
    "max-width": "50vw"
  },
  "tv-key": {
    "border-right": "#eeeeee 1px solid"
  },
  "w-auto": {
    "width": "auto"
  },
  "overflow-auto": {
    "overflow": "auto"
  },
  "bg-white": {
    "background-color": "rgba(255, 255, 255)"
  },
  "border-collapse": {
    "border-collapse": "collapse"
  },
  "w-75": {
    "width": "75%"
  },
  "m-10": {
    "margin": "10px"
  },
  "table-border": {
    "border": "1px solid #eeeeee"
  },
  "inline-block": {
    "display": "inline-block"
  },
  "w-45": {
    "width": "45%"
  },
  "max-width-45": {
    "max-width": "45%"
  },
  "no-wrap": {
    "white-space": "nowrap"
  },
  "float-left": {
    "float": "left"
  },
  "mr-4": {
    "margin-right": "4px"
  },
  "w-full": {
    "width": "100%"
  }
};
function setDiffStyle($1) {
  $1("link,style").remove();
  $1(".removed").css("background-color", "#ff9494");
  $1("a.removed, a .removed").css("color", "#008");
  $1(".inserted").css("background-color", "#b7fdcb");
  $1("span.inserted, span.removed").css("padding", "1px 4px");
  $1("img.removed").css({ border: "solid 2px red", "background-color": "transparent", padding: "2px" });
  $1("img.inserted").css({ border: "solid 2px green", "background-color": "transparent", padding: "2px" });
  $1("ins, del").css({ "text-decoration": "none" });
}
function setJSONDiffStyle($1) {
  Object.entries(JSON_MAIL_STYLES).forEach(([key, value]) => {
    $1(`.${key}`).css(value);
  });
}
export { setJSONDiffStyle as a, setDiffStyle as s };
