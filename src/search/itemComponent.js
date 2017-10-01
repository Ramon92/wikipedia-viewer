import React from 'react';

import './item.css';

export default function Item({children, page, title, extract}) {
    return (
        <a href={page} target="_blank">
            <li className="item">
                <h2>{title}</h2>
                <p>{extract}</p>
            </li>
        </a>
    )
}