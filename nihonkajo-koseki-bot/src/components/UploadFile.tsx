import React, { useState } from 'react';

interface UploadButtonProps {
  onFileChange?: (file: File | null) => void;
}

const UploadFile: React.FC<UploadButtonProps> = ({ onFileChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileChange?.(file);
    } else {
      setFileName(null);
      onFileChange?.(null);
    }
  };

  return (
    <div className="flex items-center gap-5">
      {fileName ? (
        <span className="text-txt-primary font-normal text-sm">
          {fileName || ''}
        </span>
      ) : null}

      <label className="relative cursor-pointer bg-[#E5E5E5] text-[#8080808C] font-bold text-sm px-[33px] py-[10px] rounded">
        <span>再アップロード</span>
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </label>
      <span className="text-gray-light text-xs font-normal">
        アップロード可能なファイル形式: pdf
      </span>
    </div>
  );
};

export default UploadFile;
