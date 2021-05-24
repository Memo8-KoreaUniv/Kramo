import Router from 'koa-router'

import TestRouter from './test'
import UserRouter from './user'

const router = new Router()

router.use('/test', TestRouter)
router.use('/user', UserRouter)

export default router.prefix('/api').routes()
