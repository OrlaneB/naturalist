import { PrismaService } from "prisma/prisma.service";
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        details: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    create(data: {
        name: string;
        details: any;
    }): import(".prisma/client").Prisma.Prisma__FavoritesClient<{
        id: number;
        name: string;
        details: import("@prisma/client/runtime/library").JsonValue;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
