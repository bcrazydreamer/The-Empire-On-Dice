var c_x_1;
var c_y_1;
var c_x_2;
var c_y_2;
var l;
var b;
var plr2_first_init_move = true; //to init the position of plr2
var new_turn_1 = true;
var new_turn_2 = true;
var valid_x = 0;
var valid_y = 0;
var c_turn = 1;
var GameStarted = false;
var introSoundEvent;
var block_moving = false;
var dice_rolled = false;
var filledBlocks = [];
var allBlocks = [];
var move_possible = true;
var plr1_area = [];
var plr2_area = [];
var plr1_border = [];
var plr2_border = [];
var introSoundPlaying = getGameAudioVarables(1);
var fx_On = getGameAudioVarables(2);

function showWinner(plr){
	if(plr==3){
		msg = 'Its draw';
	}else{
		msg = 'Player '+plr+' win';
	}
	$.alert({
		backgroundDismiss: 'buttonName',
	    title: '',
	    content: '<center>\
	    		  <img src="img/game_img/winner.gif" alt="Values" class="img-in-roll-pop1" />\
	    		  <img src="img/game_img/castel.svg" alt="Values" class="img-in-roll-pop" />\
	    		  </center>\
	    		  <div style="text-align:center">\
	    		  <p class="show-value-pop-txt">'+msg+'</p>\
	    		  </div>',
	});
}
function initGame(){
	initLocalVariables();
	$('.plr1-counter').addClass('active-score');
	$('.p1-castel-img').addClass('castel-moon-light');
	$.confirm({
    title: '"The Empire On Dice"',
    content: '',
    theme: 'supervan',
    buttons: {
       'Start Game': {
           btnClass: 'btn-success',
           action: function(){
           		GameStarted = true;
           		$('#drop-block-btn').attr('disabled','true');
              	introSoundEvent = setInterval(function(){
              		$('.castel-img').css('display','inline');
              		if(introSoundPlaying==true){
              			$("#introSound")[0].play()	
              		}
				}, 10);
            }
          }
     }
  });
}
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 	var game_row = 25;
	var game_col = 25;
	createBoard();
}else{
	var game_row = 35;
	var game_col = 50;
	createBoard();
}
function initGameVariables(){
	l = 4;
	b = 4;
	c_x_1 = 0;
	c_y_1 = 0;
	c_x_2 = game_col;
	c_y_2 = game_row;
}
function createBoard(){
	initGameVariables();
	var space = 1;
	for (var r=0; r<game_row; r++) {
	  var col = "";
	  for (var c=0; c<game_col; c++) {
	  	allBlocks.push(space); 
	    col += "<td data-pos='"+space+"' class='allSidesSoft'></td>"; space++; 
	  }
	  $("#game-board").append("<tr>"+col+"</tr>");
	}	
}

function isTouchedWithHome(block,plr){
	var arr = (plr==1) ? plr1_area : plr2_area;
	flag = false;
	for(var i = 0 ; i < arr.length ; i++){
		var dif = Math.abs(block-arr[i]);
		if( dif == game_col){
			flag = true;
			break;
		}else if(dif == 1){
			if((arr[i] % game_col) == 0){
				if((arr[i] - block) < 0 ){
					flag = false;
					break;
				}else{
					flag = true;
				}
			}else if((block % game_col) == 0){
				if((arr[i] - block) > 0 ){
					flag = false;
					break;
				}else{
					flag = true;
				}
			}else{
				flag = true;
				break;
			}
		}
	}
	return flag;
}

function isBorderBlock(block,plr){ //border ko check karega
	if(block % game_col != 0){
		if(allBlocks.indexOf(block+1)>=0){
			return true;
		}else if((allBlocks.indexOf(block-1)>=0) && ((block-1) % game_col != 0)){
			return true;
		}
	}else{
		if(allBlocks.indexOf(block-1)>=0){
			return true;
		}
	}
	dif = Math.abs(block-game_col);
	if(block>25){
		if(allBlocks.indexOf(dif)>=0){
			return true;
		}
	}
	sum = block+game_col;
	if(allBlocks.indexOf(sum)>=0){
		return true;
	}
	return false;
}

function isWinner(plr){
	var flag = true;
	if(allBlocks.length==0){
		if(plr1_area.length > plr2_area.length){
			showWinner(1);
		}else if(plr1_area.length < plr2_area.length){
			showWinner(1);
		}else{
			showWinner(3);
		}
	}else{
		var arr = (plr==1) ? plr2_border : plr1_border;
		for(var i=0 ; i<arr.length ; i++){
			if(isBorderBlock(arr[i])){
				flag = false;
				break;
			}
		}if(arr.length==0){
			flag=false;
		}
	}
	if(flag){
		showWinner(plr);
	}else{
		return flag;
	}
}


/*---Pending------*/
function checkBlocksPossible(block,ll,bb){
	for(var i = 0 ; i < bb ; i++){

	}
}
function movePossible(plr,ll,bb){
	var arr = (plr==1) ? plr1_border : plr2_border;
	var flag = false;
	for(var i = 0 ; i < arr.length ; i++){
		if(checkBlocksPossible(arr[i],ll,bb)){
			flag = true;
			break;
		}
	}
	return flag
}
/*-----------------*/

function createEmpire(x,y,l,b,plr){
	$('.placed-block').css('opacity','1');
	color = (plr==1) ? 'red' : 'blue';
	block_owner = (plr==1) ? 'p1_ownr' : 'p2_ownr';
	for(var i=x+1 ; i <= x+l ; i++){
		for(var k=x+1 ; k <= x+b ; k++){
			var inc = game_col*y+k;
			filledBlocks.push(inc);
			if(plr==1){
				plr1_area.push(inc);
			}else{
				plr2_area.push(inc);
			}
    		allBlocks.splice(allBlocks.indexOf(inc), 1);
			element = $('td[data-pos="'+inc+'"]');
			element.addClass('placed-block');
			element.addClass(block_owner);
			element.css('background',color);
		}
		y = y+1;
	}
	arr = (plr==1) ? plr1_area : plr2_area;
	var temp = [];
	for(var i = 0 ; i < arr.length ; i++ ){
		if(isBorderBlock(arr[i],plr)){
			temp.push(arr[i]);
		}
	}
	if(plr==1){
		plr1_border = temp;
	}else if(plr==2){
		plr2_border = temp;
	}
	if(!isWinner(plr)){
		block_moving = false;
		dice_rolled = false;
		if(plr==1){
			$('.plr1-counter').text(plr1_area.length);
			$('.plr1-counter').removeClass('active-score');
			$('.p1-castel-img').removeClass('castel-moon-light');
			$('.p2-castel-img').addClass('castel-moon-light');
			$('.plr2-counter').addClass('active-score');
		}else if(plr==2){
			$('.plr2-counter').text(plr2_area.length);
			$('.plr2-counter').removeClass('active-score')
			$('.p2-castel-img').removeClass('castel-moon-light');
			$('.p1-castel-img').addClass('castel-moon-light');;
			$('.plr1-counter').addClass('active-score');
		}
		$('#roll-block-btn').removeAttr("disabled");
		$('#drop-block-btn').attr('disabled','true');
		(plr==1) ? $('.p2_ownr').addClass('active-blocks') : $('.p1_ownr').addClass('active-blocks');
		(plr==1) ? $('.p1_ownr').removeClass('active-blocks') : $('.p2_ownr').removeClass('active-blocks');
	}
}


function CheckEmpire(x,y,l,b,key_state,plr){
	if(fx_On){
    	$("#MoveBlockSound")[0].play();
    }
	color = (plr==1) ? 'red' : 'blue';
	if(key_state==0){ //up
		if(!(y>=0)){
			if(plr==1){
				c_y_1 = y+1;
			}else{
				c_y_2 = y+1;
			}
			c_turn = plr;
			notie.alert({ type: plr+2, text: 'Its not a possible move', time: 2 });
			return;
		}
	}else if(key_state==1){ //down
		if((game_row-y)<l){
			if(plr==1){
				c_y_1 = y - 1;
			}else{
				c_y_2 = y - 1;
			}
			c_turn = plr;
			notie.alert({ type: plr+2, text: 'Its not a possible move', time: 2 });
			return;
		}
	}else if(key_state==2){ //left
		if(!(x>=0)){
			if(plr==1){
				c_x_1 = x+1;
			}else{
				c_x_2 = x+1;
			}
			c_turn = plr;
			notie.alert({ type: plr+2, text: 'Its not a possible move', time: 2 });
			return;
		}
	}else if(key_state==3){
		if(!((game_col-x)>=b)){ //right
			if(plr==1){
				c_x_1 = x-1;
			}else{
				c_x_2 = x-1;
			}
			c_turn = plr;
			notie.alert({ type: plr+2, text: 'Its not a possible move', time: 2 });
			return;
		}
	}

	$('td').removeClass('active-blocks');
	$('.placed-block').css('opacity','0.5');

	$('#drop-block-btn').removeAttr("disabled");
	block_moving = true;
	$('td').removeClass('check-location-1');
	$('td').removeClass('check-location-2');
	move_possible = true;
	home_touch = false;
	for(var i=x+1 ; i <= x+l ; i++){
		for(var k=x+1 ; k <= x+b ; k++){
			var inc = game_col*y+k;
			if(filledBlocks.indexOf(inc)>=0){
				$('#drop-block-btn').attr('disabled','true');
				move_possible = false;
			}
			if(!home_touch){
				home_touch = isTouchedWithHome(inc,plr);
			}
			element = $('td[data-pos="'+inc+'"]');
			element.css('opacity','1');
			element.addClass('check-location-'+plr);
		}
		y = y+1;
	}
	if(!home_touch){
		$('#drop-block-btn').attr('disabled','true');
	}
	if(move_possible && home_touch){
		move_possible = true;
	}else{
		move_possible = false;
	}
	valid_x = x;
	valid_y = y-l;
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
	if(fx_On){
		$("#diceRollSound")[0].play();
	}
	rolling = setInterval(function(){
		diceVal1 = getDiceDots(1,null);
		diceVal2 = getDiceDots(2,null);
		$('.dice-dots').remove();
		appendInsideDiceDiv(1,diceVal1.code);
		appendInsideDiceDiv(2,diceVal2.code);
	}, 300);
}
/*--------------------------------------------------------------------------*/
function showValues(ln,bn,plr){
	$('.dice-main-body').css('display','none');
	$('.dice-dots').remove();
	if(plr2_first_init_move && (plr==2)){
		c_x_2 = game_col-bn;
		c_y_2 = game_row-ln;
	}
	$.alert({
		backgroundDismiss: 'buttonName',
	    title: '',
	    content: '<center>\
	    		  <p class="show-value-pop-head">Ractangle</p>\
	    		  <img src="img/game_img/icon.png" alt="Values" onerror="imageNotFound(this,3)" class="img-in-roll-pop" />\
	    		  </center>\
	    		  <div style="text-align:center">\
	    		  <p class="show-value-pop-txt">length is :'+ln+'<br/>breadth is :'+bn+'</p>\
	    		  </div>',
	});
}


function actionOnEvents(key){
	var dice_rolling_on = document.getElementById('dice-div-second').style.display!='block';
	var pop_closed = ($('.jconfirm-light').length==1) ? false : true;

	if( key  == '38' && GameStarted && dice_rolled && pop_closed && dice_rolling_on){
		 // up arrow
        key_state = 0;
        if(c_turn == 1){
        	if(!new_turn_1){
	        	t_x = c_x_1 = c_x_1;
	        	t_y = c_y_1 = c_y_1-1;
	        	t_p = c_turn;
       			CheckEmpire(t_x,t_y,l,b,key_state,t_p);
	        }else{
	        	t_x = c_x_1;
	        	t_y = c_y_1;
	        	t_p = c_turn;
    			c_turn = (c_turn==1) ? 2 : 1;
	        	createEmpire(t_x,t_y,l,b,t_p);
	        	new_turn_1 = false;
	        }
        }else{
        	if(!new_turn_2){
	        	t_x = c_x_2 = c_x_2;
	        	t_y = c_y_2 = c_y_2-1;
	        	t_p = c_turn;
       			CheckEmpire(t_x,t_y,l,b,key_state,t_p);
	        }else{
	        	t_x = c_x_2;
	        	t_y = c_y_2;
	        	t_p = c_turn;
    			c_turn = (c_turn==1) ? 2 : 1;
	        	createEmpire(t_x,t_y,l,b,t_p);
	        	new_turn_2 = false;
	        }
        }
	}else if( key == '40' && GameStarted && dice_rolled && pop_closed && dice_rolling_on ){
		// down arrow
        key_state = 1;
	    if(c_turn == 1){
	    	if(!new_turn_1){
	        	t_x = c_x_1 = c_x_1;
	        	t_y = c_y_1 = c_y_1+1;
	        	t_p = c_turn;
       			CheckEmpire(t_x,t_y,l,b,key_state,t_p);
	        }else{
	        	t_x = c_x_1;
	        	t_y = c_y_1;
	        	t_p = c_turn;
    			c_turn = (c_turn==1) ? 2 : 1;
	        	createEmpire(t_x,t_y,l,b,t_p);
	        	new_turn_1 = false;
	        }
	    }else{
	    	if(!new_turn_2){
	        	t_x = c_x_2 = c_x_2;
	        	t_y = c_y_2 = c_y_2+1;
	        	t_p = c_turn;
       			CheckEmpire(t_x,t_y,l,b,key_state,t_p);
	        }else{
	        	t_x = c_x_2;
	        	t_y = c_y_2;
	        	t_p = c_turn;
    			c_turn = (c_turn==1) ? 2 : 1;
	        	createEmpire(t_x,t_y,l,b,t_p);
	        	new_turn_2 = false;
	        }
	    }
	}else if( key == '37' && GameStarted && dice_rolled && pop_closed ){
		// left arrow
       	key_state = 2;
       	if(c_turn == 1){
	    	if(!new_turn_1){
	        	t_x = c_x_1 = c_x_1-1;
	        	t_y = c_y_1;
	        	t_p = c_turn;
       			CheckEmpire(t_x,t_y,l,b,key_state,t_p);
	        }else{
	        	t_x = c_x_1;
	        	t_y = c_y_1;
	        	t_p = c_turn;
    			c_turn = (c_turn==1) ? 2 : 1;
	        	createEmpire(t_x,t_y,l,b,t_p);
	        	new_turn_1 = false;
	        }
	    }else{
	    	if(!new_turn_2){
	        	t_x = c_x_2 = c_x_2-1;
	        	t_y = c_y_2;
	        	t_p = c_turn;
       			CheckEmpire(t_x,t_y,l,b,key_state,t_p);
	        }else{
	        	t_x = c_x_2;
	        	t_y = c_y_2;
	        	t_p = c_turn;
    			c_turn = (c_turn==1) ? 2 : 1;
	        	createEmpire(t_x,t_y,l,b,t_p);
	        	new_turn_2 = false;
	        }
	    }
	}else if( key == '39' && GameStarted && dice_rolled && pop_closed && dice_rolling_on ){
		// right arrow
       	key_state = 3;
       	if(c_turn == 1){
	    	if(!new_turn_1){
	        	t_x = c_x_1 = c_x_1+1;
	        	t_y = c_y_1 = c_y_1;
	        	t_p = c_turn;
       			CheckEmpire(t_x,t_y,l,b,key_state,t_p);
	        }else{
	        	t_x = c_x_1;
	        	t_y = c_y_1;
	        	t_p = c_turn;
    			c_turn = (c_turn==1) ? 2 : 1;
	        	createEmpire(t_x,t_y,l,b,t_p);
	        	new_turn_1 = false;
	        }
	    }else{
	    	if(!new_turn_2){
	        	t_x = c_x_2 = c_x_2+1;
	        	t_y = c_y_2 = c_y_2;
	        	t_p = c_turn;
       			CheckEmpire(t_x,t_y,l,b,key_state,t_p);	
	        }else{
	        	t_x = c_x_2;
	        	t_y = c_y_2;
	        	t_p = c_turn;
    			c_turn = (c_turn==1) ? 2 : 1;
	        	createEmpire(t_x,t_y,l,b,t_p);
	        	new_turn_2 = false;
	        }
	    }	
	}else if( key == '82' && GameStarted && (!dice_rolled) && pop_closed && dice_rolling_on){
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
			showValues(t1,t2,c_turn);
		},2000);
		dice_rolled = true;
		$('#roll-block-btn').attr('disabled','true');
	}else if( key == '13' && block_moving && GameStarted && dice_rolled && move_possible ){
		t_p = c_turn;
    	c_turn = (c_turn==1) ? 2 : 1;
    	createEmpire(valid_x,valid_y,l,b,t_p);
    	if(fx_On){
    		$("#putSound")[0].play();
    	}
	}else if( key == '80' && GameStarted ){
		if(introSoundPlaying){
			introSoundPlaying = false;
			setGameAudioVarables(1,false);
			clearInterval(introSoundEvent);
    		$("#introSound")[0].pause();
		}else{
			introSoundPlaying = true;
			setGameAudioVarables(1,true);
			introSoundEvent = setInterval(function(){
				$("#introSound")[0].play();
			}, 10);
		}
	}else if( key == '70' && GameStarted ){
		if(fx_On){
			setGameAudioVarables(2,false);
		}else{
			setGameAudioVarables(1,true);
		}
		fx_On = fx_On ? false : true;
	}
}

document.onkeydown = checkKey;
function checkKey(e) {
	var t_x;
	var t_y;
	var pop_closed = ($('.jconfirm-light').length==1) ? false : true;
    e = e || window.event;
    if ((e.keyCode == '38' || e.keyCode == '87') && GameStarted && pop_closed) {
        // up arrow
        actionOnEvents('38');
    }
    else if ((e.keyCode == '40' || e.keyCode == '83') && GameStarted && pop_closed) {
        // down arrow
        actionOnEvents('40');
    }
    else if ((e.keyCode == '37' || e.keyCode == '65')  && GameStarted && pop_closed) {
       	// left arrow
       	actionOnEvents('37');
    }
    else if ((e.keyCode == '39' || e.keyCode == '68') && GameStarted && pop_closed) {
       // right arrow
       	actionOnEvents('39');
    }
    else if (e.keyCode==82 && GameStarted && pop_closed) {
    	//roll the dice (r)
    	actionOnEvents('82');	
    }
    else if(e.keyCode==13 && GameStarted && pop_closed){
    	//enter and for drop the blocks
    	actionOnEvents('13');
    }
    else if(e.keyCode=='80' && GameStarted){
    	//key is p to play and stop intro music
    	actionOnEvents('80');
    }
    else if(e.keyCode=='70' && GameStarted){
    	//key is f to play and stop intro music
    	actionOnEvents('70');
    }
}


function swipedetect(el, callback){
    var touchsurface = el,
    swipeCode,
    startX,
    startY,
    distX,
    distY,
    threshold = 5,
    restraint = 100,
    allowedTime = 1000,
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipeCode){}
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipeCode = null
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime()
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault()
    }, false)
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX
        distY = touchobj.pageY - startY
        elapsedTime = new Date().getTime() - startTime
        if (elapsedTime <= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
                swipeCode = (distX < 0)? '37' : '39'
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ 
                swipeCode = (distY < 0)? '38' : '40'
            }
        }
        handleswipe(swipeCode)
        e.preventDefault()
    }, false)
}
  
var $zone = document.getElementById('game-board');
swipedetect($zone, function(swipeCode){
	if(swipeCode){
		actionOnEvents(swipeCode);
	}
});
$('#drop-block-btn').click(()=>{
	actionOnEvents('13');	
});
$('#roll-block-btn').click(()=>{
	actionOnEvents('82');
});
$('#change-music-setting').click(()=>{
	actionOnEvents('80');
});
$('#change-fx-setting').click(()=>{
	actionOnEvents('70');
});