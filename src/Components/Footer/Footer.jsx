import React from "react";
import Button from "./Button";

const Footer = ({ filter, setFilter, taskLeft }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      <span className="text-sm text-zinc-400 order-2 sm:order-1">
        {taskLeft} tasks left
      </span>
      <div className="flex justify-center items-center gap-x-2 text-sm font-medium text-zinc-700 child:cursor-pointer child:transition-colors child:duration-300 child:ease-linear order-1 sm:order-2">
        <Button
          title={"All"}
          isActive={filter === "All"}
          onClick={() => setFilter("All")}
        />
        <Button
          title={"Active"}
          isActive={filter === "Active"}
          onClick={() => setFilter("Active")}
        />
        <Button
          title={"Complete"}
          isActive={filter === "Complete"}
          onClick={() => setFilter("Complete")}
        />
      </div>
    </div>
  );
};

export default Footer;
