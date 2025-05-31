// src/superheroes/dto/create-superhero.dto.ts

import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateHeroDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly real_name: string;

  @IsString()
  @IsOptional()
  readonly origin_description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly superpowers: string[];

  @IsString()
  @IsOptional()
  readonly catch_phrase: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly images: string[];
}
