import subprocess, os, json
S='/home/claude/src'; D='/home/claude/site/assets/img'
L=f"{S}/loreal/L'Oreal Brandstorm"; P=f'{S}/pptx/ppt/media'; DR=f'{S}/drive/UX'
items = {
 'home': {'portrait': (f'{S}/framer/home-portrait.jpg','jpg',None)},
 'canvas': {
   'cover': (f'{S}/framer/canvas-cover.png','jpg',None),
   'hero-angle': (f'{P}/image1.png','png',None),
   'journey': (f'{P}/image3.png','png',None),
   'low-points': (f'{P}/image4.jpeg','jpg',None),
   'pillars': (f'{P}/image5.jpeg','jpg',None),
   'science': (f'{P}/image6.jpeg','jpg',None),
   'walkthrough': (f'{P}/image7.jpeg','jpg',None),
   'dashboard': (f'{P}/image8.png','png',None),
   'focus-plan': (f'{P}/image9.png','png',None),
   'screens': (f'{P}/image10.png','png',None),
   'flow-overview': (f'{S}/framer/canvas-2.png','jpg',None),
 },
 'closet': {
   'cover': (f'{S}/framer/closet-cover.png','jpg',None),
   'mock-boots': (f'{S}/framer/closet-1.png','jpg',None),
   'mock-hand': (f'{S}/framer/closet-2.png','jpg',None),
   'home': (f'{DR}/Closet/screen.png','png',None),
   'product': (f'{DR}/Closet/screen copy.png','png',None),
   'listing': (f'{DR}/Closet/screen copy 2.png','png',None),
   'seller': (f'{DR}/Closet/screen copy 3.png','png',None),
 },
 'froth': {
   'cover': (f'{S}/framer/froth-cover.png','png',None),
   'old-site': (f'{S}/framer/froth-2.png','png',None),
   'logo': (f'{S}/framer/froth-1.png','png',None),
   'palette': (f'{S}/framer/froth-3.png','png',None),
   'moodboard': (f'{DR}/Froth/moodboard.png','jpg',None),
   'type-study': (f'{DR}/Froth/typestudy.png','png',None),
   'drink-1': (f'{DR}/Froth/drink1.png','jpg',None),
   'drink-2': (f'{DR}/Froth/drink2.png','jpg',None),
   'drink-3': (f'{DR}/Froth/drink3.png','jpg',None),
   'home': (f'{DR}/Froth/Home Page updated.png','png',None),
   'menu': (f'{DR}/Froth/Menu 2 redone.png','png',None),
   'work-with-us': (f'{DR}/Froth/Work with Us.png','png',None),
   'icons': (None,'png','icons'),
 },
 'reverdi': {
   'cover': (f'{L}/L\'Oreal Brandstorm-2.png','jpg',None),
   'problem': (f'{L}/L\'Oreal Brandstorm-1.png','jpg',None),
   'solution': (f'{L}/L\'Oreal Brandstorm-2.png','jpg',None),
   'data': (f'{L}/L\'Oreal Brandstorm-3.png','jpg',None),
   'whiteboard': (f'{S}/trim/lo_3467.png','jpg','-crop 1170x1100+0+190 +repage'),
   'survey': (f'{S}/trim/lo_3466.png','jpg','-crop 1170x1440+0+70 +repage'),
   'render': (f'{S}/trim/lo_3465.png','jpg',None),
 },
 'choretap': {
   'cover': (None,'png','ctcover'),
   'landing': (f'{S}/trim/ct_1.png','png',None),
   'signup': (f'{S}/trim/ct_2.png','png',None),
   'icon': (f'{DR}/Choretap/choretap-website/icons/icon-512.png','png',None),
   'ref-1': (f'{DR}/Choretap/ChoreTap/ref-health.jpeg','jpg',None),
   'ref-2': (f'{DR}/Choretap/ChoreTap/ref-meditation.jpeg','jpg',None),
   'ref-3': (f'{DR}/Choretap/ChoreTap/ref-nuba.jpeg','jpg',None),
   'ref-4': (f'{DR}/Choretap/ChoreTap/ref-smarthome.jpeg','jpg',None),
 },
}
# Russian-named file
import glob
ru=[f'{DR}/Choretap/ChoreTap/ref-music-app.jpeg']
if ru: items['choretap']['ref-5']=(ru[0],'jpg',None)
def run(c): subprocess.run(c,shell=True,check=True)
meta={}
for proj,imgs in items.items():
  os.makedirs(f'{D}/{proj}/full',exist_ok=True)
  for k,(src,fmt,op) in imgs.items():
    tmp=f'/tmp/img_{proj}_{k}.png'
    if op=='icons':
      run(f'convert "{DR}/Froth/heart orange.png" "{DR}/Froth/person icon orange.png" -trim +repage -resize 600x600 -gravity center -background "#F6EDE6" -extent 900x700 +append -bordercolor "#F6EDE6" -border 60 {tmp}')
    elif op=='ctcover':
      run(f'convert -size 2400x1500 xc:"#F9E8F0" \\( "{S}/trim/ct_1.png" -resize x1300 \\) -gravity center -geometry -420+0 -composite \\( "{S}/trim/ct_2.png" -resize x1300 \\) -gravity center -geometry +420+0 -composite {tmp}')
    else:
      run(f'convert "{src}"[0] {op or ""} -auto-orient {tmp}')
    w,h=map(int,subprocess.check_output(f'identify -format "%w %h" {tmp}',shell=True).split())
    run(f'convert {tmp} -resize "1600x1600>" -strip -quality 80 -define webp:method=6 {D}/{proj}/{k}.webp')
    ext='jpg' if fmt=='jpg' else 'png'
    q='-quality 88' if ext=='jpg' else ''
    bg='-background white -flatten' if ext=='jpg' else ''
    run(f'convert {tmp} {bg} -resize "2800x2800>" -strip {q} {D}/{proj}/full/{k}.{ext}')
    dw,dh=map(int,subprocess.check_output(f'identify -format "%w %h" {D}/{proj}/{k}.webp',shell=True).split())
    meta[f'{proj}/{k}']={'w':dw,'h':dh,'full':f'{proj}/full/{k}.{ext}'}
json.dump(meta,open('/home/claude/build/imgmeta.json','w'),indent=0)
print(len(meta)); 
