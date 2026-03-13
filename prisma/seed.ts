import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  console.log('Creating user...')
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      phone: '555-0123',
      address: '123 Crave Street',
    },
  })

  console.log('Creating restaurants and menus...')
  
  // Burger Joint
  const burgerJoint = await prisma.restaurant.create({
    data: {
      name: "Burger Joint",
      cuisine: "American • Burgers • Fast Food",
      rating: 4.8,
      deliveryTime: "25-35 min",
      priceRange: "₹₹",
      imageURL: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      menuItems: {
        create: [
          {
            name: "Classic Cheeseburger",
            description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce.",
            price: 299,
            imageURL: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            isVegetarian: false,
            category: "Mains"
          },
          {
            name: "Crispy Fries",
            description: "Golden, crispy fries perfectly seasoned with sea salt.",
            price: 129,
            imageURL: "https://images.unsplash.com/photo-1576107232684-1279f3908594?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            isVegetarian: true,
            category: "Sides"
          }
        ]
      }
    }
  })

  // Sushi Master
  const sushiMaster = await prisma.restaurant.create({
    data: {
      name: "Sushi Master",
      cuisine: "Japanese • Sushi • Asian",
      rating: 4.9,
      deliveryTime: "40-50 min",
      priceRange: "₹₹₹",
      imageURL: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      menuItems: {
        create: [
          {
            name: "Dragon Roll",
            description: "Eel and cucumber topped with avocado and sweet eel sauce.",
            price: 499,
            imageURL: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            isVegetarian: false,
            category: "Sushi Rolls"
          },
          {
            name: "Spicy Tuna Roll",
            description: "Fresh tuna mixed with spicy mayo and cucumber.",
            price: 349,
            imageURL: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            isVegetarian: false,
            category: "Sushi Rolls"
          }
        ]
      }
    }
  })

  // Pizza Napoli
  const pizzaNapoli = await prisma.restaurant.create({
    data: {
      name: "Pizza Napoli",
      cuisine: "Italian • Pizza • Pasta",
      rating: 4.7,
      deliveryTime: "30-45 min",
      priceRange: "₹₹",
      imageURL: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      menuItems: {
        create: [
          {
            name: "Margherita Pizza",
            description: "Classic pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
            price: 399,
            imageURL: "https://images.unsplash.com/photo-1573033621183-500b0f49ba62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            isVegetarian: true,
            category: "Pizzas"
          },
          {
            name: "Pepperoni Pizza",
            description: "Tomato sauce, mozzarella, and generous amounts of premium pepperoni.",
            price: 449,
            imageURL: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            isVegetarian: false,
            category: "Pizzas"
          }
        ]
      }
    }
  })

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
