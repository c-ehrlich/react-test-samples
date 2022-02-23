import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { APIComponent } from './APIComponent';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

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

test('gets the data', async () => {
  render(<APIComponent />);

  // Tutorial did it this way, but findByRole is preferred and one less import
  // const out = await waitFor(() => screen.getByRole("contentinfo"));
  const out = await screen.findByRole("contentinfo");
  
  expect(out).toHaveTextContent("Name is Jack");
});
