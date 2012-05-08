var canvas1;
var background_c;

var canvas2;
var static_c;

var canvas3;
var display_c;

var stageWidth;
var stageWidth2;
var stageHeight;

var backgroundX;
var backgroundY;

var displayX;
var displayY;

var displayWidth;
var displayWidth2;
var displayHeight;

var textX;
var textY;

var captionBoxX;
var captionBoxY;
var captionBoxWidth;
var captionBoxHeight;
var captionBoxRadius;

var sliderRangeX;
var sliderRangeY;
var sliderLength;

var slider;

var num;
var interval;
var intervalPi;
var nextVal;
var nextX;
var nextY;

var gridX;
var gridY;
var gridXMin;
var gridXMax;
var gridYMin;
var gridYMax;
var gridXRange;
var gridYRange;
var gridXLength;
var gridYLength;

var lowerLimit;
var upperLimit;

var xTickY;

var blueCurveXStart;
var blueCurveYStart;

var stageFill_color = "#EEE";
var stageStroke_color = "#999";
//var blueCurve_color = "#39C";
//var blueCurve_color = "#C00";
var blueCurve_color = "#093";
var blueText_color = "#0078A8";
var black_color = "#000";
var white_color = "#FFF";
var gridGray_color = "#999";

function init() {

	canvas1 = document.getElementById("background_canvas");
	background_c = canvas1.getContext("2d");

	canvas2 = document.getElementById("static_canvas");
	static_c = canvas2.getContext("2d");

	canvas3 = document.getElementById("display_canvas");
	display_c = canvas3.getContext("2d");

//----------------------------------------------------//
//  Canvas: background                                //
//----------------------------------------------------//

	background_c.save();

	//------------------------------//
	// Stage
	//------------------------------//

	backgroundX = 15.5;
	backgroundY = 15.5;

	stageWidth = 473;
	stageHeight = 215;
	
	background_c.translate(backgroundX, backgroundY);

	background_c.fillStyle = stageFill_color;

	background_c.strokeRect(0, 0, stageWidth, stageHeight);
	background_c.fillRect(0, 0, stageWidth, stageHeight);

	background_c.strokeStyle = stageStroke_color;
	background_c.strokeRect(0, 0, stageWidth, stageHeight);

	background_c.restore();

//----------------------------------------------------//
//  Canvas: static_c                                  //
//----------------------------------------------------//

	//------------------------------//
	// Static display box
	//------------------------------//

	background_c.save();

	displayX = 175.5;
	displayY = 170.5;

	displayWidth = 24;
	displayHeight = 24;
	displayWidth2 = 38;

	textX = 8;
	textY = 18;
	
	static_c.translate(displayX, displayY);
	
	//------------------------------//
	// Equations
	//------------------------------//
	static_c.fillStyle = blueText_color;
	static_c.font = "bold italic 14pt Times Roman";
	static_c.textAlign = "left";
    static_c.fillText("f(x) = sin(Ax)", 140, 10);

	static_c.fillStyle = black_color;
    static_c.fillText("f(x) = sin(x)", 140, 37);

	//------------------------------//
	// Slider range
	//------------------------------//
	sliderRangeX = -140;
	sliderRangeY = 14;
	sliderLength = 110;
	interval = sliderLength / 6;

	static_c.translate(sliderRangeX, sliderRangeY);

	static_c.strokeStyle = black_color;
	static_c.lineWidth = 1;

	static_c.fillStyle = white_color;
	static_c.fillRect(-12, -21, 134, 49);

	static_c.beginPath();  
	static_c.moveTo(0, 0);  
	static_c.lineTo(sliderLength, 0);  
	static_c.stroke();

	static_c.moveTo(0, 0);  

	for (var i = 0; i <= 6; i++) {  
		nextVal = Math.round(i * interval);
		static_c.beginPath();  
		static_c.moveTo(nextVal, 0);  
		static_c.lineTo(nextVal, -6);  
		static_c.stroke();
	}

	static_c.fillStyle = black_color;
	static_c.font = "8pt Arial";
	static_c.textAlign = "center";

	for (var i = -3; i <= 3; i++) {  
		nextVal = Math.round((i + 3) * interval);
		static_c.fillText(i, nextVal, -10);
	}

	static_c.restore();

	//------------------------------//
	// Grid
	//------------------------------//
	gridX = 0;
	gridY = -155;
	interval = 20;
	
	gridXMin = -11;
	gridXMax = 11;
	gridYMin = -3;
	gridYMax = 3;
	gridXRange = gridXMax - gridXMin;
	gridYRange = gridYMax - gridYMin;
	gridXLength = gridXRange * interval;
	gridYLength = gridYRange * interval;


	static_c.translate(gridX, gridY);

	static_c.fillStyle = white_color;
	static_c.fillRect(0, 0, 440, 120);

	static_c.lineWidth = 1;

	//------------------------------//
	//Vertical grid lines
	//------------------------------//


	static_c.strokeStyle = black_color;

	nextVal = 0;
	static_c.beginPath();  
	static_c.moveTo(nextVal, 0);
	static_c.lineTo(nextVal, gridYLength);  
	static_c.stroke();


	nextVal = (22 * interval);
	static_c.beginPath();  
	static_c.moveTo(nextVal, 0);
	static_c.lineTo(nextVal, gridYLength);  
	static_c.stroke();

	for (var i = -3; i <= 3; i++) {
		if (i == 0) {
			static_c.strokeStyle = black_color;
		} else {
			static_c.strokeStyle = gridGray_color;		
		}
		nextVal = (11 * interval) + (i * (Math.PI * interval));
		static_c.beginPath();  
		static_c.moveTo(nextVal, 0);
		static_c.lineTo(nextVal, gridYLength);  
		static_c.stroke();
	}

	//------------------------------//
	//Vertical tick marks
	//------------------------------//
	static_c.strokeStyle = black_color;
	for (var i = -3; i <= 3; i++) {
		if (i != 0) {
			nextVal = (11 * interval) + (i * (Math.PI * interval));
			static_c.beginPath();  
			static_c.moveTo(nextVal, 56);
			static_c.lineTo(nextVal, 64);  
			static_c.stroke();
		}
	}

	//------------------------------//
	//Horizontal grid lines
	//------------------------------//
	lowerLimit = 0;
	upperLimit = gridYRange;
	for (var i = lowerLimit; i <= upperLimit; i++) {
		if ((i == lowerLimit) || (i == 3) || (i == upperLimit)) {
			static_c.strokeStyle = black_color;
		} else {
			static_c.strokeStyle = gridGray_color;
		}
		nextVal = i * interval;
		static_c.beginPath();  
		static_c.moveTo(0, nextVal);  
		static_c.lineTo(gridXLength, nextVal);  
		static_c.stroke();
	}

	//------------------------------//
	//Horizontal tick marks
	//------------------------------//
	static_c.strokeStyle = black_color;

	lowerLimit = -1;
	upperLimit = 1;
	for (var i = lowerLimit; i <= upperLimit; i++) {
		if (i != 0) {
			nextVal = 60 + (i * 2 * interval);
			static_c.beginPath();  
			static_c.moveTo(216, nextVal);
			static_c.lineTo(224, nextVal);  
			static_c.stroke();
		}
	}

	//------------------------------//
	//X axis labels
	//------------------------------//
	lowerLimit = -5;
	upperLimit = 5;

	xTickY = 72;

	static_c.fillStyle = black_color;
	static_c.font = "8pt Helvetica";
	static_c.textAlign = "center";

	nextVal = (11 * interval) + (-3 * (Math.PI * interval));
	static_c.fillText("-3\u03C0 / 2", nextVal, xTickY);

	nextVal = (11 * interval) + (-2 * (Math.PI * interval));
	static_c.fillText("-\u03C0", nextVal, xTickY);

	nextVal = (11 * interval) + (-1 * (Math.PI * interval));
	static_c.fillText("-\u03C0 / 2", nextVal, xTickY);

	nextVal = (11 * interval) + (1 * (Math.PI * interval));
	static_c.fillText("\u03C0 / 2", nextVal, xTickY);

	nextVal = (11 * interval) + (2 * (Math.PI * interval));
	static_c.fillText("\u03C0", nextVal, xTickY);

	nextVal = (11 * interval) + (3 * (Math.PI * interval));
	static_c.fillText("3\u03C0 / 2", nextVal, xTickY);

	//------------------------------//
	//Y axis labels
	//------------------------------//
	static_c.textAlign = "right";
	lowerLimit = -1;
	upperLimit = 1;

	for (var i = lowerLimit; i <= upperLimit; i++) {  
		if (i != 0) {
			nextVal = 62 - (i * 2 * interval);
			static_c.fillText(i, 214, nextVal);
		}
	}

	//------------------------------//
	//Arrow heads URDL
	//------------------------------//
	static_c.font = "7pt Arial";
	static_c.fillText("\u25B2", 225, 6);
	static_c.fillText("\u25BA", 442, 63);
	static_c.fillText("\u25BC", 225, 120);
	static_c.font = "6pt Arial";
	static_c.fillText("\u25C0", 8, 63);

	//------------------------------//
	//Sine curve gray
	//------------------------------//
	static_c.strokeStyle = black_color;
	static_c.lineWidth = 1;

	interval = 40;
	lowerLimit = -5.5 * interval;
	upperLimit = 5.5 * interval;
	static_c.beginPath();  

	for (var i = lowerLimit; i <= upperLimit; i++) {  
		if (i == lowerLimit) {
			static_c.moveTo(0, 60 + (-1 * interval * Math.sin(-5.5)));
		} else {
			nextX = i - lowerLimit;
			nextY = 60 + (-1 * interval * Math.sin(i/interval));
			static_c.lineTo(nextX, nextY);  
		}
	}

	static_c.stroke();

	static_c.restore();


//----------------------------------------------------//
//  Canvas: display                                   //
//----------------------------------------------------//

	display_c.translate(displayX + displayWidth, displayY);
	display_c.save();

	//------------------------------//
	//Initial Sine curve blue
	//------------------------------//
	display_c.strokeStyle = blueCurve_color;
	display_c.lineWidth = 2;

	blueCurveXStart = -164;
	blueCurveYStart = -80;

	interval = 40;
	lowerLimit = -5.5 * interval;
	upperLimit = 5.5 * interval;
	display_c.beginPath();
	for (var i = lowerLimit; i <= upperLimit; i++) {  
		if (i == lowerLimit) {
			display_c.moveTo(blueCurveXStart, blueCurveYStart + (-1 * interval * Math.sin(-5.5)));
		} else {
			nextX = i - lowerLimit + blueCurveXStart;
			nextY = blueCurveYStart + (-1 * interval * Math.sin((i/interval)));
			display_c.lineTo(nextX, nextY);  
		}
	}
	display_c.stroke();

	display_c.restore();

}

function displayValue(newValue) {

	num = newValue / 10;
	display_c.clearRect(0,0,300,300);

	//------------------------------//
	//Sine curve blue
	//------------------------------//
	display_c.strokeStyle = blueCurve_color;
	display_c.lineWidth = 2;

	blueCurveXStart = -164;
	blueCurveYStart = -80;

	display_c.clearRect(blueCurveXStart - 10, blueCurveYStart - 60, 451, 140);

	interval = 40;
	lowerLimit = -5.5 * interval;
	upperLimit = 5.5 * interval;
	display_c.beginPath();
	for (var i = lowerLimit; i <= upperLimit; i++) {  
		if (i == lowerLimit) {
			display_c.moveTo(blueCurveXStart, blueCurveYStart + (-1 * interval * Math.sin(-5.5 * num)));
		} else {
			nextX = i - lowerLimit + blueCurveXStart;
			nextY = blueCurveYStart + (-1 * interval * Math.sin(num * (i/interval)));
			display_c.lineTo(nextX, nextY);  
		}
	}

	display_c.stroke();

}