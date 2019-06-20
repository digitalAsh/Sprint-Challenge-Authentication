import React from 'react';
import api from './helpers/api';

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const result = await api.post('/register', {
                username: this.state.username,
                password: this.state.password,
            })
        console.log(result);
        } catch (err) {
            console.error(err);
        }
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
        })
    }
    
    render() {
        return (
            <>
                <h3> Signup </h3>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type='text' name='fullname' placeholder='Full Name' onChange=
                    {this.handleChange} value={this.state.fullname} /> */}
                    <input type='text' name='username' placeholder='Username' onChange=
                    {this.handleChange} value={this.state.username} />
                    <input type='password' name='password' placeholder='Password' onChange=
                    {this.handleChange} value={this.state.password} />
                    <button type='submit'>Register</button>
                </form>
            </>    
        )
    }
}

export default Signup