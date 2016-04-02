var Figure=["3","4","5","6","7","8","9","10","J","Q","K","A","2"];
var Pattern=["spade","hearts","club","diamond","joker","bjoker"];

$(document).ready(function(){
	setMainCenter();
	loadCards();
	setOnClick();
});

function setMainCenter()
{
	var main=document.getElementById("main");
	main.style.left=(window.screen.availWidth-900)/2+"px";
}

function loadCards()
{
	var pattern=document.createElement("div");
	var img=document.createElement("img");
	pattern.className="pattern";
	var figure=document.createElement("div");
	figure.className="figure";
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<Figure.length;j++)
			$("#"+Pattern[i]+Figure[j]).css("top",(100*i)+"px").css("left",(60*j)+"px");
		img.setAttribute("src", "images/poker/"+Pattern[i]+".png");
		pattern.appendChild(img);
		$("."+Pattern[i]).append(pattern).append(figure);		
	}		
	$("#"+Pattern[4]).css("top","0px").css("right","0px");	
	$("#"+Pattern[5]).css("top","200px").css("right","0px");	
	for(var i=0;i<4;i++)
		for(var j=0;j<Figure.length;j++)
			$("#"+Pattern[i]+Figure[j]+" .figure").html(Figure[j]);
}

function setOnClick()
{
	for(var i=0;i<4;i++)
		for(var j=0;j<Figure.length;j++)
			$("#"+Pattern[i]+Figure[j]).bind("click",{id:Pattern[i]+Figure[j]},function(event){
				var block=$("#"+event.data.id);
				if(block.hasClass("card"))
				{
					block.removeClass("card");
					block.addClass("cardClick");
				}
				else
				{
					block.removeClass("cardClick");
					block.addClass("card");				
				}
			});
	for(var i=4;i<Pattern.length;i++)
		$("#"+Pattern[i]).bind("click",{id:Pattern[i]},function(event){
			var block=$("#"+event.data.id);
			if(block.hasClass("joker"))
			{
				block.removeClass("joker");
				block.addClass("jokerClick");
			}
			else
			{
				block.removeClass("jokerClick");
				block.addClass("joker");				
			}
		});
}