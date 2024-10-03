import requests
import shutil
import os
# este es el prototipo inicial
BASE_URL = "https://api.mangadex.org"
# obtener mangas por nombre

def get_manga (title):
    r = requests.get(
        f"{BASE_URL}/manga",
        params={"title":title}
    )
    
    mangas_information =  [[manga["attributes"]["title"]['en']
                            ,manga["id"]
                            ,manga["attributes"]] for manga in r.json()["data"]]
    mangas = []    
    for manga_information in mangas_information:
        if "es-la" in manga_information[2]["availableTranslatedLanguages"]:
            mangas.append(manga_information)
    return mangas

def get_chapters(manga_id):
    limit = 20
    offset = 0
    data = [1]
    chapters = set()
    while(len(data) > 0):
       
        if offset != 0:
            offset+=20
        r = requests.get(
            'https://api.mangadex.org/chapter',
            params={
                'limit': limit,
                'manga': manga_id,
                'translatedLanguage[]': ['es-la'],
                'offset':offset
            }
        )
        data = r.json()["data"]
        if offset == 0:
            offset +=20
        for data in r.json()["data"]:
            chapters.add((data["id"],
                          data["attributes"]["title"]
                          ,data["attributes"]["chapter"]))
        
        
    return chapters

def get_chapter(chapter_id):
    URL = "https://api.mangadex.org/at-home/server/"
    r = requests.get(
        f"{URL}{chapter_id}"
    )
    print(r.json()["baseUrl"])
    BASE_URL =  r.json()["baseUrl"]
    
    print(r.json()["chapter"]["hash"])
    HASH = r.json()["chapter"]["hash"]
    images = []
    
    for data in r.json()["chapter"]["data"]:
        print(f"{BASE_URL}/data/{HASH}/{data}")
        images.append(f"{BASE_URL}/data/{HASH}/{data}")
    
    return images

def download_images(image_link,name):
    res = requests.get(image_link,stream=True)
    file_name = f"{name}.jpg"
    if res.status_code == 200:
        with open(file_name,'wb') as f:
            shutil.copyfileobj(res.raw,f)
            print('Image sucessfully Downloaded: ',file_name)
    else:
        print('Image Couldn\'t be retrieved')


manga_title = input("nombre del manga a descargar: ")
mangas_information = get_manga(manga_title)

i = 1
for manga_information in mangas_information:
    print(f"{i}.-{manga_information[0]}")
    i+=1

selected_manga = int(input("mangas encontrados(selecciona 1): "))
chapters = get_chapters(mangas_information[selected_manga-1][1])
for chapter in chapters:
    print(f"{chapter[2]}.-{chapter[1]}")

selected_chapter = input("selecciona un capitulo: ")


chapter_id = "sin"
for chapter in chapters:
    if chapter[2] == selected_chapter:
        chapter_id = chapter[0]

print(chapter_id)
os.mkdir(f"imagenes/{chapter_id}")

images = get_chapter(chapter_id)
print(f"descargando capitulo {selected_chapter}")
i = 1
for image in images:
    download_images(image,f"imagenes/{chapter_id}/pagina{i}")
    i+=1



