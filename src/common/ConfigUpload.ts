export class ConfigUpload {
    static customFileName(req, file, cb) {
        var customerFile = file.originalname.split('.')[0];
        customerFile = customerFile + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
        var fileExtenstion = "";
        if (file.mimetype.indexOf('jpeg') > -1) {
            fileExtenstion = ".jpg";
        } else if (file.mimetype.indexOf('png') > -1) {
            fileExtenstion = '.png';
        }

        customerFile = customerFile + fileExtenstion;
        cb(null, customerFile);
    }

    static customFilePath(req, file, cb) {
        cb(null, 'public/uploads');
    }
}