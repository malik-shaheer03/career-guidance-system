"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Download,
  Star,
  Briefcase,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  Target,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { CareerDetailDialog } from "@/components/career-detail-dialog"
import { careerMatching, skillDevelopmentPaths } from "@/lib/assessment-data"
import { careers } from "@/lib/career-data"

interface CareerRecommendation {
  id: string
  title: string
  description: string
  category: string
  skills: string[]
  education: string
  salary: string
  growth: string
  matchScore: number
  reasons: string[]
  skillAlignment: { [key: string]: number }
  skillGaps: string[]
  developmentPath: string[]
}

interface SkillAnalysis {
  strengths: { skill: string; score: number; level: string }[]
  gaps: { skill: string; importance: number; currentLevel: number; targetLevel: number }[]
  recommendations: string[]
}

export default function ResultsPage() {
  const [selectedCareer, setSelectedCareer] = useState<any>(null)
  const [assessmentResults, setAssessmentResults] = useState<any>(null)
  const [careerRecommendations, setCareerRecommendations] = useState<CareerRecommendation[]>([])
  const [skillAnalysis, setSkillAnalysis] = useState<SkillAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load assessment results from localStorage
    const results = localStorage.getItem("assessmentResults")
    if (results) {
      const parsedResults = JSON.parse(results)
      console.log("Loaded assessment results:", parsedResults)
      setAssessmentResults(parsedResults)
      generateComprehensiveResults(parsedResults)
    } else {
      setIsLoading(false)
    }
  }, [])

  const generateComprehensiveResults = (results: any) => {
    console.log("Generating comprehensive results for:", results)

    const recommendations = generateCareerRecommendations(results)
    const skillAnalysisResult = generateSkillAnalysis(results, recommendations)

    setCareerRecommendations(recommendations)
    setSkillAnalysis(skillAnalysisResult)
    setIsLoading(false)
  }

  const generateCareerRecommendations = (results: any): CareerRecommendation[] => {
    console.log("=== GENERATING CAREER RECOMMENDATIONS ===")
    console.log("Assessment results:", results)

    const recommendations: CareerRecommendation[] = []
    const interests = results.interests || []

    console.log("User interests:", interests)

    // Process each interest area
    interests.forEach((interest: string) => {
      console.log(`\n--- Processing interest: ${interest} ---`)

      const interestKey = interest as keyof typeof careerMatching
      if (careerMatching[interestKey]) {
        // Get focus areas for this interest
        const focusKey = `${interest}_focus`
        const focusAreas = results[focusKey] || []

        console.log(`Focus areas for ${interest}:`, focusAreas)

        // If no focus areas selected, use all available focus areas for this interest
        const availableFocusAreas = focusAreas.length > 0 ? focusAreas : Object.keys(careerMatching[interestKey])

        availableFocusAreas.forEach((focus: string) => {
          console.log(`  Processing focus: ${focus}`)

          const focusMatches = careerMatching[interestKey][focus as keyof (typeof careerMatching)[typeof interestKey]]

          if (focusMatches && Array.isArray(focusMatches)) {
            focusMatches.forEach((careerMatch: any) => {
              console.log(`    Processing career: ${careerMatch.title}`)

              const careerData = careers.find((c) => c.title === careerMatch.title)
              if (careerData) {
                const matchScore = calculateAdvancedMatchScore(results, careerData, careerMatch, interest, focus)
                const skillAlignment = calculateSkillAlignment(results, careerMatch.skills || [], interest)
                const skillGaps = identifySkillGaps(results, careerMatch.skills || [], interest)
                const developmentPath = generateDevelopmentPath(skillGaps, results)
                const reasons = generateDetailedReasons(results, careerData, interest, focus, matchScore)

                console.log(`      Match score: ${matchScore}`)

                // Check if this career is already in recommendations
                const existingIndex = recommendations.findIndex((r) => r.title === careerMatch.title)
                if (existingIndex >= 0) {
                  // Update existing recommendation if this score is higher
                  if (matchScore > recommendations[existingIndex].matchScore) {
                    recommendations[existingIndex] = {
                      ...careerData,
                      matchScore,
                      reasons,
                      skillAlignment,
                      skillGaps,
                      developmentPath,
                    }
                  }
                } else {
                  recommendations.push({
                    ...careerData,
                    matchScore,
                    reasons,
                    skillAlignment,
                    skillGaps,
                    developmentPath,
                  })
                }
              } else {
                console.log(`      Career data not found for: ${careerMatch.title}`)
              }
            })
          } else {
            console.log(`    No matches found for focus: ${focus}`)
          }
        })
      } else {
        console.log(`No career matching data for interest: ${interest}`)
      }
    })

    // If no recommendations found, add some general recommendations based on interests
    if (recommendations.length === 0) {
      console.log("No specific matches found, adding general recommendations...")

      // Add some general careers based on interests
      interests.forEach((interest: string) => {
        const generalCareers = getGeneralCareersForInterest(interest)
        generalCareers.forEach((careerTitle) => {
          const careerData = careers.find((c) => c.title === careerTitle)
          if (careerData) {
            recommendations.push({
              ...careerData,
              matchScore: 65, // Base score for general matches
              reasons: [
                `Aligns with your ${interest.replace("_", " ")} interests`,
                "Good starting point for career exploration",
              ],
              skillAlignment: {},
              skillGaps: [],
              developmentPath: ["Explore this field further", "Take relevant courses", "Connect with professionals"],
            })
          }
        })
      })
    }

    // Sort by match score and return top 8
    const sortedRecommendations = recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 8)

    console.log("=== FINAL RECOMMENDATIONS ===")
    console.log(`Generated ${sortedRecommendations.length} recommendations:`)
    sortedRecommendations.forEach((rec) => {
      console.log(`- ${rec.title}: ${rec.matchScore}%`)
    })

    return sortedRecommendations
  }

  // Add this helper function
  const getGeneralCareersForInterest = (interest: string): string[] => {
    const generalMappings: { [key: string]: string[] } = {
      technology: ["Software Engineer", "Data Scientist", "UX Designer", "Cybersecurity Analyst"],
      design: ["UX Designer", "Graphic Designer", "Product Designer"],
      business: ["Project Manager", "Business Analyst", "Marketing Manager"],
      healthcare: ["Registered Nurse", "Healthcare Administrator"],
      marketing: ["Marketing Manager", "Digital Marketing Specialist"],
      finance: ["Financial Analyst", "Accountant"],
      education: ["Teacher", "Instructional Designer"],
      research: ["Research Analyst", "Data Scientist"],
    }

    return generalMappings[interest] || ["Software Engineer", "Project Manager", "Marketing Manager"]
  }

  const calculateAdvancedMatchScore = (
    results: any,
    career: any,
    careerMatch: any,
    interest: string,
    focus: string,
  ): number => {
    console.log(`Calculating match score for ${career.title}`)

    let score = 70 // Higher base score

    // Interest alignment (20 points)
    const interestWeight = careerMatch.weight || 0.8
    score += 20 * interestWeight
    console.log(`After interest alignment: ${score}`)

    // Skills alignment (20 points)
    const skillsKey = `${interest}_skills`
    if (results[skillsKey]) {
      const skillScores = Object.values(results[skillsKey]) as number[]
      if (skillScores.length > 0) {
        const avgSkillScore = skillScores.reduce((a, b) => a + b, 0) / skillScores.length
        const skillBonus = (avgSkillScore / 5) * 20
        score += skillBonus
        console.log(`Skills average: ${avgSkillScore}, bonus: ${skillBonus}, new score: ${score}`)
      }
    }

    // Experience alignment (10 points)
    const experienceKey = `${interest}_experience`
    if (results[experienceKey]) {
      const experienceBonus = getExperienceBonus(results[experienceKey])
      score += experienceBonus
      console.log(`Experience bonus: ${experienceBonus}, new score: ${score}`)
    }

    // Career goals alignment (10 points)
    if (results.career_goals && Array.isArray(results.career_goals)) {
      let goalAlignment = 0
      if (results.career_goals.includes("high_salary") && career.salary.includes("$100,000")) goalAlignment += 3
      if (results.career_goals.includes("growth") && career.growth === "High") goalAlignment += 3
      if (
        results.career_goals.includes("stability") &&
        ["healthcare", "education", "finance"].includes(career.category)
      )
        goalAlignment += 2
      if (results.career_goals.includes("creativity") && ["design", "marketing"].includes(career.category))
        goalAlignment += 3
      if (results.career_goals.includes("impact") && ["healthcare", "education", "research"].includes(career.category))
        goalAlignment += 3
      score += goalAlignment
      console.log(`Goal alignment bonus: ${goalAlignment}, new score: ${score}`)
    }

    const finalScore = Math.min(Math.round(score), 95)
    console.log(`Final score for ${career.title}: ${finalScore}`)
    return finalScore
  }

  const getExperienceBonus = (experience: string): number => {
    const bonusMap: { [key: string]: number } = {
      complete_beginner: 5,
      learning: 8,
      hobbyist: 10,
      some_professional: 12,
      experienced: 15,
      senior: 15,
      student: 8,
      entry_level: 10,
      mid_level: 12,
      senior_level: 15,
      executive: 15,
    }
    return bonusMap[experience] || 5
  }

  const getEducationBonus = (userEducation: string, careerEducation: string): number => {
    const educationLevels: { [key: string]: number } = {
      high_school: 1,
      associate: 2,
      bachelor: 3,
      master: 4,
      doctorate: 5,
      bootcamp: 2.5,
      self_taught: 2,
    }

    const userLevel = educationLevels[userEducation] || 1
    const requiredLevel = careerEducation.toLowerCase().includes("master")
      ? 4
      : careerEducation.toLowerCase().includes("bachelor")
        ? 3
        : careerEducation.toLowerCase().includes("associate")
          ? 2
          : 1

    if (userLevel >= requiredLevel) return 5
    if (userLevel >= requiredLevel - 1) return 3
    return 1
  }

  const calculateSkillAlignment = (
    results: any,
    requiredSkills: string[],
    interest: string,
  ): { [key: string]: number } => {
    const skillsKey = `${interest}_skills`
    const userSkills = results[skillsKey] || {}
    const alignment: { [key: string]: number } = {}

    requiredSkills.forEach((skill) => {
      alignment[skill] = userSkills[skill] || 1
    })

    return alignment
  }

  const identifySkillGaps = (results: any, requiredSkills: string[], interest: string): string[] => {
    const skillsKey = `${interest}_skills`
    const userSkills = results[skillsKey] || {}
    const gaps: string[] = []

    requiredSkills.forEach((skill) => {
      const userLevel = userSkills[skill] || 1
      if (userLevel < 3) {
        // Below intermediate level
        gaps.push(skill)
      }
    })

    return gaps
  }

  const generateDevelopmentPath = (skillGaps: string[], results: any): string[] => {
    const path: string[] = []

    skillGaps.forEach((skill) => {
      const skillPath = skillDevelopmentPaths[skill as keyof typeof skillDevelopmentPaths]
      if (skillPath) {
        path.push(...skillPath.beginner.slice(0, 2)) // Add first 2 beginner recommendations
      }
    })

    return [...new Set(path)].slice(0, 5) // Remove duplicates and limit to 5
  }

  const generateDetailedReasons = (
    results: any,
    career: any,
    interest: string,
    focus: string,
    matchScore: number,
  ): string[] => {
    const reasons: string[] = []

    // Interest alignment
    reasons.push(`Strong alignment with your ${interest.replace("_", " ")} interests`)

    // Focus area alignment
    reasons.push(`Matches your focus on ${focus.replace("_", " ")}`)

    // Skills assessment
    const skillsKey = `${interest}_skills`
    if (results[skillsKey]) {
      const skillScores = Object.values(results[skillsKey]) as number[]
      const avgSkillScore = skillScores.reduce((a, b) => a + b, 0) / skillScores.length
      if (avgSkillScore >= 3.5) {
        reasons.push("Your current skill level is well-suited for this role")
      } else if (avgSkillScore >= 2.5) {
        reasons.push("Good foundation with room for skill development")
      }
    }

    // Career goals alignment
    if (results.career_goals) {
      if (results.career_goals.includes("growth") && career.growth === "High") {
        reasons.push("Excellent growth potential matches your career goals")
      }
      if (results.career_goals.includes("high_salary") && career.salary.includes("$100,000")) {
        reasons.push("High earning potential aligns with your financial goals")
      }
      if (
        results.career_goals.includes("impact") &&
        ["healthcare", "education", "research"].includes(career.category)
      ) {
        reasons.push("Opportunity to make meaningful societal impact")
      }
      if (results.career_goals.includes("creativity") && ["design", "marketing"].includes(career.category)) {
        reasons.push("Creative expression opportunities match your interests")
      }
    }

    // Experience level
    const experienceKey = `${interest}_experience`
    if (results[experienceKey]) {
      const experience = results[experienceKey]
      if (["experienced", "senior", "senior_level", "executive"].includes(experience)) {
        reasons.push("Your experience level is ideal for this career path")
      } else if (["some_professional", "mid_level", "hobbyist"].includes(experience)) {
        reasons.push("Good stepping stone given your current experience")
      }
    }

    return reasons.slice(0, 4) // Limit to 4 most relevant reasons
  }

  const generateSkillAnalysis = (results: any, recommendations: CareerRecommendation[]): SkillAnalysis => {
    const strengths: { skill: string; score: number; level: string }[] = []
    const gaps: { skill: string; importance: number; currentLevel: number; targetLevel: number }[] = []
    const recommendationsList: string[] = []

    // Analyze skills across all interests
    const interests = results.interests || []
    interests.forEach((interest: string) => {
      const skillsKey = `${interest}_skills`
      if (results[skillsKey]) {
        Object.entries(results[skillsKey]).forEach(([skill, score]) => {
          const numScore = score as number
          const level = getSkillLevel(numScore)

          if (numScore >= 4) {
            strengths.push({ skill: skill.replace("_", " "), score: numScore, level })
          } else if (numScore <= 2) {
            gaps.push({
              skill: skill.replace("_", " "),
              importance: calculateSkillImportance(skill, recommendations),
              currentLevel: numScore,
              targetLevel: 4,
            })
          }
        })
      }
    })

    // Generate personalized recommendations
    if (strengths.length > 0) {
      recommendationsList.push(`Leverage your strong ${strengths[0].skill} skills in your career search`)
    }

    if (gaps.length > 0) {
      const topGap = gaps.sort((a, b) => b.importance - a.importance)[0]
      recommendationsList.push(`Focus on developing ${topGap.skill} to improve your career prospects`)
    }

    recommendationsList.push("Consider taking online courses or certifications in your areas of interest")
    recommendationsList.push("Build a portfolio showcasing your skills and projects")
    recommendationsList.push("Network with professionals in your target career fields")

    return {
      strengths: strengths.slice(0, 5),
      gaps: gaps.slice(0, 5),
      recommendations: recommendationsList,
    }
  }

  const getSkillLevel = (score: number): string => {
    if (score >= 4.5) return "Expert"
    if (score >= 3.5) return "Advanced"
    if (score >= 2.5) return "Intermediate"
    if (score >= 1.5) return "Beginner"
    return "No Experience"
  }

  const calculateSkillImportance = (skill: string, recommendations: CareerRecommendation[]): number => {
    let importance = 0
    recommendations.forEach((rec) => {
      if (rec.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))) {
        importance += rec.matchScore / 100
      }
    })
    return importance
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Brain className="h-16 w-16 text-purple-600 animate-pulse mb-4" />
        <p className="text-gray-600 text-lg">Analyzing your responses and generating personalized recommendations...</p>
      </div>
    )
  }

  if (!assessmentResults) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg mb-4">No assessment results found</p>
        <Link href="/assessment">
          <Button className="bg-purple-600 hover:bg-purple-700">Take the Assessment</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-4">
              <Brain className="h-6 w-6 text-white mr-2" />
              <span className="text-sm font-medium">AI-Powered Career Analysis</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Your Personalized Career Roadmap</h1>
            <p className="text-xl text-purple-100 mb-8">
              Based on your comprehensive assessment, we've identified {careerRecommendations.length} career paths that
              align with your skills, interests, and goals
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{careerRecommendations.length}</div>
                <div className="text-purple-200">Career Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{assessmentResults.interests?.length || 0}</div>
                <div className="text-purple-200">Interest Areas</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{Object.keys(assessmentResults).length}</div>
                <div className="text-purple-200">Data Points Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="matches">Career Matches</TabsTrigger>
              <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
              <TabsTrigger value="development">Development Plan</TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="space-y-6">
              {careerRecommendations.length > 0 ? (
                careerRecommendations.map((career, index) => (
                  <Card key={career.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/4 bg-gradient-to-br from-purple-50 to-indigo-50 p-6 flex flex-col items-center justify-center">
                        <div className="relative mb-4">
                          <svg className="w-24 h-24">
                            <circle
                              className="text-gray-200"
                              strokeWidth="6"
                              stroke="currentColor"
                              fill="transparent"
                              r="42"
                              cx="48"
                              cy="48"
                            />
                            <circle
                              className="text-purple-600"
                              strokeWidth="6"
                              strokeDasharray={2 * Math.PI * 42}
                              strokeDashoffset={2 * Math.PI * 42 * (1 - career.matchScore / 100)}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="42"
                              cx="48"
                              cy="48"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-purple-700">{career.matchScore}%</span>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            career.matchScore >= 90
                              ? "bg-green-100 text-green-800"
                              : career.matchScore >= 80
                                ? "bg-blue-100 text-blue-800"
                                : career.matchScore >= 70
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {career.matchScore >= 90
                            ? "Excellent Match"
                            : career.matchScore >= 80
                              ? "Great Match"
                              : career.matchScore >= 70
                                ? "Good Match"
                                : "Potential Match"}
                        </Badge>
                      </div>

                      <div className="lg:w-3/4 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-purple-700 mb-1">{career.title}</h3>
                            <p className="text-gray-600 capitalize">{career.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              className={
                                career.growth === "Very High"
                                  ? "bg-purple-100 text-purple-800"
                                  : career.growth === "High"
                                    ? "bg-green-100 text-green-800"
                                    : career.growth === "Medium"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {career.growth} Growth
                            </Badge>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{career.description}</p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                              <Target className="h-4 w-4 mr-1" />
                              Why This Matches You:
                            </h4>
                            <ul className="space-y-1">
                              {career.reasons?.map((reason: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              Key Skills & Alignment:
                            </h4>
                            <div className="space-y-2">
                              {Object.entries(career.skillAlignment || {}).map(([skill, level]) => (
                                <div key={skill} className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600 capitalize">{skill.replace("_", " ")}</span>
                                  <div className="flex items-center">
                                    <Progress value={(level as number) * 20} className="w-16 h-2 mr-2" />
                                    <span className="text-xs text-gray-500">{level}/5</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 mr-1" />
                            <span>{career.education}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold text-green-600">{career.salary}</span>
                          </div>
                        </div>

                        {career.skillGaps && career.skillGaps.length > 0 && (
                          <div className="bg-orange-50 p-3 rounded-lg mb-4">
                            <h4 className="text-sm font-semibold text-orange-800 mb-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Skills to Develop:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {career.skillGaps.map((skill, index) => (
                                <Badge key={index} variant="outline" className="bg-orange-100 text-orange-700 text-xs">
                                  {skill.replace("_", " ")}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3">
                          <Button onClick={() => setSelectedCareer(career)}>View Full Details</Button>
                          <Button variant="outline">Save Career</Button>
                          <Button variant="outline">Find Similar Roles</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Career Matches Found</h3>
                    <p className="text-gray-600 mb-4">We couldn't find specific matches based on your responses.</p>
                    <Link href="/assessment">
                      <Button>Retake Assessment</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="skills">
              <div className="space-y-6">
                {skillAnalysis && (
                  <>
                    {/* Strengths Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-700">
                          <Star className="h-5 w-5 mr-2" />
                          Your Key Strengths
                        </CardTitle>
                        <CardDescription>Skills where you demonstrate strong proficiency</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {skillAnalysis.strengths.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skillAnalysis.strengths.map((strength, index) => (
                              <div key={index} className="bg-green-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold text-green-800 capitalize">{strength.skill}</h4>
                                  <Badge className="bg-green-100 text-green-800">{strength.level}</Badge>
                                </div>
                                <Progress value={strength.score * 20} className="h-2" />
                                <p className="text-sm text-green-700 mt-1">Score: {strength.score}/5</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600">Complete more skill assessments to identify your strengths.</p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Skill Gaps Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-orange-700">
                          <AlertCircle className="h-5 w-5 mr-2" />
                          Development Opportunities
                        </CardTitle>
                        <CardDescription>Skills that could enhance your career prospects</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {skillAnalysis.gaps.length > 0 ? (
                          <div className="space-y-4">
                            {skillAnalysis.gaps.map((gap, index) => (
                              <div key={index} className="bg-orange-50 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-semibold text-orange-800 capitalize">{gap.skill}</h4>
                                  <Badge className="bg-orange-100 text-orange-800">High Priority</Badge>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-orange-700">Current Level</span>
                                  <span className="text-sm text-orange-700">Target Level</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="flex-1">
                                    <Progress value={gap.currentLevel * 20} className="h-2" />
                                    <p className="text-xs text-orange-600 mt-1">{gap.currentLevel}/5</p>
                                  </div>
                                  <span className="text-orange-500">→</span>
                                  <div className="flex-1">
                                    <Progress value={gap.targetLevel * 20} className="h-2" />
                                    <p className="text-xs text-orange-600 mt-1">{gap.targetLevel}/5</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600">
                            Great job! No major skill gaps identified based on your career interests.
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Interest Areas Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Interest Profile</CardTitle>
                        <CardDescription>Areas that drive your career motivation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Primary Interests</h4>
                            <div className="flex flex-wrap gap-2">
                              {assessmentResults.interests?.map((interest: string, index: number) => (
                                <Badge key={index} className="bg-purple-100 text-purple-800 capitalize">
                                  {interest.replace("_", " ")}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">Career Goals</h4>
                            <div className="flex flex-wrap gap-2">
                              {assessmentResults.career_goals?.map((goal: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-blue-50 capitalize">
                                  {goal.replace("_", " ")}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="development">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                      Personalized Development Plan
                    </CardTitle>
                    <CardDescription>
                      Actionable steps to advance your career based on your assessment results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {skillAnalysis?.recommendations && (
                      <div className="space-y-4">
                        {skillAnalysis.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="bg-blue-100 rounded-full p-1 mt-1">
                              <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                            </div>
                            <p className="text-blue-800">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Learning Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Learning Resources</CardTitle>
                    <CardDescription>Curated resources based on your career interests and skill gaps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {assessmentResults.interests?.slice(0, 3).map((interest: string, index: number) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 capitalize text-gray-800">
                            {interest.replace("_", " ")} Resources
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Online courses and certifications</li>
                            <li>• Industry-specific bootcamps</li>
                            <li>• Professional communities</li>
                            <li>• Hands-on project ideas</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle>Immediate Next Steps</CardTitle>
                    <CardDescription>Start your career journey with these actionable steps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-700">Short-term (1-3 months)</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Research your top 3 career matches in detail</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Start developing your most critical skill gaps</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Connect with professionals in your target fields</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Update your resume and LinkedIn profile</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-700">Long-term (3-12 months)</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Complete relevant certifications or courses</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Build a portfolio showcasing your skills</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Apply for positions or internships</span>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Seek mentorship in your chosen field</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Take Action on Your Results</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your career journey starts now. Use these tools and resources to move forward with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Briefcase className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Explore Career Details</CardTitle>
                <CardDescription>
                  Dive deeper into your matched careers to learn about requirements, day-to-day responsibilities, and
                  growth paths
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/careers" className="w-full">
                  <Button variant="outline" className="w-full">
                    Browse All Careers
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Educational Pathways</CardTitle>
                <CardDescription>
                  Discover courses, certifications, and degree programs that can help you achieve your career goals
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/knowledge-base" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Education Options
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Download className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Download Your Report</CardTitle>
                <CardDescription>
                  Get a comprehensive PDF report with all your results, recommendations, and development plan
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Full Report
                </Button>
              </CardFooter>
            </Card>
          </div>
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
