import React from 'react';
import { Search, Minus, Star } from 'lucide-react';

const SidebarFilter = ({
    categories,
    searchTerm,
    onSearchChange,
    maxPrice,
    priceDraft,
    onPriceChange,
    onPriceReset,
    selectedCategories,
    onCategoryToggle,
    selectedRatings,
    onRatingToggle,
    onApply,
    onClear,
}) => {
    const percent = maxPrice > 0 ? (priceDraft / maxPrice) * 100 : 0;

    return (
        <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">

                {/* Search */}
                <div>
                    <h3 className="text-sm font-semibold mb-3 text-slate-900">Search Products</h3>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Find your product..."
                            className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all"
                        />
                        <button
                            type="button"
                            className="absolute right-1.5 top-1.5 p-1 bg-[#10b981] text-white rounded-md hover:bg-[#0f9f6e] transition-colors"
                        >
                            <Search className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Price Filter */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
                        <Minus className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Price range</span>
                            <button
                                type="button"
                                onClick={onPriceReset}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                reset
                            </button>
                        </div>

                        {/* Real range input overlaid on the same visual track/thumb (design unchanged) */}
                        <div className="relative my-4 h-1.5">
                            <input
                                type="range"
                                min={0}
                                max={maxPrice}
                                value={priceDraft}
                                onChange={(e) => onPriceChange(Number(e.target.value))}
                                className="absolute -top-2 left-0 w-full h-5 opacity-0 cursor-pointer z-10"
                            />
                            <div className="h-1.5 bg-slate-100 rounded-full relative">
                                <div
                                    className="absolute h-full bg-[#10b981] rounded-full"
                                    style={{ width: `${percent}%` }}
                                ></div>
                                <div
                                    className="absolute w-3.5 h-3.5 bg-white border-2 border-[#10b981] rounded-full -top-1 shadow-sm pointer-events-none"
                                    style={{ left: `calc(${percent}% - 7px)` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-between text-xs font-medium text-slate-500">
                            <span>৳0</span>
                            <span>৳{priceDraft.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Categories */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
                        <Minus className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="space-y-2.5">
                        {categories.map((cat, idx) => (
                            <label key={idx} className="flex items-center justify-between text-sm text-slate-600 cursor-pointer group">
                                <div className="flex items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.name)}
                                        onChange={() => onCategoryToggle(cat.name)}
                                        className="w-4 h-4 rounded border-slate-300 text-[#10b981] focus:ring-[#10b981]"
                                    />
                                    <span className="group-hover:text-slate-900 transition-colors">{cat.name}</span>
                                </div>
                                <span className="text-xs text-slate-400">({cat.count})</span>
                            </label>
                        ))}
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Rating */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Rating</h3>
                        <Minus className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars, idx) => (
                            <label key={idx} className="flex items-center gap-2.5 text-sm text-slate-500 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedRatings.includes(stars)}
                                    onChange={() => onRatingToggle(stars)}
                                    className="w-4 h-4 rounded border-slate-300 text-[#10b981] focus:ring-[#10b981]"
                                />
                                <div className="flex gap-0.5 text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < stars ? 'fill-current' : 'text-slate-200'}`} />
                                    ))}
                                </div>
                                <span className="text-xs text-slate-400">& Up</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                    <button
                        type="button"
                        onClick={onApply}
                        className="w-full bg-[#10b981] hover:bg-[#0f9f6e] text-white py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm shadow-emerald-100"
                    >
                        Apply Filter
                    </button>
                    <button
                        type="button"
                        onClick={onClear}
                        className="w-full bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 py-2.5 rounded-xl font-medium text-sm transition-all"
                    >
                        Clear All Filters
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SidebarFilter;
