// lib
import {
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsNotEmpty
} from 'class-validator'
import { OmitType } from '@nestjs/mapped-types'
import { Transform } from 'class-transformer'
import sanitizeHtml from 'sanitize-html'

export class TodoDto {
  @IsString()
  @IsNotEmpty()
  id!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  @Transform(({ value }: { value: string }) =>
    sanitizeHtml(value, {
      allowedTags: [],
      disallowedTagsMode: 'escape',
      enforceHtmlBoundary: true
    })
  )
  title!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  @Transform(({ value }: { value: string }) =>
    sanitizeHtml(value, {
      allowedTags: [],
      disallowedTagsMode: 'escape',
      enforceHtmlBoundary: true
    })
  )
  description!: string

  @IsBoolean()
  @IsNotEmpty()
  isComplete!: boolean

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) =>
    sanitizeHtml(value, {
      allowedTags: [],
      disallowedTagsMode: 'escape',
      enforceHtmlBoundary: true
    })
  )
  userId!: string

  @IsString()
  @IsNotEmpty()
  createdAt!: string

  @IsString()
  @IsNotEmpty()
  updatedAt!: string
}

export class CreateTodoDto extends OmitType(TodoDto, [
  'id',
  'isComplete',
  'createdAt',
  'updatedAt'
] as const) {}

export class UpdateTodoDto extends OmitType(TodoDto, [
  'userId',
  'createdAt',
  'updatedAt'
] as const) {}
