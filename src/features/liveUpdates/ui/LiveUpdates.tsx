import { useState } from "react";
import { useWebSocketPrices } from "../lib/hooks/useWebSocket";
import type { PriceData } from "@features/liveUpdates/ui/LiveUpdates.types";
import { getPriceDirectionSymbol, formatPrice, formatChange } from "@features/liveUpdates/lib/helpers";

import { tableColumns } from "@features/liveUpdates/config/tableColumns";

export function LiveUpdates() {
  const [sortBy, setSortBy] = useState<keyof PriceData>("symbol");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");

  const { priceData, connectionStatus, reconnect, pairCount } = useWebSocketPrices();

  const handleSort = (key: keyof PriceData) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
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

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "green";
      case "connecting":
        return "yellow";
      case "error":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>Crypto Trading Dashboard</h1>
            <div style={{ backgroundColor: getConnectionColor() }}>{connectionStatus.toUpperCase()}</div>
            {connectionStatus !== "connected" && <button onClick={reconnect}>Reconnect</button>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Filter symbols..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div>{pairCount} pairs loaded</div>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                {tableColumns.map(({ key, label }) => (
                  <th key={key} onClick={() => handleSort(key as keyof PriceData)}>
                    <div>
                      {label}
                      {sortBy === key && <span>{sortOrder === "asc" ? "↑" : "↓"}</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((data) => (
                <tr key={data.symbol}>
                  <td>
                    <div>
                      <span>{data.symbol}</span>
                      <span>{getPriceDirectionSymbol(data.priceDirection)}</span>
                    </div>
                  </td>
                  <td>{formatPrice(data.price)}</td>
                  <td>{formatChange(data.change24h)}</td>
                  <td>{formatChange(data.changePercent24h, true)}</td>
                  <td>{data.volume24h.toLocaleString()}</td>
                  <td>{formatPrice(data.high24h)}</td>
                  <td>{formatPrice(data.low24h)}</td>
                  <td>{formatPrice(data.vwap24h)}</td>
                  <td>{formatPrice(data.bid)}</td>
                  <td>{formatPrice(data.ask)}</td>
                  <td>{formatPrice(data.spread)}</td>
                  <td>{data.spreadPercent.toFixed(3)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedData.length === 0 && (
          <div>{pairCount === 0 ? "Loading data..." : "No symbols match your filter"}</div>
        )}

        <div>Last update: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
