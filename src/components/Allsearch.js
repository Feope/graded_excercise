import React from 'react'

export default function Allsearch(props) {
    const handleClick = (id) => {
        console.log('Click happened' + id);
      }

    return (
        <div>
            <div className="searchview">
                { props.content.map((item, id) =>
                <div key={id} onClick={() => handleClick(id)}>
                    name:"{item.name}"  <br/>
                    type:"{item.type}" 
                    status:"{item.status}" 
                    price:"{item.price}" <br/><br/>
                </div>)}
            </div>

        </div>
    )
}
