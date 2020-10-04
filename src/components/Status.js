import React from 'react'

export default function Status(props) {  
    return (
        <div className="statusWindow">
                { props.charger.map((item, id) =>
                <div key={id}>
                    Name:"{item.name}"  <br/>
                    <br/>
                Price:"{ Math.round(item.currentPrice)} cents" Time charging:"{props.time} seconds" <br/>
                </div>)}
                <button onClick={() => props.timer()}> Start </button>
        </div>
    )
}
