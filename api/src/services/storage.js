import path from "path";
import uuid from "uuid";
import fs from "fs";

export default {
    saveFile(file) {
        const name = path.parse(file.name).name;
        const extension = path.parse(file.name).ext;
        const uniqueName = `${name}_${uuid.v4()}${extension}`;

        fs.writeFileSync(path.join('./attachments', uniqueName), Buffer.from(file.base64, 'base64'));

        return uniqueName;
    },
    pipeFileToHttpResponse(fileName, httpResponse) {
        const p = path.join('./attachments', fileName);
        fs.exists(p, exists => {
            if (exists) {
                const file = fs.readFileSync(p);
                httpResponse.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': file.length
                });
                httpResponse.end(file);
            } else {
                httpResponse.status(404).send();
            }
        });
    }
}