import React from "react";
import { ListGroup } from "react-bootstrap";
import moment from "moment";

const ChatUsers = (props) => {
    return (
        <>
            <div className="chat-users">
                <ListGroup>
                    <ListGroup.Item>
                        <img className="chat-users-img" src={props.useravatar} alt="user" />
                        <span className="chat-users-meta">{moment().startOf('hour', props.userlastlogin).fromNow()}</span>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </>
    )
}

export default ChatUsers