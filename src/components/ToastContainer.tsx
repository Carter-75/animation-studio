'use client';

import React from 'react';
import { useToast, ToastType } from '@/context/ToastContext';

const Toast = ({ message, type, onDismiss }: { message: string; type: ToastType; onDismiss: () => void }) => {
    return (
        <div className={`toast-item toast-${type}`} onClick={onDismiss}>
            {message}
            <button className="delete is-small" style={{ marginLeft: '1rem' }}></button>
        </div>
    );
};

export const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    if (!toasts.length) {
        return null;
    }

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onDismiss={() => removeToast(toast.id)} />
            ))}
        </div>
    );
}; 