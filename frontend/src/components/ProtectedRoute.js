import { Navigate } from 'react-router-dom';
// защищаем роут главной страницы от неавторизованных пользователей
export default function ProtectedRoute({ component, isLoggedIn }) {

  return isLoggedIn 
  ? component
  : <Navigate to="/sign-in" replace />
};
