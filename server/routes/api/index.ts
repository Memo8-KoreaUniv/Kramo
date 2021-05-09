import Router from 'koa-router'

import TestRouter from './test'

const router = new Router()

router.use('/test', TestRouter)

export default router.prefix('/api').routes()
