var speed = 1;
var volume = 1;

document.querySelectorAll("body")[0].addEventListener("DOMNodeInserted", function (e) {
    chrome.storage.sync.get(['speed', 'volume'], function (items) {
        speed = items.speed || speed;
        volume = items.volume || volume;
    });

    if (e.target.tagName) {
        updateAudio({ speed: speed, volume: volume });
    }
});




let newauds = []

let listeners = {}

const controller = new AbortController();
var k = 0
function updateAudio(props) {
    let matches = document.querySelectorAll("audio:not(.zapp_fakeNode)");

    function shutDownAudio(speed, data) {
        data.target.playbackRate=speed
        data.target.volume=0
        return;
    }
    for (let i = 0; i < matches.length; i++) {

        if (matches[i].classList.contains("zapp_seen")) {
            let identifier_number = -1
            let old_speed = -1
            for (let class_i = 0; class_i < matches[i].classList.length; class_i++) {
                if (matches[i].classList[class_i].startsWith("zapp_original-")) {
                    identifier_number = parseInt(matches[i].classList[class_i].split("-")[1])
                }
                if (matches[i].classList[class_i].startsWith("zapp_speed-")) {
                    old_speed = parseFloat(matches[i].classList[class_i].split("-")[1])
                }
            }
            let matched_fake_audios = document.querySelectorAll("audio.zapp_fakeNode.zapp_identifier-" + identifier_number);
            if (old_speed !== props.speed) {
                matches[i].classList.remove("zapp_speed-" + old_speed);
                matches[i].classList.add("zapp_speed-" + props.speed);
                matches[i].removeEventListener('playing', listeners[identifier_number])
                matches[i].removeEventListener('ratechange', listeners[identifier_number]);

                listeners[identifier_number] = shutDownAudio.bind(this, props.speed)
                matches[i].addEventListener('playing', listeners[identifier_number]);
                matches[i].addEventListener('ratechange', listeners[identifier_number]);
                matches[i].playbackRate = props.speed

                matched_fake_audios[0].playbackRate = props.speed
            }
            matched_fake_audios[0].volume = props.volume
            


        } else {
            matches[i].classList.add("zapp_seen");
            matches[i].classList.add("zapp_original-" + k);
            matches[i].classList.add("zapp_speed-" + props.speed);
            listeners[k] = shutDownAudio.bind(this, props.speed)
            matches[i].addEventListener('playing', listeners[k]);
            matches[i].addEventListener('ratechange', listeners[k]);

            let el = matches[i].cloneNode();
            el.className = "";
            el.classList.add("zapp_fakeNode");
            el.classList.add("zapp_identifier-" + k);
            matches[i].addEventListener('playing', (data)=>{
                el.currentTime = matches[i].currentTime
                el.play()
            });
            matches[i].addEventListener('onseeked', (data)=>{
                el.currentTime = matches[i].currentTime
            });
            matches[i].addEventListener('pause', (data)=>{
                el.pause()
            });
            el.playbackRate = props.speed
            el.volume = props.volume
            document.body.appendChild(el);

            k++;
        }

    }
    chrome.runtime.sendMessage(props);

}
function getSpeed() {
    text = "";
    var matches = document.querySelectorAll("audio");
    for (var i = 0; i < matches.length; i++) {

        text += "ID: " + i + " VALUE: " + matches[i].playbackRate + " Current speed: " + speed + "\n";

    }
    console.log(text)
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    updateAudio(request)
});