import React from "react";
import { NavLink } from "react-router-dom";
const Channel = (props) => {

  return (
      <div>
        <NavLink to = {`/channel/${props.data.id}`}>
            go to specific channel
        </NavLink>
        channel
      </div>
  )
}

export default Channel;