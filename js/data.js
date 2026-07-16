/* ==========================================================================
   Stilletos Decor & Catering — static data
   Plain global object so this loads with a normal <script> tag (no modules,
   no build step, works straight off the filesystem).
   ========================================================================== */

window.STILLETOS_DATA = (function () {
  const BUSINESS_INFO = {
    name: "Stilletos Decor & Catering",
    tagline: "Crafting Luxuries, Creating Memories",
    phone: "067 659 5756",
    whatsappNumber: "27676595756",
    email: "cafenetwork1@gmail.com",
    location: "397 Matshelapata, Chaneng, Rustenburg, 0310",
    coords: { lat: -25.4118433, lng: 27.126436 },
    socials: {
      tiktok: "https://www.tiktok.com/@stilletos_decor?_r=1&_t=ZS-983eawvylFw",
      instagram: "https://www.instagram.com/stilletos_decor/",
      facebook: "https://www.facebook.com/share/1HhN3jWGQf/",
      whatsapp:
        "https://wa.me/27676595756?text=Hi%20Stilletos%20Decor,%20I%27d%20like%20to%20inquire%20about%20your%20services.",
    },
  };

  const ADULT_RENTALS = [
    {
      id: "rent-1",
      name: "Gold Phoenix Chair",
      category: "furniture",
      price: "R45 / item",
      description:
        "High-gloss acrylic Phoenix chair with gold finish frame, perfect for special celebrations and formal dinner events.",
    },
    {
      id: "rent-2",
      name: "Classic Velvet Throne Chair",
      category: "furniture",
      price: "R850 / day",
      description:
        "Plush high-back tufted velvet lounge chair with gold frame. Available in black, emerald green, and white.",
    },
    {
      id: "rent-3",
      name: "Ribbed Amber Wine Glasses",
      category: "tableware",
      price: "R12 / item",
      description:
        "Stunning vintage-styled amber glassware with ribbed texture. Adds a warm, elegant glow to your table setting.",
    },
    {
      id: "rent-4",
      name: "Gold-Rimmed Clear Champagne Flutes",
      category: "tableware",
      price: "R15 / item",
      description:
        "Crystal-clear champagne flutes with a delicate, painted gold rim. Set of 10 or individual rentals.",
    },
    {
      id: "rent-5",
      name: "24k Matte Gold Cutlery Set",
      category: "tableware",
      price: "R35 / set",
      description:
        "Premium stainless steel cutlery set with a matte gold finish. Includes dinner fork, knife, spoon, and dessert spoon.",
    },
    {
      id: "rent-6",
      name: "Organic Rounded Gold Arch",
      category: "decor",
      price: "R450 / day",
      description:
        "Circular iron frame arch in matte gold. Easy to assemble, perfect as a backdrop for special vows, photography, or photo booths.",
    },
    {
      id: "rent-7",
      name: "White High-Gloss Plinth Set",
      category: "decor",
      price: "R300 / set",
      description:
        "Set of 3 cylinders of varying heights for displaying cakes, floral arrangements, or party favors.",
    },
    {
      id: "rent-8",
      name: "Gold Beaded Glass Underplate",
      category: "tableware",
      price: "R18 / item",
      description:
        "Clear glass charger plates with a shimmering gold-beaded outer edge, perfect for layered table designs.",
    },
  ];

  const KIDS_RENTALS = [
    {
      id: "kids-rent-1",
      name: "Mini White Tiffany Chair",
      category: "kids",
      price: "R25 / item",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      description:
        "Adorable, sturdy child-sized classic Tiffany chairs. Available in pink, blue, white, and clear.",
    },
    {
      id: "kids-rent-2",
      name: "Pastel Butterfly Chair",
      category: "kids",
      price: "R30 / item",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
      description:
        "Whimsical butterfly-winged backrest chairs for a fairy, garden, or princess-themed table setup.",
    },
    {
      id: "kids-rent-3",
      name: "Kid-Sized Low Picnic Table",
      category: "kids",
      price: "R150 / day",
      image:
        "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?auto=format&fit=crop&w=600&q=80",
      description:
        "Low wooden pallet style tables perfect for floor seating with cushions. Accommodates 6-8 kids.",
    },
    {
      id: "kids-rent-4",
      name: "Pastel Blue & Pink Candy Cart",
      category: "kids",
      price: "R650 / day",
      image:
        "https://images.unsplash.com/photo-1533223136615-5058ae15fb33?auto=format&fit=crop&w=600&q=80",
      description:
        "Vintage-style wooden cart on wheels. Perfect for candy displays, popcorn machines, or milkshakes.",
    },
    {
      id: "kids-rent-5",
      name: "Multi-Color Jumping Castle (3x3m)",
      category: "kids",
      price: "R450 / day",
      image:
        "https://images.unsplash.com/photo-1572244144380-600694efb301?auto=format&fit=crop&w=600&q=80",
      description:
        "Safe, bright, bouncy jumping castle with entry safety netting. Suitable for kids up to 10 years.",
    },
    {
      id: "kids-rent-6",
      name: "White Bounce Castle with Slide",
      category: "kids",
      price: "R1,200 / day",
      image:
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
      description:
        "Premium chic all-white bounce castle. Highly popular for photoshoots, modern aesthetics, and custom balloons.",
    },
  ];

  const ADULT_SERVICES = [
    {
      id: "srv-1",
      title: "Full Event Decor & Design",
      description:
        "From blueprint design to on-site execution, we conceptualize and build gorgeous, high-contrast black-and-gold themed atmospheres for milestones and high-end events.",
      features: [
        "Tailored color palette alignment (sleek black, matte gold, crystal accents)",
        "Exclusive backdrops, floral structures, and custom printed photobooth walls",
        "Full installation, staging, and breakdown",
      ],
      image: "assets/images/srv-1.jpeg",
    },
    {
      id: "srv-3",
      title: "Bespoke Table Styling",
      description:
        "The table is your canvas. We design cohesive, jaw-dropping tablescapes featuring ribbed amber glassware, gold beaded charger plates, custom black napkins, and breathtaking floral displays.",
      features: [
        "Layered high-end dinnerware curation",
        "Unique amber and ribbed crystal glassware pairs",
        "Custom linen rentals including premium velvet or high-thread cotton napkins",
        "Floral centerpieces combined with elegant tapered gold candle holders",
      ],
      image: "assets/images/srv-3.jpeg",
    },
    {
      id: "srv-4",
      title: "Premium Equipment Hire",
      description:
        "An exclusive collection of pristine tablescape assets, gorgeous seating, structures, and service-ready items for food service setup.",
      features: [
        "Phoenix chairs and velvet throne statement pieces",
        "Premium plates, glass pairs, gold cutlery, and tableware sets",
        "Custom backdrops, balloon rings, and stage platform elements",
        "Professional cleaning and quality-inspected item delivery",
      ],
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const KIDS_PACKAGES = [
    {
      key: "glam",
      name: "GLAM PACKAGE",
      title: "Premium Whimsical Wonderland",
      blurb:
        "A premium wonderland experience featuring our signature white flooring, cabana tent, specialized butterfly wooden chairs, and candy cart.",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
      bullets: [
        "Cabana Tent & White Flooring",
        "Balloon Entrance Arch",
        "Multi Backdrops Panels",
        "Premium Main Birthday Chair",
        "Premium Kids Chairs (Wood/Butterfly style)",
        "Full Theme Party Packs with custom goodies",
        "Printing - Full Backdrop Sticker + Stickers 2x2",
        "Themed Party Pack Stand",
        "Beautiful Mini Candy Cart",
        "Elegant Plates, Glasses & Cutlery matching the theme",
        "Custom Creative Centerpieces",
        "Custom Branded Bottled Water",
        "Stunning Cake Table setup",
        "Delectable Milkshakes for all guests",
      ],
      prices: { 10: "R7 500", 15: "R8 500", 20: "R9 500" },
    },
    {
      key: "standard",
      name: "STANDARD PACKAGE",
      title: "Vibrant Classic Party Fun",
      blurb:
        "A colorful fun-filled classic package containing a custom 3x3 jumping castle, artificial lawn grass carpet, mini throne/table, and beautiful theme decorations.",
      image:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
      bullets: [
        "Sturdy Cabana Tent shelter",
        "3 Printed/Styled Backdrop screens",
        "Mini Main Birthday Chair",
        "Themed Kids Chairs (Tiffany or Wimbledon)",
        "Cute Theme Party Packs",
        "Custom Printed Stickers x2",
        "Multi-color 3x3m Jumping Castle included",
        "Party Pack Display Stand",
        "Colorful Plates, Glasses & Cutlery (high quality plastic/paper)",
        "Themed Table Centerpiece decoration",
        "Themed Bottled Water",
        "Classic Cake Table display",
        "Green Artificial Carpet/Lawn",
      ],
      prices: { 10: "R4 000", 15: "R5 000", 20: "R6 000" },
    },
  ];

  const KIDS_EXTRAS = [
    {
      name: "White Jumping Castle",
      badge: "Active Inflatable",
      desc: "Add a modern sleek aesthetic that matches any customized colors perfectly.",
      price: "R1 200",
    },
    {
      name: "Bubble House",
      badge: "Premium Visual",
      desc: "An incredible transparent inflatable balloon house for beautiful photographs.",
      price: "R2 000",
    },
    {
      name: "Fresh Flowers",
      badge: "Table Decor",
      desc: "Replace faux elements with fragrant, gorgeous color-matched flowers.",
      price: "R1 000",
    },
  ];

  const ADULT_GALLERY_IMAGES = [
    "assets/images/adult-gallery-1.mp4",
    "assets/images/adult-gallery-2.jpeg",
    "assets/images/adult-gallery-3.jpeg",
    "assets/images/adult-gallery-4.jpeg",
    "assets/images/adult-gallery-5.jpeg",
    "assets/images/adult-gallery-6.mp4",
    "assets/images/adult-gallery-7.jpeg",
    "assets/images/adult-gallery-8.jpeg",
    "assets/images/adult-gallery-9.jpeg",
    "assets/images/adult-gallery-10.jpeg",
    "assets/images/adult-gallery-11.mp4",
    "assets/images/adult-gallery-12.jpeg",
    "assets/images/adult-gallery-13.jpeg",
    "assets/images/adult-gallery-14.jpeg",
    "assets/images/adult-gallery-15.jpeg",
    "assets/images/adult-gallery-16.jpeg",
    "assets/images/adult-gallery-17.jpeg",
    "assets/images/adult-gallery-18.jpeg",
    "assets/images/adult-gallery-19.jpeg",
    "assets/images/adult-gallery-20.jpeg",
    "assets/images/adult-gallery-21.jpeg",
  ];

  const KIDS_GALLERY_IMAGES = [
    "assets/images/kids-gallery-1.mp4",
    "assets/images/kids-gallery-2.jpeg",
    "assets/images/kids-gallery-3.jpeg",
    "assets/images/kids-gallery-4.jpeg",
    "assets/images/kids-gallery-5.jpeg",
    "assets/images/kids-gallery-6.jpeg",
    "assets/images/kids-gallery-7.jpeg",
    "assets/images/kids-gallery-8.jpeg",
    "assets/images/kids-gallery-9.mp4",
    "assets/images/kids-gallery-10.jpeg",
    "assets/images/kids-gallery-11.jpeg",
    "assets/images/kids-gallery-12.jpeg",
    "assets/images/kids-gallery-13.jpeg",
    "assets/images/kids-gallery-14.jpeg",
    "assets/images/kids-gallery-15.jpeg",
    "assets/images/kids-gallery-16.jpeg",
    "assets/images/kids-gallery-17.mp4",
    "assets/images/kids-gallery-18.jpeg",
    "assets/images/kids-gallery-19.jpeg",
    "assets/images/kids-gallery-20.jpeg",
    "assets/images/kids-gallery-21.jpeg",
    "assets/images/kids-gallery-22.jpeg",
    "assets/images/kids-gallery-23.jpeg",
    "assets/images/kids-gallery-24.jpeg",
  ];

  return {
    BUSINESS_INFO,
    ADULT_RENTALS,
    KIDS_RENTALS,
    ADULT_SERVICES,
    KIDS_PACKAGES,
    KIDS_EXTRAS,
    ADULT_GALLERY_IMAGES,
    KIDS_GALLERY_IMAGES,
  };
})();
