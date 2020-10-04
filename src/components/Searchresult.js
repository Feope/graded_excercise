import React from 'react'

export default function Searchresult(props) {
    return (
        <div>
            <div className="searchview" onClick={() => props.handleClick(props.id, props.name, props.price)}>
                    name:"{props.name}"  <br/>
                    type:"{props.type}" 
                    status:"{props.status}" 
                    price:"{props.price}" <br/><br/>
            </div>

        </div>
    )
}