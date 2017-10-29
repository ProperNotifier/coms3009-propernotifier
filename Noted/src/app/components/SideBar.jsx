import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {platformChange} from "../actions/actions.jsx";

import EditNote from "./Platform/utilities/NotesPreview.jsx";


import { Router,Link} from 'react-router-dom';
//import { IndexRoute,Router,Route,Link} from 'react-router';

import $ from 'jquery';

class SideBar extends React.Component {
	constructor(props){
		super(props);
		this.sideMenuClick=this.sideMenuClick.bind(this);

	}
	sideMenuClick(id) {
		// alert("a clicked "+id);
		if(window.innerWidth>560)
		  $(".right-side .content-header").animate({left: '200px'},200);
		$(".active").toggleClass("active");
		$(".activetree").removeClass("activetree");
		$("."+id).addClass("active");
		////////alert(history.location.pathname);
		//alert($("#"+id).attr("id"));
		this.props.platformChange(id);
	}
  
	render () {
		var self=this;


		return (
			<aside className="left-side sidebar-offcanvas">
	            <section className="sidebar">
	                <div className="user-panel">
	                	<div className="user-panel-top">
		                    <div className="pull-left image col-xs-4">
		                        <img src={this.props.user.image} className="img-circle" alt="User Image" />
		                    </div>
		                    <div className="pull-right info col-xs-8">
		                        <p>{this.props.user.name}</p>
		                        <p>{this.props.user.surname}</p>
		                        
		                    </div>
	                	</div>
	                	<div className="user-panel-bottom">
		                    <p className="col-xs-12 organisation-name" style={{"width":"100%","textAlign":"center"}}>{this.props.user.organisation}</p>
	                	</div>
	                </div>
		                <ul className="sidebar-menu">
		                    <li className="sidebar-menu-title Home active">
			                        <Link to="/Home" id="Home" onClick={()=>this.sideMenuClick("Home")}>
			                            <i className="fa fa-dashboard"></i> <span>Home</span>
			                        </Link>
		                    </li>
		                    <li className="sidebar-menu-title Notebook">
			                        <Link to="/Notebook" id="Notebook" onClick={()=>this.sideMenuClick("Notebook")} >
			                            <i className="fa fa-folder-open"></i> <span>My Notebook</span>
			                        </Link>
		                    </li>
		                    <li className="sidebar-menu-title Store">
		                        <Link to="/Store" onClick={()=>this.sideMenuClick("Store")}>
		                            <i className="fa fa-money"></i> <span>Store</span>
		                        </Link>
		                    </li>
		                    {false && <li className="sidebar-menu-title Stats">
		                        <Link to="/Stats" onClick={()=>this.sideMenuClick("Stats")}>
		                            <i className="fa fa-bar-chart"></i> <span>Stats</span>
		                        </Link>
		                    </li>}
		                    
		                </ul>
	            </section>
			</aside>);
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

export default connect(mapStateToProps,matchDispatchToProps)(SideBar);
//render(<Linkpp/>, document.getElementById('app'));