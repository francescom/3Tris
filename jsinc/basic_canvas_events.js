///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         BASIC VARS
///
//
//




var canvas=false;  
var ctx=false;
var MaxW = 0;
var MaxH = 0;
var BlendToColor = '0,0,0';
var BlendAmount = 100;
var BlendStopOn = 0;
var BlendStep = -5;
var startTimeOfAll = new Date().getTime();


///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         EVENTS SHELL
///
//
//

function BlendIdle() {
	if(BlendAmount!=BlendStopOn) {
		BlendAmount+=BlendStep;
		if(BlendStep>0 && BlendAmount>BlendStopOn) {
			BlendAmount=BlendStopOn;
		} else if(BlendStep<0 && BlendAmount<BlendStopOn) {
			BlendAmount=BlendStopOn;
		}
		if(BlendAmount==BlendStopOn) BlendDone(BlendAmount);
		DrawBlend();
	}
}



function BlendDone(Amt) {
	
}
function BlandTo(Col) {
	BlendToColor=Col;
	BlendStopOn=100;
	BlendStep=10;
}

function BlandFrom() {
	BlendStopOn=0;
	BlendStep=-10;
}

function MouseMoved(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	GameMouseAt(posx,posy);
}

function MouseDown(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	GameMouseDownAt(posx,posy);
}

function MouseUp(e) {
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	GameMouseUpAt(posx,posy);
}

function KeyPressed(e) {
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	
	var KeyVal=getCharDesc(code);
	var character = String.fromCharCode(code);
	GameKeyDown(KeyVal,character);
}

function KeyReleased(e) {
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	
	var KeyVal=getCharDesc(code);
	var character = String.fromCharCode(code);
	// GameKeyUp(KeyVal,character);
	setTimeout('GameKeyUp("'+KeyVal+'");',50);
}


function getCharDesc(char_code) {
	switch(char_code) {
		case 8:return "backspace"; 
		case 9:return "tab"; 
		case 13:return "enter"; 
		case 16:return "shift"; 
		case 17:return "ctrl"; 
		case 18:return "alt"; 
		case 19:return "pause/break"; 
		case 20:return "caps lock"; 
		case 27:return "escape"; 
		case 32:return "space"; 
		case 33:return "page up"; 
		case 34:return "page down"; 
		case 35:return "end"; 
		case 36:return "home"; 
		case 37:return "left"; 
		case 38:return "up"; 
		case 39:return "right"; 
		case 40:return "down"; 
		case 45:return "insert"; 
		case 46:return "delete"; 
		case 48:return "0"; 
		case 49:return "1"; 
		case 50:return "2"; 
		case 51:return "3"; 
		case 52:return "4"; 
		case 53:return "5"; 
		case 54:return "6"; 
		case 55:return "7"; 
		case 56:return "8"; 
		case 57:return "9"; 
		case 65:return "A"; 
		case 66:return "B"; 
		case 67:return "C"; 
		case 68:return "D"; 
		case 69:return "E"; 
		case 70:return "F"; 
		case 71:return "G"; 
		case 72:return "H"; 
		case 73:return "I"; 
		case 74:return "J"; 
		case 75:return "K"; 
		case 76:return "L"; 
		case 77:return "M"; 
		case 78:return "N"; 
		case 79:return "O"; 
		case 80:return "P";
		case 81:return "Q";
		case 82:return "R";
		case 83:return "S";
		case 84:return "T";
		case 85:return "U";
		case 86:return "V";
		case 87:return "W";
		case 88:return "X";
		case 89:return "Y";
		case 90:return "Z";
		case 91:return "left window key";
		case 92:return "right window key";
		case 93:return "select key";
		case 96:return "numpad 0";
		case 97:return "numpad 1";
		case 98:return "numpad 2";
		case 99:return "numpad 3";
		case 100:return "numpad 4";
		case 101:return "numpad 5";
		case 102:return "numpad 6";
		case 103:return "numpad 7";
		case 104:return "numpad 8";
		case 105:return "numpad 9";
		case 106:return "multiply";
		case 107:return "add";
		case 109:return "subtract";
		case 110:return "decimal point";
		case 111:return "divide";
		case 112:return "F1";
		case 113:return "F2";
		case 114:return "F3";
		case 115:return "F4";
		case 116:return "F5";
		case 117:return "F6";
		case 118:return "F7";
		case 119:return "F8";
		case 120:return "F9";
		case 121:return "F10";
		case 122:return "F11";
		case 123:return "F12";
		case 144:return "num lock";
		case 145:return "scroll lock";
		case 186:return "semi-colon";
		case 187:return "equal sign";
		case 188:return "comma";
		case 189:return "dash";
		case 190:return "period";
		case 191:return "forward slash";
		case 192:return "grave accent";
		case 219:return "open bracket";
		case 220:return "back slash";
		case 221:return "close braket";
		case 222:return "single quote"; 
	}
}


///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         MAIN SHELL
///				Start, Play, Resize
//
//

var MyCanvasEventPrevOnload = window.onload;

function MyCanvasEventStart() {

	if(MyCanvasEventPrevOnload != undefined) MyCanvasEventPrevOnload();
	window.scrollTo(0, 1);
	canvas = document.getElementById('canvas');  

	if (canvas.getContext){  
	  ctx = canvas.getContext('2d');
	} else {  
	  document.write("HTML5 not supported!");
	}
	if(ctx) {
		MyCanvasEventResize();
		setInterval(MyCanvasEventIdleLoop,40);
		document.onkeydown = KeyPressed;
		document.onkeyup = KeyReleased;
		document.onmousemove= MouseMoved;
		document.onmousedown= MouseDown;
		document.onmouseup= MouseUp;
	}
}

window.onload = MyCanvasEventStart;




function MyCanvasEventIdleLoop() {	
	GameDrawFrame();
	if(!SLOW) BlendIdle();
	/*
	var radgrad = ctx.createRadialGradient(MaxW/2,MaxH/2,0,MaxW/2,MaxH/2,Math.max(MaxW,MaxW)/2);  
	radgrad.addColorStop(0, 'rgba(0,0,0,0)');  
 	radgrad.addColorStop(1, 'rgba(0,0,0,.5  )');
 	ctx.fillStyle=radgrad;
 	
	ctx.fillRect(0,0,MaxW,MaxH);
	*/
}
function DrawBlend() {
	ctx.fillStyle = 'rgba('+BlendToColor+','+((BlendAmount+.0)/100.0)+')'; // 
	ctx.fillRect(0,0,MaxW,MaxH);

}


var MyCanvasEventPrevOnresize = window.onResize;

function MyCanvasEventResize() {
	if(MyCanvasEventPrevOnresize != undefined) MyCanvasEventPrevOnresize();

	var container = document.getElementById('container'); 
	canvas.width=container.clientWidth;
	canvas.height=container.clientHeight;
	MaxW = canvas.clientWidth;
	MaxH = canvas.clientHeight;
	// MyCanvasEventIdleLoop();
	
	GameResized();
	if(!SLOW) BlendIdle();
}
window.onresize=MyCanvasEventResize;



///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         HOOKS: Override with your platform dependent functions
///				(PlaySound does nothing on iPod/iPhone page)
//
//




	function PlaySound(Nme,Callback) {
		var Snd = document.getElementById(Nme);
		if(Snd) Snd.play();
		
	}

	function StopSound(Nme) {
		var Snd = document.getElementById(Nme);
		if(Snd) Snd.pause();
		
	}



///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         UTILITIES
///				Tick timer
//
//

	
var globalSound=false;

function PlaySoundUnique(Nme) {
	if(globalSound) StopSound(globalSound);
	var Snd = document.getElementById(Nme);
	Snd.play();
	globalSound=Nme;
}

function getTimer() {
	return new Date().getTime()-startTimeOfAll;
}

