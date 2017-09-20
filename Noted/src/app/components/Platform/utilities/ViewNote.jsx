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
		let numPages= 3;
		let pages=[];
		for (var i = 1; i <= numPages; i++) {
			pages.push(i);
		}
		this.state={
			editor:null,
			noteid:cat_id,
			title:"Abstract Mathematics III",
			preview:pages,
			pdf:HOST+"/pdf"
		}
		// this.props.platformChange("Edit Notes");
		$(".sidebar-menu-title.active").removeClass("active");
	}
	componentDidMount(){
		// myCodeMirror.setValue(`\\document[10pt]{article}`);
		// let l=myCodeMirror.mirror.getValue();

	    /*$.get("localhost:8081/server.txt", function(data, status){
	        
	    });*/

	}
	onRead(){
		this.props.platformChange(this.state.title);
		this.props.history.push("/ReadNotes?="+this.state.noteid);
	}
	saveClick(){
		// var myCodeMirror = this.state.editor.getValue();
	}
	render () {
		return (  
		    <div className="view-notes-area">
		        <div className="col-xs-12 notes-information">
		        	<div className="col-xs-12 col-md-4 col-sm-6">
		        		<img className="notes-picture" src="public/img/pdf.png"/>
		        	</div>
		        	<div className="col-xs-12 col-md-8 col-sm-6">
			    		<div className=" col-md-12 notes-details">
			    			<h1 className="notes-name" style={{'textTransform':"capitalize"}}>Mahlekenyane Tseole</h1>
			    			<p className="notes-date"> Date: 20/01/2017</p>
			    			<p className="notes-price"> R50</p>
			    			<Ratings id={this.state.noteid} rating={3} mode="rate"/>
			    			<h3 className="col-md-12 notes-title">{this.state.title}</h3>

					        <div className="viewer-buttons-holder">
					    		<div className="btn">Buy</div>
					    		<div className="btn" onClick={this.onRead.bind(this)}>Read</div>
					        </div>
			    		</div>
		        	</div>
		        </div>
		        <div className="col-xs-12 col-sm-8 col-md-7">
		          <p className="notes-description">
		          	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 

Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.
		          </p>
		          <div className="preview-section">
		          		<h3>Preview</h3>
		          		<div className="preview-pdf">
		          	
				    	{
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