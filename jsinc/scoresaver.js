var  SCORE_LAST_ID="score_3tris_last";
var  SCORE_MAX_ID="score_3tris_max";


var SCORE_LAST_VAL=0;
var SCORE_MAX_VAL=0;

var MyScoreSaverStartPrevOnload = window.onload;

function MyScoreSaverStart() {

	if(MyScoreSaverStartPrevOnload != undefined) MyScoreSaverStartPrevOnload();
	
	var GotScore=false;
	
	if(!GotScore) try {
		SCORE_LAST_VAL=(localStorage.getItem(SCORE_LAST_ID));
		SCORE_MAX_VAL=(localStorage.getItem(SCORE_MAX_ID));
		
		if(SCORE_LAST_VAL==null) SCORE_LAST_VAL=0;
		if(SCORE_MAX_VAL==null) SCORE_MAX_VAL=0;
		
		WriteScores(SCORE_LAST_VAL,SCORE_MAX_VAL);
		GotScore=true;
	} catch(err) { }

	// older FF vers.
	if(!GotScore) try {
		SCORE_LAST_VAL=(globalStorage[(SCORE_LAST_ID)]);
		SCORE_MAX_VAL=(globalStorage[(SCORE_MAX_ID)]);
		
		if(SCORE_LAST_VAL==null) SCORE_LAST_VAL=0;
		if(SCORE_MAX_VAL==null) SCORE_MAX_VAL=0;
		
		WriteScores(SCORE_LAST_VAL,SCORE_MAX_VAL);
		GotScore=true;
	} catch(err) { }
	
	// ie6-7 vers.
	
	if(!GotScore) try {
		SCORE_LAST_VAL=(ie7LoadInput(SCORE_LAST_ID));
		SCORE_MAX_VAL=(ie7LoadInput(SCORE_MAX_ID));
		
		if(SCORE_LAST_VAL==null) SCORE_LAST_VAL=0;
		if(SCORE_MAX_VAL==null) SCORE_MAX_VAL=0;
		
		WriteScores(SCORE_LAST_VAL,SCORE_MAX_VAL);
		GotScore=true;
	} catch(err) { }
}


function MyScoreSaverGetLastScore() { return SCORE_LAST_VAL; }

function MyScoreSaverGetMaxScore() { return SCORE_MAX_VAL; }

function MyScoreSaverSaveScore(val) {
	if(SCORE_MAX_VAL<val) SCORE_MAX_VAL=val;
	
	SCORE_LAST_VAL=val;
	
	var GotScore=false;
	if(!GotScore) try {
		localStorage.setItem(SCORE_LAST_ID,""+SCORE_LAST_VAL);
		if(SCORE_MAX_VAL!=0) localStorage.setItem(SCORE_MAX_ID,""+SCORE_MAX_VAL);
		WriteScores(SCORE_LAST_VAL,SCORE_MAX_VAL);
		GotScore=true;
	} catch(err) { }

	// older FF vers.
	
	if(!GotScore) try {
		globalStorage[SCORE_LAST_ID]=""+SCORE_LAST_VAL;
		if(SCORE_MAX_VAL!=0) globalStorage[SCORE_MAX_ID]=""+SCORE_MAX_VAL;
		WriteScores(SCORE_LAST_VAL,SCORE_MAX_VAL);
		GotScore=true;
	} catch(err) { }

	// ie6-7 vers.
	
	if(!GotScore) try {
		ie7SaveInput(SCORE_LAST_ID,""+SCORE_LAST_VAL);
		if(SCORE_MAX_VAL!=0) ie7SaveInput(SCORE_MAX_ID,""+SCORE_MAX_VAL);
		WriteScores(SCORE_LAST_VAL,SCORE_MAX_VAL);
		GotScore=true;
	} catch(err) { }
}


/* ie 7-7 vers. requires

in HTML

<sdk:cacher id="score_3tris_last"></sdk:cacher>
<sdk:cacher id="score_3tris_max"></sdk:cacher>

in CSS


<style type="text/css">
sdk\:cacher {
    behavior: url(#default#userData);
}
</style>

*/


function ie7SaveInput(tagid,val){
	var Tag = document.getElementById(tagid);
	Tag.setAttribute(tagid,val);
	Tag.save("store_"+tagid);
}
function ie7LoadInput(tagid){
	var Tag = document.getElementById(tagid);
	Tag.load("store_"+tagid);
	Tag.value=Tag.getAttribute(tagid);
	return Tag.getAttribute(tagid);
}


window.onload=MyScoreSaverStart;
