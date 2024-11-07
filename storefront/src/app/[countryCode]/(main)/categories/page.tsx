"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

import { HttpTypes } from "@medusajs/types"

export default function Categories() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/product-categories`, {
      credentials: "include",
      headers: new Headers(
        process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
          ? { "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY }
          : undefined
      ),
    })
      .then((res) => res.json())
      .then(({ product_categories }) => {
        setCategories(product_categories)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-col items-center text-center mb-16">
      <span className="text-base-regular text-gray-600 mb-6">
        Explore All Categories
      </span>
      <p className="text-2xl-regular text-ui-fg-base max-w-lg mb-12">
        Discover the perfect product by browsing our categories
      </p>

      <div className="grid grid-cols-5 gap-x-8 border-r border-gray-300">
        {loading && <span>Loading...</span>}
        {!loading && categories.length === 0 && <span>No product categories found.</span>}
        {!loading && categories.length > 0 && (
          categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`py-2 ${index % 5 !== 4 ? 'border-r border-gray-300' : ''}`}
            >
                <Link
                    className="flex gap-x-1 items-center group transition duration-300"
                    href={`/categories/${category.handle}`}
                >
                    <span className="relative">
                        {category.name}
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}