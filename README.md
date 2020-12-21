# Room reservation
> discovering vue 3 in a MEVN stack by building a simple room reservation app

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
- [x] create rooms and reservations routes
- [x] secure secrets variables
- [x] deploy to heroku once
- [x] basic front end
  - [x] 1 form to trigger API calls that query mongodb
  - [x] 1 container to list available rooms
- [x] code the logic (filter room by datetime/capacity/equipments and book them)
- [x] switch to composition API
- [ ] extract component logic into composition functions (usefull ?)
- [x] split code between components
- [ ] design front end with some bootstrap-like library (have to wait 2021 Q1 for vuetify[*](https://vuetifyjs.com/en/introduction/roadmap/#in-development)/quasar[*](https://github.com/quasarframework/quasar/issues/7836) x Vue 3)
- [ ] responsive design
- [ ] understand/find how to restrict access to server from anything other than the client [*](https://stackoverflow.com/questions/52988248/in-rest-api-how-to-restrict-url-access-from-browser-using-nodejs-expressjs) [**](https://stackoverflow.com/questions/33060044/express-csrf-token-validation/42842943)
- [ ] lint codebase
- [ ] [Algolia](https://codesandbox.io/embed/github/algolia/doc-code-samples/tree/master/Vue+InstantSearch/getting-started) / [VeeValidate](https://vee-validate.logaretm.com/v3/) / Nuxt.js ?

## Setup
- deployed version: https://resa-stationf.herokuapp.com/
- or clone this repo locally, then:
```
npm run dev
```
in another shell tab
```
cd ./client && npm run serve
```
seed rooms / clear reservations
```
node seed/seed.js
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
  - shared state management with Composition API
    - [the idea](https://vueschool.io/articles/vuejs-tutorials/state-management-with-composition-api/)
    - [some good example with provide/inject](https://dev.to/nonso/shared-state-management-with-vue-composition-api-2938) + [code](https://codesandbox.io/s/global-data-management-with-composition-api-kikyi?from-embed=&file=/src/App.vue)
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