export interface ContactInfo {
  address: string;
  phone: string;
  website: string;
  email: string;
}

export interface AkhlakValue {
  id: string;
  letter: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export interface ScopeItem {
  id: number;
  numberStr: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  tags: string[];
}

