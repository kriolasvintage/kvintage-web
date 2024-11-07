"use client" // include with Next.js 13+

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"

export default function Categories() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<
    HttpTypes.StoreProductCategory[]
  >([])
  const limit = 20
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(false)

  useEffect(() => {
    if (!loading) {
      return 
    }

    const offset = (currentPage - 1) * limit

    const searchParams = new URLSearchParams({
      limit: `${limit}`,
      offset: `${offset}`,
    })

    fetch(`http://localhost:9000/store/product-categories?${
      searchParams.toString()
    }`, {
      credentials: "include",
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
      },
    })
    .then((res) => res.json())
    .then(({ product_categories, count }) => {
      setCategories((prev) => {
        if (prev.length > offset) {
          // product categories already added because 
          // the same request has already been sent
          return prev
        }
        return [
          ...prev,
          ...product_categories,
        ]
      })
      setHasMorePages(count > limit * currentPage)
      setLoading(false)
    })
  }, [loading])

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && categories.length === 0 && (
        <span>No product categories found.</span>
      )}
      {!loading && categories.length > 0 && (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
      {!loading && hasMorePages && (
        <button 
          onClick={() => {
            setCurrentPage((prev) => prev + 1)
            setLoading(true)
          }}
          disabled={loading}
        >
          Load More
        </button>
      )}
    </div>
  )
}