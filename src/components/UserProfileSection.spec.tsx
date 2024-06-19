import { describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import { UserProfileSection, findUserFnAtom } from "./UserProfileSection";

const findUser = async (_userId: string) => ({
  name: "kecy",
  imageUrl: "https://kecy.me/image.jpg",
  bio: "this is a bio text",
});

describe("UserProfileSection", () => {
  test("User name should be displayed in uppercase", async () => {
    const store = createStore();
    store.set(findUserFnAtom, { fn: findUser });

    render(
      <Provider store={store}>
        <UserProfileSection userId="dummy" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("KECY")).toBeInTheDocument();
    });
  });
});
