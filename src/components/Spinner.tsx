type PropsSpinner = {
  heightScreen: string | number;
  width: string | number;
  height: string | number;
  justify: string;
};
const Spinner = ({ heightScreen, width, height, justify }: PropsSpinner) => {
  return (
    <div className={`flex items-center justify-${justify} ${heightScreen}`}>
      <div
        className={`spinner-border animate-spin  w-${width} h-${height} lg:w-${width} lg:h-${height} md:w-${width} md:h-${height} border-t-2 border-b-2 rounded-full border-green-600`}
      ></div>
    </div>
  );
};

export default Spinner;

//   <div className="flex items-center justify-center space-x-2 h-screen">
// <div className="spinner-border animate-spin  w-10 h-10 lg:w-16 lg:h-16 md:w-16 md:h-16 border-t-2 border-b-2 rounded-full border-green-600"></div>
// </div>
