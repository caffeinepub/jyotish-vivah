const planetNames: Record<string, string> = {
  Sun: 'सूर्य',
  Moon: 'चंद्र',
  Mars: 'मंगळ',
  Mercury: 'बुध',
  Jupiter: 'गुरु',
  Venus: 'शुक्र',
  Saturn: 'शनि',
  Rahu: 'राहू',
  Ketu: 'केतू',
};

const zodiacSigns: Record<string, string> = {
  Aries: 'मेष',
  Taurus: 'वृषभ',
  Gemini: 'मिथुन',
  Cancer: 'कर्क',
  Leo: 'सिंह',
  Virgo: 'कन्या',
  Libra: 'तुला',
  Scorpio: 'वृश्चिक',
  Sagittarius: 'धनु',
  Capricorn: 'मकर',
  Aquarius: 'कुंभ',
  Pisces: 'मीन',
};

const tithiNames: Record<string, string> = {
  Pratipada: 'प्रतिपदा',
  Dwitiya: 'द्वितीया',
  Tritiya: 'तृतीया',
  Chaturthi: 'चतुर्थी',
  Panchami: 'पंचमी',
  Shashthi: 'षष्ठी',
  Saptami: 'सप्तमी',
  Ashtami: 'अष्टमी',
  Navami: 'नवमी',
  Dashami: 'दशमी',
  Ekadashi: 'एकादशी',
  Dwadashi: 'द्वादशी',
  Trayodashi: 'त्रयोदशी',
  Chaturdashi: 'चतुर्दशी',
  'Purnima/Amavasya': 'पूर्णिमा/अमावस्या',
  Purnima: 'पूर्णिमा',
  Amavasya: 'अमावस्या',
};

const nakshatraNames: Record<string, string> = {
  Ashwini: 'अश्विनी',
  Bharani: 'भरणी',
  Krittika: 'कृत्तिका',
  Rohini: 'रोहिणी',
  Mrigashira: 'मृगशीर्ष',
  Ardra: 'आर्द्रा',
  Punarvasu: 'पुनर्वसू',
  Pushya: 'पुष्य',
  Ashlesha: 'आश्लेषा',
  Magha: 'मघा',
  'Purva Phalguni': 'पूर्वा फाल्गुनी',
  'Uttara Phalguni': 'उत्तरा फाल्गुनी',
  Hasta: 'हस्त',
  Chitra: 'चित्रा',
  Swati: 'स्वाती',
  Vishakha: 'विशाखा',
  Anuradha: 'अनुराधा',
  Jyeshtha: 'ज्येष्ठा',
  Mula: 'मूल',
  'Purva Ashadha': 'पूर्वाषाढा',
  'Uttara Ashadha': 'उत्तराषाढा',
  Shravana: 'श्रवण',
  Dhanishta: 'धनिष्ठा',
  Shatabhisha: 'शतभिषा',
  'Purva Bhadrapada': 'पूर्वाभाद्रपद',
  'Uttara Bhadrapada': 'उत्तराभाद्रपद',
  Revati: 'रेवती',
};

const yogaNames: Record<string, string> = {
  Vishkumbha: 'विष्कुंभ',
  Priti: 'प्रीती',
  Ayushman: 'आयुष्मान',
  Saubhagya: 'सौभाग्य',
  Shobhana: 'शोभना',
  Atiganda: 'अतिगंड',
  Sukarma: 'सुकर्म',
  Dhriti: 'धृती',
  Shoola: 'शूल',
  Ganda: 'गंड',
  Vruddhi: 'वृद्धी',
  Dhruva: 'ध्रुव',
  Vyaghata: 'व्याघात',
  Harshana: 'हर्षण',
  Vajra: 'वज्र',
  Siddhi: 'सिद्धी',
  Vyatipata: 'व्यतिपात',
  Variyana: 'वरीयान',
  Parigha: 'परिघ',
  Shiva: 'शिव',
  Siddha: 'सिद्ध',
  Sadhya: 'साध्य',
  Shubha: 'शुभ',
  Shukla: 'शुक्ल',
  Brahma: 'ब्रह्म',
  Indra: 'इंद्र',
  Vaidhriti: 'वैधृती',
};

const karanaNames: Record<string, string> = {
  Bava: 'बव',
  Balava: 'बालव',
  Kaulava: 'कौलव',
  Taitila: 'तैतिल',
  Garaja: 'गरज',
  Vanija: 'वणिज',
  Vishti: 'विष्टी',
  Shakuni: 'शकुनी',
  Chatushpad: 'चतुष्पद',
  Naga: 'नाग',
  'Kimastūgha': 'किंस्तुघ्न',
};

export function getPlanetNameMarathi(englishName: string): string {
  return planetNames[englishName] || englishName;
}

export function getZodiacSignMarathi(englishSign: string): string {
  return zodiacSigns[englishSign] || englishSign;
}

export function getTithiMarathi(englishTithi: string): string {
  return tithiNames[englishTithi] || englishTithi;
}

export function getNakshatraMarathi(englishNakshatra: string): string {
  return nakshatraNames[englishNakshatra] || englishNakshatra;
}

export function getYogaMarathi(englishYoga: string): string {
  return yogaNames[englishYoga] || englishYoga;
}

export function getKaranaMarathi(englishKarana: string): string {
  return karanaNames[englishKarana] || englishKarana;
}
