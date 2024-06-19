import { Suspense } from "react";
import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { FindUserFn } from "../domain/user.ts";

export const findUserFnAtom = atom<{ fn: FindUserFn }>({
  fn: () => {
    throw new Error("function must be set");
  },
});

const userAtom = atomFamily((userId: string) => {
  return atom(async (get) => {
    const findUser = get(findUserFnAtom).fn;
    const user = await findUser(userId);
    return {
      ...user,
      name: user.name.toUpperCase(), // ユーザー名は大文字にして表示
    };
  });
});

type UserProfileProps = { userId: string };
const UserProfile = ({ userId }: UserProfileProps) => {
  const user = useAtomValue(userAtom(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.imageUrl} />
      <p>{user.bio}</p>
    </div>
  );
};

type UserProfileSectionProps = UserProfileProps;
export const UserProfileSection = ({ userId }: UserProfileSectionProps) => {
  return (
    <section>
      <Suspense fallback="loading...">
        <UserProfile userId={userId} />
      </Suspense>
    </section>
  );
};
