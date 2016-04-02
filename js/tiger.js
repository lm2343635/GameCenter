var MARQUEE_LENGTH=5;
var BLOCKS=["bigOrange1","bigAlarm1","smallBar","bigBar","bigApple2","smallApple","bigCoconut2",
            "twoWatermelon","smallWatermelon","cha2","bigApple4","smallOrange",
            "bigOrange2","bigAlarm2","samll7","big77","bigApple3","smallCoconut","bigCoconut1",
            "bigStar","smallStar","cha1","bigApple1","smallAlarm"];
var BLOCKS_PROBABILITY=[2,2,1,1,3,5,3,3,5,22,3,4,2,2,4,2,3,5,3,2,4,22,3,4];//������ֵΪ100
var BLOCK_MONEY=[30,40,50,100,20,4,15,15,5,0,20,10,40,30,10,40,20,4,15,40,10,0,20,5];
var BLOCK_COUNT=BLOCKS.length;
var STACKS_ITEM=["s_bar","s_77","s_star","s_apple","s_alarm","s_coconut","s_orange","s_watermelon"];
var STACKS=["n_bar","n_77","n_star","n_apple","n_alarm","n_coconut","n_orange","n_watermelon"];
var STACKS_RESULT=[6,4,0,0,3,3,5,7,7,8,3,6,6,4,1,1,3,5,5,2,2,8,3,4];

var stack=[0,0,0,0,0,0,0,0]; 
var allMoney=100;
var thisMoney=0;
var systemTime=0;
var marqueeInterval;

$(document).ready(function(){
	loadStacks();
	loadMoney();
	setMainCenter();
	marqueeInterval=setInterval(marquee, 200);
});

$("#s_bar").bind("click",function(event){
	stack[0]++;
	allMoney--;
	loadStacks();
	loadMoney();
});

$("#s_77").bind("click",function(event){
	stack[1]++;
	allMoney--;
	loadStacks();
	loadMoney();
});

$("#s_star").bind("click",function(event){
	stack[2]++;
	allMoney--;
	loadStacks();
	loadMoney();
});

$("#s_apple").bind("click",function(event){
	stack[3]++;
	allMoney--;
	loadStacks();
	loadMoney();
});

$("#s_alarm").bind("click",function(event){
	stack[4]++;
	allMoney--;
	loadStacks();
	loadMoney();
});

$("#s_coconut").bind("click",function(event){
	stack[5]++;
	allMoney--;
	loadStacks();
	loadMoney();
});

$("#s_orange").bind("click",function(event){
	stack[6]++;
	allMoney--;
	loadStacks();
	loadMoney();
});

$("#s_watermelon").bind("click",function(event){
	stack[7]++;
	allMoney--;
	loadStacks();
	loadMoney();
});

$("#reset").bind("click",function(event){
	var count=0;
	for(var i=0;i<stack.length;i++)
		count+=stack[i];
	allMoney+=count;
	stack=[0,0,0,0,0,0,0,0];
	loadStacks();
	loadMoney();
});

$("#start").bind("click",start);

function getResult()
{
	var random=parseInt(100*Math.random());		
	var num=0;
	var i=0;
	while(num<=random)
	{
		num+=BLOCKS_PROBABILITY[i];
		i++;
	}
	return i;
}

function start(event)
{
	loadMoney();
	if(isStacksEmpty())
		alert("Select fruit as first!!");
	else
	{
		var speedUp=setInterval(marquee, 50);
		setTimeout(function()
		{
			clearInterval(speedUp);
			clearInterval(marqueeInterval);
			var result=parseInt((BLOCK_COUNT-1)*Math.random());			
			var stopPoint=systemTime%BLOCK_COUNT;
			var step=BLOCK_COUNT-(stopPoint-result)-2;
			if(result>stopPoint)
				step=result-stopPoint-2;//���ٵ�ֹͣ�Ĳ���
			var speedDown=setInterval(marquee, 200);
			setTimeout(function()
			{
				clearInterval(speedDown);
				//����ֹͣblock
				clearAllBlockBgcolor();			
				blockFlash(result);//����block��˸
				if(STACKS_RESULT[result]!=8)
				{
					if(stack[STACKS_RESULT[result]]!=0)
					{
						thisMoney=stack[STACKS_RESULT[result]]*BLOCK_MONEY[result];
						allMoney+=thisMoney;
						loadMoney();
						thisMoney=0;
					}		
				}
				else
					cha();	
				stack=[0,0,0,0,0,0,0,0];
				loadStacks();
				setTimeout(function(){
					systemTime+=2;
					marqueeInterval=setInterval(marquee, 200);//��������Ƽ�����					
				}, 4000);
			}, 200*step);	
		}, 2000);	
	}
}

function blockFlash(result)
{
	var i=0;
	var flash=setInterval(function(){
		if(i%2==0)
			$("#"+BLOCKS[result]).css("background-color","orange");	
		else
			$("#"+BLOCKS[result]).css("background-color","yellow");	
		i++;
	}, 500);
	setTimeout(function(){
		clearInterval(flash);
	}, 3000);
}

function setMainCenter()
{
	var main=document.getElementById("main");
	main.style.left=(window.screen.availWidth-700)/2+"px";
}

function loadStacks()
{
	$("#n_bar").html(stack[0]);
	$("#n_77").html(stack[1]);
	$("#n_star").html(stack[2]);
	$("#n_apple").html(stack[3]);
	$("#n_alarm").html(stack[4]);
	$("#n_coconut").html(stack[5]);
	$("#n_orange").html(stack[6]);
	$("#n_watermelon").html(stack[7]);
}

function loadMoney()
{
	$("#thisMoney .content").html(thisMoney);
	$("#allMoney .content").html(allMoney);
}

function isStacksEmpty()
{
	for(var i=0;i<STACKS.length;i++)
		if(parseInt($("#"+STACKS[i]).html())!=0)
			return false;
	return true;
}

function clearAllBlockBgcolor()
{
	for(var i=0;i<BLOCKS.length;i++)
		$("#"+BLOCKS[i]).css("background-color","#cecece");
}

function cha()
{
	var cha=setInterval(start, 1000);
	setTimeout(function(){
		clearInterval(cha);
	}, 4000);
}

function marquee()
{
	var start=systemTime%BLOCK_COUNT;
	for(var i=start;i<start+MARQUEE_LENGTH;i++)
		$("#"+BLOCKS[i%BLOCK_COUNT]).css("background-color","yellow");
	if(start>0)
		$("#"+BLOCKS[start-1]).css("background-color","#cecece");
	else
		$("#"+BLOCKS[BLOCK_COUNT-1]).css("background-color","#cecece");
	systemTime++;
}