// import { postRouter } from '~/server/api/routers/post';
import { postRouter } from './test.js';
import { createCallerFactory, createTRPCRouter } from '../trpc.js';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    post: postRouter,
});
/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
//# sourceMappingURL=index.js.map