import { Toaster } from "react-hot-toast";

function CommonToast() {
  return (
    <Toaster
      position="bottom-right"
      containerClassName="z-1000"
      reverseOrder={false}
    />
  );
}

export default CommonToast;
