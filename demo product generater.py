import json
import random
import datetime
from faker import Faker

# Initialize Faker
fake = Faker()

# --- Helper Data (Simplified for 'bestdeal' only) ---
bestdeal_subcategories = ["featured", "clearance", "flash sale", "limited time"]
amounts = ["100g", "250g", "500g", "1kg", "1L", "6 pack"]
# --------------------

def generate_product(id_num):
    # Get a random sub-category *only* from the bestdeal list
    sub_category = random.choice(bestdeal_subcategories)

    # Generate realistic prices
    price = round(random.uniform(10.0, 200.0), 2)
    original_price = round(price * random.uniform(1.1, 1.5), 2)

    return {
        "id": 21002 + id_num,
        "name": fake.catch_phrase(),
        "price": price,
        "originalPrice": original_price,
        "delivery_time": random.choice(["30 min", "45 min", "1 hour"]),
        "message": random.choice(["", "10% OFF", "Buy 1 Get 1"]),
        "timer": (datetime.datetime.now() + datetime.timedelta(days=random.randint(1, 30))).isoformat(),
        "amount": random.choice(amounts),
        # --- FIXED LINES ---
        "thumbnail1": fake.image_url(width=100, height=100),
        "thumbnail2": fake.image_url(width=100, height=100),
        "thumbnail3": fake.image_url(width=100, height=100),
        # -------------------
        "category": "bestdeal",  # Hardcoded category
        "sub_category": sub_category, # Sub-category from the 'bestdeal' list
        "image": f"product_images/{sub_category.replace(' ', '_')}/{fake.slug()}.jpg",
        "little_details": fake.bs(),
        "details": fake.text(max_nb_chars=200),
        "quantity": 1
    }

# --- Generate 20,000 Products ---
products = []
for i in range(20000):
    products.append(generate_product(i))

# --- Save to a file ---
with open('products_bestdeal.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2)

print('Successfully generated 20,000 "bestdeal" products and saved to products_bestdeal.json')