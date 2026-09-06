import { Route, Routes } from "react-router-dom";
import { PhoneShell } from "./components/PhoneShell";

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
        <Route path="/" element={<Placeholder label="Shop page goes here" />} />
        <Route path="*" element={<Placeholder label="Not found" />} />
      </Routes>
    </PhoneShell>
  );
}