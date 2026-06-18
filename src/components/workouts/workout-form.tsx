'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import { createWorkout } from '@/lib/actions/workout'
import { MuscleGroup } from '@/types'

const MUSCLE_GROUPS: MuscleGroup[] = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core']

export function WorkoutForm() {
  const [isPending, setIsPending] = useState(false)
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('Chest')
  const [exercises, setExercises] = useState([{ name: '', sets: 0, reps: 0, weight: 0 }])

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }])
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const updateExercise = (index: number, field: string, value: string | number) => {
    const updated = [...exercises]
    updated[index] = { ...updated[index], [field]: value }
    setExercises(updated)
  }

  const handleSave = async () => {
    setIsPending(true)
    try {
      await createWorkout(muscleGroup, exercises)
      // Reset form
      setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }])
      alert('Workout saved successfully!')
    } catch (error) {
      console.error(error)
      alert('Failed to save workout')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Log New Workout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Muscle Group</Label>
          <Select value={muscleGroup} onValueChange={(v) => setMuscleGroup(v as MuscleGroup)}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select muscle group" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {MUSCLE_GROUPS.map((mg) => (
                <SelectItem key={mg} value={mg}>{mg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Exercises</Label>
          {exercises.map((ex, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border border-gray-800 p-4 rounded-lg">
              <div className="md:col-span-5 space-y-2">
                <Label className="text-xs text-gray-500 uppercase">Exercise Name</Label>
                <Input 
                  value={ex.name} 
                  onChange={(e) => updateExercise(index, 'name', e.target.value)}
                  placeholder="e.g. Bench Press" 
                  className="bg-gray-800 border-gray-700" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs text-gray-500 uppercase">Sets</Label>
                <Input 
                  type="number" 
                  value={ex.sets} 
                  onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                  className="bg-gray-800 border-gray-700" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs text-gray-500 uppercase">Reps</Label>
                <Input 
                  type="number" 
                  value={ex.reps} 
                  onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value))}
                  className="bg-gray-800 border-gray-700" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs text-gray-500 uppercase">Weight (kg)</Label>
                <Input 
                  type="number" 
                  value={ex.weight} 
                  onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value))}
                  className="bg-gray-800 border-gray-700" 
                />
              </div>
              <div className="md:col-span-1">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => removeExercise(index)}
                  disabled={exercises.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button onClick={addExercise} variant="outline" className="w-full border-gray-800 bg-black">
            <Plus className="mr-2 h-4 w-4" /> Add Exercise
          </Button>
          <Button onClick={handleSave} className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4" /> Save Workout</>}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
