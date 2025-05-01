import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_sentiment(stock_symbol: str, reddit_data: list, stock_info: dict):
    content = f"""
    Stock Symbol: {stock_symbol}
    Description: {stock_info.get("description", "N/A")}
    Current Price: {stock_info.get("current_price", "N/A")}
    Start Price: {stock_info.get("start_price", "N/A")}
    Price Change: {stock_info.get("price_change_abs", "N/A")} ({stock_info.get("price_change_pct", "N/A")}%)
    Trend: {stock_info.get("trend", "N/A")}
    Volatility Estimate: {stock_info.get("volatility_estimate", "N/A")}
    Average Daily Volume: {stock_info.get("average_daily_volume", "N/A")}

    Reddit Discussions:
    {''.join([f'Title: {d["title"]}\nContent: {d["text"]}\n\n' for d in reddit_data])}

    Based on the above stock data and Reddit discussions, provide a detailed sentiment analysis for {stock_symbol}.
    """
    response = openai.chat.completions.create(
        messages=[{"role": "user", "content": content}],
        model="gpt-4",
    )
    return response.choices[0].message.content.strip()
