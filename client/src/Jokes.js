import React from 'react';
import axios from 'axios';
import withAuth from './auth'

class Jokes extends React.Component {
    state = {
        jokes: [],
    }
    
    
    async componentDidMount() {
        try {
            const result = await axios.get('https://icanhazdadjoke.com/search');

            this.setState({
                jokes: result.data
            })
        } catch (err) {
           // if (err.response.status === 401 || err.response.status === 403) {
           //     this.props.history.push('./login');
           // }
            console.error(err);
        }
    }
    render() {
        return (
            <>
                <h3> Jokes </h3>

                <ul>
                    {this.state.jokes.map((joke, i) => {
                        return <li key={i}>{joke.joke}</li>
                    })}
                </ul>
            </>    
        )
    }
}

export default withAuth(Jokes)