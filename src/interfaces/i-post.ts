export interface IPost {
  id: number;
  slug: string;
  url: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: 'published' | 'draft' | 'archived';
  category: string;
  publishedAt: string;
  updatedAt: string;
  userId: number;
}
