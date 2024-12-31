import React from "react"
import Link from "next/link"

interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}

interface MegaMenuProps {
  items: MenuItem[]
}

const MegaMenu: React.FC<MegaMenuProps> = ({ items }) => {
  return (
      <div className="relative z-50 w-full h-full">
        {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {items.map((item) => (
              <div
                key={item.label}
                className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Main Category */}
                <Link
                  href={item.href}
                  className="block text-2xl font-extrabold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>

                {/* Subcategories */}
                {item.children && (
                  <ul className="mt-4 space-y-3">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="flex items-center text-gray-600 hover:text-indigo-500 transition"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-indigo-500 group-hover:text-indigo-600 transition-colors"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          {child.label}
                        </Link>
                        {child.children && (
                          <ul className="mt-2 pl-5 space-y-2 border-l border-gray-300">
                            {child.children.map((grandChild) => (
                              <li key={grandChild.label}>
                                <Link
                                  href={grandChild.href}
                                  className="text-sm text-gray-500 hover:text-indigo-400 transition"
                                >
                                  {grandChild.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
    </div>
  )
}

export default MegaMenu