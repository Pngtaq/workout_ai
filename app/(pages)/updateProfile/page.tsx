"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import UpdateProfileForm from "@/components/ui/UpdateProfileForm";

const Page = () => {
  return (
    <div className="p-2">
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <h1 className="text-sm bg-violet-600 text-white p-1 text-center rounded-md justify-self-start ">
        Update Profile
      </h1>
      <div>
        <UpdateProfileForm />
      </div>
    </div>
  );
};

export default Page;
