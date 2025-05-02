import praw
import os
from dotenv import load_dotenv
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

load_dotenv()

reddit = praw.Reddit(
    client_id=os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_SECRET"),
    user_agent=os.getenv("REDDIT_USER_AGENT"),
)


def search_threads(stock_symbol: str):
    subreddit = reddit.subreddit("all")
    threads = []
    for submission in subreddit.search(stock_symbol, limit=10):
        threads.append({
            "id": submission.id,
            "title": submission.title,
            "text": submission.selftext,
            "score": submission.score,
            "comments": submission.num_comments,
            "url": submission.url
        })


    return threads
