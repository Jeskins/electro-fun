// components/tokens/TokenList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Avatar,
  Tabs,
  TabsList,
  TabsTrigger,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { ArrowUp, ArrowDown, Star, ChevronDown, ChevronUp } from "lucide-react";

type SortKey = "price" | "change" | "volume" | "marketCap";
type SortDirection = "asc" | "desc";

interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  volume: number;
  marketCap: number;
  imageUrl: string;
}

interface TokenListProps {
  initialTokens: Token[];
}

export function TokenList({ initialTokens }: TokenListProps) {
  const [tokens, setTokens] = useState(initialTokens);
  const [sortKey, setSortKey] = useState<SortKey>("volume");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [timeframe, setTimeframe] = useState("24h");
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (sortKey === "change") {
      aValue = a.priceChange;
      bValue = b.priceChange;
    }

    if (sortDirection === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Tokens</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Timeframe:
          </span>
          <Select defaultValue="24h" onValueChange={setTimeframe}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Token</TableHead>
              <TableHead
                className="text-right cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center justify-end gap-1">
                  Price
                  {sortKey === "price" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer"
                onClick={() => handleSort("change")}
              >
                <div className="flex items-center justify-end gap-1">
                  {timeframe === "24h" ? "24h %" : timeframe + " %"}
                  {sortKey === "change" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer"
                onClick={() => handleSort("volume")}
              >
                <div className="flex items-center justify-end gap-1">
                  Volume
                  {sortKey === "volume" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer"
                onClick={() => handleSort("marketCap")}
              >
                <div className="flex items-center justify-end gap-1">
                  Market Cap
                  {sortKey === "marketCap" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-right">Buy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleFavorite(token.id)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        favorites.includes(token.id)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/tokens/${token.symbol}`}
                    className="flex items-center gap-3"
                  >
                    <Avatar className="h-8 w-8">
                      <img src={token.imageUrl} alt={token.name} />
                    </Avatar>
                    <div>
                      <div className="font-medium">${token.symbol}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {token.name}
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {token.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    token.priceChange >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <div className="flex items-center justify-end gap-1">
                    {token.priceChange >= 0 ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {Math.abs(token.priceChange).toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  ${token.volume.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${token.marketCap.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/tokens/${token.symbol}/buy`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    >
                      Buy
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TokenList;
