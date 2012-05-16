
var orange="#f39200";
var green="#94C11e";
var blue="#2daae1";
var canvas;
var context;

/**
*  A point in the 2D space with an x and y coordinate
*/
function Point(x,y){
   this.x = x;
   this.y = y;
}
// returns computed height of an html element
function getComputedHeight(theElt){
   return getComputedProperty("height", theElt);
}
// returns computed width of an html element	
function getComputedWidth(theElt){
   return getComputedProperty("width", theElt);
}
// returns computed property (height, width, ...) of an html element
function getComputedProperty(property, theElt){
   docObj = document.getElementById(theElt);
   var tmp1 = document.defaultView.getComputedStyle(docObj, "").getPropertyValue(property);
   tmp = tmp1.split('px');
   tmp = tmp[0];
   return tmp;
}	


window.onload = function () {
	canvas = document.getElementById("git_canvas");
	canvas.width = 960;
	canvas.height= 750;
	context = canvas.getContext("2d");             
	drawLandingPage();
}

//draw the git tree
function draw() {
	context.lineWidth= 10;
	
	branch(100,300,context,"down", orange,50,200, 0, 50, "JAVA");
	branch(50, 300, context, "down", green,100,200, 0, 200, "PHP");
	branch(50,300, context, "up", "#000000", 200, 300, 0, 250, "HASKELL");
	
	drawProjectCircle(context, 350, 400, 8, 8);
	context.beginPath();
	context.strokeStyle = blue;
	context.moveTo(0,300);
	context.lineTo(canvas.width-100, 300);
	context.stroke();
}

/* Draw a git branch with given parameters
*
*  ==============================================
*       \ t            ^
*        \ x       down
*         \ t         v
*           ------------------------   
*       <  > away
*<intro>    <    outrolength       >     
*
*/
function branch(fromX, fromY,context, direction, color,down,away, introLength, outroLength, text) {
	if(direction == "down"){
		direction = 1;
	}else{
		direction = -1;
	}
	curveX = fromX+introLength;
	curveY = fromY;
	var to2 = new Point(curveX+away, curveY+direction*down);
	//var to2x = curveX+away;
	//var to2y = curveY+direction*down;
	var to1 = new Point(curveX+(to2.x-curveX)/2, curveY+(to2.y-curveY)/2);
	//var to1x = curveX+(to2x-curveX)/2;
	//var to1y = curveY+(to2y-curveY)/2;
	var ctl1 = new Point(curveX+(to1.x-curveX)/2, curveY);
	//var ctl1x = curveX+(to1x-curveX)/2
	//var ctl1y = curveY;
	var ctl2 = new Point(to1.x+(to2.x-to1.x)/2, to2.y);
	//var ctl2x = to1x+(to2x-to1x)/2;
	//var ctl2y = to2y;
	//alert("context.quadraticCurveTo("+ctl1x+","+ctl1y+","+to1x+","+to1y+");\ncontext.quadraticCurveTo("+ctl2x+","+ctl2y+","+to2x+","+to2y+");");
	context.beginPath();
	context.moveTo(fromX,fromY);
	context.lineTo(curveX, curveY);
	context.strokeStyle = color;
	context.quadraticCurveTo(ctl1.x,ctl1.y, to1.x, to1.y);
	context.quadraticCurveTo(ctl2.x, ctl2.y,to2.x,to2.y);
	context.lineTo(to2.x+outroLength, to2.y);
	context.stroke();
	
	/*drawProjectCircle(context, ctl1x, ctl1y, 3);
	drawProjectCircle(context, ctl2x, ctl2y, 3);
	drawProjectCircle(context, to1x, to1y, 3);
	drawProjectCircle(context, curveX, curveY, 3);
	drawProjectCircle(context, to2x, to2y, 3);*/
	
	//text
		var angle1X = ctl1.x-9*(ctl1.x-curveX)/100;
		var angle1Y = ctl1.y;
		var angle2X = ctl2.x+9*(to2.x-ctl2.x)/100;
		var angle2Y = ctl2.y;
		
		//drawProjectCircle(context, angle1X, angle1Y, 3);
		//drawProjectCircle(context, angle2X, angle2Y, 3);
		var angle = Math.atan( (angle2Y-angle1Y)/(angle2X-angle1X) );
		context.save();
		context.beginPath();
		context.translate(to1.x,to1.y);
		context.rotate(angle);
		context.fillStyle = color ;
		context.font = "20px 'Doppio One' ";
		var textWidth = context.measureText(text).width;
		var glue = 1;
		context.textBaseline = "bottom";
		context.textAlign = "center";
		if(direction == -1){
			context.textBaseline = "bottom";
			glue = -2;
		}else{
			context.textBaseline = "top";
			glue = 2;
		}
		context.fillText(text, 0,glue, textWidth);
		context.fill();
		context.restore();
}

function drawProjectCircle(context, x,y, size, lineWidth){
	context.save();
	context.beginPath();
	context.lineWidth = lineWidth;
	context.strokeStyle = "black";
	context.arc(x,y, size, 0, 2*Math.PI, false);
	context.fillStyle="white";
	context.stroke();
	context.fill();
	context.restore();
}

function drawLandingPage(){
	context.translate(context.canvas.width/2, context.canvas.height);
	context.rotate(-Math.PI/2);
	context.beginPath();
	context.lineWidth=10;
	//baseLine
	context.moveTo(0,0);
	context.strokeStyle = blue;
	context.lineTo(0+640,0);
	context.stroke();
	drawProjectCircle(context, 640,0, 7, 8);
	
	//portfolio line
	context.beginPath();
	branch(0,-10, context, "up", orange, 100, 150, 250, 100, "");
	context.stroke();
	drawProjectCircle(context, 500,-10-100, 7, 8);
	
	//about line
	context.beginPath();
	branch(0,10, context, "down", green, 100, 150, 300, 100, "");
	context.stroke();
	drawProjectCircle(context, 550,10+100, 7, 8);
	
	
	//gradient
	//context.save();
	context.beginPath();
	context.fillStyle = "#555";
	context.fillRect(0, -45, 1, 90);
	context.restore();
	//draw the text ! Or maybe we just need to put those divs in the right place
	
	placeText();
	
	
	//Koen Geerts
	/*context.save();
	context.beginPath();
	context.translate(660,160);
	context.rotate(Math.PI/2);
	context.fillStyle = "black" ;
	context.font = "40px 'Doppio One' ";
	//context.font = "20px Arial";
	var textWidth = context.measureText("Koen Geerts").width;
	context.textBaseline = "alphabetic";
	context.textAlign = "center";
	context.fillText("Koen Geerts", 0,0, textWidth);
	context.fill();
	context.restore();*/
	
	
	//portfolio
	/*context.save();
	context.beginPath();
	context.font = "30px 'Doppio One' ";
	//context.font = "20px Arial";
	var textWidth = context.measureText("Portfolio").width;
	context.translate(490,50-(textWidth+20));
	context.rotate(Math.PI/2);
	context.fillStyle = "black" ;

	context.textBaseline = "alphabetic";
	context.textAlign = "left";
	context.fillText("Portfolio", 0,0, textWidth);
	context.fill();
	context.restore();*/
	
	/*//portfolio
	context.save();
	context.beginPath();
	context.font = "30px 'Doppio One' ";
	//context.font = "20px Arial";
	var textWidth = context.measureText("About me").width;
	context.translate(540, 270+20);
	context.rotate(Math.PI/2);
	context.fillStyle = "black" ;

	context.textBaseline = "alphabetic";
	context.textAlign = "left";
	context.fillText("About me", 0,0, textWidth);
	context.fill();
	context.restore();*/
	
}
window.onresize = placeText;

function placeText(){
	var koen_geerts = document.getElementById("koen_geerts_div");
	var portfolio = document.getElementById("portfolio_div");
	var about_me = document.getElementById("about_me_div");
	

	//koen_geerts.width = getComputedWidth("koen_geerts_div");
	//koen_geerts.height = getComputedHeight("koen_geerts_div");
	
	
	koen_geerts.style.position = "absolute";
	koen_geerts.style.top=(90-getComputedHeight("koen_geerts_div")) + "px";
	koen_geerts.style.left=(canvas.offsetLeft + canvas.width/2-getComputedWidth("koen_geerts_div")/2)+ "px";
	
	portfolio.style.position = "absolute";
	portfolio.style.top=(260-getComputedHeight("portfolio_div")+6) + "px";
	portfolio.style.left=(canvas.offsetLeft+370-getComputedWidth("portfolio_div")-20)+ "px";
	
	about_me.style.position = "absolute";
	about_me.style.top=(210-getComputedHeight("about_me_div")+6) + "px";
	about_me.style.left=(canvas.offsetLeft+610)+ "px";
}
