import { createContext, useState, ReactNode } from 'react';

interface AppContextInterFace {
  isOpen: boolean;
  message: string;
  type: string;
  showToast: (message: string, type: string) => void;
  hideToast: () => void;
}

export const ToastContext = createContext({} as AppContextInterFace);

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const showToast = (message: string, type: string) => {
    setMessage(message);
    console.log(type);
    setType(type);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider
      value={{
        isOpen,
        message,
        type,
        showToast,
        hideToast: () => setIsOpen(false)
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
