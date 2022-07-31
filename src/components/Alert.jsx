import React, { memo } from "react";
import PropTypes from "prop-types";

const Alert = ({ message, color }) => {
  return (
    <div
      className={`bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative mb-2 text-center`}
      role="alert">
      <span className="sm:inline block">{message}</span>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
};

export default memo(Alert);
