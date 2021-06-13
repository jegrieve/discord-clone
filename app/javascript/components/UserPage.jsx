import React, {useEffect, useState} from "react";

const UserPage = (props) => {
    const [userData, setUserData] = useState(null);
  // ability to set bio/avatar
  //ability to see a bio/avatar of other users
  //a component to see some recent activity
  //also ability to delete account
    useEffect(() => {
        const id = props.match.params.id
        const url = `/api/v1/users/show/${id}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            console.log(response)
            setUserData(response)
        })
          .catch(() => console.log("error"));
      }, []);

  return (
      <div className = "page-display userpage">
          {userData ? 
            <div>
              <div>
                {userData.username}
              </div>
              <div>
                FontAwesomeUserIconPlaceholder
              </div>
              <div>
                Bio goes here
              </div>
              <div>
                RecentActivity
              </div>
            </div> : <div>Oops, something went wrong. User does not exist.</div>}
      </div>
  )
}


export default UserPage;