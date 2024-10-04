class MangaService {
    #URL
    constructor() {
        this.#URL = "https://api.mangadex.org"
    }

    async getMangas(title) {
        const params = new URLSearchParams({
            title,
            'availableTranslatedLanguage[]': 'es-la'
        })
        try {

            const response = await fetch(`${this.#URL}/manga?${params}`)

            const data = await response.json()

            const mangas_information = data.data.map((manga) => ({
                title: manga.attributes.title,
                id: manga.id,
                attributes: manga.attributes

            }));

            return mangas_information; // Devolvemos el resultado después de procesar la respuesta
        } catch (error) {
            console.error("Error fetching mangas:", error)
            return []
        }
    }

}

export default MangaService