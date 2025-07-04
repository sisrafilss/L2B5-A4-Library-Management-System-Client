import React from "react";

const FullScreenSpinner: React.FC<{ size?: number }> = ({ size = 48 }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <div
        className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default FullScreenSpinner;
