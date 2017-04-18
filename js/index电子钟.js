/**
 * Created by CQ on 2017/4/17.
 */
var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARFIN_LEFT = 56;
const endTime = new Date(2017, 3, 18, 08, 47, 52);
var curShowTimeSeconds = 0;
var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FF8800", "#FF4444"];

window.onload = function () {
    var canvas = document.getElementById("canvas");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    if (canvas.getContext("2d")) {
        var context = canvas.getContext("2d");
        curShowTimeSeconds = getCurrentShowSeconds();
        setInterval(function () {
            render(context);
            update();
        }, 50);

    } else {
        alert("不支持canvas,请更换浏览器！")
    }

};

function getCurrentShowSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000);
    return ret >= 0 ? ret : 0;
}
function update() {
    var nextShowTimeSeconds = getCurrentShowSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARFIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }

        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARFIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARFIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }

        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARFIN_LEFT + 57 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARFIN_LEFT + 81 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }

        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARFIN_LEFT + 96 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        }


        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= (WINDOW_HEIGHT - RADIUS)) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    var cnt=0;
    for(var i=0;i<balls.length;i++){
        if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH){
            balls[cnt++]=balls[i];
        }
    }

    while (balls.length>cnt){
        balls.pop();
    }
    console.log(balls.length);
}

function addBalls(x, y, num) {
    for (var i = 0; i < dijit[num].length; i++) {
        for (var j = 0; j < dijit[num][i].length; j++) {
            if (dijit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]

                };

                balls.push(aBall);
            }
        }
    }
}
function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;


    renderDigit(MARFIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARFIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARFIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARFIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARFIN_LEFT + 57 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARFIN_LEFT + 72 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

    renderDigit(MARFIN_LEFT + 81 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARFIN_LEFT + 96 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();
    }

}


function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < dijit[num].length; i++) {
        for (var j = 0; j < dijit[num][i].length; j++) {
            if (dijit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
