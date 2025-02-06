## Google Drive

When you share an image via Google Drive, you get a link like this:

`https://drive.google.com/file/d/1nhbqUPFqqMtmcyFoQ6QUjHOnMtATN9kO/view?usp=sharing`

### Problem 1:

That link goes to an interface to see the image, not to the image itself, thus it can't be used in an `<img>` tag.

### Solution 1:

Replace `file/d/` with `uc?id=`, and remove `/view?usp=sharing`, like this:

`https://drive.google.com/uc?id=1nhbqUPFqqMtmcyFoQ6QUjHOnMtATN9kO`

In other words: `1nhbqUPFqqMtmcyFoQ6QUjHOnMtATN9kO` is the part that identifies the file (like an id), and if we represent it with the variable `<resource_id>`, the link you want has the form:

`https://drive.google.com/uc?id=<resource_id>`

That link would go to the image itself, thus it can be used in an <img> tag. You now have free Google Drive image hosting!

### Problem 2:

How to download videos from Google Drive?

### Solution 2:

The Google Drive link of a video has one of these forms:

Form 1:

`https://drive.google.com/file/d/1ISyenVj5CEKEalkiJe8t3HqDO4zKiiNU/view?usp=drive_link`

Form 2:

`https://drive.google.com/file/d/1ISyenVj5CEKEalkiJe8t3HqDO4zKiiNU/view?usp=sharing`

In any text editor, first replace `file/d/` with `uc?id=`, and then replace `/view?usp=drive_link` or `/view?usp=sharing` with `&export=download`. Both links above would end up like this:

`https://drive.google.com/uc?id=1ISyenVj5CEKEalkiJe8t3HqDO4zKiiNU&export=download`

In other words: `1ISyenVj5CEKEalkiJe8t3HqDO4zKiiNU` is the part that identifies the file (like an id), and if we represent it with the variable `<resource_id>`, the link you want has the form:

`https://drive.google.com/uc?id=<resource_id>&export=download`

If you use Windows and have not downloaded Python, install Python from the official site (`https://www.python.org/downloads`), marking all checkboxes the installer offers, specially the one that adds Python to `PATH`.

If you use Linux, Python most likely came pre-installed.

The program to download videos is a Python script called `yt-dlp`. To download it in Windows, open a PowerShell terminal and run:

```bash
python -m pip install -U yt-dlp[default]
```

If you use Linux, it's possible `yt-dlp` came pre-installed, to check whether you already have it or not, open a Bash terminal and run:

```bash
yt-dlp --version
```

If that throws an error, install `yt-dlp` by running:

```bash
python3 -m pip install -U yt-dlp[default]
```

Finally, run `yt-dlp` with your edited URL as argument, like this:

```bash
yt-dlp "https://drive.google.com/uc?id=1ISyenVj5CEKEalkiJe8t3HqDO4zKiiNU&export=download"
```

That's it!

## Twitter (X)

In Twitter (now X), a tweet's link has the form:

`twitter.com/<user identifier>/status/<tweet id>`

### Problem 1:
If you save one such link, the user can change his identifier, rendering your link useless.

### Solution 1:

If you use the `anyuser` identifier, the URL will redirect to the right tweet, with the updated user identifier.

For instance, if you go to:

`twitter.com/anyuser/status/541278904204668929`

The link redirects to:

`https://twitter.com/MarkTabNet/status/541278904204668929`

### Problem 2:

You want to cite a tweet's video, not the entire tweet, just the video.

### Solution 2:

If the link of the tweet (whose video you want to cite) is:

`https://twitter.com/LucAuffret/status/1716085946016252251`

Simply append `/video/1` to it when writing your citing tweet, like this:

`https://twitter.com/LucAuffret/status/1716085946016252251/video/1`

If the cited tweet has more than one video, change the number at the end of that URL to pick the one you want.

## Mercury Mail Server

### Problem 1:

After installing XAMPP, the PHP function mail() doesn't work out of the box.

To send and receive email, you must have a mail server, the one that comes with XAMPP is Mercury, which can be started on the XAMPP control panel.

Before starting Mercury, follow one of the solutions below:

### Solution 1:

For local testing in Windows, you don't need an external address to send or receive emails, you can send emails to yourself with Mercury:

In php.ini, the [mail function] section should look like this (ignoring comments [lines starting with `;`]):

```
SMTP=localhost
smtp_port=25
sendmail_from = postmaster@localhost
mail.add_x_header=Off
```

`SMTP` stands for Simple Mail Transfer Protocol.

A mail must have a `From` header. `sendmail_from` indicates the default email address PHP will use in the `From` header (that is: the default sender address) when calling `mail()`.

If you don't want to set `sendmail_from` (or if you have but want to use a different sender address) you must pass a `From` header to `mail()` (see `mail()`'s documentation to see how).

In the Mercury mail server, `postmaster` is an alias for the admin user, its mail is `postmaster@localhost` and its mailbox is at `XAMPP > MercuryMail > MAIL > Admin`.

## Set up Git to push to GitHub

### Problem:

I can't push my current local branch to my remote GitHub repo.

### Clarification:

Git and GitHub need an email address to sign your commits so they can be attributed to you (you can run `git log` to see the username and email of the author of each commit). In Git you set the email like this:

```bash
git config --global user.email 'your_email@google.com'
```

GitHub, on the other hand, will prompt you to verify an email address (you can verify a primary email and many backup emails).

In `GitHub > Settings > Emails` you can enable the option `Keep my email addresses private`; if you do, GitHub will sign your commits (and any other contribution activity, like creating a repo, opening a pull request, opening an issue, etc.) with an email address of the form `<numeric_Id>+<your_Username>@users.noreply.github.com` (such that any activity signed with that email will appear in your GitHub contribution graph).

If you don't enable the option `Keep my email addresses private`, GitHub will sign your commits with your account's (verified) primary email address (such that any activity signed with that email will appear in your GitHub contribution graph).

### Solution:

In Git, set your username and email to be the same as your GitHub's, for example:

```bash
git config --global user.name 'your_GitHub_Username'
git config --global user.email 'your_Primary_GitHub_mail@users.noreply.github.com'
```

However, if you enabled the option `Keep my email addresses private` in GitHub, you must instead set Git's global `user.email` to your GitHub-given email address of the form `<numeric_Id>+<your_Username>@users.noreply.github.com`, like this:

```bash
git config --global user.email '<numeric_Id>+<your_Username>@users.noreply.github.com'
```

Then run:

```bash
apt install gh
```

When the installation is done, run:

```bash
gh auth login
```

And follow the interactive prompts. That's it! Try pushing to a remote repo with:

```bash
git push
```

Or with:

```bash
git push origin
```

If you still can't push, perhaps the remote repo is not mapped to the local repo; check that with:

```bash
git remote show
```

That shows the remote repos mapped to your local repo. If that shows nothing, that means there's no remote repo mapped to your local repo. To map a remote repo to your local repo, run:

```bash
git remote add origin github.com/your_GitHub_Username/repo_name
```

That tells git: `github.com/your_GitHub_Username/repo_name` is the remote that corresponds to this local repo (git should pull from there and push to there), and `origin` will be its local name, such that whenever I refer to `origin` (such as in `git push origin`), I'm talking about `github.com/your_GitHub_Username/repo_name`.

You should be able to push after that.

## Set up LAMPP (XAMPP) in Linux

### Problem:

Setup LAMPP (XAMPP) servers in Linux.

### Solution:

1. Download the XAMPP installer for Linux from 'apachefriends.org'.

2. Change the installer's permissions:

   ```bash
   chmod 755 xampp-linux-x64-8.2.12-0-installer.run
   ```

3. Run the installer:

   ```bash
   sudo ./xampp-linux-x64-8.2.12-0-installer.run
   ```

4. To start XAMPP, run:

   ```bash
   sudo /opt/lampp/lampp start
   ```

If you prefer to use the graphical tool, run instead:

```bash
cd /opt/lampp
sudo ./manager-linux-x64.run
```

That's all.

## Add a folder to PATH in Linux

Open `/home/your_username/.bashrc` and add the following in a new line at the end:

`export PATH=$PATH:/opt/lampp/bin`

That line assigns to `PATH` whatever thing was already there, plus the folder `/opt/lampp/bin`, which allows you to use the Command Line Interface commands of the tools that come with XAMPP (LAMPP), such as PHP, MySQL, and sqlite3, without having to write the full path to the command.

If it doesn't work, try running:

```bash
source ~/.bashrc
```

That command runs `.bashrc` such that changes in environment variables are applied in the current terminal.


## Easiest way to install Node & NPM in Linux

1. Install NVM (Node Version Manager) by running:

   ```bash
   curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

2. Check if the installation was successful with:

   ```bash
   nvm --version
   ```

   If that doesn't work, open a new terminal and check again.

3. Install the latest available version of nodejs and npm by running:

   ```bash
   nvm install node
   ```

That's it! If you need to update Node and NPM, run:

```bash
nvm install --lts --latest-npm
```

That will install the most recent Long Term Support version of Node along with the most recent NPM version that is compatible with it, and set them as the default versions to use. The previous versions you had are not uninstalled, unless you uninstall them explicitly.

## Install Docker Engine in Linux

1. Linux Mint is based on Ubuntu Jammy Jellyfish, so if you have either, go to:

   https://download.docker.com/linux/ubuntu/dists/jammy/pool/stable/amd64/

   If you have a different version of Linux, go to:

   https://download.docker.com/linux/

   Then select your distro > `dists/` > your distro version > `pool/` > `stable/` > your CPU architecture

   It's a bit tricky to get the relevant info (your distro, your distro version and your CPU architecture) to get to the right place, so let's see an example:

   Imagine you have Linux Mint but no one has told you where to go. You can infer you have to choose `ubuntu` as your distro, and `jammy` as your distro version by running:

   ```bash
   cat /etc/os-release
   ```

   There you'll see `UBUNTU_CODENAME=jammy`.

   Then you can know your architecture by running:

   ```bash
   hostnamectl
   ```

   There you'll see "Architecture: x86-64", which means 'amd64'. With all that you know your destination is: https://download.docker.com/linux/ubuntu/dists/jammy/pool/stable/amd64/

2. Download these .deb files (the Docker Engine, CLI, containerd, and Docker Compose packages):

   ```
   containerd.io_<version>_<architecture>.deb
   docker-ce_<version>_<architecture>.deb
   docker-ce-cli_<version>_<architecture>.deb
   docker-buildx-plugin_<version>_<architecture>.deb
   docker-compose-plugin_<version>_<architecture>.deb
   ```

   I downloaded these:

   ```
   containerd.io_1.6.28-1_amd64.deb
   docker-ce_25.0.4-1~ubuntu.22.04~jammy_amd64.deb
   docker-ce-cli_25.0.4-1~ubuntu.22.04~jammy_amd64.deb
   docker-buildx-plugin_0.13.0-1~ubuntu.22.04~jammy_amd64.deb
   docker-compose-plugin_2.24.7-1~ubuntu.22.04~jammy_amd64.deb
   ```

   You can right-click each one, and select `Open With GDebi Package Installer`, or install them all at once by opening a terminal in their parent folder (usually the Downloads folder), and running the following command (replacing all names with the actual names of your downloaded `.deb` files):

   ```bash
   sudo dpkg -i ./containerd.io_1.6.28-1_amd64.deb \
   ./docker-ce_25.0.4-1~ubuntu.22.04~jammy_amd64.deb \
   ./docker-ce-cli_25.0.4-1~ubuntu.22.04~jammy_amd64.deb \
   ./docker-buildx-plugin_0.13.0-1~ubuntu.22.04~jammy_amd64.deb \
   ./docker-compose-plugin_2.24.7-1~ubuntu.22.04~jammy_amd64.deb
   ```

   Verify the installation by downloading and running a test docker image with:

   ```
   sudo docker run hello-world
   ```

   If that doesn't work, it might be that the docker service didn't start automatically, so try:

   ```
   sudo service docker start
   sudo docker run hello-world
   ```

That's it!

## Let VS Code extensions run Docker commands

### Problem:

VS Code Docker extensions, like `Dev Containers`, run Docker commands in the background, but after installing Docker with the previous tutorial, only the root user and the users in the docker usergroup have permission to run Docker commands.

### Solution:

You might open VS Code as the root user, but don't do that!

Instead, if you run the following command, you'll notice the Docker installation created an empty `docker` group:

```bash
cat /etc/group
```

If there's no `docker` group, you can create it with:

```bash
sudo groupadd docker
```

Add your user to the `docker` group:

```bash
sudo usermod -aG docker $USER
```

Verify that your user was added to the docker group by running:

```bash
groups
```

That command prints all groups the current user is in; you should see `docker` there. Now log in to the docker group by running:

```bash
newgrp docker
```

Verify that you're logged in to the docker group by running:

```bash
id -gn
```

That should output `docker`. Finally, go to a project folder where you need to use a Docker VS Code extension (go there by using `cd` command in the same terminal where you logged in to the docker group), and open VS Code by running:

```bash
code .
```

That's it! VS Code extensions, like Dev Containers, should now be able to run Docker commands.

## Run freeCodeCamp's Backend Development and APIs certification challenges LOCALLY

### Modules:

Managing Packages with NPM

`https://github.com/freeCodeCamp/boilerplate-npm/`

Basic Node and Express

`https://github.com/freeCodeCamp/boilerplate-express/`

MongoDB and Mongoose

`https://github.com/freeCodeCamp/boilerplate-mongomongoose/`

### Projects

Timestamp Microservice

`https://github.com/freeCodeCamp/boilerplate-project-timestamp/`

Request Header Parser Microservice

`https://github.com/freeCodeCamp/boilerplate-project-headerparser/`

URL Shortener Microservice

`https://github.com/freeCodeCamp/boilerplate-project-urlshortener/`

Exercise Tracker Microservice

`https://github.com/freeCodeCamp/boilerplate-project-exercisetracker/`

File Metadata Microservice

`https://github.com/freeCodeCamp/boilerplate-project-filemetadata/`

To run any of them locally, follow these steps:

1. Clone the repo of the course you want to do:

   ```
   git clone https://github.com/freeCodeCamp/boilerplate-npm/
   ```

2. Go into the cloned folder:

   ```bash
   cd boilerplate-npm
   ```

3. Install the node_modules folder by running:

   ```bash
   npm install
   ```

4. Start the local server at http://localhost:3000/ by running:

   ```bash
   npm start
   ```

5. After you complete a challenge, submit the link of the local server (`http://localhost:3000/`) in the `Solution Link` field at freecodecamp.org, while your local server is running.

## Run freeCodeCamp's Relational Database Certification Challenges LOCALLY

### Prerequisites:

- Docker Engine. (Installation tutorial somewhere above in this document!)
- VS Code.
- Dev Containers extension for VS Code.
- Git.

### Steps:

1. Clone the RDB Alpha repo:

   ```bash
   git clone https://github.com/freeCodeCamp/rdb-alpha
   ```

2. Go into the cloned folder:

   ```bash
   cd rdb-alpha
   ```

3. Open VS Code there:

   ```bash
   code .
   ```

4. Open the VS Code command palette (`Ctrl + Shift + P`) and run `Dev Containers: Rebuild and Reopen in Container`.

5. When the build is done, open the command palette again (`Ctrl + Shift + P`) and run `CodeRoad: Start`.

6. In the CodeRoad window, click `Start New Tutorial`.

7. Click the `URL` tab and enter the URL of the `tutorial.json` file for the tutorial you want to start. (full list of available tutorials below!)

8. Click the `Start` button to start the lessons.

To switch tutorials, repeat steps 4-8 (you'll lose all progress).

### Available tutorials:

Learn Bash by Building a Boilerplate:

`https://raw.githubusercontent.com/freeCodeCamp/learn-bash-by-building-a-boilerplate/main/tutorial.json`

Learn Relational Databases by Building a Mario Database:

`https://raw.githubusercontent.com/freeCodeCamp/learn-relational-databases-by-building-a-mario-database/main/tutorial.json`

Celestial Bodies Database:

`https://raw.githubusercontent.com/freeCodeCamp/learn-celestial-bodies-database/main/tutorial.json`

Learn Bash Scripting by Building Five Programs:

`https://raw.githubusercontent.com/freeCodeCamp/learn-bash-scripting-by-building-five-programs/main/tutorial.json`

Learn SQL by Building a Student Database - Part 1:

`https://raw.githubusercontent.com/freeCodeCamp/learn-sql-by-building-a-student-database-part-1/main/tutorial.json`

Learn SQL by Building a Student Database - Part 2:

`https://raw.githubusercontent.com/freeCodeCamp/learn-sql-by-building-a-student-database-part-2/main/tutorial.json`

World Cup Database:

`https://raw.githubusercontent.com/freeCodeCamp/learn-world-cup-database/main/tutorial.json`

Learn Advanced Bash by Building a Kitty Ipsum Translator:

`https://raw.githubusercontent.com/freeCodeCamp/learn-advanced-bash-by-building-a-kitty-ipsum-translator/main/tutorial.json`

Learn Bash and SQL by Building a Bike Rental Shop:

`https://raw.githubusercontent.com/freeCodeCamp/learn-bash-and-sql-by-building-a-bike-rental-shop/main/tutorial.json`

Salon Appointment Scheduler:

`https://raw.githubusercontent.com/freeCodeCamp/learn-salon-appointment-scheduler/main/tutorial.json`

Learn Nano by Building a Castle:

`https://raw.githubusercontent.com/freeCodeCamp/learn-nano-by-building-a-castle/main/tutorial.json`

Learn Git by Building an SQL Reference Object:

`https://raw.githubusercontent.com/freeCodeCamp/learn-git-by-building-an-sql-reference-object/main/tutorial.json`

Periodic Table Database:

`https://raw.githubusercontent.com/freeCodeCamp/learn-periodic-table-database/main/tutorial.json`

Number Guessing Game:

`https://raw.githubusercontent.com/freeCodeCamp/learn-number-guessing-game/main/tutorial.json`


## Best way to query PostgreSQL in a Bash script

```bash
PSQL="psql --username=freecodecamp --dbname=periodic_table --tuples-only --no-align --command"
```

## Open Google Colab Notebook stored in GitHub

Given this URL to a notebook stored in GitHub:

`https://github.com/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb`

The URL you want has the form:

`https://colab.research.google.com/github<path_to_file>`

Where <path_to_file> represents `/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb`, which is the original URL without the schema (`https://`) and domain (`github.com`), leaving you with:

`https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb`


## Browsing GitHub repositories with Google Colab

For a GitHub browser where you can search any organization or username:

`http://colab.research.google.com/github`

To browse the repositories of a user or organization, use:

`http://colab.research.google.com/github/<user_or_org>/`

For example, to browse the repositories of the googlecolab organization, use:

`http://colab.research.google.com/github/googlecolab/`

To browse the main branch of a <repository> from a <user_or_org>, use:

`http://colab.research.google.com/github/<user_or_org>/<repository>/`

For example, to browse the main branch of the colabtools repository from the googlecolab organization, use:

`http://colab.research.google.com/github/googlecolab/colabtools/`

To browse any branch of a repository, use:

`http://colab.research.google.com/github/<user_or_org>/<repository>/blob/<branch>`

For example, to browse the master branch of the colabtools repository from the googlecolab organization, use:

`http://colab.research.google.com/github/googlecolab/colabtools/blob/master`

To open a specific notebook of a specific branch, use:

`https://colab.research.google.com/github/<user_or_org>/<repository>/blob/<branch><path_to_notebook>`

For example, to open the colab-github-demo.ipynb notebook from the master branch of googlecolab's colabtools repository:

`https://colab.research.google.com/github/googlecolab/colabtools/blob/master/notebooks/colab-github-demo.ipynb`

## Using D3 via NPM

Run:

```bash
npm install d3
```

During development, link `d3.js` to your `.html` file with this script tag:

```html
<script src="node_modules/d3/dist/d3.js"></script>
```

For production, link `d3.min.js` (the minified version) instead of the above, like this:

```html
<script src="node_modules/d3/dist/d3.min.js"></script>
```

If any of the above script tags doesn't work, it's possible `d3.js` (or `d3.min.js`) is in a different location inside the `node_modules` folder; if so, find the correct path and put it instead of the path example above.
