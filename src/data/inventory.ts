export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  isVegetarian: boolean;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  imageURL: string;
  menu: MenuItem[];
}

export const restaurants: Restaurant[] = [
  {
    id: "rest_001",
    name: "Burger Joint",
    cuisine: "American • Burgers • Fast Food",
    rating: 4.8,
    deliveryTime: "25-35 min",
    priceRange: "₹₹",
    imageURL: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: "mi_001",
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce.",
        price: 299,
        imageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        isVegetarian: false,
        category: "Mains"
      },
      {
        id: "mi_002",
        name: "Crispy Fries",
        description: "Golden, crispy fries perfectly seasoned with sea salt.",
        price: 129,
        imageURL: "https://images.unsplash.com/photo-1576107232684-1279f3908594?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        isVegetarian: true,
        category: "Sides"
      }
    ]
  },
  {
    id: "rest_002",
    name: "Sushi Master",
    cuisine: "Japanese • Sushi • Asian",
    rating: 4.9,
    deliveryTime: "40-50 min",
    priceRange: "₹₹₹",
    imageURL: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: "mi_003",
        name: "Dragon Roll",
        description: "Eel and cucumber topped with avocado and sweet eel sauce.",
        price: 499,
        imageURL: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        isVegetarian: false,
        category: "Sushi Rolls"
      },
      {
        id: "mi_004",
        name: "Spicy Tuna Roll",
        description: "Fresh tuna mixed with spicy mayo and cucumber.",
        price: 349,
        imageURL: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        isVegetarian: false,
        category: "Sushi Rolls"
      }
    ]
  },
  {
    id: "rest_003",
    name: "Pizza Napoli",
    cuisine: "Italian • Pizza • Pasta",
    rating: 4.7,
    deliveryTime: "30-45 min",
    priceRange: "₹₹",
    imageURL: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: "mi_005",
        name: "Margherita Pizza",
        description: "Classic pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
        price: 399,
        imageURL: "https://images.unsplash.com/photo-1573033621183-500b0f49ba62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        isVegetarian: true,
        category: "Pizzas"
      },
      {
        id: "mi_006",
        name: "Pepperoni Pizza",
        description: "Tomato sauce, mozzarella, and generous amounts of premium pepperoni.",
        price: 449,
        imageURL: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        isVegetarian: false,
        category: "Pizzas"
      }
    ]
  },
  {
    id: "rest_004",
    name: "Green Bowl Health",
    cuisine: "Healthy • Salads • Vegan",
    rating: 4.6,
    deliveryTime: "20-30 min",
    priceRange: "₹₹",
    imageURL: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    menu: [
      {
        id: "mi_007",
        name: "Quinoa Power Bowl",
        description: "Organic quinoa, roasted sweet potatoes, kale, avocado, and tahini dressing.",
        price: 349,
        imageURL: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        isVegetarian: true,
        category: "Bowls"
      }
    ]
  }
];
