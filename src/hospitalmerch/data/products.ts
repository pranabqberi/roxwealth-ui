import product1 from 'assets/img/products/1.png';
import product2 from 'assets/img/products/2.png';
import product3 from 'assets/img/products/3.png';
import product4 from 'assets/img/products/4.png';
import product5 from 'assets/img/products/5.png';
import product6 from 'assets/img/products/6.png';
import product7 from 'assets/img/products/7.png';
import product8 from 'assets/img/products/8.png';
import product10 from 'assets/img/products/10.png';
import product12 from 'assets/img/products/12.png';
import product16 from 'assets/img/products/16.png';
import product17 from 'assets/img/products/17.png';
import product18 from 'assets/img/products/18.png';
// import product19 from 'assets/img/products/19.png';
import product20 from 'assets/img/products/20.png';
// import product21 from 'assets/img/products/21.png';
import product24 from 'assets/img/products/24.png';
import product25 from 'assets/img/products/25.png';
import product26 from 'assets/img/products/26.png';
import product27 from 'assets/img/products/27.png';

import dell from 'assets/img/brands/dell.png';
import honda from 'assets/img/brands/honda.png';
import xiaomi from 'assets/img/brands/xiaomi.png';
import huawei from 'assets/img/brands/huawei.png';
import intel from 'assets/img/brands/intel.png';

export type Product = {
  id: number;
  image: string;
  name: string;
  rating: number;
  rated?: number;
  price?: number;
  salePrice?: number;
  colors?: number;
  extra?: string;
  extraClass?: string;
  extra2?: string;
  extra2Class?: string;
  verified?: boolean;
  wishListed?: boolean;
  offer?: string;
  dealEndTime?: string;
};

export type SuggestedProductType = {
  id: number;
  checked: boolean;
  img: string;
  name: string;
  price: number;
};

export type ProductReviewType = {
  id: number;
  star: number;
  customer: string;
  date: string;
  review: string;
  images?: string[];
  reply?: {
    text: string;
    from: string;
    time: string;
  };
};

export type CartItemType = {
  id: number | string;
  name: string;
  image: string;
  color: string;
  price: number;
  size: string;
  quantity: number;
  total: number;
};

export type WishlistProductType = {
  product: string;
  productImage: string;
  color: string;
  price: number;
  size: number | string;
  quantity: number;
};

export type StoreProductType = {
  product: string;
  productImage: string;
  orders: number;
  rating: number;
  totalSpent: number;
  lastOrderDate: string;
};

export type ProductsTableProductType = {
  product: string;
  productImage: string;
  price?: number;
  priceMin?: number;
  priceMax?: number;
  category: string;
  tags: string[];
  starred: boolean;
  vendor: string;
  publishedOn: string;
};

export type Batteries = {
  cellBrand: string;
  cellCapacity: string;
  cellQuantity: number;
  cellType: string;
  color: string;
  compatibleDevice: string[];
  dimensions: string;
  id: string;
  medicalEquipmentName: string;
  modelNumber: string;
  otherCompatibleModels: string[];
  pictureUrl: string;
  price: number;
  productName: string;
  voltage: string;
  weight: string;
  isEnabled: boolean;
  isDeleted: boolean;
};

export const topDealsProducts: Product[] = [
  {
    id: 1,
    image: product6,
    name: 'PlayStation 5 DualSense Wireless Controller',
    rating: 5,
    rated: 67,
    price: 125,
    salePrice: 89.0,
    colors: 2,
    extra: 'dbrand skin available',
    extraClass: 'text-1000 fw-bold mb-2'
  },
  {
    id: 2,
    image: product1,
    name: 'Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands)',
    verified: true,
    rating: 5,
    rated: 74,
    price: 49.99,
    salePrice: 34.99,
    dealEndTime: 'days'
  },
  {
    id: 3,
    image: product2,
    name: 'iPhone 13 pro max-Pacific Blue, 128GB storage',
    rating: 5,
    rated: 33,
    price: 899.99,
    salePrice: 850.99,
    colors: 5,
    extra: 'Stock limited',
    extraClass: 'text-1000 fw-bold mb-2'
  },
  {
    id: 4,
    image: product3,
    name: 'Apple MacBook Pro 13 inch-M1-8/256GB-Space Gray',
    rating: 5,
    rated: 97,
    price: 1299.0,
    salePrice: 1149.0,
    colors: 2,
    extra: 'Apple care included',
    extraClass: 'text-1000 fw-bold mb-2'
  },
  {
    id: 5,
    image: product4,
    name: 'Apple iMac 24" 4K Retina Display M1 8 Core CPU, 7 Core GPU, 256GB SSD, Green (MJV83ZP/A) 2021',
    rating: 5,
    rated: 134,
    price: 1499,
    salePrice: 1399,
    colors: 7,
    extra: 'Exchange with kidney',
    extraClass: 'text-1000 fw-bold mb-2'
  },
  {
    id: 6,
    image: product5,
    name: 'Razer Kraken v3 x Wired 7.1 Surroung Sound Gaming headset',
    rating: 5,
    rated: 59,
    salePrice: 59,
    colors: 2
  }
];

export const topElectronicProducts: Product[] = [
  {
    id: 7,
    image: product5,
    name: 'Razer Kraken v3 x Wired 7.1 Surroung Sound Gaming headset',
    rating: 5,
    rated: 59,
    salePrice: 59,
    colors: 2
  },
  {
    id: 8,
    image: product7,
    name: '2021 Apple 12.9-inch iPad Pro (Wi‑Fi, 128GB) - Space Gray',
    rating: 5,
    rated: 13,
    salePrice: 799,
    colors: 2
  },
  {
    id: 9,
    image: product12,
    name: 'HORI Racing Wheel Apex for PlayStation 4/3, and PC',
    rating: 5,
    rated: 64,
    salePrice: 299,
    colors: 1,
    extra: 'Leather cover add-on available',
    extraClass: 'text-1000 fs--1 mb-0 fw-bold',
    extra2: 'supports Windows 11',
    extra2Class: 'text-700 fs--1 mb-2'
  },
  {
    id: 10,
    image: product1,
    name: 'Amazfit T-Rex Pro Smart Watch with GPS, Outdoor Fitness Watch for Men, Military Standard Certified',
    verified: true,
    wishListed: true,
    rating: 5,
    rated: 32,
    salePrice: 20,
    dealEndTime: '24 hours'
  },
  {
    id: 11,
    image: product16,
    name: 'Apple AirPods Pro',
    rating: 5,
    rated: 39,
    salePrice: 59,
    colors: 3,
    extra: 'Free with iPhone 5s',
    extraClass: 'text-1000 fs--1 mb-0 fw-bold',
    extra2: 'Ships to Canada',
    extra2Class: 'text-700 fs--1 mb-2'
  },
  {
    id: 12,
    image: product10,
    name: 'Apple Magic Mouse (Wireless, Rechargable) - Silver',
    rating: 1,
    rated: 6,
    salePrice: 89,
    colors: 2,
    extra: 'Bundle available',
    extraClass: 'text-1000 fs--1 mb-0 fw-bold',
    extra2: 'Charger not included',
    extra2Class: 'text-700 fs--1 mb-2'
  },
  {
    id: 13,
    name: 'Amazon Basics Matte Black Wired Keyboard - US Layout (QWERTY)',
    image: product8,
    salePrice: 98,
    rating: 3,
    rated: 7,
    colors: 1
  }
];

export const bestOfferProducts: Product[] = [
  {
    id: 14,
    image: product25,
    name: 'RESPAWN 200 Racing Style Gaming Chair, in Gray RSP 200 GRY',
    offer: '35%',
    rating: 5
  },
  {
    id: 15,
    image: product27,
    name: 'LEVOIT Humidifiers for Bedroom Large Room 6L Warm and Cool Mist for...',
    offer: '18%',
    rating: 4
  },
  {
    id: 16,
    image: product26,
    name: 'NETGEAR Nighthawk Pro Gaming XR500 Wi-Fi Router with 4 Ethernet Ports...',
    offer: '15%',
    rating: 5
  },
  {
    id: 17,
    image: product18,
    name: 'Rachael Ray Cucina Bakeware Set Includes Nonstick Bread Baking Cookie Sheet...',
    offer: '20%',
    rating: 3.5
  },
  {
    id: 18,
    image: product17,
    name: 'Xbox Series S',
    offer: '12%',
    rating: 5
  },
  {
    id: 19,
    image: product24,
    name: 'FURINNO Computer Writing Desk, Walnut',
    offer: '16%',
    rating: 5
  },
  {
    id: 20,
    name: 'Seagate Portable 2TB External Hard Drive Portable HDD',
    image: product18,
    offer: '15%',
    rating: 4
  }
];

export const suggestedProducts: SuggestedProductType[] = [
  {
    id: 1,
    checked: true,
    img: product2,
    name: 'iPhone 13 pro max-Pacific Blue- 128GB',
    price: 899.99
  },
  {
    id: 2,
    checked: true,
    img: product16,
    name: 'Apple AirPods Pro',
    price: 59.0
  },
  {
    id: 3,
    checked: false,
    img: product10,
    name: 'Apple Magic Mouse (Wireless, Rechargable) - Silver, Worst mouse ever',
    price: 89.0
  }
];

export const cartItems: CartItemType[] = [
  {
    id: 1,
    name: 'Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands)',
    image: product1,
    color: 'Glossy black',
    price: 199,
    size: 'XL',
    quantity: 2,
    total: 398
  },
  {
    id: 2,
    name: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    image: product2,
    color: 'Glossy black',
    price: 150,
    size: 'XL',
    quantity: 2,
    total: 300
  },
  {
    id: 3,
    name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    image: product3,
    color: 'Glossy Golden',
    price: 65,
    size: '34mm',
    quantity: 2,
    total: 130
  }
];

export const wishlistProducts: WishlistProductType[] = [
  {
    product:
      'Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands)',
    productImage: product1,
    color: 'Pure matte black',
    price: 57,
    size: 42,
    quantity: 4
  },
  {
    product: '2021 Apple 12.9-inch iPad Pro (Wi‑Fi, 128GB) - Space Gray',
    productImage: product7,
    color: 'Black',
    price: 1499,
    size: 'Pro',
    quantity: 2
  },
  {
    product: 'PlayStation 5 DualSense Wireless Controller',
    productImage: product6,
    color: 'White',
    price: 299,
    size: 'Regular',
    quantity: 2
  },
  {
    product: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    productImage: product3,
    color: 'Space Gray',
    price: 1699,
    size: 'Pro',
    quantity: 2
  },
  {
    product:
      'Apple iMac 24" 4K Retina Display M1 8 Core CPU, 7 Core GPU, 256GB SSD, Green (MJV83ZP/A) 2021',
    productImage: product4,
    color: 'Ocean Blue',
    price: 65,
    size: '21"',
    quantity: 1
  },
  {
    product: 'Apple Magic Mouse (Wireless, Rechargable) - Silver',
    productImage: product10,
    color: 'White',
    price: 30,
    size: 'Regular',
    quantity: 3
  },
  {
    product: 'Amazon Basics Matte Black Wired Keyboard - US Layout (QWERTY)',
    productImage: product8,
    color: 'Black',
    price: 40,
    size: 'MD',
    quantity: 2
  },
  {
    product: 'HORI Racing Wheel Apex for PlayStation 4_3, and PC',
    productImage: product12,
    color: 'Black',
    price: 130,
    size: '45',
    quantity: 1
  },
  {
    product: 'Xbox Series S',
    productImage: product17,
    color: 'Space Gray',
    price: 99,
    size: 'sm',
    quantity: 1
  }
];

export const storeProducts: StoreProductType[] = [
  {
    product: 'Dell Technologies',
    productImage: dell,
    rating: 5,
    orders: 3,
    totalSpent: 1250,
    lastOrderDate: 'Dec 12, 12:56 PM'
  },
  {
    product: 'Honda',
    productImage: honda,
    rating: 3,
    orders: 5,
    totalSpent: 1499,
    lastOrderDate: 'Dec 09, 10:48 AM'
  },
  {
    product: 'Xiaomi',
    productImage: xiaomi,
    rating: 3,
    orders: 6,
    lastOrderDate: 'Dec 03, 05:45 PM',
    totalSpent: 360
  },
  {
    product: 'Huawei Shop BD',
    productImage: huawei,
    rating: 3,
    orders: 1,
    lastOrderDate: 'Nov 27, 06:20 PM',
    totalSpent: 1799
  },
  {
    product: 'Intel',
    productImage: intel,
    rating: 4,
    orders: 2,
    lastOrderDate: 'Nov 21, 10:25 AM',
    totalSpent: 65
  }
];

export const allProducts: Product[] = [
  ...topDealsProducts,
  ...topElectronicProducts.slice(1, -1),
  {
    id: 21,
    image: product25,
    name: 'RESPAWN 200 Racing Style Gaming Chair, in Gray RSP 200 GRY',
    rating: 5,
    rated: 8,
    salePrice: 499,
    colors: 2
  },
  {
    id: 22,
    image: product27,
    name: 'LEVOIT Humidifiers for Bedroom Large Room 6L Warm and Cool Mist for...',
    rating: 5,
    rated: 3,
    salePrice: 299,
    colors: 3
  },
  {
    id: 23,
    image: product26,
    name: 'NETGEAR Nighthawk Pro Gaming XR500 Wi-Fi Router with 4 Ethernet Ports...',
    rating: 5,
    rated: 8,
    salePrice: 49,
    colors: 4
  },
  {
    id: 24,
    image: product18,
    name: 'Rachael Ray Cucina Bakeware Set Includes Nonstick Bread Baking Cookie Sheet...',
    rating: 5,
    rated: 1,
    salePrice: 29,
    colors: 3
  },
  {
    id: 25,
    image: product17,
    name: 'Xbox Series S',
    rating: 5,
    rated: 6,
    salePrice: 19,
    colors: 2
  },
  {
    id: 26,
    image: product24,
    name: 'FURINNO Computer Writing Desk, Walnut',
    rating: 5,
    rated: 8,
    salePrice: 199,
    colors: 2
  },
  {
    id: 27,
    image: product20,
    name: 'ASUS TUF Gaming F15 Gaming Laptop',
    rating: 4,
    rated: 3,
    salePrice: 150,
    colors: 2
  }
];

// const URL = 'https://engine.qberi.com/api/allBatteryDetails';
// const sessionToken = localStorage.getItem('sessionToken');
// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${sessionToken}`
// };

// let allProductData: Batteries[] = [];

// function fetchData() {
//   axios.get(URL, { headers: headers })
//     .then(response => {
//       allProductData = response.data;
//       console.log('Response:', allProductData);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// fetchData();
// const toggleMessageWithDelay = () => {
//   setTimeout(() => {
//     console.log('data', allProductData);
//   }, 2000);
// };
// toggleMessageWithDelay();
// console.log('data', allProductData);
// export const productsTableData: Batteries[] = allProductData;
// export const productsTableData: Batteries[] = [
//   {
//     cellBrand: 'ABC Batteries',
//     cellCapacity: '3000 mAh',
//     cellQuantity: 4,
//     cellType: 'Lithium-ion',
//     color: 'Black',
//     compatibleDevices: ['Device A', 'Device B'],
//     dimensions: '10x5x3 inches',
//     id: 'ae7034e8-274e-4b2c-bf51-19b0863477a4',
//     medicalEquipmentName: 'Portable Ventilator',
//     modelNumber: 'RB-123',
//     otherCompatibleModels: ['Model X', 'Model Y'],
//     pictureUrl: 'https://example.com/image1.jpg',
//     price: 50,
//     productName: 'Rechargeable Battery'
//   },
//   {
//     cellBrand: 'ABC Batteries',
//     cellCapacity: '3000 mAh',
//     cellQuantity: 4,
//     cellType: 'Lithium-ion',
//     color: 'Black',
//     compatibleDevices: ['Device A', 'Device B'],
//     dimensions: '10x5x3 inches',
//     id: 'abc',
//     medicalEquipmentName: 'Portable Ventilator',
//     modelNumber: 'RB-123',
//     otherCompatibleModels: ['Model X', 'Model Y'],
//     pictureUrl: 'https://example.com/image1.jpg',
//     price: 50,
//     productName: 'Rechargeable Battery'
//   }
//   // {
//   //   product: 'ASUS TUF Gaming F15 Gaming Laptop',
//   //   productImage: product20,
//   //   price: 150,
//   //   category: 'Computer',
//   //   tags: ['Gaming', 'Battery', 'Performance', 'Wireless'],
//   //   starred: false,
//   //   vendor: 'Kizzstore',
//   //   publishedOn: 'Dec 01, 12:00 PM'
//   // }
// ];
