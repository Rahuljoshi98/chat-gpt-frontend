"use client";
import toast from "react-hot-toast";

export const handleErrorMessage = (err) => {
  const msg =
    err?.response?.data?.error?.explanation?.[0] ||
    err?.response?.data?.message ||
    err.message ||
    "Something went wrong";

  toast.dismiss();
  toast.error(msg, {
    duration: 3000,
    position: "top-right",
  });
};
