# StockSemtimentAnalysis
 This is a stock sentiment analysis app that gatheres Reddit threads and PolygonIO Financial data to perform sentiment analysis on stock market.

## Server

### Dependencies
- Python 3.12.5 

### Setup

1. Create an `.env`file with your credentials under the `/server` folder:
```
REDDIT_SECRET = <YOUR_REDDIT_SECRET>
REDDIT_CLIENT_ID = <YOUR_REDDIT_CLIENT_ID>
REDDIT_USER_AGENT = <YOUR_REDDIT_USER_AGENT>
POLYGON_API_KEY = <YOUR_POLYGON_IO_API_KEY>
OPENAI_API_KEY = <YOUR_OPENAI_API_KEY>
```

2. Open a terminal inside `/server`folder. Create a python virtual environment
```
python -m venv .venv
```

3. Install dependencied:
```bash
pip install -r requirements.txt
```

4. Run the server:
```
fastapi run main.py
```

## Client

### Dependencies
- NodeJS ^23.9.0

### Setup
1. Install dependencies:
```
npm i
```
2. Open a terminal on the `/client`folder and run the client:
````
npm start
````



