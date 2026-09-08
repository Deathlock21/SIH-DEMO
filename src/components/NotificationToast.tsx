import React from 'react';
import { Sparkles, CheckCircle2, RefreshCw, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'loop' | 'info';
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '420px',
      width: '100%'
    }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            background: 'rgba(16, 21, 34, 0.95)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${
              toast.type === 'loop' ? 'rgba(139, 92, 246, 0.5)' :
              toast.type === 'success' ? 'rgba(16, 185, 129, 0.5)' :
              'rgba(6, 182, 212, 0.5)'
            }`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            boxShadow: 'var(--shadow-lg), 0 0 20px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            animation: 'fadeIn 200ms ease-out'
          }}
        >
          <div style={{
            color: toast.type === 'loop' ? '#c084fc' :
                   toast.type === 'success' ? '#34d399' : '#22d3ee',
            marginTop: '2px'
          }}>
            {toast.type === 'loop' ? <RefreshCw size={18} /> :
             toast.type === 'success' ? <CheckCircle2 size={18} /> :
             <Sparkles size={18} />}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.2rem' }}>
              {toast.title}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {toast.message}
            </div>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="btn btn-ghost"
            style={{ padding: '0.2rem', color: 'var(--text-muted)' }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
