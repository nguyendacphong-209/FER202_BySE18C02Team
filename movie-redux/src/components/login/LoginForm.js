import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import "./Login.scss";


const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:5001/UserAccounts");
            const users = response.data;

            const user = users.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                alert(`Welcome, ${user.username}! Login Successful!`);
                navigate("/"); // Chuyển hướng đến trang quản lý sản phẩm
            } else {
                setError("Invalid username or password!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className="login-page">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="login-card p-4 shadow-lg">
                    <Card.Body>
                        <h2 className="text-center">Login</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3 w-100">
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginForm;
