var mySinChart = function (options) {
    this.sinChart = function () {

        var myCanvas = document.getElementById(options.canvas);
        var myCtx = myCanvas.getContext("2d");
        var privateNameRank = "RANK SCORE RANK";
        var privateCenter = [myCanvas.width / 5, myCanvas.height / 8];

        var privateNameChart = options.name;
        var privateAxisX = options.data.length;
        var privateAxisY = options.y;
        var privateLineAxis = options.line;
        var privateSpaceX = options.space[0];
        var privateSpaceY = options.space[1];
        var privateFont = options.font;
        var privateRadius = options.radius;

        var privateSpaceNumber = 0;

        if (privateAxisY >= 10) {
            privateSpaceNumber = 45;
        }
        else {
            privateSpaceNumber = 35;
        }


        ///////PRIVATE///////
        //--------->private draw axis<---------//
        var privateDrawAxis = function () {
            myCtx.beginPath();
            myCtx.lineWidth = privateLineAxis[0];
            myCtx.moveTo(privateCenter[0], privateCenter[1]);
            myCtx.lineTo(privateCenter[0], privateCenter[1] + (privateAxisY + 1) * privateSpaceY);
            myCtx.lineTo(privateCenter[0] + privateAxisX * privateSpaceX + privateSpaceX,
                privateCenter[1] + (privateAxisY + 1) * privateSpaceY);
            myCtx.strokeStyle = options.color[0];
            myCtx.stroke();
        };

        //--------->private draw number<---------//
        var privateDrawNumber = function () {
            var space = privateCenter[1];
            for (var i = privateAxisY; i >= 0; i--) {
                myCtx.beginPath();
                myCtx.font = privateFont[0];
                myCtx.fillText(i, privateCenter[0] - privateSpaceNumber, space + privateSpaceY);
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
            myCtx.font = privateFont[1];
            myCtx.fillText(privateNameRank, privateCenter[0] + spaceNameRank, privateCenter[1] / 1.5);
            myCtx.fillText(privateNameChart, privateCenter[0] * 2,
                privateCenter[1] + (privateAxisY + 1) * privateSpaceY + 70);
            myCtx.rotate(-180 * Math.PI / 360);
            myCtx.fillText("HISTORY", -(privateCenter[1] + (privateAxisY + 1) * privateSpaceY) / 2 - 100,
                privateCenter[1] / 1.3);
            myCtx.stroke();
        };

        var privateBoolData = function () {
            var index = false;
            for (var i in options.data) {
                if (options.data[i] <= 0 || options.data[i] > options.y) {
                    index = true;
                }
            }
            return index;
        };
        //--------->private draw data<---------//
        var privateDrawData = function () {
            myCtx.beginPath();
            myCtx.moveTo(privateCenter[0] + privateSpaceX,
                privateCenter[1] + ( (privateAxisY - options.data[0] + 1) * privateSpaceY));
            for (var i = 0; i < privateAxisX; i++) {
                if (i % 2 === 0) {
                    myCtx.bezierCurveTo(
                        privateCenter[0] + privateSpaceX * (i + 1) + privateRadius,
                        privateCenter[1] + ( (privateAxisY - options.data[i] + 1) * privateSpaceY),

                        privateCenter[0] + privateSpaceX * (i + 2) - privateRadius,
                        privateCenter[1] + ( (privateAxisY - options.data[i + 1] + 1) * privateSpaceY),

                        privateCenter[0] + privateSpaceX * (i + 2),
                        privateCenter[1] + ( (privateAxisY - options.data[i + 1] + 1) * privateSpaceY)
                    );
                }
                if (i % 2 === 1) {
                    myCtx.bezierCurveTo(
                        privateCenter[0] + privateSpaceX * (i + 1) + privateRadius,
                        privateCenter[1] + ( (privateAxisY - options.data[i] + 1) * privateSpaceY),

                        privateCenter[0] + privateSpaceX * (i + 2) - privateRadius,
                        privateCenter[1] + ( (privateAxisY - options.data[i + 1] + 1) * privateSpaceY),

                        privateCenter[0] + privateSpaceX * (i + 2),
                        privateCenter[1] + ( (privateAxisY - options.data[i + 1] + 1) * privateSpaceY)
                    );
                }
            }

            myCtx.lineWidth = privateLineAxis[1];
            myCtx.strokeStyle = options.color[1];
            myCtx.stroke();
        };

        ///////PUBLIC///////
        var publicSinChart = function () {
            if (privateBoolData()) {
                alert("Dữ liệu nhập sai!");
            } else {
                privateDrawAxis();
                privateDrawNumber();
                privateDrawData();
                privateDrawText();
            }
        };

        ///////RETURN///////
        return {
            run: publicSinChart
        }
    }();
};

//create chart
var chart = new mySinChart(
    {
        //id canvas
        canvas: "myCanvas",
        //name chart
        name: "QUY LAM VIEC",
        //data input
        data: [1.5, 3.5, 1.5, 3.5, 3, 3.5],
        // color chart ,
        color: ["black", "#00AEEF"],
        // line axis,
        line: [2.5, 5],
        //space axis x, axis y
        space: [40, 40],
        // set const axis y
        y: 4,
        //font name chart, number
        font: ["30px Arial", "28px Arial"],
        //radius for sin
        radius: 20
    }
);

//run chart
chart.sinChart.run();



