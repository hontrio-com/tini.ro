'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn, Download, RefreshCw, Loader2, TrendingUp, Package,
  Calendar, DollarSign, Truck, X, FileText, CheckCircle2, AlertCircle,
  Pencil, Trash2, CheckCircle, XCircle, Eye, Users, Globe,
} from 'lucide-react';
import { Order, OrderStatus, JUDETE } from '@/lib/types';
import type { WootPrice } from '@/lib/woot';

const STATUS_LABELS: Record<OrderStatus, string> = {
  noua: 'Noua',
  in_livrare: 'In livrare',
  neridicata: 'Neridicata',
  anulata: 'Anulata',
  nu_a_raspuns: 'Nu a raspuns',
  livrata: 'Livrata cu succes',
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  noua: 'bg-blue-100 text-blue-800',
  in_livrare: 'bg-amber-100 text-amber-800',
  neridicata: 'bg-orange-100 text-orange-800',
  anulata: 'bg-red-100 text-red-800',
  nu_a_raspuns: 'bg-purple-100 text-purple-800',
  livrata: 'bg-green-100 text-green-800',
};

const STATUSES: Array<OrderStatus | 'toate'> = ['toate', 'noua', 'in_livrare', 'neridicata', 'anulata', 'nu_a_raspuns', 'livrata'];

// ── Edit Modal ────────────────────────────────────────────────────────────────

interface EditModalProps {
  order: Order;
  token: string;
  onClose: () => void;
  onSaved: (updated: Order) => void;
}

function EditModal({ order, token, onClose, onSaved }: EditModalProps) {
  const [form, setForm] = useState({
    customer_name: order.customer_name,
    customer_phone: order.customer_phone,
    customer_county: order.customer_county,
    customer_city: order.customer_city,
    customer_address: order.customer_address,
    quantity: order.quantity,
    total_price: order.total_price,
    status: order.status,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ id: order.id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Eroare la salvare');
      onSaved({ ...order, ...form });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Eroare');
    } finally {
      setSaving(false);
    }
  };

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2563EB] transition-colors';
  const lbl = 'block text-xs font-semibold text-gray-600 mb-1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="font-bold text-gray-900">Editeaza comanda <span className="text-gray-400 font-mono text-sm">#{order.id.slice(0, 8).toUpperCase()}</span></h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Nume</label>
              <input className={inp} value={form.customer_name} onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))} />
            </div>
            <div>
              <label className={lbl}>Telefon</label>
              <input className={inp} value={form.customer_phone} onChange={(e) => setForm((f) => ({ ...f, customer_phone: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Judet</label>
              <select className={inp} value={form.customer_county} onChange={(e) => setForm((f) => ({ ...f, customer_county: e.target.value }))}>
                {JUDETE.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Oras</label>
              <input className={inp} value={form.customer_city} onChange={(e) => setForm((f) => ({ ...f, customer_city: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className={lbl}>Adresa</label>
            <input className={inp} value={form.customer_address} onChange={(e) => setForm((f) => ({ ...f, customer_address: e.target.value }))} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={lbl}>Cantitate</label>
              <input type="number" min={1} max={10} className={inp} value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: parseInt(e.target.value) || 1 }))} />
            </div>
            <div>
              <label className={lbl}>Total (Lei)</label>
              <input type="number" step="0.01" className={inp} value={form.total_price} onChange={(e) => setForm((f) => ({ ...f, total_price: parseFloat(e.target.value) || 0 }))} />
            </div>
            <div>
              <label className={lbl}>Status</label>
              <select className={inp} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as OrderStatus }))}>
                {(Object.entries(STATUS_LABELS) as [OrderStatus, string][]).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertCircle size={14} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        <div className="px-6 pb-5 flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Anuleaza
          </button>
          <button onClick={handleSave} disabled={saving} className="flex-1 bg-[#2563EB] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#1D4ED8] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
            Salveaza
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: string | number; icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <span className="text-sm text-gray-500 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-[#0A0A0A]">{value}</p>
    </div>
  );
}

// ── AWB Modal ────────────────────────────────────────────────────────────────

interface AwbModalProps {
  order: Order;
  token: string;
  onClose: () => void;
  onCreated: (orderId: string, wootOrderId: string, awb: string, courier: string) => void;
}

function AwbModal({ order, token, onClose, onCreated }: AwbModalProps) {
  const [prices, setPrices] = useState<WootPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/woot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
          body: JSON.stringify({ action: 'prices', orderId: order.id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Eroare la preluarea preturilor');
        setPrices(data.prices || []);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Eroare necunoscuta');
      } finally {
        setLoading(false);
      }
    })();
  }, [order.id, token]);

  const handleCreate = async (price: WootPrice) => {
    setCreating(price.service_id);
    try {
      const res = await fetch('/api/woot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({
          action: 'create',
          orderId: order.id,
          serviceId: price.service_id,
          courierName: price.courier_name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Eroare la crearea AWB');
      onCreated(order.id, data.woot_order_id, data.awb, price.courier_name);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Eroare la creare AWB');
      setCreating(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900">Genereaza AWB</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {order.customer_name} · {order.customer_city}, {order.customer_county}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Order summary */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs text-gray-600 flex gap-4">
          <span>{order.quantity} buc · <strong>{order.total_price} Lei</strong> ramburs</span>
          <span className="text-gray-400">{order.customer_address}</span>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {loading && (
            <div className="flex items-center justify-center py-10 gap-3 text-gray-400">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm">Se incarca preturile...</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!loading && !error && prices.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-8">
              Niciun serviciu disponibil pentru aceasta adresa.
            </p>
          )}

          {!loading && prices.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-semibold">
                Alege curierul
              </p>
              <div className="overflow-y-auto max-h-[340px] pr-1 -mr-1">
                <div className="grid grid-cols-2 gap-2">
                  {prices.map((p) => (
                    <button
                      key={p.service_id}
                      onClick={() => handleCreate(p)}
                      disabled={creating !== null}
                      className="flex flex-col gap-2 border border-gray-200 rounded-xl p-3 hover:border-[#2563EB] hover:bg-blue-50/40 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="font-bold text-sm text-gray-900 leading-tight">{p.courier_name}</p>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 whitespace-nowrap shrink-0">
                          {p.service_pickup === 'door' ? 'Adr' : 'Lkr'} → {p.service_delivery === 'door' ? 'Adr' : 'Lkr'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-tight line-clamp-2">{p.service_name}</p>
                      <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-100">
                        <span className="font-bold text-sm text-[#2563EB]">
                          {p.price > 0 ? `${p.price.toFixed(2)} Lei` : '—'}
                        </span>
                        {creating === p.service_id
                          ? <Loader2 size={13} className="animate-spin text-gray-400" />
                          : <span className="text-[11px] text-gray-400">{p.delivery_days ? `~${p.delivery_days}z` : ''}</span>
                        }
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-6 pb-4">
          <p className="text-xs text-gray-400 text-center">
            Coletul: 25×25×30cm · {(1.5 * order.quantity).toFixed(1)}kg · Ramburs: {order.total_price} Lei
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [, setTotal] = useState(0);
  const [filter, setFilter] = useState<OrderStatus | 'toate'>('toate');
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [awbModalOrder, setAwbModalOrder] = useState<Order | null>(null);
  const [downloadingAwb, setDownloadingAwb] = useState<string | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [stats, setStats] = useState<{ counts: Record<string, number>; total: number; revenue: number } | null>(null);
  const [views, setViews] = useState<{
    total: number; uniqueTotal: number;
    todayTotal: number; todayUnique: number;
    weekTotal: number; weekUnique: number;
    topSources: { source: string; count: number }[];
  } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_token');
    if (stored) setToken(stored);
  }, []);

  const fetchOrders = useCallback(async (tok: string, status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin?status=${status}`, {
        headers: { 'x-admin-token': tok },
      });
      if (res.ok) {
        const json = await res.json();
        setOrders(json.orders || []);
        setTotal(json.total || 0);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async (tok: string) => {
    const [sRes, vRes] = await Promise.all([
      fetch('/api/admin?stats=true', { headers: { 'x-admin-token': tok } }),
      fetch('/api/admin?views=true', { headers: { 'x-admin-token': tok } }),
    ]);
    if (sRes.ok) setStats(await sRes.json());
    if (vRes.ok) setViews(await vRes.json());
  }, []);

  useEffect(() => {
    if (token) { fetchOrders(token, filter); fetchStats(token); }
  }, [token, filter, fetchOrders, fetchStats]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok) {
        sessionStorage.setItem('admin_token', json.token);
        setToken(json.token);
      } else {
        setLoginError(json.error || 'Parola incorecta');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    if (!token) return;
    setUpdatingId(id);
    try {
      await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ id, status }),
      });
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/admin?id=${id}`, { method: 'DELETE', headers: { 'x-admin-token': token! } });
      setOrders((prev) => prev.filter((o) => o.id !== id));
      setConfirmDeleteId(null);
      if (token) fetchStats(token);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdited = (updated: Order) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    setEditOrder(null);
    if (token) fetchStats(token);
  };

  const handleAwbCreated = (orderId: string, wootOrderId: string, awb: string, courier: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, woot_order_id: wootOrderId, woot_awb: awb, woot_courier: courier } : o
      )
    );
    setAwbModalOrder(null);
  };

  const downloadAwb = async (order: Order) => {
    if (!order.woot_order_id || !token) return;
    setDownloadingAwb(order.id);
    try {
      const res = await fetch('/api/woot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ action: 'awb', wootOrderId: order.woot_order_id }),
      });
      const data = await res.json();
      if (data.pdf) {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${data.pdf}`;
        link.download = `AWB_${order.woot_awb ?? order.id}.pdf`;
        link.click();
      }
    } finally {
      setDownloadingAwb(null);
    }
  };

  const exportCSV = () => {
    const header = ['ID', 'Data', 'Nume', 'Telefon', 'Judet', 'Oras', 'Adresa', 'Cant', 'Total', 'Status', 'AWB', 'Curier'];
    const rows = orders.map((o) => [
      o.id.slice(0, 8),
      new Date(o.created_at).toLocaleString('ro-RO'),
      o.customer_name,
      o.customer_phone,
      o.customer_county,
      o.customer_city,
      `"${o.customer_address}"`,
      o.quantity,
      o.total_price,
      o.status,
      o.woot_awb ?? '',
      o.woot_courier ?? '',
    ]);
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comenzi_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const today = new Date().toDateString();
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const todayCount = orders.filter((o) => new Date(o.created_at).toDateString() === today).length;
  const weekCount = orders.filter((o) => new Date(o.created_at).getTime() > weekAgo).length;

  const totalOrders = stats?.total ?? 0;
  const totalRevenue = stats?.revenue ?? 0;
  const cnt = (s: string) => stats?.counts[s] ?? 0;
  const pct = (s: string) => totalOrders > 0 ? ((cnt(s) / totalOrders) * 100).toFixed(1) : '0.0';

  // ── Login screen ───────────────────────────────────────────────────────────

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#0A0A0A] rounded-xl flex items-center justify-center mx-auto mb-4">
              <LogIn size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#0A0A0A]">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">tini.ro</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                Parola admin
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introdu parola"
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A] transition-colors"
                autoFocus
              />
              {loginError && <p className="text-xs text-red-500 mt-1">{loginError}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoggingIn || !password}
              className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
            >
              {isLoggingIn ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
              Autentificare
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <AnimatePresence>
        {awbModalOrder && (
          <AwbModal order={awbModalOrder} token={token} onClose={() => setAwbModalOrder(null)} onCreated={handleAwbCreated} />
        )}
        {editOrder && (
          <EditModal order={editOrder} token={token} onClose={() => setEditOrder(null)} onSaved={handleEdited} />
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="bg-[#0A0A0A] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 text-xs">tini.ro</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => token && fetchOrders(token, filter)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Reincarca"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            onClick={() => { sessionStorage.removeItem('admin_token'); setToken(null); }}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Stats — row 1: financiar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <StatCard label="Total comenzi" value={totalOrders} icon={Package} color="bg-blue-50 text-blue-600" />
          <StatCard label="Venit total (Lei)" value={totalRevenue.toFixed(0)} icon={DollarSign} color="bg-green-50 text-green-600" />
          <StatCard label="Comenzi azi" value={todayCount} icon={Calendar} color="bg-amber-50 text-amber-600" />
          <StatCard label="Aceasta saptamana" value={weekCount} icon={TrendingUp} color="bg-purple-50 text-purple-600" />
        </div>

        {/* Stats — row 2: rate livrare */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {([
            { label: 'Livrate', status: 'livrata', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
            { label: 'In livrare', status: 'in_livrare', color: 'text-amber-600', bg: 'bg-amber-50', icon: Truck },
            { label: 'Noi', status: 'noua', color: 'text-blue-600', bg: 'bg-blue-50', icon: Package },
            { label: 'Neridicata', status: 'neridicata', color: 'text-orange-600', bg: 'bg-orange-50', icon: XCircle },
            { label: 'Nu raspuns', status: 'nu_a_raspuns', color: 'text-purple-600', bg: 'bg-purple-50', icon: XCircle },
            { label: 'Anulate', status: 'anulata', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
          ] as const).map(({ label, status, color, bg, icon: Icon }) => (
            <div key={status} className={`${bg} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className={color} />
                <span className={`text-xs font-semibold ${color}`}>{label}</span>
              </div>
              <p className={`text-2xl font-black ${color}`}>{cnt(status)}</p>
              <p className="text-xs text-gray-400 mt-0.5">{pct(status)}% din total</p>
            </div>
          ))}
        </div>

        {/* Vizionari */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={16} className="text-[#2563EB]" />
            <h2 className="font-bold text-gray-900 text-sm">Vizionari pagina</h2>
            <span className="text-xs text-gray-400 ml-1">(ultimele 30 zile — surse)</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-5">
            {[
              { label: 'Azi', value: views?.todayTotal ?? '—', sub: `${views?.todayUnique ?? '—'} unici`, icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Aceasta sapt.', value: views?.weekTotal ?? '—', sub: `${views?.weekUnique ?? '—'} unici`, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Total vizionari', value: views?.total ?? '—', sub: `${views?.uniqueTotal ?? '—'} unici`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Vizitatori unici', value: views?.uniqueTotal ?? '—', sub: 'toate timpurile', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map(({ label, value, sub, icon: Icon, color, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-4 col-span-1`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={13} className={color} />
                  <span className={`text-xs font-semibold ${color}`}>{label}</span>
                </div>
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}

            {/* Top surse */}
            <div className="col-span-2 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <Globe size={13} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-600">Top surse trafic (30 zile)</span>
              </div>
              {views?.topSources?.length ? (
                <div className="space-y-1.5">
                  {views.topSources.map(({ source, count }) => {
                    const maxCount = views.topSources[0].count;
                    return (
                      <div key={source} className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-24 truncate shrink-0">{source}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${(count / maxCount) * 100}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 w-6 text-right shrink-0">{count}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-gray-400">Nu exista date inca</p>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                filter === s
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {s === 'toate' ? 'Toate' : STATUS_LABELS[s as OrderStatus]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={24} className="animate-spin text-gray-400" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Package size={40} className="mx-auto mb-3 opacity-50" />
              <p>Nicio comanda gasita</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['ID', 'Data', 'Client', 'Telefon', 'Adresa', 'Cant', 'Total', 'Status', 'AWB', ''].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-400">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleString('ro-RO', {
                          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium text-[#0A0A0A] whitespace-nowrap">
                        {order.customer_name}
                      </td>
                      <td className="px-4 py-3 font-mono text-gray-600 whitespace-nowrap">
                        {order.customer_phone}
                      </td>
                      <td className="px-4 py-3 text-gray-500 max-w-[180px]">
                        <span className="truncate block" title={`${order.customer_county}, ${order.customer_city}, ${order.customer_address}`}>
                          {order.customer_county}, {order.customer_city}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-center">{order.quantity}</td>
                      <td className="px-4 py-3 font-bold text-[#0A0A0A] whitespace-nowrap">
                        {order.total_price} Lei
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                            disabled={updatingId === order.id}
                            className={`text-xs font-semibold rounded-full px-3 py-1.5 border-0 cursor-pointer appearance-none ${STATUS_COLORS[order.status]} focus:outline-none focus:ring-2 focus:ring-gray-200`}
                          >
                            {Object.entries(STATUS_LABELS).map(([val, label]) => (
                              <option key={val} value={val}>{label}</option>
                            ))}
                          </select>
                          {updatingId === order.id && <Loader2 size={12} className="animate-spin text-gray-400" />}
                        </div>
                      </td>
                      {/* AWB column */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {order.woot_awb ? (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                              <span className="font-mono text-xs text-gray-700">{order.woot_awb}</span>
                            </div>
                            <button
                              onClick={() => downloadAwb(order)}
                              disabled={downloadingAwb === order.id}
                              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                              title="Descarca eticheta PDF"
                            >
                              {downloadingAwb === order.id ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAwbModalOrder(order)}
                            className="flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#1D4ED8] transition-colors"
                          >
                            <Truck size={11} />
                            Genereaza AWB
                          </button>
                        )}
                      </td>

                      {/* Edit / Delete */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {confirmDeleteId === order.id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDelete(order.id)}
                              disabled={deletingId === order.id}
                              className="flex items-center gap-1 bg-red-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60"
                            >
                              {deletingId === order.id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                              Sigur
                            </button>
                            <button onClick={() => setConfirmDeleteId(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                              <X size={13} className="text-gray-400" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <button onClick={() => setEditOrder(order)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Editeaza">
                              <Pencil size={13} className="text-gray-400 hover:text-gray-700" />
                            </button>
                            <button onClick={() => setConfirmDeleteId(order.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Sterge definitiv">
                              <Trash2 size={13} className="text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
