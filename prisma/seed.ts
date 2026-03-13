import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  console.log('Clearing existing data...')
  console.log('Creating/Updating user...')
  let user = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  })
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        phone: '555-0123',
        address: '123 Crave Street',
      },
    })
  }

  console.log('Creating restaurants and menus...')
  
  // Define restaurants data
  const restaurantsData = [
    {
      name: "Burger Joint",
      cuisine: "American • Burgers • Fast Food",
      rating: 4.8,
      deliveryTime: "25-35 min",
      priceRange: "₹₹",
      imageURL: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      items: [
        { name: "Classic Cheeseburger", description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce.", price: 299, imageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: false, category: "Mains" },
        { name: "Crispy Fries", description: "Golden, crispy fries perfectly seasoned with sea salt.", price: 129, imageURL: "https://images.unsplash.com/photo-1576107232684-1279f3908594?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Sides" },
        { name: "Onion Rings", description: "Thick-cut onion rings battered and fried to golden perfection.", price: 149, imageURL: "https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Sides" }
      ]
    },
    {
      name: "Sushi Master",
      cuisine: "Japanese • Sushi • Asian",
      rating: 4.9,
      deliveryTime: "40-50 min",
      priceRange: "₹₹₹",
      imageURL: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      items: [
        { name: "Dragon Roll", description: "Eel and cucumber topped with avocado and sweet eel sauce.", price: 499, imageURL: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: false, category: "Sushi Rolls" },
        { name: "Spicy Tuna Roll", description: "Fresh tuna mixed with spicy mayo and cucumber.", price: 349, imageURL: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: false, category: "Sushi Rolls" },
        { name: "Miso Soup", description: "Traditional Japanese soup with tofu, seaweed, and scallions.", price: 99, imageURL: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Starters" }
      ]
    },
    {
      name: "Pizza Napoli",
      cuisine: "Italian • Pizza • Pasta",
      rating: 4.7,
      deliveryTime: "30-45 min",
      priceRange: "₹₹",
      imageURL: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      items: [
        { name: "Margherita Pizza", description: "Classic pizza with San Marzano tomatoes, fresh mozzarella, and basil.", price: 399, imageURL: "https://images.unsplash.com/photo-1573033621183-500b0f49ba62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Pizzas" },
        { name: "Pepperoni Pizza", description: "Tomato sauce, mozzarella, and generous amounts of premium pepperoni.", price: 449, imageURL: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: false, category: "Pizzas" },
        { name: "Garlic Bread", description: "Toasted baguette slices with garlic butter and herbs.", price: 149, imageURL: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Sides" }
      ]
    },
    {
      name: "Green Bowl Health",
      cuisine: "Healthy • Salads • Vegan",
      rating: 4.6,
      deliveryTime: "20-30 min",
      priceRange: "₹₹",
      imageURL: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      items: [
        { name: "Quinoa Power Bowl", description: "Organic quinoa, roasted sweet potatoes, kale, avocado, and tahini dressing.", price: 349, imageURL: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Bowls" },
        { name: "Acai Berry Bowl", description: "Blended acai topped with granola, fresh berries, banana, and coconut flakes.", price: 299, imageURL: "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Desserts" },
        { name: "Green Detox Smoothie", description: "Spinach, green apple, cucumber, ginger, and lemon juice.", price: 199, imageURL: "https://images.unsplash.com/photo-1610970881699-44a5587ce574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Drinks" }
      ]
    },
    {
      name: "Taco Fiesta",
      cuisine: "Mexican • Tacos • Burritos",
      rating: 4.5,
      deliveryTime: "20-35 min",
      priceRange: "₹",
      imageURL: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      items: [
        { name: "Al Pastor Tacos", description: "Three soft corn tortillas with marinated pork, pineapple, onion, and cilantro.", price: 249, imageURL: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: false, category: "Tacos" },
        { name: "Veggie Burrito", description: "Large flour tortilla filled with black beans, rice, grilled peppers, and guacamole.", price: 279, imageURL: "https://images.unsplash.com/photo-1626804475297-41609ea005eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Burritos" },
        { name: "Nachos Supreme", description: "Crispy tortilla chips loaded with melted cheese, jalapeños, pico de gallo, and sour cream.", price: 199, imageURL: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Sides" }
      ]
    },
    {
      name: "Sweet Tooth Bakery",
      cuisine: "Desserts • Bakery • Coffee",
      rating: 4.8,
      deliveryTime: "15-25 min",
      priceRange: "₹₹",
      imageURL: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      items: [
        { name: "Chocolate Lava Cake", description: "Warm, rich chocolate cake with a molten chocolate center.", price: 199, imageURL: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Desserts" },
        { name: "New York Cheesecake", description: "Classic creamy cheesecake with a graham cracker crust.", price: 229, imageURL: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Desserts" },
        { name: "Iced Caramel Macchiato", description: "Espresso combined with vanilla-flavored syrup, milk, and ice, topped with a caramel drizzle.", price: 179, imageURL: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", isVegetarian: true, category: "Drinks" }
      ]
    }
  ];

  for (const rd of restaurantsData) {
    const { items, ...restData } = rd;
    
    const restaurant = await prisma.restaurant.create({
      data: restData
    });

    for (const item of items) {
      await prisma.menuItem.create({
        data: {
          ...item,
          restaurantId: restaurant.id
        }
      });
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
