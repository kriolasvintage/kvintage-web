"use client"

import { Metadata } from "next"
import Image from "next/image"
import { useState } from "react"
import MegaMenu from "@modules/home/components/mega-menu"

export const metadata: Metadata = {
  title: "Kriolas Vintage",
  description:
    "Kriolas Vintage is a vintage clothing store that sells high-quality, pre-owned clothing.",
}

const menuItems = [
  {
    label: "Clothing",
    href: "/categories/clothing",
    children: [
      { label: "Jacket & Coats", href: "/categories/jacket-&-coats" },
      { label: "Dresses", href: "/categories/dresses" },
      { label: "Trousers", href: "/categories/trousers" },
      { label: "Tops", href: "/categories/tops" },
      { label: "Jeans", href: "/categories/jeans" },
      { label: "Shirts & Blouses", href: "/categories/shirts-&-blouses" },
      { label: "Blazers & Waistcoats", href: "/categories/blazers-&-waistcoats" },
      { label: "Knitwear", href: "/categories/knitwear" },
      { label: "Bags", href: "/categories/bags" },
      { label: "Skirts", href: "/categories/skirts" }
    ],
  },
  {
    label: "Accessories",
    href: "/categories/accessories",
    children: [
      { label: "Bags", href: "/categories/bags" },
      { label: "Hats", href: "/categories/hats" },
      { label: "Belts", href: "/categories/belts" },
      { label: "Hair Accessories", href: "/categories/hair-accessories" },
      { label: "Gloves", href: "/categories/gloves" },
      { label: "Sunglasses", href: "/categories/sunglasses" },
      { label: "Wallets & Purses", href: "/categories/wallets-&-purses" },
      { label: "Jewellery", href: "/categories/jewellery", children: [
        { label: "Bracelets", href: "/categories/bracelets" },
        { label: "Earrings", href: "/categories/earrings" },
        { label: "Necklace", href: "/categories/necklace" },
        { label: "Rings", href: "/categories/rings" },
        { label: "Scarves", href: "/categories/scarves" },
      ], },
    ],
  },
  {
    label: "Shoes",
    href: "/categories/shoes",
    children: [
      { label: "Others", href: "/categories/others" }
    ],
  },
]

export default function CategoriesSelector() {
  const [showMegaMenu, setShowMegaMenu] = useState(false)

  return (
    <>
      {/* Section */}
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
          <div
            className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setShowMegaMenu(true)}
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
          </div>

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
        {/* Fullscreen MegaMenu */}
        {showMegaMenu && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center pt-10">
                <div className="relative bg-white w-full max-w-4xl p-8 rounded-lg shadow-xl z-50">
                    {/* Botão de Fechar */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowMegaMenu(false)}
                            className="bg-gray-200 hover:bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center z-60 shadow-lg mb-3"
                        >
                            ✕
                        </button>
                    </div>

                    <MegaMenu items={menuItems} />
                </div>
            </div>
        )}
    </>
  )
}