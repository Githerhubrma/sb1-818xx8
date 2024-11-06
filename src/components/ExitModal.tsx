import React, { useState } from 'react';
import { Copy } from 'lucide-react';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: (keepAccount: boolean) => void;
  accountCode?: string;
}

export const ExitModal: React.FC<ExitModalProps> = ({
  isOpen,
  onClose,
  onExit,
  accountCode,
}) => {
  const [showCode, setShowCode] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    if (accountCode) {
      navigator.clipboard.writeText(accountCode);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Exit Trading Platform</h2>
        
        {!showCode ? (
          <>
            <p className="text-gray-600 mb-6">
              Would you like to keep your account for future trading?
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onExit(true);
                  setShowCode(true);
                }}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Keep Account
              </button>
              
              <button
                onClick={() => onExit(false)}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Here's your account recovery code. Save it somewhere safe!
            </p>
            
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg mb-6">
              <code className="flex-1 font-mono text-blue-600">
                {accountCode}
              </code>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-gray-200 rounded-full"
                title="Copy code"
              >
                <Copy className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};