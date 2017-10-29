import React,{PropTypes} from 'react';
import {render} from 'react-dom';
import NotesPreview from "./utilities/NotesPreview.jsx";
import $ from 'jquery';
import {HOST} from "../../../server/defaults";

class Notebook extends React.Component {
	constructor(props){
		super(props);
		this.state={
			books:[]
		}
	}
	componentDidMount(){
		var user_id=this.getCookie("id")
		var self=this;
		$.post(HOST+"/getnotebook/"+user_id, {
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
	render () {
		return (  
		    <div>
		    	{
		    		this.state.books.map((item,i)=>{
		    			var name=item.firstname+" "+item.surname;
		    			alert(item.ratings)
		    			return(
		    				<NotesPreview key={i} id={item.id} name={item.name} date={item.date} price={item.price} author={name} rating={parseInt(item.ratings)} mode="edit"/>
		    			)
		    		})
		    	}
		        
		        <NotesPreview id={12} name={"Parallel"} date={"2017/12/12"} price={47} author={"Mahlekenyane Elliot"} rating={4} mode="edit"/>
		        <NotesPreview id={12} name={"Parallel"} date={"2017/12/12"} price={47} author={"Mahlekenyane Elliot"} rating={1} mode="edit"/>
		        <NotesPreview id={12} name={"Parallel"} date={"2017/12/12"} price={47} author={"Mahlekenyane Elliot"} rating={2} mode="edit"/>
		        <NotesPreview id={12} name={"Parallel"} date={"2017/12/12"} price={47} author={"Mahlekenyane Elliot"} rating={5} mode="edit"/>
            </div>
	    );
	}
}


export default Notebook;
