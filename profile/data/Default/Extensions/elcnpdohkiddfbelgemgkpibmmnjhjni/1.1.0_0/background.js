chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlContains: 'web.whatsapp'},
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});
console.log("Background JS Loaded");
var speed = 1;
var volume = 1;
var pane = 0;
var theme = "l";
/**
 * Themes
 * Light: l
 * Dark: d
 */
var currentTab;
//Update icon
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabArray) {
        if (tabArray && tabArray[0]) {
            chrome.pageAction.setIcon({tabId: tabArray[0].id, path: 'images/icon' + theme + +request.speed + 'x.png'});
        }
    });
});

function updateStoredValues(speed, volume, pane) {

    chrome.storage.sync.set({'speed': speed, 'volume': volume, 'pane': pane});

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        console.log(tabs)
        chrome.tabs.sendMessage(tabs[0].id, {speed: speed, volume: volume});
    });
}

function setVolume(tvolume) {
    volume = tvolume;
    var cont = document.querySelector(".scroller .volume ul");
    if (cont == null) {
        return
    }
    var volumetext = document.querySelector(".volume .value");

    var height = 0
    for (var i = 0; i < cont.children.length; i++) {
        if (cont.children[i].getAttribute("data-value") == volume) {
            height = 120 * i;
        }
    }
    volumetext.textContent = (volume * 100).toString() + "%";
    updateStoredValues(speed, volume, pane)

    Velocity(cont, "stop");
    Velocity(cont, {top: -height + "px"}, {duration: 750, easing: [0.19, 1, 0.22, 1]});
}

function setSpeed(tspeed) {
    speed = tspeed;
    var cont = document.querySelector(".scroller .speed ul");
    var speedtext = document.querySelector(".speed .value");
    var height = 0
    for (var i = 0; i < cont.children.length; i++) {
        if (cont.children[i].getAttribute("data-value") == speed) {
            height = 120 * i;
        }
    }

    speedtext.textContent = speed + "x";
    updateStoredValues(speed, volume, pane);
    Velocity(cont, "stop");
    Velocity(cont, {top: -height + "px"}, {duration: 750, easing: [0.19, 1, 0.22, 1]});
}

function changeSpeed(curSpeed, type) {
    var newSpeed;
    if (type < 0) {
        switch (curSpeed) {
            case 0.5:
                newSpeed = 0.5;
                break;
            case 1:
                newSpeed = 0.5;
                break;
            case 1.25:
                newSpeed = 1;
                break;
            case 1.5:
                newSpeed = 1.25;
                break;
            case 2:
                newSpeed = 1.5;
                break;
            default:
                newSpeed = 1;
                break;
        }
        setSpeed(newSpeed);
    } else {
        switch (curSpeed) {
            case 0.5:
                newSpeed = 1;
                break;
            case 1:
                newSpeed = 1.25;
                break;
            case 1.25:
                newSpeed = 1.5;
                break;
            case 1.5:
                newSpeed = 2;
                break;
            case 2:
                newSpeed = 2;
                break;
            default:
                newSpeed = 1;
                break;
        }
        setSpeed(newSpeed);
    }
}

document.addEventListener('DOMContentLoaded', function () {
            chrome.storage.sync.get(['speed', 'volume', 'pane'], function (items) {
                //console.log(items.pane)
                speed = items.speed || speed;
                volume = items.volume || volume;
                pane = items.pane || pane;
                var scrollers = document.querySelector(".scrollers");
                if(scrollers != null){
                setVolume(volume);
                setSpeed(speed);
                
                    scrollers.addEventListener('wheel', function (e) {
                        if (pane == 0) {
                            changeSpeed(speed, -1 * e.deltaY);
                        } else {
                            if (e.deltaY > 0) {
                                volume = Math.max(0, Math.round(volume * 100 - 1) / 100);
                                //console.log(volume)
                                setVolume(volume);
                            } else {
                                volume = Math.min(1, Math.round(volume * 100 + 1) / 100);
                                //console.log(volume)
                                setVolume((volume));
                            }
                        }
                    })

                    for (var a = 0; a < cont.length; a++) {
                        var thispeed = cont[a].querySelector(".speed");
                        var thisvolume = cont[a].querySelector(".volume");
                        if (pane == 0 && thisvolume.classList.contains("current")) {
                            dualToggleClass(thispeed, thisvolume, "current");
                            dualToggleClass(speedController, volumeController, "current");
                            scrollers.classList.remove("down");
                            scrollers.classList.add("up");
                        } else if (pane == 1 && thispeed.classList.contains("current")) {
                            dualToggleClass(thispeed, thisvolume, "current");
                            dualToggleClass(speedController, volumeController, "current");
                            scrollers.classList.remove("up");
                            scrollers.classList.add("down");
                        }
                    }
                }
            });
            var speedController = document.querySelector(".controller.speed");
            if(speedController != null){
                var speedControllerAnimation = materialButtonAnimation();
                speedControllerAnimation.init({el: speedController})

                var volumeController = document.querySelector(".controller.volume");
                var volumeControllerAnimation = materialButtonAnimation();
                volumeControllerAnimation.init({el: volumeController})

                var volumeContainer = document.querySelector(".scroller .volume ul");
                var scrollers = document.querySelector(".scrollers");
                if (volumeContainer != null) {
                    fillVolume(volumeContainer)
                }
                var cont = document.querySelectorAll('.scroller');

                var arrowUp = document.querySelector(".arrow.top");
                var arrowDown = document.querySelector(".arrow.bottom");

                var arrowUpAnimation = materialButtonAnimation();
                arrowUpAnimation.init({el: arrowUp, down: "#28c761"});
                var arrowDownAnimation = materialButtonAnimation();
                arrowDownAnimation.init({el: arrowDown, down: "#28c761"});

                arrowDown.addEventListener("click", function () {
                    if (speedController.classList.contains("current")) {
                        changeSpeed(speed, -1);
                    } else {
                        volume = Math.max(0, Math.round(volume * 100 - 1) / 100);
                        setVolume(volume);
                    }
                })
                arrowUp.addEventListener("click", function () {
                    if (speedController.classList.contains("current")) {
                        changeSpeed(speed, 1);
                    } else {
                        volume = Math.min(1, Math.round(volume * 100 + 1) / 100);
                        setVolume(volume);
                    }
                })
                /*MOUSEWHEEL SUPPORT
                .addEventListener('wheel', function (e) {
                  var curSpeed = parseFloat(slider.noUiSlider.get());
                  console.log(curSpeed)
                  var newSpeed = 0;
                  if (e.deltaY > 0) {
                    switch (curSpeed) {
                      case 0.25: newSpeed = 0.25; break;
                      case 0.5: newSpeed = 0.25; break;
                      case 1: newSpeed = 0.5; break;
                      case 1.25: newSpeed = 1; break;
                      case 1.5: newSpeed = 1.25; break;
                      case 2: newSpeed = 1.5; break;
                      default: newSpeed = 1; break;
                    }
                    slider.noUiSlider.set(newSpeed)
                  } else {
                    switch (curSpeed) {
                      case 0.25: newSpeed = 0.5; break;
                      case 0.5: newSpeed = 1; break;
                      case 1: newSpeed = 1.25; break;
                      case 1.25: newSpeed = 1.5; break;
                      case 1.5: newSpeed = 2; break;
                      case 2: newSpeed = 2; break;
                      default: newSpeed = 1; break;
                    }
                    slider.noUiSlider.set(newSpeed)
                  }
                })
                */

                speedController.addEventListener("click", function () {
                    for (var a = 0; a < cont.length; a++) {
                        var thispeed = cont[a].querySelector(".speed");
                        var thisvolume = cont[a].querySelector(".volume");

                        if (thisvolume.classList.contains("current")) {
                            pane = 0;
                            updateStoredValues(speed, volume, 0)
                            dualToggleClass(thispeed, thisvolume, "current");
                            dualToggleClass(speedController, volumeController, "current");
                            dualAnimator(thisvolume, thispeed, "zoomIn" + a, "zoomOut" + a);
                            scrollers.classList.remove("down");
                            scrollers.classList.add("up");
                        }
                    }
                });

                volumeController.addEventListener("click", function () {
                    for (var a = 0; a < cont.length; a++) {
                        var thispeed = cont[a].querySelector(".speed");
                        var thisvolume = cont[a].querySelector(".volume");

                        if (thispeed.classList.contains("current")) {
                            pane = 1;
                            updateStoredValues(speed, volume, 1)
                            dualToggleClass(thispeed, thisvolume, "current");
                            dualToggleClass(speedController, volumeController, "current");
                            dualAnimator(thispeed, thisvolume, "zoomIn" + a, "zoomOut" + a);
                            scrollers.classList.remove("up");
                            scrollers.classList.add("down");
                        }
                    }
                    /*if (speedContainer.classList.contains("current")) {
                      dualToggleClass(speedContainer, volumeContainer, "current");
                      dualAnimator(speedContainer, volumeContainer, "zoomIn", "zoomOut")
                    } else if(volumeContainer.classList.contains("current")) {
                      dualToggleClass(speedContainer, volumeContainer, "current");
                      dualAnimator(volumeContainer, speedContainer, "zoomIn", "zoomOut")

                    }*/
                });
            }
});

function fillVolume(el) {
    for (var i = 0; i <= 100; i = i + 1) {
        var current = document.createElement("li");
        current.setAttribute("data-value", i / 100);
        current.setAttribute("data-valuelog", (Math.exp(i / 100) - 1) / (Math.E - 1));
        current.innerHTML = i + "%"
        el.appendChild(current)
    }
}

function dualToggleClass(el1, el2, name) {
    el1.classList.toggle(name);
    el2.classList.toggle(name);
}

function dualAnimator(el1, el2, name1, name2) {
    el1.classList.remove(name1)
    el1.classList.add(name2)
    el2.classList.remove(name2)
    el2.classList.add(name1)
}

function materialButtonAnimation() {
    var opts = {
        el: document.querySelector(".control.volume"),
        down: "#E0E0E0"
    }
    var public = {
        init: function (newOpts) {
            for (var i in opts) {
                console.log(i)
                opts[i] = newOpts[i] || opts[i]
            }
            var circle = document.createElement("div");
            circle.className = "materialCircle"
            console.log("test")
            if (("el" in opts) && (opts.el != null)) {
                opts.el.appendChild(circle);
                opts.el.addEventListener("mousedown", function (e) {
                    opts.el.style.backgroundColor = opts.down
                    circle.classList.remove("animMaterial");
                })
                opts.el.addEventListener("mouseup", function (e) {
                    opts.el.style.backgroundColor = "";
                    circle.style.top = e.layerY;
                    circle.style.left = e.layerX;
                    circle.classList.add("animMaterial");

                })
            }
        }
    }
    return public;
}
