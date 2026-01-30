import React from "react";
import Button from "./Button";

const Footer = ({ fillter, setFillter, taskLeft }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      <span className="text-sm text-zinc-400 order-2 sm:order-1">
        {taskLeft} tasks left
      </span>
      <div className="flex justify-center items-center gap-x-2 text-sm font-medium text-zinc-700 child:cursor-pointer child:transition-colors child:duration-300 child:ease-linear order-1 sm:order-2">
        <Button
          title={"All"}
          isActive={fillter === "All"}
          onClick={() => setFillter("All")}
        />
        <Button
          title={"Active"}
          isActive={fillter === "Active"}
          onClick={() => setFillter("Active")}
        />
        <Button
          title={"Complete"}
          isActive={fillter === "Complete"}
          onClick={() => setFillter("Complete")}
        />
      </div>
    </div>
  );
};

export default Footer;
