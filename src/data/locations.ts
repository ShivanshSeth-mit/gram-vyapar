export interface PresetLocation {
  district: string;
  block: string;
  state: string;
  pinCode: string;
}

export const presetLocations: PresetLocation[] = [
  { district: "Pune", block: "Baramati", state: "Maharashtra", pinCode: "413102" },
  { district: "Satara", block: "Karad", state: "Maharashtra", pinCode: "415110" },
  { district: "Nashik", block: "Niphad (Grape Belt)", state: "Maharashtra", pinCode: "422303" },
  { district: "Kolhapur", block: "Shirol", state: "Maharashtra", pinCode: "416103" },
  
  { district: "Lucknow", block: "Mohanlalganj", state: "Uttar Pradesh", pinCode: "226301" },
  { district: "Varanasi", block: "Sewapuri", state: "Uttar Pradesh", pinCode: "221403" },
  { district: "Gorakhpur", block: "Sahjanwa", state: "Uttar Pradesh", pinCode: "273209" },
  { district: "Meerut", block: "Mawana", state: "Uttar Pradesh", pinCode: "250401" },
  
  { district: "South 24 Parganas", block: "Baruipur", state: "West Bengal", pinCode: "700144" },
  { district: "Nadia", block: "Ranaghat", state: "West Bengal", pinCode: "741201" },
  { district: "Purba Bardhaman", block: "Memari", state: "West Bengal", pinCode: "713146" },
  { district: "Murshidabad", block: "Berhampore", state: "West Bengal", pinCode: "742101" },

  { district: "Patna", block: "Bakhtiarpur", state: "Bihar", pinCode: "803212" },
  { district: "Muzaffarpur", block: "Kanti", state: "Bihar", pinCode: "843109" },
  { district: "Gaya", block: "Bodhgaya", state: "Bihar", pinCode: "824231" },

  { district: "Indore", block: "Sanwer", state: "Madhya Pradesh", pinCode: "453551" },
  { district: "Ujjain", block: "Badnagar", state: "Madhya Pradesh", pinCode: "456771" },

  { district: "Jaipur", block: "Chaksu", state: "Rajasthan", pinCode: "303901" },
  { district: "Jodhpur", block: "Bilara", state: "Rajasthan", pinCode: "342602" },

  { district: "Anand", block: "Borsad", state: "Gujarat", pinCode: "388540" },
  { district: "Surat", block: "Bardoli", state: "Gujarat", pinCode: "394601" }
];

export function lookupPinCode(pin: string): PresetLocation | undefined {
  const clean = pin.trim();
  return presetLocations.find(p => p.pinCode === clean);
}
