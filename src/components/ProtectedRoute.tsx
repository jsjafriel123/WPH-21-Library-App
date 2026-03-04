import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/app/store";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isHydrated } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!isHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
