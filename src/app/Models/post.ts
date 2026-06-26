export interface Post {
  id?: string;

  title: string;
  category: string;
  content: string;
  image: string | null;

  publishedAt: string;

  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  };
}