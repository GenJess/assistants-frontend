"use client";

import React, { useState } from "react";
import Chat from "../../components/chat";
import WidgetPanels from "../../components/widget-panels";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { getWeather } from "../../utils/weather";
import { analyzeTradeTiming, TradeAnalysis } from "../../utils/crypto";
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
    <main className="flex h-screen">
      <div className="flex flex-1 flex-col">
        <Chat functionCallHandler={functionCallHandler} />
      </div>
      <aside className="hidden w-80 overflow-y-auto border-l p-4 md:block">
        <WidgetPanels
          weatherData={weatherData}
          tradeAnalysis={tradeAnalysis}
          isEmpty={isEmpty}
        />
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed bottom-4 right-4 rounded-full p-3 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-4">
          <WidgetPanels
            weatherData={weatherData}
            tradeAnalysis={tradeAnalysis}
            isEmpty={isEmpty}
          />
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default FunctionCalling;
