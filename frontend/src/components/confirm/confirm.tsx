import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  name: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onConfirm,
  name,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 md:max-w-md mx-4">
        <div className="text-lg text-gray-800 flex flex-col gap-4">
          <p className="font-bold md:text-xl text-xl">
            {name} has enabled SMS notifications for their emergency contacts in
            case of an emergency.
          </p>
          <p className="md:text-lg text-lg text-blue-600 font-bold">
            Please grant location access when prompted.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly gap-6 mt-4">
          {/* <button
            onClick={onCancel}
            className="bg-red-500 basis-1/2 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600 md:h-fit h-[125px] w-full md:w-fit"
          >
            <p className="text-3xl md:text-lg">Decline</p>
          </button> */}
          <button
            onClick={onConfirm}
            aria-label="Allow location access"
            className="bg-green-500 basis-1/2 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            <p className="text-3xl md:text-lg">Allow</p>
          </button>
        </div>
        {/* <Alert className="mt-4 flex flex-row items-center" severity="warning">
          <p className="text-md">
            If you're simply viewing/editing then click{" "}
            <span className="text-red-500">decline</span>
          </p>
        </Alert> */}
      </div>
    </div>
  );
};

export default ConfirmDialog;
