import json
import random
import datetime

# --- CONFIGURATION ---
TOTAL_PRODUCTS = 25000
STARTING_ID = 100000  # Starting ID
OUTPUT_FILENAME = "bulk_products.js"

# Allowed Categories
CATEGORIES = [
    "snacks", "bestdeal", "combo", "grocery", "medicine", 
    "candle", "soapSampooDiterjent", "oil", "biscuit", 
    "colddrink", "dailyProduct", "education", "other"
]

# --- DATA POOLS FOR RANDOM GENERATION ---
BRANDS = [
    "Sunrise", "Tata", "Britannia", "Parle", "Lays", "Kurkure", "Dabur", 
    "Himalaya", "Patanjali", "Nestle", "Amul", "Coke", "Pepsi", "Kissan", 
    "Fortune", "Aashirvaad", "Sunlight", "Rin", "Surf Excel", "Classmate",
    "Haldiram", "Cadbury", "Nivea", "Dove", "Colgate"
]

ADJECTIVES = [
    "Premium", "Fresh", "Crunchy", "Spicy", "Classic", "Gold", "Royal", 
    "Tasty", "Healthy", "Organic", "Pure", "Instant", "Magic", "Super",
    "Delight", "Rich", "Creamy", "Zesty"
]

FLAVOURS = [
    "Masala", "Cream & Onion", "Salted", "Chocolate", "Vanilla", "Tomato",
    "Plain", "Spicy Chili", "Garlic", "Ginger", "Lemon", "Mint", "Mixed Fruit"
]

INGREDIENTS_POOL = [
    "Wheat Flour", "Sugar", "Edible Vegetable Oil", "Salt", "Spices", 
    "Milk Solids", "Cocoa Solids", "Emulsifiers", "Natural Flavors", 
    "Corn Starch", "Vitamin E", "Preservatives", "Water", "Acidity Regulators"
]

CONTAINER_TYPES = ["Pouch", "Bottle", "Box", "Tin", "Jar", "Packet", "Tube"]

# Category Structure
CATEGORY_MAPPING = {
    "snacks": {
        "chips": ["Potato Chips", "Banana Chips", "Nachos", "Rings"],
        "noodle": ["Masala Noodles", "Atta Noodles", "Hakka Noodles"],
        "namkeen": ["Bhujia", "Mixture", "Moong Dal", "Peanuts"]
    },
    "bestdeal": {
        "clearance": ["Family Pack", "Mega Saver", "Combo Set"],
        "flash sale": ["Mystery Box", "Gift Hamper"]
    },
    "combo": {
        "family pack": ["Breakfast Combo", "Snack Combo", "Monthly Grocery Kit"],
        "festive": ["Diwali Gift Pack", "Rakhi Hamper"]
    },
    "grocery": {
        "staples": ["Rice", "Dal", "Sugar", "Salt", "Besan"],
        "spices": ["Turmeric", "Chili Powder", "Cumin", "Coriander"]
    },
    "medicine": {
        "otc": ["Pain Balm", "Bandage", "Antiseptic Liquid", "Cough Syrup"],
        "supplements": ["Vitamin C", "Calcium Tablets", "Glucose"]
    },
    "candle": {
        "decorative": ["Scented Candle", "Tea Lights"],
        "utility": ["White Candle", "Emergency Candle"]
    },
    "soapSampooDiterjent": {
        "soap": ["Beauty Bar", "Lime Soap", "Neem Soap"],
        "shampoo": ["Anti-Dandruff", "Silky Shine"],
        "detergent power": ["Washing Powder", "Liquid Detergent"]
    },
    "oil": {
        "hair oil": ["Coconut Oil", "Almond Oil", "Amla Oil"],
        "food oil": ["Mustard Oil", "Sunflower Oil", "Soyabean Oil"],
        "body oil": ["Massage Oil", "Winter Care Oil"]
    },
    "biscuit": {
        "little packs": ["Glucose Biscuits", "Cream Biscuits", "Marie"],
        "big packs": ["Family Pack Cookies", "Rusks", "Crackers"]
    },
    "colddrink": {
        "cold drink": ["Cola", "Lemon Soda", "Orange Fizz", "Mango Drink"]
    },
    "dailyProduct": {
        "toothpaste": ["Red Paste", "Salt Paste", "Fresh Gel"],
        "tea": ["Strong Tea", "Green Tea", "Masala Chai"],
        "sauce": ["Tomato Ketchup", "Chilli Sauce"]
    },
    "education": {
        "stationery": ["Notebook", "Blue Pen Set", "Pencil Box", "Eraser"],
        "art": ["Sketch Pens", "Water Colors", "Drawing Book"]
    },
    "other": {
        "household": ["Mosquito Coil", "Matchbox", "Scrubber", "Tissue Paper"],
        "misc": ["Battery", "Bulb"]
    }
}

# --- HELPER FUNCTIONS ---

def get_random_timer():
    days_ahead = random.randint(1, 365)
    future_date = datetime.datetime.now() + datetime.timedelta(days=days_ahead)
    return future_date.strftime("%Y-%m-%dT%H:%M:%S")

def generate_complex_details(brand, name, sub_cat):
    """Generates the nested dictionary structure you requested."""
    
    # Pick 3-5 random ingredients
    ingredients = ", ".join(random.sample(INGREDIENTS_POOL, k=random.randint(3, 6)))
    
    # Generate Nutritional Info
    energy = random.randint(300, 600)
    protein = round(random.uniform(1.0, 15.0), 1)
    carbs = round(random.uniform(40.0, 80.0), 1)
    fat = round(random.uniform(5.0, 35.0), 1)
    sodium = random.randint(100, 900)

    # General Info
    details_obj = {
        "General": {
            "Brand": brand,
            "Type": sub_cat.title(),
            "Flavour": random.choice(FLAVOURS),
            "Pack of": str(random.randint(1, 6)),
            "Container Type": random.choice(CONTAINER_TYPES),
            "Maximum Shelf Life": f"{random.choice([3, 6, 9, 12, 18, 24])} Months",
            "Ingredients": ingredients,
            "Food Preference": random.choice(["Vegetarian", "Non-Vegetarian", "Vegan"])
        },
        "Warranty": {
            "Domestic Warranty": "NA",
            "Warranty Summary": "No Warranty",
            "Covered in Warranty": "Not Applicable"
        },
        "Nutritional Info (per 100g)": {
            "Energy": f"{energy} kcal",
            "Protein": f"{protein} g",
            "Carbohydrates": f"{carbs} g",
            "Fat": f"{fat} g",
            "Sodium": f"{sodium} mg"
        }
    }
    return details_obj

def generate_products():
    products = []
    current_id = STARTING_ID
    
    # Logic to ensure we get exactly TOTAL_PRODUCTS
    # We will loop until we hit the number
    
    while len(products) < TOTAL_PRODUCTS:
        # Pick a random category
        category = random.choice(CATEGORIES)
        
        # Get subcategories
        sub_cats_map = CATEGORY_MAPPING.get(category, {"general": ["Item"]})
        sub_cat_key = random.choice(list(sub_cats_map.keys()))
        
        # Get Item Base Name
        base_name = random.choice(sub_cats_map[sub_cat_key])
        
        # Generate Brand and Adjective
        brand = random.choice(BRANDS)
        adj = random.choice(ADJECTIVES)
        
        # Full Name
        full_name = f"{brand} {adj} {base_name}"
        
        # Pricing
        base_price = random.randint(10, 1000)
        discount = random.randint(0, int(base_price * 0.3)) # Max 30% discount
        final_price = base_price - discount
        
        # Quantity/Weight
        weight_options = ["50g", "100g", "250g", "500g", "1kg", "1L", "200ml", "1 Pack"]
        weight = random.choice(weight_options)

        # Generate the Complex Details Object
        complex_details = generate_complex_details(brand, full_name, sub_cat_key)

        product = {
            "id": current_id,
            "name": full_name,
            "price": final_price,
            "originalPrice": base_price,
            "delivery_time": "30 min",
            "message": random.choice(["", "new arrival", "bestseller", "fresh stock"]),
            "amount": weight,
            "thumbnail1": "",
            "thumbnail2": "",
            "thumbnail3": "",
            "category": category,
            "sub_category": sub_cat_key,
            "image": "", # Placeholder, or you can generate a path
            "little_details": f"Enjoy the taste of {brand}",
            "details": complex_details, # <-- THIS IS THE COMPLEX OBJECT
            "quantity": 1
        }

        # Special logic for 'bestdeal' (Timer)
        if category == "bestdeal":
            product["timer"] = get_random_timer()
            product["expiryDate"] = "December 2026"
            product["leftAmount"] = random.randint(1, 20)

        products.append(product)
        current_id += 1

        if len(products) % 5000 == 0:
            print(f"Generated {len(products)} products...")

    return products

# --- EXECUTION ---
print("Starting generation of 25,000 products...")
generated_data = generate_products()

# Format as JavaScript file content
js_content = "const packetProducts = " + json.dumps(generated_data, indent=2) + ";"

# Save to file
print(f"Saving to {OUTPUT_FILENAME}...")
with open(OUTPUT_FILENAME, "w", encoding="utf-8") as f:
    f.write(js_content)

print("Done! File created successfully.")