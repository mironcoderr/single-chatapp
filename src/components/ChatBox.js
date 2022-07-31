import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { SendFill, CollectionFill, TrashFill } from 'react-bootstrap-icons';
import { getDatabase, ref, set, onValue, push, remove } from "firebase/database";


const ChatContainer = styled.div`
        height: calc(100vh - 80px);
        background-color: #efefef;
    `;
    
const ChatInbox = styled.div`
        margin: 20px 0px;
        padding: 0px 20px;
        display: flex;
        flex-direction: column-reverse;
        height: calc(100vh - 180px);
        overflow-y: auto;
    `;

const ChatList = styled.ul`
        list-style: none;
        margin-bottom: 0px;
        padding-left: 0px;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    `;

const ChatItem = styled.li`
        display: flex;
        column-gap: 8px;
        align-items: flex-start;

        ${(props) => props.partner ? css`
            flex-direction: row-reverse;
            ${ChatContent} { background: #ccddee; }
        ` : css``}
    `;

const ChatContent = styled.div`
        padding: 12px;
        border-radius: 12px;
        background: #fff;
        width: fit-content;
        max-width: 70%;
    `;

const ChatDelete = styled.button`
        border: none;
        outline: none;
        background: none;
        font-size: 16px;
        color: #888888;
        transition: .3s;

        &:hover {
            color: #ff2626;
        }
    `;

const UserName = styled.h3`
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        margin-bottom: 5px;
    `;

const UserText = styled.p`
        margin-bottom: 0px;
        font-size: 15px;
    `;

const ChatForm = styled.form`
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 15px;
        margin: 0px 20px;
    `;

const ChatInput = styled.input`
        width: 100%;
        height: 45px;
        border: none;
        flex-shrink: 5;
        padding: 0px 20px;
        box-sizing: border-box;
        border-radius: 50px;
        background: #ffffff;
        box-shadow: 0px 10px 15px 0px #0000000d;

        ::placeholder { 
            font-size: 14px;
        }

        :focus-visible {
            outline: none;
        }
    `;

const ChatIcon = styled.button`
        width: 45px;
        height: 45px;
        font-size: 15px;
        line-height: 15px;
        border-radius: 50%; 
        text-align: center;
        border: none;
        outline: none;
        color: #444;
        background: #fff;
        box-shadow: 0px 10px 15px 0px #0000000d;
        transition: .3s;

        &:hover {
            color: #fff;
            background: #0a58ca;
        }
    `;

const ChatBox = () => {

    const db = getDatabase();
    let [message, setMessage] = useState('');
    let [userMessage, setUserMessage] = useState([]);
    let [sendButton, setSendButton] = useState(false);

    let handleChatInput = (event) => setMessage(event.target.value);
    let handleSendButton = (event)=> {
        event.preventDefault();
        if(message) {
            set(push(ref(db, 'messages/')), {
                msg: message,
            });
        }
        setSendButton(!sendButton);
        setMessage('');
    }
    let handleDeleteMessage = (messageKey)=> {
        const messageRef = ref(db, `messages/${messageKey}`);
        remove(messageRef);
        setSendButton(!sendButton);
    }

    useEffect(()=> {
        const db = getDatabase();
        const messageRef = ref(db, 'messages/');
        const messageArr = [];
        onValue(messageRef, (snapshot) => {
            snapshot.forEach((data)=> {
                let dataObject = {
                    msg: data.val().msg,
                    key: data.key,
                }
                messageArr.push(dataObject);
            });
            setUserMessage(messageArr);
        });
    },[sendButton]);

    return (
        <>
            <ChatContainer >
                <ChatInbox>
                    <ChatList>
                        {userMessage.map((item)=> {
                            return (
                                <>
                                    {item.msg ?
                                        <ChatItem>
                                            <ChatContent>
                                                <UserName>Miron Mahmud</UserName>
                                                <UserText>{item.msg}</UserText>
                                            </ChatContent>
                                            <ChatDelete onClick={()=>handleDeleteMessage(item.key)} type="button"><TrashFill/></ChatDelete>
                                        </ChatItem>
                                    :
                                    ""
                                    }
                                </>
                            )
                        })}
                    </ChatList>
                </ChatInbox>
                <ChatForm>
                    <ChatInput onChange={handleChatInput} value={message} type="text" placeholder="Write your message" />
                    <ChatIcon onClick={handleSendButton} type="submit"><SendFill /></ChatIcon>
                    <ChatIcon type="submit"><CollectionFill /></ChatIcon>
                </ChatForm>
            </ChatContainer>
        </>
    )
}

export default ChatBox;