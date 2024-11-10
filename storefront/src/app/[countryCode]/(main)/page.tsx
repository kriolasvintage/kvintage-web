import { Metadata } from "next"
import Image from "next/image"

import FeaturedProducts from "@modules/home/components/featured-products"
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

      {/* Cards */}
      <section className="py-20 bg-gray-100">
        <div className="flex justify-center gap-8">
          {/* Card Man */}
          <a
            href="/categories/man"
            className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/cards/men.jpg"
              alt="Men Category"
              layout="fill"
              objectFit="cover"
              quality={80}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <span className="text-white font-bold text-3xl">Men</span>
            </div>
          </a>

          {/* Card Women */}
          <a
            href="/categories/woman"
            className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/cards/woman.jpg"
              alt="Women Category"
              layout="fill"
              objectFit="cover"
              quality={80}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <span className="text-white font-bold text-3xl">Women</span>
            </div>
          </a>

          {/* Card Kids */}
          <a
            href="/categories/kids"
            className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src="/cards/kid.jpg"
              alt="Kids Category"
              layout="fill"
              objectFit="cover"
              quality={80}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <span className="text-white font-bold text-3xl">Kids</span>
            </div>
          </a>
        </div>
      </section>

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
