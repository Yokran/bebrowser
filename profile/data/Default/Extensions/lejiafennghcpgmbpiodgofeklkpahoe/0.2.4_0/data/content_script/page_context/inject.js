{
  const _useragent = navigator.userAgent;
  //
  Object.defineProperty(navigator, "userAgent", {
    "get": function () {
      const useragent = localStorage.getItem("custom-useragent-string-ua");
      return useragent ? useragent : _useragent;
    }
  });
}
