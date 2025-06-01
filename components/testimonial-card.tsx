import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
}

export function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-gray-700 mb-4 italic">"{quote}"</blockquote>
        <div className="flex items-center">
          <img src={image || "/placeholder.svg"} alt={author} className="w-12 h-12 rounded-full mr-4 object-cover" />
          <div>
            <div className="font-semibold text-gray-900">{author}</div>
            <div className="text-sm text-gray-600">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
