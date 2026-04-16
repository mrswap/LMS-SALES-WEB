import React from "react";
import { FaDownload, FaLinkedin, FaAward } from "react-icons/fa";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";

const Certificate = () => {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Certificate</PageTitle>
          <PageSubtitle>Your achievement</PageSubtitle>
        </PageHeaderLeft>
      </PageHeader>

      <PageBody>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* ================= CERTIFICATE ================= */}
          <div className="bg-white border-[6px] border-blue-900 rounded-2xl shadow-sm px-6 py-10 sm:px-10 sm:py-12 text-center relative">
            {/* TOP ICON */}
            <div className="flex justify-center mb-4">
              <div className="bg-blue-50 text-blue-700 p-3 rounded-full">
                <FaAward size={22} />
              </div>
            </div>

            {/* TITLE */}
            <h2 className="text-blue-900 font-bold tracking-widest text-sm sm:text-base">
              AVANTE MEDICAL
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              LEARNING MANAGEMENT SYSTEM
            </p>

            {/* CONTENT */}
            <p className="text-gray-600 mb-2">This is to certify that</p>

            <h1 className="text-2xl sm:text-3xl font-bold border-b pb-1 inline-block mb-4">
              Alex J. Harrison
            </h1>

            <p className="text-gray-600 mb-2">
              has successfully completed the course
            </p>

            <h3 className="text-blue-800 font-semibold text-lg sm:text-xl mb-4 leading-snug">
              Advanced Clinical Diagnostics & Patient Care
            </h3>

            <p className="text-sm text-gray-500">Issued on: October 24, 2023</p>

            {/* DECORATIVE LINE */}
            <div className="mt-6 h-px bg-gray-200 w-3/4 mx-auto" />

            {/* SIGNATURE */}
            <p className="text-xs text-gray-400 mt-3">
              Authorized by Avante Medical
            </p>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow transition">
              <FaDownload />
              Download PDF
            </button>

            <button className="w-full border border-gray-300 hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition">
              <FaLinkedin />
              Share to LinkedIn
            </button>
          </div>

          {/* ================= FOOTER ================= */}
          <p className="text-center text-xs text-gray-400">
            Verification ID: AV-9982-XM-2023
          </p>
        </div>
      </PageBody>
    </PageLayout>
  );
};

export default Certificate;
