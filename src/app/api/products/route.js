//vincent crooks


export async function GET() {
  const products = [
    { id: 'p1', name: 'Laptop',     price: 1200, category: 'Electronics', stock: 5 },
    { id: 'p2', name: 'Phone',      price: 900,  category: 'Electronics', stock: 4 },
    { id: 'p3', name: 'Headphones', price: 199,  category: 'Electronics', stock: 8 },
    { id: 'p4', name: 'Monitor',    price: 260,  category: 'Electronics', stock: 5 },
    { id: 'p5', name: 'Keyboard',   price: 99,   category: 'Electronics', stock: 6 },

    { id: 'p6', name: 'Desk Chair',   price: 150, category: 'Furniture', stock: 3 },
    { id: 'p7', name: 'Coffee Table', price: 180, category: 'Furniture', stock: 6 },
    { id: 'p8', name: 'Bookshelf',    price: 220, category: 'Furniture', stock: 2 },
    { id: 'p9', name: 'Lamp',         price: 45,  category: 'Furniture', stock: 12 },

    { id: 'p10', name: 'Running Shoes', price: 120, category: 'Apparel', stock: 10 },
    { id: 'p11', name: 'Hoodie',        price: 75,  category: 'Apparel', stock: 7 },
    { id: 'p12', name: 'Backpack',      price: 89,  category: 'Apparel', stock: 9 }
  ];

  return Response.json(products);
}
