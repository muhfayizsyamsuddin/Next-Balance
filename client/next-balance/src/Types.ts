export type ProductType = {
  _id: number;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
};

export type WishlistType = {
  _id: number;
  userId: number;
  productId: number;
  product: ProductType;
};

export interface NewUserType {
  // _id: number;
  name: string;
  username: string;
  email: string;
  password: string;
}
