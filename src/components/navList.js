import React from 'react'
import Signup from './signup'
import './navList.scss';
import { connect } from 'react-redux';
import {Link } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (user) => dispatch({type: "LOGIN_USER", login: user}),
  }
}
const NavList = (props) => {
  return (
<header>
<nav>
  <div className ="">
    <Link to = "/"> RoomForR </Link>
    <Link to = "/myList">{props.navContent}</Link>
</div>
  <div>
    <a href="">Language</a>
  {!props.login && <Signup />}
  {props.login && <button
  onClick = {() => {
    props.storeUser(null);
  }}
  >LOGOUT</button>}
  </div>
</nav>
</header>
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(NavList)
