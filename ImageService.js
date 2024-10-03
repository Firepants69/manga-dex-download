import fs from 'fs';
import https from 'https';

class ImageService {

    async downloadImages(links, path) {
        for (const [i, link] of links.entries()) {
            await new Promise((resolve, reject) => {
                https.get(link, res => {
                    const fileStream = fs.createWriteStream(`${path}/pagina${i + 1}.jpg`)
                    res.pipe(fileStream)
                    fileStream.on('finish', () => {
                        console.log(`pagina: ${i + 1} descargada`)
                        resolve()

                    });
                    fileStream.on('error', reject)
                }).on('error', reject)
            });

        }
        console.log("se descargó el capitulo")
    }

}


export default ImageService