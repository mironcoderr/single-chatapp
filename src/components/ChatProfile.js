import React from "react";

const ChatProfile = (props) => {
    return (
        <>
            <div className="chat-profile">
                <img className="chat-profile-img" src={props.useravatar} alt="user" />
                <h3 className="fs-5">{props.username}</h3>
                <h4 className="fs-6">{props.useremail}</h4>
            </div>
        </>
    )
}

export default ChatProfile