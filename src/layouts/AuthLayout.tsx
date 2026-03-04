import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-25">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
