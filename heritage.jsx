import React, { useEffect, useState } from 'react';

const heritageData = [
  {
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    type: "monument",
    description: "An ivory-white marble mausoleum built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal. One of the Seven Wonders of the World.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/1280px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg"
  },
  {
    name: "Konark Sun Temple",
    location: "Puri, Odisha",
    type: "temple",
    description: "A 13th-century Sun temple built in the shape of a giant chariot with intricate stone carvings. Known for its architectural grandeur.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg"
  },
  {
    name: "Hawa Mahal",
    location: "Jaipur, Rajasthan",
    type: "palace",
    description: "Five-story palace built in 1799, featuring 953 windows with intricate lattice work, designed to allow royal ladies to observe street festivities.",
    image: "https://theheritageart.com/wp-content/uploads/2022/11/hawa-mahal.jpg"
  },
  {
    name: "Ajanta Caves",
    location: "Aurangabad, Maharashtra",
    type: "monument",
    description: "32 rock-cut Buddhist caves dating from 2nd century BCE, featuring paintings and sculptures considered masterpieces of Buddhist art.",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/ajanta-caves-chhatrapati-sambhaji-nagar-maharashtra-attr-hero-1?qlt=82&ts=1727010611256.org/wikipedia/commons/thumb/8/8d/Ajanta_Caves.jpg"
  },
  {
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    type: "temple",
    description: "The holiest shrine in Sikhism, known for its golden architecture and spiritual significance. Built in the 16th century.",
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2019/11/golden-temple-feature.jpg?tr=w-1366,f-jpg,pr-true.org/wikipedia/commons/thumb/9/9c/Golden_Temple_Amritsar.jpg"
  },
  {
    name: "Hampi Ruins",
    location: "Hampi, Karnataka",
    type: "monument",
    description: "Ancient ruins of Vijayanagara Empire, featuring temples, palaces, and monuments. UNESCO World Heritage site known for its architectural brilliance.",
    image: "https://s3.us-west-1.amazonaws.com/goheritagerun.com/wp-content/uploads/2014/11/28105841/Vittala.jpg"
  },
  {
    name: "Mehrangarh Fort",
    location: "Jodhpur, Rajasthan",
    type: "fort",
    description: "One of India's largest forts, built in 1459. Known for its intricate carvings and expansive courtyards.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/99/ae/7f/images-14-largejpg.jpg"
  },
  {
    name: "Khajuraho Temples",
    location: "Khajuraho, Madhya Pradesh",
    type: "temple",
    description: "Group of Hindu and Jain temples known for their nagara-style architectural symbolism and erotic sculptures.",
    image: "https://i0.wp.com/indiatravel.com/wp-content/uploads/2022/03/khajuraho-slider-imggg-3.jpg?ssl=1"
  }
];

export default function HeritagePlaces() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [states, setStates] = useState([]);

  useEffect(() => {
    const uniqueStates = [...new Set(heritageData.map(place => place.location.split(', ')[1]))];
    setStates(uniqueStates);
  }, []);

  const filteredPlaces = heritageData.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || place.location.includes(selectedState);
    const matchesType = !selectedType || place.type === selectedType;
    return matchesSearch && matchesState && matchesType;
  });

  return (
    <div className="p-4 font-[Poppins]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-gray-100 p-4 rounded-md">
        <input
          type="text"
          placeholder="Search heritage places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3"
        />
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All States</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Types</option>
          <option value="monument">Monuments</option>
          <option value="temple">Temples</option>
          <option value="palace">Palaces</option>
          <option value="fort">Forts</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">
        {filteredPlaces.map((place, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1">
            <img src={place.image} alt={place.name} className="w-full h-52 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{place.name}</h3>
              <p className="text-sm text-gray-600">{place.description}</p>
              <div className="flex items-center text-gray-500 text-sm mt-3">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {place.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
