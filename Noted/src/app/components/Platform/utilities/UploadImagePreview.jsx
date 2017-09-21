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
	}
	render () {
		return (  
			<div className="upload-image-item col-sm-6 col-md-3">
				<img src={this.props.src}/>
            </div>
	    );
	}
}

export default UploadImagePreview;