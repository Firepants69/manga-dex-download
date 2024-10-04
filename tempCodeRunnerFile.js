
const cservice = new ChapterService()
const chapters = cservice.getChapters('c52b2ce3-7f95-469c-96b0-479524fb7a1a')
chapters.then(data => console.table(data))
const chapter = cservice.getImages('777e6f44-b376-4ef7-b087-5d0a65b3d242')
chapter.then(data => console.log(data))