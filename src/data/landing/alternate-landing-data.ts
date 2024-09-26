// import illustration34 from 'assets/img/spot-illustrations/34.png';
// import illustration34_2 from 'assets/img/spot-illustrations/34_2.png';
// import illustration35 from 'assets/img/spot-illustrations/35.png';
// import illustration35_2 from 'assets/img/spot-illustrations/35_2.png';
// import illustration36 from 'assets/img/spot-illustrations/36.png';
// import illustration36_2 from 'assets/img/spot-illustrations/36_2.png';
// import illustration23 from 'assets/img/spot-illustrations/23.png';
// import illustration23_2 from 'assets/img/spot-illustrations/23_2.png';
import mediaSpoor from 'assets/img/gallery/Media-Spoor.png';
import qberiFinance from 'assets/img/gallery/2Qberi Financial Services.png';
import qberiSoftware from 'assets/img/gallery/3Qberi Software Solutions Image .png';
import roxmedia from 'assets/img/gallery/Roxwealth-media.png';
// import qberiHeader from 'assets/img/gallery/1Qberi Header Image.png';
import cadioMed from 'assets/img/gallery/5CadioMed Image.png';
import icon1 from 'assets/img/icons/lightning-speed.png';
import darkIcon1 from 'assets/img/icons/lightning-speed-dark.png';
import icon2 from 'assets/img/icons/best-statistics.png';
import darkIcon2 from 'assets/img/icons/best-statistics-dark.png';
import icon3 from 'assets/img/icons/all-night.png';
import darkIcon3 from 'assets/img/icons/all-night-dark.png';
import icon4 from 'assets/img/icons/editable-features.png';
import darkIcon4 from 'assets/img/icons/editable-features-dark.png';
import tdsimg from 'assets/img/gallery/tds-img.png';
import blog5 from 'assets/img/blog/blog-5.png';
import blog6 from 'assets/img/blog/blog-6.png';
import blog7 from 'assets/img/blog/blog-7.png';
import team70 from 'assets/img/team/70.webp';
import team15 from 'assets/img/team/15.webp';
import team71 from 'assets/img/team/71.webp';
import team72 from 'assets/img/team/72.webp';
import team73 from 'assets/img/team/73.webp';
import team74 from 'assets/img/team/74.webp';
import team75 from 'assets/img/team/75.webp';
import team76 from 'assets/img/team/76.webp';
import team20 from 'assets/img/team/20.webp';
import Bummmel from 'assets/img/gallery/Lego-Bummel_compressed.png';

export interface Feature {
  id: number;
  title: string;
  description: string;
  additional?: string;
  lightImg: string;
  darkImg: string;
  link: string;
  linkText: string;
  redirect?: boolean;
}

export interface Stat {
  id: number;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface Blog {
  id: number;
  image: string;
  views: number;
  like: number;
  comments: number;
  category: string;
  title: string;
}

export interface TeamMember {
  id: number;
  image: string;
  name: string;
  designation: string;
}

export const features: Feature[] = [
  {
    id: 1,
    title: 'Qberi Financial Services',
    description:
      'Your trusted partner for comprehensive financial solutions in the heart of South Africa. We specialize in crafting tailored investment strategies and long-term insurance products that empower you to build a secure and prosperous future. With a commitment to excellence and a deep understanding of the South African financial landscape, we stand ready to guide you on your journey towards financial success and peace of mind.',
    lightImg: qberiFinance,
    darkImg: qberiFinance,
    link: '/business/qberi-in-sa',
    linkText: 'Read more about Qberi Financial Services'
  },
  {
    id: 2,
    title: 'Qberi Software Solutions India',
    description:
      'Qberi Software Solutions India is your premier destination for cutting-edge technology services, working globally from our base in India. With expertise in data integration, dynamic KPI dashboard creation, and e-commerce website development, we empower businesses to thrive in the digital age. ',
    additional:
      'At Qberi Software Sollutions India , we transform data into insights, ideas into innovation, and visions into reality. Let us be your technology partner of choice, helping you navigate the digital landscape and achieve remarkable success.',
    lightImg: qberiSoftware,
    darkImg: qberiSoftware,
    link: '/business/units',
    linkText: 'Learn about Us'
  },
  {
    id: 3,
    title: 'Media Spoor',
    description:
      'Media Spoor,  based in the USA but with affiliate offices in South Africa and New Zealand provides our clients with precise Media Monitoring and Sentiment Analysis. Our dedicated team harnesses publicly available news sources, even behind paywalls, to deliver comprehensive brand sentiment insights. With our proprietary InsightStream Media Dashboard, we keep you informed, empowered, and ahead of the curve in the fast-paced world of corporate media analysis. Discover the power of real-time intelligence with Media Spoor.',
    lightImg: mediaSpoor,
    darkImg: mediaSpoor,
    link: '/business/units',
    linkText: 'Learn More '
  },
  {
    id: 4,
    title: 'Cardio-Med South Africa',
    description:
      'Established in 2004, Cardio Med has become a reputable name in the medical equipment industry. Originally focused on servicing and repairing medical equipment, our company has evolved to offer a comprehensive range of solutions, including the import and distribution of various medical products, accessories, and consumables. With a fully equipped workshop and a team of skilled professionals, Cardio Med ensures prompt and efficient service for all types of medical equipment. Our commitment to excellence extends beyond the initial sale, as we provide comprehensive after-sales support for all products supplied. ',
    additional:
      'Cardio Med upholds values of professionalism, quality, integrity, and customer focus in all our endeavors. By prioritizing the needs and satisfaction of our clients, they aim to deliver exceptional service and exceed expectations.',
    lightImg: cadioMed,
    darkImg: cadioMed,
    link: 'https://cardiomed.co.za',
    linkText: 'Visit Cardio-Med SA',
    redirect: true
  },
  {
    id: 5,
    title: 'TDS Construction Contracts and Claims Specialists',
    description:
      'At TDS, we specialize in providing tailored services that bridge the gap between contractors and clients, ensuring clear communication and effective project management. With extensive experience across various industries and global mega projects, we offer personalized assistance that integrates seamlessly into your management team, working tirelessly until you achieve the desired outcome. Our range of services is designed to address key project challenges and optimize performance at every stage. From comprehensive project program reporting to meticulous contract reviews, we provide insights and recommendations to safeguard your interests and ensure fairness in all dealings. Our expertise in construction claims enables us to navigate complex contractual issues and secure successful outcomes, drawing on a proven track record in regions such as the Middle East, South Africa, and Europe. ',
    additional:
      'Additionally, our program training equips schedulers with the necessary skills to maximize software capabilities, empowering your team to schedule projects effectively and efficiently. With our monthly reporting plan, you can protect your project against liquidated damages, claim rightfully from delayed events, and maintain contemporaneous records for enhanced project transparency. Trust TDS to safeguard your project and unlock its full potential.',
    lightImg: tdsimg,
    darkImg: tdsimg,
    link: 'https://tdsccc.com',
    linkText: 'Visit TDS',
    redirect: true
  },
  {
    id: 6,
    title: 'Bummel Leather Shoes',
    description:
      "Welcome to Bummel, where the art of strolling meets the craftsmanship of genuine leather goods. Established in 1990 in George, South Africa, our family-owned business has been dedicated to creating high-quality leather shoes and accessories. Bummel Shoes, introduced in November 2018, epitomizes our commitment to excellence. Handcrafted using the stitch-down construction method, our footwear ensures that no synthetic materials come in contact with your feet, prioritizing comfort and longevity. We believe in the superiority of 100% leather - it's breathable, odor-resistant, and exudes unparalleled quality. Our shoes feature premium veg tan leather insoles that absorb moisture, while the finest upper leather molds to the contours of your feet for a personalized fit. With leather linings to prevent sticking and ensure breathability, every Bummel shoe is a testament to our dedication to surpassing industry standards. ",
    additional:
      "Our founder and designer, Michael Stumpfe, brings a wealth of experience and a passion for quality to Bummel. With a background in shoe design and years of expertise gained from esteemed institutions and industry leaders in Germany and South Africa, Michael's vision for Bummel Shoes is one of uncompromising excellence. Collaborating with his father, Rolf, a seasoned shoe designer with over four decades of experience, Michael has cultivated a brand that embodies their shared commitment to craftsmanship and attention to detail. As we expand our distribution network and welcome new customers into the Bummel family, our small yet dedicated team continues to uphold the values of quality and tradition that define our brand. We invite you to experience the joy of strolling in Bummel Shoes - crafted with care, worn with pride.",
    lightImg: Bummmel,
    darkImg: Bummmel,
    link: 'https://bummel.com',
    linkText: 'Visit Bummel',
    redirect: true
  },
  {
    id: 7,
    title: 'Roxwealth LP',
    description:
      'Roxwealth is a hedge fund and venture capital entity based in the United States. They aim to make strategic investments in listed companies but also extend beyond traditional avenues into the realm of venture capital. Roxwealth navigates the complexities of financial markets by relying on two basic principles of investments:  "price is what you pay, value is what you get"; and  "never invest in a business that you don\'t understand".',
    additional:
      'Committed to delivering exceptional returns for its partners, Roxwealth blends expertise in both listed equities and venture capital.  to capitalize on diverse investment landscapes in the ever-evolving world of finance.',
    lightImg: roxmedia,
    darkImg: roxmedia,
    link: '/business/units',
    linkText: 'Learn More '
  }
];

export const services: Feature[] = [
  {
    id: 1,
    title: 'Lightning Speed',
    description: 'Grow fast with Qberi.',
    lightImg: icon1,
    darkImg: darkIcon1,
    link: '/business/units',
    linkText: 'Read more about Qberi Financial Services'
  },
  {
    id: 2,
    title: 'Best Statistics',
    description: 'Get all reports at hand!',
    lightImg: icon2,
    darkImg: darkIcon2,
    link: '/business/units',
    linkText: 'Learn about Us'
  },
  {
    id: 3,
    title: 'All-night Protection',
    description: 'Security Assured: Ensure data Safety with Qberi',
    lightImg: icon3,
    darkImg: darkIcon3,
    link: '/',
    linkText: 'Learn More '
  },
  {
    id: 4,
    title: 'Editable Features',
    description: 'Edits made easy and safe!',
    lightImg: icon4,
    darkImg: darkIcon4,
    link: '/',
    linkText: 'Learn More '
  }
];

export const stats: Stat[] = [
  {
    id: 1,
    title: 'Articles Analyzed per Minute',
    value: 4275,
    prefix: '',
    suffix: '+'
  },
  {
    id: 2,
    title: 'Daily Sentiment Analysis',
    value: 176,
    suffix: ''
  },
  {
    id: 3,
    title: 'Countries',
    value: 7
  },
  {
    id: 4,
    title: 'Stories',
    value: 125,
    suffix: '+'
  }
];

export const blogs: Blog[] = [
  {
    id: 1,
    image: blog5,
    views: 2563,
    like: 125,
    comments: 125,
    category: 'SEO',
    title: 'Top 10 ways to Ace SEO for your business'
  },
  {
    id: 2,
    image: blog6,
    views: 1256,
    like: 325,
    comments: 32,
    category: 'Marketing',
    title: 'Top 12 Marketing strategies you can take'
  },
  {
    id: 3,
    image: blog7,
    views: 142,
    like: 123,
    comments: 22,
    category: 'Marketing',
    title: 'The top 7 methods to improve as a marketer'
  }
];

export const team: TeamMember[] = [
  {
    id: 1,
    image: team70,
    name: 'Brett Bezos',
    designation: 'CEO'
  },
  {
    id: 2,
    image: team15,
    name: 'Lucas Murray',
    designation: 'General Manager'
  },
  {
    id: 3,
    image: team71,
    name: 'Casey Andrews',
    designation: 'IT Specialist'
  },
  {
    id: 4,
    image: team72,
    name: 'Poppy Russell',
    designation: 'Frontend Dev'
  },
  {
    id: 5,
    image: team73,
    name: 'Emma Knowles',
    designation: 'Backend Dev'
  },
  {
    id: 6,
    image: team74,
    name: 'Megan Holmes',
    designation: 'HR'
  },
  {
    id: 7,
    image: team75,
    name: 'Cameron Fletcher',
    designation: 'UX/UI Designer'
  },
  {
    id: 8,
    image: team20,
    name: 'Amber Norris',
    designation: 'Consultant'
  },
  {
    id: 9,
    image: team76,
    name: 'Scooby',
    designation: 'Dog'
  }
];
