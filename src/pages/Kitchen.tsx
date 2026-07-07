import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

interface Recipe {
  recipe_id: string;
  title: string;
  dog_breed: string;
  life_stages: string;
  hero_ingredients: string;
  category: string;
  instructions: string;
  "chatgpt prompt": string;
  image_url: string | null;
}

const Kitchen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .order('recipe_id', { ascending: true });

        if (error) throw error;
        if (data) setRecipes(data as Recipe[]);
      } catch (err) {
        console.error("Error fetching recipes from Supabase:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.hero_ingredients.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'all' || recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Check if the recipe's life stages field includes the selected filter string
    const matchesStage = selectedStage === 'all' || recipe.life_stages.toLowerCase().includes(selectedStage.toLowerCase());

    return matchesSearch && matchesCategory && matchesStage;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-serif font-bold text-[#2D2A27] mb-2">Porch & Paw Kitchen</h1>
        <p className="text-[#2D2A27]/70 max-w-2xl text-sm">
          Browse our live database of dog-safe, culinary-approved recipes. Tailored perfectly by life-cycle nutrition requirements.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#F4F0EA] border border-[#B6A799]/40 rounded-xl p-5 mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-sm">
        
        {/* Search Input Box with Magnifying Glass Icon */}
        <div className="w-full lg:w-96 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            {/* SVG Magnifying Glass */}
            <svg className="h-4 w-4 text-[#7A7A59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by title or ingredient (e.g., pumpkin, blueberry)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#B6A799]/60 rounded-xl text-sm text-[#2D2A27] placeholder-[#2D2A27]/50 focus:outline-none focus:border-[#B55D3B] shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Defined Dropdown Selector Grid */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto justify-end items-center">
          
          {/* Defined Category Filter */}
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D2A27] whitespace-nowrap">Category:</span>
            <select
              className="w-full sm:w-auto px-3 py-2 bg-white border-2 border-[#B6A799]/60 rounded-xl text-sm font-medium text-[#2D2A27] focus:outline-none focus:border-[#B55D3B] shadow-sm cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="everyday treats">Everyday Treats</option>
              <option value="frozen treats">Frozen Treats</option>
              <option value="training treats">Training Treats</option>
              <option value="wellness recipes">Wellness Recipes</option>
              <option value="special diet recipes">Special Diet Recipes</option>
              <option value="dehydrated & jerky treats">Dehydrated & Jerky Treats</option>
              <option value="stuffable toy & enrichment recipes">Stuffable Toy & Enrichment Recipes</option>
              <option value="birthday & celebration treats">Birthday & Celebration Treats</option>
              <option value="puppy recipes">Puppy Recipes</option>
              <option value="senior dog recipes">Senior Dog Recipes</option>
              <option value="holiday & seasonal recipes">Holiday & Seasonal Recipes</option>
              <option value="meal toppers">Meal Toppers</option>
              <option value="bone broths & functional broths">Bone Broths & Functional Broths</option>
            </select>
          </div>

          {/* Defined Life Stage Filter */}
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D2A27] whitespace-nowrap">Life Stage:</span>
            <select
              className="w-full sm:w-auto px-3 py-2 bg-white border-2 border-[#B6A799]/60 rounded-xl text-sm font-medium text-[#2D2A27] focus:outline-none focus:border-[#B55D3B] shadow-sm cursor-pointer"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
            >
              <option value="all">All Stages</option>
              <option value="puppy">Puppy</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>

        </div>
      </div>

      {/* Loading Grid State */}
      {loading ? (
        <div className="text-center py-12 text-[#2D2A27]/60 font-medium text-sm">
          🐾 Loading recipes...
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-12 bg-[#FDFBF7] border-2 border-dashed border-[#B6A799]/40 rounded-xl text-[#2D2A27]/60 text-sm">
          No matching recipes found for your current search criteria.
        </div>
      ) : (
        /* Recipe Grid Display cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.recipe_id} 
              className="bg-[#FDFBF7] border border-[#B6A799]/20 rounded-2xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-all duration-200"
            >
              {/* Card Image Wrapper */}
              <div className="h-52 bg-[#F4F0EA] relative w-full overflow-hidden">
                {recipe.image_url ? (
                  <img 
                    src={recipe.image_url} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F5F2EB]">
                    <span className="text-3xl mb-2 opacity-70">📸</span>
                    <span className="text-xs uppercase tracking-wider text-[#7A7A59] font-bold block mb-1">Image Pending Generation</span>
                    <span className="text-[10px] text-[#2D2A27]/50 block font-mono bg-white/80 px-2 py-0.5 rounded border border-[#B6A799]/10 truncate max-w-[200px]">
                      ID: {recipe.recipe_id}
                    </span>
                  </div>
                )}
                {/* Fixed Overlap Category Tag */}
                <div className="absolute top-3 left-3 bg-[#B55D3B] px-2.5 py-1 rounded-md shadow-sm">
                  <span className="text-white font-bold text-[10px] tracking-wide block uppercase">
                    {recipe.category}
                  </span>
                </div>
              </div>

              {/* Text Layout */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D2A27] leading-snug mb-2">
                    {recipe.title}
                  </h3>
                  
                  {/* Metadata Indicators */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="bg-[#B55D3B]/10 text-[#B55D3B] text-[11px] font-bold px-2 py-0.5 rounded-full capitalize">
                      ⏳ {recipe.life_stages}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A59] mb-0.5">Key Elements:</h4>
                    <p className="text-xs text-[#2D2A27]/80 font-medium capitalize truncate">{recipe.hero_ingredients}</p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A59] mb-0.5">Instructions:</h4>
                    <p className="text-xs text-[#2D2A27]/70 line-clamp-3 leading-relaxed">{recipe.instructions}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Kitchen;
