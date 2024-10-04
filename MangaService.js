import axios from "axios"
class MangaService {
    #URL
    constructor() {
        this.#URL = "https://api.mangadex.org"
    }

    async getMangas(title) {
        const filters = {
            title: title,
            availableTranslatedLanguage: ['es-la', 'es', 'en']
        }
        try {

            const response = await axios({
                method: 'GET',
                url: `${this.#URL}/manga`,
                params: filters
            })

            const mangas_information = response.data.data.map((manga) => ({
                title: manga.attributes.title,
                id: manga.id,
                attributes: manga.attributes

            }));

            return mangas_information; // Devolvemos el resultado después de procesar la respuesta
        } catch (error) {
            console.error("Error fetching mangas:", error)
            return {}
        }
    }

}

// const mangas = new MangaService()
// mangas.getMangas("dragon ball").then(data => console.log(data))


export default MangaService