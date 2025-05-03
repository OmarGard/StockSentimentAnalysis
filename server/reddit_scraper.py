import praw
import os
from dotenv import load_dotenv
import torch
from transformers import pipeline

load_dotenv()

os.environ["TOKENIZERS_PARALLELISM"] = "false"

reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT"),
)

model_id = "distilbert/distilbert-base-uncased-finetuned-sst-2-english"

def search_threads(stock_symbol: str):
    subreddit = reddit.subreddit("all")
    threads = []
    sentiment_analyzer = pipeline("sentiment-analysis", model=model_id, device=0 if torch.cuda.is_available() else -1)

    for submission in subreddit.search(stock_symbol, limit=10):
        # Analyze sentiment of the submission title and text
        title_sentiment = sentiment_analyzer(submission.title)
        text_sentiment = sentiment_analyzer(submission.selftext[:512]) if submission.selftext else None
        # Combine the sentiment results
        combined_sentiment = {
            "title": title_sentiment[0],
            "text": text_sentiment[0] if text_sentiment else None
        }
        # Check if the sentiment is positive or negative
        if combined_sentiment["title"]["label"] == "POSITIVE" and (text_sentiment is None or text_sentiment[0]["label"] == "POSITIVE"):
            sentiment = "Positive"
        elif combined_sentiment["title"]["label"] == "NEGATIVE" and (text_sentiment is None or text_sentiment[0]["label"] == "NEGATIVE"):
            sentiment = "Negative"
        else:
            sentiment = "Mixed"
        # Add the submission to the threads list
        threads.append({
            "id": submission.id,
            "title": submission.title,
            "text": submission.selftext,
            "score": submission.score,
            "comments": submission.num_comments,
            "url": submission.url,
            "sentiment": sentiment
        })

    return threads
