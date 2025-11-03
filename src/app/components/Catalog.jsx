'use client';
import { useEffect, useMemo, useState } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import CartSummary from './CartSummary';
import StatusMessage from './StatusMessage';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');

  const [cart, setCart] = useState({});

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setError('Could not load products.');
          setLoading(false);
        }
      }
    })();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const t = setInterval(() => {
      setProducts(prev =>
        prev.map(p => {
          if (p.stock === 0) return p;
          const change = Math.random() < 0.35 ? 1 : 0;
          return { ...p, stock: Math.max(0, p.stock - change) };
        })
      );
    }, 5000);
    return () => clearInterval(t);
  }, [products.length]);

  const filtered = useMemo(() => {
    const cap = maxPrice === '' ? Infinity : Number(maxPrice);
    return products.filter(p => {
      const okCat = category === 'All' || p.category === category;
      const okPrice = p.price <= cap;
      return okCat && okPrice;
    });
  }, [products, category, maxPrice]);

  function addToCart(item) {
    if (item.stock <= 0) return;
    setCart(prev => {
      const ex = prev[item.id];
      const nextQty = (ex?.qty || 0) + 1;
      return { ...prev, [item.id]: { id: item.id, name: item.name, price: item.price, qty: nextQty } };
    });
  }
  function decrementFromCart(id) {
    setCart(prev => {
      const curr = prev[id];
      if (!curr) return prev;
      if (curr.qty <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...curr, qty: curr.qty - 1 } };
    });
  }
  function resetCart() { setCart({}); }

  const { itemCount, totalPrice } = useMemo(() => {
    const items = Object.values(cart);
    return {
      itemCount: items.reduce((n, it) => n + it.qty, 0),
      totalPrice: items.reduce((s, it) => s + it.qty * it.price, 0),
    };
  }, [cart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 space-y-4">
        <div className="p-4 bg-white rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Filters</h2>
          <CategoryFilter
            value={category}
            options={['All', 'Electronics', 'Furniture', 'Apparel']}
            onChange={setCategory}
          />
          <PriceFilter value={maxPrice} onChange={setMaxPrice} />
        </div>

        <CartSummary
          cart={cart}
          itemCount={itemCount}
          totalPrice={totalPrice}
          onDecrement={decrementFromCart}
          onReset={resetCart}
        />
      </aside>

      <section className="lg:col-span-3">
        <div aria-live="polite">
          <StatusMessage
            loading={loading}
            error={error}
            empty={!loading && !error && filtered.length === 0}
          />
        </div>
        {!loading && !error && filtered.length > 0 && (
          <ProductList products={filtered} onAdd={addToCart} />
        )}
      </section>
    </div>
  );
}
