import React, { memo } from "react";

type Props = {
  message: string;
  color: string;
};

const Alert = ({ message, color }: Props) => {
  return (
    <div
      className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative mb-2 text-center`}
      role="alert"
    >
      <span className="sm:inline block">{message}</span>
    </div>
  );
};

export default memo(Alert);
