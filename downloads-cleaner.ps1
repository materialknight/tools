$DownloadsFolder = 'C:\Users\MaterialKnight\Downloads'

$Images = @(
   Join-Path $DownloadsFolder '*.jpg',
   Join-Path $DownloadsFolder '*.jpeg',
   Join-Path $DownloadsFolder '*.png',
   Join-Path $DownloadsFolder '*.mp4'
)

$ErrorLog = Join-Path $PSScriptRoot 'errors.txt'

Move-Item -Path $Images -Destination 'D:\imgs' *>> $ErrorLog
Move-Item -Path (Join-Path $DownloadsFolder '*.txt') -Destination 'D:\txts' *>> $ErrorLog
Move-Item -Path (Join-Path $DownloadsFolder '*.pdf') -Destination 'D:\pdfs' *>> $ErrorLog
Move-Item -Path (Join-Path $DownloadsFolder '*.mp4') -Destination 'D:\vids' *>> $ErrorLog
