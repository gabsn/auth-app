import React, { Component } from 'react'
import { Text, TextInput } from 'react-native'
import { Card, CardSection, Button, Input, Spinner } from './common'
import firebase from 'firebase'

class LoginForm extends Component {
    state = { email: '', password: '', error: '' , loading: false }

    onButtonPress() {
        const { email, password } = this.state

        this.setState({ error: '', loading: true })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this))
            })
    }

    onLoginFail() {
        this.setState({
            loading: false,
            error: 'Authentication failed.',
        })
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: '',
        })
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small' />
        } else {
            return (
                <Button onPress={this.onButtonPress.bind(this)}>
                    Login
                </Button>
            )
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        placeholder="password"
                        label="Password"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center',
    }
}

export default LoginForm
