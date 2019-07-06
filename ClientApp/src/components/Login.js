import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
var apiBaseUrl = "http://localhost:4000/api/";
import axios from 'axios';

const style = {
    margin: 15,
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {},
        }
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        if (this.state.username === "") {
            formIsValid = false;
            errors["username"] = "campo obrigatorio";
        }
        if (this.state.password === "") {
            formIsValid = false;
            errors["password"] = "campo obrigatorio";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleClick() {
        if (this.handleValidation()) {
            var payload = {
                "username": this.state.username,
                "password": this.state.password,
            }

            axios.post(apiBaseUrl + 'login', payload)
                .then(function (response) {
                    console.log(response);
                    if (response.data.code === 200) {
                        console.log("Login successfull");
                    }
                    else if (response.data.code === 204) {
                        console.log("Username password do not match");
                        alert(response.data.success)
                    }
                    else {
                        console.log("Username does not exists");
                        alert("Username does not exist");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider key={"theme"}>
                    <div>
                        <TextField
                            hintText="Digite seu nome de usuario"
                            floatingLabelText="Usuario"
                            onChange={(newValue) => this.setState({ username: newValue })}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                        <br />
                        <TextField
                            type="password"
                            hintText="Digite sua senha"
                            floatingLabelText="Senha"
                            onChange={(newValue) => this.setState({ password: newValue })}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                        <br />
                        <RaisedButton label="Entrar" primary={true} style={style} onClick={() => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;