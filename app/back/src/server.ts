import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import cors from 'cors';

// const port = process.env.PORT || 3000;


const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    return { session: null };
  },
  basePath: '/trpc/',
  // onError:
  //       process.env.NODE_ENV === 'development'
  //         ? ({ path, error }) => {
  //             console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
  //           }
  //         : undefined,
    })

server.listen(3000);
