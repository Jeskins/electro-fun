// components/tokens/TokenCard.tsx
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  Avatar,
  Button,
} from "@/components/ui";
import { Star, ArrowUp, ArrowDown } from "lucide-react";

interface TokenCardProps {
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  volume: number;
  marketCap: number;
  imageUrl: string;
  isFavorite?: boolean;
}

export function TokenCard({
  symbol,
  name,
  price,
  priceChange,
  volume,
  marketCap,
  imageUrl,
  isFavorite = false,
}: TokenCardProps) {
  const isPriceUp = priceChange >= 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <img src={imageUrl} alt={name} />
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">${symbol}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-yellow-500"
        >
          <Star
            className={`h-4 w-4 ${
              isFavorite ? "fill-yellow-500 text-yellow-500" : ""
            }`}
          />
        </Button>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between items-baseline mb-4">
          <div className="text-2xl font-bold">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div
            className={`flex items-center ${
              isPriceUp ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPriceUp ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            <span className="font-medium">
              {Math.abs(priceChange).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Volume (24h)</p>
            <p className="font-medium">${volume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="font-medium">${marketCap.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-0">
        <Link href={`/tokens/${symbol}`} className="w-full">
          <Button
            variant="ghost"
            className="w-full rounded-none h-10 text-sm border-t border-gray-200 dark:border-gray-800"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default TokenCard;
