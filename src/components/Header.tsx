"use client";

import React from "react";

import Dialog from "./Dialog";

const Header: React.FC = () => {


  return (
    <nav className="w-full">
       <header
        className="bg-[#002452] w-full fit text-white text-[24px] p-4
        pl-[24px] font-bold flex items-center gap-[36px]"
      >
        <img
          className="h-[48px] w-auto"
          src="/dsha_logo.png"
          alt="DSHA logo"
          width="91"
          height="59"
        />
        <p>Delaware Loan Dashboard</p>
        <div className="ml-auto flex items-center gap-3">
          <Dialog buttonContent="About">
            Residential development is regulated at the local level through
            zoning and land use ordinances, which determine where housing can be
            built, what types of housing can be built, and whether such
            development is allowed by-right, on a conditional basis, or
            prohibited. This dashboard is intended to illustrate where and how
            select jurisdictions in Delaware allow different types of housing to
            be built. Because the definitions and categorizations of housing
            types differ by jurisdiction, this dashboard is designed to show
            residential development permissions for one jurisdiction at a time,
            using the definitions found in that jurisdiction’s code.
          </Dialog>
          {/* <button
            className="flex h-9 items-center justify-center rounded-md
              border border-gray-200 bg-gray-50 px-3.5 text-[15px]
              font-medium text-gray-900 select-none hover:bg-gray-100
              focus-visible:outline focus-visible:outline-2
              focus-visible:-outline-offset-1 focus-visible:outline-blue-800
              active:bg-gray-100"
            // onClick={() => setIsTourOpen(true)}
          >
            Start tour
          </button> */}
        </div>
      </header>
    </nav>
  );
};

export default Header;