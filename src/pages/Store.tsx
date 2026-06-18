import React, { useState } from 'react';
import { usePets } from '../context/PetContext';
import { type Product } from '../types';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw, X, CreditCard, CheckCircle2 } from 'lucide-react';

const Store: React.FC = () => {
  const { products } = usePets();
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-base-content tracking-tight mb-2">The Paw Boutique</h1>
          <p className="text-base-content/60 font-medium">Curated gear and digital resources for your best friend.</p>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="btn btn-circle btn-lg btn-ghost bg-base-200 relative group overflow-hidden"
        >
          <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
          {cart.length > 0 && (
            <span className="badge badge-primary badge-sm absolute top-2 right-2 border-none font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Featured Banner */}
      <div className="bg-primary rounded-[3rem] p-12 mb-16 relative overflow-hidden text-primary-content">
        <div className="max-w-md relative z-10">
          <span className="badge badge-secondary font-bold mb-4">NEW ARRIVAL</span>
          <h2 className="text-5xl font-black mb-6 leading-tight">The Ultimate Homemade Dog Cookbook</h2>
          <p className="text-lg opacity-90 mb-8 font-medium">50+ Vet-approved recipes for a healthier, happier pup. Digital & Print versions available.</p>
          <button className="btn btn-secondary btn-lg rounded-2xl px-10 shadow-xl">Get 20% Off</button>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none">
          <ShoppingBag size={400} className="absolute -top-20 -right-20" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="group bg-base-100 rounded-[2.5rem] overflow-hidden border border-base-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 right-4">
                <span className="badge badge-neutral bg-black/50 backdrop-blur-md border-none text-white font-bold p-3">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-70 mb-1 block">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                </div>
              </div>
              <p className="text-sm opacity-60 mb-8 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
              <button 
                onClick={() => addToCart(product)}
                className="btn btn-primary btn-block rounded-2xl gap-3 shadow-lg shadow-primary/20"
              >
                Add to Cart
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-base-100 shadow-2xl flex flex-col">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="btn btn-ghost btn-circle"><X /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="text-center py-20 opacity-40">
                  <ShoppingBag size={64} className="mx-auto mb-4" />
                  <p className="font-bold">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex gap-4">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 rounded-2xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold">{item.product.name}</h4>
                        <p className="text-sm opacity-60">${item.product.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="btn btn-ghost btn-sm text-error"><X size={16} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-base-200 rounded-t-[3rem]">
                {checkoutStep === 'cart' && (
                  <>
                    <div className="flex justify-between items-center mb-6 text-xl font-bold">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => setCheckoutStep('shipping')}
                      className="btn btn-primary btn-block btn-lg rounded-2xl shadow-xl"
                    >
                      Checkout Now
                    </button>
                  </>
                )}

                {checkoutStep === 'shipping' && (
                  <div className="space-y-4">
                    <h3 className="font-bold mb-4">Shipping Info</h3>
                    <input type="text" placeholder="Full Name" className="input input-bordered w-full rounded-xl" />
                    <input type="text" placeholder="Address" className="input input-bordered w-full rounded-xl" />
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      className="btn btn-primary btn-block rounded-xl"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div className="space-y-4 text-center">
                    <div className="bg-base-100 p-8 rounded-3xl mb-4">
                      <CreditCard size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="font-bold">Mock Payment Gateway</p>
                      <p className="text-xs opacity-60 mt-2">Integration with Stripe coming in Milestone 5.</p>
                    </div>
                    <button 
                      onClick={() => setCheckoutStep('success')}
                      className="btn btn-primary btn-block btn-lg rounded-2xl"
                    >
                      Complete Purchase
                    </button>
                  </div>
                )}

                {checkoutStep === 'success' && (
                  <div className="text-center py-4">
                    <div className="bg-success/10 text-success p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black mb-2">Order Confirmed!</h3>
                    <p className="text-sm opacity-60 mb-6">Thank you for your purchase. We've sent a receipt to your email.</p>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        setCart([]);
                        setCheckoutStep('cart');
                      }}
                      className="btn btn-primary btn-block rounded-2xl"
                    >
                      Back to Store
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="p-8 grid grid-cols-3 gap-4 border-t opacity-40">
              <div className="text-center"><Truck size={20} className="mx-auto mb-1" /><span className="text-[10px] font-bold uppercase">Fast Ship</span></div>
              <div className="text-center"><ShieldCheck size={20} className="mx-auto mb-1" /><span className="text-[10px] font-bold uppercase">Secure</span></div>
              <div className="text-center"><RotateCcw size={20} className="mx-auto mb-1" /><span className="text-[10px] font-bold uppercase">30 Day Returns</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
