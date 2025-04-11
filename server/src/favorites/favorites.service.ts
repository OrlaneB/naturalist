import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class FavoritesService {
    constructor(private prisma : PrismaService) {}

    getAll(){
        return this.prisma.favorites.findMany();
    }

    create(data: {name:string, details:any}){
        return this.prisma.favorites.create({data});
    }
}