
class ChapterService {
    #URL
    constructor() {
        this.#URL = "https://api.mangadex.org/"
    }

    async getChapters(manga_id) {
        const limit = 20
        let offset = 0
        let chapters = new Set()
        let data = [] // Inicializamos como un array vacío

        do {
            const params = new URLSearchParams({
                'limit': limit,
                'manga': manga_id,
                'translatedLanguage[]': 'es-la',
                'offset': offset,
            });

            const response = await fetch(`${this.#URL}chapter?${params}`)
            if (!response.ok) {
                throw new Error(`Error fetching chapters: ${response.statusText}`)
            }

            const result = await response.json();
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
        const response = await fetch(`${this.#URL}at-home/server/${chapterID}`)
        if (!response.ok) {
            throw new Error(`Error fetching chapters: ${response.statusText}`)
        }
        const result = await response.json()
        const baseURL = result.baseUrl
        const hash = result.chapter.hash
        return {
            baseURL,
            hash,
            data: result.chapter.data.map((imagen) => (
                `${baseURL}/data/${hash}/${imagen}`
            ))
        }

    }

}

export default ChapterService;