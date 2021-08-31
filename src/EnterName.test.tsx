import { render } from "@testing-library/react";
import EnterName from "./EnterName";
import { StoreProvider } from "./test-utils";

test("EnterName component renders", () => {
  render(
    <StoreProvider>
      <EnterName />
    </StoreProvider>
  );
});
