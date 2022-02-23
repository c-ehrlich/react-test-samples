import { useAPI } from "./useAPI"
import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { rest } from "msw";

// we don't have an API so we need to use a mock server
// Mock Service Worker library - mswjs.io
const server = setupServer(
  rest.get('/api', (_, res, ctx) => {
    return res(ctx.json({ name: 'Jack' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("sound increment", async () => {
  // we need waitForNextUpdate because we're testing an async hook
  const { result, waitForNextUpdate } = renderHook(() => useAPI());

  await waitForNextUpdate();

  expect(result.current).toEqual({ name: "Jack" });
})