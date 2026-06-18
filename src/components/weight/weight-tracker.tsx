'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { logWeight } from '@/lib/actions/weight'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { Loader2, Plus } from 'lucide-react'

export function WeightTracker({ history }: { history: any[] }) {
  const [isPending, setIsPending] = useState(false)
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    try {
      await logWeight(parseFloat(weight), date)
      setWeight('')
      alert('Weight logged successfully!')
    } catch (error) {
      console.error(error)
      alert('Failed to log weight')
    } finally {
      setIsPending(false)
    }
  }

  // Format data for chart
  const chartData = history.map(h => ({
    date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: h.weight
  })).reverse()

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <Card className="md:col-span-4 bg-gray-900 border-gray-800 h-fit">
        <CardHeader>
          <CardTitle>Log Weight</CardTitle>
          <CardDescription>Keep track of your daily progress</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input 
                type="number" 
                step="0.1" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                required 
                className="bg-gray-800 border-gray-700" 
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
                className="bg-gray-800 border-gray-700" 
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Plus className="mr-2 h-4 w-4" /> Log Weight</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="md:col-span-8 bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Weight Trend</CardTitle>
          <CardDescription>Your progress over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#9CA3AF" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#fff" 
                strokeWidth={2} 
                dot={{ fill: '#fff', strokeWidth: 2 }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-12 bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Weight History</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
                {history.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                    <p className="font-semibold">{entry.weight} kg</p>
                    <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
        </CardContent>
      </Card>
    </div>
  )
}
