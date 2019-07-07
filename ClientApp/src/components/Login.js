import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
var apiBaseUrl = "http://localhost:5000/api/";
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
            axios({
                baseURL: apiBaseUrl,
                url: 'Auth/login',
                method: 'post',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    "Content-Type": "application/json"
                },
                data: {
                    "username": this.state.username,
                    "password": this.state.password
                }
            }).then(function (response) {
                if (response.status === 200) {
                    alert("Login realizado com sucesso\nUserid:"
                        + response.data.id + "\nToken:" + response.data.token);
                }
            }).catch(function (error) {
                if (error.response.status === 400) {
                    alert(error.response.data.message)
                }
                else {
                    alert("Erro ao realizar o login. Tente novamente mais tarde");
                }
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
                            onChange={(event, newValue) => {
                                event.persist();
                                this.setState({
                                    username: newValue
                                });
                            }} />
                        <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                        <br />
                        <TextField
                            type="password"
                            hintText="Digite sua senha"
                            floatingLabelText="Senha"
                            onChange={(event, newValue) => {
                                event.persist();
                                this.setState({
                                    password: newValue
                                });
                            }} />
                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                        <br />
                        <RaisedButton label="Entrar" primary={true} style={style} onClick={() => this.handleClick()} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;