import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
} from '@mui/material';

// Locally defined credentials
const ADMIN_LOGIN = 'logistics@admin.com';
const ADMIN_PASSWORD = 'Logistics123@#';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/admin';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Enter username and password');
            return;
        }

        // Logic to check against local constants
        if (username === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
            // Generate a token that matches the ProtectedRoute logic
            const token = btoa(`${ADMIN_LOGIN}:${ADMIN_PASSWORD}`);
            localStorage.setItem('token', token);

            setError('');
            navigate(from, { replace: true });
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-dark)',
                px: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 3, sm: 5 },
                    width: '100%',
                    maxWidth: 420,
                    borderLeft: '5px solid var(--color-primary)',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: 'var(--color-dark)',
                        mb: 1,
                    }}
                >
                    Admin <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Login</span>
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-mid)', mb: 3 }}>
                    Sign in to access the admin panel.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 1,
                            py: 1.4,
                            background: 'var(--color-primary)',
                            color: '#fff', // Changed to white for better contrast on the new blue primary
                            fontWeight: 700,
                            letterSpacing: 1,
                            '&:hover': { background: 'var(--color-dark)' },
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;