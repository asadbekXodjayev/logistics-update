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

    // ── Shared button styling — mirrors the site's two-button system ──
    const primaryBtnSx = {
        background: 'var(--color-dark)',
        color: '#fff',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        borderRadius: '2px',
        border: '2px solid var(--color-dark)',
        boxShadow: 'none',
        px: 2.5,
        '&:hover': {
            background: '#fff',
            color: 'var(--color-dark)',
            borderColor: 'var(--color-dark)',
            boxShadow: 'none',
        },
    };
    const onDarkBtnSx = {
        background: 'transparent',
        color: '#fff',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        borderRadius: '2px',
        border: '2px solid rgba(255,255,255,0.45)',
        '&:hover': {
            background: '#fff',
            color: 'var(--color-dark)',
            borderColor: '#fff',
        },
    };

    return (
        <Box sx={{ background: 'var(--color-light)', minHeight: '100vh', pb: 6 }}>
            {/* ── Branded header band ───────────────────────────── */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-3) 100%)',
                    borderLeft: '5px solid var(--color-primary)',
                    px: { xs: 3, md: 6 },
                    py: { xs: 4, md: 5 },
                }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={2}
                    sx={{ maxWidth: 1280, mx: 'auto', width: '100%' }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                color: 'var(--color-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                mb: 1,
                            }}
                        >
                            <Box component="span" sx={{ width: 26, height: 2, background: 'var(--color-primary)' }} />
                            Dashboard
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                color: '#fff',
                                lineHeight: 1.05,
                            }}
                        >
                            Fleet <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Manager</span>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
                            Add, edit, and remove trucks shown on the public site.
                        </Typography>
                    </Box>
                    <Button startIcon={<LogoutIcon />} onClick={handleLogout} sx={onDarkBtnSx}>
                        Logout
                    </Button>
                </Stack>
            </Box>

            {/* ── Toolbar: count + new ───────────────────────────── */}
            <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 3, md: 6 }, mt: { xs: 3, md: 4 } }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 2 }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            color: 'var(--color-dark)',
                            fontSize: '1.1rem',
                            letterSpacing: '0.04em',
                        }}
                    >
                        Trucks
                        <Box
                            component="span"
                            sx={{
                                ml: 1.5, px: 1.2, py: 0.2,
                                background: 'var(--color-primary)', color: '#fff',
                                borderRadius: '2px', fontSize: '0.8rem',
                            }}
                        >
                            {trucks.length}
                        </Box>
                    </Typography>
                    <Button startIcon={<AddIcon />} onClick={openCreate} sx={primaryBtnSx}>
                        New Truck
                    </Button>
                </Stack>

                <Paper elevation={0} sx={{ borderLeft: '4px solid var(--color-primary)', border: '1px solid rgba(0,31,63,0.08)' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: 'var(--color-dark)' }}>
                                        {['Image', 'Name', 'Description', 'Actions'].map((h, i) => (
                                            <TableCell
                                                key={h}
                                                align={i === 3 ? 'right' : 'left'}
                                                sx={{
                                                    color: '#fff',
                                                    fontFamily: 'var(--font-display)',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    fontSize: '0.78rem',
                                                    borderBottom: 'none',
                                                }}
                                            >
                                                {h}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {trucks.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center" sx={{ py: 6, color: 'var(--color-mid)' }}>
                                                No trucks yet — click <strong>New Truck</strong> to add the first one.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        trucks.map((truck) => (
                                            <TableRow
                                                key={truck._id}
                                                hover
                                                sx={{ '&:last-child td': { borderBottom: 0 } }}
                                            >
                                                <TableCell>
                                                    {truck.image ? (
                                                        <Box
                                                            component="img"
                                                            src={truck.image}
                                                            alt={truck.name}
                                                            sx={{
                                                                width: 76, height: 54, objectFit: 'cover',
                                                                borderRadius: '2px',
                                                                border: '1px solid rgba(0,31,63,0.1)',
                                                            }}
                                                        />
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                width: 76, height: 54,
                                                                background: 'var(--color-light)',
                                                                borderRadius: '2px',
                                                            }}
                                                        />
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontFamily: 'var(--font-display)',
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase',
                                                        color: 'var(--color-dark)',
                                                    }}
                                                >
                                                    {truck.name}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        maxWidth: 360,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        color: 'var(--text-on-light-muted)',
                                                    }}
                                                >
                                                    {truck.description}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => openEdit(truck)} aria-label="edit" size="small">
                                                        <EditIcon sx={{ color: 'var(--color-primary)' }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDelete(truck)} aria-label="delete" size="small">
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
            </Box>

            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                fullWidth
                maxWidth="sm"
                PaperProps={{ sx: { borderTop: '4px solid var(--color-primary)', borderRadius: '2px' } }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: 'var(--color-dark)',
                    }}
                >
                    {editingId ? <>Edit <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Truck</span></>
                        : <>New <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Truck</span></>}
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
                    <Button
                        onClick={closeDialog}
                        sx={{
                            color: 'var(--color-mid)',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} sx={primaryBtnSx}>
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
