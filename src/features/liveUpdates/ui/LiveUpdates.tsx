import { useState } from "react";
import { useWebSocketPrices } from "../lib/hooks/useWebSocket";
import type { PriceData } from "@features/liveUpdates/ui/LiveUpdates.types";
import { tableColumns } from "@features/liveUpdates/config/tableColumns";
import { sortOptions } from "../config/sortOptions";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import {
  ConnectionStatus,
  Heading,
  HeadingText,
  InfoTable,
  InfoTableContainer,
  LastUpdate,
  LiveUpdatesWrapper,
  SearchBlock,
} from "./styles";
import { LiveCard } from "@entities/liveCard/ui/LiveCard";
import { useTheme } from "@shared/lib/hooks/useTheme";
import { PriceNotifications } from "@features/notifications/priceNotification/priceNotification";

export function LiveUpdates() {
  const { theme } = useTheme();
  const [sortBy, setSortBy] = useState<keyof PriceData>("volume24h");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 25;

  const { priceData, connectionStatus, reconnect, pairCount } = useWebSocketPrices();

  const handleSortChange = (value: string) => {
    const selectedOption = sortOptions.find((option) => option.value === value);
    setSortBy(value as keyof PriceData);
    setSortOrder(selectedOption?.defaultOrder as "asc" | "desc");
    setCurrentPage(0);
  };

  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(0);
  };

  const filteredAndSortedData = Object.values(priceData)
    .filter((data) => data.symbol.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const multiplier = sortOrder === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * multiplier;
      }
      return ((aValue as number) - (bValue as number)) * multiplier;
    });

  const pageCount = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredAndSortedData.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case "connected":
        return theme == "light" ? "#94E9B8" : "#30b353";
      case "connecting":
        return "#FF9500";
      case "error":
        return theme == "light" ? "#FF3B30" : "#b33030";
      default:
        return "#8E8E93";
    }
  };

  return (
    <LiveUpdatesWrapper $theme={theme}>
      <PriceNotifications
        priceData={priceData}
        theme={theme}
        defaultThreshold={5}
        maxNotifications={8}
        autoCloseDelay={6000}
        enableBrowserNotifications={true}
      />

      <div>
        <div>
          <Heading>
            <HeadingText>Crypto Trading Dashboard</HeadingText>
            <ConnectionStatus $theme={theme} style={{ backgroundColor: getConnectionColor() }}>
              {connectionStatus.toUpperCase()}
            </ConnectionStatus>
            {connectionStatus !== "connected" && <button onClick={reconnect}>Reconnect</button>}
          </Heading>

          <SearchBlock $theme={theme}>
            <input
              type="text"
              placeholder="Filter symbols..."
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(0);
              }}
            />
            <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button onClick={handleSortOrderToggle} title={`Sort ${sortOrder === "asc" ? "ascending" : "descending"}`}>
              {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
            </button>
          </SearchBlock>
        </div>

        <InfoTableContainer>
          <InfoTable $theme={theme}>
            <thead>
              <tr>
                {tableColumns.map(({ key, label }) => (
                  <th key={key}>
                    <div>{label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <LiveCard
                  key={data.symbol}
                  symbol={data.symbol}
                  spread={data.spread}
                  high24h={data.high24h}
                  price={data.price}
                  changePercent24h={data.changePercent24h}
                  change24h={data.change24h}
                  volume24h={data.volume24h}
                  low24h={data.low24h}
                  vwap24h={data.vwap24h}
                  ask={data.ask}
                  bid={data.bid}
                  spreadPercent={data.spreadPercent}
                  priceDirection={data.priceDirection}
                />
              ))}
            </tbody>
          </InfoTable>
        </InfoTableContainer>

        {filteredAndSortedData.length === 0 && (
          <div>{pairCount === 0 ? "Loading data..." : "No symbols match your filter"}</div>
        )}

        {pageCount > 1 && (
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            forcePage={currentPage}
          />
        )}

        <LastUpdate>Last update: {new Date().toLocaleTimeString()}</LastUpdate>
      </div>
    </LiveUpdatesWrapper>
  );
}
