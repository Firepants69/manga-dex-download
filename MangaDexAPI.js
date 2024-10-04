import MangaService from "./MangaService.js";
import ChapterService from "./ChapterService.js";
import ImageService from "./ImageService.js";
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';

class MangaDexAPI {
    #mangaService
    #chapterService
    #imageService
    constructor() {
        this.#mangaService = new MangaService()
        this.#chapterService = new ChapterService()
        this.#imageService = new ImageService()
    }

    searchManga(title) {
        return this.#mangaService.getMangas(title)
    }

    async getChapters(mangaID) {
        const chapters = await this.#chapterService.getChapters(mangaID)
        return chapters
    }

    downloadChapterImages(chapterID, outputDir) {
        this.#chapterService.getImages(chapterID)
            .then((data) => {
                this.#imageService.downloadImages(data.data, outputDir);
            })
            .catch(error => {
                console.error("Error downloading chapter images:", error);
            });
    }


}

const api = new MangaDexAPI()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function makeQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (response) => {
            resolve(response);
        });
    });
}

async function main() {
    const searchTitle = await makeQuestion("inserta el nombre del manga que buscas: ")
    const data = await api.searchManga(searchTitle)
    console.table(data.map((manga) => manga.title))

    const manga_index_selected = await makeQuestion("elige el manga por el indice: ")
    const chapters = await api.getChapters(data[manga_index_selected].id)
    console.table(chapters.map((chapter) => [chapter.chapterNumber, chapter.title]))
    const chapterIndex = await makeQuestion("elige el capitulo por el indice no numero: ")
    const chapterSelected = chapters[chapterIndex]
    const chapterNumber = chapters[chapterIndex].chapterNumber
    fs.mkdirSync(`imagenes/${data[manga_index_selected].title.en + chapterNumber}`)
    api.downloadChapterImages(chapterSelected.id, `imagenes/${data[manga_index_selected].title.en + chapterNumber}`)
    rl.close()
}
main()

// chapters.then(
//     (data) => {
//         console.table(data.map((chapter) =>
//             [chapter.title,
//             chapter.chapterNumber]
//         ))
//         rl.question('selecciona un capitulo: ', (answer) => {
//             const chapterSelected = data.find((chapter) => chapter.chapterNumber == answer)
//             fs.mkdirSync(`imagenes/${chapterSelected.id}`)
//             api.downloadChapterImages(chapterSelected.id, `imagenes/${chapterSelected.id}`)
//             rl.close();
//         });
//     }

// )


