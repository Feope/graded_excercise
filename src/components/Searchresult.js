import React from 'react'

export default function Searchresult(props) {
    return (
        <div>
            <div className="searchview">
                    name:"{props.name}"  <br/>
                    type:"{props.type}" 
                    status:"{props.status}" 
                    price:"{props.price}" <br/><br/>
            </div>

        </div>
    )
}