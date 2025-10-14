import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

function ErrorToast({ mensagem, onFechar }) {
  useEffect(() => {
    const timer = setTimeout(onFechar, 6000); // Fechar após 6s
    return () => clearTimeout(timer);
  }, [onFechar]);

  return (
    <div className="fixed top-4 right-4 bg-red-50 border-2 border-red-300 rounded-lg p-4 max-w-md shadow-lg z-50 animate-slide-in">
      <div className="flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <h4 className="font-bold text-red-900 mb-1">Erro ao executar ação</h4>
          <p className="text-sm text-red-800">{mensagem}</p>
        </div>
        <button
          onClick={onFechar}
          className="text-red-600 hover:bg-red-100 rounded p-1 flex-shrink-0"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default ErrorToast;