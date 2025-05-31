import {
  Get,
  Post,
  Body,
  Controller,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { Hero } from './schemas/hero.schema';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

import { Query as EQuery } from 'express-serve-static-core';

@Controller('heroes')
export class HeroController {
  constructor(private heroSerivce: HeroService) {}

  @Get()
  async getAllHeroes(@Query() query: EQuery): Promise<Hero[]> {
    return this.heroSerivce.findAll(query);
  }

  @Get(':id')
  async getHeroById(@Param('id') id: string): Promise<Hero> {
    return this.heroSerivce.findById(id);
  }

  @Post('new')
  async createHero(@Body() hero: CreateHeroDto): Promise<Hero> {
    return this.heroSerivce.create(hero);
  }

  @Put(':id')
  async updateHero(
    @Param('id') id: string,
    @Body() hero: UpdateHeroDto,
  ): Promise<Hero> {
    return this.heroSerivce.update(id, hero);
  }

  @Delete(':id')
  async deleteHero(@Param('id') id: string): Promise<Hero> {
    return this.heroSerivce.deleteById(id);
  }
}
