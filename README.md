# testStationF
> some test that actually is occasion to discover vue 3 ( MEVN stack)

## Table of contents
* [General info](#general-info)
* [Stack](#stack)
* [Todo](#todo)
* [Setup](#setup)
* [Nice Ressources](#nice-ressources)
* [Contact](#contact)

## General info
project status is WIP

## Stack
* back: Node.js, Express.js ... see ./package.json
* front: Vue.js, sweetAlert.js ... see ./client/package.json
* test: postman
* deploy: heroku

## Todo
- [x] set up boilerplate: node express mongo, vue
- [x] deploy workflow
- [x] design db
- [x] secure secrets variables
- [x] basic design
  - [x] 1 form to query db
  - [x] 1 container to list available rooms
- [ ] switch to composition API (ongoing)
- [ ] split code between more components
- [ ] design frontend with some bootstrap-like library
- [ ] lint codebase

## Setup
deployed version: https://resa-stationf.herokuapp.com/
or clone this repo locally, then:
```
npm run dev
```
in another shell tab
```
npm run serve
```

## Nice ressources
<details><summary>(click to toggle)</summary>

- mongodb
- node
- express
- vue
  - vue doc https://vuejs.org/
  - vue3 doc https://v3.vuejs.org/
  - vue cli https://cli.vuejs.org/
  - full Stack Vue.js, Express & MongoDB Traversy Media [playlist](https://www.youtube.com/watch?v=j55fHUJqtyw&list=PLillGF-RfqbYSx-Ab1xWVanGKtowTsnNm)
  - composition API [yt video](https://www.youtube.com/watch?v=bwItFdPt-6M)
- heroku
    setting a buildpack on an application [heroku doc](https://devcenter.heroku.com/articles/buildpacks)
- git
  - deploy sub dir [stackoverflow thread](https://stackoverflow.com/questions/26241683/heroku-deploy-a-sub-directory)
- environnement variables
  - [vue doc](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables)
  - [nice article](https://dev.to/benjaminmock/how-to-handle-secrets-in-node-js-environment-variables-2251)
- eslint [set up](https://www.synbioz.com/blog/tech/un-code-js-impeccable-grace-a-eslint)
- [vue chrome extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related?hl=fr)
</details>

## Contact
Created by [@Fraberg](https://github.com/Fraberg/)