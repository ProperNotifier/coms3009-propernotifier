import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange,uploadmodal} from "../../actions/actions.jsx";
import {withRouter} from 'react-router-dom';

import TheMelabor from "./utilities/TheMelabor.jsx"
import UploadView from "./utilities/UploadView.jsx"

import {HOST} from "../../../server/defaults";

class Upload extends React.Component {
	constructor(props){
		super(props);
		this.state={
			editor:null,
			input:[],
			loading:false,
			uploadState:"upload",
			image:"",
			imageId:"",
			imageJSON:"",
			bar1:"",
			bar2:"",
			bar3:"",
			title:"",
			description:"",
			price:""
			//[{preview:,value:}]
		}
		// this.props.platformChange("Edit Notes");
		// $(".sidebar-menu-title.active").removeClass("active");
		this.loading=this.loading.bind(this);
		this.upload=this.upload.bind(this);
		this.theMelabor=this.theMelabor.bind(this);		

	}
	componentDidMount(){

	}
	loading(state){
		this.setState({loading:state})
	}
	upload(image,json,title,description,price){
		this.setState({image:image,imageJSON:json,imageId:"id",title:title,description:description,price:price,uploadState:"edit",bar1:"loaded",loading:false})
	}
	theMelabor(id){
		this.setState({imageId:id,uploadState:"done",bar2:"loaded",loading:false})
	}
	done(){
		this.setState({uploadState:"done",bar3:"loaded",loading:false})
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
	closeModal(){
		this.props.uploadmodal("closed")

	}
	render () {
		return (  
			<div className="upload-container">
			    <div className="upload-container-elements">
			    	<div className="top-line">
			    		<div className="loading-bar-container">
				    		<div className="loading-bar-holder">
				    			<div className={"loading-bar loading-bar1 "+this.state.bar1}></div>
				    			<div className={"loading-bar loading-bar2 "+this.state.bar2}></div>
				    			<div className={"loading-bar loading-bar3 "+this.state.bar3}></div>
				    		</div>
			    		</div>
			    		<div onClick={this.closeModal.bind(this)} className="close-btn fa fa-close"></div>
			    	</div>
			    	{
			    		this.state.loading && 
				    		<div className="circle-mask flicker">
	                            <img src="public/img/logowhiteclear.png"/>
	                        </div>
                    }
			        {!this.state.loading && this.state.uploadState=="upload" &&<UploadView loading={this.loading} parentState={this.upload}/>}
			        {!this.state.loading && this.state.uploadState=="edit" &&<TheMelabor loading={this.loading} parentState={this.theMelabor} image={this.state.image} imageJSON={this.state.imageJSON} title={this.state.title} description={this.state.description} price={this.state.price} imageId={this.state.imageId}/>}
			    	{!this.state.loading && this.state.uploadState=="done" &&
				    	<div style={{textAlign:"center",color:"white"}}>
					       <div className="circle-mask">
	                            <img src="public/img/logowhiteclear.png"/>
	                       </div>
	                       <p>Upload complete</p>
	                       <p>Your PDF is being compiled</p>
	                       <p>to be added to your Notebook</p>
	                       <div onClick={this.closeModal.bind(this)} style={{margin: "20px auto",float:"none"}} className="btn upload-btn"> DONE</div>
				    	</div>
                    }

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
