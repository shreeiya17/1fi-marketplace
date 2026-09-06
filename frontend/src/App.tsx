import { Route, Routes } from "react-router-dom";
import { PhoneShell } from "./components/PhoneShell";
import { Shop } from "./pages/Shop";

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export default function App() {
  return (
    <PhoneShell>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="*" element={<Placeholder label="Not found" />} />
      </Routes>
    </PhoneShell>
  );
}