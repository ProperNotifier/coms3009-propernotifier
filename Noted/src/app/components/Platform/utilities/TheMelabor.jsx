import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange,uploadmodal} from "../../../actions/actions.jsx";
import {withRouter} from 'react-router-dom';

import UploadImagePreview from "./UploadImagePreview.jsx"
import UploadTags from "./UploadTags.jsx";
import {HOST} from "../../../../server/defaults";

var boxPaint;
var boxDrags;
var bxst;
var boxState; //0: drag, 1: move, 2: add, 3: delete

function function_name() {
	// body...
	console.log("CLICKBOX")
}

class Upload extends React.Component {
	constructor(props){
		super(props);
		this.state={
			editor:null,
			// imageJSON:"[{\"label\": null, \"top\": 527, \"certainty\": 15.0, \"left\": 437, \"right\": 440, \"bottom\": 530}, {\"label\": null, \"top\": 473, \"certainty\": 12.0, \"left\": 28, \"right\": 39, \"bottom\": 474}, {\"label\": null, \"top\": 331, \"certainty\": 30.0, \"left\": 447, \"right\": 450, \"bottom\": 335}, {\"label\": null, \"top\": 562, \"certainty\": 66.0, \"left\": 116, \"right\": 119, \"bottom\": 567}, {\"label\": null, \"top\": 472, \"certainty\": 86.0, \"left\": 49, \"right\": 68, \"bottom\": 474}, {\"label\": null, \"top\": 463, \"certainty\": 12.0, \"left\": 400, \"right\": 410, \"bottom\": 468}, {\"label\": null, \"top\": 632, \"certainty\": 15.0, \"left\": 382, \"right\": 387, \"bottom\": 642}, {\"label\": null, \"top\": 358, \"certainty\": 26.0, \"left\": 112, \"right\": 120, \"bottom\": 365}, {\"label\": null, \"top\": 339, \"certainty\": 82.0, \"left\": 367, \"right\": 386, \"bottom\": 342}, {\"label\": null, \"top\": 620, \"certainty\": 34.0, \"left\": 395, \"right\": 410, \"bottom\": 624}, {\"label\": null, \"top\": 331, \"certainty\": 21.0, \"left\": 371, \"right\": 383, \"bottom\": 336}, {\"label\": null, \"top\": 467, \"certainty\": 33.0, \"left\": 391, \"right\": 410, \"bottom\": 471}, {\"label\": null, \"top\": 345, \"certainty\": 49.0, \"left\": 227, \"right\": 237, \"bottom\": 354}, {\"label\": null, \"top\": 550, \"certainty\": 33.0, \"left\": 217, \"right\": 227, \"bottom\": 561}, {\"label\": null, \"top\": 455, \"certainty\": 24.0, \"left\": 395, \"right\": 408, \"bottom\": 464}, {\"label\": null, \"top\": 539, \"certainty\": 64.0, \"left\": 220, \"right\": 231, \"bottom\": 550}, {\"label\": null, \"top\": 543, \"certainty\": 33.0, \"left\": 419, \"right\": 425, \"bottom\": 564}, {\"label\": null, \"top\": 357, \"certainty\": 82.0, \"left\": 228, \"right\": 248, \"bottom\": 364}, {\"label\": null, \"top\": 200, \"certainty\": 45.0, \"left\": 441, \"right\": 450, \"bottom\": 219}, {\"label\": null, \"top\": 318, \"certainty\": 22.0, \"left\": 355, \"right\": 367, \"bottom\": 340}, {\"label\": null, \"top\": 238, \"certainty\": 96.0, \"left\": 352, \"right\": 450, \"bottom\": 241}, {\"label\": null, \"top\": 454, \"certainty\": 44.0, \"left\": 372, \"right\": 391, \"bottom\": 470}, {\"label\": null, \"top\": 628, \"certainty\": 18.0, \"left\": 353, \"right\": 376, \"bottom\": 642}, {\"label\": null, \"top\": 541, \"certainty\": 86.0, \"left\": 370, \"right\": 390, \"bottom\": 558}, {\"label\": null, \"top\": 545, \"certainty\": 24.0, \"left\": 430, \"right\": 450, \"bottom\": 562}, {\"label\": null, \"top\": 195, \"certainty\": 27.0, \"left\": 384, \"right\": 413, \"bottom\": 207}, {\"label\": null, \"top\": 541, \"certainty\": 22.0, \"left\": 339, \"right\": 365, \"bottom\": 556}, {\"label\": null, \"top\": 207, \"certainty\": 53.0, \"left\": 373, \"right\": 392, \"bottom\": 228}, {\"label\": null, \"top\": 543, \"certainty\": 33.0, \"left\": 235, \"right\": 261, \"bottom\": 560}, {\"label\": null, \"top\": 335, \"certainty\": 38.0, \"left\": 101, \"right\": 114, \"bottom\": 369}, {\"label\": null, \"top\": 338, \"certainty\": 85.0, \"left\": 207, \"right\": 226, \"bottom\": 363}, {\"label\": null, \"top\": 540, \"certainty\": 25.0, \"left\": 88, \"right\": 110, \"bottom\": 569}, {\"label\": null, \"top\": 604, \"certainty\": 23.0, \"left\": 428, \"right\": 450, \"bottom\": 633}, {\"label\": null, \"top\": 326, \"certainty\": 51.0, \"left\": 412, \"right\": 435, \"bottom\": 358}, {\"label\": null, \"top\": 525, \"certainty\": 86.0, \"left\": 397, \"right\": 415, \"bottom\": 566}, {\"label\": null, \"top\": 200, \"certainty\": 43.0, \"left\": 402, \"right\": 440, \"bottom\": 222}, {\"label\": null, \"top\": 329, \"certainty\": 30.0, \"left\": 316, \"right\": 342, \"bottom\": 363}, {\"label\": null, \"top\": 537, \"certainty\": 64.0, \"left\": 306, \"right\": 337, \"bottom\": 568}, {\"label\": null, \"top\": 604, \"certainty\": 37.0, \"left\": 327, \"right\": 358, \"bottom\": 636}, {\"label\": null, \"top\": 332, \"certainty\": 90.0, \"left\": 171, \"right\": 210, \"bottom\": 365}, {\"label\": null, \"top\": 396, \"certainty\": 99.0, \"left\": 417, \"right\": 450, \"bottom\": 437}, {\"label\": null, \"top\": 531, \"certainty\": 41.0, \"left\": 172, \"right\": 214, \"bottom\": 565}, {\"label\": null, \"top\": 600, \"certainty\": 98.0, \"left\": 252, \"right\": 294, \"bottom\": 642}, {\"label\": null, \"top\": 453, \"certainty\": 100.0, \"left\": 69, \"right\": 450, \"bottom\": 476}]",
			imageJSON: this.props.imageJSON,
			title:"",
			price:"",
			description:"",
			boxState:0
			//[{preview:,value:}]
		}
		// this.props.platformChange("Edit Notes");
		// $(".sidebar-menu-title.active").removeClass("active");
		this.bxState=this.bxState.bind(this);
		this.bhMousedown=this.bhMousedown.bind(this);
		this.bhMousemove=this.bhMousemove.bind(this);
		this.boxDown=this.boxDown.bind(this);
		this.boxMove=this.boxMove.bind(this);
	}
	componentDidMount(){
		var self=this;
		//boxState = $('input[name=bxch]:checked').val();
		bxst = $('#boxHolder').offset();		
		var img = new Image();
		var Hwidth, Hheight;
		img.onload = function() {
			// window.innerWidth>this.width?(Hwidth = this.width):(Hwidth = window.innerWidth)
			Hwidth = this.width;
			Hheight = this.height;
			$('#boxHolder').css("width", Hwidth);
			$('#boxHolder').css("height", Hheight);
			$('#boxHolder').css('background-image', 'url(' + this.src + ')');
		}
		img.src = this.props.image.preview;

	}
	bhMousedown(e) {
		if(this.state.boxState == 0 && $(e.target).attr('class') == 'box') {
			resizeBox( (e.pageX - bxst.left), (e.pageY - bxst.top), true, $(e.target).attr('id'));
			boxPaint = true;
		} else if(this.state.boxState == 2) {
			var left = (e.pageX - bxst.left)-50;
			var top = (e.pageY - bxst.top)-50;

			var bxArray = JSON.parse(this.state.imageJSON);
			bxArray.push({"left": left, "right": left+108, "bottom": top+108, "top":top, "label": null})
			var bxJSON = JSON.stringify(bxArray);
			console.log("BOOL: "+this.state.imageJSON==bxJSON)
			this.setState({imageJSON:bxJSON});
			
		}
	}
	bhMousemove(e){
		if(boxPaint && $(e.target).attr('class') == 'box'){
			resizeBox(e.pageX - bxst.left, e.pageY - bxst.top, true, $(e.target).attr('id'));
		}
	}
	deleteBox(num){
				if(this.state.boxState == 3) {
					console.log('#box'+num)

					$('#box'+num).remove();

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
					var bxJSON = JSON.stringify(bxArray);
					/*this.setState({imageJSON:bxJSON});*/
				}

	}
	boxPaint(){
		boxPaint=false;
	}
	boxDrags(){
		boxDrags=false;
	}
	boxDown(e) {
		console.log("befboxState "+this.state.boxState)
		if(this.state.boxState == 1 && $(e.target).attr('class') == 'box') {
			console.log("boxState")
			moveBox(e.pageX - bxst.left, e.pageY - bxst.top, true, $(e.target).attr('id'));
			boxDrags = true;
		}
	}

	boxMove(e) {
		console.log("befboxDrags")
		if(boxDrags && $(e.target).attr('class') == 'box') {
			console.log("boxDrags")
			moveBox(e.pageX - bxst.left, e.pageY - bxst.top, true, $(e.target).attr('id'));
		}
	}
	bhOver(e){
		switch(this.state.boxState){
			case 0:{
				$(e.target).css({cursor:"unset"});
				if($(e.target).attr('class') == 'box') {
					$(e.target).css({cursor:"se-resize"});
				}
				break;
			}
			case 1:{
				$(e.target).css({cursor:"unset"});
				if($(e.target).attr('class') == 'box') {
					$(e.target).css({cursor:"move"});
				}
				break;
			}
			case 2:{
					$(e.target).css({cursor:"crosshair"});
				break;
			}
			case 3:{
				$(e.target).css({cursor:"unset"});
				if($(e.target).attr('class') == 'box') {
					$(e.target).css({cursor:"pointer"});
				}
				break;
			}
			default:{
				$(e.target).css({cursor:"unset"});
			}
		}
	}
	bxState(state) {
		let boxState = state;
		this.setState({boxState:boxState})
		console.log("boxState now "+boxState);
	}	
	getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    }
	    return "";
	}
	saveJSON(){
		//DO Meriam's stuff
		var bxArray = [];
		var obj;
		var self=this;
		var user_id=this.getCookie("id");
		$('#boxHolder').children('div').each(function () {
			var x = parseInt( $(this).css("left") );
			var y = parseInt( $(this).css("top") );
			var w = parseInt( $(this).css("width") );
			var h = parseInt( $(this).css("height") );
			obj = {"left": x, "right": x+w, "bottom": y+h, "top":y, "label": null};
			bxArray.push(obj);
		});
		var bxJSON = JSON.stringify(bxArray);
		/*alert(this.state.imageJSON);
		alert(bxJSON);*/

		//
		this.props.loading(true)
			/*var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				 console.log(this.responseText);
				}
			}
			request.onload = function(oEvent) {
			    if (request.status == 200) {
			      
			      // self.setState({description:"",price:"",title:"",input:[]});
				  // 
			      // self.closeModal();
			    } else {
			      // console.log("Error " + request.status + " occurred when trying to upload your file.<br \/>");
			      alert("Error uploading")
			    }
			  };

			request.open("POST", HOST+"/uploadjson/"+user_id,true);
			request.send({});-*/
			let title=this.props.title;
			let description=this.props.description;
			let price=this.props.price;

            $.post(HOST+"/uploadjson/"+user_id, {
                    json:bxJSON,
                    title:title,
					description:description,
					price:price
                },
                function(res){
                	console.log("Uploaded! "+res);
                	self.props.parentState("id");//SEND INFO;

                })

	}
	render () {
		var bxArray = JSON.parse(this.state.imageJSON);
		console.log("JSON: "+bxArray.length);
		return (  
			        <div className="bottom-holder">
			        	<div style={{display:"block",margin:"auto",maxWidth:'500px',minWidth:"100%",textAlign:"center","height":"auto"}} className="melabor-holder">
				        	<form>
								<input type="radio" id="bxch0" name="bxch" value="0" onChange={()=>this.bxState(0)} checked={this.state.boxState==0} />
							    <label htmlFor="bxch0">Resize</label>

							    <input type="radio" id="bxch1" name="bxch" value="1" onChange={()=>this.bxState(1)} checked={this.state.boxState==1} />
							    <label htmlFor="bxch1">Move</label>

							    <input type="radio" id="bxch2" name="bxch" value="2" onChange={()=>this.bxState(2)} checked={this.state.boxState==2} />
							    <label htmlFor="bxch2">Add</label>

								<input type="radio" id="bxch3" name="bxch" value="3" onChange={()=>this.bxState(3)} checked={this.state.boxState==3} />
								<label htmlFor="bxch3">Delete</label>
				        	</form>
							<div id="boxHolder" className="boxHolder" onMouseOver={this.bhOver.bind(this)} onMouseDown={this.bhMousedown} onMouseMove={this.bhMousemove} onMouseUp={()=>this.boxPaint()} onMouseLeave={this.boxPaint()}>
							{
								bxArray.map((box,index)=>{
									var l = box.left;// + bxst.left;
									var t = box.top;// + bxst.top;
									var h = box.bottom - box.top;
									var w = box.right - box.left;
									var style={
										top:t,
										left:l,
										height:h,
										width:w
									}
									return <div key={index} style={style} onClick={()=>this.deleteBox(index)} onMouseDown={this.boxDown} onMouseMove={this.boxMove} onMouseUp={()=>this.boxDrags()} onMouseLeave={this.boxDrags()} id={'box'+index} className='box' ></div>
								})
							}

								
							</div>
			        	   <div onClick={this.saveJSON.bind(this)} style={{margin: "20px auto",float:"none"}} className="btn upload-btn"> SAVE</div>
			        	</div>
			        </div>
	    );
	}
}

function mapStateToProps(state) {
	return({
		user:state.user,
		platform:state.onPlatform
		
	});
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({platformChange:platformChange,uploadmodal:uploadmodal},dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Upload));

//var bxJSON = "[]";
$(document).ready(function() {

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