import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';

class Input extends React.Component {
    render() {
        return (
            <div className="input">
                <input
                    id={this.props.name}
                    autoComplete="false"
                    required
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                />
                <label htmlFor={this.props.name}></label>
            </div>
        );
    }
}

class Modal extends React.Component {
    render() {
        return (
            <div className="modal">
                <form
                    onSubmit={this.props.onSubmit}
                    className="modal-form">
                        <Input
                            name="name"
                            type="text"
                            placeholder="John Doe" />
                        <Input
                            name="email"
                            type="email"
                            placeholder="jdoe@example.com" />
                        <Input
                            name="password"
                            type="password"
                            placeholder="password" />
                        <button>Log In</button>
                </form>
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            mounted: false,
        };
    }

    // Gets called right after the component has been rendered to the page.
    componentDidMount() {
        this.setState({
            mounted: true,
        })
    }

    handleSubmit(e) {
        this.setState({
            mounted: false,
        });
        e.preventDefault();
    }

    render() {
        let child;
        if (this.state.mounted) {
            child = (<Modal onSubmit={(e) => this.handleSubmit(e)} />);
        }
        return (
            <div className="app">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}>
                        {child}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default App;
