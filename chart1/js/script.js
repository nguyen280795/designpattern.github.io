//Database
var publicData = [20, 80];
var publicColors = ["#E4322B", "#009ED5", "#456AA4", "#807D80"];
var publicName = "BIỂU ĐỒ TỔNG QUAN KHUNG NĂNG LỰC";
////////////////////////////////////////////////////

var pieChart = function () {

    //Creat
    var myCanvas = document.getElementById("myCanvas");
    var myCtx = myCanvas.getContext("2d");
    var privateCenter = [myCanvas.width / 5.9, myCanvas.height / 2];
    var privateRadius = Math.min(myCanvas.width, myCanvas.height) / 7;
    var privateLastPosition = 0, privateTotal = 0;
    var privateFontNameChart = "20px Arial";
    var privateFontReport = "8px Arial";

    for (var i in publicData) {
        privateTotal += publicData[i];
    }

    var xDown = -5 * Math.cos(Math.PI * (publicData[1] / privateTotal));
    var yDown = 5 * Math.sin(Math.PI * (publicData[1] / privateTotal));
    var x = xDown + privateCenter[0];
    var y = privateCenter[1] - yDown;

    var xDown1 = -5 * Math.cos(Math.PI * (publicData[0] / privateTotal));
    var yDown1 = 5 * Math.sin(Math.PI * (publicData[0] / privateTotal));
    var x1 = xDown1 + privateCenter[0];
    var y1 = privateCenter[1] - yDown1;

    ///////////////PRIVATE////////////////////
    //-------->privateArrOne<--------//
    var privateArrOne = function () {
        myCtx.fillStyle = publicColors[1];
        myCtx.beginPath();
        myCtx.arc(privateCenter[0], privateCenter[1], privateRadius, privateLastPosition, privateLastPosition
            + (Math.PI * 2 * (publicData[1] / privateTotal)));
        myCtx.lineTo(privateCenter[0], privateCenter[1]);
        myCtx.fill();
    };

    //-------->privateArr3DTwo<--------//
    var privateArr3DTwo = function () {
        myCtx.scale(3, 1);
        for (i = 0; i < 60; i++) {
            myCtx.fillStyle = publicColors[0];
            myCtx.beginPath();
            myCtx.arc(x, y + i, privateRadius, privateLastPosition, privateLastPosition
                + (Math.PI * 2 * (publicData[1] / privateTotal)), true);
            myCtx.lineTo(x, y + i);
            myCtx.fill();
        }
    };

    //-------->privateArrTwo<--------//
    var privateArrTwo = function () {
        var index = 0;

        if (publicData[1] / privateTotal > 0.77) {
            index = 4;
        }

        if (publicData[1] / privateTotal > 0.8) {
            index = 3;
        }

        if (publicData[1] / privateTotal >= 0.9) {
            index = 2;
        }

        if (publicData[1] / privateTotal >= 0.99) {
            index = 1;
        }

        if (publicData[1] / privateTotal < 0.5) {
            index = 1;
        }

        for (i = 0; i < index; i++) {
            myCtx.fillStyle = publicColors[0];
            myCtx.beginPath();
            myCtx.arc(x, y + i, privateRadius, privateLastPosition, privateLastPosition
                + (Math.PI * 2 * (publicData[1] / privateTotal)), true);
            myCtx.lineTo(x, y + i);
            myCtx.fill();
        }
    };

    //-------->privateArr3DOne<--------//
    var privateArr3DOne = function () {

        if (publicData[1] / privateTotal === 1) {
            myCtx.scale(3, 1);
        }
        for (i = 0; i < 60; i++) {
            myCtx.fillStyle = publicColors[2];
            myCtx.beginPath();
            myCtx.arc(privateCenter[0], privateCenter[1] + i, privateRadius, privateLastPosition, privateLastPosition
                + (Math.PI * 2 * (publicData[1] / privateTotal)));
            myCtx.lineTo(privateCenter[0], privateCenter[1] + i);
            myCtx.fill();
        }
    };

    //-------->privateArr3DNotReached<--------//
    var privateArr3DNotReached = function () {

        if (publicData[1] / privateTotal === 0) {
            myCtx.scale(3, 1);
        }
        for (i = 0; i < 60; i++) {

            myCtx.fillStyle = publicColors[0];
            myCtx.beginPath();
            myCtx.arc(privateCenter[0], privateCenter[1] + i, privateRadius, privateLastPosition, 10);
            myCtx.lineTo(privateCenter[0], privateCenter[1] + i);
            myCtx.fill();
        }
    };

    //-------->privateArr3DTwo1<--------//
    var privateArr3DTwo1 = function () {
        for (i = 0; i < 60; i++) {
            myCtx.fillStyle = publicColors[0];
            myCtx.beginPath();
            myCtx.arc(x, y + i, privateRadius, privateLastPosition
                + (Math.PI * 2 * (publicData[1] / privateTotal)), Math.PI * 1);
            myCtx.lineTo(x, y + i);
            myCtx.fill();
        }
    };

    //-------->privateReport1<--------//
    var privateReport1 = function () {
        myCtx.scale(1, 2);
        myCtx.beginPath();
        myCtx.moveTo(x + 4, y - 101);
        myCtx.lineTo(150, 50);
        myCtx.lineTo(190, 50);
        myCtx.fillStyle = publicColors[3];
        myCtx.font = privateFontReport;
        myCtx.fillText((100 - (publicData[1] / privateTotal) * 100) + "% CHƯA ĐẠT", 150, 45);
        myCtx.strokeStyle = publicColors[0];
        myCtx.stroke();
    };

    //-------->privateReport2<--------//
    var privateReport2 = function () {
        var index = 96;

        if (publicData[1] / privateTotal >= 0.01 && publicData[1] / privateTotal <= 0.02) {
            index = 100;
        }

        if (publicData[1] / privateTotal >= 0.03 && publicData[1] / privateTotal <= 0.05) {
            index = 99.5;
        }

        if (publicData[1] / privateTotal >= 0.06 && publicData[1] / privateTotal <= 0.11) {
            index = 98;
        }

        if (publicData[1] / privateTotal >= 0.12 && publicData[1] / privateTotal <= 0.5) {
            index = 95;
        }
        myCtx.beginPath();
        myCtx.moveTo(x1, y1 - index);
        myCtx.lineTo(60, 50);
        myCtx.lineTo(20, 50);
        myCtx.fillStyle = publicColors[3];
        myCtx.font = privateFontReport;
        myCtx.fillText(((publicData[1] / privateTotal) * 100) + "% ĐÃ ĐẠT", 20, 45);
        myCtx.strokeStyle = publicColors[2];
        myCtx.stroke();
    };

    //-------->privateNameChart<--------//
    var privateNameChart = function () {
        myCtx.beginPath();
        myCtx.fillStyle = publicColors[1];
        myCtx.font = privateFontNameChart;
        myCtx.fillText(publicName, privateCenter[0] * 1.4, privateCenter[1] * 1.8);
        myCtx.stroke();
    };

    ///////////////PUBLIC////////////////////
    //-------->publicPieChart<--------//
    var publicPieChart = function () {

        privateNameChart();
        if (publicData[1] / privateTotal === 0) {
            privateArr3DNotReached();
        } else {

            if (publicData[1] / privateTotal < 0.24) {
                privateArr3DTwo();
                privateArr3DOne();
                privateArrOne();
                privateArrTwo();
                privateArr3DTwo1();
            } else {

                if (publicData[1] / privateTotal === 1) {
                    privateArr3DOne();
                    privateArrOne();
                }
                else {
                    privateArr3DTwo();
                    privateArr3DOne();
                    privateArrOne();
                    privateArrTwo();
                }
            }
        }

        if (publicData[1] / privateTotal !== 1) {
            privateReport1();
        }

        if (publicData[1] / privateTotal !== 0) {
            privateReport2();
        }

    };

    /////////////RETURN////////////////////
    return {
        run: publicPieChart
    }

}();

$(function () {
    pieChart.run();
});

