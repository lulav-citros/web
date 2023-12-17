```python
# ==============================================
#   ██████╗██╗████████╗██████╗  ██████╗ ███████╗
#  ██╔════╝██║╚══██╔══╝██╔══██╗██╔═══██╗██╔════╝
#  ██║     ██║   ██║   ██████╔╝██║   ██║███████╗
#  ██║     ██║   ██║   ██╔══██╗██║   ██║╚════██║
#  ╚██████╗██║   ██║   ██║  ██║╚██████╔╝███████║
#   ╚═════╝╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
# ==============================================
```

# run

## install dependencies

yarn set version berry

    yarn install

## run dev

```bash
yarn dev
```

# build

```bash
yarn build

## run build
yarn start
```

# Docker

```bash
# build the docker
docker build -t citros-web .

docker run -p 8080:8080 --name citros_web citros-web


# run the docker deamon
docker run -d -p 8080:8080 --env-file .env  --name citros_web citros-web

# local
docker run --rm -p 8080:8080 --env-file .env  --name citros_web citros-web
```

# usefull links

https://www.viget.com/articles/host-build-and-deploy-next-js-projects-on-github-pages/
