// lib
import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Req,
  UseGuards
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Request } from 'express'
// service
import { StorageService } from '@/storage/storage.service'
// dto
import { FileDto } from '@/storage/dto/file.dto'
// guard
import { AuthGuard } from '@/auth/auth.guard'

@Controller({ version: ['1'], path: 'storage' })
@UseGuards(AuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('*+')
  async getFileSignedUrl(@Req() req: Request) {
    return await this.storageService.getFileSignedUrl(req.originalUrl)
  }

  @Post('upload')
  async uploadFile(@Body() payloadFileData: FileDto) {
    const fileData = plainToInstance(FileDto, payloadFileData)
    return await this.storageService.uploadFile(fileData)
  }

  @Delete('*+')
  async deleteFile(@Req() req: Request) {
    return await this.storageService.deleteFile(req.originalUrl)
  }
}
