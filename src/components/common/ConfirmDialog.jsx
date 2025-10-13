import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Componente de Diálogo de Confirmação
 * Usado para confirmar ações críticas como exclusões
 */
function ConfirmDialog({ 
  isOpen, 
  titulo = 'Confirmar Ação', 
  mensagem = 'Tem certeza que deseja continuar?',
  textoBotaoConfirmar = 'Confirmar',
  textoBotaoCancelar = 'Cancelar',
  onConfirmar, 
  onCancelar,
  tipo = 'danger' // 'danger', 'warning', 'info'
}) {
  if (!isOpen) return null;

  const estilos = {
    danger: {
      icon: 'bg-red-100',
      iconColor: 'text-red-600',
      botao: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      icon: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      botao: 'bg-yellow-600 hover:bg-yellow-700'
    },
    info: {
      icon: 'bg-blue-100',
      iconColor: 'text-blue-600',
      botao: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  const estilo = estilos[tipo] || estilos.danger;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">{titulo}</h3>
          <button
            onClick={onCancelar}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${estilo.icon} flex-shrink-0`}>
              <AlertTriangle className={estilo.iconColor} size={24} />
            </div>
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed">{mensagem}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onCancelar}
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            {textoBotaoCancelar}
          </button>
          <button
            onClick={onConfirmar}
            className={`px-6 py-2.5 text-white rounded-lg font-medium shadow-md transition-colors ${estilo.botao}`}
          >
            {textoBotaoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;