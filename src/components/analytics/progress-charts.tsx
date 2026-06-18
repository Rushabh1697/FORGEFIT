'use client'

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658']

export function ProgressCharts({ workouts, weightHistory }: { workouts: any[], weightHistory: any[] }) {
  
  // 1. Workout Frequency (by month or week)
  const workoutsByDate = workouts.reduce((acc: Record<string, number>, w: any) => {
    const month = new Date(w.workout_date).toLocaleDateString('en-US', { month: 'short' })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})

  const frequencyData = Object.keys(workoutsByDate).map(month => ({
    name: month,
    count: workoutsByDate[month]
  })).reverse()

  // 2. Muscle Group Distribution
  const muscleGroups = workouts.reduce((acc: Record<string, number>, w: any) => {
    acc[w.muscle_group] = (acc[w.muscle_group] || 0) + 1
    return acc
  }, {})

  const distributionData = Object.keys(muscleGroups).map(mg => ({
    name: mg,
    value: muscleGroups[mg]
  }))

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Workout Frequency</CardTitle>
          <CardDescription>Sessions per month</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="count" fill="#fff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Muscle Distribution</CardTitle>
          <CardDescription>Focus areas this month</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
