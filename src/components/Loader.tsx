import { memo } from "react";

const Loader = () => {
  let circleCommonClasses = "h-2 w-2 bg-white   rounded-full";
  return (
    <div className="flex p-2">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
};

export default memo(Loader);
