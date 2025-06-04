"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Briefcase, TrendingUp, GraduationCap } from "lucide-react"
import { careers } from "@/lib/career-data"
import { CareerDetailDialog } from "@/components/career-detail-dialog"

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCareer, setSelectedCareer] = useState<any>(null)

  // Filter careers based on search term and category
  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || career.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(careers.map((career) => career.category)))]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-8 sm:py-12 md:py-16 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">Career Explorer</h1>
            <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8 px-4">
              Discover and explore hundreds of career paths across various industries
            </p>
            <div className="relative max-w-2xl mx-auto px-4 sm:px-0">
              <Search className="absolute left-7 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search careers..."
                className="pl-10 bg-white text-gray-900 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Career Categories */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Browse by Category</h2>
              <div className="overflow-x-auto">
                <TabsList className="bg-white flex-nowrap w-max sm:w-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="capitalize whitespace-nowrap text-xs sm:text-sm"
                    >
                      {category === "all" ? "All Categories" : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Career Listings */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          {filteredCareers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCareers.map((career) => (
                <Card key={career.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl text-purple-700 leading-tight">
                          {career.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1 text-sm">{career.category}</CardDescription>
                      </div>
                      <Badge
                        className={`self-start text-xs ${
                          career.growth === "High"
                            ? "bg-green-100 text-green-800"
                            : career.growth === "Medium"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {career.growth} Growth
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600 text-sm sm:text-base line-clamp-3">{career.description}</p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{career.education}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Avg. Salary: {career.salary}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button variant="outline" className="w-full text-sm" onClick={() => setSelectedCareer(career)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 px-4">
              <Briefcase className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">No careers found</h3>
              <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Career Detail Dialog */}
      {selectedCareer && (
        <CareerDetailDialog
          career={selectedCareer}
          open={!!selectedCareer}
          onOpenChange={() => setSelectedCareer(null)}
        />
      )}
    </div>
  )
}
