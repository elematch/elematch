# elematch

Get points by finding card sets.

[Play Now](https://elemat.ch)

## Screenshots

- <img src="./screenshots/elematch_tutorial.png" alt="tutorial">
- <img src="./screenshots/elematch_ingame.png" alt="ingame">

## Build/Run

Build the project
```bash
git clone git@github.com:elematch/elemettch.git
cd elemettch
npm install
npm run build
```

Run the development server
```bash
git clone git@github.com:elematch/elemettch.git
cd elemettch
npm install
npm run start
```

### Docker

Build the docker image
```bash
git clone git@github.com:elematch/elemettch.git
cd elemettch
docker build -t elematch .
```
Run the container
```bash
docker run -d -p 80:80 elematch
```
