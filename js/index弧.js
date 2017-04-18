/**
 * Created by CQ on 2017/4/17.
 */


    window.onload= function () {
        var canvas=document.getElementById("canvas");
        if(canvas.getContext("2d")){
            var context=canvas.getContext("2d");
context.lineWidth=5;
            context.strokeStyle="red";
            /*context.arc(300,300,200,0,2*Math.PI);
            context.stroke();

            context.fillStyle="red"
            context.fill();*/


            for(var i=0;i<10;i++){
                context.beginPath();
                context.arc(50+i*100,60,40,0,2*Math.PI*(i+1)/10);
                context.closePath();
                context.stroke();
            }

            for(var i=0;i<10;i++){
                context.beginPath();
                context.arc(50+i*100,180,40,0,2*Math.PI*(i+1)/10);
                context.stroke();
            }


            for(var i=0;i<10;i++){
                context.beginPath();
                context.arc(50+i*100,300,40,0,2*Math.PI*(i+1)/10,true);
                context.fill();
            }

        }else {
            alert("不支持canvas,请更换浏览器！")
        }

    };


