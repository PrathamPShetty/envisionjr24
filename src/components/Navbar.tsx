"use client";
import React from "react";

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8"
          aria-label="Global"
        >
          {/* Logo and Heading */}
          <div className="flex items-center space-x-4">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="/logo/logo.png"
                alt="Logo"
              />
            </a>
            <h1 className="font-bold text-xl text-center">
              Srinivas Institution of Technology
            </h1>
          </div>
        </nav>
      </header>

      {/* Card Component */}
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  mx-auto mt-6">
        <div className="flex flex-col items-center pb-10">
          <br/>
   
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/logo/logo1.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">
      ALTIUS 2024
          </h5>
          <section className="text-center ">
        <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900  ">
          Real Time Score Board
        </h1>

      </section>
        </div>
      </div>
    </>
  );
};

export default Navbar;
