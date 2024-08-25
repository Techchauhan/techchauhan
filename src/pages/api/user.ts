import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<User[]>) {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
  ];

  res.status(200).json(users);
}
