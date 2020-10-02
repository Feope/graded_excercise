import React from 'react'

import SearchResult from './Searchresult';

export default function Searchview(props) {
    return (
        <div>
            <div>
            {
                props.content.map(content => <SearchResult key={content.id} {...content} />)
            }
            </div>
        </div>
    )
}