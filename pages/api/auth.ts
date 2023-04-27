import { publicProcedure, router } from '../server/router';

export const authRouter = rourter({
    login: publicProcedure(z.object({ email: z.string()))
})