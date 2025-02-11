import logo from "@assets/logo.svg";

export default function Logo({ className }: { className?: string }) {
  return <img className={className} src={logo} alt="logo" />;
}
