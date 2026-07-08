import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, url, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl border border-[#B6A799]/30 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#F4F0EA] border-b border-[#B6A799]/20 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-serif font-bold text-[#2D2A27] flex items-center gap-2">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#7A7A59] hover:text-[#B55D3B] hover:bg-[#EAE4DA] rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Embedded Link Framework) */}
        <div className="flex-1 bg-white p-2">
          <iframe 
            src={url} 
            title={title}
            className="w-full h-full border-0 rounded-xl"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

export default LegalModal;