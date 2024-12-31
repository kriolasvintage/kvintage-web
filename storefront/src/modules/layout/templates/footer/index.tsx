// import { getCategoriesList } from "@lib/data/categories"
// import { getCollectionsList } from "@lib/data/collections"
// import { Text, clx } from "@medusajs/ui"
import { Text } from "@medusajs/ui"

import { Instagram, Facebook, Mail, MapPin, Phone, PhoneCall } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  // const { collections } = await getCollectionsList(0, 6)
  // const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div className="flex flex-col gap-y-4">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase font-bold tracking-wider"
            >
              Kriolas Vintage
            </LocalizedClientLink>
            
            <div className="flex flex-col gap-y-3">
              <Text className="flex items-center text-ui-fg-subtle hover:text-ui-fg-base transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                <a 
                  href="mailto:contact@kvintage.dk" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:underline"
                >
                  contact@kvintage.dk
                </a>
              </Text>

              <Text className="flex items-center text-ui-fg-subtle hover:text-ui-fg-base transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                <span className="hover:underline">
                  +45 81742555
                </span>
              </Text>

              <Text className="flex items-center text-ui-fg-subtle hover:text-ui-fg-base transition-colors">
                <MapPin className="w-5 h-5 mr-2" />
                <a 
                  href="https://maps.app.goo.gl/SHQjmp8YzuEXyure6" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Helsingevej 44, 3230 Græsted, Denmark
                </a>
              </Text>

              <div className="flex items-center gap-x-4">
                <Text className="text-ui-fg-subtle">Connect with us:</Text>
                <div className="flex gap-x-3">
                  <a 
                    href="mailto:contact@kvintage.dk" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://wa.me/4581742555" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
                  >
                    <PhoneCall className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/kriolas.vintage" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61568418897278" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Kriolas Vintage. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
