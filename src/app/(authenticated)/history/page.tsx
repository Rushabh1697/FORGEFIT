import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { History as HistoryIcon, Calendar, Dumbbell } from 'lucide-react'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: workouts } = await supabase
    .from('workouts')
    .select('*, exercises(*)')
    .eq('user_id', user?.id)
    .order('workout_date', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workout History</h1>
        <p className="text-gray-400 font-medium">Review your past sessions and achievements.</p>
      </div>

      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-6 pr-4">
          {workouts && workouts.length > 0 ? (
            workouts.map((workout) => (
              <Card key={workout.id} className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Dumbbell className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{workout.muscle_group} Session</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(workout.workout_date).toLocaleDateString(undefined, { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </CardDescription>
                        </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workout.exercises?.map((ex: any) => (
                      <div key={ex.id} className="p-3 bg-black rounded-lg border border-gray-800">
                        <p className="font-semibold text-sm mb-1">{ex.exercise_name}</p>
                        <div className="flex gap-3 text-xs text-gray-400">
                          <span>{ex.sets} Sets</span>
                          <span>{ex.reps} Reps</span>
                          <span>{ex.weight_used} kg</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-900/50 rounded-2xl border border-dashed border-gray-800">
                <HistoryIcon className="h-12 w-12 mb-4 opacity-20" />
                <p>You haven't logged any workouts yet.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
