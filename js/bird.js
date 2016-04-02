var Frequency=20;
var PillarNumber=4;
var Step=Frequency/10;
var SpaceHeight=200;
var PillarPeriod=240/Step;
var g=200;
var StartFlag=false;

var t=0;
var s=0;
var v=0;

var SpaceTop=0;
var SpaceBottom=480;

var Creator;
var Gravity;

$(document).ready(function(){
	setMainCenter();
});

function showTip()
{
	$("#tip").show();
}

function hideTip()
{
	$("#tip").hide();
}

function start()
{
	if(!StartFlag)
	{
		t=0;
		s=0;
		v=0;
		createPillar();
		gravity();		
		StartFlag=true;
	}
}

function stop()
{
	clearInterval(Creator);
	clearInterval(Gravity);
}

function setMainCenter()
{
	var main=document.getElementById("main");
	main.style.left=(window.screen.availWidth-800)/2+"px";
	panel.style.left=(window.screen.availWidth-800)/2+"px";
}

function createPillar()
{
	var count=0;
	var createTime=[0,0,0,0];
	var TopBuffer=[-1,-1,-1,-1];
	Creator=setInterval(function() {
		if(count%PillarPeriod==0)
		{
			var pillarNo=(count/PillarPeriod)%PillarNumber;
			createTime[pillarNo]=count;
			$("#pillar"+pillarNo).show();
			var top=parseInt((400-SpaceHeight)*Math.random());
			TopBuffer[pillarNo]=top;
			var bottom=(400-SpaceHeight)-top;
			$("#pillar"+pillarNo+" .top").css("height",top+"px");
			$("#pillar"+pillarNo+" .bottom").css("height",bottom+"px");
			$("#pillar"+pillarNo+" .top-head").css("top",top+"px");
			$("#pillar"+pillarNo+" .bottom-head").css("bottom",bottom+"px");
		}
		for(var i=0;i<PillarNumber;i++)
		{
			var right=(count-createTime[i])*Step-80;
			if(right>800)
				$("#pillar"+i).hide();
			else
			{
				$("#pillar"+i).css("right",right+"px");
				SpaceTop=0;
				SpaceBottom=480;
				if(right>320&&right<400&&TopBuffer[i]!=-1)
				{	
					SpaceTop=TopBuffer[i]+40;
					SpaceBottom=SpaceTop+SpaceHeight;
					if(s<SpaceTop||s>SpaceBottom)
						stop();
					$("#SpaceTop").text(SpaceTop);
					$("#SpaceBottom").text(SpaceBottom);
				}
				if(s<SpaceTop||s>SpaceBottom)
					stop();
			}			
		}	
		count++;
	}, Frequency);
}

function gravity()
{
	var ds=0;
	var f=Frequency/1000;
	Gravity=setInterval(function(){
		v+=g*f;
		ds=v*f+0.5*g*f*f;
		s+=ds;
		$("#bird").css("top",s+"px");
		t+=Frequency/1000;
		$("#t").text(t);
		$("#v").text(v);
		$("#s").text(s);
		$("#ds").text(ds);
	}, Frequency);
}

function jump()
{
	if(StartFlag)
	{
		v=-0.15*v;
		if(v<30)
			v-=150;
	}
}