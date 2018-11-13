function initLocalVariables(){
	saveElementsImagesInLocal();
}
function getGameAudioVarables(item){
	if(item==1)
	{
		try{
			if((localStorage.getItem('introSoundPlaying') != null) && (localStorage.getItem('introSoundPlaying') != undefined)){
				introSoundPlaying = localStorage.getItem('introSoundPlaying');
				introSoundPlaying = (introSoundPlaying==true || introSoundPlaying=='true') ? true : false;
				if(introSoundPlaying!=true){
					$('#music-setting-img').attr('src','img/game_img/sound-off.svg');
				}
			}else{
				introSoundPlaying = true;
				localStorage.setItem('introSoundPlaying',true);
			}
		}catch(err){
			introSoundPlaying = true;
			localStorage.setItem('introSoundPlaying',true);
		}
		return introSoundPlaying;
	} else if(item==2){
		try{
			if((localStorage.getItem('fx_On') != null) && (localStorage.getItem('fx_On') != undefined)){
				fx_On = localStorage.getItem('fx_On');
				fx_On = (fx_On==true || fx_On=='true') ? true : false;
				if(fx_On!=true){
					$('#fx-setting-img').attr('src','img/game_img/sound-off.svg');
				}
			}else{
				fx_On = true;
				localStorage.setItem('fx_On',true);
			}
		}catch(err){
			fx_On = true;
			localStorage.setItem('fx_On',true);
		}
		return fx_On;
	}
}

function setGameAudioVarables(item,state){
	if(item==1){
		if(state==false || state=='false'){
			$('#music-setting-img').attr('src','img/game_img/sound-off.svg');
			localStorage.setItem('introSoundPlaying',false);
		}else{
			localStorage.setItem('introSoundPlaying',true);
			$('#music-setting-img').attr('src','img/game_img/sound-on.svg');
		}
	}else if(item==2){
		if(state==false || state=='false'){
			localStorage.setItem('fx_On',false);
			$('#fx-setting-img').attr('src','img/game_img/sound-off.svg');
		}else{
			localStorage.setItem('fx_On',true);
			$('#fx-setting-img').attr('src','img/game_img/sound-on.svg');
		}
	}

}

function getBase64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var base64Img = canvas.toDataURL("image/png");
    if(base64Img == 'data:,'){
    	return null;
    }
    return base64Img;
}

function loadInLocal(e,id,type){
	if((type==1) && ( (localStorage.getItem('castel_image') == null) || (localStorage.getItem('castel_image') == 'null') || (localStorage.getItem('castel_image') == undefined) )){
		castel_image_element = document.getElementById(id);
		base64Data = getBase64(castel_image_element);
		localStorage.setItem('castel_image',base64Data);
	}
}


function saveElementsImagesInLocal(){
	if((localStorage.getItem('sound_on') == "null") || (localStorage.getItem('sound_on') == null) || (localStorage.getItem('sound_on') == undefined)){
		image = document.createElement("IMG");
		image.setAttribute("src", "img/game_img/sound-on.svg");
		base64Data = getBase64(image);
		localStorage.setItem('sound_on',base64Data);
	}
	if((localStorage.getItem('sound_off') == "null") || (localStorage.getItem('sound_off') == null) || (localStorage.getItem('sound_off') == undefined)){
		image = document.createElement("IMG");
		image.setAttribute("src", "img/game_img/sound-off.svg");
		base64Data = getBase64(image);
		localStorage.setItem('sound_off',base64Data);
	}
	if((localStorage.getItem('castel_image') == "null") || (localStorage.getItem('castel_image') == null) || (localStorage.getItem('castel_image') == undefined)){
		castel_image_element = document.getElementById("castel-img");
		base64Data = getBase64(castel_image_element);
		localStorage.setItem('castel_image',base64Data);
	}
	if((localStorage.getItem('logo') == "null") || (localStorage.getItem('logo') == null) || (localStorage.getItem('logo') == undefined)){
		image = document.createElement("IMG");
		image.setAttribute("src", "img/game_img/icon.png");
		base64Data = getBase64(image);
		localStorage.setItem('logo',base64Data);
	}
}

function imageNotFound(e,type){
	if((type==1) && (localStorage.getItem('castel_image') != "null") && (localStorage.getItem('castel_image') != null) && (localStorage.getItem('castel_image') != undefined)){
		e.src = localStorage.getItem('castel_image');
	}else if(type==2){
		if(e.src.endsWith('sound-on.svg')){
			if((localStorage.getItem('sound_on') != "null") && (localStorage.getItem('sound_on') != null) && (localStorage.getItem('sound_on') != undefined)){
				e.src = localStorage.getItem('sound_on');
			}
		}else if(e.src.endsWith('sound-off.svg')){
			if((localStorage.getItem('sound_off') != "null") && (localStorage.getItem('sound_off') != null) && (localStorage.getItem('sound_off') != undefined)){
				e.src = localStorage.getItem('sound_off');
			}
		}
	}else if(type==3){
		e.src = localStorage.getItem('castel_image');
	}
}