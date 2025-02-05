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
      <div className="bg-white rounded-lg shadow-lg md:p-6 p-12 md:max-w-md mx-12">
        <div className="text-lg text-gray-800 flex flex-col gap-12 md:gap-4">
          <p className="font-bold md:text-xl text-4xl">
            Share Calum's location to notify their emergency contacts.
          </p>
          <p className="md:text-lg text-3xl mt-2 text-blue-600 font-bold">
            Declining will still show essential emergency details.
          </p>
        </div>
        <div className="flex justify-evenly gap-6 md:mt-4 mt-12">
          <button
            onClick={onCancel}
            className="bg-red-500 basis-1/2 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600 md:h-fit h-[125px] w-full md:w-fit"
          >
            <p className="text-3xl md:text-lg">Decline</p>
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 basis-1/2 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            <p className="text-3xl md:text-lg">Allow</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
