import React from 'react';
import {render} from 'react-dom';
// import $ from 'jquery';
import {Doughnut, Bar} from 'react-chartjs-2';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../../actions/actions.jsx";

import NotesPreview from "./utilities/NotesPreview.jsx";
import Rating from "./utilities/Rating.jsx";

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			books:[]
		}
		
	}
	componentDidMount(){
		var user_id=this.getCookie("id")
		var self=this;
		$.post(HOST+"/store/"+user_id, {
	            //post data to the server
	        },
	        function(response){
	        	//make use of the response here
	        	if(response!="error"){
					self.setState({books:response});
				}	
	        }
	    );
		
	}
	render () {
		return (  
		    <div>         
                   <div className="recent-ad-activity col-md-12 col-xs-12">
			    	{
			    		this.state.books.map((item,i)=>{
			    			var name=item.firstname+" "+item.surname;
			    			return(
			    				<NotesPreview key={i} id={item.id} name={item.name} date={item.date.split("T")[0]} price={item.price} author={name} rating={parseInt(item.ratings)} mode="view"/>
			    			)
			    		})
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
	return bindActionCreators({platformChange:platformChange},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Home);