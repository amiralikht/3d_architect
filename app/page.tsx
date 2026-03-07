import Navbar from "@/components/Navbar";
import { Button } from 'primereact/button';

export default function Home() {
  return (
  <>
    <Navbar/>
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-black">
      <Button label="Check" icon="pi pi-check" className="bg-red-500" />
    </div>
  </>
  );
}
