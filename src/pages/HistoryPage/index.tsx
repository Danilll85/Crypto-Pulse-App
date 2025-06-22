import OHLCChart from "@entities/chart/ui/Chart";
import { Navbar } from "@widgets/navbar";
import { useParams } from "react-router-dom";

export const HistoryPage = () => {
  const { currencyName } = useParams();
  return (
    <>
      <Navbar />
      <OHLCChart currencyName={currencyName ?? "BTC"} />
    </>
  );
};
