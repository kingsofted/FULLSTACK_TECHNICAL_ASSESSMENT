import { favoriteResolver } from "./job/favorite.resolver";
import { jobResolver } from "./job/job.resolver";

export const resolvers = [jobResolver, favoriteResolver];
