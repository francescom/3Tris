
///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         3D LIBRARY CONFIGURAATION VARS
///
//
//



// Public:
var OriginX=0;
var OriginY=0;

var RotationCenterX=0;
var RotationCenterY=0;
var RotationCenterZ=0;
var FieldRotationY=0;
var FieldRotationX=0;
var YScale=1;
var OfX=0;

var OffsetX=0;
var OffsetY=0;
var OffsetZ=0;


///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         BASIC 3D LIBRARY CONVERSION PROCEDURES 3D to 2D
///
//
//

/*

First around Y axis:

z' = z*cos q - x*sin q
x' = z*sin q + x*cos q
y' = y


Then around X axis:

y" = y'*cos q' - z'*sin q'
z" = y'*sin q' + z'*cos q'
x" = x'


var x3=x2=z*Math.sin(Y) + x*Math.cos(FieldRotationY);
var z2=z*Math.cos(FieldRotationY)-x*Math.sin(FieldRotationY);
var y3=y*Math.cos(FieldRotationX) - z2*Math.sin(FieldRotationX)
var z3 = y*Math.sin(FieldRotationX)+z2*Math.cos(FieldRotationX);


*/



function rotateToCamera(XYZ) {
	var x=XYZ[0]-OffsetX-RotationCenterX;
	var y=XYZ[1]-OffsetY-RotationCenterY;
	var z=XYZ[2]-OffsetZ-RotationCenterZ;
		
	var x2=-z*Math.sin(FieldRotationY) + x*Math.cos(FieldRotationY);
	var x3=x2;
	var z2=z*Math.cos(FieldRotationY)+x*Math.sin(FieldRotationY);
	var y3=y*Math.cos(FieldRotationX)-z2*Math.sin(FieldRotationX)
	var z3 =y*Math.sin(FieldRotationX)+z2*Math.cos(FieldRotationX);

	return [x3,y3,z3];
}



function C3D2X(x,y,z) {

	var P=rotateToCamera([x,y,z]);

	x3=P[0];
	y3=P[1];
	z3=P[2];
	
	if(Math.abs(z3)<.001) z3+=.002;
	var Cx=1000 * x3 / (z3/YScale + 1000);
	return Cx;
}

function C3D2Y(x,y,z) {

	var P=rotateToCamera([x,y,z]);

	x3=P[0];
	y3=P[1];
	z3=P[2];
	
	
	if(Math.abs(z3)<.001) z3+=.002;
	var Cy=1000 * y3 / (z3/YScale + 1000);
	return Cy;
}

function C3D2S(x,y,z) {
	x-=OffsetX;
	y-=OffsetY;
	z-=OffsetZ;
		
	x-=RotationCenterX;
	y-=RotationCenterY;
	z-=RotationCenterZ;
	
	var x2=z*Math.sin(FieldRotationY) + x*Math.cos(FieldRotationY);
	var x3=RotationCenterX+x2;
	var z2=z*Math.cos(FieldRotationY)-x*Math.sin(FieldRotationY);
	var y3=RotationCenterY+y*Math.cos(FieldRotationX)-z2*Math.sin(FieldRotationX)
	var z3 =RotationCenterZ+y*Math.sin(FieldRotationX)+z2*Math.cos(FieldRotationX);

	if(Math.abs(z3)<.001) z3+=.002;
	var Cs=100000 / (1000 + z3/YScale);
	return Cs;
}


///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         BASIC 3D LIBRARY DEMO PRIMITIVES
///
//
//


// Instantly stroke a Cube, not deferred to zorder
function StrokeCube(Obj,ax,ay,az,W,D,H,Stroke) {

	W/=2;
	D/=2;
	H/=2;


	Obj.strokeStyle = Stroke;  
	
	Obj.beginPath();
	
	Obj.moveTo(OriginX+C3D2X(ax+W,ay+H,az+D),OriginY+C3D2Y(ax+W,ay+H,az+D));
	Obj.lineTo(OriginX+C3D2X(ax+-W,ay+H,az+D),OriginY+C3D2Y(ax+-W,ay+H,az+D));
	Obj.lineTo(OriginX+C3D2X(ax+-W,ay+H,az+-D),OriginY+C3D2Y(ax+-W,ay+H,az+-D));
	Obj.lineTo(OriginX+C3D2X(ax+W,ay+H,az+-D),OriginY+C3D2Y(ax+W,ay+H,az+-D));
	Obj.lineTo(OriginX+C3D2X(ax+W,ay+H,az+D),OriginY+C3D2Y(ax+W,ay+H,az+D));
	
	Obj.stroke();
	Obj.closePath();




	Obj.beginPath();
	
	Obj.moveTo(OriginX+C3D2X(ax+W,ay-H,az+D),OriginY+C3D2Y(ax+W,ay-H,az+D));
	Obj.lineTo(OriginX+C3D2X(ax+-W,ay-H,az+D),OriginY+C3D2Y(ax+-W,ay-H,az+D));
	Obj.lineTo(OriginX+C3D2X(ax+-W,ay-H,az+-D),OriginY+C3D2Y(ax+-W,ay-H,az+-D));
	Obj.lineTo(OriginX+C3D2X(ax+W,ay-H,az+-D),OriginY+C3D2Y(ax+W,ay-H,az+-D));
	Obj.lineTo(OriginX+C3D2X(ax+W,ay-H,az+D),OriginY+C3D2Y(ax+W,ay-H,az+D));
	
	Obj.stroke();
	Obj.closePath();
	
	
	
	Obj.beginPath();

	Obj.moveTo(OriginX+C3D2X(ax+W,ay+H,az+D),OriginY+C3D2Y(ax+W,ay+H,az+D));
	Obj.lineTo(OriginX+C3D2X(ax+W,ay-H,az+D),OriginY+C3D2Y(ax+W,ay-H,az+D));
	
	Obj.moveTo(OriginX+C3D2X(ax+-W,ay+H,az+D),OriginY+C3D2Y(ax+-W,ay+H,az+D));
	Obj.lineTo(OriginX+C3D2X(ax+-W,ay-H,az+D),OriginY+C3D2Y(ax+-W,ay-H,az+D));
	
	Obj.moveTo(OriginX+C3D2X(ax+-W,ay+H,az+-D),OriginY+C3D2Y(ax+-W,ay+H,az+-D));
	Obj.lineTo(OriginX+C3D2X(ax+-W,ay-H,az+-D),OriginY+C3D2Y(ax+-W,ay-H,az+-D));
	
	Obj.moveTo(OriginX+C3D2X(ax+W,ay+H,az+-D),OriginY+C3D2Y(ax+W,ay+H,az+-D));
	Obj.lineTo(OriginX+C3D2X(ax+W,ay-H,az+-D),OriginY+C3D2Y(ax+W,ay-H,az+-D));

	
	Obj.stroke();
	Obj.closePath();
		
}

// Add a Cube, to render queue, deferred to zorder
// requires new3DFrame() before and render3DFrame() after.
function DrawCube(Obj,ax,ay,az,W,D,H,Fill,Stroke) {

	W/=2;
	D/=2;
	H/=2;

	var P;


	// BOTTOM
	P=CreatePoly(Stroke,CanvasColorTint(Fill,-40));
	
	AddPointToPoly(P,ax+W,ay+H,az+D);
	AddPointToPoly(P,ax+-W,ay+H,az+D);
	AddPointToPoly(P,ax+-W,ay+H,az+-D);
	AddPointToPoly(P,ax+W,ay+H,az+-D);

	CollectPolygon(P);

	// TOP
	P=CreatePoly(Stroke,CanvasColorTint(Fill,-10));
	
	AddPointToPoly(P,ax+W,ay-H,az+D);
	AddPointToPoly(P,ax+-W,ay-H,az+D);
	AddPointToPoly(P,ax+-W,ay-H,az+-D);
	AddPointToPoly(P,ax+W,ay-H,az+-D);

	CollectPolygon(P);

	// RIGHT
	P=CreatePoly(Stroke,CanvasColorTint(Fill,-30));
	
	AddPointToPoly(P,ax+W,ay+H,az+D);
	AddPointToPoly(P,ax+W,ay-H,az+D);
	AddPointToPoly(P,ax+W,ay-H,az-D);
	AddPointToPoly(P,ax+W,ay+H,az-D);

	CollectPolygon(P);

	// LEFT
	P=CreatePoly(Stroke,CanvasColorTint(Fill,-10));
	
	AddPointToPoly(P,ax-W,ay+H,az+D);
	AddPointToPoly(P,ax-W,ay-H,az+D);
	AddPointToPoly(P,ax-W,ay-H,az-D);
	AddPointToPoly(P,ax-W,ay+H,az-D);

	CollectPolygon(P);


	// BELOW
	/*
	P=CreatePoly(Stroke,CanvasColorTint(Fill,-40));
	
	AddPointToPoly(P,ax+W,ay+H,az+D);
	AddPointToPoly(P,ax+W,ay-H,az+D);
	AddPointToPoly(P,ax-W,ay-H,az+D);
	AddPointToPoly(P,ax-W,ay+H,az+D);

	CollectPolygon(P);
	*/

	// FRONT
	P=CreatePoly(Stroke,CanvasColorTint(Fill,10));
	
	AddPointToPoly(P,ax+W,ay+H,az-D);
	AddPointToPoly(P,ax+W,ay-H,az-D);
	AddPointToPoly(P,ax-W,ay-H,az-D);
	AddPointToPoly(P,ax-W,ay+H,az-D);

	CollectPolygon(P);
	
	// LIGHT
	P=CreatePoly(false,CanvasColorTint(Fill,20));

	AddPointToPoly(P,ax-W+1,ay+H-1,az-D-8);
	AddPointToPoly(P,ax-W+1,ay-H+1,az-D-8);
	AddPointToPoly(P,ax+W-1,ay-H+1,az-D-8);
	AddPointToPoly(P,ax-W+6,ay-H+6,az-D-8);

	CollectPolygon(P);
}

function CanvasColorTint(SrcColor,Light) {
if(SrcColor=='' || SrcColor==null || SrcColor==false) return false;
	SrcColor=CanvasColor2Split(SrcColor);
	return IntColor2Canvas(ColorTint(SrcColor[0],Light),SrcColor[1]);
}


///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         BASIC 3D POLYGONS
///
//
//


function moveTo3D(Obj,x,y,z) {
	return Obj.moveTo(OriginX+C3D2X(x,y,z),OriginY+C3D2Y(x,y,z));
}

function lineTo3D(Obj,x,y,z) {
	return Obj.lineTo(OriginX+C3D2X(x,y,z),OriginY+C3D2Y(x,y,z));
}


///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         BASIC 3D POLYGONS
///
//
//


function CreatePoly(Stroke,Fill) {
	var P=[];
	P.stroke=Stroke;
	P.fill=Fill;
	P.points=[];
	return P;
}
function AddPointToPoly(P,x,y,z) {
	if(!P.points) P.points=[];
	P.points.push([x,y,z]);
	return P;
}

function renderPoly(Obj,P) {
	var Stroke=P.stroke;
	var Fill=P.fill;
	var Pts=P.points;
	
	if(!Pts || Pts.length==0 || (!Fill && !Stroke)) return;
	
	Obj.beginPath();

	if(Stroke) Obj.strokeStyle = Stroke; 
	if(Fill) Obj.fillStyle = Fill; 
	
	Obj.moveTo(OriginX+C3D2X(Pts[0][0],Pts[0][1],Pts[0][2]),OriginY+C3D2Y(Pts[0][0],Pts[0][1],Pts[0][2]));
	for(var i=1;i<Pts.length;i++) {
		Obj.lineTo(OriginX+C3D2X(Pts[i][0],Pts[i][1],Pts[i][2]),OriginY+C3D2Y(Pts[i][0],Pts[i][1],Pts[i][2]));
	}
	Obj.lineTo(OriginX+C3D2X(Pts[0][0],Pts[0][1],Pts[0][2]),OriginY+C3D2Y(Pts[0][0],Pts[0][1],Pts[0][2]));
	
	if(Fill) Obj.fill();
	if(Stroke) Obj.stroke();
	
	Obj.closePath();
}



///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         BASIC 3D POLYGONS LIST
///
//
//


var FramePolys=[];
function ClearPolygonsList() {
	FramePolys=[];
}

function CollectPolygon(Poly) {
	FramePolys.push(Poly);
}

function ZOrder(Poly) {
	if(!Poly.zavg) Poly.zavg=ZAveragerPoints(Poly.points);
	return Poly.zavg;
}

function ZAveragerPoints(Pts) {
	var ZSum=0;
	var P;
	for(var i=0;i<Pts.length;i++) {
		P=rotateToCamera(Pts[i]);
		ZSum+=Math.sqrt(P[0]*P[0]+P[1]*P[1]+(P[2])*(P[2]));
	}
	return ZSum/i;
}

function ZSortPolys() {
	var FrameSortedPolys=[];
	var Grab;
	var Swap;
	for(var i=0;i<FramePolys.length;i++) {
		Grab=FramePolys[i];
		for(var j=0;j<FrameSortedPolys.length;j++) {
			if(ZOrder(FrameSortedPolys[j])<ZOrder(FramePolys[i])) {
				Swap=Grab;
				Grab=FrameSortedPolys[j];
				FrameSortedPolys[j]=Swap;
			}
		}
		FrameSortedPolys[j]=Grab;
	}
	FramePolys=FrameSortedPolys;
}


///////////////////////////////////////////////////////////
//////////////////////////////
/////////////
///////         BASIC 3D FRAME RENDERING
///
//
//


function new3DFrame() {
	ClearPolygonsList();
}

function render3DFrame(Obj) {
	ZSortPolys();
	for(var i=0;i<FramePolys.length;i++) {
		renderPoly(Obj,FramePolys[i]);
	}
	new3DFrame();
}
