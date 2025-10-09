import React from 'react';
import { AlertTriangle } from 'lucide-react';

function ConfirmDialog({ isOpen, titulo, mensagem, onConfirmar, onCancelar }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="text-red-600" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{titulo}</h3>
              <p className="text-sm text-gray-600">Esta ação não poderá ser desfeita</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{mensagem}</p>
          <div className="flex gap-3">
            <button onClick={onCancelar}
              className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium">
              Cancelar
            </button>
            <button onClick={onConfirmar}
              className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
              Sim, Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;