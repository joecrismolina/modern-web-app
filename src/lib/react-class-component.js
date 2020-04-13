import React, { Component } from 'react';
import ReactFuncComp from './react-function-component';

export default class ReactClassComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleChange = (e) => {
        this.setState({name: e.target.value});
    }

    render() {
        return (
            <>
                <ReactFuncComp name={this.state.name} />
                <br/>
                <br/>
                <p>What's your name?</p>
                <input value={this.state.name} onChange={this.handleChange} />
            </>
        );
    }
}