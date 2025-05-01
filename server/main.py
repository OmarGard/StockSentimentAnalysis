from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from stock_data import get_stock_enrichment
from reddit_scraper import search_threads
from sentiment_analysis import summarize_sentiment

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Métodos permitidos
    allow_headers=["*"],  # Encabezados permitidos
)

@app.get("/analyze/{symbol}")
def analyze_stock(symbol: str):
    stock_info = get_stock_enrichment(symbol)
    reddit_data = search_threads(symbol)
    summary = summarize_sentiment(symbol, reddit_data, stock_info)
    return {
        "stock": stock_info,
        "reddit": reddit_data,
        "summary": summary
    }