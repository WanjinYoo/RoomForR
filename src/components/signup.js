import React, {useState} from 'react'
import Popup from 'reactjs-popup';
import { logInUser , signUp } from '../helper/userInfo'
import { connect } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import './signup.scss';

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

const Signup = (props) => {
  const [user,setUser] = useState({
    name: '',
    phoneNumber: '',
    Email: '',
    password: '',
  })
  const [logIn,setlogIn] = useState({
    Email: '',
    password: '',
  })

  return (
    <Popup
    trigger={<button className="button"> <strong>SIGNUP/LOGIN</strong> </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
      <div>
      <form autoComplete = "off" onSubmit = {event => event.preventDefault()}>

      {/* SIGNUP component */}
      <div className="signUp">
      <h2>SIGN-UP form</h2>
      <label htmlFor="name"><b>Name</b></label>
      <input 
       type="text"
       placeholder="Username" 
       name="name" 
       onChange = {(event) => {
         setUser({
           ...user,
           name: event.target.value
         })
       }}
       required />
      <label htmlFor="phoneNumber"><b>Phone number</b></label>
      <input type="text" 
      placeholder="Enter phoneNumber" 
      name="phoneNumber" 
      onChange = {(event) => {
        setUser({
          ...user,
          phoneNumber: event.target.value
        })
      }}
      required />
      <label htmlFor="email"><b>Email</b></label>
      <input type="email" 
      placeholder="Enter Email" 
      name="email"
      onChange = {(event) => {
        setUser({
          ...user,
          Email: event.target.value
        })
      }} 
      required />
      <label htmlFor="password"><b>Password</b></label>
      <input type="password" 
      placeholder="Enter Password" 
      name="password" 
      onChange = {(event) => {
        setUser({
          ...user,
          password: event.target.value
        })
      }}
      required />
      <button 
      onClick = {() => {
        signUp(user)
        .then(() => {
          alert("SignUp was successful");
        })
        .catch((err) => {
          alert('Invalid Email');
        })
      }}>SIGNUP</button>
      </div>
      </form>
      {/* LOG IN component */}
    
      <div className="signUp">
      <h2>LOG-IN form</h2>
      <label htmlFor="email"><b>Email</b></label>
      <input 
      type="email" 
      placeholder="Enter Username" 
      name="email" 
      onChange = {(event) => {
        setlogIn({
          ...logIn,
          Email: event.target.value
        })
      }}
      required />
      <label htmlFor="password"><b>Password</b></label>
      <input 
      type="password" 
      placeholder="Enter Password" 
      name="password" 
      onChange = {(event) => {
        setlogIn({
          ...logIn,
          password: event.target.value
        })
      }}
      required />
      <button 
      onClick = {() => {
        logInUser(logIn)
        .then((data) => {
          if(!data) {
            alert('Invalid information')
          }
         else {
            props.storeUser(data);
         }
        })
      }}>LOGIN</button>
      </div>
      </div>
      </div>
  )}
  </Popup>
  )
    }
  export default connect(mapStateToProps,mapDispatchToProps)(Signup);
