import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            access: username, 
            secret: password
        };

        fetch("https://edgars-movie-api.onrender.com/login", {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    onLoggedIn(data.user, data.token);
            } else {
                alert("login failed");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};