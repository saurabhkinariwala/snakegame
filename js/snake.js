window.onload = function () {
    "use strict";
    var Snake = function () {
		var size, snakeArray = [], ranId, repeat, old_direction = 'right';
		this.length = 4;
		this.initScore = 0;
		this.currentDirection = null;
		this.time = 300;
// ----------------------------------------------Creating Play Area-----------------------------------------
		this.init = function (playArea) { 
			size = playArea;
	      	var e = document.getElementById('wrapper');
	      	var i = null, row, j=null;
	      	for (i = 0; i < playArea; i++) { 
	        	row = document.createElement("div"); 
	        	row.className = "row"; 
	        		for(j = 0; j < playArea; j++){ 
	            		var cell = document.createElement("div"); 
	            		cell.className = "gridsquare"; 
	            		cell.id = i+','+j;
	            		row.appendChild(cell); 
	        		} 
	        e.appendChild(row); 
	      } 
	    }
// ----------------------------------------------Creating Snake----------------------------------------
	    this.snake = function (length) {
	    	var j=null;
	    	for (j=0;j<length;j++) {
	    		snakeArray.push(0+","+j);
	    		if(document.getElementById(snakeArray[j]))
	    		document.getElementById(snakeArray[j]).style.backgroundColor="#000";
	    	}
	    }
// -------------------------------------------Moving Snake-------------------------------------------------

	    this.moveSnake = function (n) {
	    				snakeArray.push(n);
	    				var searchElement = document.getElementById;

	    				if(document.getElementById(snakeArray[snakeArray.length-1]))
             			document.getElementById(snakeArray[snakeArray.length-1]).style.backgroundColor="#000";
                		else {
                				alert("Game Over");
                				clearInterval(repeat);
                		}
                		if(document.getElementById(snakeArray[0]))
                		document.getElementById(snakeArray[0]).style.backgroundColor="grey";
                		snakeArray.shift();
        }
	    this.moveLeft = function () {
	    				var splitRow=snakeArray[snakeArray.length-1].split(",");
                		var num=parseInt(splitRow[1])-1;
                		splitRow[1]=num;
                		var str=splitRow.join(",");
                		this.moveSnake(str);
	    }
	    this.moveTop = function () {
	    			   var splitRow=snakeArray[snakeArray.length-1].split(",");
	            	   var num=parseInt(splitRow[0])-1;
	            	   splitRow[0]=num;
	            	   var str=splitRow.join(",");
	            	   this.moveSnake(str);
	    }
	    this.moveRight = function () {
	    				var splitRow=snakeArray[snakeArray.length-1].split(",");
                		var num=parseInt(splitRow[1])+1;
                		splitRow[1]=num;
                		var str=splitRow.join(",");
                		oThis.moveSnake(str);
	    }
	    this.moveBottom = function () {
	    				var splitRow=snakeArray[snakeArray.length-1].split(",");
                		var num=parseInt(splitRow[0])+1;
                		splitRow[0]=num;
                		var str=splitRow.join(",");
                		this.moveSnake(str);
	    }
	    
	    var oThis = this;
	    repeat=setInterval(function () {
	    	interval();
	    	console.log("dfgdfG");
	    },this.time)

	    var interval=function () {
	    	if(oThis.currentDirection)
	    	oThis.currentDirection();
	    	oThis.eatFood();
	    	oThis.selfEat(snakeArray,snakeArray[snakeArray.length-1]);
	    }
// ----------------------------Giving directions to the Sanke--------------------------

		 document.onkeydown = function (event) {
		 	var eventObj=event || window.event
		 	switch(eventObj.keyCode)
            {
                case 37:if(oThis.currentDirection!=oThis.moveRight)
                		oThis.currentDirection=oThis.moveLeft;
                		break;
                case 38:if(oThis.currentDirection!=oThis.moveBottom)
                		oThis.currentDirection=oThis.moveTop;
                    	break;
                case 39:if(oThis.currentDirection!=oThis.moveLeft)
                		oThis.currentDirection=oThis.moveRight;
                    	break;
                case 40:if(oThis.currentDirection!=oThis.moveTop)
                		oThis.currentDirection=oThis.moveBottom;
                   	 	break;
                default:console.log("wrong key pressed");
                   	 	break;    
            }

		}
// ----------------------------------------Food Generation--------------------------------------------
		   if(!Array.indexOf){
	    Array.prototype.indexOf = function(obj){
	        for(var i=0; i<this.length; i++){
	            if(this[i]==obj){
	                return i;
	            }
	        }
	        return -1;
	    }
	}
		this.createFood=function () {
			var food=[Math.round(Math.random()*(size-1)),Math.round(Math.random()*(size-1))]; //generates random id of the div in playing area
			ranId=food.join(",");  //converts array to string joining it by ','
			if(snakeArray.indexOf(ranId)>-1)  // returns index if ranId is in snakeArray else returns -1
				this.createFood();
			else
			document.getElementById(ranId).style.backgroundColor="#000";
		}
// ------------------------------------------Food Matching------------------------------------------
		this.eatFood=function () {
			if(snakeArray[snakeArray.length-1]==ranId)
			{
				clearInterval(repeat);

				var score=document.getElementById('score');
				this.initScore++;
				score.innerHTML=this.initScore;
				if(this.initScore%2==0 && this.time>100)  //increases the speed after every 2 scores by 50ms
					this.time=this.time-50;
				else if(this.time==100)
					this.time=100;
				snakeArray.push(ranId);
				document.getElementById(snakeArray[snakeArray.length-1]).backgroundColor="#000";
				this.createFood();
				repeat=setInterval(function () {interval() },this.time);
			}
		}
// ------------------------------If Snake Eat Itself---------------------------
		this.selfEat = function (arr,last) {
			var i;
	    	for(i=0;i<arr.length-2;i++) {
	    		if(arr[i]==last){
	    			clearInterval(repeat);
	    			alert("Game Over");
	    		}
	    	}
	    }
	};
// -------------------------------------Creating Objects-------------------------------------
   var s= new Snake();
   var userValue=prompt("Enter the size of playing area");
   s.init(userValue);
   s.snake(4);
   s.createFood();
}	