import { useEffect } from "react";
import { subscribeToMessages } from "@app/providers/socket/socket"; // 👈
import { LiveTitle } from "@shared/ui/liveTitle";
import { LiveUpdatesWrapper, LiveCardsWrapper } from "./styles";
import { LiveCard } from "@entities/liveCard/ui";

export const LiveUpdates = () => {
  useEffect(() => {
    const handleMessage = (msg: any) => {
      console.log("💬 Message received in component:", msg);
    };

    subscribeToMessages(handleMessage);
  }, []);

  return (
    <LiveUpdatesWrapper>
      <LiveTitle />
      <LiveCardsWrapper>
        <LiveCard categoryTitle={"Balances"} />
        <LiveCard categoryTitle={"Orders"} />
        <LiveCard categoryTitle={"Executions"} />
        <LiveCard categoryTitle={"Positions"} />
      </LiveCardsWrapper>
    </LiveUpdatesWrapper>
  );
};
