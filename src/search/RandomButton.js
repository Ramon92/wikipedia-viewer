import React from 'react';
import './random.css';

export function RandomButton(props) {
    const {toRandomArticle} = props;
    return (
        <button className="random" onClick={toRandomArticle}>Random Article</button>
    );
}