{
  const script = document.currentScript;
  navigator.__defineGetter__("userAgent", function () {
    return script.dataset.useragent;
  });
}