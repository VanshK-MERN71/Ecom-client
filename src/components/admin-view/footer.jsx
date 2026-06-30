import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 mt-20">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Company */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4">
              Estimazable
            </h2>

            <p className="text-gray-400 leading-7">
              Discover premium products at unbeatable prices. Shop confidently
              with secure payments, fast delivery, and exceptional customer
              support.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[
                FaFacebookF,
                FaTwitter,
                FaInstagram,
                FaLinkedinIn,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-all duration-300 hover:scale-110"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                "Home",
                "Shop",
                "Categories",
                "About",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Customer Service
            </h3>

            <ul className="space-y-3">
              {[
                "My Account",
                "Track Order",
                "Wishlist",
                "Returns",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">
              Newsletter
            </h3>

            <p className="text-gray-400 mb-4">
              Subscribe to receive latest offers and updates.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 outline-none focus:border-orange-500"
              />

              <button className="bg-orange-500 hover:bg-orange-600 py-3 rounded-md font-medium transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-5">

            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Estimazable. All Rights Reserved.
            </p>

            {/* Payment Icons */}
            <div className="flex gap-4 text-4xl text-gray-300">
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcPaypal />
              <FaCcAmex />
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;