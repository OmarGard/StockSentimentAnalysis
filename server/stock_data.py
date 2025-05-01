from polygon import RESTClient
import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

load_dotenv()
client = RESTClient(os.getenv("POLYGON_API_KEY"))

def get_stock_enrichment(symbol: str):
    now = datetime.now(timezone.utc)
    from_date = (now - timedelta(days=30)).date().isoformat()
    to_date = now.date().isoformat()

    try:
        # 1. Get 1-month daily candles
        bars = client.get_aggs(
            ticker=symbol,
            multiplier=1,
            timespan="day",
            from_=from_date,
            to=to_date,
            limit=31  # 30 days of data
        )

        if not bars:
            return {"error": "No market data returned."}

        closes = [b.c for b in bars]
        volumes = [b.v for b in bars]
        highs = [b.h for b in bars]
        lows = [b.l for b in bars]
        dates = [b.t for b in bars]

        current_price = closes[-1]
        start_price = closes[0]
        price_change = round(current_price - start_price, 2)
        price_change_pct = round((price_change / start_price) * 100, 2)
        trend = "up" if price_change > 0 else "down" if price_change < 0 else "flat"

        avg_volume = sum(volumes) / len(volumes)
        max_high = max(highs)
        min_low = min(lows)
        volatility = round(max_high - min_low, 2)

        return {
            "trend": trend,
            "price_change_pct": price_change_pct,
            "price_change_abs": price_change,
            "start_price": start_price,
            "current_price": current_price,
            "average_daily_volume": round(avg_volume),
            "volatility_estimate": volatility,
            "price_series": closes,
            "volume_series": volumes,
            "dates": dates
        }

    except Exception as e:
        return {"error": str(e)}
