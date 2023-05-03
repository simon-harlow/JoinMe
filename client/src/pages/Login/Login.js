import { useState } from 'react';
import './Login.scss';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: implement login logic
    };

    return (
        <div className="login-page">
            <div className="modal">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </form>
                <button type="submit">Login with Strava</button>
            </div>
        </div>
    );
}

export default Login;