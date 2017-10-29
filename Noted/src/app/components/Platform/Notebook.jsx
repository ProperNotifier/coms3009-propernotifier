import React,{PropTypes} from 'react';
import {render} from 'react-dom';
import NotesPreview from "./utilities/NotesPreview.jsx";
// import $ from 'jquery';

class Notebook extends React.Component {
	render () {
		return (  
		    <div>
		        <NotesPreview mode="edit"/>
		        <NotesPreview mode="edit"/>
		        <NotesPreview mode="edit"/>
		        <NotesPreview mode="edit"/>
		        <NotesPreview mode="edit"/>

            </div>
	    );
	}
}


export default Notebook;