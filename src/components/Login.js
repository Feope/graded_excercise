import React from 'react'

export default function Login(props) {

    function log(){
        alert("Username is \"user\", Password is \"password\"");
    }
    
    return (
        <div className="loginWindow">
            <div>
                <div onClick={() => log()} className="loginHint">?</div>
                <p>Username <input type="text" value={props.user} onInput={props.updateUser} /></p>
                <p>Password <input type="password" value={props.password} onInput={props.updatePassword} /></p>
            </div>
        </div>
    )
}
