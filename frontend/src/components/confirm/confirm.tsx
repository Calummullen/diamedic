import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="text-lg text-gray-800 flex flex-col gap-4">
          <p className="font-bold">
            Calum would like their location shared to alert their emergency
            contacts of their location.
          </p>

          <p className="">Declining will still provide emergency details.</p>
        </div>
        <div className="flex justify-evenly gap-6 mt-4">
          <button
            onClick={onCancel}
            className="bg-red-500 basis-1/2 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600"
          >
            Decline
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 basis-1/2 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
