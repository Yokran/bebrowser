function CookieStore(prefix) {
  prefix || (prefix = "_s");
  this.__init__ = function(cb) {
    cb && cb();
  };
  this.del = function(key) {
    key = prefix + key;
    document.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };
  this.get = function(key) {
    key = prefix + key;
    const val = unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*)|.*"), "$1"));
    return val ? JSON.parse(val) : void 0;
  };
  this.set = function(key, val) {
    key = prefix + key;
    document.cookie = escape(key) + "=" + escape(JSON.stringify(val)) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  };
  this.getAll = function() {
    let keyValuePairs = [];
    let cookieArray;
    if (document.cookie) {
      cookieArray = document.cookie.trim().split(";").map((el) => el.trim().slice(2));
      cookieArray.forEach((item) => {
        let parts = item.split("=");
        let key = parts[0];
        let value = this.get(key);
        keyValuePairs.push({ key, value });
      });
    }
    return keyValuePairs;
  };
}
export { CookieStore as default };
