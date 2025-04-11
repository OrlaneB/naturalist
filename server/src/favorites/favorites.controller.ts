import { Controller, Get, Post, Body } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";

@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService:FavoritesService) {}

    @Get()
    getAll(){
        return this.favoritesService.getAll();
    }

    @Post()
    create(@Body() body: {name:string; details:any}){
        return this.favoritesService.create(body);
    }
}