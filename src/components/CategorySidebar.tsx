import { ChevronRight, Settings } from 'lucide-react';
import type { Category } from '../utils/constants';
import type { Translation } from '../i18n/translations';

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  t: Translation;
}

export default function CategorySidebar({ categories, activeCategory, onCategoryChange, t }: CategorySidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-8 border border-white/20 dark:border-gray-700/20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
          {t.categories.subject}
        </h2>
        <nav className="space-y-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                }`}
                aria-current={activeCategory === category.id ? "true" : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{category.name}</span>
                {activeCategory === category.id && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
