import React, { useState } from 'react';
import { type Product } from '../types';
import { ShoppingBag, Star, ArrowRight, ShieldCheck, Truck, RotateCcw, X, CreditCard, CheckCircle2 } from 'lucide-react';

const products: Product[] = [
  {
    id: 'p1',
    name: 'The Ultimate Gourmet Dog Cookbook',
    price: 24.99,
    category: 'Cookbooks',
    description: '50+ premium recipes for health-conscious pet parents.',
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p2',
    name: 'Porch & Paw Adventure Harness',
    price: 45.00,
    category: 'Gear',
    description: 'Durable, ergonomic, and stylish for any journey.',
    imageUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p3',
    name: 'Digital Health Organizer (Lifetime)',
    price: 19.99,
    category: 'Digital',
    description: 'Advanced features for medical records and exports.',
    imageUrl: 'https://images.unsplash.com/photo-1541591044564-37a852d47344?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p4',
    name: 'Cozy Memory Photo Book',
    price: 34.50,
    category: 'Gear',
    description: 'A physical high-quality book of your saved memories.',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800'
  }
];

const Store: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'success'>('cart');

  const addToCart = (p: Product) => {
    setCart([...cart, p]);
    alert(`${p.name} added to cart!`);
  };

  const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

  const handleCheckout = () => {
    if (checkoutStep === 'cart') setCheckoutStep('payment');
    else if (checkoutStep === 'payment') setCheckoutStep('success');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-base-content mb-2 italic">The Paw Boutique</h1>
          <p className="text-base-content/60 font-medium uppercase tracking-widest text-xs">Curated Quality for Your Best Friend</p>
        </div>
        <button 
          className="btn btn-ghost bg-base-200 rounded-2xl gap-3 relative"
          onClick={() => { setIsCheckoutOpen(true); setCheckoutStep('cart'); }}
        >
          <ShoppingBag size={20} />
          {cart.length > 0 && (
            <span className="badge badge-primary badge-sm absolute -top-2 -right-2 font-bold">{cart.length}</span>
          )}
          <span className="hidden sm:inline">Cart (${totalPrice.toFixed(2)})</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-primary rounded-[3rem] p-12 mb-16 relative overflow-hidden text-primary-content flex flex-col md:flex-row items-center gap-8">
        <div className="relative z-10 md:w-1/2">
          <span className="badge badge-secondary font-bold mb-4">NEW ARRIVAL</span>
          <h2 className="text-5xl font-black mb-6 leading-tight">Summer Adventure Collection</h2>
          <p className="text-lg opacity-90 mb-8 max-w-md">Everything you need for the perfect outdoor journey with your furry companion.</p>
          <button className="btn btn-secondary btn-lg rounded-2xl px-10 font-bold shadow-xl">Shop Now <ArrowRight size={20}/></button>
        </div>
        <div className="md:w-1/2 relative h-64 md:h-96 w-full">
           <img 
            src="https://images.unsplash.com/photo-1548199973-03c40e7fe6b9?auto=format&fit=crop&q=80&w=800" 
            alt="Dogs" 
            className="w-full h-full object-cover rounded-[2rem] shadow-2xl rotate-2" 
          />
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="flex items-center gap-4 p-6 bg-base-100 rounded-[2rem] border border-base-200">
          <div className="bg-success/10 p-4 rounded-2xl text-success"><Truck /></div>
          <div><h4 className="font-bold">Fast Delivery</h4><p className="text-xs opacity-60">Ships in 2-3 business days</p></div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-base-100 rounded-[2rem] border border-base-200">
          <div className="bg-info/10 p-4 rounded-2xl text-info"><ShieldCheck /></div>
          <div><h4 className="font-bold">Premium Quality</h4><p className="text-xs opacity-60">Pet-safe materials only</p></div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-base-100 rounded-[2rem] border border-base-200">
          <div className="bg-warning/10 p-4 rounded-2xl text-warning"><RotateCcw /></div>
          <div><h4 className="font-bold">Easy Returns</h4><p className="text-xs opacity-60">30-day money back guarantee</p></div>
        </div>
      </div>

      {/* Product Grid */}
      <h3 className="text-2xl font-bold mb-8">Bestselling Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="group flex flex-col h-full">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-base-200 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <button 
                onClick={() => addToCart(product)}
                className="absolute bottom-6 left-6 right-6 btn btn-white border-none bg-white text-black font-bold rounded-2xl translate-y-20 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100"
              >
                Add to Cart
              </button>
            </div>
            <div className="px-2">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{product.category}</span>
                <span className="font-black text-primary">${product.price.toFixed(2)}</span>
              </div>
              <h4 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{product.name}</h4>
              <p className="text-xs opacity-60 line-clamp-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="modal modal-open backdrop-blur-md">
          <div className="modal-box rounded-[3rem] p-0 overflow-hidden max-w-2xl bg-base-100 shadow-2xl">
            <div className="bg-base-200 p-8 flex justify-between items-center border-b border-base-300">
              <h3 className="font-black text-2xl uppercase tracking-tighter">Your Shopping Bag</h3>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setIsCheckoutOpen(false)}><X /></button>
            </div>

            <div className="p-8">
              {checkoutStep === 'cart' && (
                <div className="space-y-6">
                  {cart.length === 0 ? (
                    <div className="py-20 text-center opacity-40">
                      <ShoppingBag size={64} className="mx-auto mb-4" />
                      <p className="font-bold">Your bag is empty.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {cart.map((item, i) => (
                          <div key={i} className="flex gap-4 items-center">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-base-200 flex-shrink-0">
                              <img src={item.imageUrl} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-sm leading-tight">{item.name}</p>
                              <p className="text-xs opacity-50">{item.category}</p>
                            </div>
                            <p className="font-black text-sm">${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-dashed border-base-300 pt-6 space-y-2">
                        <div className="flex justify-between text-sm opacity-60"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm opacity-60"><span>Shipping</span><span>FREE</span></div>
                        <div className="flex justify-between text-xl font-black pt-2"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
                      </div>
                      <button className="btn btn-primary btn-lg rounded-2xl w-full shadow-lg mt-4" onClick={handleCheckout}>
                        Proceed to Payment
                      </button>
                    </>
                  )}
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="p-6 bg-base-200 rounded-[2rem] border border-base-300 flex items-center gap-4">
                    <div className="bg-primary/20 p-4 rounded-2xl text-primary"><CreditCard /></div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-widest">Mock Payment Method</h4>
                      <p className="text-xs opacity-60">This is a mockup checkout flow for demonstration.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control"><label className="label"><span className="label-text font-bold text-xs uppercase">Card Holder</span></label><input type="text" className="input input-bordered rounded-xl" placeholder="John Pet" /></div>
                    <div className="form-control"><label className="label"><span className="label-text font-bold text-xs uppercase">Expiry</span></label><input type="text" className="input input-bordered rounded-xl" placeholder="MM/YY" /></div>
                  </div>
                  <button className="btn btn-primary btn-lg rounded-2xl w-full shadow-lg" onClick={handleCheckout}>
                    Complete Mock Purchase
                  </button>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="py-12 text-center animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-black mb-2">Order Confirmed!</h3>
                  <p className="opacity-60 mb-8 max-w-xs mx-auto">Thank you for shopping at The Paw Boutique. Your dog is going to love it!</p>
                  <button className="btn btn-ghost btn-outline rounded-2xl px-10" onClick={() => setIsCheckoutOpen(false)}>Back to Store</button>
                </div>
              )}
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Store;
