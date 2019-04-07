import vias from '../data/vias.json';

export function titleCase(str) {
  if (!str) return;
  str = str.toLowerCase().split(' ');

  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

export function distance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  const d = R * c;
  return d;
}

export function getCategory(place) {
  const str = place.toLowerCase();

  if (str.includes('museo') || str.includes('museu')) return 'Museums';
  if (str.includes('iglesia')) return 'Churches';
  if (str.includes('parroquia')) return 'Parishes';
  if (str.includes('palacio')) return 'Palaces';
  if (str.includes('mercado')) return 'Markets';
  if (str.includes('jardin')) return 'Gardens';
  if (str.includes('casa')) return 'Historical Houses';
  if (str.includes('monumento')) return 'Monuments';
  if (str.includes('puente')) return 'Bridges';

  return 'Other';
}

export function getAddress(codvia) {
  const via = vias.find(v => v.codvia === parseInt(codvia));

  if (via) {
    return `${via.codtipovia} ${via.nomoficial}`;
  }

  return null;
}
