import { Route, Navigate } from "react-router-dom";
import SalesLayout from "../layout/SalesLayout";
import WorkInProgress from "./ModuleProgress";
import Dashboard from "../pages/dashboad/Dashboard";
import Levels from "../pages/levels/Levels";
import LevelDetails from "../pages/levels/components/LevelDetails";
import Quize from "../pages/quize/Quize";
import QuizeResult from "../pages/quize/QuizeResult";
import Certificate from "../pages/certificate/Certificate";
import ProgressStats from "../pages/progress/ProgressStats";
import Profile from "../pages/profile/Profile";
import ProfileDetails from "../pages/profile/components/ProfileDetails";
import ChangePassword from "../pages/profile/components/ChangePassword";
import Chapters from "../pages/chapters/Chapters";
import Modules from "../pages/modules/Modules";
import Topics from "../pages/topics/Topic";
import Units from "../pages/topics/Units";
import Exam from "../pages/exam/Exam";
import ProtectedRoute from "./ProtectedRoute";
import TopicContent from "../pages/topics/TopicContent";

const SalesRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<SalesLayout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* levels */}
      <Route path="levels" element={<Levels />} />
      <Route path="levels/:levelId" element={<LevelDetails />} />
      <Route path="levels/exam/:id" element={<Exam />} />

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

      {/* <Route path="topics/:topicId/units" element={<Units />} /> */}

      {/* quize */}
      <Route path="quiz/:topicId" element={<Quize />} />
      <Route path="quiz/result" element={<QuizeResult />} />

      {/*certificate  */}
      <Route path="certificate" element={<Certificate />} />

      {/*progress  */}
      <Route path="progress" element={<ProgressStats />} />

      {/*profile  */}
      <Route path="profile" element={<Profile />} />
      <Route path="profile/details" element={<ProfileDetails />} />
      <Route path="change-password" element={<ChangePassword />} />

      <Route path="*" element={<WorkInProgress />} />
    </Route>
  </Route>
);

export default SalesRoutes;
