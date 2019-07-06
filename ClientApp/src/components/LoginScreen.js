import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';

const style = {
    margin: 15,
};

class Loginscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginscreen: [],
            loginmessage: '',
            isLogin: true
        }
    }
    componentWillMount() {
        var loginscreen = [];
        loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} key={"LoginScreen"} />);
        var loginmessage = "";
        this.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage
        })
    }
    handleClick(event) {
        var loginmessage;
        if (this.state.isLogin) {
            let loginscreen = [];
            let loginButtons = [];
            loginButtons.push(
                <div key="login-button">
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={"Login"} primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        </div>
                    </MuiThemeProvider>
                </div>
            )
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                loginButtons: loginButtons,
                isLogin: false
            })
        }
    }
    render() {
        return (
            <div className="loginscreen" key="loginscreen">
                {this.state.loginscreen}
                <div>
                    {this.state.loginmessage}
                    {this.state.loginButtons}
                </div>
            </div>
        );
    }
}

export default Loginscreen;