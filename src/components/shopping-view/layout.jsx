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
      <footer className="bg-[#E8BAA3] pt-12 pb-6 mt-auto reveal">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/shop/home" className="flex items-center gap-2 mb-4">
                <HousePlug className="h-6 w-6" />
                <span className="font-bold text-lg">Ecommerce</span>
              </Link>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your one-stop shop for the latest trends and essentials. Quality products at great prices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><Link to="/shop/home" className="transition-colors duration-200 hover:text-gray-900">Home</Link></li>
                <li><Link to="/shop/listing" className="transition-colors duration-200 hover:text-gray-900">Products</Link></li>
                <li><Link to="/shop/search" className="transition-colors duration-200 hover:text-gray-900">Search</Link></li>
                <li><Link to="/shop/account" className="transition-colors duration-200 hover:text-gray-900">My Account</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><Link to="/shop/listing?category=men" className="transition-colors duration-200 hover:text-gray-900">Men</Link></li>
                <li><Link to="/shop/listing?category=women" className="transition-colors duration-200 hover:text-gray-900">Women</Link></li>
                <li><Link to="/shop/listing?category=kids" className="transition-colors duration-200 hover:text-gray-900">Kids</Link></li>
                <li><Link to="/shop/listing?category=electronics" className="transition-colors duration-200 hover:text-gray-900">Electronics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@ecommerce.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  123 Commerce St, NY
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-400/30 pt-6 text-center">
            <p className="text-sm text-gray-700">
              &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ShoppingLayout;
