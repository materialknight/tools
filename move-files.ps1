param(
   [string] $source,
   [string] $extension,
   [string] $destination
)

while (-not (Test-Path $source))
{
   Write-Host "Source folder ($source) doesn't exist!"
   $source = Read-Host "Enter another source folder or press Ctrl + C to terminate this script"
}

while (-not (Test-Path $destination))
{
   Write-Host "Destination folder ($destination) doesn't exist!"
   $destination = Read-Host "Enter another destination folder or press Ctrl + C to terminate this script"
}

$extension = $extension.TrimStart('.')

$files_To_Move = Get-ChildItem -Path $source -File -Filter "*.$extension"

while ($files_To_Move.Count -eq 0)
{
   Write-Host "There are no files with extension '$extension' in the source folder $source"
   $extension = Read-Host "Enter another extension or press Ctrl + C to terminate this script"
   $extension = $extension.TrimStart('.')
   $files_To_Move = Get-ChildItem -Path $source -File -Filter "*.$extension"
}

$failures = 0

foreach ($file in $files_To_Move)
{
   $new_Location = Join-Path -Path $destination -ChildPath $file.Name

   if (Test-Path $new_Location)
   {
      $time = Get-Date -Format 'hh.mm.ss tt'
      $new_Location = Join-Path -Path $destination -ChildPath "$($file.BaseName) $time$($file.Extension)"
      Write-Host "A file called $($file.Name) already exists in $destination, so the moved file was renamed to $new_Location"
   }

   try
   {
      Move-Item -Path $file.FullName -Destination $new_Location
   }
   catch
   {
      Write-Error $Error[0]
      ++ $failures
   }
}

$files_Moved = $files_To_Move.Count - $failures

Write-Host "$failures files couldn't be moved. $files_Moved moved successfully!"
