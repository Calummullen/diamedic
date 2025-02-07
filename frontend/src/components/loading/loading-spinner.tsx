import Logo from "../../../public/logo.png";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-white">
      <img src={Logo} alt="Loading..." className="w-24 h-24 animate-spin" />
    </div>
  );
}
