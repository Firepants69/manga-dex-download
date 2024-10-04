import fs from 'fs';
import axios from 'axios';
class ImageService {

    async downloadImages(links, path) {
        for (const [i, link] of links.entries()) {
            try {
                // Descargar la imagen como un flujo de datos
                const response = await axios({
                    method: 'GET',
                    url: link,
                    responseType: 'stream' // Necesario para que axios maneje el archivo como un stream
                });

                // Verificar el código de estado HTTP
                if (response.status !== 200) {
                    console.error(`Error: Status code ${response.status} for image ${link}`);
                    continue; // Pasar a la siguiente imagen si hay un error
                }

                // Crear el archivo de salida
                const fileStream = fs.createWriteStream(`${path}/pagina${i + 1}.jpg`);

                // Escribir el flujo de datos en el archivo
                response.data.pipe(fileStream);

                // Esperar a que termine de escribir
                await new Promise((resolve, reject) => {
                    fileStream.on('finish', () => {
                        console.log(`pagina: ${i + 1} descargada`);
                        resolve();
                    });

                    fileStream.on('error', err => {
                        console.error(`File write error: ${err.message}`);
                        reject(err);
                    });
                });

            } catch (err) {
                console.error(`Error downloading image ${i + 1}: ${err.message}`);
            }
        }

        console.log("Se descargó el capítulo");
    }

}


export default ImageService