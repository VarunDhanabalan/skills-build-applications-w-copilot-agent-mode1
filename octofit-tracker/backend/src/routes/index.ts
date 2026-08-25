import { Router } from 'express'
import { Activity, Team, User, Workout } from '../models/index.js'

const router = Router()

function registerCrudRoutes(path: string, model: typeof User | typeof Team | typeof Activity | typeof Workout) {
  router.get(path, async (_request, response, next) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }))
    } catch (error) { next(error) }
  })

  router.post(path, async (request, response, next) => {
    try {
      response.status(201).json(await model.create(request.body))
    } catch (error) { next(error) }
  })
}

registerCrudRoutes('/users', User)
registerCrudRoutes('/teams', Team)
registerCrudRoutes('/activities', Activity)
registerCrudRoutes('/workouts', Workout)

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, user: { _id: '$user._id', name: '$user.name' }, points: 1, activities: 1 } },
    ])
    response.json(leaderboard)
  } catch (error) { next(error) }
})

router.get('/workouts/suggestions', async (request, response, next) => {
  try {
    const activityType = typeof request.query.type === 'string' ? request.query.type : undefined
    const filter = activityType ? { activityType } : {}
    response.json(await Workout.find(filter).limit(5))
  } catch (error) { next(error) }
})

router.use((error: unknown, _request: unknown, response: any, _next: unknown) => {
  const message = error instanceof Error ? error.message : 'Unexpected server error'
  response.status(400).json({ error: message })
})

export default router