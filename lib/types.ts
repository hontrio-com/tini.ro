export type OrderStatus = 'noua' | 'in_livrare' | 'neridicata' | 'anulata' | 'nu_a_raspuns' | 'livrata';

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_county: string;
  quantity: number;
  total_price: number;
  status: OrderStatus;
  notes?: string;
  ip_address?: string;
  utm_source?: string;
  utm_campaign?: string;
  woot_order_id?: string | null;
  woot_awb?: string | null;
  woot_courier?: string | null;
}

export interface Review {
  id: string;
  created_at: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  verified: boolean;
  avatar_seed?: string;
}

export const JUDETE = [
  'Municipiul Bucuresti',
  'Alba',
  'Arad',
  'Arges',
  'Bacau',
  'Bihor',
  'Bistrita-Nasaud',
  'Botosani',
  'Braila',
  'Brasov',
  'Buzau',
  'Calarasi',
  'Cluj',
  'Constanta',
  'Covasna',
  'Dambovita',
  'Dolj',
  'Galati',
  'Giurgiu',
  'Gorj',
  'Harghita',
  'Hunedoara',
  'Ialomita',
  'Iasi',
  'Ilfov',
  'Maramures',
  'Mehedinti',
  'Mures',
  'Neamt',
  'Olt',
  'Prahova',
  'Salaj',
  'Satu Mare',
  'Sibiu',
  'Suceava',
  'Teleorman',
  'Timis',
  'Tulcea',
  'Vaslui',
  'Valcea',
  'Vrancea',
];

export const PRODUCT_PRICE = 49;
