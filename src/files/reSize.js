const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');
const { closeSync } = require('fs');
var fsize = {
    left: 1,
    top: 1,
    width: 300,
    height: 300,
}
class Resize {
  constructor(folder,size) {
    this.folder = folder;
    fsize = size;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);
    if(fsize) 
      await sharp(buffer)
      // .resize(300, 300, { // size image 300x300
      //   fit: sharp.fit.inside,
      //   withoutEnlargement: true
    // })
      .extract({ left: Math.abs(parseInt(fsize.left-1)), top: Math.abs(parseInt(fsize.top-1)), width: Math.abs(parseInt(fsize.width-1)), height: Math.abs(parseInt(fsize.height-1))})
      .webp( { quality: 70 } )
      .toFile(filepath);
    else 
      await sharp(buffer)
      // .resize(300, 300, { // size image 300x300
      //   fit: sharp.fit.inside,
      //   withoutEnlargement: true
      // })
      // .extract({ left: fsize.left, top: fsize.top, width: fsize.width, height: fsize.height })
      .webp( { quality: 70 } )
      .toFile(filepath);
    return filename;
  }
  async toBuffer(buffer) {
    const filename = Resize.filename();
    // const filepath = this.filepath(filename);
    if(fsize) 
      return await sharp(buffer)
      // .resize(300, 300, { // size image 300x300
      //   fit: sharp.fit.inside,
      //   withoutEnlargement: true
    // })
      .extract({ left: Math.abs(parseInt(fsize.left-1)), top: Math.abs(parseInt(fsize.top-1)), width: Math.abs(parseInt(fsize.width-1)), height: Math.abs(parseInt(fsize.height-1))})
      .webp( { quality: 70 } )
      .toBuffer();
    else 
      return await sharp(buffer)
      // .resize(300, 300, { // size image 300x300
      //   fit: sharp.fit.inside,
      //   withoutEnlargement: true
      // })
      // .extract({ left: fsize.left, top: fsize.top, width: fsize.width, height: fsize.height })
      .webp( { quality: 70 } )
      .toBuffer();
  }
  static filename() {
     // random file name
    return `${uuid.v4()}.webp`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
module.exports = Resize;