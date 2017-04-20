var containerPieChart = function (options) {

    //Create
    var myCanvas = document.getElementById(options.canvas);
    var myCtx = myCanvas.getContext("2d");
    var privateData = options.data;
    var privateColors = options.colors;
    var privateText = options.text;

    var privateCenter = [myCanvas.width / 3, myCanvas.height / 2];
    var privateRadius = Math.min(myCanvas.width, myCanvas.height) / 3;
    var privateLastPosition = 4.71, privateTotal = 0;
    var privateFontText = "20px Arial";
    var privateColorText = "black";

    //module pie chart
    this.pieChart = function () {

        ///////////PRIVATE///////////

        //private func sum data
        var privateSumData = function (data) {
            var privateTotal = 0;
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

                myCtx.arc(center[0], center[1], radius, lastPosition,
                    lastPosition + (Math.PI * 2 * (data[i] / total)), false);
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
            var space = 0;
            if (color.length === text.length) {
                for (var i = 0; i < color.length; i++) {
                    myCtx.font = privateFontText;
                    myCtx.fillStyle = color[i];
                    myCtx.fillRect(center[0] * 2.1 - 30, center[1] / (text.length / 2.5) - 14 + space, 15, 15);
                    myCtx.stroke();
                    space += 40;
                }
                for (i = 0; i < color.length; i++) {
                    myCtx.font = privateFontText;
                    myCtx.fillStyle = privateColorText;
                    myCtx.fillText(text[i], center[0] * 2.1,
                        center[1] / (text.length / 2.5) + space - (40 * color.length));
                    myCtx.stroke();
                    space += 40;
                }
            }
        };

        //private func draw %
        var privateDrawPercent = function (center, total, data, radius, lastPosition, doughnutHoleSize) {
            var startAngle = 0;
            for (var i = 0; i <= data.length; i++) {
                var sliceAngle = 2 * Math.PI * data[i] / total;
                var x = center[0] + (radius * doughnutHoleSize * 0.7) * Math.cos(startAngle + sliceAngle / 2 + lastPosition);
                var y = center[1] + (radius * doughnutHoleSize * 0.7) * Math.sin(startAngle + sliceAngle / 2 + lastPosition);
                myCtx.fillStyle = privateColorText;
                myCtx.fillText(data[i] / total * 100 + "%", x-5, y+5);
                startAngle += sliceAngle
            }
        };

        //private func bool data
        var privateBoolData = function (data) {
            var index = false;
            for (var i in data) {
                if (data[i] <= 0) {
                    index = true;
                }
            }
            return index;
        };

        ///////////PUBLIC///////////

        //pub func run pie chart
        var publicRunPieChart = function () {
            if (privateBoolData(privateData)) {
                alert("Dữ liệu nhập sai!");
            }
            else {
                privateDrawText(privateColors, privateText, privateCenter);
                privateDrawData(privateColors, privateCenter, privateRadius,
                    privateLastPosition, privateSumData(privateData), privateData);
                privateDoughnutHoleSize(privateCenter, privateRadius / 2,
                    options.doughnutHoleSize[0], options.doughnutHoleSize[1]);
                privateDrawPercent(privateCenter, privateSumData(privateData), privateData,
                    privateRadius, privateLastPosition, options.doughnutHoleSize[0]);
            }
        };

        ///////////RETURN///////////

        return {
            run: publicRunPieChart
        }
    }();
};

var chart = new containerPieChart({
    //id canvas
    canvas: "myCanvas",
    //data input
    data: [10, 20, 10, 60],
    // color input
    colors: ["#4267B1", "#DB3D26", "#F8991D", "#189747"],
    //text input
    text: [
        "Xuất sắc",
        "Tốt",
        "Trung bình",
        "Kém"
    ],
    // hole size, color hole
    doughnutHoleSize: [1, "white"]
});

chart.pieChart.run();

