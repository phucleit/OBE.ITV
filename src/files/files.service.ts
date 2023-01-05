import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
const BunnyStorage = require('bunnycdn-storage').default;
import { join } from 'path';
var Path = require('path');
require('path').resolve('./')


@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }

  async imageUpload(file: any) {
    var url =  await this.bunnyUploadTemp(file.buffer, file.originalname, file.mimetype);
    // url = await this.bunny(url);
    // await this.bunnyDeleteTemp();
    return url;
  }
  
  async imageConfirmUpload(url: String){
    url = await this.bunny(url);
    return url;
  }

  async bunnyUploadTemp(bytes,name,type)  {
      const bunnyStorageRegion = new BunnyStorage('cfda4849-f328-492d-b9fbe6d17a0d-3153-4471', 'namproxinke','sg');
      var files = {};
      var isExisted = false;
      const filesInDir = await bunnyStorageRegion.list('/images/temp/');
      const baseLink = "https://file.huyphungpc.vn";
      //console.log("herer", type, filesInDir)
      var url = "";
      switch(type){
          case "image/jpeg": //images
            files = await bunnyStorageRegion.list('/images/temp/');
            isExisted = files['data'].filter(p=>p.ObjectName == name).length > 0  ? true : false;
            if(isExisted)
            {
                name = Date.now() + "-" + name; 
                var x = await bunnyStorageRegion.upload(bytes ,`/images/temp/${name}`)
                url = `${baseLink}/images/temp/${name}`
            }
            else {
                //upload
                var x = await bunnyStorageRegion.upload(bytes ,`/images/temp/${name}`)
                url =  `${baseLink}/images/temp/${name}`
            }
      }
      return url;
      // return res.status(400).json({message: 'unsupport format'})
  }
  async bunnyUpload(bytes,name,type)  {
    const bunnyStorageRegion = new BunnyStorage('cfda4849-f328-492d-b9fbe6d17a0d-3153-4471', 'namproxinke','sg');
    var files = {};
    var isExisted = false;
    const filesInDir = await bunnyStorageRegion.list('/images/');
    const baseLink = "https://file.huyphungpc.vn";
    //console.log("herer", type, filesInDir)
    var url = "";
    switch(type){
        case "image/jpeg": //images
          files = await bunnyStorageRegion.list('/images/');
          isExisted = files['data'].filter(p=>p.ObjectName == name).length > 0  ? true : false;
          if(isExisted)
          {
              name = Date.now() + "-" + name; 
              var x = await bunnyStorageRegion.upload(bytes ,`/images/${name}`)
              url = `${baseLink}/images/${name}`
          }
          else {
              //upload
              var x = await bunnyStorageRegion.upload(bytes ,`/images/${name}`)
              url =  `${baseLink}/images/${name}`
          }
    }
    return url;
  }
  async bunny(url){
    var mime = require('mime-types')
    var name = Path.parse(url).base;
    var mimeType = mime.lookup(name);
    var buffer = await this.imageBuffer(url);
    url = await this.bunnyUpload(buffer, name, mimeType);
    return url;
  }
  async bunnyDeleteTemp(){
    const bunnyStorageRegion = new BunnyStorage('cfda4849-f328-492d-b9fbe6d17a0d-3153-4471', 'namproxinke','sg');
    var files = await bunnyStorageRegion.list('/images/temp/');
    files['data'].forEach(async (file) => {
      await bunnyStorageRegion.delete(`/images/temp/${file.ObjectName}`);
    });
  }

  async imageBuffer(url) {
    const axios = require('axios');
    const {data} = await axios.get(url, {responseType: 'arraybuffer'});
    var buffer = data;
    return buffer;
  }
  imageStreamurl(url) {
    return createReadStream(join(process.cwd(), url));
  }
  fileBufferurl(url) {
    return readFileSync(join(process.cwd(), url));
  }
  fileStream(url) {
    return createReadStream(join(process.cwd(), url));
  }
}
