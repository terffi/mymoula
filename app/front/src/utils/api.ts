import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@repo/back';


export const api = createTRPCReact<AppRouter>();
