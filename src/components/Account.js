import React from 'react'

export default function Account(props) {
    return (
        <div className="accountWindow" >
            <div>
                Account info
            </div>
            <div>
                { props.info.map((item, id) =>
                <div key={id}>
                    {item.name}
                </div>)}
            </div>
        </div>
        
    )
}
