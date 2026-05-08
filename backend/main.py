from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (React connect ஆக)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ PRODUCTS DATA (ONLY ONCE define pannunga)
products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 50000,
        "image": "https://m.media-amazon.com/images/I/71vFKBpKakL._SL1500_.jpg",
        "rating": 4
    },
    {
        "id": 2,
        "name": "Phone",
        "price": 20000,
        "image": "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
        "rating": 5
    },
    {
        "id": 3,
        "name": "Headphones",
        "price": 3000,
        "image": "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg",
        "rating": 3
    }
]

cart = []

# Routes
@app.get("/")
def home():
    return {"message": "API is running"}

@app.get("/products")
def get_products():
    return products

@app.get("/cart")
def get_cart():
    return cart

@app.post("/add-to-cart/{product_id}")
def add_to_cart(product_id: int):
    for p in products:
        if p["id"] == product_id:
            cart.append(p)
            return {"message": "Added to cart"}
    return {"error": "Product not found"}