import { Routes, Route, Navigate } from "react-router"

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Layout from './components/layout/Layout';


function App() {

  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protégées */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/users" element={<UsersPage />} />
        <Route path="/users/create" element={<UserCreatePage />} />
        <Route path="/users/:id/edit" element={<UserEditPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/create" element={<ArticleCreatePage />} />
        <Route path="/articles/:id/edit" element={<ArticleEditPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/emotions" element={<EmotionsPage />} />
        <Route path="/emotions/:id" element={<EmotionDetailPage />} /> */}
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider >
  )
}

export default App
