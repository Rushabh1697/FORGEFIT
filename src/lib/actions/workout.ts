'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { MuscleGroup } from '@/types'

export async function createWorkout(
  muscleGroup: MuscleGroup, 
  exercises: { name: string; sets: number; reps: number; weight: number }[]
) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: workout, error: workoutError } = await supabase
    .from('workouts')
    .insert({
      user_id: user.id,
      muscle_group: muscleGroup,
    })
    .select()
    .single()

  if (workoutError) return { error: workoutError.message }

  const exercisesToInsert = exercises.map(ex => ({
    workout_id: workout.id,
    exercise_name: ex.name,
    sets: ex.sets,
    reps: ex.reps,
    weight_used: ex.weight,
  }))

  const { error: exercisesError } = await supabase
    .from('exercises')
    .insert(exercisesToInsert)

  if (exercisesError) return { error: exercisesError.message }

  revalidatePath('/workouts')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteWorkout(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('workouts').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/workouts')
  revalidatePath('/dashboard')
  return { success: true }
}
