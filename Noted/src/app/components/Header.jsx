import React from 'react';
import {render} from 'react-dom';
import SideBarToggle from './Header/SideBarToggle.jsx';
import DropdownProfile from './Header/DropdownProfile.jsx';
import $ from 'jquery';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeAuth,uploadmodal} from "../actions/actions.jsx";
class Header extends React.Component {
	widthShow(){
		alert("UPLOAD IMAGE");
	}
  render () {
    return (<header className="header">
    			<div className="logo-container">
	    			<a id="logo">
	    			   Noted
	    			</a>
    			</div>
    			<nav className="navbar navbar-static-top" role="navigation">
    				<SideBarToggle/>
	                <div className="navbar-right">
	                    <ul className="nav navbar-nav">
	                        {false && <li className="dropdown header-menu notifications-menu">
	                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
	                                <i className="fa fa-bell"></i>
	                                <span className="label notification-badge label-warning">4</span>
	                            </a>
	                            <ul className="dropdown-menu header-dropdown-menu" style={{"marginTop": "10px"}}>
	                                <li className="header">You have 10 notifications</li>
	                                <li>
	                                    <ul className="menu">
	                                        <li>
	                                            <a href="#">
	                                                <i className="glyphicon glyphicon-education info"></i> 5 new members joined today
	                                            </a>
	                                        </li>
	                                        <li>
	                                            <a href="#">
	                                                <i className="fa fa-warning danger"></i> Very long description here that may not fit into the page and may cause design problems
	                                            </a>
	                                        </li>
	                                        <li>
	                                            <a href="#">
	                                                <i className="fa fa-users warning"></i> 5 new members joined
	                                            </a>
	                                        </li>

	                                        <li>
	                                            <a href="#">
	                                                <i className="glyphicon glyphicon-grain success"></i> 25 sales made
	                                            </a>
	                                        </li>
	                                        <li>
	                                            <a href="#">
	                                                <i className="glyphicon glyphicon-education danger"></i> You changed your username
	                                            </a>
	                                        </li>
	                                    </ul>
	                                </li>
	                                <li className="footer"><a href="#">View all</a></li>
	                            </ul>
	                        </li>}
	                        <li className="dropdown header-menu messages-menu">
	                            <a href="#" className="dropdown-toggle" onClick={()=>this.props.uploadmodal("open")} data-toggle="dropdown">
	                                <i className="fa fa-upload"></i>
	                            </a>
	                        </li>
	                        <li className="dropdown header-menu user user-menu" >
	                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
		                            <img src={this.props.user.image} className="img-circle" alt="User Image" />
		                            <i className="glyphicon glyphicon-option-vertical"></i>
	                            </a>
	                            <DropdownProfile/>

	                        </li>
	                	</ul>
                    </div>
    			</nav>
    		</header>);
  }
}


function mapStateToProps(state) {
  return({
    user:state.user    
  });
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({uploadmodal:uploadmodal},dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Header);
//render(<App/>, document.getElementById('app'));
