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
  const [selectedStage, setSelectedStage] = useState<string>('all');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        // Pull rows sorted cleanly by recipe ID from your Supabase table
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

  // Filter recipes dynamically based on search inputs
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.dog_breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.hero_ingredients.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStage = selectedStage === 'all' || recipe.life_stages.toLowerCase() === selectedStage.toLowerCase();

    return matchesSearch && matchesStage;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-serif font-bold text-[#2D2A27] mb-2">Porch & Paw Kitchen</h1>
        <p className="text-[#2D2A27]/70 max-w-2xl">
          Browse our live database of dog-safe, culinary-approved recipes. Tailored perfectly by breed matching and specific life-cycle nutrition requirements.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#F4F0EA] border border-[#B6A799]/30 rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by title, breed, or key ingredient..."
            className="w-full px-4 py-2.5 bg-[#FDFBF7] border border-[#B6A799]/40 rounded-lg text-sm text-[#2D2A27] focus:outline-none focus:border-[#B55D3B]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto flex gap-2 items-center justify-end">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A7A59]">Life Stage:</span>
          <select
            className="px-3 py-2 bg-[#FDFBF7] border border-[#B6A799]/40 rounded-lg text-sm text-[#2D2A27] focus:outline-none focus:border-[#B55D3B]"
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

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12 text-[#2D2A27]/60 font-medium">
          🐾 Connecting to Supabase vault and loading recipes...
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-12 bg-[#FDFBF7] border border-dashed border-[#B6A799]/40 rounded-xl text-[#2D2A27]/60">
          No matching recipes found for your current search criteria.
        </div>
      ) : (
        /* Recipe Grid Card Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.recipe_id} 
              className="bg-[#FDFBF7] border border-[#B6A799]/20 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Card Image Area */}
              <div className="h-48 bg-[#F4F0EA] flex flex-col items-center justify-center relative border-b border-[#B6A799]/10 p-4">
                {recipe.image_url ? (
                  <img 
                    src={recipe.image_url} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ) : (
                  <div className="text-center px-4">
                    <span className="text-3xl block mb-2 opacity-60">📸</span>
                    <span className="text-xs uppercase tracking-wider text-[#7A7A59] font-bold block mb-1">Image Pending Generation</span>
                    <span className="text-[10px] text-[#2D2A27]/50 block font-mono bg-white/60 px-2 py-0.5 rounded border border-[#B6A799]/20 max-w-xs truncate">
                      ID: {recipe.recipe_id} | Breed: {recipe.dog_breed}
                    </span>
                  </div>
                )}
                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-[#B55D3B] text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {recipe.category}
                </span>
              </div>

              {/* Card Content Information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-serif font-bold text-xl text-[#2D2A27] leading-tight">{recipe.title}</h3>
                  </div>
                  
                  {/* Metadata Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="bg-[#7A7A59]/10 text-[#7A7A59] text-xs font-semibold px-2 py-0.5 rounded">
                      🎯 {recipe.dog_breed}
                    </span>
                    <span className="bg-[#B55D3B]/10 text-[#B55D3B] text-xs font-semibold px-2 py-0.5 rounded capitalize">
                      ⏳ {recipe.life_stages}
                    </span>
                  </div>

                  {/* Ingredients Summary */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A59] mb-1">Key Elements:</h4>
                    <p className="text-sm text-[#2D2A27]/80 font-medium capitalize">{recipe.hero_ingredients}</p>
                  </div>

                  {/* Preparation Instructions */}
                  <div className="mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7A59] mb-1">Instructions:</h4>
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
