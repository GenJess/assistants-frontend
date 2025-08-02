import React from "react";
import WeatherWidget from "./weather-widget";
import { TradeAnalysis } from "../utils/crypto";

interface WeatherData {
  location?: string;
  temperature?: number;
  conditions?: string;
}

interface WidgetPanelsProps {
  weatherData: WeatherData;
  tradeAnalysis: TradeAnalysis[];
  isEmpty: boolean;
}

const WidgetPanels = ({ weatherData, tradeAnalysis, isEmpty }: WidgetPanelsProps) => {
  return (
    <div className="space-y-4">
      <WeatherWidget
        location={weatherData.location || "---"}
        temperature={weatherData.temperature?.toString() || "---"}
        conditions={weatherData.conditions || "Sunny"}
        isEmpty={isEmpty}
      />
      <pre className="rounded-md bg-gray-100 p-4 text-sm">
        {tradeAnalysis.length
          ? JSON.stringify(tradeAnalysis, null, 2)
          : "No trade analysis"}
      </pre>
    </div>
  );
};

export default WidgetPanels;
