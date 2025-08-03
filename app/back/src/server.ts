import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from "path";
import { fileURLToPath } from "url";

import { appRouter } from '@api/router';


async function main() {
  const port = process.env.PORT || 3000;

  const app = express();

  app.use(cors());


  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: (ctx) => ({ session: null }),
      onError:
        process.env.NODE_ENV === 'development'
          ? ({ path, error }) => {
              console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
            }
          : undefined,
    })
  );

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Make sure to put this after all api routes are being handled (e.g. app.use('/api/authorize', authRoutes);)
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../app/front/dist")));

    app.get("*", (req, res) => {
      return res.sendFile(path.join(__dirname, "../app/front/index.html"));
    });
  }

  // For testing purposes, wait-on requests '/'
  app.get('/', (req, res) => res.send('Server is running!'));

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}


void main();
// import { createHTTPServer } from '@trpc/server/adapters/standalone';
// import { appRouter } from './router';
// import cors from 'cors';
// import { fileURLToPath } from 'url';
// import path from 'path';

// // const port = process.env.PORT || 3000;


// const server = createHTTPServer({
//   middleware: cors(),
//   router: appRouter,
//   createContext() {
//     return { session: null };
//   },
//   basePath: '/trpc/',
//   // onError:
//   //       process.env.NODE_ENV === 'development'
//   //         ? ({ path, error }) => {
//   //             console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
//   //           }
//   //         : undefined,
//     })

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Make sure to put this after all api routes are being handled (e.g. app.use('/api/authorize', authRoutes);)
// if (process.env.NODE_ENV === "production") {
//   server.use(express.static(path.join(__dirname, "../client/dist")));

//   server.get("*", (req, res) => {
//     return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
//   });
// }

// server.listen(3000);

