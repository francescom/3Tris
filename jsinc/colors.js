
	
function ColorTint(SrcColor,Light) {
	// -100 < Light <100
	var r,g,b;
	
	if(Light>100) Light=100;
	if(Light<-100) Light=-100;
	
	
	r=(SrcColor & 0xff0000) >> 16;
	g=(SrcColor & 0x00ff00) >> 8;
	b=SrcColor & 0x0000ff;
	
	if(Light>0) {
		r=Math.round(r*(100-Light)/100+Light*255/100);
		g=Math.round(g*(100-Light)/100+Light*255/100);
		b=Math.round(b*(100-Light)/100+Light*255/100);
	} else {
		r=Math.round(r*(100+Light)/100);
		g=Math.round(g*(100+Light)/100);
		b=Math.round(b*(100+Light)/100);
	}

	var SrcColor=r<<16 | g<<8 | b;
	return SrcColor;
}


function Colors_trim(txt) {
	return txt.replace(/^\s+|\s+$/g,"");
}


function HtmlColor2Int(c) {
	c=Colors_trim(c);
	if(c.substr(0,1)=="#") {
		c=c.substr(1);
	}
	return parseInt(c,16);
}


function CanvasColor2Int(c) {
	var HasAlpha=0;
	
	//c=Colors_trim(c); // enable these to clean the string
	// c.replace(/(rgba?)\s+\(/g,"\1\(");
	
	if(c==null || c=='' || c==false) return [c,1];
	
	if(c.substr(0,5)=="rgba(") {
		c=c.substr(5);
		HasAlpha=1;
	} else if(c.substr(0,4)=="rgb(") {
		c=c.substr(4);
	} else return 0;
	if(c.substr(c.length-1,1)!=')') return 0;
	
	c=c.split(",");
	if(c.length<3+HasAlpha) return 0;
		
	return parseInt(c[0])*(65536)+parseInt(c[1])*256+parseInt(c[2]);
}

function CanvasColor2Split(c) {
	var HasAlpha=0;
	if(c==null || c=='' || c==false) return [c,1];
	if(c.substr(0,5)=="rgba(") {
		c=c.substr(5);
		HasAlpha=1;
	} else if(c.substr(0,4)=="rgb(") {
		c=c.substr(4);
	} else if(c.substr(0,1)=="#") {
		c=c.substr(1);
	} else return [c,1]
	if(c.substr(c.length-1,1)!=')') return [0,1]
	
	c=c.split(",");
	if(c.length<3+HasAlpha) return [0,1]
		
	return [parseInt(c[0])*(65536)+parseInt(c[1])*256+parseInt(c[2]),parseFloat(c[3])];
}

function CanvasColor2Alpha(c) {
	var HasAlpha=0;
	
	if(c==null || c=='' || c==false) return 1;
	if(c.substr(0,1)=="#") return 1;
	if(c.substr(0,4)=="rgb(") return 1;
	
	if(c.substr(0,5)=="rgba(") {
		c=c.substr(5);
		HasAlpha=1;
	} else return 0;
	if(c.substr(c.length-1,1)!=')') return 1;
	
	c=c.split(",");
	if(c.length<3+HasAlpha) return 1;
		
	return parseInt(c[3]);
}

function ArrayColor2Int(c) {
	return c[0]*65536+c[1]*256+c[2];
}

			
function HtmlColor2Array(c) {
	if(c.substr(0,1)=="#") {
		c=c.substr(1);
	}
	var r=parseInt(c.substr(0,2), 16);
	var g=parseInt(c.substr(2,2), 16);
	var b=parseInt(c.substr(4,2), 16);
	
	return [r,g,b];
}


function IntColor2Array(c) {
	return [(c & 0xff0000)/65536,(c & 0x00ff00)/256,c & 0x0000ff];
}

function ArrayColor2Html(c) {
	var r=c[0].toString(16);
	var g=c[1].toString(16);
	var b=c[2].toString(16);
	
	if(r.length<2) r="0"+r;
	if(g.length<2) g="0"+g;
	if(b.length<2) b="0"+b;
	
	var rgb = "#"+ r+g+b;
	return rgb;
}

function IntColor2Html(c) {
	var r=((c & 0xff0000)/65536).toString(16);
	var g=((c & 0x00ff00)/256).toString(16);
	var b=(c & 0x0000ff).toString(16);
	
	if(r.length<2) r="0"+r;
	if(g.length<2) g="0"+g;
	if(b.length<2) b="0"+b;

	var rgb = "#"+ r+g+b;
	return rgb;
}

function IntColor2Canvas(c,Alpha) {
	var r=((c & 0xff0000)/65536).toString(10);
	var g=((c & 0x00ff00)/256).toString(10);
	var b=(c & 0x0000ff).toString(10);
	
	if(Alpha!=null && Alpha!='' && Alpha<1) {
		return "rgba("+r+","+g+","+b+","+Alpha+")";
	} else return "rgb("+r+","+g+","+b+")";
}

function ArrayColor2Canvas(c,Alpha) {
	var r=c[0].toString(10);
	var g=c[1].toString(10);
	var b=c[2].toString(10);
	
	if(Alpha!=null && Alpha!='' && Alpha<1) {
		return "rgba("+r+","+g+","+b+","+Alpha+")";
	} else return "rgb("+r+","+g+","+b+")";
}

