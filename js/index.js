/**
 * Created by CQ on 2017/4/17.
 */
window.onload = function () {
    var canvas = document.getElementById("canvas");

    /*
     设置canvas宽高
     *  canvas.width=1014;
     canvas.height=768;
     * */


    if (canvas.getContext("2d")) {
        //得到绘图的上下文环境
        var context = canvas.getContext("2d");

        /*分割多条context绘制
         *  context.beginPath();
         * context.closePath();
         * */
        context.beginPath();
        context.moveTo(100, 100);
        context.lineTo(700, 700);
        context.lineTo(100, 700);
        context.lineTo(100, 100);
        context.closePath();

        /* context.fillStyle="rgb(2,100,30)";
         // 用于填充
         context.fill();*/

        context.lineWidth = 5;
        context.strokeStyle = "red";
        //用于绘制线条
        context.stroke();
        context.beginPath();
        context.moveTo(200, 100);
        context.lineTo(700, 600);
        context.closePath();
        context.strokeStyle = "black";
        context.stroke();

    } else {
        alert("不支持canvas,请更换浏览器！")
    }

};


