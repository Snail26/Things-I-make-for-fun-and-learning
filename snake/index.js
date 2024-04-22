/*
All code made by snail no tuorials were used in the creation of this code.
This took me about 5 hours of my time and you will not find similar code in any tutorials this is my 100% raw work in five hours.
*/

const game = document.getElementById("game");
let inGame = false;
const size = Math.ceil((Math.round(window.innerHeight / 2)+1)/10)*10;
let applePos = Math.ceil((Math.floor(Math.random() * size)+1)/10)*10 + ", " + Math.ceil((Math.floor(Math.random() * size)+1)/10)*10;
document.getElementById("apple").style.left = applePos.split(", ")[0] + "px";
document.getElementById("apple").style.top = applePos.split(", ")[1] + "px";
document.getElementById("apple").style.width = size / 20 + "px";
document.getElementById("apple").style.height = size / 20 + "px";
let lastSegment = "";
let direction = "y+10";
let selfDieCooldown = false;
let segments = [{
    "position": "0, 0",
    "node": document.createElement("section")
}];
document.getElementById("snake").appendChild(segments[0]["node"]);
segments[0]["node"].style.width = size / 20 + "px";
segments[0]["node"].style.height = size / 20 + "px";
segments[0]["node"].style.backgroundColor = "green";
game.style.left = size + "px";
game.style.width = window.innerWidth / 2 + "px";
game.style.height = size + "px";
if (localStorage?.getItem("hs") != undefined) {
    document.getElementById("score").innerText = `High Score: ${localStorage?.getItem("hs")}`;
}
document.getElementById("startBtn").addEventListener("click", () => {
    window.setTimeout(() => {
        document.getElementById("score").innerText = `Score: ${Number(segments.length) - 1}`;
        inGame = true;
        document.getElementById("startBtn").style.display = "none";
        document.getElementById("gameSection").style.display = "block";
        window.addEventListener("keydown", (e) => {
            if (inGame) {
                if (e.key == "w" || e.key == "ArrowUp") {
                    direction = "y-10";
                }
                if (e.key == "a" || e.key == "ArrowLeft") {
                    direction = "x-10";
                }
                if (e.key == "s" || e.key == "ArrowDown") {
                    direction = "y+10";
                }
                if (e.key == "d" || e.key == "ArrowRight") {
                    direction = "x+10";
                }
            }
        });
        window.setInterval(() => {
            if (inGame) {
                lastSegment = "";
                segments.forEach((segment) => {
                    let unEdited = {
                        "position": segment["position"],
                        "node": segment["node"]
                    };
                    if (lastSegment == "") {
                        segment["position"] = direction.substring(0, 1) == "x" ? eval(segment["position"].split(", ")[0] + direction.substring(1, direction.length)) + ", " +  segment["position"].split(", ")[1]: segment["position"].split(", ")[0] + ", " + eval(segment["position"].split(", ")[1] + direction.substring(1, direction.length));
                    }
                    else {
                        segment["position"] = lastSegment["position"];
                    }
                    segment["node"].style.left = segment["position"].split(", ")[0] + "px";
                    segment["node"].style.top = segment["position"].split(", ")[1] + "px";
                    lastSegment = unEdited;
                    segments.forEach((segment1) => {
                        if (segment["position"] == segment1["position"] && segment != segment1) {
                            if (selfDieCooldown == false) {
                                die();
                            }
                            selfDieCooldown = false;
                        }
                    });
                    if (segments[0]["position"] == applePos) {
                        addSegment(segment["position"]);
                        applePos = Math.ceil((Math.floor(Math.random() * size)+1)/10)*10 + ", " + Math.ceil((Math.floor(Math.random() * size)+1)/10)*10;
                        document.getElementById("apple").style.left = applePos.split(", ")[0] + "px";
                        document.getElementById("apple").style.top = applePos.split(", ")[1] + "px";
                        selfDieCooldown = true;
                        document.getElementById("score").innerText = `Score: ${Number(segments.length) - 1}`;
                    }
                });
                lastSegment = "";
                if (Number(segments[0]["position"].split(", ")[0]) < 0 || Number(segments[0]["position"].split(", ")[0]) > window.innerWidth / 2 || Number(segments[0]["position"].split(", ")[1]) < 0 || Number(segments[0]["position"].split(", ")[1]) > size) {
                    die();
                }
            }
        }, 250);
    }, 250);
});

function addSegment(pos) {
    const segment = document.createElement("section");
    document.getElementById("snake").appendChild(segment);
    segment.style.width = size / 20 + "px";
    segment.style.height = size / 20 + "px";
    segments.push({
        "position": pos,
        "node": segment
    });
}

function die() {
    inGame = false;
    segments[0]["node"].style.backgroundColor = "red";
    window.setInterval(() => {
        segments.forEach((segment) => {
            segment["position"] = segment["position"].split(", ")[0] + ", " + (Number(segment["position"].split(", ")[1]) + 10);
            segment["node"].style.top = segment["position"].split(", ")[1] + "px";
        });
    }, 250);
    window.setTimeout(() => {
        if (Number(localStorage?.getItem("hs") == undefined ? 0 : localStorage?.getItem("hs")) < segments.length) {
            localStorage["setItem"]("hs", segments.length - 1);
        }
        location.reload();
    }, 2500);
}