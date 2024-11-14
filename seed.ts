const { PrismaClient, Category } = require("@prisma/client");
const bcrypt = require("bcrypt");

const db = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("@Password123", 10); // Hashing the password

  await db.user.create({
    data: {
      email: "admin@gymstore.com",
      username: "admin",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });

  console.log("Admin user created.");

  const products = [
    {
      name: "Men Gym T-Shirt",
      description: "Breathable cotton t-shirt for gym workouts.",
      price: 19.99,
      sku: "GYM-T001",
      category: "MEN",
      fit: "Regular",
      colors: {
        create: [
          {
            colorName: "Black",
            images: [
              "/Products/image1_black.webp",
              "/Products/image2_black.webp",
            ],
          },
          {
            colorName: "Gray",
            images: [
              "/Products/image1_gray.webp",
              "/Products/image2_gray.webp",
            ],
          },
        ],
      },
    },
    {
      name: "Women Gym Leggings",
      description: "High-performance leggings for women.",
      price: 34.99,
      sku: "GYM-L001",
      category: "WOMEN",
      fit: "Slim",
      colors: {
        create: [
          {
            colorName: "Black",
            images: [
              "/Products/image1_black_leggings.webp",
              "/Products/image2_black_leggings.webp",
            ],
          },
          {
            colorName: "Blue",
            images: [
              "/Products/image1_blue_leggings.webp",
              "/Products/image2_blue_leggings.webp",
            ],
          },
        ],
      },
    },
    {
      name: "Gym Resistance Bands",
      description: "Set of resistance bands for strength training.",
      price: 29.99,
      sku: "GYM-RB001",
      category: "ACCESSORIES",
      fit: "N/A",
      colors: {
        create: [
          {
            colorName: "Multi-color",
            images: [
              "/Products/image1_resistance.webp",
              "/Products/image2_resistance.webp",
            ],
          },
        ],
      },
    },
    {
      name: "Fitness Shorts",
      description: "Comfortable shorts for gym workouts.",
      price: 24.99,
      sku: "GYM-S002",
      category: "MEN",
      fit: "Regular",
      colors: {
        create: [
          {
            colorName: "Black",
            images: ["/Products/image1_fitness_shorts.webp"],
          },
          {
            colorName: "Blue",
            images: [
              "/Products/image2_fitness1_shorts.webp",
              "/Products/image2_fitness2_shorts.webp",
              "/Products/image2_fitness3_shorts.webp",
            ],
          },
        ],
      },
    },
    {
      name: "Women Sports Bra",
      description: "Supportive sports bra for high-impact workouts.",
      price: 29.99,
      sku: "GYM-B001",
      category: "WOMEN",
      fit: "Fitted",
      colors: {
        create: [
          {
            colorName: "Black",
            images: [
              "/Products/image1_sports_bra1.webp",
              "/Products/image1_sports_bra2.webp",
              "/Products/image1_sports_bra3.webp",
            ],
          },
          {
            colorName: "Red",
            images: [
              "/Products/image2_sports_bra1.webp",
              "/Products/image2_sports_bra2.webp",
              "/Products/image2_sports_bra3.webp",
            ],
          },
        ],
      },
    },
    {
      name: "Yoga Mat",
      description: "Non-slip yoga mat for home workouts.",
      price: 39.99,
      sku: "GYM-YM001",
      category: "ACCESSORIES",
      fit: "N/A",
      colors: {
        create: [
          {
            colorName: "Green",
            images: [
              "/Products/image1_yoga1_mat.webp",
              "/Products/image1_yoga2_mat.jpg",
            ],
          },
          {
            colorName: "Blue",
            images: ["/Products/image2_yoga1_mat.webp"],
          },
        ],
      },
    },
    {
      name: "Jump Rope",
      description: "Adjustable jump rope for cardio training.",
      price: 14.99,
      sku: "GYM-JR001",
      category: "ACCESSORIES",
      fit: "N/A",
      colors: {
        create: [
          {
            colorName: "Black",
            images: ["/Products/image1_jump_rope.webp"],
          },
        ],
      },
    },
    {
      name: "Kettlebell",
      description: "Durable kettlebell for strength training.",
      price: 49.99,
      sku: "GYM-KB001",
      category: "ACCESSORIES",
      fit: "N/A",
      colors: {
        create: [
          {
            colorName: "Gray",
            images: [
              "/Products/image1_kettlebell1.webp",
              "/Products/image1_kettlebell2.webp",
              "/Products/image1_kettlebell3.webp",
            ],
          },
        ],
      },
    },
    {
      name: "Water Bottle",
      description: "Reusable water bottle for hydration during workouts.",
      price: 19.99,
      sku: "GYM-WB001",
      category: "ACCESSORIES",
      fit: "N/A",
      colors: {
        create: [
          {
            colorName: "Transparent",
            images: [
              "/Products/image1_water1_bottle.webp",
              "/Products/image1_water2_bottle.webp",
              "/Products/image1_water3_bottle.webp",
            ],
          },
          {
            colorName: "Blue",
            images: [
              "/Products/image2_water1_bottle.webp",
              "/Products/image2_water2_bottle.webp",
              "/Products/image2_water3_bottle.webp",
            ],
          },
        ],
      },
    },
    {
      name: "Gym Backpack",
      description: "Spacious backpack for gym essentials.",
      price: 39.99,
      sku: "GYM-BP001",
      category: "ACCESSORIES",
      fit: "N/A",
      colors: {
        create: [
          {
            colorName: "Black",
            images: [
              "/Products/image1_gym1_backpack.jpg",
              "/Products/image1_gym2_backpack.jpg",
              "/Products/image1_gym3_backpack.jpg",
              "/Products/image1_gym4_backpack.jpg",
            ],
          },
          {
            colorName: "White",
            images: [
              "/Products/image2_gym1_backpack.jpg",
              "/Products/image2_gym2_backpack.jpg",
            ],
          },
        ],
      },
    },
    {
      name: "Training Gloves",
      description: "Protective gloves for weight lifting.",
      price: 24.99,
      sku: "GYM-G001",
      category: "ACCESSORIES",
      fit: "N/A",
      colors: {
        create: [
          {
            colorName: "Black",
            images: [
              "/Products/image1_training1_gloves.webp",
              "/Products/image1_training2_gloves.webp",
              "/Products/image1_training3_gloves.webp",
            ],
          },
        ],
      },
    },
    {
      name: "Foam Roller",
      description: "Foam roller for muscle recovery.",
      price: 29.99,
      sku: "GYM-FR001",
      category: "ACCESSORIES",
      fit: "N/A",
      colors: {
        create: [
          {
            colorName: "Blue",
            images: ["/Products/image1_foam_roller.webp"],
          },
        ],
      },
    },
  ];

  for (const product of products) {
    await db.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        sku: product.sku,
        category: product.category,
        fit: product.fit,
        colors: product.colors,
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
