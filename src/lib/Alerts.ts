import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "top-center",
    style: {
      border: "1px solid #10b981",
      background: "#ecfdf5",
      color: "#065f46",
    },
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    style: {
      border: "1px solid #ef4444",
      background: "#fef2f2",
      color: "#7f1d1d",
    },
  });
};

export const showWarning = (message: string) => {
  toast.warning(message, {
    position: "top-center",
    style: {
      border: "1px solid #f59e0b",
      background: "#fffbeb",
      color: "#78350f",
    },
  });
};

export const showInfo = (message: string) => {
  toast.info(message, {
    position: "top-center",
    style: {
      border: "1px solid #3b82f6",
      background: "#eff6ff",
      color: "#1e3a8a",
    },
  });
};
