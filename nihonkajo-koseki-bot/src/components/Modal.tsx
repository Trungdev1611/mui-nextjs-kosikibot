import React from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string | null;
  message: string;
}

const ModalCustom: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#D9D9D966]"></div>

      <div
        className="min-w-[800px] bg-white shadow-xl w-96 px-[10px] pb-5 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            className="p-[17px] top-0"
            onClick={onClose}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1L1 9M1 1L9 9"
                stroke="#4D4D4D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="text-center my-[10px]">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-2">{message}</p>
        </div>

        <div className="flex justify-center mt-6 gap-[18px] py-[27px]">
          <Button
            text="キャンセル"
            size="medium"
            className="px-8"
            fullWidth
            onClick={onClose}
          />
          <Button
            text="削除"
            variant="primary"
            size="medium"
            className="px-8"
            fullWidth
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalCustom;
