import React, { useState } from 'react';
import { type Recipe, type DigitalResource } from '../types';
import { 
  BookOpen, Search, ChefHat, Clock, 
  ChevronRight, Heart, Share2, Download, ExternalLink,
  Sparkles, ShieldCheck, Leaf, Apple, Info
} from 'lucide-react';

const recipes: Recipe[] = [
  {
    id: 'p1',
    title: 'Sweet Potato & Peanut Butter Chews',
    category: 'Treats',
    prepTime: '15 mins',
    ingredients: [
      '2 large Sweet Potatoes',
      '2 tbsp Coconut Oil, melted',
      '1 tsp Cinnamon',
      '1/4 cup Organic Peanut Butter (Xylitol-free)'
    ],
    instructions: '1. Preheat oven to 250°F (120°C). 2. Wash and slice sweet potatoes into 1/3 inch thick strips. 3. Toss with coconut oil and cinnamon. 4. Lay on a baking sheet and bake for 2.5 to 3 hours, flipping halfway. 5. Once cooled, drizzle with melted peanut butter for an extra treat.',
    imageUrl: 'https://images.unsplash.com/photo-1591768659430-3f139f2c60c4?auto=format&fit=crop&q=80&w=800',
    kitchenTip: 'Dehydrating at a low temperature makes them perfectly chewy rather than crunchy!',
    nutritionalWarning: 'Always check your peanut butter label for Xylitol—it is extremely toxic to dogs.'
  },
  {
    id: 'p2',
    title: 'Cozy Chicken & Rice Bone Broth Stew',
    category: 'Meals',
    prepTime: '30 mins',
    ingredients: [
      '2 Chicken Breasts, diced',
      '1 cup Brown Rice',
      '2 cups Low-Sodium Bone Broth',
      '1/2 cup Carrots, chopped',
      '1/4 cup Peas'
    ],
    instructions: '1. In a large pot, combine bone broth and brown rice. Bring to a boil, then simmer for 15 mins. 2. Add diced chicken and carrots. 3. Continue simmering for another 10-12 minutes until chicken is cooked through and rice is tender. 4. Stir in peas at the very end. 5. Let cool completely before serving to your pup.',
    imageUrl: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800',
    kitchenTip: 'Bone broth is excellent for joint health and adds a boost of collagen!',
    nutritionalWarning: 'Ensure the bone broth is onion and garlic free, as these are toxic to dogs.'
  },
  {
    id: 'p3',
    title: 'Soothing Pumpkin Belly Delights',
    category: 'Wellness',
    prepTime: '10 mins',
    ingredients: [
      '1 cup Pure Pumpkin Puree (not pie filling)',
      '1/2 cup Plain Greek Yogurt',
      '1/4 tsp Ground Ginger',
      '1/2 cup Rolled Oats'
    ],
    instructions: '1. In a medium bowl, mix pumpkin puree, yogurt, and ginger. 2. Stir in oats until well combined. 3. Spoon into silicone molds or ice cube trays. 4. Freeze for at least 4 hours. 5. Serve as a cooling treat to help settle an upset tummy.',
    imageUrl: 'https://images.unsplash.com/photo-1582736443215-206774a28b3e?auto=format&fit=crop&q=80&w=800',
    kitchenTip: 'Pumpkin is a great source of fiber and ginger helps with mild digestive upset.',
    nutritionalWarning: 'Do not use pumpkin pie filling—it contains spices and sugars that are harmful.'
  },
  {
    id: 'p4',
    title: 'Hydrating Summer Watermelon Slushie',
    category: 'Special Occasions',
    prepTime: '10 mins',
    ingredients: [
      '2 cups Seedless Watermelon, cubed',
      '1/2 Cucumber, peeled',
      '2-3 Fresh Mint Leaves'
    ],
    instructions: '1. Freeze watermelon cubes for 2 hours. 2. Blend frozen watermelon and cucumber until slushy. 3. Garnish with a tiny bit of fresh mint. 4. Serve immediately on hot summer days.',
    imageUrl: 'https://images.unsplash.com/photo-1563226353-706f9479e01f?auto=format&fit=crop&q=80&w=800',
    kitchenTip: 'Watermelon is 92% water, making this the ultimate hydration treat!',
    nutritionalWarning: 'Never feed seeds or the rind, which can cause intestinal blockages.'
  }
];

const resources: DigitalResource[] = [
  {
    id: 'r1',
    title: 'Porch & Paw Starter Pack',
    description: 'The ultimate guide for new pet parents. Includes a homecoming checklist, socialization guide, and basic command cards.',
    imageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    category: 'Guides',
    tag: 'Digital Guide'
  },
  {
    id: 'r2',
    title: 'Wellness Tracker Pack',
    description: 'Printable monthly logs for weight, exercise, and medication. Perfect for bringing to your next vet appointment.',
    imageUrl: 'https://images.unsplash.com/photo-1550791459-591e4b1f163f?auto=format&fit=crop&q=80&w=800',
    category: 'Printables',
    tag: 'Printable Pack'
  },
  {
    id: 'r3',
    title: 'Tasty Treats Cookbook',
    description: 'Our full digital collection of over 50 gourmet, health-focused recipes for every dog size and life stage.',
    imageUrl: 'https://images.unsplash.com/photo-1544433330-938b8e9fc6ee?auto=format&fit=crop&q=80&w=800',
    category: 'Products',
    tag: 'Digital Cookbook'
  },
  {
    id: 'r4',
    title: 'Summer Heat Safety Tips',
    description: 'Recognizing signs of heatstroke, paw protection on hot pavement, and refreshing cooling recipes.',
    imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80&w=800',
    category: 'Guides',
    tag: 'Seasonal Guide'
  },
  {
    id: 'r5',
    title: 'Winter Paw Care Guide',
    description: 'How to manage dry skin, protect against salt on roads, and keeping senior dogs warm in the cold.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
    category: 'Guides',
    tag: 'Seasonal Guide'
  },
  {
    id: 'r6',
    title: 'Understanding Dog Nutrition Basics',
    description: 'An in-depth article on canine nutrition: understanding labels, protein sources, and safe "human" foods.',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
    category: 'Articles',
    tag: 'Educational'
  },
  {
    id: 'r7',
    title: 'Cozy Bonding and Behavior Activities',
    description: 'Learn new ways to bond with your dog through enrichment, indoor games, and positive reinforcement.',
    imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800',
    category: 'Articles',
    tag: 'Educational'
  }
];

const ContentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'kitchen' | 'library'>('kitchen');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResources = resources.filter(res =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-neutral mb-2 flex items-center gap-3">
            {activeTab === 'kitchen' ? <ChefHat size={36} className="text-primary" /> : <BookOpen size={36} className="text-secondary" />}
            {activeTab === 'kitchen' ? 'From The Porch & Paw Kitchen' : 'Resource Library'}
          </h1>
          <p className="opacity-70 font-medium max-w-2xl">
            {activeTab === 'kitchen' 
              ? 'Nutritious, vet-informed recipes crafted for your dog\'s health and happiness.' 
              : 'Our curated collection of guides, printables, and articles to help you be the best pet parent.'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline border-base-300 rounded-3xl gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary px-6">
            <Heart size={18} />
            Saved Content
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-2 mb-10 p-1.5 bg-base-200 rounded-[2.5rem] w-fit">
        <button 
          onClick={() => { setActiveTab('kitchen'); setSearchTerm(''); }}
          className={`px-10 py-3.5 rounded-[2.2rem] font-bold transition-all duration-300 ${activeTab === 'kitchen' ? 'bg-white shadow-premium text-primary' : 'text-neutral/50 hover:text-neutral hover:bg-white/50'}`}
        >
          The Kitchen
        </button>
        <button 
          onClick={() => { setActiveTab('library'); setSearchTerm(''); }}
          className={`px-10 py-3.5 rounded-[2.2rem] font-bold transition-all duration-300 ${activeTab === 'library' ? 'bg-white shadow-premium text-secondary' : 'text-neutral/50 hover:text-neutral hover:bg-white/50'}`}
        >
          Library & Guides
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-12 max-w-xl group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral/30 group-focus-within:text-primary transition-colors" size={20} />
        <input 
          type="text" 
          placeholder={activeTab === 'kitchen' ? "Search for recipes (e.g. 'pumpkin', 'treats')..." : "Search guides and articles..."}
          className="input input-bordered w-full pl-14 h-14 rounded-3xl bg-white border-base-200 focus:border-primary focus:ring-4 focus:ring-primary/5 text-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {activeTab === 'kitchen' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="card group cursor-pointer flex flex-col h-full hover:-translate-y-2 transition-all duration-500 shadow-premium"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="h-64 relative overflow-hidden rounded-t-[2.5rem]">
                <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-5 left-5">
                  <span className="badge bg-white/95 backdrop-blur-sm text-primary shadow-sm border-none font-bold">{recipe.category}</span>
                </div>
                <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <Clock size={14} /> {recipe.prepTime}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col bg-white rounded-b-[2.5rem]">
                <h3 className="font-serif text-2xl mb-4 leading-tight group-hover:text-primary transition-colors">{recipe.title}</h3>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-base-100">
                   <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
                      <Sparkles size={16} />
                      Kitchen Official
                   </div>
                   <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ChevronRight size={20} />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredResources.map(res => (
            <div key={res.id} className="card group hover:-translate-y-2 transition-all duration-500 shadow-premium">
              <div className="h-56 relative overflow-hidden rounded-t-[2.5rem]">
                <img src={res.imageUrl} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className={`badge ${
                    res.category === 'Guides' ? 'bg-secondary text-white' : 
                    res.category === 'Printables' ? 'bg-primary text-white' : 
                    res.category === 'Products' ? 'bg-accent text-neutral' : 'bg-white text-neutral'
                  } border-none font-bold`}>{res.category}</span>
                </div>
                {res.tag && (
                  <div className="absolute top-5 right-5">
                    <span className="badge bg-black/60 text-white border-none text-[9px] px-3 font-black">{res.tag}</span>
                  </div>
                )}
              </div>
              <div className="p-10 bg-white rounded-b-[2.5rem] flex flex-col h-full">
                <h3 className="font-serif text-2xl font-bold mb-4">{res.title}</h3>
                <p className="text-base text-neutral/60 leading-relaxed mb-10 flex-1">{res.description}</p>
                <div className="flex gap-4">
                   <button className="btn btn-primary flex-1 gap-3 h-14 rounded-2xl shadow-lg shadow-primary/20">
                      {res.category === 'Products' ? <ExternalLink size={18} /> : <Download size={18} />}
                      {res.category === 'Products' ? 'Get Now' : 'Download PDF'}
                   </button>
                   <button className="btn btn-ghost btn-square h-14 w-14 border border-base-200 rounded-2xl hover:bg-base-100">
                      <Share2 size={20} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="modal modal-open backdrop-blur-md">
          <div className="modal-box max-w-5xl p-0 rounded-[3rem] overflow-hidden bg-white shadow-2xl border-none">
            <div className="flex flex-col lg:flex-row max-h-[95vh]">
              <div className="lg:w-2/5 h-80 lg:h-auto relative">
                <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} className="w-full h-full object-cover" />
                <div className="absolute top-8 left-8">
                   <button 
                    onClick={() => setSelectedRecipe(null)}
                    className="btn btn-circle btn-lg bg-white/95 backdrop-blur-md border-none text-neutral hover:bg-white shadow-2xl transition-all hover:scale-110"
                   >
                     <ChevronRight size={28} className="rotate-180" />
                   </button>
                </div>
              </div>
              <div className="lg:w-3/5 p-12 lg:p-16 overflow-y-auto">
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary font-black text-xs uppercase tracking-[0.2em]">{selectedRecipe.category}</span>
                    <span className="text-base-300">•</span>
                    <span className="text-secondary font-black text-xs uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <Sparkles size={14} /> Kitchen Official
                    </span>
                  </div>
                  <h2 className="font-serif text-5xl font-black leading-tight text-neutral mb-2">{selectedRecipe.title}</h2>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-12 p-8 bg-base-100 rounded-[2.5rem] shadow-sm">
                  <div className="text-center">
                    <span className="text-[11px] uppercase font-black text-neutral/30 block mb-2 tracking-widest">Prep Time</span>
                    <span className="font-bold text-lg flex items-center justify-center gap-2"><Clock size={18} className="text-primary"/> {selectedRecipe.prepTime}</span>
                  </div>
                  <div className="text-center border-x border-base-200">
                    <span className="text-[11px] uppercase font-black text-neutral/30 block mb-2 tracking-widest">Kitchen Vibe</span>
                    <span className="font-bold text-lg flex items-center justify-center gap-2 text-secondary"><Leaf size={18}/> Healthy</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[11px] uppercase font-black text-neutral/30 block mb-2 tracking-widest">Safety Check</span>
                    <span className="font-bold text-lg flex items-center justify-center gap-2 text-accent"><ShieldCheck size={18}/> Approved</span>
                  </div>
                </div>

                <div className="space-y-12">
                  <section>
                    <h4 className="text-2xl font-serif font-black mb-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                        <Apple size={22} />
                      </div>
                      Ingredients
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                      {selectedRecipe.ingredients.map((ing, i) => (
                        <div key={i} className="flex items-center gap-4 text-neutral/70 font-medium text-lg">
                          <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm" />
                          {ing}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-2xl font-serif font-black mb-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shadow-sm">
                        <BookOpen size={22} />
                      </div>
                      Cooking Steps
                    </h4>
                    <div className="space-y-5">
                      {selectedRecipe.instructions.split(/\d\.\s/).filter(Boolean).map((step, i) => (
                        <div key={i} className="flex gap-6 p-6 bg-base-100/50 rounded-3xl border border-base-200/50 hover:bg-white hover:shadow-premium transition-all duration-300">
                          <span className="text-primary font-black text-2xl opacity-20">{i + 1}</span>
                          <p className="text-neutral/80 leading-relaxed font-medium text-lg">{step.trim()}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {selectedRecipe.kitchenTip && (
                    <div className="p-8 bg-secondary/5 border-l-4 border-secondary rounded-3xl rounded-tl-none shadow-sm">
                      <h5 className="font-black text-secondary text-xs uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                         <Info size={16} /> Kitchen Tip
                      </h5>
                      <p className="text-lg italic font-medium text-neutral/70 leading-relaxed">"{selectedRecipe.kitchenTip}"</p>
                    </div>
                  )}

                  {selectedRecipe.nutritionalWarning && (
                    <div className="p-8 bg-accent/5 border-l-4 border-accent rounded-3xl rounded-tl-none shadow-sm">
                      <h5 className="font-black text-accent text-xs uppercase tracking-[0.2em] mb-3">Nutritional Safety</h5>
                      <p className="text-sm font-medium text-neutral/60 leading-relaxed">{selectedRecipe.nutritionalWarning}</p>
                    </div>
                  )}
                </div>

                <div className="mt-16 flex gap-6 pt-10 border-t border-base-100">
                  <button className="btn btn-primary flex-1 h-16 rounded-2xl text-lg shadow-xl shadow-primary/20">Save to My Recipes</button>
                  <button className="btn btn-ghost btn-square h-16 w-16 border border-base-200 rounded-2xl hover:bg-base-100 transition-all"><Share2 size={24} /></button>
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
