// components/tokens/TokenChart.tsx
'use client';

import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Tabs,
  TabsList,
  TabsTrigger
} from '@/components/ui';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ChartData {
  timestamp: number;
  price: number;
}

interface TokenChartProps {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  high24h: number;
  low24h: number;
  chartData: ChartData[];
}

export function TokenChart({
  symbol,
  name,
  currentPrice,
  priceChange,
  priceChangePercentage,
  high24h,
  low24h,
  chartData
}: TokenChartProps) {
  const [timeframe, setTimeframe] = useState('24h');
  const isPriceUp = priceChangePercentage >= 0;
  
  // Format the timestamp for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    
    if (timeframe === '1h' || timeframe === '24h') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === '7d') {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  // Format price for tooltip
  const formatPrice = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">${symbol}</CardTitle>
            <CardDescription>{name}</CardDescription>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">
              {currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
            <div className={`flex items-center gap-1 font-medium ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
              {isPriceUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              {Math.abs(priceChangePercentage).toFixed(2)}% ({formatPrice(Math.abs(priceChange))})
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Tabs value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="1h">1H</TabsTrigger>
              <TabsTrigger value="24h">24H</TabsTrigger>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="px-0">
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPriceUp ? "#10b981" : "#ef4444"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPriceUp ? "#10b981" : "#ef4444"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatDate}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value}`}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip 
                formatter={(value: number) => [formatPrice(value), "Price"]}
                labelFormatter={(timestamp) => formatDate(timestamp)}
                contentStyle={{ 
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #e5e7eb"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={isPriceUp ? "#10b981" : "#ef4444"} 
                fillOpacity={1}
                fill="url(#colorPrice)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-wrap justify-between gap-4