import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LandingPage } from "@/pages/LandingPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { AssessmentPage } from "@/pages/AssessmentPage";
import { LearningPage } from "@/pages/LearningPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AccountPage } from "@/pages/AccountPage";
import { MainLayout } from "@/components/layout/MainLayout";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Also check localStorage directly as a synchronous fallback.
  // This prevents redirect when React state hasn't propagated yet 
  // (e.g., right after login / between route navigations).
  const hasStoredSession = !!localStorage.getItem("genpath_user");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && !hasStoredSession) {
    return <Navigate to="/" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment"
        element={
          <ProtectedRoute>
            <AssessmentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning"
        element={
          <ProtectedRoute>
            <LearningPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
