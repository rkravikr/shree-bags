require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const categoriesData = [
  { name: "Tote Bags", slug: "tote-bags" },
  { name: "Shopping Bags", slug: "shopping-bags" },
  { name: "Travel Bags", slug: "travel-bags" },
  { name: "Custom Printed Bags", slug: "custom-printed-bags" },
];

const productsData = [
  // Tote Bags
  {
    name: "Floral Canvas Tote",
    categorySlug: "tote-bags",
    price: 899,
    stock: 50,
    material: "Premium Canvas",
    description:
      "A beautiful everyday tote bag featuring custom floral prints. Perfect for college, work, or casual outings.\n\nFeatures:\n- Durable canvas material\n- Long shoulder straps\n- High-resolution print",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Minimal Everyday Tote",
    categorySlug: "tote-bags",
    price: 699,
    stock: 100,
    material: "100% Cotton",
    description:
      "Clean, simple, and elegant. This minimal tote is your perfect daily companion.",
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Eco Cotton Tote",
    categorySlug: "tote-bags",
    price: 499,
    stock: 200,
    material: "Organic Cotton",
    description:
      "Sustainable and stylish. Made from 100% organic cotton for the eco-conscious shopper.",
    img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Artistic Print Tote",
    categorySlug: "tote-bags",
    price: 999,
    stock: 30,
    material: "Heavy Canvas",
    description:
      "Stand out from the crowd with this limited edition artistic print tote bag.",
    img: "https://images.unsplash.com/photo-1622560481236-41f237f814b7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Classic Canvas Tote",
    categorySlug: "tote-bags",
    price: 799,
    stock: 75,
    material: "Washed Canvas",
    description:
      "The timeless classic. Reliable, sturdy, and goes with every outfit.",
    img: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1000&auto=format&fit=crop",
  },

  // Shopping Bags
  {
    name: "Reusable Grocery Bag",
    categorySlug: "shopping-bags",
    price: 299,
    stock: 500,
    material: "Recycled PET",
    description:
      "Say no to plastic! Our durable grocery bags can hold up to 15kg of weight comfortably.",
    img: "https://images.unsplash.com/photo-1582294155169-2f2b3e811bc3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Foldable Market Bag",
    categorySlug: "shopping-bags",
    price: 349,
    stock: 300,
    material: "Ripstop Nylon",
    description:
      "Folds into a tiny pouch when not in use. Essential for unexpected shopping trips.",
    img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Cotton Shopping Bag",
    categorySlug: "shopping-bags",
    price: 399,
    stock: 150,
    material: "Cotton Mesh",
    description:
      "Breathable cotton mesh bag, perfect for fresh produce and vegetables.",
    img: "https://images.unsplash.com/photo-1606114532298-6a3f9e2e60a9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Eco Market Tote",
    categorySlug: "shopping-bags",
    price: 449,
    stock: 100,
    material: "Jute Blend",
    description:
      "A structured market tote that keeps your items upright and secure.",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Everyday Shopping Bag",
    categorySlug: "shopping-bags",
    price: 249,
    stock: 400,
    material: "Non-woven Fabric",
    description: "An affordable, heavy-duty everyday shopping essential.",
    img: "https://images.unsplash.com/photo-1594225026210-6c9ab14b09e0?q=80&w=1000&auto=format&fit=crop",
  },

  // Travel Bags
  {
    name: "Weekend Duffel Bag",
    categorySlug: "travel-bags",
    price: 2499,
    stock: 40,
    material: "Water-resistant Nylon",
    description:
      "The perfect size for a 2-3 day weekend getaway. Features shoe compartment and multiple pockets.",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Leather Travel Bag",
    categorySlug: "travel-bags",
    price: 4999,
    stock: 15,
    material: "Genuine Leather",
    description:
      "A premium, handcrafted leather travel bag that ages beautifully.",
    img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Compact Travel Bag",
    categorySlug: "travel-bags",
    price: 1899,
    stock: 60,
    material: "Polyester Blend",
    description:
      "Designed as the perfect under-seat cabin bag for hassle-free flights.",
    img: "https://images.unsplash.com/photo-1490427712608-588e68359dbd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Gym Travel Bag",
    categorySlug: "travel-bags",
    price: 1499,
    stock: 80,
    material: "Breathable Mesh/Nylon",
    description:
      "Versatile bag for the gym or short trips. Features a wet-clothes pocket.",
    img: "https://images.unsplash.com/photo-1581024329242-2d12be407e3d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Premium Travel Duffel",
    categorySlug: "travel-bags",
    price: 3499,
    stock: 25,
    material: "Waxed Canvas",
    description:
      "Rugged, vintage-inspired waxed canvas duffel built for adventurous travel.",
    img: "https://images.unsplash.com/photo-1521570176865-c81eb9fb7a70?q=80&w=1000&auto=format&fit=crop",
  },

  // Custom Printed Bags
  {
    name: "Custom Logo Tote",
    categorySlug: "custom-printed-bags",
    price: 1299,
    stock: 200,
    material: "Premium Cotton",
    description:
      "Bulk orders available for corporate gifting. Upload your logo and we print it with precision.",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Event Promotional Bags",
    categorySlug: "custom-printed-bags",
    price: 499,
    stock: 1000,
    material: "Non-woven",
    description:
      "Cost-effective customized bags perfect for trade shows, marathons, and large events.",
    img: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Custom Gift Bags",
    categorySlug: "custom-printed-bags",
    price: 899,
    stock: 150,
    material: "Laminated Paper/Cotton",
    description:
      "Premium personalized gift bags for weddings, luxury gifting, and special occasions.",
    img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Brand Merchandise Bags",
    categorySlug: "custom-printed-bags",
    price: 1499,
    stock: 100,
    material: "Heavy Canvas",
    description:
      "High retail quality printed bags designed to be sold as official brand merchandise.",
    img: "https://images.unsplash.com/photo-1622560481236-41f237f814b7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Conference Tote Bags",
    categorySlug: "custom-printed-bags",
    price: 699,
    stock: 500,
    material: "Polyester Canvas",
    description:
      "Professional conference bags with custom attendee branding and document compartments.",
    img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
  },
];

const seedDatabase = async () => {
  console.log("Starting seed process...");
  try {
    // 1. Seed Categories first
    for (const cat of categoriesData) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: {
          name: cat.name,
          slug: cat.slug,
        },
      });
      console.log(`Ensured category: ${cat.name}`);
    }

    const categories = await prisma.category.findMany();
    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.slug] = cat.id;
      return acc;
    }, {});

    // 2. Seed Products and their Images
    let count = 0;
    for (const prod of productsData) {
      const slug = generateSlug(prod.name);
      const categoryId = categoryMap[prod.categorySlug];

      if (!categoryId) {
        console.error(`Category ID not found for slug: ${prod.categorySlug}`);
        continue;
      }

      const existingProduct = await prisma.product.findUnique({
        where: { slug },
      });

      if (!existingProduct) {
        // Create product
        const newProduct = await prisma.product.create({
          data: {
            name: prod.name,
            slug: slug,
            description: prod.description,
            material: prod.material,
            price: prod.price,
            stock: prod.stock,
            categoryId: categoryId,
            isActive: true,
          },
        });

        // Attach Image
        await prisma.productImage.create({
          data: {
            url: prod.img,
            productId: newProduct.id,
          },
        });

        count++;
        console.log(`Created product: ${prod.name}`);
      } else {
        // Check if image exists, if not, add it
        const existingImages = await prisma.productImage.findMany({
          where: { productId: existingProduct.id },
        });
        if (existingImages.length === 0) {
          await prisma.productImage.create({
            data: {
              url: prod.img,
              productId: existingProduct.id,
            },
          });
          console.log(`Added missing image for: ${prod.name}`);
        }
        console.log(`Skipped existing product: ${prod.name}`);
      }
    }

    console.log(`\n✅ Seeding Complete! Added ${count} new products.`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
