import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell, Scale, Flame, Calendar } from 'lucide-react'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch real data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  const { data: recentWorkouts } = await supabase
    .from('workouts')
    .select('*, exercises(*)')
    .eq('user_id', user?.id)
    .order('workout_date', { ascending: false })
    .limit(5)

  const stats = [
    {
      title: 'Current Weight',
      value: `${profile?.weight || '--'} kg`,
      icon: Scale,
      color: 'text-blue-500',
    },
    {
      title: 'Workouts (This Week)',
      value: recentWorkouts?.length || 0,
      icon: Dumbbell,
      color: 'text-green-500',
    },
    {
      title: 'Current Streak',
      value: '4 Days', // This would need logic
      icon: Flame,
      color: 'text-orange-500',
    },
    {
      title: 'Last Workout',
      value: recentWorkouts?.[0]?.muscle_group || 'None',
      icon: Calendar,
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-400 font-medium">Welcome back, {profile?.name || 'Athlete'}.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentWorkouts && recentWorkouts.length > 0 ? (
              <div className="space-y-4">
                {recentWorkouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold">{workout.muscle_group} Session</p>
                      <p className="text-sm text-gray-500">{new Date(workout.workout_date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-sm font-medium">
                      {workout.exercises?.length || 0} exercises
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <Dumbbell className="h-12 w-12 mb-4 opacity-20" />
                    <p>No workouts recorded yet.</p>
                </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-800 hover:bg-gray-800 transition-colors">
                <Dumbbell className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Log Workout</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-800 hover:bg-gray-800 transition-colors">
                <Scale className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Log Weight</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
