import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout';
import {
  LoginPage,
  DashboardPage,
  ChatPage,
  PortfolioPage,
  ProfilePage,
  RecommendationsPage,
  AdminSupervisionPage,
  AdminUsersPage,
  AdminValidationPage,
  AdminSettingsPage,
} from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <Layout role="client">
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/chat"
          element={
            <Layout role="client">
              <ChatPage />
            </Layout>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Layout role="client">
              <PortfolioPage />
            </Layout>
          }
        />
        <Route
          path="/recommendations"
          element={
            <Layout role="client">
              <RecommendationsPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout role="client">
              <ProfilePage />
            </Layout>
          }
        />
        <Route
          path="/admin/supervision"
          element={
            <Layout role="admin">
              <AdminSupervisionPage />
            </Layout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <Layout role="admin">
              <AdminUsersPage />
            </Layout>
          }
        />
        <Route
          path="/admin/validation"
          element={
            <Layout role="admin">
              <AdminValidationPage />
            </Layout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Layout role="admin">
              <AdminSettingsPage />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout role="client">
              <DashboardPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
