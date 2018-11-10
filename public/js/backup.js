var c_x_1;
var c_y_1;
var c_x_2;
var c_y_2;
var l;
var b;
var new_turn_1 = true;
var new_turn_2 = true;
var c_turn = 1;
// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//  	var game_row = 25;
// 	var game_col = 20;
// 	createBoard();
// }else{
// 	var game_row = 35;
// 	var game_col = 50;
// 	createBoard();
// }
var game_row = 35;
	var game_col = 50;
	createBoard();

function initGameVariables(){
	l = 4;
	b = 10;
	c_x_1 = 0;
	c_y_1 = 0;
	c_x_2 = game_col-b;
	c_y_2 = game_row-l;
	// c_x=40;c_y=31;l=4;b=10;
}
function createBoard(){
	initGameVariables();
	var space = 1;
	for (var r=0; r<game_row; r++) {
	  var col = "";
	  for (var c=0; c<game_col; c++) { 
	    col += "<td data-pos='"+space+"' class='allSidesSoft'></td>"; space++; 
	  }
	  $("#game-board").append("<tr>"+col+"</tr>");
	}	
}

function createEmpire(x,y,l,b,key_state,plr){
	color = (plr==1) ? 'red' : 'blue';
	if(key_state==0){ //up
		if(!(y>=0)){
			if(plr==1){
				c_y_1 = y+l;
			}else{
				c_y_2 = y+l;
			}
			c_turn = plr;
			alert('Not possible');
			return;
		}
	}else if(key_state==1){ //down
		if((game_row-y)<l){
			if(plr==1){
				c_y_1 = y - l;
			}else{
				c_y_2 = y - l;
			}
			c_turn = plr;
			alert('Not possible');
			return;
		}
	}else if(key_state==2){ //left
		if(!(x>=0)){
			if(plr==1){
				c_x_1 = x+b;
			}else{
				c_x_2 = x+b;
			}
			c_turn = plr;
			alert('Not possible');
			return;
		}
	}else if(key_state==3){
		if(!((game_col-x)>0)){ //right
			if(plr==1){
				c_x_1 = x-b;
			}else{
				c_x_2 = x-b;
			}
			c_turn = plr;
			alert('Not possible');
			return;
		}
	}
	for(var i=x+1 ; i <= x+l ; i++){
		for(var k=x+1 ; k <= x+b ; k++){
			var inc = game_col*y+k;
			element = $('td[data-pos="'+inc+'"]');
			element.css('background',color);
		}
		y = y+1;
	}
}

/* Dice Outputs
* Gentarted randomly
*/
function dice_val_one(dice){
	var dice_type = (dice==1) ? 'first-dice' : 'second-dice';
	var code = '<div class="dice-dots '+dice_type+'">';
	code += '<span class="dot dot-center"></span>';
	code += '</div>';
	return code;
}

function dice_val_two(dice){
	var dice_type = (dice==1) ? 'first-dice' : 'second-dice';
	var code = '<div class="dice-dots '+dice_type+'">';
	code += '<span class="dot dot-center-left"></span>';
	code += '<span class="dot dot-center-right"></span>';
	code += '</div>';
	return code;
}

function dice_val_three(dice){
	var dice_type = (dice==1) ? 'first-dice' : 'second-dice';
	var code = '<div class="dice-dots '+dice_type+'">';
	code += '<span class="dot dot-center-left"></span>';
	code += '<span class="dot dot-center"></span>';
	code += '<span class="dot dot-center-right"></span>';
	code += '</div>';
	return code;
}

function dice_val_four(dice){
	var dice_type = (dice==1) ? 'first-dice' : 'second-dice';
	var code = '<div class="dice-dots '+dice_type+'">';
	code += '<span class="dot dot-top-left"></span>';
	code += '<span class="dot dot-top-right"></span>';
	code += '<span class="dot dot-bottom-left"></span>';
	code += '<span class="dot dot-bottom-right"></span>';
	code += '</div>';
	return code;
}

function dice_val_five(dice){
	var dice_type = (dice==1) ? 'first-dice' : 'second-dice';
	var code = '<div class="dice-dots '+dice_type+'">';
	code += '<span class="dot dot-top-left"></span>';
	code += '<span class="dot dot-top-right"></span>';
	code += '<span class="dot dot-center"></span>';
	code += '<span class="dot dot-bottom-left"></span>';
	code += '<span class="dot dot-bottom-right"></span>';
	code += '</div>';
	return code;
}

function dice_val_six(dice){
	var dice_type = (dice==1) ? 'first-dice' : 'second-dice';
	var code = '<div class="dice-dots '+dice_type+'">';
	code += '<span class="dot dot-top-left"></span>';
	code += '<span class="dot dot-top-right"></span>';
	code += '<span class="dot dot-center-left"></span>';
	code += '<span class="dot dot-center-right"></span>';
	code += '<span class="dot dot-bottom-left"></span>';
	code += '<span class="dot dot-bottom-right"></span>';
	code += '</div>';
	return code;
}

function getDiceDots(dice_num,custom_num){
	dice_val = (!custom_num) ? (Math.floor(Math.random() * 6) + 1) : custom_num;
	switch (dice_val) {
	    case 1:
	        dot_code = dice_val_one(dice_num);
	        break;
	    case 2:
	        dot_code = dice_val_two(dice_num);
	        break;
	    case 3:
	        dot_code = dice_val_three(dice_num);
	        break;
	    case 4:
	        dot_code = dice_val_four(dice_num);
	        break;
	    case 5:
	        dot_code = dice_val_five(dice_num);
	        break;
	    case 6:
	        dot_code = dice_val_six(dice_num);
	        break;
	}
	return {code:dot_code,value:dice_val};
}
var rolling;
function appendInsideDiceDiv(dice,code){
	if(dice==1){
		$('.first-dice-main').append(code);
	}else{
		$('.second-dice-main').append(code);
	}
}
function roll_dise(){
	$('.dice-main-body').append(dice_val_one());
	clearInterval(rolling);
	rolling = setInterval(function(){
		diceVal1 = getDiceDots(1,null);
		diceVal2 = getDiceDots(2,null);
		$('.dice-dots').remove();
		appendInsideDiceDiv(1,diceVal1.code);
		appendInsideDiceDiv(2,diceVal2.code);
	}, 300);
}
/*--------------------------------------------------------------------------*/
function showValues(ln,bn){
	$('.dice-main-body').css('display','none');
	$('.dice-dots').remove();
	c_x_2 = game_col-bn;
	c_y_2 = game_row-ln;
	$.alert({
		backgroundDismiss: 'buttonName',
	    title: 'Value of ractangle',
	    content: 'length is :'+ln+'&nbsp;&nbsp;breadth is :'+bn,
	});
}
document.onkeydown = checkKey;
function checkKey(e) {
	var t_x;
	var t_y;
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
        key_state = 0;
        if(c_turn == 1){
        	if(!new_turn_1){
	        	t_x = c_x_1 = c_x_1;
	        	t_y = c_y_1 = c_y_1-l;
	        }else{
	        	t_x = c_x_1;
	        	t_y = c_y_1;
	        	new_turn_1 = false;
	        }
        }else{
        	if(!new_turn_2){
	        	t_x = c_x_2 = c_x_2;
	        	t_y = c_y_2 = c_y_2-l;
	        }else{
	        	t_x = c_x_2;
	        	t_y = c_y_2;
	        	new_turn_2 = false;
	        }
        }
        t_p = c_turn;
        createEmpire(t_x,t_y,l,b,key_state,t_p)
    }
    else if (e.keyCode == '40') {
        // down arrow
        key_state = 1;
	    if(c_turn == 1){
	    	if(!new_turn_1){
	        	t_x = c_x_1 = c_x_1;
	        	t_y = c_y_1 = c_y_1+l;
	        }else{
	        	t_x = c_x_1;
	        	t_y = c_y_1;
	        	new_turn_1 = false;
	        }
	    }else{
	    	if(!new_turn_2){
	        	t_x = c_x_2 = c_x_2;
	        	t_y = c_y_2 = c_y_2+l;
	        }else{
	        	t_x = c_x_2;
	        	t_y = c_y_2;
	        	new_turn_2 = false;
	        }
	    }
        t_p = c_turn;
        createEmpire(t_x,t_y,l,b,key_state,t_p)
    }
    else if (e.keyCode == '37') {
       	// left arrow
       	key_state = 2;
       	if(c_turn == 1){
	    	if(!new_turn_1){
	        	t_x = c_x_1 = c_x_1-b;
	        	t_y = c_y_1;
	        }else{
	        	t_x = c_x_1;
	        	t_y = c_y_1;
	        	new_turn_1 = false;
	        }
	    }else{
	    	if(!new_turn_2){
	        	t_x = c_x_2 = c_x_2-b;
	        	t_y = c_y_2;
	        }else{
	        	t_x = c_x_2;
	        	t_y = c_y_2;
	        	new_turn_2 = false;
	        }
	    }
        t_p = c_turn;
        createEmpire(t_x,t_y,l,b,key_state,t_p)
    }
    else if (e.keyCode == '39') {
       // right arrow
       	key_state = 3;
       	if(c_turn == 1){
	    	if(!new_turn_1){
	        	t_x = c_x_1 = c_x_1+b;
	        	t_y = c_y_1 = c_y_1;
	        }else{
	        	t_x = c_x_1;
	        	t_y = c_y_1;
	        	new_turn_1 = false;
	        }
	    }else{
	    	if(!new_turn_2){
	        	t_x = c_x_2 = c_x_2+b;
	        	t_y = c_y_2 = c_y_2;
	        }else{
	        	t_x = c_x_2;
	        	t_y = c_y_2;
	        	new_turn_2 = false;
	        }
	    }
       	t_p = c_turn;
        createEmpire(t_x,t_y,l,b,key_state,t_p)
    }
    else if (e.keyCode==82) {
    	$('.dice-main-body').css('display','block');
    	roll_dise();
    	t1 = l = (Math.floor(Math.random() * 6) + 1);
		t2 = b = (Math.floor(Math.random() * 6) + 1);
		timer_dice = setTimeout(function(){
			clearInterval(rolling);
			d1 = getDiceDots(1,t1);
			d2 = getDiceDots(2,t2);
			$('.dice-dots').remove();
			appendInsideDiceDiv(1,d1.code);
			appendInsideDiceDiv(2,d2.code);
			showValues(t1,t2);
		},2000);	
    }else if(e.keyCode==13){
    	c_turn = (c_turn==1) ? 2 : 1;
    }
}