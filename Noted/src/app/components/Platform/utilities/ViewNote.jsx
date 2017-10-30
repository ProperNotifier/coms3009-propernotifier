import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../../../actions/actions.jsx";
import PDF from 'react-pdfjs';

import {HOST} from "../../../../server/defaults";
import Ratings from "./Rating.jsx";

class ViewNote extends React.Component {
	constructor(props){
		super(props);
		//Get Id
        var a = window.location.toString();
        if (a.indexOf("=")<0) {
            var cat_id="";
        } else {
            var cat_id=a.substring(a.indexOf("=")+1);
        }
        //Preview pages
		let numPages= 1;
		let pages=[];
		for (var i = 1; i <= numPages; i++) {
			pages.push(i);
		}
		this.state={
			editor:null,
			noteid:cat_id,
			ownerid:"",
			title:"",
			date:"",
			price:"",
			author:"",
			rating:0,
			bought:false,
			preview:pages,
			description:"",
			pdf:"",
			user_id:""
		}
		// this.props.platformChange("Edit Notes");
		$(".sidebar-menu-title.active").removeClass("active");
	}
	componentDidMount(){
		// myCodeMirror.setValue(`\\document[10pt]{article}`);
		// let l=myCodeMirror.mirror.getValue();
		var self=this;
		var user_id=this.getCookie("id");

		$.post(HOST+"/getnote", {
	            //post data to the server
	            user_id:user_id,
	            book_id:this.state.noteid
	        },
	        function(response){
	        	//make use of the response here
	        	console.log(response)
	        	if(response!="error"){
	        		var note=response[0];
	        		var state={
						title:note.title,
						ownerid:note.user_id,
						date:note.date.split("T")[0],
						price:note.price,
						author:note.firstname+" "+note.surname,
						rating:parseInt(note.ratings),
						description:note.description,
						pdf:note.pdf,
						user_id:user_id
	        		}
					self.setState(state);
				}	
	        }
	    );

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
	onRead(){
		this.props.platformChange(this.state.title);
		this.props.history.push("/ReadNotes?="+this.state.noteid);
	}
	saveClick(){
		// var myCodeMirror = this.state.editor.getValue();
	}
	onBuy(){
		var self=this;
		var user_id=this.getCookie("id");
		this.setState({bought:true})


		/*$.post(HOST+"/buy", {
	            //post data to the server
	            book_buyer:user_id,
	            book_seller:self.state.ownerid,
	            book_id:self.state.noteid
	        },
	        function(response){
	        	//make use of the response here
	        	console.log(response)
	        	if(response!="error"){
					self.props.platformChange("Home");
					self.props.history.push("/Home");
				}	
	        }
	    );*/
	}
	render () {
		return (  
		    <div className="view-notes-area">
		        <div className="col-xs-12 notes-information">
		        	<div className="col-xs-12 col-md-4 col-sm-6">
		        		<img className="notes-picture" src="public/img/logoblackclear.png"/>
		        	</div>
		        	<div className="col-xs-12 col-md-8 col-sm-6">
			    		<div className=" col-md-12 notes-details">
			    			<h1 className="notes-name" style={{'textTransform':"capitalize"}}>{this.state.author}</h1>
			    			<p className="notes-date"> Date: {this.state.date}</p>
			    			<p className="notes-price"> R{this.state.price}</p>
			    			<Ratings id={this.state.noteid} user={this.state.user_id} rating={this.state.rating} mode="rate"/>
			    			<h3 className="col-md-12 notes-title">{this.state.title}</h3>

					        <div className="viewer-buttons-holder">
					    		<div className="btn" onClick={this.onBuy.bind(this)}>Buy</div>
					    		<div className="btn" onClick={this.onRead.bind(this)}>Read</div>
					        </div>
			    			{this.state.bought && <p style={{color:"orange"}}><b>BOUGHT</b></p>}
			    		</div>
		        	</div>
		        </div>
		        <div className="col-xs-12 col-sm-8 col-md-7">
		          <p className="notes-description">
		          	{this.state.description}
		          </p>
		          <div className="preview-section">
		          		<h3>Preview</h3>
		          		<div className="preview-pdf">
		          	
				    	{this.state.pdf.length>1 &&
				    		this.state.preview.map((page)=>{
						    	return(
						    		<div className="pdf-page">
								        <PDF
								          file={this.state.pdf}
								          page={page}
								        />
								    </div>
								)

				    		})
						}
						</div>
		          </div>
		        </div>
		        <div className="col-xs-12 col-sm-4 col-md-5">
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
	return bindActionCreators({platformChange:platformChange},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ViewNote);