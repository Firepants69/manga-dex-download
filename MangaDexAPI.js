import MangaService from './MangaService.js';
import ChapterService from './ChapterService.js';
import ImageService from './ImageService.js';
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';

class MangaDexAPI {

}




















// const api = new MangaDexAPI()

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function makeQuestion(question) {
//     return new Promise((resolve) => {
//         rl.question(question, (response) => {
//             resolve(response);
//         });
//     });
// }

// async function main() {
//     const searchTitle = await makeQuestion("inserta el nombre del manga que buscas: ")
//     const data = await api.searchManga(searchTitle)
//     console.table(data.map((manga) => manga.title))

//     const manga_index_selected = await makeQuestion("elige el manga por el indice: ")
//     const chapters = await api.getChapters(data[manga_index_selected].id)
//     console.table(chapters.map((chapter) => [chapter.chapterNumber, chapter.title]))
//     const chapterIndex = await makeQuestion("elige un capitulo por el indice ")
//     const chapterSelected = chapters[chapterIndex]
//     fs.mkdirSync(`imagenes/${data[manga_index_selected].title.en + chapterSelected.chapterNumber}`)
//     api.downloadChapterImages(chapterSelected.id, `imagenes/${data[manga_index_selected].title.en + chapterSelected.chapterNumber}`)
//     rl.close()
// }
// main()




