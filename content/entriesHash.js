export default {
  'index': () => import('./entries/index'),
  'inspect': () => import('./entries/inspect'),
  'development': () => import('./entries/development'),
  'strange-brew': () => import('./entries/development/strange-brew'),
  'visuals': () => import('./entries/visuals'),
  'project': () => import('./entries/visuals/project'),
}
