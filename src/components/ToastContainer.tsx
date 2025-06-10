'use client';

import React, { useEffect } from 'react';
import { useToast } from '@/context/ToastContext';

const Toast = ({ message, onDismiss }: { message: string; onDismiss: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 10000); // The toast will disappear after 10 seconds

        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="toast-item" onClick={onDismiss}>
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
                <Toast key={toast.id} message={toast.message} onDismiss={() => removeToast(toast.id)} />
            ))}
        </div>
    );
}; 