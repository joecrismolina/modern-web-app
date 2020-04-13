import React from 'react';

const ReactFuncComp = (props) => {
    return (
        <>
            <h1>A React Application</h1>
            <p>without using create-react-app</p>
            <br />
            <p>Hello, {props.name || 'World'}!</p>
        </>
    );
}

export default ReactFuncComp;