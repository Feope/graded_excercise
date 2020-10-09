import React from 'react'

export default function LoginButton(props) {
    return (
        <div>
            <button onClick={ props.login }>{props.logState}</button> 
        </div>
    )
}
