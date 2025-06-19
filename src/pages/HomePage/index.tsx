import { LiveUpdates } from "@features/liveUpdates/ui";
import { Navbar } from "@widgets/navbar";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <LiveUpdates />
    </>
  );
};
