"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";
import {
  analyzeTradeTiming,
  TradeAnalysis,
} from "../../utils/crypto";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

interface WeatherData {
  location?: string;
  temperature?: number;
  conditions?: string;
}

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [tradeAnalysis, setTradeAnalysis] = useState<TradeAnalysis[]>([]);
  const isEmpty = Object.keys(weatherData).length === 0;

  const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
    if (call?.function?.name === "get_weather") {
      const args = JSON.parse(call.function.arguments);
      const data = getWeather(args.location);
      setWeatherData(data);
      return JSON.stringify(data);
    }

    if (call?.function?.name === "analyze_trades") {
      const args = JSON.parse(call.function.arguments);
      const data = await analyzeTradeTiming(args.coinId, args.trades);
      setTradeAnalysis(data);
      return JSON.stringify(data);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget
            location={weatherData.location || "---"}
            temperature={weatherData.temperature?.toString() || "---"}
            conditions={weatherData.conditions || "Sunny"}
            isEmpty={isEmpty}
          />
          <pre>
            {tradeAnalysis.length
              ? JSON.stringify(tradeAnalysis, null, 2)
              : "No trade analysis"}
          </pre>
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
