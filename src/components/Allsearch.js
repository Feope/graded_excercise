import React from 'react'

export default function Allsearch(props) {
    return (
        <div>
            <div className="searchview">
                { props.content.map((item, id) =>
                <div key={id} onClick={() => props.handleClick(item.id, item.name, item.price, item.status)}>
                    name:"{item.name}"  <br/>
                    type:"{item.type}" 
                    status:"{item.status}" 
                    price:"{item.price}" <br/><br/>
                </div>)}
            </div>

        </div>
    )
}
