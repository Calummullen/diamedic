import React from "react";
import RecoveryStep1 from "../../../public/recovery-step-1.png";
import RecoveryStep2 from "../../../public/recovery-step-2.png";
import RecoveryStep3 from "../../../public/recovery-step-3.png";
import RecoveryStep4 from "../../../public/recovery-step-4.png";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
}

const RecoveryPositionModal: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white h-[800px] rounded-lg shadow-lg px-6 py-2 md:max-w-md mx-4 overflow-y-scroll">
        <p onClick={onClose} className="text-3xl text-end cursor-pointer">
          x
        </p>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-red-500">
            How to put me into the recovery position
          </h2>
          <p className="text-xl">
            If I'm unconscious but breathing, follow these steps:
          </p>

          {/* Step-by-step instructions */}
          <ol className=" list-inside space-y-2 text-xl">
            <li>1. Make sure I'm lying on my back</li>
            <li>2. Kneel down next to me</li>
            <li>
              <p>3. Move the arm closest to you out at a right angle</p>
              <img
                alt="recovery position step 1"
                className="my-4"
                src={RecoveryStep1}
              />
            </li>
            <li>
              <p>4. Place the other hand under my cheek</p>{" "}
              <img
                alt="recovery position step 1"
                className="my-4"
                src={RecoveryStep2}
              />
            </li>
            <li>
              <p>5. Bend my knee furthest from you</p>{" "}
              <img
                alt="recovery position step 1"
                className="my-4"
                src={RecoveryStep3}
              />
            </li>
            <li>
              <p>6. Carefully roll me towards you, rolling me onto my side</p>{" "}
              <img
                alt="recovery position step 1"
                className="my-4"
                src={RecoveryStep4}
              />
            </li>
            <li>
              <p>
                7. Open my airway by gently tilting my head back and lifting my
                chin, and check that nothing is blocking my airway
              </p>{" "}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPositionModal;
