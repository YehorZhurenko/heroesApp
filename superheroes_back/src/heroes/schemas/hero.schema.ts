import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Hero {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  real_name: string;

  @Prop()
  origin_description: string;

  @Prop({ type: [String], default: [] })
  superpowers: string[];

  @Prop()
  catch_phrase: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
