import { createClient } from '@/lib/supabase/server'
import { ProgressCharts } from '@/components/analytics/progress-charts'

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: workouts } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', user?.id)

  const { data: weightHistory } = await supabase
    .from('weight_history')
    .select('*')
    .eq('user_id', user?.id)
    .order('date', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Progress</h1>
        <p className="text-gray-400 font-medium">Visualise your journey and identify trends.</p>
      </div>

      <ProgressCharts workouts={workouts || []} weightHistory={weightHistory || []} />
    </div>
  )
}
