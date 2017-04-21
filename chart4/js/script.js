var myLeverOfPosition = function (options) {


    var myCanvas = document.getElementById(options.canvas);
    var myCtx = myCanvas.getContext("2d");

    //create data
    var privateCenter = [myCanvas.width / 5, myCanvas.height / 8];
    var privateLineAxis = options.lineAxis;
    var privateLineColumn = options.lineColumn;
    var privateSpace = [options.spaceX, options.spaceY];
    var privateData = options.data;
    var privateAxis = [privateData.length, options.lengthY];
    var privateColor = options.color;
    var privateFont = options.font;
    var privateText = [
        options.nameChart,
        "LEVEL OF POSITION",
        options.nameProject,
        "LEVEL OF POSITION"
    ];
    var privateAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
        "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


    ////////////////////////////////////////////////////////////////////////////////

    //module level of position
    this.levelOfPosition = function () {

        ///////PRIVATE///////
        // func private draw axis
        var privateDrawAxis = function (ctx, center, axis, line, space, color) {
            ctx.beginPath();
            ctx.lineWidth = line;
            ctx.strokeStyle = color[0];
            ctx.lineTo(center[0], center[1] + (axis[1] + 1) * space[1]);
            ctx.lineTo(center[0] + axis[0] * space[0] + 10, center[1] + (axis[1] + 1) * space[1]);
            myCtx.stroke();
        };

        //func private draw number
        var privateDrawNumber = function (ctx, center, axis, font, space, color) {
            var spaceY = center[1];
            var indent = 0;

            if (axis[1] > 0) {
                indent = 30;
            } else {
                indent = 40;
            }
            for (var i = axis[1]; i >= 0; i--) {
                ctx.beginPath();
                ctx.font = font[0];
                ctx.lineWidth = 1;
                ctx.fillStyle = color[0];
                ctx.fillText(i, center[0] - indent, spaceY + space[1] + 5);
                ctx.strokeStyle = color[3];
                ctx.lineTo(center[0], space[1] + spaceY);
                ctx.lineTo(center[0] + axis[0] * space[0] + 10, space[1] + spaceY);
                ctx.stroke();
                spaceY += space[1];
            }
        };

        //func private draw text
        var privateDrawText = function (ctx, data, text, center, axis, font, space, alphabet, line, color) {
            var spaceNameRank = 0;
            var spaceX = space[0];

            if (axis[1] > 7) {
                spaceNameRank = axis[0] * space[0] / 2 - 120;
            }
            ctx.beginPath();

            //draw col right
            ctx.fillRect(center[0] + (axis[0] + 0.5) * space[0], center[1] + space[1], line, space[1] / 2);

            //draw text right(split arr show)
            ctx.font = font[1];
            ctx.fillStyle = color[1];
            var spaceY = 10;
            var arr = [];
            var index = 0;
            var j = 0;
            for (var i = 0; i < text[1].length; i++) {
                arr[i] = text[1].slice(i, i + 1);
                if (arr[i] === " ") {
                    ctx.fillText(text[1].slice(index, i), center[0] + (axis[0] + 0.5) * space[0], center[1] + space[1] * 1.7 + spaceY);
                    index = i + 1;
                    j++;
                    spaceY += 20
                }
            }
            if (j === text[1].split(' ').length - 1) {
                ctx.fillText(text[1].slice(index, i), center[0] + (axis[0] + 0.5) * space[0], center[1] + space[1] * 1.7 + spaceY);
            }

            //draw text top
            ctx.fillStyle = color[1];
            ctx.font = font[2];
            ctx.fillText(text[0], center[0] + spaceNameRank, center[1] / 1.5);
            ctx.fillStyle = color[0];
            ctx.font = font[0];
            for (i = 0; i < data.length; i++) {
                ctx.fillText(alphabet[i], center[0] + spaceX - space[0] + line / 2 - 5,
                    center[1] + (axis[1] + 1) * space[1] + 30);
                spaceX += space[0];
            }

            //draw name project
            ctx.fillStyle = color[2];
            ctx.font = font[1];
            ctx.fillText(text[2], center[0] * 5 / 2 - 30, center[1] + (axis[1] + 1) * space[1] + 80);
            ctx.rotate(-180 * Math.PI / 360);
            ctx.fillText(text[3], -(center[1] + ((axis[1] + 1) * space[1]) / 2) - 110, center[1]);
            ctx.stroke();
        };

        //func draw data
        var privateDrawData = function (ctx, data, center, axis, space, linecolumn, color) {
            var spaceX = space[0];
            for (var i = 0; i <= data.length; i++) {
                ctx.beginPath();
                ctx.fillStyle = color[4];
                ctx.fillRect(center[0] + spaceX - space[0], center[1] + (axis[1] + 1) * space[1],
                    linecolumn, -(data[i] * space[1]));
                ctx.stroke();
                spaceX += space[0];
            }
        };

        //private func bool data
        var privateBoolData = function (data, axis) {
            var index = false;
            for (var i in data) {
                if (data[i] <= 0 || data[i] > axis[1]) {
                    index = true;
                }
            }
            return index;
        };

        ///////PUBLIC///////
        //pub run chart
        var publicRunChart = function () {
            if (privateBoolData(privateData, privateAxis)) {
                alert("Bạn nhập sai dữ liệu!");
            } else {

                privateDrawNumber(myCtx, privateCenter, privateAxis, privateFont, privateSpace, privateColor);
                privateDrawData(myCtx, privateData, privateCenter, privateAxis, privateSpace,
                    privateLineColumn, privateColor);
                privateDrawAxis(myCtx, privateCenter, privateAxis, privateLineAxis, privateSpace, privateColor);
                privateDrawText(myCtx, privateData, privateText, privateCenter,
                    privateAxis, privateFont, privateSpace, privateAlphabet, privateLineColumn, privateColor);
            }
        };

        ///////RETURN///////
        return {
            run: publicRunChart
        }
    }();
};

var chart = new myLeverOfPosition(
    {
        //id canvas
        canvas: "myCanvas",
        //data input
        data: [2, 0.1, 3, 4, 4],
        //line column
        lineColumn: 50,
        //line axis
        lineAxis: 2,
        //space row x
        spaceX: 70,
        //space column y
        spaceY: 40,
        //length y
        lengthY: 4,
        //color line axis, number, alphabet - name chart, text right - name project, text left - line y - data
        color: ["black", "black", "#A2A2A2", "#E8E6E6", "#3366CC"],
        //font number, alphabet-name project, text left right-name chart
        font: ["18px Arial", "18px Arial", "25px Arial"],
        //name project
        nameProject: "TÊN DỰ ÁN",
        //name chart
        nameChart: "BIỂU ĐỒ LỊCH SỬ LEVEL OF POSITION"
    }
);

chart.levelOfPosition.run();

