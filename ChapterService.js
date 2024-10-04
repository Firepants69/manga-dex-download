import axios from "axios"

class ChapterService {
    #URL
    constructor() {
        this.#URL = "https://api.mangadex.org"
    }

    async getChapters(manga_id) {
        const limit = 20
        let offset = 0
        let chapters = new Set()
        let data = [] // Inicializamos como un array vacío

        do {
            const filters = {
                limit: limit,
                manga: manga_id,
                translatedLanguage: ['es-la', 'es', 'en'],
                offset: offset
            }

            const response = await axios({
                method: 'GET',
                url: `${this.#URL}/chapter`,
                params: filters
            })


            const result = response.data
            data = result.data; // Guardamos los datos obtenidos

            // Agregar capítulos a la colección
            data.forEach((chapter) => {
                chapters.add({
                    id: chapter.id,
                    title: chapter.attributes.title,
                    chapterNumber: chapter.attributes.chapter
                })
            })

            // Incrementar el offset después de la primera solicitud
            offset += limit; // Incrementamos en base al límite
        } while (data.length > 0) // Continuar mientras haya datos

        return Array.from(chapters)
    }

    async getImages(chapterID) {
        const response = await fetch(`${this.#URL}/at-home/server/${chapterID}`)
        if (!response.ok) {
            throw new Error(`Error fetching chapters: ${response.statusText}`)
        }
        const result = await response.json()
        const baseURL = result.baseUrl
        const hash = result.chapter.hash
        console.log(result.chapter.data.map((imagen) => (
            `${baseURL}/data/${hash}/${imagen}`
        )))
        return {
            baseURL,
            hash,
            data: result.chapter.data.map((imagen) => (
                `${baseURL}/data/${hash}/${imagen}`
            ))
        }

    }

}

// const cservice = new ChapterService()
// const chapters = cservice.getChapters('c52b2ce3-7f95-469c-96b0-479524fb7a1a')
// chapters.then(data => console.table(data))
// const chapter = cservice.getImages('777e6f44-b376-4ef7-b087-5d0a65b3d242')
// chapter.then(data => console.log(data))

export default ChapterService;