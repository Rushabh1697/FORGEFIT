'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function logWeight(weight: number, date: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('weight_history')
    .insert({
      user_id: user.id,
      weight,
      date,
    })

  if (error) return { error: error.message }

  // Update profile current weight too
  await supabase
    .from('profiles')
    .update({ weight })
    .eq('id', user.id)

  revalidatePath('/weight')
  revalidatePath('/dashboard')
  return { success: true }
}
