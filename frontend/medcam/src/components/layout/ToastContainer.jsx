import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/toastSlice';

// Composant pour un seul Toast
const ToastItem = ({ toast }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, toast.duration);
    return () => clearTimeout(timer);
  }, [dispatch, toast]);

  return (
    <div className="bg-[#1E3A8A] text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-blue-800 animate-bounce mt-2">
      <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check text-[#4ADE80]' : 'fa-triangle-exclamation text-red-400'} text-xl`}></i>
      {toast.message}
    </div>
  );
};

// Le conteneur qui affiche la liste des toasts
export default function ToastContainer() {
  const toasts = useSelector((state) => state.toast.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}