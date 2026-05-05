import { Route, Navigate } from "react-router-dom";
import SalesLayout from "../layout/SalesLayout";
import WorkInProgress from "./ModuleProgress";
import Dashboard from "../pages/dashboad/Dashboard";
import Levels from "../pages/levels/Levels";
import LevelDetails from "../pages/levels/components/LevelDetails";
import Quize from "../pages/quize/Quize";
import QuizeResult from "../pages/quize/QuizeResult";
import ProgressStats from "../pages/progress/ProgressStats";
import Profile from "../pages/profile/Profile";
import ProfileDetails from "../pages/profile/components/ProfileDetails";
import ChangePassword from "../pages/profile/components/ChangePassword";
import Chapters from "../pages/chapters/Chapters";
import Modules from "../pages/modules/Modules";
import Topics from "../pages/topics/Topic";
import Exam from "../pages/exam/Exam";
import ProtectedRoute from "./ProtectedRoute";
import TopicContent from "../pages/topics/TopicContent";
import AboutUs from "../pages/settings/about-us/AboutUs";
import TermsAndCondition from "../pages/settings/terms-and-condition/TermsAndCondition";
import Policy from "../pages/settings/privacy-policy/Policy";
import ContactUs from "../pages/settings/contact-us/ContactUs";
import Faq from "../pages/faq/Faq";
import Assessment from "../pages/assessment/Assessment";
import AuditLogsReports from "../pages/progress/components/AuditLogsReports";
import UserProgressReports from "../pages/progress/components/UserProgressReports";
import CertificationReports from "../pages/progress/components/CertificationReports";
import Certificate from "../pages/assessment/components/Certificate";
import ExamResult from "../pages/exam/ExamResult";
import ProtectedQuizExamRoute from "./ProtectedQuizExamRoute";
import Notification from "../common/noitification/Notification";

const SalesRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<SalesLayout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notification" element={<Notification />} />

      {/* levels */}
      <Route path="levels" element={<Levels />} />
      <Route path="levels/:levelId" element={<LevelDetails />} />

      {/* modules */}
      <Route path="modules/:moduleId" element={<Modules />} />

      {/* chapters */}
      <Route path="chapters/:chapterId" element={<Chapters />} />

      {/* topics */}
      <Route path="topics/:topicId" element={<Topics />} />
      <Route
        path="topics/:topicId/content/:contentId"
        element={<TopicContent />}
      />

      <Route path="faqs" element={<Faq />} />

      {/* quize */}
      {/* <Route path="quiz/:topicId" element={<Quize />} />
      <Route
        path="/quiz/result/:topicId/:attemptId"
        element={<QuizeResult />}
      /> */}
      {/* quize - Protected */}
      <Route
        path="quiz/:topicId"
        element={
          <ProtectedQuizExamRoute>
            <Quize />
          </ProtectedQuizExamRoute>
        }
      />
      <Route
        path="/quiz/result/:topicId/:attemptId"
        element={
          <ProtectedQuizExamRoute>
            <QuizeResult />
          </ProtectedQuizExamRoute>
        }
      />

      {/* exam */}
      {/* <Route path="exam/:topicId" element={<Exam />} />
      <Route path="/exam/result/:topicId/:attemptId" element={<ExamResult />} /> */}
      {/* exam - Protected */}
      <Route
        path="exam/:topicId"
        element={
          <ProtectedQuizExamRoute>
            <Exam />
          </ProtectedQuizExamRoute>
        }
      />
      <Route
        path="/exam/result/:topicId/:attemptId"
        element={
          <ProtectedQuizExamRoute>
            <ExamResult />
          </ProtectedQuizExamRoute>
        }
      />

      {/*progress  */}
      <Route path="progress" element={<ProgressStats />} />
      <Route path="audit-logs" element={<AuditLogsReports />} />
      <Route path="user-progress" element={<UserProgressReports />} />
      <Route path="certification" element={<CertificationReports />} />
      <Route path="certificate/:id" element={<Certificate />} />

      {/*assessment  */}
      <Route path="assessment" element={<Assessment />} />

      {/*profile  */}
      <Route path="profile" element={<Profile />} />
      <Route path="profile/details" element={<ProfileDetails />} />
      <Route path="change-password" element={<ChangePassword />} />

      {/*settings  */}
      <Route path="about-us" element={<AboutUs />} />
      <Route path="terms-conditions" element={<TermsAndCondition />} />
      <Route path="policy" element={<Policy />} />
      <Route path="contact-us" element={<ContactUs />} />

      <Route path="*" element={<WorkInProgress />} />
    </Route>
  </Route>
);

export default SalesRoutes;
