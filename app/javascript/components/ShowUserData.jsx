import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { NavLink } from "react-router-dom";

const ShowUserData = (props) => {
  return (
      <div className = "page-display page-centered">
          <div className = "user-username page-title">{props.userData.username}</div>
          <div>
              {props.userData.user_image ? 
              <div>
                  <img className = "user-img" src = {props.userData.user_image.url} width = {350} height = {300} />
              </div> 
              :
              <div className = "user-placeholder-img">
                <FontAwesomeIcon icon = {faUserCircle} size = "6x"/>
              </div>
              }
          </div>
          <div className = "user-bio">{props.userData.bio}</div>
          {props.userActivity ? 
          <div className = "user-activity">Has sent recent messages in <NavLink to={`/server/${props.userActivity.id}`}>{props.userActivity.name}</NavLink></div> 
          : 
          <div className = "user-activity">This user has no recent activity</div>}
      </div>
  )
}


export default ShowUserData;