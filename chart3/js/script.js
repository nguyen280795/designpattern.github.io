var containerPieChart = function (options) {

    //Create
    var myCanvas = document.getElementById(options.canvas);
    var myCtx = myCanvas.getContext("2d");
    var privateData = options.data;
    var privateColors = options.colors;
    var privateText = options.text;

    var privateCenter = [myCanvas.width / 3, myCanvas.height / 2];
    var privateRadius = Math.min(myCanvas.width, myCanvas.height) / 3;
    var privateLastPosition = 4.7, privateTotal = 0;

    this.pieChart = function () {

        ///////////PRIVATE///////////
        //private func sum data
        var privateSumData = function (data) {
            for (var i in data) {
                privateTotal += data[i];
            }
            return privateTotal;
        };

        //private func draw data
        var privateDrawData = function (colors, center, radius, lastPosition, total, data) {
            for (var i = 0; i < data.length; i++) {

                myCtx.fillStyle = colors[i];

                myCtx.beginPath();

                myCtx.moveTo(center[0], center[1]);

                myCtx.arc(center[0], center[1], radius, lastPosition, lastPosition + (Math.PI * 2 * (data[i] / total)), false);

                myCtx.lineTo(center[0], center[1]);

                myCtx.fill();

                lastPosition += Math.PI * 2 * (data[i] / total);

            }
        };

        //private func DoughnutHoleSize
        var privateDoughnutHoleSize = function (center, radius, doughnutHoleSize, colors) {
            if (doughnutHoleSize > 0) {
                myCtx.fillStyle = colors;
                myCtx.beginPath();
                myCtx.moveTo(center[0], center[1]);
                myCtx.arc(center[0], center[1], doughnutHoleSize * radius, 0, 2 * Math.PI);
                myCtx.lineTo(center[0], center[1]);
                myCtx.fill();
            }
        };

        //private func draw text

        var privateDrawText = function (color, text, center) {
            if (color.length === text.length) {
                for (var i = 0; i < color.length; i++) {
                    myCtx.fillText(i, center[0], center[1]);
                    myCtx.stroke();
                }
            }
        };

        ///////////PUBLIC///////////
        //pub func run pie chart
        var publicRunPieChart = function () {
            privateDrawData(privateColors, privateCenter, privateRadius, privateLastPosition, privateSumData(privateData), privateData);
            privateDoughnutHoleSize(privateCenter, privateRadius / 2, options.doughnutHoleSize[0], options.doughnutHoleSize[1]);
            privateDrawText(privateColors, privateText);
        };

        ///////////RETURN///////////
        return {
            run: publicRunPieChart
        }
    }();
};

var chart = new containerPieChart({
    canvas: "myCanvas",
    data: [10, 20, 10, 60],
    colors: ["#4267B1", "#DB3D26", "#F8991D", "#189747"],
    text: [
        "Xuất sắc",
        "Tốt",
        "Trung bình",
        "Kém"
    ],
    doughnutHoleSize: [1.1, "white"]
});

chart.pieChart.run();

