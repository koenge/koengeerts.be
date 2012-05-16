var debug = false;
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
	//draw();
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
	direction = direction=="down"?1:-1;
	curve = new Point(fromX+introLength, fromY);
	var to2 = new Point(curve.x+away, curve.y+direction*down);
	var to1 = new Point(curve.x+(to2.x-curve.x)/2, curve.y+(to2.y-curve.y)/2);
	var ctl1 = new Point(curve.x+(to1.x-curve.x)/2, curve.y);
	var ctl2 = new Point(to1.x+(to2.x-to1.x)/2, to2.y);

	context.beginPath();
	context.moveTo(fromX,fromY);
	context.lineTo(curve.x, curve.y);
	context.strokeStyle = color;
	context.quadraticCurveTo(ctl1.x,ctl1.y, to1.x, to1.y);
	context.quadraticCurveTo(ctl2.x, ctl2.y,to2.x,to2.y);
	context.lineTo(to2.x+outroLength, to2.y);
	context.stroke();
	
	if (debug){
	   drawProjectCircle(context, ctl1.x, ctl1.y, 3);
   	drawProjectCircle(context, ctl2.x, ctl2.y, 3);
   	drawProjectCircle(context, to1.x, to1.y, 3);
   	drawProjectCircle(context, curve.x, curve.y, 3);
   	drawProjectCircle(context, to2.x, to2.y, 3);
   }
	
	//text
	   //define points where the angle needs to be computed with
		var angle1 = new Point(ctl1.x-9*(ctl1.x-curve.x)/100,ctl1.y); // 9 procent to get a nice alignment
		var angle2 = new Point (ctl2.x+9*(to2.x-ctl2.x)/100,ctl2.y);
		if (debug){
		   drawProjectCircle(context, angle1.x, angle1.y, 3);
		   drawProjectCircle(context, angle2.x, angle2.y, 3);
	   }
	   
		var angle = Math.atan( (angle2.y-angle1.y)/(angle2.x-angle1.x) ); //the angle to place the text at
		context.save();
		context.beginPath();
		context.translate(to1.x,to1.y);
		context.rotate(angle);
		context.fillStyle = color;
		context.font = "20px 'Doppio One' ";
		
		var textWidth = context.measureText(text).width;
		var glue = 1; //how far the text will be from the line
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

//draw a project-dot at x,y coordinates
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

//draw the landing page for the site
function drawLandingPage(){
   //position us in the middle of the canvas
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

   //root line
	context.beginPath();
	context.fillStyle = "#555";
	context.fillRect(0, -45, 1, 90);
	context.restore();
	
	//move the texts to the right position
	placeText();
	
}

window.onresize = placeText; // let's move the text along w/ browserwidth

function placeText(){
	var koen_geerts = document.getElementById("koen_geerts_div");
	var portfolio = document.getElementById("portfolio_div");
	var about_me = document.getElementById("about_me_div");
	
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
