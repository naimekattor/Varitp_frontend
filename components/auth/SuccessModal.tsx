"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl">
        <h2>Password Changed Successfully</h2>

        <button onClick={onClose}>
          Return to Login
        </button>
      </div>
    </div>
  );
}