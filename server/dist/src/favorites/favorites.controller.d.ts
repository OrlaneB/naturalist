import { FavoritesService } from "./favorites.service";
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        details: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    create(body: {
        name: string;
        details: any;
    }): import(".prisma/client").Prisma.Prisma__FavoritesClient<{
        id: number;
        name: string;
        details: import("@prisma/client/runtime/library").JsonValue;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
