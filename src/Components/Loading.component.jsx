import React from "react";
import { ReactComponent as LoadingIcon } from "../Svg/loading.svg";

const Loading = () => {
  return (
    <div className="flex absolute top-0 left-0 right-0 bottom-0 m-auto z-50 bg-white opacity-80">
      <LoadingIcon className="w-36" />
    </div>
  );
};

export default Loading;
