'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface AttachmentItem {
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface RequestFormData {
  // Step 1
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  urgency: 'standard' | 'priority' | 'emergency';
  preferredDate: string;
  preferredTime: string;
  flexibleDates: boolean;
  // Step 2
  vesselId: string | null;
  vesselName: string;
  locationId: string | null;
  locationName: string;
  locationLat: number | null;
  locationLng: number | null;
  berthInfo: string;
  // Step 3
  attachments: AttachmentItem[];
  // Step 4
  budgetMin: number | null;
  budgetMax: number | null;
}

const initialFormData: RequestFormData = {
  categoryId: '',
  categoryName: '',
  title: '',
  description: '',
  urgency: 'standard',
  preferredDate: '',
  preferredTime: '',
  flexibleDates: false,
  vesselId: null,
  vesselName: '',
  locationId: null,
  locationName: '',
  locationLat: null,
  locationLng: null,
  berthInfo: '',
  attachments: [],
  budgetMin: null,
  budgetMax: null,
};

interface RequestFormContextValue {
  formData: RequestFormData;
  updateFormData: (partial: Partial<RequestFormData>) => void;
  resetFormData: () => void;
}

const RequestFormContext = createContext<RequestFormContextValue | null>(null);

export function RequestFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<RequestFormData>(initialFormData);

  const updateFormData = useCallback((partial: Partial<RequestFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetFormData = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return (
    <RequestFormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </RequestFormContext.Provider>
  );
}

export function useRequestForm() {
  const ctx = useContext(RequestFormContext);
  if (!ctx) {
    throw new Error('useRequestForm must be used within a RequestFormProvider');
  }
  return ctx;
}
