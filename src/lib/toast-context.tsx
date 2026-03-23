"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const iconMap = { success: "check_circle", error: "error", info: "info" };
  const colorMap = {
    success: "border-l-green-500 bg-green-50",
    error: "border-l-error bg-error-container/30",
    info: "border-l-primary bg-primary-container/20",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-20 right-6 z-[200] space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-lg shadow-2xl border-l-4 ${colorMap[toast.type]} flex items-center gap-3 min-w-[280px] max-w-sm animate-[slideIn_0.3s_ease-out]`}
          >
            <span className={`material-symbols-outlined text-lg ${toast.type === "error" ? "text-error" : toast.type === "success" ? "text-green-600" : "text-primary"}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {iconMap[toast.type]}
            </span>
            <p className="text-sm text-on-surface flex-1">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
