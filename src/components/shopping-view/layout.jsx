import { Outlet, Link } from "react-router-dom";
import { HousePlug, Mail, Phone, MapPin } from "lucide-react";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden min-h-screen">
      <ShoppingHeader />
      <main className="flex flex-col w-full pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
