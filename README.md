# Tools Documentation

## Paths, the PATH variables, and how they work in PowerShell:

A _path_ is the _location_ of a file or folder, for example: The path `D:\reminders\notes.txt` is the location of a file called `notes.txt`; it is in the disk at port `D`, inside a folder called `reminders`.

At the same time, a _path_ is the _full name_ of a file or folder, for example: `D:\reminders\notes.txt` is the full name of `notes.txt`.

The _working directory_ is the folder where PowerShell is currently open, the folder in the PowerShell prompt (if your prompt is `PS C:\Users\YourUsername>`, your working directory is `C:\Users\Yourusername`), the location you get by entering the command `Get-Location` or its alias `pwd`.

A path can be _absolute_ or _relative_. An absolute path is a full path starting from the disk port, for example: `D:\reminders\notes.txt`. A relative path is a path starting from the working directory (the folder where PowerShell is currently open). For example:

- If your working directory is `D:\reminders` and you want to open `D:\reminders\notes.txt`, you can enter that full path or `.\notes.txt` (`.\` means "_the working directory_", so `.\notes.txt` resolves to `D:\reminders\notes.txt`).

- If your working directory is `D:\music`, and you want to open `D:\reminders\notes.txt`, you can enter that full path or `..\reminders\notes.txt` (`..\` means "_the parent of the working directory_"; the parent of `D:\music` is `D:\` so `..\reminders\notes.txt` resolves to `D:\reminders\notes.txt`).

In PowerShell, you can use `/` instead of `\` in paths (`D:\reminders\notes.txt` is the same as `D:/reminders/notes.txt`). You can also omit the file extension (`.\notes` is the same as `.\notes.txt`). PowerShell is also case-insensitive (`D:\reminders\notes.txt` is the same as `D:\Reminders\Notes.TXT`, and `Get-ChildItem` is the same as `get-childitem`).

If a path contains whitespace, you must put it between quotation marks -single (**''**) or double (**""**)-, or PowerShell will take the last character before the whitespace as the end of the path, for example: If you enter `D:\some folder\yourScript`, you'll get the error: **The term '`D:\some`' is not recognized as a name of a cmdlet, function, script file, or executable program**.

In Windows, there are 2 special variables called `PATH`; you can find them in `Settings > System > About > Advanced system settings > Environment Variables`; there you'll find 2 sections: `User Variables` and `System Variables`; there's a `PATH` variable in each section.

The `PATH` in `User Variables` is available only for you user, whereas the `PATH` in `System Variables` is available to every user; there's no other difference, so when you find a document that instructs you to add a folder to _the_ `PATH`, you can use either `PATH`, but **I prefer and recommend to modify the `PATH` in `User Variables`**.

You'll see that each `PATH` is a list of paths to folders, for example: One of those paths might be `C:\XAMPP\php`. But what are the `PATH` variables for?:

When you enter something like `yourScript` into PowerShell, PowerShell will:

1. Execute `yourScript` if it's a PowerShell command, if not it will:

2. Execute `yourScript` if it is in any folder listed in either `PATH`, if not it will:

3. **Open** (not execute) `yourScript` if it is in the working directory.

In PowerShell, to execute a script whose parent folder is not in either `PATH`, you must enter a path to the script, for example:

If your working directory is `D:\scripts` and you want to execute `D:\scripts\yourScript`, you can enter that full path or `.\yourScript` (but not `yourScript` because if you omit the initial `.\` in a relative path, PowerShell will **open** `yourScript` instead of executing it).

In other words, if `myScript` is in a folder added to either `PATH`, you can execute `myScript` from any working directory just by entering `myScript` in PowerShell, no need to enter any kind of path to it. That's why I recommed that you add `tools` (the parent folder of this document) to the `PATH` variable in `Settings > System > About > Advanced system settings > Environment Variables > User Variables`.

## PowerShell Scripts:

The use examples in this section assume `tools` (the parent folder of this document) -or the parent folder of the script to be used- is in either `PATH`.

When you call one of the PowerShell scripts below, you can provide each argument without specifying their corresponding parameter **if you provide them in the order given by the use example**. Or if you specify the parameter that corresponds to each argument, you can provide the arguments in any order. For example:

The use example of `move-files.ps1` is:

```powershell
Move-Files
-Source "C:\path to\source folder"
-Extension "txt"
-Destination "C:\path to\destination folder"
```

That means you can also call `Move-Files` like this:

```powershell
Move-Files "C:\path to\source folder" "txt" "C:\path to\destination folder"
```

Or like this:

```powershell
Move-Files
-Extension "txt"
-Destination "C:\path to\destination folder"
-Source "C:\path to\source folder"
```

### move-files.ps1

Moves **all** files with extension `-Extension` from the folder `-Source` to the folder `-Destination`.

```powershell
Move-Files
-Source "C:\path to\source folder"
-Extension "txt"
-Destination "C:\path to\destination folder"
```

The above example would move all files whose name ends with `.txt` from `C:\path to\source folder` to `C:\path to\destination folder`. That example shows all 3 parameters, there are no other parameters.

If you assign a parameter to each argument, as in the example above, you can provide the arguments in any order, but you can also You can provide the arguments without assigning athem in any orther, but you can also provide them without naming them if you provide them in the order of the example.

The `-Source` and `-Destination` paths can be either absolute, or relative to the working directory.

The `-Extension` is a file extension such as _txt_, _pdf_, _jpg_, etc. of the files you want to move from `-Source` to `-Destination`.
