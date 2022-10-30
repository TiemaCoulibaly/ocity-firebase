import { memo } from "react";

interface PropsProgressBar {
  progressPercentage: number;
  upload: string;
}

const ProgressBar: React.FC<PropsProgressBar> = ({
  progressPercentage,
  upload,
}) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
            {upload}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block py-1 px-2 text-green-600 bg-green-200 rounded-full">
            {progressPercentage}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-200">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
        ></div>
      </div>
    </div>
  );
};
export default memo(ProgressBar);
