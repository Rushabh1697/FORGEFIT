import { WorkoutForm } from '@/components/workouts/workout-form'

export default function WorkoutsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Log Workout</h1>
        <p className="text-gray-400 font-medium">Capture your effort and track your progress.</p>
      </div>
      <WorkoutForm />
    </div>
  )
}
