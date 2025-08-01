import { Outlet } from "react-router-dom";

export default function BlankLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export { BlankLayout };
