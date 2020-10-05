import React from 'react'

export default function Account(props) {
    return (
        <div className="accountWindow" >
            <div>
                Account history <br/><br/>
            </div>
            <div>
            { props.history.map((item, id) =>
                <div key={id}>
                    Name:"{item.name}"  <br/>
                    Total price:"{item.currentPrice} cents" 
                    Price per minute:"{item.price} cents" <br/><br/>
                </div>)}
            </div>
        </div>
        
    )
}
