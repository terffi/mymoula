import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './api/root.ts';
import cors from 'cors';

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    return { session: null };
  },
  basePath: '/trpc/',
});

server.listen(3000);
