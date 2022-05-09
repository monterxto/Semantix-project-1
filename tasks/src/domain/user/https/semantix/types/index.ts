export type user = {
  id: string[];
  firstName: string[];
  lastName: string[];
  email: string[];
  createdAt: string[];
  avatar: string[];
};

export type address = {
  id: string[];
  userId: string[];
  street: string[];
  number: {_: number}[];
  city: string[];
  state: string[];
  zipcode: string[];
  country: string[];
};

export type contact = {
  id: string[];
  userId: string[];
  name: string[];
  email: string[];
  phoneNumber: string[];
};