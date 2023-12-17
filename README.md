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
[CITROS Documentation](https://docs.google.com/document/d/1LNI0ADvVuqLIyCntEMXDgCxgSbvf5P7-sXHkj_aISN4/edit#heading=h.ty6304ii3b1f)

[![Push Docker to GCR GitHub Action](https://github.com/lulav/citros_web/actions/workflows/gcr.yml/badge.svg)](https://github.com/lulav/citros_web/actions/workflows/gcr.yml)

---------------------------------------------------------------
# TODO

1. [ ] - tests -> test: add `run test locally` dialog (liken in test run and sim run) so the CLI will trigger the test and run it, and not as it is now: ui triggers ans then the user run the test + sim.  

## bugs:
- [ ] fix - drop down context project. 
- [ ] logout on expired jwt token. 
  

- [ ] Add dynamic types from [graphql](https://www.apollographql.com/docs/apollo-server/workflow/generate-types/) 
  
---------------------------------------------------------------
# admin dashboard

- [ ] Users
  - [ ] Live
  - [ ] per date range (default last month) statistics
    - [ ] logins.
    - [ ] pageviews / api calls
  - [ ] DB storage consumption (mongo)
  - [ ] payments / billing / invoices.

- [ ] Tests/Simulations 
  - [ ] live
  - [ ] per date range (default last month)

- [ ] Cloud usage
  - [ ] kubernetes data
  - [ ] storage consumprion 
  - [ ] CPU/GPU consumption

- [ ] small graph like in github shwing activity by time. (for test/ simulation/ user?/organization?)
---------------------------------------------------------------

# ENV variables
| ENV | Default | Description |
| --- | --- | --- |
| `JUPYTER_NOTEBOOK_API` | `notebook:8888` | Jupyter host:port |
| `REDIS_URI` | `redis://redis:6379` | Redis connection string |
| `CITROS_API_URL` | `http://localhost:5555/api/graphql` | CITROS api host |


# permissions:
| Organization | user | Description |
| --- | --- | --- |
| `MANAGE` | `ADMIN` | see and change all data |
| `MANAGE` | `USER` | see all data |
| `CLIENT` | `ADMIN` | see all data under organization |
| `CLIENT` | `USER` | seel only his data |


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

## gcloud:

https://console.cloud.google.com/artifacts/browse/citros?project=citros&supportedpurview=project

```bash
# if building from linux machine
# docker build . docker-web
docker build -t citros-web . 
# *** when building from MAC M1 chip add FROM --platform=linux/amd64 ***
docker buildx build --platform linux/amd64 -t citros-web .   

# upload to google artifact registry

docker tag citros-web registry.citros.local/citros/citros-web
docker push registry.citros.local/citros/citros-web

docker tag citros-web registry.local:32000/citros/citros-docker/citros-web
docker push registry.local:32000/citros/citros-docker/citros-web

docker tag citros-web us-central1-docker.pkg.dev/citros/citros-docker/citros-web
docker push us-central1-docker.pkg.dev/citros/citros-docker/citros-web

``` 