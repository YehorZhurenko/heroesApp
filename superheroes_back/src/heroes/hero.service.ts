import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HeroSchema } from './schemas/hero.schema';
import { Hero } from './schemas/hero.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class HeroService {
  constructor(
    @InjectModel(Hero.name)
    private heroModel: mongoose.Model<Hero>,
  ) {}

  async findAll(query: Query): Promise<{ heroes: Hero[]; totalPages: number }> {
    const totalDocs = await this.heroModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / 5);

    const resPerPage = 5;
    const currPage = Number(query.page) || 1;
    const skip = resPerPage * (currPage - 1);

    const heroes = await this.heroModel.find().limit(resPerPage).skip(skip);
    return { heroes, totalPages };
  }

  async findById(id: string): Promise<Hero> {
    const hero = await this.heroModel.findById(id);
    return hero as Hero;
  }

  async create(hero: Hero): Promise<Hero> {
    const res = await this.heroModel.create(hero);
    return res;
  }

  async update(id: string, hero: Hero): Promise<Hero> {
    const res = await this.heroModel.findByIdAndUpdate(id, hero, {
      new: true,
      runValidators: true,
    });
    return res as Hero;
  }

  async deleteById(id: string): Promise<Hero> {
    const res = await this.heroModel.findByIdAndDelete(id);
    return res as Hero;
  }
}
