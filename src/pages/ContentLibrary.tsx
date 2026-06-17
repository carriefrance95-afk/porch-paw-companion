import React, { useState } from 'react';
import { type Recipe } from '../types';
import { BookOpen, Search, Filter, ChefHat, Clock, Flame, ChevronRight, Heart, Star, Share2 } from 'lucide-react';

const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Peanut Butter Pumpkin Treats',
    category: 'Treats',
    ingredients: ['1 cup Pumpkin Puree', '1/2 cup Peanut Butter', '2 eggs', '2.5 cups Whole Wheat Flour'],
    instructions: '1. Preheat oven to 350F. 2. Mix ingredients. 3. Roll out and cut shapes. 4. Bake for 20-25 mins.',
    imageUrl: 'https://images.unsplash.com/photo-1582736443215-206774a28b3e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Beef & Veggie Stew',
    category: 'Meals',
    ingredients: ['1 lb Lean Ground Beef', '1 Sweet Potato', '1/2 cup Peas', '1/2 cup Carrots', '1.5 cups Rice'],
    instructions: '1. Cook rice. 2. Brown beef. 3. Steam veggies. 4. Mix all together and serve cooled.',
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Dog-Friendly "Pupcakes"',
    category: 'Special Occasions',
    ingredients: ['1 cup Flour', '1 tsp Baking Soda', '1/4 cup Peanut Butter', '1/4 cup Vegetable Oil', '1 cup Carrots'],
    instructions: '1. Mix dry and wet ingredients. 2. Fold in carrots. 3. Bake in cupcake tin at 350F for 15 mins.',
    imageUrl: 'https://images.unsplash.com/photo-1628192134104-aa1475655104?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Frozen Watermelon Bites',
    category: 'Treats',
    ingredients: ['2 cups Seedless Watermelon', '1/2 cup Coconut Milk'],
    instructions: '1. Puree watermelon and coconut milk. 2. Pour into ice cube trays. 3. Freeze until solid.',
    imageUrl: 'https://images.unsplash.com/photo-1563226353-706f9479e01f?auto=format&fit=crop&q=80&w=800'
  }
];

const ContentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categories = ['All', 'Treats', 'Meals', 'Special Occasions'];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2 flex items-center gap-3">
            <ChefHat className="text-primary" />
            Doggy Cookbook
          </h1>
          <p className="text-base-content/70">Nutritious and delicious recipes for your furry friend.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline rounded-2xl">
            <BookOpen size={18} />
            My Favorites
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
          <input 
            type="text" 
            placeholder="Search recipes..." 
            className="input input-bordered w-full pl-12 rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm rounded-xl px-6 ${activeCategory === cat ? 'btn-primary' : 'btn-ghost bg-base-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.map(recipe => (
          <div 
            key={recipe.id} 
            className="bg-base-100 rounded-[2rem] overflow-hidden shadow-sm border border-base-200 hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <div className="h-48 relative overflow-hidden">
              <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-4 left-4">
                <span className="badge badge-primary font-bold text-[10px] uppercase border-none">{recipe.category}</span>
              </div>
              <button className="absolute top-4 right-4 btn btn-circle btn-xs bg-white/80 border-none text-error hover:bg-white">
                <Heart size={14} />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-4 leading-tight group-hover:text-primary transition-colors">{recipe.title}</h3>
              <div className="flex items-center gap-4 mt-auto">
                <div className="flex items-center gap-1 text-[10px] opacity-60">
                   <Clock size={12} /> 20m
                </div>
                <div className="flex items-center gap-1 text-[10px] opacity-60">
                   <Flame size={12} /> Easy
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box max-w-4xl p-0 rounded-[3rem] overflow-hidden bg-base-100">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-64 lg:h-auto">
                <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} className="w-full h-full object-cover" />
              </div>
              <div className="lg:w-1/2 p-10 flex flex-col max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-primary font-black text-xs uppercase tracking-widest block mb-2">{selectedRecipe.category}</span>
                    <h2 className="text-3xl font-bold leading-tight">{selectedRecipe.title}</h2>
                  </div>
                  <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setSelectedRecipe(null)}>
                    <ChevronRight size={24} className="rotate-45" />
                  </button>
                </div>

                <div className="flex items-center gap-6 mb-8 py-4 border-y border-base-200">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold opacity-40">Prep Time</span>
                    <span className="font-bold text-sm">15 mins</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold opacity-40">Skill</span>
                    <span className="font-bold text-sm">Beginner</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold opacity-40">Servings</span>
                    <span className="font-bold text-sm">12 treats</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Ingredients
                  </h4>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-sm opacity-80 flex gap-2">
                        <span className="text-primary font-bold">•</span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Instructions
                  </h4>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {selectedRecipe.instructions}
                  </p>
                </div>

                <div className="mt-10 flex gap-3 pt-6 border-t border-base-200">
                  <button className="btn btn-primary flex-1 rounded-2xl shadow-lg">Save to Favorites</button>
                  <button className="btn btn-ghost btn-square rounded-2xl border border-base-200"><Share2 size={18} /></button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSelectedRecipe(null)}></div>
        </div>
      )}
    </div>
  );
};

export default ContentLibrary;
