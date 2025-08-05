import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
// import path from "path";
// import { fileURLToPath } from "url";
import ViteExpress from 'vite-express';

import { appRouter } from './router'; // todo: put @/api/router and make it work on prod

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(
  '/api',
  createExpressMiddleware({
    router: appRouter,
    createContext: (ctx) => ({ session: null }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            );
          }
        : undefined,
  })
);

ViteExpress.config({
  mode: 'production',
  inlineViteConfig: {
    build: { outDir: 'dist/front' },
  },
});

ViteExpress.listen(app, 3000, () => console.log('Server is listening...'));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Make sure to put this after all api routes are being handled (e.g. app.use('/api/authorize', authRoutes);)
// console.log(process.env.NODE_ENV)
// console.log(__dirname)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../../front/dist")));

//   app.get("*", (req, res) => {
//     return res.sendFile(path.join(__dirname, "../../front/dist/index.html"));
//   });
// }

// For testing purposes, wait-on requests '/'
// app.get('/', (req, res) => res.send('Server is running!'));

// app.listen(port, () => {
//   console.log(`App listening on port: ${port}`);
// });

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
