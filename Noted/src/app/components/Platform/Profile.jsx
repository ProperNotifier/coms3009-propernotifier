import React from 'react';
import {render} from 'react-dom';
// import $ from 'jquery';

class Explore extends React.Component {
	constructor(props){
		super(props);
		this.state={
			name:"",
			surname:"",
			occupation:"",
			organisation:"",

		}
	}
	handleName(e){
		this.setState({name:e.target.value})
	}
	handleSurname(e){
		this.setState({surname:e.target.value})
	}
	handleOccupation(e){
		this.setState({occupation:e.target.value})
	}
	render () {
		return (  
		    <div className="profile">
			    <div className="container col-xs-12">
			        		<div className="detail-line">			        		
			        			<label className="col-xs-12 col-md-2">Name:</label>
			        			<input onChange={this.handleName.bind(this)} value={this.state.name}/>
			        		</div>
			        		<div className="detail-line">			        		
			        			<label className="col-xs-12 col-md-2">Surname:</label>
			        			<input onChange={this.handleSurname.bind(this)} value={this.state.surname}/>
			        		</div>
			        		<div className="detail-line">
			        			<label className="col-xs-12 col-md-2">Occupation:</label>
				        		<input onChange={this.handleOccupation.bind(this)} value={this.state.occupation} ></input>
				        	</div>
			    </div>
            </div>
	    );
	}
}

export default Explore;