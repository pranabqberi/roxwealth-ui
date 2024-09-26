import team33 from 'assets/img/team/33.webp';
import team30 from 'assets/img/team/30.webp';
import team31 from 'assets/img/team/31.webp';
import team60 from 'assets/img/team/60.webp';
import team32 from 'assets/img/team/32.webp';
import team35 from 'assets/img/team/35.webp';
import team57 from 'assets/img/team/57.webp';
import team58 from 'assets/img/team/58.webp';
import team59 from 'assets/img/team/59.webp';
import team34 from 'assets/img/team/34.webp';
import team29 from 'assets/img/team/29.webp';
import team3 from 'assets/img/team/3.webp';
import team9 from 'assets/img/team/9.webp';
import team25 from 'assets/img/team/25.webp';
import team22 from 'assets/img/team/22.webp';
import team28 from 'assets/img/team/28.webp';
// import team62 from 'assets/img/team/62.webp';
// import team63 from 'assets/img/team/63.webp';
// import team64 from 'assets/img/team/64.webp';
import team65 from 'assets/img/team/65.webp';
// import team66 from 'assets/img/team/66.webp';
// import team67 from 'assets/img/team/67.webp';
// import team68 from 'assets/img/team/68.webp';
// import team69 from 'assets/img/team/69.webp';

import jaco from 'assets/img/team/Jacob.png';
import pranab from 'assets/img/team/Pranab.png';
import nitish from 'assets/img/team/Nitesh.png';
import rohan from 'assets/img/team/Rohan.png';
import marika from 'assets/img/team/Marika.png';
import leonie from 'assets/img/team/Leonie.png';
import jacques from 'assets/img/team/Jacques.png';
import johan from 'assets/img/team/Johan.png';
import ilze from 'assets/img/team/Ilze.png';
import tania from 'assets/img/team/Tania.png';
import frans from 'assets/img/team/Frans.jpeg';
import michael from 'assets/img/team/Michael.png';

export interface Member {
  id: number;
  name: string;
  avatar?: string;
  username: string;
  connections: number;
  mutual: number;
}

export const members: Member[] = [
  {
    id: 1,
    name: 'Tyrion Lannister',
    avatar: team33,
    username: 'tyrion222',
    connections: 224,
    mutual: 24
  },
  {
    id: 2,
    name: 'Milind Mikuja',
    avatar: team30,
    username: 'milind12',
    connections: 178,
    mutual: 56
  },
  {
    id: 3,
    name: 'Stanly Drinkwater',
    avatar: team31,
    username: 'drinkwater8',
    connections: 204,
    mutual: 4
  },
  {
    id: 4,
    name: 'Josef Stravinsky',
    avatar: team60,
    username: 'josef60',
    connections: 556,
    mutual: 15
  },
  {
    id: 5,
    name: 'Igor Borvibson',
    avatar: team65,
    username: 'Igor65',
    connections: 122,
    mutual: 9
  },
  {
    id: 6,
    name: 'Carry Anna',
    avatar: team32,
    username: 'carry_anna',
    connections: 97,
    mutual: 0
  },
  {
    id: 7,
    name: 'Milind Mikuja',
    username: 'milind_mikuja',
    connections: 13,
    mutual: 18
  },
  {
    id: 8,
    name: 'Stanly Drinkwater',
    avatar: team35,
    username: 'stanly_drinkwater',
    connections: 13,
    mutual: 45
  },
  {
    id: 9,
    name: 'Josef Stravinsky',
    avatar: team57,
    username: 'josef_stravinsky',
    connections: 33,
    mutual: 46
  },
  {
    id: 10,
    name: 'Igor Borvibson',
    avatar: team58,
    username: 'igor_borvibson',
    connections: 66,
    mutual: 6
  },
  {
    id: 11,
    name: 'Katerina Karenin',
    avatar: team59,
    username: 'katerina_karenin',
    connections: 44,
    mutual: 10
  },
  {
    id: 12,
    name: 'Roy Anderson',
    username: 'roy_anderson',
    connections: 23,
    mutual: 49
  },
  {
    id: 13,
    name: 'Jean Renoir',
    avatar: team34,
    username: 'jean_renoir',
    connections: 70,
    mutual: 22
  },
  {
    id: 14,
    name: 'Ricky Antony',
    avatar: team29,
    username: 'ricky_antony',
    connections: 17,
    mutual: 18
  },
  {
    id: 15,
    name: 'Emma Watson',
    avatar: team3,
    username: 'emma_watson',
    connections: 45,
    mutual: 17
  },
  {
    id: 16,
    name: 'Jennifer Schramm',
    username: 'jennifer_schramm',
    connections: 19,
    mutual: 10
  },
  {
    id: 17,
    name: 'Michael Jenkins',
    avatar: team25,
    username: 'michael_jenkins',
    connections: 8,
    mutual: 26
  },
  {
    id: 18,
    name: 'John Doe',
    avatar: team9,
    username: 'john_doe',
    connections: 120,
    mutual: 8
  },
  {
    id: 19,
    name: 'Jane Smith',
    avatar: team22,
    username: 'jane_smith',
    connections: 95,
    mutual: 4
  },
  {
    id: 20,
    name: 'Alex Johnson',
    avatar: team28,
    username: 'alex_johnson',
    connections: 60,
    mutual: 12
  }
];

export type TeamMember = {
  image: string;
  name: string;
  designation: string;
  facebookHandle: string;
  twitterHandle: string;
  linkedinHandle: string;
};

export const defaultTeamMembers: TeamMember[] = [
  {
    image: jaco,
    name: 'Jaco Du Plessis',
    designation: 'CEO, Qberi',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: pranab,
    name: 'Pranab Sinha',
    designation: 'Lead Software Engineer, Qberi India',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: nitish,
    name: 'Nitish Pandey',
    designation: 'Developer, Qberi India',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: rohan,
    name: 'Rohan Chowdhury',
    designation: 'Developer, Qberi India',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: marika,
    name: 'Dr. Marika du Plessis',
    designation: 'Qberi Advisory, South Africa',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: leonie,
    name: 'Leonie van den Berg',
    designation: 'CEO, Cardio-med, South Africa',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },

  {
    image: jacques,
    name: 'Jacques van den Berg',
    designation: 'COO, Cardio-med, South Africa',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: johan,
    name: 'Johan Beck',
    designation: 'Head of Qberi Financial Advisers, South Africa',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: ilze,
    name: 'Ilze Niemann',
    designation: 'Administrator, Qberi South Africa',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: tania,
    name: 'Tania du Plessis ',
    designation: 'CEO, MediaSpoor, United States',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: frans,
    name: 'Frans Taljaard',
    designation: 'CEO, TDS Construction Contracts and Claims, Germany',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  },
  {
    image: michael,
    name: 'Michael Stumpfe ',
    designation: 'Owner and Chief Designer, Bummel Bespoke Leather Shoes',
    facebookHandle: '#!',
    twitterHandle: '#!',
    linkedinHandle: '#!'
  }
];
