import React from "react";
import EntityLength from "../uibits/EntityLength";

const Invoices = () => {
  return (
    <div className="bg-[#131313] w-full p-5 rounded-lg shadow">
      {/* heading */}
      <div className="p-5 flex items-center justify-between">
        <EntityLength entityName="Invoices" entityCount={0} />
        <button
          className="bg-[#f39136] text-white py-2 px-3 rounded-md text-sm"
          //   onClick={() => setOpenAddEmployeeModal(true)}
        >
          + Add Invoice
        </button>
      </div> 
    </div>
  );
};

export default Invoices;
