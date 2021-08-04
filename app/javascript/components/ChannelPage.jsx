import React, {useState, useEffect} from "react";
import MessageFeed from "./MessageFeed";
import CreateMessage from "./CreateMessage";

const ChannelPage = (props) => {
    const [channelMessages, setChannelMessages] = useState(null);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [messageLimit, setMessageLimit] = useState(10);

    useEffect(() => {
      getChannelMessages(); 
    }, [messageLimit])

    useEffect(() => {
      if (!currentChannel || Number(props.match.params.id) !== currentChannel.id) {
          getCurrentChannel();
      }
    })

    useEffect(() => { 
      return (() => {
        props.setCurrentChannel(null)
      })
    },[])

    useEffect(() => {
      if (currentChannel) {
        props.setCurrentChannel(currentChannel)
      }
    }, [currentChannel])

    useEffect(() => {
      if (currentChannel) {
        getChannelMessages();
      }
    }, [currentChannel])

    useEffect(() => {
      if (!props.currentServer && currentChannel) {
        getChannelFeed();
      }
    })

    useEffect(() => {
      window.scrollTo(0,document.body.scrollHeight); //so the problem here is this is fine.. but when loadmore is clicked go up instead...
    }, [channelMessages])
    //so im thinking only when u create/edit/delete emssages u make it pop down/ on first messagepage load/channel change
    //but then when u click load more dont do it.

    // this will keep refreshing messagefeed for new messages
    // useEffect(() => {
    //     const refresher = setTimeout(() => {
    //         getChannelMessages();
    //       }, 15000);
    //       return () => clearTimeout(refresher);
    // })

    const getChannelFeed = () => {
      props.setCurrentServer(currentChannel.server)
    }

    const loadMoreMessages = () => {
      setMessageLimit(messageLimit + 10);
    }

    const getCurrentChannel = () => {
      const id = props.match.params.id
      const url = `/api/v1/channels/show/${id}`;
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => {
          setCurrentChannel(response)
        }
          )
        .catch((error) => console.log(error.message));
    }

    const getChannelMessages = () => {
        const id = props.match.params.id
        const url = `/api/v1/messages/index?channel_id=${id}&limit=${messageLimit}`;
    
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            console.log(response)
            setChannelMessages(response)
          }
            )
          .catch((error) => console.log(error.message));
      }
    
  return (
      <div>
          {/* put the channelpage data here plus the messagefeed and create message*/}
          {/* so i need to load messagefeed with createmessage at the sametime cause im getting
          a weird looking page where the createmessage stuff loads before the messagefeed then its normal */}
          <div className = "load-more-messages-btn">
            <button className = "btn btn-secondary" onClick = {loadMoreMessages}>Load More</button>
          </div>
          {channelMessages ? <MessageFeed currentUser= {props.currentUser} getChannelMessages = {getChannelMessages} channelMessageData = {channelMessages} /> : false }
          {currentChannel ? <CreateMessage messageLimit = {messageLimit} setMessageLimit = {setMessageLimit} channelId = {currentChannel.id} getChannelMessages = {getChannelMessages} /> : false}
      </div>
  )
}

export default ChannelPage;