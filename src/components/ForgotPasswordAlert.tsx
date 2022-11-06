import React, { memo, useEffect } from "react";

type ForgotPasswordAlertProps = {
  setAlert: React.Dispatch<boolean>;
};
const ForgotPasswordAlert = ({ setAlert }: ForgotPasswordAlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 5000);

    // To clear or cancel a timer, you call the clearTimeout(); method,
    // passing in the timer object that you created into clearTimeout().

    return () => clearTimeout(timer);
  }, [setAlert]);
  return (
    <>
      <div
        className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-green-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Changement de mot de passe</p>
            <p className="text-sm">
              Un email vous a été envoyé pour changer votre mot de passe
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ForgotPasswordAlert);
