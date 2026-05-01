import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  PageLayout,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageTitle,
  PageSubtitle,
  PageBody,
} from "../../../common/layout";
import Loader from "../../../common/Loader";
import Error from "../../../common/Error";
import { getCertificateById } from "../../../../../redux/slice/reportSlice";

const Certificate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const certificateRef = useRef();
  const {
    currentCertificate: certificate,
    loadingCertificate,
    isError,
    message,
  } = useSelector((state) => state.report);

  console.log("certificate", certificate);

  useEffect(() => {
    if (id) {
      dispatch(getCertificateById(id));
    }
  }, [dispatch, id]);

  const handlePrint = () => {
    window.print();
  };

  if (loadingCertificate) return <Loader />;
  if (isError) return <Error message={message} />;

  const { data } = certificate || {};
  const { design, meta, share_links, certificate_id, issued_at } = data || {};

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Certificate of Achievement</PageTitle>
          <PageSubtitle>{certificate_id}</PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight>
          <div className="flex gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="px-5 py-2 text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors duration-200 shadow-md"
            >
              Print Certificate
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Back
            </button>
          </div>
        </PageHeaderRight>
      </PageHeader>

      <PageBody>
        <div className="flex justify-center items-center py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 print:bg-white">
          {/* Certificate Template */}
          <div
            ref={certificateRef}
            className="w-full max-w-5xl bg-white shadow-2xl print:shadow-none relative"
          >
            {/* Decorative Border */}
            <div className="absolute inset-4 border-2 border-emerald-200 pointer-events-none"></div>
            <div className="absolute inset-6 border border-emerald-100 pointer-events-none"></div>

            {/* Medical Corner Designs */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-emerald-600"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-emerald-600"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-emerald-600"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-emerald-600"></div>

            {/* Main Content */}
            <div className="p-16 print:p-12">
              {/* Medical Symbol */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Organization Name */}
              <div className="text-center mb-4">
                <h1 className="text-4xl font-serif font-bold text-gray-800 tracking-wide">
                  {design?.company_name || "Medical Institution"}
                </h1>
                <div className="w-24 h-px bg-emerald-400 mx-auto my-3"></div>
                {design?.tagline && (
                  <p className="text-sm text-gray-500 italic">
                    {design.tagline}
                  </p>
                )}
              </div>

              {/* Certificate Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif text-emerald-700 uppercase tracking-wider">
                  {design?.heading || "Certificate of Excellence"}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  in Healthcare Education
                </p>
              </div>

              {/* Recipient Section */}
              <div className="text-center my-10">
                <p className="text-gray-600 text-lg mb-2">
                  This certificate is awarded to
                </p>
                <div className="inline-block border-b-4 border-emerald-500 px-12 pb-2 mb-2">
                  <p className="text-4xl font-serif font-bold text-gray-800">
                    {meta?.user?.name}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Employee ID: {meta?.user?.employee_id} | {meta?.user?.email}
                </p>
              </div>

              {/* Achievement */}
              <div className="text-center mb-10">
                <p className="text-gray-600">
                  for successfully completing the course in
                </p>
                <p className="text-2xl font-bold text-emerald-700 my-3">
                  {meta?.context?.title}
                </p>
                <div className="inline-block bg-emerald-50 px-4 py-1 rounded-full">
                  <p className="text-sm font-medium text-emerald-600 capitalize">
                    {meta?.context?.type} Certification Program
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-6 my-10">
                <div className="text-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-bold text-emerald-700">
                    {meta?.result?.percentage}%
                  </div>
                  <div className="text-xs text-gray-500 uppercase mt-1">
                    Achievement Score
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {meta?.result?.score}/{meta?.questions?.total} Correct
                  </div>
                </div>

                <div className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-bold text-blue-700">
                    {meta?.result?.status === "passed" ? "PASS" : "COMPLETED"}
                  </div>
                  <div className="text-xs text-gray-500 uppercase mt-1">
                    Final Status
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Passing: {meta?.result?.passing_score}%
                  </div>
                </div>

                <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-bold text-amber-700">
                    {Math.floor(meta?.time?.time_taken_seconds / 60)}:
                    {String(
                      Math.floor(meta?.time?.time_taken_seconds % 60),
                    ).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500 uppercase mt-1">
                    Time Taken
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Attempt #{meta?.attempt?.attempt_id}
                  </div>
                </div>
              </div>

              {/* Assessment Details */}
              <div className="grid grid-cols-2 gap-4 my-8 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Assessment Date
                  </div>
                  <div className="text-sm font-medium text-gray-700 mt-1">
                    {meta?.time?.submitted_at
                      ? new Date(meta.time.submitted_at).toLocaleDateString()
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Completed On
                  </div>
                  <div className="text-sm font-medium text-gray-700 mt-1">
                    {meta?.time?.submitted_at
                      ? new Date(meta.time.submitted_at).toLocaleTimeString()
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Questions Attempted
                  </div>
                  <div className="text-sm font-medium text-gray-700 mt-1">
                    {meta?.questions?.attempted}/{meta?.questions?.total}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Submit Method
                  </div>
                  <div className="text-sm font-medium text-gray-700 mt-1 capitalize">
                    {meta?.attempt?.submit_type}
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="grid grid-cols-2 gap-12 mt-10 pt-6">
                <div className="text-center">
                  <div className="border-b-2 border-gray-300 w-48 mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-gray-700 mt-3">
                    {design?.signer_name || "Authorized Signatory"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {design?.signer_designation || "Medical Director"}
                  </p>
                </div>
                <div className="text-center">
                  <div className="border-b-2 border-gray-300 w-48 mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-gray-700 mt-3">
                    Date of Issue
                  </p>
                  <p className="text-xs text-gray-400">
                    {issued_at ? new Date(issued_at).toLocaleDateString() : "-"}
                  </p>
                </div>
              </div>

              {/* Footer with Certificate ID */}
              <div className="text-center mt-10 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-mono">
                  Certificate Verification ID: {certificate_id}
                </p>
                {design?.footer_text && (
                  <p className="text-xs text-gray-400 mt-1">
                    {design.footer_text}
                  </p>
                )}
                <p className="text-xs text-gray-300 mt-3">
                  This certificate is digitally generated and valid without
                  signature
                </p>
              </div>
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <svg
                className="w-64 h-64"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Social Share */}
        {share_links && (
          <div className="flex justify-center gap-4 mt-8 pb-10 print:hidden">
            <button
              onClick={() => window.open(share_links.whatsapp, "_blank")}
              className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
            >
              Share on WhatsApp
            </button>
            <button
              onClick={() => window.open(share_links.facebook, "_blank")}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors duration-200 shadow-md"
            >
              Share on Facebook
            </button>
            <button
              onClick={() => window.open(share_links.linkedin, "_blank")}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors duration-200 shadow-md"
            >
              Share on LinkedIn
            </button>
          </div>
        )}
      </PageBody>
    </PageLayout>
  );
};

export default Certificate;
