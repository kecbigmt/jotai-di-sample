export type User = { name: string; imageUrl: string; bio: string };

export type FindUserFn = (userId: string) => Promise<User>;
