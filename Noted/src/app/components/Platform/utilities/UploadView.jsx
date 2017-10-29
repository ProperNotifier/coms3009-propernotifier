import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange,uploadmodal} from "../../../actions/actions.jsx";
import {withRouter} from 'react-router-dom';

import UploadImagePreview from "./UploadImagePreview.jsx"
import UploadTags from "./UploadTags.jsx"
import {HOST} from "../../../../server/defaults";

class Upload extends React.Component {
	constructor(props){
		super(props);
		this.state={
			editor:null,
			input:[],
			title:"",
			price:"",
			description:"",
			//[{preview:,value:}]
		}
		// this.props.platformChange("Edit Notes");
		// $(".sidebar-menu-title.active").removeClass("active");
	}
	componentDidMount(){

	}
	onAddPicture(){
		// var myCodeMirror = this.state.editor.getValue();
		$(".upload-img-input").trigger("click");
	}
	onUploadImageChange(){
		let val=$(".upload-img-input").val();
		let input=$(".upload-img-input")[0];
	    let ext = val.substring(val.lastIndexOf('.') + 1).toLowerCase();
	    let inputs=this.state.input;
	    let self=this;
	    //alert(ext)
	    if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            // $('.imagepreview').attr('src', e.target.result);
	            let obj={preview:e.target.result,value:val,file:input.files[0]}
	            
	            inputs.push(obj);
	            self.setState({input:inputs});
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
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
    handleTitle(e) {
        this.setState({title: e.target.value});
    }
    handlePrice(e) {
        this.setState({price: e.target.value});
    }
    handleDescription(e) {
        this.setState({description: e.target.value});
    }
	onUploadClick(){
		
		
		if((this.state.input.length>0) && (this.state.title.length>0) && (this.state.description.length>0) && (this.state.price.length>0)){
			let index=0;
			var user_id=this.getCookie("id");
			let formData=new FormData();
			let self=this;
			this.props.loading(true); //SHOW LOADER
			// alert(this.getCookie("id"))
			this.state.input.map((obj)=>{
				index=(index+1)
				formData.append(index,self.state.input[index-1].file)
				//alert(index)
			})
			let title=this.state.title;
			let description=this.state.description;
			let price=this.state.price;

			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				 // console.log(this.responseText);
				}
			}
			request.onload = function(oEvent) {
			    if (request.status == 200) {
			      // console.log("Uploaded!");
				  self.props.parentState(self.state.input[0],this.responseText,title,description,price);//SEND INFO; 
			      self.setState({description:"",price:"",title:"",input:[]});
			      // self.closeModal();
			    } else {
			      // console.log("Error " + request.status + " occurred when trying to upload your file.<br \/>");
			      alert("Error uploading")
			    }
			  };

			request.open("POST", HOST+"/uploadimages/"+user_id,true);
			request.send(formData);
		}
	}
	render () {
		return (  
			        <div className="bottom-holder">
			        	<div className="col-md-5 col-xs-12">
			        		<div className="detail-line">			        		
			        			<label>Title:</label>
			        			<input onChange={this.handleTitle.bind(this)} value={this.state.title}/>
			        		</div>
			        		<div className="detail-line">			        		
			        			<label>Price:</label>
			        			<input onChange={this.handlePrice.bind(this)} value={this.state.price}/>
			        		</div>
			        		<div className="detail-line">
			        			<label>Description:</label>
				        		<textarea onChange={this.handleDescription.bind(this)} value={this.state.description} ></textarea>
				        	</div>
			        		<div className="detail-line">
			        			<label>Tags:</label>
			        			<UploadTags/>
				        	</div>
			        	</div>
			        	<div className="col-md-1">
			        	</div>
			        	<input onChange={this.onUploadImageChange.bind(this)} className="upload-img-input" style={{"display":"none"}} type="file" accept=".png, .jpg ,.jpeg"/>
			        	<div className="col-md-6 col-xs-12">
			        		<div className="picture-list">
			        			{
			        				this.state.input.map((obj,i)=>{
			        					return <UploadImagePreview key={i} src={obj.preview}/>
			        				})
			        			}
			        		</div>
			        		{
			        			this.state.input.length<1 && <div onClick={this.onAddPicture.bind(this)} className="add-picture fa fa-plus-circle"></div>
			        		}
			        		<div onClick={this.onUploadClick.bind(this)} className="btn upload-btn">Upload</div>			        	
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
