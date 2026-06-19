import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    CircularProgress,
    Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const API_URL = 'https://midnight-sec-back.onrender.com/api/products/';

const emptyForm = { name: '', description: '', image: '' };

const AdminPanel = () => {
    const navigate = useNavigate();
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [snack, setSnack] = useState({ open: false, msg: '', sev: 'success' });

    const showSnack = (msg, sev = 'success') => setSnack({ open: true, msg, sev });

    const fetchTrucks = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setTrucks(Array.isArray(data) ? data : []);
        } catch {
            showSnack('Failed to load trucks', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrucks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyForm);
        setDialogOpen(true);
    };

    const openEdit = (truck) => {
        setEditingId(truck._id);
        setForm({
            name: truck.name || '',
            description: truck.description || '',
            image: truck.image || '',
        });
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const buildPayload = () => ({
        name: form.name,
        description: form.description,
        image: form.image,
        category: null,
        price: '',
        kvt: '',
    });

    const handleSubmit = async () => {
        if (!form.name.trim()) {
            showSnack('Name is required', 'warning');
            return;
        }

        const isEdit = Boolean(editingId);
        const url = isEdit ? `${API_URL}${editingId}` : API_URL;
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildPayload()),
            });
            if (!res.ok) throw new Error('Request failed');
            showSnack(isEdit ? 'Truck updated' : 'Truck created');
            closeDialog();
            fetchTrucks();
        } catch {
            showSnack(isEdit ? 'Update failed' : 'Create failed', 'error');
        }
    };

    const handleDelete = async (truck) => {
        if (!window.confirm(`Delete "${truck.name}"? This cannot be undone.`)) return;
        try {
            const res = await fetch(`${API_URL}${truck._id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            showSnack('Truck deleted');
            fetchTrucks();
        } catch {
            showSnack('Delete failed', 'error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, background: 'var(--color-highlight)', minHeight: '100vh' }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
                sx={{ mb: 3 }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            color: 'var(--color-dark)',
                        }}
                    >
                        Admin <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Panel</span>
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--color-mid)' }}>
                        Manage trucks and fleet inventory.
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={openCreate}
                        sx={{
                            background: 'var(--color-dark)',
                            color: 'var(--color-primary-dark)',
                            fontWeight: 700,
                            '&:hover': { background: 'var(--color-primary-dark)',color: 'var(--color-dark)' },
                        }}
                    >
                        New Truck
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            borderColor: 'var(--color-dark)',
                            color: 'var(--color-dark)',
                            '&:hover': { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' },
                        }}
                    >
                        Logout
                    </Button>
                </Stack>
            </Stack>

            <Paper sx={{ borderLeft: '5px solid var(--color-primary)' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                        <CircularProgress sx={{ color: 'var(--color-primary)' }} />
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: 'var(--color-dark)' }}>
                                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Image</TableCell>
                                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Name</TableCell>
                                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Description</TableCell>
                                    <TableCell sx={{ color: '#fff', fontWeight: 700 }} align="right">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {trucks.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'var(--color-mid)' }}>
                                            No trucks yet. Click "New Truck" to add one.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    trucks.map((truck) => (
                                        <TableRow key={truck._id} hover>
                                            <TableCell>
                                                {truck.image ? (
                                                    <Box
                                                        component="img"
                                                        src={truck.image}
                                                        alt={truck.name}
                                                        sx={{
                                                            width: 70,
                                                            height: 50,
                                                            objectFit: 'cover',
                                                            borderRadius: 1,
                                                        }}
                                                    />
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            width: 70,
                                                            height: 50,
                                                            background: 'var(--color-light)',
                                                            borderRadius: 1,
                                                        }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>{truck.name}</TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: 360,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: 'var(--color-mid)',
                                                }}
                                            >
                                                {truck.description}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => openEdit(truck)} aria-label="edit">
                                                    <EditIcon sx={{ color: 'var(--color-dark)' }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(truck)} aria-label="delete">
                                                    <DeleteIcon sx={{ color: '#c0392b' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle
                    sx={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                    }}
                >
                    {editingId ? 'Edit Truck' : 'New Truck'}
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Name"
                            value={form.name}
                            onChange={handleChange('name')}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Description"
                            value={form.description}
                            onChange={handleChange('description')}
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Image URL"
                            value={form.image}
                            onChange={handleChange('image')}
                            fullWidth
                            placeholder="https://..."
                        />
                        {form.image && (
                            <Box
                                component="img"
                                src={form.image}
                                alt="preview"
                                sx={{
                                    width: '100%',
                                    maxHeight: 200,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    border: '1px solid var(--color-light)',
                                }}
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={closeDialog} sx={{ color: 'var(--color-mid)' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            background: 'var(--color-primary)',
                            color: 'var(--color-dark)',
                            fontWeight: 700,
                            '&:hover': { background: 'var(--color-primary-dark)' },
                        }}
                    >
                        {editingId ? 'Save Changes' : 'Create Truck'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snack.open}
                autoHideDuration={3500}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    severity={snack.sev}
                    variant="filled"
                    onClose={() => setSnack((s) => ({ ...s, open: false }))}
                >
                    {snack.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AdminPanel;
