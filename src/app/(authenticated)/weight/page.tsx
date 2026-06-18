import { createClient } from '@/lib/supabase/server'
import { WeightTracker } from '@/components/weight/weight-tracker'

export default async function WeightPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: history } = await supabase
    .from('weight_history')
    .select('*')
    .eq('user_id', user?.id)
    .order('date', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weight Tracking</h1>
        <p className="text-gray-400 font-medium">Monitor your physical changes.</p>
      </div>
      <WeightTracker history={history || []} />
    </div>
  )
}
