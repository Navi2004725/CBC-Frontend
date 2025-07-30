import Loader from "../components/loader";

export default function TestPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <Loader>Loader</Loader>
    </div>
  );
}
