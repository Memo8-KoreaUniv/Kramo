import path from 'path'

import Koa from 'koa'
import qs from 'koa-qs'
import bodyparser from 'koa-body'
import serve from 'koa-static'
import morgan from 'koa-morgan'
import mount from 'koa-mount'
import Router from 'koa-router'
import next from 'next'

import api from './routes/api'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const staticDirPath = path.join(__dirname, 'public')

async function main() {
  const nextApp = next({ dev })
  const app = qs(new Koa(), 'extended')
  const router = new Router()

  await nextApp.prepare()

  const handle = nextApp.getRequestHandler()

  function renderNext(route: string) {
    return (ctx: Koa.Context) => {
      ctx.res.statusCode = 200
      ctx.respond = false

      nextApp.render(ctx.req, ctx.res, route, { ...ctx.prarams, ...ctx.query })
    }
  }

  router.get('/', renderNext('/'))
  router.get('/image', renderNext('/public'))

  router.get('/hello', renderNext('/hello/world'))

  app
    .use(morgan('combined'))
    .use(serve(staticDirPath))
    .use(
      mount('/health', (ctx: Koa.Context) => {
        ctx.status = 200
      }),
    )
    .use(bodyparser())
    .use(api)
    .use(router.routes())
    .use(
      mount('/', (ctx: Koa.Context) => {
        ctx.respond = false
        handle(ctx.req, ctx.res)
      }),
    )

  app.listen(port)
}

main()
