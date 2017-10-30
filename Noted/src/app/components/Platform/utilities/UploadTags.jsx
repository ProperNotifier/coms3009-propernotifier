import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import {HOST} from "../../../../server/defaults";

class UploadImagePreview extends React.Component {
	constructor(props){
		super(props);
		this.state={
			editor:null
		}
		// this.props.platformChange("Edit Notes");
		// $(".sidebar-menu-title.active").removeClass("active");
		$(document).on("click",".upload-container .upload-container-elements .bottom-holder .tags-holder span",function(argument) {
			// body...
			$(this).toggleClass("selected")
			// alert($(this).html())
		})
	}
	render () {
		return (  
			<div className="tags-holder">
    			<span>abstract</span>
    			<span>mathematics</span>
    			<span>science</span>
    			<span>groups</span>
    			<span>economics</span>
    			<span>music</span>
    			<span>accounting</span>
    			<span>finance</span>
    			<span>corporate</span>
    			<span>literature</span>
    			<span>computer</span>
    			<span>code</span>
			</div>
	    );
	}
}

export default UploadImagePreview;