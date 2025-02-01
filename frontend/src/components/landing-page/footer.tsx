export const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white py-8 text-center mt-auto">
      <p className="lg:text-lg text-4xl">
        © {new Date().getFullYear()} Diamedic. All rights reserved.
      </p>
      <div className=" mt-4 space-x-6 lg:text-lg text-3xl">
        <a
          href="/privacy-policy"
          className="text-gray-300 hover:text-white transition duration-200"
        >
          Privacy Policy
        </a>
        <a
          href="/terms-and-conditions"
          className="text-gray-300 hover:text-white transition duration-200"
        >
          Terms & Conditions
        </a>
        <a
          href="/contact"
          className="text-gray-300 hover:text-white transition duration-200"
        >
          Contact
        </a>
      </div>
    </div>
  );
};
