import { Route, Navigate } from "react-router-dom";
import SalesLayout from "../layout/SalesLayout";
import WorkInProgress from "./ModuleProgress";
import Dashboard from "../pages/dashboad/Dashboard";
import Levels from "../pages/levels/Levels";
import LevelDetails from "../pages/levels/components/LevelDetails";

const SalesRoutes = (
  <Route
  //   element={<ProtectedRoute />}
  >
    <Route path="/" element={<SalesLayout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* levels */}
      <Route path="levels" element={<Levels />} />
      <Route path="levels/:id" element={<LevelDetails />} />

      <Route path="*" element={<WorkInProgress />} />
    </Route>
  </Route>
);

export default SalesRoutes;
