export interface Helmet {
  id: string
  name: string
  brand: string
  price: number
  year: string
  image: string
  description: string
  features: string[]
  category: "premium" | "mid-range" | "entry"
}

export const helmets: Helmet[] = [
  {
    id: "fox-v3-rs-carbon",
    name: "Fox V3 RS Carbon",
    brand: "Fox Racing",
    price: 549,
    year: "2025",
    image: "/images/helmets/helmet-collection1.png",
    description:
      "The Fox V3 RS Carbon represents the pinnacle of motocross helmet technology. Featuring an ultra-lightweight carbon fiber shell and MVRS (Magnetic Visor Release System), this helmet delivers maximum protection with minimal weight.",
    features: ["Carbon fiber shell", "MVRS system", "Dual-density EPS", "Advanced ventilation", "Removable liner"],
    category: "premium",
  },
  {
    id: "bell-moto-10-spherical",
    name: "Bell Moto-10 Spherical",
    brand: "Bell",
    price: 699,
    year: "2025",
    image: "/images/helmets/helmet-collection2.png",
    description:
      "Engineered for maximum protection against rotational forces, the Bell Moto-10 Spherical uses advanced materials including carbon fiber, Kevlar, and fiberglass blend with Flex technology for superior impact absorption.",
    features: [
      "Spherical technology",
      "Carbon/Kevlar shell",
      "Flex impact system",
      "Velocity flow ventilation",
      "Magnetic cheek pads",
    ],
    category: "premium",
  },
  {
    id: "alpinestars-sm10",
    name: "Alpinestars SM10",
    brand: "Alpinestars",
    price: 619,
    year: "2025",
    image: "/images/helmets/helmet-collection3.png",
    description:
      "The Alpinestars Supertech M10 Carbon Helmet features an ultra-lightweight carbon fiber shell with MIPS technology for rotational impact protection and advanced ventilation system.",
    features: [
      "MIPS technology",
      "Carbon fiber shell",
      "A-Head fitment system",
      "Hydration compatible",
      "Emergency release",
    ],
    category: "premium",
  },
  {
    id: "shoei-vfx-evo",
    name: "Shoei VFX-EVO",
    brand: "Shoei",
    price: 579,
    year: "2025",
    image: "/images/helmets/helmet-collection4.png",
    description:
      "The Shoei VFX-EVO combines Japanese craftsmanship with cutting-edge safety technology. Multi-ply matrix shell construction provides optimal strength-to-weight ratio.",
    features: ["Multi-ply matrix shell", "M.E.D.S. liner", "V-460 ventilation", "E.Q.R.S. system", "4 shell sizes"],
    category: "premium",
  },
  {
    id: "fox-v1-nitro",
    name: "Fox V1 Nitro",
    brand: "Fox Racing",
    price: 199,
    year: "2024",
    image: "/images/helmets/helmet-collection5.png",
    description:
      "The Fox V1 Nitro offers premium features at an accessible price point. Dual-density EPS construction and optimized ventilation make this an excellent choice for riders of all levels.",
    features: ["Dual-density EPS", "4 intake vents", "2 exhaust vents", "Removable liner", "DOT/ECE certified"],
    category: "entry",
  },
  {
    id: "bell-mx9-mips",
    name: "Bell MX-9 MIPS",
    brand: "Bell",
    price: 249,
    year: "2024",
    image: "/images/helmets/helmet-collection6.png",
    description:
      "The Bell MX-9 MIPS delivers professional-level protection with the added security of MIPS brain protection system. Polycarbonate shell keeps weight manageable.",
    features: ["MIPS protection", "Polycarbonate shell", "Velocity flow", "Removable padding", "Camera mount ready"],
    category: "mid-range",
  },
  {
    id: "alpinestars-m10-dyno",
    name: "Alpinestars M10 Dyno",
    brand: "Alpinestars",
    price: 589,
    year: "2024",
    image: "/images/helmets/helmet-collection7.png",
    description:
      "The M10 Dyno features aggressive styling combined with Alpinestars proven safety technology. Lightweight composite shell with MIPS provides comprehensive protection.",
    features: ["MIPS liner", "Composite shell", "15 vents", "Quick-release visor", "Hydration ready"],
    category: "premium",
  },
  {
    id: "arai-vx-pro4",
    name: "Arai VX-Pro4",
    brand: "Arai",
    price: 649,
    year: "2024",
    image: "/images/helmets/helmet-collection8.png",
    description:
      "Arai's flagship motocross helmet combines over 70 years of helmet-making expertise. The VX-Pro4 features their exclusive cLc shell construction for maximum protection.",
    features: ["cLc shell", "FCS cheek pads", "10 intake vents", "4 exhaust vents", "Removable peak"],
    category: "premium",
  },
]

export const getHelmetById = (id: string): Helmet | undefined => {
  return helmets.find((h) => h.id === id)
}

export const getHelmetsByYear = (year: string): Helmet[] => {
  return helmets.filter((h) => h.year === year)
}

export const getHelmetsByBrand = (brand: string): Helmet[] => {
  return helmets.filter((h) => h.brand === brand)
}
