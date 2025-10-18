

const products = [
    {
        id: 41001,
        name: "batasa",
        price_per_100gm: 7, // Base price for comparison
        mrp_per_100gm: 20, 
        category: "grocery",
        sub_category: "sweet",
        image: "",
        details: "",
        // 👇 NEW: Array of available weights and their prices
        available_weights: [
            { weight: "250 gm", price: 18 },
            { weight: "500 gm", price: 34 },
            { weight: "1 kg", price: 68}
        ],
        // Default values (will be updated by the UI)
        amount: "250 gm",
        price: 18,
        originalPrice: 20,
        delivery_time: "35 min",
        quantity: 1
    },
    {
        id: 41002,
        name: "Nakul dana",
        price_per_100gm: 7, 
        mrp_per_100gm: 20, 
        category: "grocery",
        sub_category: "sweet",
        image: "",
        details: "",
        available_weights: [
            { weight: "500 gm", price: 18 },
            { weight: "1 kg", price: 34 },
            { weight: "5 kg", price: 68 }
        ],
        amount: "500 gm",
        price: 18,
        originalPrice: null, // Example with a discount
        delivery_time: "35 min",
        quantity: 1
    },
    {
        id: 41003,
        name: "Crystal Sugar Chini",
        price_per_100gm: 6, 
        mrp_per_100gm: 20, 
        category: "grocery",
        sub_category: "sugar & jaggery",
        message: "new",
        leftAmount: "500 gm",
        image: "sugar.webp",
        details: "Refined crystal sugar for all your sweetening needs in tea, coffee, and desserts.",
        available_weights: [
            { weight: "500 gm", price: 26 },
            { weight: "1 kg", price: 52 }
        ],
        amount: "500 gm",
        price: 26,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
     {
        id: 41004,
        name: "michri",
        price_per_100gm: 9, 
        mrp_per_100gm: 20, 
        category: "grocery",
        sub_category: "sugar & jaggery",
        image: "",
        details: "",
        available_weights: [
            { weight: "500 gm", price: 44 },
            { weight: "1 kg", price: 88 }
        ],
        amount: "500 gm",
        price: 44,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
     {
        id: 41005,
        name: "Ankh Gunr",
        price_per_100gm: 7, 
        mrp_per_100gm: 20, 
        category: "grocery",
        sub_category: "sugar & jaggery",
        image: "",
        details: "",
        available_weights: [
            { weight: "500 gm", price: 34 },
            { weight: "1 kg", price: 67 }
        ],
        amount: "500 gm",
        price: 34,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },


//----------------------Dal------------- 
     {
        id: 42001,
        name: "mug dal",
        price_per_100gm: 16, 
        mrp_per_100gm: 20, 
        category: "grocery",
        sub_category: "dal",
        image: "dal.webp",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 32 },
            { weight: "500 gm", price: 80 },
            { weight: "1 kg", price: 158 }
        ],
        amount: "200gm",
        price: 32,
        originalPrice: null,
        delivery_time: "25 min",
        details:"Nice Dal",
        quantity: 1
    },
     {
        id: 42002,
        name: "musur dal",
        price_per_100gm: 12, 
        mrp_per_100gm: 20, 
        category: "grocery",
        sub_category: "dal",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 24 },
            { weight: "500 gm", price: 57 },
            { weight: "1 kg", price: 115 }
        ],
        amount: "200gm",
        price: 24,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
     {
        id: 42003,
        name: "khesari dal",
        price_per_100gm: 8, 
        category: "grocery",
        sub_category: "dal",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 16 },
            { weight: "500 gm", price: 39 },
            { weight: "1 kg", price: 78 }
        ],
        amount: "200gm",
        price: 16,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
     {
        id: 42004,
        name: "cholar dal",
        price_per_100gm: 12, 
        category: "grocery",
        sub_category: "dal",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 24 },
            { weight: "500 gm", price: 59 },
            { weight: "1 kg", price: 118 }
        ],
        amount: "200gm",
        price: 24,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    // {
    //     id: 41109,
    //     name: "cholar dal",
    //     price_per_100gm: 12, 
    //     category: "grocery",
    //     sub_category: "dal",
    //     image: "",
    //     details: "",
    //     available_weights: [
    //         { weight: "200 gm", price: 24 },
    //         { weight: "500 gm", price: 59 },
    //         { weight: "1 kg", price: 118 }
    //     ],
    //     amount: "200gm",
    //     price: 24,
    //     originalPrice: null,
    //     delivery_time: "25 min",
    //     quantity: 1
    // },



//-------------------Normal-
    {
        id: 43001,
        name: "chola",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 18 },
            { weight: "500 gm", price: 45 },
            { weight: "1 kg", price: 88 }
        ],
        amount: "200 gm",
        price: 18,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 43002,
        name: "mator",
        price_per_100gm: 7, 
        category: "grocery",
        sub_category: "",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 14 },
            { weight: "500 gm", price: 30 },
            { weight: "1 kg", price: 60 }
        ],
        amount: "200 gm",
        price: 18,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 43003,
        name: "kabil chola",
        price_per_100gm: 16, 
        category: "grocery",
        sub_category: "",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 32 },
            { weight: "500 gm", price: 78 },
            { weight: "1 kg", price:  156}
        ],
        amount: "200 gm",
        price: 32,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },


//-------------Chips-------------
    {
        id: 44001,
        name: "love chips",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 44002,
        name: "badminton chips",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 44003,
        name: "phuchka",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },



//--------Masala------
{
        id: 46001,
        name: "jeera",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 46002,
        name: "postu",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 46003,
        name: "",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 46004,
        name: "",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 46005,
        name: "",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },
    {
        id: 46006,
        name: "",
        price_per_100gm: 10, 
        category: "grocery",
        sub_category: "chips",
        image: "",
        details: "",
        available_weights: [
            { weight: "200 gm", price: 20 },
            { weight: "500 gm", price: 48 },
            { weight: "1 kg", price: 95 }
        ],
        amount: "200 gm",
        price: 10,
        originalPrice: null,
        delivery_time: "25 min",
        quantity: 1
    },



];