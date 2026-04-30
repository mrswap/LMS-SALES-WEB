import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFaqs } from "../../../../redux/slice/coursePreviewSlice";
import Loader from "../../common/Loader";
import Error from "../../common/Error";
import {
  PageBody,
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight,
  PageLayout,
  PageSubtitle,
  PageTitle,
} from "../../common/layout";
import { useSearchParams } from "react-router-dom";

const Faq = () => {
  const dispatch = useDispatch();
  const [openItems, setOpenItems] = useState({});
  const { faqs, isLoading, isError, message } = useSelector(
    (state) => state.course,
  );

  const [searchParams] = useSearchParams();

  const sectionType = searchParams.get("type");
  const id = searchParams.get("id");

  //   useEffect(() => {
  //     dispatch(getFaqs());
  //   }, [dispatch]);

  useEffect(() => {
    if (sectionType && id) {
      dispatch(getFaqs({ sectionType, id }));
    }
  }, [dispatch, sectionType, id]);

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={message} />;
  }

  // Extract data from API response
  const faqsData = faqs?.data || faqs;
  const type = faqsData?.type; // Get the type (topic, etc.)
  const faqsList =
    faqsData?.faqs || (Array.isArray(faqs) ? faqs : faqs?.faqs || []);

  // Get type display name with proper formatting
  const getTypeDisplayName = (typeValue) => {
    if (!typeValue) return null;
    return typeValue.charAt(0).toUpperCase() + typeValue.slice(1);
  };

  return (
    <PageLayout>
      <PageHeader>
        <PageHeaderLeft>
          <PageTitle>Frequently Asked Questions</PageTitle>
          <PageSubtitle>
            Find answers to common questions about our courses
          </PageSubtitle>
        </PageHeaderLeft>
        <PageHeaderRight />
      </PageHeader>

      <PageBody>
        {faqsList && faqsList.length > 0 ? (
          <div className="">
            {/* Type Badge - Show at the top */}
            {getTypeDisplayName(type) && (
              <div className="mb-6 flex justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full shadow-sm">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 011.414.586l-7 7a2 2 0 01-2.828 0l-5-5A2 2 0 013 12V7a4 4 0 014-4z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 011.414.586l-7 7a2 2 0 01-2.828 0l-5-5A2 2 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">
                    Content Type:
                  </span>
                  <span className="text-sm font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md">
                    {getTypeDisplayName(type)}
                  </span>
                </div>
              </div>
            )}

            {faqsList.map((faq, index) => (
              <div
                key={faq.id || index}
                className="mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs"
              >
                {/* Question Header - Clickable */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left px-6 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1"
                  aria-expanded={openItems[index] || false}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-50 text-blue-700 font-semibold text-sm rounded-full border border-blue-200">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 pr-8">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          openItems[index] ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Answer Panel */}
                <div
                  id={`faq-answer-${index}`}
                  className={`transition-all duration-200 ease-in-out ${
                    openItems[index] ? "block" : "hidden"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    {/* Image Section */}
                    {faq.image && (
                      <div className="mb-5 pl-10">
                        <img
                          src={faq.image}
                          alt={`Illustration for ${faq.question}`}
                          className="rounded-lg max-w-full h-auto max-h-64 object-contain border border-gray-200"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.opacity = "0";
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    {/* Answer Content */}
                    <div className="pl-10 text-gray-700">
                      <div
                        className="faq-answer-content prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={createMarkup(faq.answer)}
                        style={{
                          wordWrap: "break-word",
                          lineHeight: "1.7",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              No FAQs available at the moment.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Please check back later for updates.
            </p>
          </div>
        )}
      </PageBody>
    </PageLayout>
  );
};

export default Faq;
