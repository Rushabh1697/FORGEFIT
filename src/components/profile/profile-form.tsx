'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Save } from 'lucide-react'
import { UserProfile, FitnessGoal } from '@/types'

const GOALS: FitnessGoal[] = ['Fat Loss', 'Muscle Gain', 'Strength Gain', 'Maintenance']

export function ProfileForm({ initialData }: { initialData: UserProfile }) {
  const [isPending, setIsPending] = useState(false)
  const [formData, setFormData] = useState(initialData)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    const supabase = createClient()
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, email, ...updateData } = formData

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', initialData.id)

    if (error) {
      alert('Failed to update profile')
    } else {
      alert('Profile updated!')
    }
    setIsPending(false)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your physical metrics and goals</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={formData.name || ''} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-gray-800 border-gray-700" 
              />
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              <Input 
                type="number"
                value={formData.age || ''} 
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                className="bg-gray-800 border-gray-700" 
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select 
                value={formData.gender || ''} 
                onValueChange={(v) => setFormData({...formData, gender: v})}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fitness Goal</Label>
              <Select 
                value={formData.goal || ''} 
                onValueChange={(v) => setFormData({...formData, goal: v as FitnessGoal})}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {GOALS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input 
                type="number"
                value={formData.height || ''} 
                onChange={(e) => setFormData({...formData, height: parseFloat(e.target.value)})}
                className="bg-gray-800 border-gray-700" 
              />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input 
                type="number"
                value={formData.weight || ''} 
                onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value)})}
                className="bg-gray-800 border-gray-700" 
              />
            </div>
          </div>
          <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4" /> Save Profile</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
