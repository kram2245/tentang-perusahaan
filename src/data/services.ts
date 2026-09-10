export interface ServiceData {
  id: string;
  category: string;
  title: string;
  shortTitle?: string;
  modalTitle?: string;
  description: string;
  fullDetail: string;
  image: string;
  hasTitleInImage?: boolean;
  iconName: 'Flame' | 'Shield' | 'Activity' | 'Zap' | 'Leaf';
  iconBg: string;
  iconColor: string;
  badgeColor: string;
  features: string[];
  tags: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: 'migas',
    category: 'Area Migas',
    title: 'Inspeksi & Sertifikasi Migas',
    description: 'Inspeksi kelayakan tangki timbun, bejana tekan & fasilitas produksi migas.',
    fullDetail: 'Layanan inspeksi teknis dan kelayakan operasional peralatan serta fasilitas produksi minyak dan gas bumi sesuai standar keselamatan Migas.',
    image: 'https://i.postimg.cc/R04H7TH3/migas.png',
    hasTitleInImage: false,
    iconName: 'Flame',
    iconBg: 'bg-amber-500/10 border-amber-500/30',
    iconColor: 'text-amber-400',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    features: [
      'Inspeksi Peralatan Putar',
      'Inspeksi Peralatan Listrik',
      'Inspeksi Pesawat Angkat',
      'Inspeksi Bejana Tekan',
      'Inspeksi Alat Pengaman',
      'Inspeksi Tangki',
      'Inspeksi Pipa Penyalur'
    ],
    tags: ['Area Migas', 'Pipa Penyalur', 'Bejana Tekan', 'Tangki']
  },
  {
    id: 'inspeksi-sertifikasi',
    category: 'Area Industri',
    title: 'Inspeksi & Sertifikasi Industri',
    description: 'Layanan terintegrasi inspeksi K3 Kemnaker & Ketenagalistrikan (DJK).',
    fullDetail: 'Layanan terintegrasi inspeksi Keselamatan dan Kesehatan Kerja (K3) Kemnaker serta Sertifikasi Ketenagalistrikan (DJK) untuk keandalan instalasi dan keselamatan peralatan.',
    image: 'https://i.postimg.cc/tT77kvCx/industri.png',
    hasTitleInImage: true,
    iconName: 'Shield',
    iconBg: 'bg-indigo-500/10 border-indigo-500/30',
    iconColor: 'text-indigo-400',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    features: [
      'Inspektur Boiler (Pesawat Uap)',
      'Ahli K3 Listrik',
      'Inspektur Pesawat Tenaga & Produksi',
      'Inspektur Proteksi Kebakaran (Alarm, Fire System, Hidran)',
      'Inspektur Elevator/Lift',
      'Welding Inspeksi',
      'Inspektur SLO PLTD',
      'Inspektur Instalasi Listrik (SLO)',
      'Personil PDKB'
    ],
    tags: ['Area Industri', 'K3 Kemnaker', 'DJK', 'Boiler', 'SLO Listrik']
  },
  {
    id: 'ndt',
    category: 'Pengujian',
    title: 'Non Destructive Test (NDT)',
    shortTitle: 'NDT',
    modalTitle: 'Non Destructive Test (NDT)',
    description: 'Non Destructive Test & sertifikasi keutuhan struktur material.',
    fullDetail: 'Layanan Non Destructive Test (NDT) dan sertifikasi sistem manajemen industri untuk memastikan mutu dan keandalan peralatan serta proses produksi.',
    image: 'https://i.postimg.cc/ryrSxjZT/NDT.png',
    hasTitleInImage: false,
    iconName: 'Activity',
    iconBg: 'bg-blue-500/10 border-blue-500/30',
    iconColor: 'text-blue-400',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    features: [
      'Ultrasonic Testing (UT)',
      'Radiographic Testing (RT)',
      'Magnetic Particle Inspection (MPI)',
      'Liquid Penetrant Testing (PT)'
    ],
    tags: ['NDT', 'Ultrasonic', 'Radiografi', 'Inspeksi Material']
  },
  {
    id: 'ebtke',
    category: 'Energi Terbarukan',
    title: 'Area EBTKE (Geothermal)',
    description: 'Pengujian & konsultasi teknis energi panas bumi & konservasi.',
    fullDetail: 'Pengujian dan konsultasi teknis untuk energi panas bumi dan konservasi energi, termasuk pengukuran efisiensi dan kepatuhan terhadap standar lingkungan.',
    image: 'https://i.postimg.cc/C1ZKyvB3/IMG-20260730-WA0226.jpg',
    hasTitleInImage: false,
    iconName: 'Zap',
    iconBg: 'bg-emerald-500/10 border-emerald-500/30',
    iconColor: 'text-emerald-400',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    features: [
      'Inspeksi Fasilitas & Pembangkit Panas Bumi (Geothermal)',
      'Persetujuan Laik Fungsi (PLF)',
      'Sertifikat Laik Operasi (SLO)'
    ],
    tags: ['Geothermal', 'EBTKE', 'Panas Bumi', 'SLO']
  },
  {
    id: 'sertifikasi-eco',
    category: 'SERTIFIKASI & ECO',
    title: 'Sertifikasi dan Eco-Framework',
    description: 'Persetujuan kawasan hutan, teknis air limbah, UKL/UPL & dokumen lingkungan kerja.',
    fullDetail: 'Layanan penyusunan dokumen lingkungan hidup, perizinan kawasan hutan, dan persetujuan teknis air limbah untuk industri.',
    image: 'https://i.postimg.cc/C5TS3wVz/ChatGPT-Image-30-Jul-2026-13-54-48.png',
    hasTitleInImage: true,
    iconName: 'Leaf',
    iconBg: 'bg-teal-500/10 border-teal-500/30',
    iconColor: 'text-teal-400',
    badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    features: [
      'Persetujuan Penggunaan Kawasan Hutan (PPKH)',
      'Dokumen Penyusunan Persetujuan Teknis Air Limbah',
      'UKL/UPL',
      'Penyusunan Dokumen Lingkungan Kerja'
    ],
    tags: ['PPKH', 'Air Limbah', 'UKL/UPL', 'Dokumen Lingkungan']
  }
];
