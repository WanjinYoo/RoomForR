import React, {useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import  './myList.scss';
import { deletePost } from '../helper/userInfo'


const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
  };
}

const Mylist = (props) => {
  
  return (
    <div className = "itemList">
      <div className = "title">
      <h3>{props.address}</h3>
      </div>
      <div className = "contents">
      <p>{props.price}</p>
      <p>{props.description}</p>
      <button 
      onClick = {() => {
        deletePost(props.id);
      }}>Delete</button>
      <div>
      
      </div>
      </div>
    </div>
    
  )
}
export default connect(mapStateToProps)(Mylist);
