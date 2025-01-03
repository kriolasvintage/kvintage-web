"use client";

import { Metadata } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import MegaMenu from "@modules/home/components/mega-menu";

export const metadata: Metadata = {
  title: "Kriolas Vintage",
  description:
    "Kriolas Vintage is a vintage clothing store that sells high-quality, pre-owned clothing.",
};

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  handle: string;
  rank: number;
  parent_category_id: string | null;
  created_at: string;
  updated_at: string;
  metadata: any | null;
  parent_category: ProductCategory | null;
  category_children: ProductCategory[];
}

async function getCategories(): Promise<ProductCategory[]> {
  const response = await fetch(`${BACKEND_URL}/store/product-categories/`, {
    headers: {
      "x-publishable-api-key": PUBLISHABLE_API_KEY!,
    },
    next: { revalidate: 3600 },
  });
  const data = await response.json();
  return data.product_categories;
}

function findCategoryWithChildren(
  categories: ProductCategory[],
  targetName: string
): ProductCategory | null {
  const category = categories.find(
    (cat) => cat.name.trim().toLowerCase() === targetName.trim().toLowerCase()
  );
  if (!category) return null;

  const getChildren = (categoryId: string) =>
    categories.filter((cat) => cat.parent_category_id === categoryId);

  function buildCategoryTree(category: ProductCategory): ProductCategory {
    const children = getChildren(category.id);
    return {
      ...category,
      category_children: children.map(buildCategoryTree),
    };
  }

  return buildCategoryTree(category);
}

export default function CategoriesSelector() {
  const [categories, setCategories] = useState<Record<string, ProductCategory | null>>({});
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const allCategories = await getCategories();
        setCategories({
          Men: findCategoryWithChildren(allCategories, "Men"),
          Women: findCategoryWithChildren(allCategories, "Women"),
          Kids: findCategoryWithChildren(allCategories, "Kids"),
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const renderMegaMenu = (categoryKey: string) => {
    const category = categories[categoryKey];
    if (!category) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center pt-10">
        <div className="relative bg-white w-full max-w-4xl p-8 rounded-lg shadow-xl">
          <div className="flex justify-end">
            <button
              onClick={() => setActiveMenu(null)}
              className="bg-gray-200 hover:bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center z-60 shadow-lg mb-3"
            >
              ✕
            </button>
          </div>
          
          <MegaMenu items={category.category_children} />
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="py-20 bg-gray-100">
        <div className="flex justify-center gap-8">
          {["Men", "Women", "Kids"].map((key) => (
            <div
              key={key}
              className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setActiveMenu(key)}
            >
              <Image
                src={`/cards/${key.toLowerCase()}.jpg`}
                alt={`${key} Category`}
                fill
                className="object-cover"
                quality={80}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <span className="text-white font-bold text-3xl">{key}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeMenu && renderMegaMenu(activeMenu)}
    </>
  );
}