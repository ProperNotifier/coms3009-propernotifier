var boxSize = 0;
var boxPaint;
var boxDrags;
var boxState; //0: drag, 1: move, 2: add, 3: delete
//var bxJSON = "[]";
$(document).ready(function() {
	boxState = $('input[name=bxch]:checked').val();
	var bxst = $('#boxHolder').offset();

	var img = new Image();
	var Hwidth, Hheight;
	img.onload = function() {
		Hwidth = this.width;
		Hheight = this.height;
		$('#boxHolder').css("width", Hwidth);
		$('#boxHolder').css("height", Hheight);
		$('#boxHolder').css('background-image', 'url(' + this.src + ')');
	}
	img.src = 'test_nt_tut.jpg';
	$('#boxHolder').mousedown(function(e) {
		if(boxState == 0 && $(e.target).attr('class') == 'box') {
			resizeBox( (e.pageX - bxst.left), (e.pageY - bxst.top), true, $(e.target).attr('id'));
			boxPaint = true;
		} else if(boxState == 2) {
			var left = (e.pageX - bxst.left)-50;
			var top = (e.pageY - bxst.top)-50;
			$('#boxHolder').append( "<div id='box"+boxSize+"' class='box' style='left: "+left+"px; top: "+top+"'></div>" );
			$('#box'+boxSize).css("top", top);
			$('#box'+boxSize).click(function(e) {
				if(boxState == 3) {
					$(this).remove();
					boxSize--;
				}
			});
			boxSize++;
		}
	});

	$('#boxHolder').mousemove(function(e) {
		if(boxPaint && $(e.target).attr('class') == 'box'){
			resizeBox(e.pageX - bxst.left, e.pageY - bxst.top, true, $(e.target).attr('id'));
		}
	});

	$('#boxHolder').mouseup(function(e) {
		boxPaint = false;
	});

	$('#boxHolder').mouseleave(function(e) {
		boxPaint = false;
	});

	$('#clearButton').click(function() {
		//
	});

	$('#getJSONb').click(function () {
		var bxArray = [];
		var obj;
		$('#boxHolder').children('div').each(function () {
			var x = parseInt( $(this).css("left") );
			var y = parseInt( $(this).css("top") );
			var w = parseInt( $(this).css("width") );
			var h = parseInt( $(this).css("height") );
			obj = {"left": x, "right": x+w, "bottom": y+h, "top":y, "label": null};
			bxArray.push(obj);
		});
		bxJSON = JSON.stringify(bxArray);
		console.log(bxJSON);
	});

	$('#loadJSONb').click(function () {
		var bxArray = JSON.parse(bxJSON);
		for (var i=0; i<bxArray.length; i++) {
			var l = bxArray[i].left;// + bxst.left;
			var t = bxArray[i].top;// + bxst.top;
			var h = bxArray[i].bottom - bxArray[i].top;
			var w = bxArray[i].right - bxArray[i].left;
			$('#boxHolder').append( "<div id='box"+boxSize+"' class='box' ></div>" );
			$('#box'+boxSize).css("top", t);
			$('#box'+boxSize).css("left", l);
			$('#box'+boxSize).css("height", h);
			$('#box'+boxSize).css("width", w);
			$('#box'+boxSize).click(function(e) {
				if(boxState == 3) {
					$(this).remove();
					boxSize--;
				}
			});
			boxSize++;
		}
	});

	$('#boxHolder').on("mousedown", ".box", function(e) {
		if(boxState == 1 && $(e.target).attr('class') == 'box') {
			moveBox(e.pageX - bxst.left, e.pageY - bxst.top, true, $(e.target).attr('id'));
			boxDrags = true;
		}
	});

	$('#boxHolder').on("mousemove", ".box", function(e) {
		if(boxDrags && $(e.target).attr('class') == 'box') {
			moveBox(e.pageX - bxst.left, e.pageY - bxst.top, true, $(e.target).attr('id'));
		}
	});

	$('#boxHolder').on("mouseup", ".box", function(e) {
		boxDrags = false;
	});

	$('#boxHolder').on("mouseleave", ".box", function(e) {
		boxDrags = false;
	});
});

function moveBox(x, y, dragging, id) {
	if(dragging) {
		var height = parseInt( $('#'+id).css("height") );
		var width = parseInt( $('#'+id).css("width") );
		$('#'+id).css("top", (y-(height/2) )+"px");
		$('#'+id).css("left", (x-(width/2) )+"px");
	}
}

function resizeBox(x, y, dragging, id) {
	if(dragging) {
		var top = parseInt( $('#'+id).css("top") );
		var left = parseInt( $('#'+id).css("left") );
		if(y > (top - 10)) {
			$('#'+id).css("height", (y-(top - 10))+"px");
		}
		if(x > (left - 10)) {
			$('#'+id).css("width", (x-(left - 10))+"px");
		}
	}
}

function bxState(state) {
	boxState = state;
}
