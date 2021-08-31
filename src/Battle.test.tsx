import { render } from "@testing-library/react";
import Battle from "./Battle";
import { StoreProvider } from "./test-utils";

test("Battle component renders", () => {
  render(
    <StoreProvider>
      <Battle />
    </StoreProvider>
  );
});
