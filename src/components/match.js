import React, {Fragment, useEffect} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {roomData} from '../data/sampleData'
import './match.scss';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { connect } from 'react-redux';
import axios from 'axios'
import { saveToList } from '../helper/userInfo'

const mapStateToProps = state => {
  return {
    address: state.address,
    matchIndex: state.matchIndex,
    rooms: state.rooms,
    loggedInUser: state.loggedInUser
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    nextMatch: (next) => dispatch({type: "NEXT_ROOM_INDEX", index: next}),
    getRooms: (room) => dispatch({type: "GET_ROOMS",rooms: room})
  }
}
//Get data from rooms endpoint

  

// Matches rooms within 2km radius.
const Match = (props) => {
  useEffect(() => {
    axios.get('./api/rooms')
  .then((res) => {
    props.getRooms(res.data);
  })
  },[])

  return (
    <Fragment>
    {props.rooms &&
    <Popup
    trigger={<button className="button"> Match </button>}
    modal
    nested
    >
    {close => (
      <div className="modal">
        <button
        className = "arrow_button"
        onClick = {() => {
          if(props.matchIndex === 0) {
            props.nextMatch((props.rooms.length - 1))
          }
          else {
          props.nextMatch(-1)
          }
        }}>Previous &laquo;</button>
      <p>{props.matchIndex + 1}/{props.rooms.length}</p>
      <button
        className = "arrow_button"
        onClick = {() => {
          if(props.matchIndex + 1 === props.rooms.length) {
            props.nextMatch(-(props.matchIndex))
          }
          else {
          props.nextMatch(1)
          }
        }}>Next &raquo;</button>

        <h1><div className="header"> {props.rooms[props.matchIndex].address}
         </div></h1>
         
        <div className="content">
          {' '}
        <span>{roomData[1].pricePerMonth}</span>
        <hr/>
        <div className="slide-container">
        <Zoom scale={0.4}>
          {
            props.rooms[props.matchIndex].photos.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
          }
        </Zoom>
      </div>
        <h4>{props.rooms[props.matchIndex].description}</h4>
        <p>{props.rooms[props.matchIndex].posted_date}</p>
        </div>
        <button
            className="contents_button"
            onClick={() => {
              close();
            }}
          >
            Close
          </button>
          <button
            className="contents_button"
            onClick={() => {
              saveToList(props.rooms[props.matchIndex].id, props.loggedInUser.id)
              .catch((err) => {
                alert('The item is already in your list')
              })
            }}
          >
            Save
          </button>
        </div>
    )}
  </Popup>
}
  </Fragment>
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(Match);
