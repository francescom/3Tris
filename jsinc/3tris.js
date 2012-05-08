

///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         GAME VARS
///
//
//




var GameButtonIsDown = false;
var GameMouseX = 0;
var GameMouseY = 0;
var GameX = 0;
var GameY = 0;
var GameZ = 0;
var GameRx = 0;
var GameRy = 0;
var GameRz = 0;
var GameXYStep = 1;
var GameRotStep = 90;
var GameEasyMode = false;
var GameLevel=1;
var GameTickTimer;
var GameScore=0;
var GameLines=0;

var GameShapeId=-1,NextShapeId=-1;
var GameShape;
var GameBorder=-4;
var GameCellsXY=5;
var GameBorderX=0;
var GameBorderY=0;
var GameLeft=0;
var GameTop=0;
var GameWidth=0;
var GameDepth=0;
var GameCellsZ=8;
var GameCellWidth=0;


var GAME_HALTED=true;
var HAS_MOVED=true;
var HAS_CHANGED=true;
var DROP_DOWN=false;

var SMALL_SCREEN=false;
var SLOW=false;
var DONT_MOVE_CAMERA=false;



var ImageData;
// var OffscreenCanvas;
// var OffscreenCtx;

var Shapes=[

	[[-1,0,0],[0,0,0],[0,1,0],[1,0,0]], // T
	[[-1,0,0],[0,0,0],[1,1,0],[1,0,0]], // L
	[[-1,-1,0],[-1,0,0],[0,0,0],[0,1,0]], // N
 	[[-1,0,0],[0,0,0],[-1,1,0],[0,1,0]], // Square
	[[-1,0,0],[0,0,0],[1,0,0],[2,0,0]], // I
	[[-1,0,0],[0,0,0],[0,1,0],[0,1,-1]], // Left ThumbUp
	[[-1,0,0],[0,0,0],[0,1,0],[-1,0,-1]], // Right ThumbUp
	[[-1,0,0],[0,0,0],[0,1,0],[0,0,-1]] // Axes
	
];




///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         STATUS GRID
///
//
//




var GameGrid=[];

function BuildGrid(w,h) {
	GameGrid=[];
	for(var i=0;i<h+8;i++) {
		GameGrid[i]=[];
		for(var j=0;j<w;j++) {
			GameGrid[i][j]=[];
			for(var k=0;k<w;k++) {
				GameGrid[i][j][k]=0;
			}
		}
	}
}

function SetGrid(x,y,z,val) {
	if(x<0 || x>=GameCellsXY) return;
	if(y<0 || y>=GameCellsXY) return;
	if(z<0 || z>=GameCellsZ+6) return;
	GameGrid[z][x][y]=val;
}

function GetGrid(x,y,z) {
	if(x<0 || x>=GameCellsXY) return 99;
	if(y<0 || y>=GameCellsXY) return 99;
	if(z<0 || z>=GameCellsZ+6) return 99;
	
	return GameGrid[z][x][y];
}




function CleanGrid() {
var IsClean;
var CopyOffset=0;
	for(var i=0;i<GameCellsZ+5;i++) {
		var IsFull=true;
		for(var j=0;j<GameCellsXY;j++) {
			for(var k=0;k<GameCellsXY;k++) {
				if(GetGrid(j,k,i)==0) {
					IsFull=false;
				}
				if(CopyOffset>0) {
					SetGrid(j,k,i-CopyOffset,GetGrid(j,k,i));
				}
			}
		}
		if(IsFull) {
			if(CopyOffset==0) PlaySound("wall_sound");
			CopyOffset++;
		}
	}
	if(CopyOffset>0) {
		IncLines(CopyOffset);
	}
}





///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         SHAPES
///
//
//


function UpdateNexCurrentStatus(Curr,Next) {
	document.getElementById("curr_img").src = "3d/3tris_"+Curr+".gif";
	document.getElementById("next_img").style.visibility="hidden";
	setTimeout(function() {
		var nxt=document.getElementById("next_img");
		nxt.style.visibility="visible";
		nxt.src = "3d/3tris_"+Next+".gif";
	},1000);
}

function UpdateScore(Pts) {
	document.getElementById("score_txt").innerHTML = Pts+"";
}

function UpdateLevel(Lev) {
	document.getElementById("level_txt").innerHTML = Lev+"";
}

function IncScore(Pts) {
	GameScore+=Pts;
	UpdateScore(GameScore);
}

function IncLines(n) {
	IncScore(n*25);
	GameLines+=n;
	if(GameLevel<GameLines/10 && GameLevel<10) UpdateLevel(++GameLevel);
}


function NewShapeId() {
	var RandShape;
	
	if(GameEasyMode) RandShape=Math.floor(5*Math.random());
	else RandShape=Math.floor(8*Math.random());
	
	return RandShape;
}

function NewShape() {
	
	if(NextShapeId==-1) NextShapeId=NewShapeId();
	
	GameShapeId=NextShapeId;
	NextShapeId=NewShapeId();
	
	UpdateNexCurrentStatus(GameShapeId,NextShapeId);

	GameShape=DupArray(Shapes[GameShapeId]);
	GameX=Math.floor(GameCellsXY/2);
	GameY=Math.floor(GameCellsXY/2);
	GameZ=0;
}

function DupArray(A) {
	var L=A.length;
	var O=[];
	for(var i=0;i<L;i++) O[i]=A[i];
	return O;
}


function MustGoDown() {
	if(GAME_HALTED) return false;

	if(KeyIsDown("space") || DROP_DOWN) {
		IncScore(2);
		return true;
	}
	var TicksToFall=(11-GameLevel)*250;
	if(TicksToFall<2) TicksToFall=2;
	var NewTimer=getTimer();
	
	if(NewTimer-GameTickTimer>TicksToFall) {
		GameTickTimer=NewTimer;
		return true;
	}
	return false;
}





///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         GAME SHELL AND EVENTS HOOKS
///
//
//

function ResetAll() {
	
	GameButtonIsDown = false;
	GameMouseX = 0;
	GameMouseY = 0;
	GameX = 0;
	GameY = 0;
	GameZ = 0;
	GameRx = 0;
	GameRy = 0;
	GameRz = 0;
	GameEasyMode = false;
	GameLevel=1;
	GameScore=0;
	UpdateScore(0);
	GameLines=0;

	GameShapeId=-1;
	NextShapeId=-1;

	GAME_HALTED=true;
	HAS_MOVED=true;
	HAS_CHANGED=true;
	DROP_DOWN=false;
}


function GameInit() {
	ResetAll();
	GameTickTimer=getTimer();
	BuildGrid(GameCellsXY,GameCellsZ);
		
	NewShape();
	GAME_HALTED=false;
	// OffscreenCanvas=document.createElement('canvas');
	// OffscreenCtx=OffscreenCanvas.getContext('2d');

}


var CountFrames=0;




function GameDrawFrame() {
	
	if(GAME_HALTED) return;
	//ctx.clearRect(0,0,MaxW,MaxH); 
	// GameCellsZ=7+Math.floor(3*Math.random());


/////////////
///////         FRAME INITIALIZATION STUFF
///
//
	
	GameWidth=Math.min(MaxW,MaxH)-GameBorder*2;
	GameBorderX=(MaxW-GameWidth)/2;
	GameBorderY=(MaxH-GameWidth)/2;
	
	GameLeft=-Math.floor(GameCellsXY/2);;
	GameTop=-Math.floor(GameCellsXY/2);;
	
	GameCellWidth=GameWidth/GameCellsXY;
	GameXYStep=1;
	
	OriginX=MaxW/2;
	OriginY=MaxH/2;
	
	
	if(GAME_HALTED) return;
	

	
	if(!DONT_MOVE_CAMERA) {
	
		FieldRotationX+=((GameY+GameTop)/6.0-FieldRotationX)/32.0;
		FieldRotationY+=((GameX+GameLeft)/6.0-FieldRotationY)/32.0;
		// RotationCenterY=-FieldRotationX*2;
		// RotationCenterX=-FieldRotationY*2;
		// RotationCenterZ=-200-(FieldRotationX*FieldRotationX+FieldRotationY*FieldRotationY)*400;
		
		// OffsetX=Math.floor(5*Math.random());
		// OffsetY=Math.floor(5*Math.random());
		// OffsetZ=Math.floor(10*Math.random());
	 	HAS_CHANGED=true;
	 	
	}
	
	var OffX,OffY;
	var MaxX=MaxW-20,MaxY=MaxH-20;
	
	
	


/////////////
///////         PLAY
///
//
	
	
		
	if(MustGoDown()) {
		GameZ++;
		if(!IsShapeFree(GameX,GameY,GameZ,GameShape)) {
			GameZ--;
			IncScore(20);
			if(GameZ<=0) {
				GameOver();
				PlaySoundUnique("bad_music_sound");
				// StopSound("main_loop_sound");
				return;
			}
			FrezeShape(GameX,GameY,GameZ,GameShape);
			PlaySound("piece_sound");
			HAS_CHANGED=true;
			CleanGrid();
			NewShape();
			ResetKey("space");
			DROP_DOWN=false;
		}
		HAS_MOVED=true;
		
	}
	

	
	if(HAS_MOVED || HAS_CHANGED || !DONT_MOVE_CAMERA) {
		
		if(HAS_CHANGED || !DONT_MOVE_CAMERA) {
			ctx.fillStyle = 'rgb(0,0,0)'; 
			
			ctx.fillRect(0,0,MaxW,MaxH);
			var Shape=Math.floor(5*Math.random());
			ctx.strokeStyle = 'rgba(255,255,255,.5)';
			
			new3DFrame(ctx);
			
			DrawBack(GameWidth,GameCellsZ*GameCellWidth,GameCellsXY,GameCellsZ,FieldRotationY,FieldRotationX);
			DrawGrid();
		
			render3DFrame(ctx);
			
			if(DONT_MOVE_CAMERA) {
				ImageData=ctx.getImageData(0, 0, MaxW, MaxH);
				// ImageData.data=Array(ImageData.data).slice(0);
				// OffscreenCanvas.src=canvas.toDataURL();
				// OffscreenCtx.putImageData(ImageData, 0, 0);
				// ImageData=OffscreenCtx.getImageData(0, 0, MaxW, MaxH);
			}
			DrawShape(GameX,GameY,GameZ,GameShape);
			render3DFrame(ctx);
		} else {
			// ctx.drawImage(OffscreenCanvas, 0, 0);
			ctx.putImageData(ImageData, 0, 0);

			new3DFrame(ctx);
			DrawShape(GameX,GameY,GameZ,GameShape);
			render3DFrame(ctx);
		}
	}
	CountFrames++;
	HAS_MOVED=false;
	HAS_CHANGED=false;
}

function DropDown() {
	if(GAME_HALTED) return;
	DROP_DOWN=true;
}

function GameResized() {
	if(GAME_HALTED) return;
	HAS_MOVED=true;
	// OffscreenCanvas=new Image(MaxW,MaxH);
	// OffscreenCanvas=document.createElement('canvas');
    // OffscreenCanvas.width=MaxW;
    // OffscreenCanvas.height=MaxH

	GameDrawFrame();
}

function GameOver() {
	// alert("Game Over!");
	GAME_HALTED=true;
	ResetIntfToStart();
	EndGame();
	MyScoreSaverSaveScore(GameScore);
}

function EndGame() {
}


function CheckOrRevert(aShape) {
	if(GAME_HALTED) return;
	if(!IsShapeFree(GameX,GameY,GameZ,aShape)) {
		if(IsShapeFree(GameX+1,GameY,GameZ,aShape)) {
			GameShape=aShape;
			GameX++;
			HAS_MOVED=true;
		} else if(IsShapeFree(GameX-1,GameY,GameZ,aShape)) {
			GameShape=aShape;
			GameX--;
			HAS_MOVED=true;
		} else if(IsShapeFree(GameX,GameY+1,GameZ,aShape)) {
			GameShape=aShape;
			GameY++;
			HAS_MOVED=true;
		} else if(IsShapeFree(GameX,GameY-1,GameZ,aShape)) {
			GameShape=aShape;
			GameY--;
			HAS_MOVED=true;
		} else if(IsShapeFree(GameX+2,GameY,GameZ,aShape)) {
			GameShape=aShape;
			GameX+=2;
			HAS_MOVED=true;
		} else if(IsShapeFree(GameX-2,GameY,GameZ,aShape)) {
			GameShape=aShape;
			GameX-=2;
			HAS_MOVED=true;
		} else if(IsShapeFree(GameX,GameY+2,GameZ,aShape)) {
			GameShape=aShape;
			GameY+=2;
			HAS_MOVED=true;
		} else if(IsShapeFree(GameX,GameY-2,GameZ,aShape)) {
			GameShape=aShape;
			GameY-=2;
			HAS_MOVED=true;
		}
		return;
	}
	GameShape=aShape;
	HAS_MOVED=true;
}

function MoveShape(dx,dy) {
	if(GAME_HALTED) return;

	if(!IsShapeFree(GameX+dx,GameY+dy,GameZ,GameShape)) {
		return;
	}
	HAS_MOVED=true;
	GameX+=dx;
	GameY+=dy;
}

var GameKeyIsDown=[];

function KeyIsDown(k) {
	if(GAME_HALTED) return false;
	return (GameKeyIsDown[k]);
}

function ResetKey(k) {
	if(GAME_HALTED) return false;
	GameKeyIsDown[k]=false;
}

function GameKeyDown(k,ch) {
	if(GAME_HALTED) return;
	
	GameKeyIsDown[k]=true;

	switch(k) {
		case "left": MoveShape(-1,0); break;
		case "right": MoveShape(1,0); break;
		case "up": MoveShape(0,-1); break;
		case "down": MoveShape(0,1); break;
		case "S": CheckOrRevert(RotateX(DupArray(GameShape))); break;
		case "A": CheckOrRevert(RotateY(DupArray(GameShape))); break;
		case "D": CheckOrRevert(RotateZ(DupArray(GameShape))); break;
		case "space":
		break;
	}
}
function GameKeyUp(k) {
	GameKeyIsDown[k]=false;
	switch(k) {
		case "space": break; // Space is handled by KeyIsDown("space")
	}
}

function GameMouseAt(posx,posy) {
	if(GAME_HALTED) return;
	
	GameMouseX=posx;
	GameMouseY=posy;
}

function GameMouseDownAt(posx,posy) {
	if(GAME_HALTED) return;
	
	GameMouseX=posx;
	GameMouseY=posy;
	GameButtonIsDown=true;
}

function GameMouseUpAt(posx,posy) {
	if(GAME_HALTED) return;
	
	GameMouseX=posx;
	GameMouseY=posy;
	GameButtonIsDown=false;
}



