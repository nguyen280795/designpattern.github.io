var mySinChart = function (options) {
    this.sinChart = function () {
        var myCanvas = document.getElementById(options.canvas);
        var myCtx = myCanvas.getContext("2d");

        var privateNameChart = options.nameChart;
        var privateNameRank = "RANK SCORE RANK";

        var privateCenter = [myCanvas.width / 5, myCanvas.height / 8];

        var privateAxisX = options.data.length;
        var privateAxisY = 4;
        var privateLineAxis = 2.5;
        var privateSpaceX = 30;
        var privateSpaceY = 60;

        ///////PRIVATE///////
        //--------->private draw axis<---------//
        var privateDrawAxis = function () {
            myCtx.beginPath();
            myCtx.lineWidth = privateLineAxis;
            myCtx.moveTo(privateCenter[0], privateCenter[1]);
            myCtx.lineTo(privateCenter[0], privateCenter[1] + (privateAxisY + 1) * privateSpaceY);
            myCtx.lineTo(privateCenter[0] + privateAxisX * privateSpaceX,
                privateCenter[1] + (privateAxisY + 1) * privateSpaceY);
            myCtx.strokeStyle = "black";
            myCtx.stroke();
        };

        //--------->private draw number<---------//
        var privateDrawNumber = function () {
            var space = privateCenter[1];
            for (var i = privateAxisY; i >= 0; i--) {
                myCtx.beginPath();
                myCtx.font = "30px Arial";
                myCtx.fillText(i, privateCenter[0] - 35, space + privateSpaceY);
                myCtx.stroke();
                space += privateSpaceY;
            }
        };

        //--------->private draw text<---------//
        var privateDrawText = function () {
            var spaceNameRank = 0;

            if (privateAxisX > 7) {
                spaceNameRank = privateAxisX * privateSpaceX / 2 - 120;
            }
            myCtx.beginPath();
            myCtx.font = "28px Arial";
            myCtx.fillText(privateNameRank, privateCenter[0] + spaceNameRank, privateCenter[1] / 1.5);
            myCtx.fillText(privateNameChart, privateCenter[0] * 2,
                privateCenter[1] + (privateAxisY + 1) * privateSpaceY + 70);
            myCtx.rotate(-180 * Math.PI / 360);
            myCtx.fillText("HISTORY", -(privateCenter[1] + (privateAxisY + 1) * privateSpaceY) / 2 - 100,
                privateCenter[1] / 1.3);
            myCtx.stroke();
        };

        //--------->private draw data<---------//
        var privateDrawData = function () {
            myCtx.beginPath();
            myCtx.moveTo(privateCenter[0] + privateSpaceX, privateCenter[1] * options.data[0]);
            myCtx.lineTo(20, 100);
            myCtx.stroke();
        };

        ///////PUBLIC///////
        var publicSinChart = function () {
            privateDrawAxis();
            privateDrawNumber();
            privateDrawData();
            privateDrawText();
        };

        ///////RETURN///////
        return {
            run: publicSinChart
        }
    }();
};

var chart = new mySinChart(
    {
        canvas: "myCanvas",
        nameChart: "QUY LAM VIEC",
        data: [1, 2, 1, 3, 2, 3, 4, 1]
    }
);

chart.sinChart.run();

