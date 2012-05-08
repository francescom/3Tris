

///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         SHAPE DRAWING
///
//
//



function DrawShape(x,y,z,Shape) {
	var Fill='rgba(255,255,100,.05)';
	// if(SLOW) Fill=false;
	for(var i=0;i<Shape.length;i++) {
		DrawCube(ctx,(GameLeft+x+Shape[i][0])*GameCellWidth,(GameTop+y+Shape[i][1])*GameCellWidth,(z+Shape[i][2])*GameCellWidth+.5*GameCellWidth,GameCellWidth,GameCellWidth,GameCellWidth,Fill,'rgba(255,255,0,.2)');
	}
}



function FrezeShape(x,y,z,Shape) {
	for(var i=0;i<Shape.length;i++) {
		SetGrid(x+Shape[i][0],y+Shape[i][1],GameCellsZ-1-z-Shape[i][2],1);
	}
}

function IsShapeFree(x,y,z,Shape) {
	for(var i=0;i<Shape.length;i++) {
		if(GetGrid(x+Shape[i][0],y+Shape[i][1],GameCellsZ-1-z-Shape[i][2],1)) return false;
	}
	return true;
}



///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         BACKGROUND DRAWING
///
//
//




function DrawBack(W,D,StepsW,StepsD,A1,A2) {

	A1-=.2;
	A2-=-.2;
	
	var P;
	var Fill1='rgb(24,24,24)';
	var Fill2='rgb(51,51,51)';
	var Fill3='rgb(24,24,24)';
	var Stroke='rgba(255,255,255,.1)';
	var W2=W/2;
	var D2=D;
	var Cell=W/StepsW;
	
	if(SLOW) Stroke='rgb(64,64,64)';
	
	
	var Light1=A1*180/Math.PI;
	var Light2=A2*180/Math.PI;
	var Fill1Left=CanvasColorTint(Fill2,Light1);
	var Fill1Top=CanvasColorTint(Fill2,-Light2);
	var Fill2Left=CanvasColorTint(Fill2,-Light1);
	var Fill2Top=CanvasColorTint(Fill2,Light2);
	
	var Brd=W/40;

	P=CreatePoly(false,Fill1);
	
	AddPointToPoly(P,-W2-Brd,-W2-Brd,2);
	AddPointToPoly(P,W2+Brd,-W2-Brd,2);
	AddPointToPoly(P,W2+Brd,W2+Brd,2);
	AddPointToPoly(P,-W2-Brd,W2+Brd,2);
	AddPointToPoly(P,-W2-Brd,-W2-Brd,2);

	renderPoly(ctx,P);
	P=CreatePoly(false,Fill1Left);

	AddPointToPoly(P,-W2,-W2,0);
	AddPointToPoly(P,-W2,-W2,D2);
	AddPointToPoly(P,-W2,W2,D2);
	AddPointToPoly(P,-W2,W2,0);

	renderPoly(ctx,P);



	
	P=CreatePoly(false,Fill1Top);
	
	AddPointToPoly(P,-W2,-W2,0);
	AddPointToPoly(P,W2,-W2,0);
	AddPointToPoly(P,W2,-W2,D2);
	AddPointToPoly(P,-W2,-W2,D2);

	renderPoly(ctx,P);
	P=CreatePoly(false,Fill1Left);

	AddPointToPoly(P,-W2,-W2,0);
	AddPointToPoly(P,-W2,-W2,D2);
	AddPointToPoly(P,-W2,W2,D2);
	AddPointToPoly(P,-W2,W2,0);

	renderPoly(ctx,P);


	P=CreatePoly(false,Fill2Top);
	
	AddPointToPoly(P,W2,W2,0);
	AddPointToPoly(P,-W2,W2,0);
	AddPointToPoly(P,-W2,W2,D2);
	AddPointToPoly(P,W2,W2,D2);

	renderPoly(ctx,P);
	P=CreatePoly(false,Fill2Left);

	AddPointToPoly(P,W2,W2,0);
	AddPointToPoly(P,W2,W2,D2);
	AddPointToPoly(P,W2,-W2,D2);
	AddPointToPoly(P,W2,-W2,0);

	renderPoly(ctx,P);
	
	if(true) {
		for(var i=0; i<StepsW;i++) {
	
			ctx.beginPath();
			ctx.strokeStyle = Stroke; 
		
			moveTo3D(ctx,-W2+i*Cell,-W2,0);
			lineTo3D(ctx,-W2+i*Cell,-W2,D);
		
			moveTo3D(ctx,-W2,-W2+(i+1)*Cell,0);
			lineTo3D(ctx,-W2,-W2+(i+1)*Cell,D);
		
			moveTo3D(ctx,W2,-W2+i*Cell,0);
			lineTo3D(ctx,W2,-W2+i*Cell,D);
		
			moveTo3D(ctx,-W2+(i+1)*Cell,W2,0);
			lineTo3D(ctx,-W2+(i+1)*Cell,W2,D);
	
			ctx.stroke();
			ctx.closePath();
		}
	}
	
	if(true) {

		ctx.beginPath();
		ctx.fillStyle = Fill3; 
		
		moveTo3D(ctx,-W2,-W2,D);
		lineTo3D(ctx,-W2,W2,D);
		lineTo3D(ctx,W2,W2,D);
		lineTo3D(ctx,W2,-W2,D);
		lineTo3D(ctx,-W2,-W2,D);
	
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	
		for(var i=0;i<StepsD;i++) {
			ctx.beginPath();
			ctx.strokeStyle = Stroke; 
			
			moveTo3D(ctx,-W2,-W2,i*Cell);
			lineTo3D(ctx,-W2,W2,i*Cell);
			lineTo3D(ctx,W2,W2,i*Cell);
			lineTo3D(ctx,W2,-W2,i*Cell);
			lineTo3D(ctx,-W2,-W2,i*Cell);
	
			ctx.stroke();
			ctx.closePath();
		}
	}
}




///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         CONTENTS DRAWING
///
//
//



function DrawGrid() {
// var Stroke='rgba(0,0,0,.2)';
// if(SLOW) Stroke=false;

var C,C2;
	for(var i=0;i<GameCellsZ+6;i++) {
		C=ArrayColor2Canvas(Avg3Color([80,80,64],[32,64,128],[200,0,0],GameCellsZ-i,GameCellsZ),1);
		C2=CanvasColorTint(C,-40);
					
		for(var j=0;j<GameCellsXY;j++) {
			for(var k=0;k<GameCellsXY;k++) {
				if(GetGrid(j,k,i)>0) {
//					C=ArrayColor2Canvas(AvgColor([64,64,64],[255,0,0],GameCellsZ-i,GameCellsZ),1);
					DrawCube(ctx,(GameLeft+j)*GameCellWidth,(GameTop+k)*GameCellWidth,(GameCellsZ-1-i)*GameCellWidth+.5*GameCellWidth,GameCellWidth,GameCellWidth,GameCellWidth,C,C2);
				}
			}
		}
	}
}


function AvgColor(C1,C2,a,t) {
	return [AvgVal(C1[0],C2[0],a,t),AvgVal(C1[1],C2[1],a,t),AvgVal(C1[2],C2[2],a,t)];
}
function Avg3Color(C1,C2,C3,a,t) {
	if(a>t/2) return AvgColor(C1,C2,a-t/2,t/2);
	else return AvgColor(C2,C3,a,t/2)
}

function AvgVal(v1,v2,a,t) {
	return (v1*a+v2*(t-a))/t;
}


///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         SHAPE ROTATIONS
///
//
//



function RotateXYPlus90AroundZ(P3D) {
	return [P3D[1],-P3D[0],P3D[2]];
}

function RotateXYMinus90AroundZ(P3D) {
	return [-P3D[1],P3D[0],P3D[2]];
}


function RotateXZPlus90AroundY(P3D) {
	return [P3D[2],P3D[1],-P3D[0]];
}

function RotateXZMinus90AroundY(P3D) {
	return [-P3D[2],P3D[1],P3D[0]];
}


function RotateYZPlus90AroundX(P3D) {
	return [P3D[0],P3D[2],-P3D[1]];
}

function RotateYZMinus90AroundX(P3D) {
	return [P3D[0],-P3D[2],P3D[1]];
}


function RotateZ(Shape) {
	for(var i=0;i<Shape.length;i++) {
		Shape[i]=RotateXYPlus90AroundZ(Shape[i]);
	}
	return Shape;
}

function RotateY(Shape) {
	for(var i=0;i<Shape.length;i++) {
		Shape[i]=RotateXZPlus90AroundY(Shape[i]);
	}
	return Shape;
}

function RotateX(Shape) {
	for(var i=0;i<Shape.length;i++) {
		Shape[i]=RotateYZPlus90AroundX(Shape[i]);
	}
	return Shape;
}


function _RotateZ(Shape) {
	for(var i=0;i<Shape.length;i++) {
		Shape[i]=RotateXYMinus90AroundZ(Shape[i]);
	}
	return Shape;
}

function _RotateY(Shape) {
	for(var i=0;i<Shape.length;i++) {
		Shape[i]=RotateXZMinus90AroundY(Shape[i]);
	}
	return Shape;
}

function _RotateX(Shape) {
	for(var i=0;i<Shape.length;i++) {
		Shape[i]=RotateYZMinus90AroundX(Shape[i]);
	}
	return Shape;
}
