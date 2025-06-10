'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ToastMessage {
    id: number;
    message: string;
}

interface ToastContextType {
    addToast: (message: string) => void;
    toasts: ToastMessage[];
    removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [nextId, setNextId] = useState(0);

    const addToast = useCallback((message: string) => {
        const id = nextId;
        setToasts(currentToasts => [...currentToasts, { id, message }]);
        setNextId(prevId => prevId + 1);
    }, [nextId]);

    const removeToast = useCallback((id: number) => {
        setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, toasts, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
}; 