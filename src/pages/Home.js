import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ChatBox from "../components/ChatBox";
import ChatUsers from "../components/ChatUsers";
import ChatProfile from "../components/ChatProfile";


const Home = () => {

    let auth = getAuth();
    let navigate = useNavigate();
    let [userName, setUserName] = useState('');
    let [userEmail, setUserEmail] = useState('');
    let [userAvatar, setUserAvatar] = useState('');
    let [userLastLogin, setUserLastLogin] = useState('');
    let [emailVerify, setEmailVerify] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                setEmailVerify(true);
                setUserEmail(user.email);
                setUserName(user.displayName);
                setUserAvatar(user.photoURL);
                setUserLastLogin(user.metadata.lastLoginAt);
            }
        }
        else navigate('/login', { state: 'Please login here!' });
    });

    return (
        <>
            {emailVerify
                ?
                <div className="chat-main d-grid gap-4">
                    <ChatProfile useravatar={userAvatar} username={userName} useremail={userEmail} />
                    <ChatBox />
                    <ChatUsers useravatar={userAvatar} userlastlogin={userLastLogin} />
                </div>
                :
                <h1 className="fw-bold fs-2 mb-2 text-center">Please verify this email</h1>
            }
        </>
    )
}

export default Home