// lib
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'
import sanitizeHtml from 'sanitize-html'

export class FileDto {
  @IsString()
  @IsNotEmpty()
  imageDataUrl!: string

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
  fileName!: string

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
  fileMetaTitle!: string

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
  fileMetaDescription!: string

  @IsString()
  @IsNotEmpty()
  filePath!: string
}
