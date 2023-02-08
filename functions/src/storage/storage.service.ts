// lib
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as functions from 'firebase-functions'
// service
import { FirebaseService } from '@/firebase/firebase.service'
// dto
import { FileDto } from '@/storage/dto/file.dto'

@Injectable()
export class StorageService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService
  ) {}

  /**
   * firebase storageのパスを生成する
   *
   * @param {string} url - ドメイン以降のパス
   * @return {string}
   */
  getFilePath(url: string) {
    // ドメイン以降のパスを精査
    const pathArr = url.split('/').filter((str) => str.length > 0)
    const index = pathArr.findIndex((str) => str === 'storage')
    if (index === -1) {
      throw new BadRequestException()
    }
    // Firebase storage のパスを生成
    const filePath = pathArr.slice(index + 1).join('/')
    if (filePath.length === 0) {
      throw new BadRequestException()
    }

    return filePath
  }

  /**
   * firebase storageのsigned urlを取得する
   *
   * @param {string} reqOriginalUrl - ドメイン以降のパス
   * @return {Promise<{message: string; url: string}>}
   */
  async getFileSignedUrl(reqOriginalUrl: string) {
    const filePath = this.getFilePath(reqOriginalUrl)
    const file = this.firebaseService.getBucket().file(filePath)

    // ファイルの存在チェック
    const isExists = await file.exists()
    if (isExists[0] === false) {
      throw new NotFoundException()
    }
    // ファイルの公開状態チェック
    // const isPublic = await file.isPublic()
    // if (isPublic[0] === false) {
    //   throw new NotFoundException()
    // }

    const time = new Date()
    time.setTime(time.getTime() + 60 * 60 * 1000)
    const url = await file
      .getSignedUrl({
        action: 'read',
        expires: new Date(
          time.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
        )
      })
      .catch(() => {
        // prettier-ignore
        functions.logger.info(`[${new Date().toISOString()}]: storage/storage.service.ts > getFileSignedUrl Error.`)
        throw new InternalServerErrorException()
      })

    const result = url[0]
    if (result.length === 0) {
      throw new NotFoundException()
    }

    return {
      message: 'SUCCESS',
      url: result
    }
  }

  /**
   * firebase storageにファイルを保存する
   *
   * @param {FileDto} fileData - 保存対象のファイル情報
   * @return {Promise<{message: string}>}
   */
  async uploadFile(fileData: FileDto) {
    const regex = /^data:\w+\/\w+;base64,/
    const metaDataUrl = fileData.imageDataUrl.match(regex) // "data:image/XXX;base64"
    // Base64形式に誤りがある場合
    if (metaDataUrl === null) {
      throw new BadRequestException()
    }
    // 画像ファイルのみで許可する
    const extension = metaDataUrl[0].match(/(jpg|jpeg|png|gif)/) // "data:image/XXX;base64" => XXX
    if (extension === null) {
      throw new BadRequestException()
    }

    // base64 data urlのメイン部分
    const mainDataUrl = fileData.imageDataUrl.replace(regex, '')

    // 規定のファイルサイズより大きい場合は許可しない
    const fileByte = Buffer.byteLength(mainDataUrl, 'base64')
    if (fileByte >= this.configService.get<number>('maxByteSizeUploadFile')!) {
      throw new BadRequestException()
    }

    const bucket = this.firebaseService.getBucket()
    const path = fileData.filePath.endsWith('/')
      ? `${fileData.filePath}${fileData.fileName}`
      : `${fileData.filePath}/${fileData.fileName}`
    const file = bucket.file(path)
    const buffer = Buffer.from(mainDataUrl, 'base64')

    try {
      // ファイルを storage に保存
      await file.save(buffer, {
        metadata: {
          contentType: `image/${extension[0]}`,
          gzip: true
        }
      })
      // ファイルにメタデータを書き込み
      await file.setMetadata({
        metadata: {
          title: fileData.fileMetaTitle,
          description: fileData.fileMetaDescription
        }
      })

      return {
        message: 'SUCCESS'
      }
    } catch (err) {
      // prettier-ignore
      functions.logger.info(`[${new Date().toISOString()}]: storage/storage.service.ts > uploadFile Error.`)
      throw new InternalServerErrorException()
    }
  }

  /**
   * firebase storageのファイルを削除する
   *
   * @param {string} reqOriginalUrl - ドメイン以降のパス
   * @return {Promise<{message: string}>}
   */
  async deleteFile(reqOriginalUrl: string) {
    const filePath = this.getFilePath(reqOriginalUrl)
    const file = this.firebaseService.getBucket().file(filePath)

    // ファイルの存在チェック
    const isExists = await file.exists()
    if (isExists[0] === false) {
      console.log('isExists[0]: ', isExists[0])
      throw new BadRequestException()
    }

    // 削除処理
    await file.delete().catch(() => {
      // prettier-ignore
      functions.logger.info(`[${new Date().toISOString()}]: storage/storage.service.ts > deleteFile Error.`)
      throw new InternalServerErrorException()
    })

    return {
      message: 'SUCCESS'
    }
  }
}
