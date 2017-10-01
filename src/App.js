import React, {Component} from 'react';
import './App.css';
import {RandomButton} from './search/RandomButton';
import Item from './search/itemComponent';
import _ from 'lodash';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            results: []
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        this.getArticles = this
            .getArticles
            .bind(this);

    }

    toRandomArticle() {
        console.log('clicekd random');
        window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
    }

    getArticles() {
        const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=${this.state.keyword}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.query) {
                    let res = _
                        .chain(data.query.pages)
                        .mapValues(item => ({...item, page: `https://en.wikipedia.org/?curid=${item.pageid}`}))
                        .values(data.query.pages)
                        .value();
                    console.log(res);
                    this.setState({results: res});
                } else {
                    this.setState({results: [{
                        title: 'no results',
                        index: 1
                    }]})
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(event) {
        this.setState({keyword: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getArticles();
    }

    renderItems(item, i) {
        return <Item key={item.index} res={item} {...item}>{item.title}</Item>;
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Wikipedia viewer</h2>
                </div>
                <RandomButton toRandomArticle={this.toRandomArticle}/>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input className="App__searchBox" value={this.state.keyword} onChange={this.handleChange}/>
                    </form>
                </div>
                <ul className="App__list">
                    {this.state.results.map(this.renderItems)}
                </ul>
            </div>
        );
    }
}

export default App;
