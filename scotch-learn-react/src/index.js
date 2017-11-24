import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    incrementCount() {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <div>
              <h1>Hello, {this.props.name}!</h1>
              <h2>{this.state.count}</h2>
              <button type="button" onClick={() => this.incrementCount()}>Increment Count</button>
            </div>
        );
    }
}

ReactDOM.render(
    <MyComponent name={'Matt'} />,
    document.getElementById('myDiv')
);
