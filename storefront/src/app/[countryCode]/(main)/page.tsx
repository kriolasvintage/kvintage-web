import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

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
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
          <div class='sk-instagram-feed' data-embed-id='25483320'></div><script src='https://widgets.sociablekit.com/instagram-feed/widget.js' async defer></script>
        </ul>
      </div>
    </>
  )
}
