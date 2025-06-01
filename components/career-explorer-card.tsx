import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, ArrowRight, Sparkles } from "lucide-react"

export function CareerExplorerCard() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto">
            <Compass className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold mb-2">Ready to Discover Your Career?</CardTitle>
          <CardDescription className="text-purple-100 text-lg">
            Explore hundreds of career paths and find the perfect match for your skills and interests
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-200" />
              <span className="text-purple-100">500+ Career Paths</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-200" />
              <span className="text-purple-100">AI-Powered Matching</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-200" />
              <span className="text-purple-100">Detailed Insights</span>
            </div>
          </div>
          <Link href="/careers">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-3 h-auto group transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore Careers
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
