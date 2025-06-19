import { LiveTitle } from "@shared/ui/liveTitle";
import { LiveUpdatesWrapper, LiveCardsWrapper } from "./styles";
import { LiveCard } from "@entities/liveCard/ui";

export const LiveUpdates = () => {
  return (
    <LiveUpdatesWrapper>
      <LiveTitle />
      <LiveCardsWrapper>
        <LiveCard categoryTitle={"Overview"} />
        <LiveCard categoryTitle={"Trending"} />
        <LiveCard categoryTitle={"Recently Added"} />
        <LiveCard categoryTitle={"Most Upvoted"} />
      </LiveCardsWrapper>
    </LiveUpdatesWrapper>
  );
};
