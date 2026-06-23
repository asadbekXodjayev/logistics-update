import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateUS } from '../../lib/date';
import './AdminPanel.css';

const API_URL = 'https://midnight-sec-back.onrender.com/api/products/';

const emptyForm = { name: '', description: '', image: '' };

/* ── Inline icons (kept local so the admin carries no icon dep) ── */
const Icon = {
    search: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
    ),
    plus: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14" /></svg>
    ),
    edit: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
    ),
    trash: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
    ),
    logout: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></svg>
    ),
    close: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
    ),
    truck: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 17h4V5H2v12h3" /><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>
    ),
    inbox: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" /></svg>
    ),
    alert: (p) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /><path d="M12 9v4M12 17h.01" /></svg>
    ),
};

const AdminPanel = () => {
    const navigate = useNavigate();
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [query, setQuery] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null); // { msg, sev }

    const nameRef = useRef(null);
    const modalRef = useRef(null);
    const lastTriggerRef = useRef(null);

    const showToast = (msg, sev = 'success') => setToast({ msg, sev });

    const fetchTrucks = async () => {
        setLoading(true);
        setLoadError(false);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setTrucks(Array.isArray(data) ? data : []);
        } catch {
            setLoadError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrucks();
    }, []);

    // Toast auto-dismiss
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3800);
        return () => clearTimeout(t);
    }, [toast]);

    // Modal: focus management, escape, focus trap, body scroll lock
    useEffect(() => {
        if (!dialogOpen) return;
        const node = modalRef.current;
        nameRef.current?.focus();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKey = (e) => {
            if (e.key === 'Escape') {
                closeDialog();
                return;
            }
            if (e.key === 'Tab' && node) {
                const f = node.querySelectorAll(
                    'button, input, textarea, [href], [tabindex]:not([tabindex="-1"])'
                );
                if (!f.length) return;
                const first = f[0];
                const last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [dialogOpen]);

    const openCreate = () => {
        lastTriggerRef.current = document.activeElement;
        setEditingId(null);
        setForm(emptyForm);
        setDialogOpen(true);
    };

    const openEdit = (truck) => {
        lastTriggerRef.current = document.activeElement;
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
        // restore focus to whatever opened the dialog
        lastTriggerRef.current?.focus?.();
    };

    const handleChange = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    // Only send the fields the admin actually edits. The old code also sent
    // price:'' / kvt:'' (empty strings) into numeric backend fields, which the
    // API rejected with a cast error — that was why editing silently failed.
    const buildPayload = () => ({
        name: form.name.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
    });

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!form.name.trim()) {
            showToast('Name is required', 'warning');
            nameRef.current?.focus();
            return;
        }

        const isEdit = Boolean(editingId);
        const url = isEdit ? `${API_URL}${editingId}` : API_URL;
        const method = isEdit ? 'PUT' : 'POST';

        setSaving(true);
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildPayload()),
            });
            if (!res.ok) {
                let detail = '';
                try {
                    detail = (await res.text()).slice(0, 120);
                } catch {
                    /* ignore */
                }
                throw new Error(detail || `HTTP ${res.status}`);
            }
            showToast(isEdit ? 'Unit updated' : 'Unit added to fleet');
            closeDialog();
            fetchTrucks();
        } catch (err) {
            showToast(`${isEdit ? 'Update' : 'Create'} failed — ${err.message}`, 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (truck) => {
        if (!window.confirm(`Remove "${truck.name}" from the fleet? This cannot be undone.`)) return;
        try {
            const res = await fetch(`${API_URL}${truck._id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            showToast('Unit removed');
            fetchTrucks();
        } catch (err) {
            showToast(`Delete failed — ${err.message}`, 'error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const q = query.trim().toLowerCase();
    const filtered = q
        ? trucks.filter((t) => (t.name || '').toLowerCase().includes(q))
        : trucks;

    const unitCode = (id) => `#${String(id || '').slice(-5).toUpperCase() || '0000'}`;

    return (
        <div className="adm">
            {/* ── Console header ─────────────────────────────── */}
            <header className="adm__bar">
                <div className="adm__wrap adm__bar-inner">
                    <div>
                        <p className="adm__eyebrow">
                            <span className="adm__status-dot" aria-hidden="true" />
                            Fleet Console — Live
                        </p>
                        <h1 className="adm__title">
                            Fleet <em>Manager</em>
                        </h1>
                        <p className="adm__sub">
                            Add, edit, and retire the trucks shown across the public site.
                        </p>
                    </div>
                    <div className="adm__bar-actions">
                        <button type="button" className="adm-btn adm-btn--ghost" onClick={() => navigate('/')}>
                            View Site
                        </button>
                        <button type="button" className="adm-btn adm-btn--ghost" onClick={handleLogout}>
                            <Icon.logout aria-hidden="true" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="adm__wrap">
                {/* ── Command bar ────────────────────────────── */}
                <div className="adm__cmd">
                    <div className="adm__search">
                        <Icon.search aria-hidden="true" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search units by name…"
                            aria-label="Search units by name"
                        />
                    </div>
                    <span className="adm__count">
                        <strong>{q ? `${filtered.length}/${trucks.length}` : trucks.length}</strong>
                        {trucks.length === 1 && !q ? 'Unit' : 'Units'}
                    </span>
                    <button type="button" className="adm-btn adm-btn--primary" onClick={openCreate}>
                        <Icon.plus aria-hidden="true" /> Add Unit
                    </button>
                </div>

                {/* ── Roster ─────────────────────────────────── */}
                <section className="adm__roster" aria-label="Fleet roster">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <article key={i} className="adm__card adm__card--skel" aria-hidden="true">
                                <div className="adm__skel adm__skel--media" />
                                <div className="adm__skel adm__skel--line" />
                                <div className="adm__skel adm__skel--line sm" />
                                <div className="adm__skel adm__skel--foot" />
                            </article>
                        ))
                    ) : loadError ? (
                        <div className="adm__panel adm__panel--error" role="alert">
                            <Icon.alert aria-hidden="true" />
                            <h2>Couldn’t load the fleet</h2>
                            <p>The backend didn’t respond. Check your connection and try again.</p>
                            <button type="button" className="adm-btn adm-btn--primary" onClick={fetchTrucks}>
                                Retry
                            </button>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="adm__panel">
                            {q ? (
                                <>
                                    <Icon.search aria-hidden="true" />
                                    <h2>No matches</h2>
                                    <p>No units match “{query}”. Try a different name.</p>
                                    <button type="button" className="adm-btn adm-btn--text" onClick={() => setQuery('')}>
                                        Clear search
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Icon.inbox aria-hidden="true" />
                                    <h2>No units yet</h2>
                                    <p>Your fleet is empty. Add the first truck to show it on the public site.</p>
                                    <button type="button" className="adm-btn adm-btn--primary" onClick={openCreate}>
                                        <Icon.plus aria-hidden="true" /> Add Unit
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        filtered.map((truck) => (
                            <article key={truck._id} className="adm__card">
                                <div className={`adm__card-media${truck.image ? '' : ' adm__card-media--empty'}`}>
                                    {truck.image ? (
                                        <img src={truck.image} alt={truck.name || 'Truck'} loading="lazy" />
                                    ) : (
                                        <Icon.truck aria-hidden="true" />
                                    )}
                                    <span className="adm__tag">{unitCode(truck._id)}</span>
                                </div>
                                <div className="adm__card-body">
                                    <h2 className="adm__card-name">{truck.name || 'Untitled unit'}</h2>
                                    <p className={`adm__card-desc${truck.description ? '' : ' adm__card-desc--muted'}`}>
                                        {truck.description || 'No description added.'}
                                    </p>
                                </div>
                                <div className="adm__card-foot">
                                    <span className="adm__card-date">
                                        {truck.createdAt ? `Added ${formatDateUS(truck.createdAt)}` : '—'}
                                    </span>
                                    <div className="adm__card-actions">
                                        <button
                                            type="button"
                                            className="adm__icon"
                                            onClick={() => openEdit(truck)}
                                            aria-label={`Edit ${truck.name || 'unit'}`}
                                        >
                                            <Icon.edit aria-hidden="true" />
                                        </button>
                                        <button
                                            type="button"
                                            className="adm__icon adm__icon--danger"
                                            onClick={() => handleDelete(truck)}
                                            aria-label={`Delete ${truck.name || 'unit'}`}
                                        >
                                            <Icon.trash aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </main>

            {/* ── Modal ──────────────────────────────────────── */}
            {dialogOpen && (
                <div
                    className="adm__backdrop"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) closeDialog();
                    }}
                >
                    <div
                        className="adm__modal"
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="adm-modal-title"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="adm__modal-head">
                                <h2 id="adm-modal-title">
                                    {editingId ? <>Edit <em>Unit</em></> : <>New <em>Unit</em></>}
                                </h2>
                                <button
                                    type="button"
                                    className="adm__modal-close"
                                    onClick={closeDialog}
                                    aria-label="Close dialog"
                                >
                                    <Icon.close aria-hidden="true" />
                                </button>
                            </div>

                            <div className="adm__modal-body">
                                <div className="adm__field">
                                    <label htmlFor="adm-name">
                                        Unit name<span className="req" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="adm-name"
                                        ref={nameRef}
                                        value={form.name}
                                        onChange={handleChange('name')}
                                        placeholder="e.g. Freightliner Cascadia"
                                        required
                                    />
                                </div>
                                <div className="adm__field">
                                    <label htmlFor="adm-desc">Description</label>
                                    <textarea
                                        id="adm-desc"
                                        value={form.description}
                                        onChange={handleChange('description')}
                                        placeholder="Short description shown on the public card."
                                        rows={4}
                                    />
                                </div>
                                <div className="adm__field">
                                    <label htmlFor="adm-image">Image URL</label>
                                    <input
                                        id="adm-image"
                                        value={form.image}
                                        onChange={handleChange('image')}
                                        placeholder="https://…"
                                    />
                                </div>
                                {form.image.trim() && (
                                    <div className="adm__preview">
                                        <img src={form.image} alt="Preview of the unit image" />
                                    </div>
                                )}
                            </div>

                            <div className="adm__modal-foot">
                                <button type="button" className="adm-btn adm-btn--text" onClick={closeDialog}>
                                    Cancel
                                </button>
                                <button type="submit" className="adm-btn adm-btn--primary" disabled={saving}>
                                    {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Add Unit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Toast ──────────────────────────────────────── */}
            {toast && (
                <div className={`adm__toast adm__toast--${toast.sev}`} role="status" aria-live="polite">
                    <span className="adm__toast-msg">{toast.msg}</span>
                    <button
                        type="button"
                        className="adm__toast-close"
                        onClick={() => setToast(null)}
                        aria-label="Dismiss notification"
                    >
                        <Icon.close aria-hidden="true" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
