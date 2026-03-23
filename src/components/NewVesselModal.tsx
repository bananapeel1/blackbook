'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  onCreated: (vessel: any) => void;
  onClose: () => void;
}

export default function NewVesselModal({ onCreated, onClose }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'motor_yacht' | 'sailing_yacht' | 'catamaran' | 'superyacht' | 'other'>('sailing_yacht');
  const [length, setLength] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError('');

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError('Not authenticated'); setSaving(false); return; }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error: err } = await (supabase as any)
      .from('vessels')
      .insert({
        owner_id: user.id,
        name: name.trim(),
        type,
        length_meters: length ? parseFloat(length) : null,
      })
      .select()
      .single();

    if (err) { setError(err.message); setSaving(false); return; }
    onCreated(data);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary">
            Register New Vessel
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-lg">
              close
            </span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
          {/* Vessel Name */}
          <div>
            <label className="text-sm font-semibold text-on-surface block mb-1.5">
              Vessel Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. M/Y Serenity"
              required
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-semibold text-on-surface block mb-1.5">
              Vessel Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              <option value="sailing_yacht">Sailing Yacht</option>
              <option value="motor_yacht">Motor Yacht</option>
              <option value="catamaran">Catamaran</option>
              <option value="superyacht">Superyacht</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="text-sm font-semibold text-on-surface block mb-1.5">
              Length (meters)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="e.g. 24.5"
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-error text-xs font-medium">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container-high transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="flex-1 bg-primary text-on-primary px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Vessel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
