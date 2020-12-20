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
- [x] switch to composition API
- [ ] split code between more components (ongoing)
- [ ] design frontend with some bootstrap-like library
- [ ] lint codebase
- [ ] Algolia to fasten API calls
- [ ] use [VeeValidate](https://vee-validate.logaretm.com/v3/) ?
- [ ] Nuxt.js ?

## Setup
deployed version: https://resa-stationf.herokuapp.com/
or clone this repo locally, then:
```
npm run dev
```
in another shell tab
```
cd ./client && npm run serve
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
  - nice [vue 3 tips and tricks](https://www.youtube.com/watch?v=iVnn21cAa3M&list=PLnKfPkeIekbb7X0TqmNNdX-CKOJaYNTpu&index=11), on vs code extensions, error-handling
  - full Stack Vue.js, Express & MongoDB Traversy Media [playlist](https://www.youtube.com/watch?v=j55fHUJqtyw&list=PLillGF-RfqbYSx-Ab1xWVanGKtowTsnNm)
  - composition API [yt video](https://www.youtube.com/watch?v=bwItFdPt-6M)
  lifecycle hooks:
    - beforeMount - Right before mounting of the DOM begins
    - mounted - Called when the instance has been mounted (browser updated).
    - beforeUpdate - Called when reactive data has changed, before the DOM is re-rendered.
    - updated - Called when reactive data has changed, and the DOM has been re-rendered.
    - beforeDestroy - Called right before the Vue instance is destroyed.
    - destroyed - Called after the Vue instance has been destroyed.
- other hooks:
    - activated - Used for , when a component inside is toggled on.
    - deactivated - Used for , when a component inside is toggled off.
    - errorCaptured - Called when an error from any descendent component is captured.
- composition API way to do API calls:  
    - beforeCreate and created are not needed when using the Composition API. This is because beforeCreate() is called right before setup() and created() is called right after setup(). Thus, we simply put code inside setup() that would normally be in these hooks, such as API calls.
    - (beforeCreate - Called immediately after instance is initialized, before options are processed.)
    - (created - Called after the instance has been created.)

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