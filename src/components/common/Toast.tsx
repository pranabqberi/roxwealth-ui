import { ToastContext } from 'providers/ToastProvider';
import { Toast } from 'react-bootstrap';
import { useContext } from 'react';

const ToastComponent = () => {
  const { isOpen, message, hideToast, type } = useContext(ToastContext);
  return (
    <Toast
      className="bg-1100 dark__bg-1000"
      show={isOpen}
      onClose={hideToast}
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        zIndex: 9999
      }}
      autohide
      bg={type === 'error' ? 'danger' : 'success'}
    >
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};
export default ToastComponent;
