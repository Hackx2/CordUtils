import { useState } from "react";
import { Youtube } from "lucide-react";

// Components
import NotificationBox from "@/components/NotificationBox";
import Container from "@/components/Container";

export default function About() {
  const [showingNotification, set_showingNotification] = useState(true);// la la la

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 text-white">
      <title>CordUtils - About LMAO 💀</title>

      {showingNotification && (
        <NotificationBox
          message={`Uhh, this page is still under construction. <3`}
          status="warning"
          onClose={() => set_showingNotification(false)}
          className="max-w-[650px]"
        />
      )}

      <Container className="max-w-[1100px]">
        <h1 className="text-xl font-bold mb-1">./about-cordutils</h1>

        <p className="">Coming Soon</p>
        <div className="mt-4 flex items-center space-x-2">
          <Youtube size={24} />
          <span>YouTube: CordUtils Official</span>
        </div>
      </Container>
    </div>
  );
}
