import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import CategoriesSelector from "@modules/home/components/categories-selector"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Categories from "./categories/page"

export const metadata: Metadata = {
  title: "Kriolas Vintage",
  description:
    "Kriolas Vintage is a vintage clothing store that sells high-quality, pre-owned clothing.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <CategoriesSelector/>
      <Categories />

      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
          <iframe
            src="https://widgets.sociablekit.com/instagram-feed/iframe/25483320"
            width="100%"
            height="400px"
          ></iframe>
        </ul>
      </div>
    </>
  )
}
