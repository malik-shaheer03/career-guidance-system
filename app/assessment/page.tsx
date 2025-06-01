"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Brain, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { assessmentQuestions, interestBasedQuestions } from "@/lib/assessment-data"

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [allQuestions, setAllQuestions] = useState([...assessmentQuestions])
  const [questionsGenerated, setQuestionsGenerated] = useState(false)

  const totalSteps = allQuestions.length
  const currentQuestion = allQuestions[currentStep]
  const progress = ((currentStep + 1) / totalSteps) * 100

  const generateDynamicQuestions = (interests: string[]) => {
    console.log("Generating questions for interests:", interests)
    const newQuestions: any[] = []

    interests.forEach((interest) => {
      const interestKey = interest as keyof typeof interestBasedQuestions
      if (interestBasedQuestions[interestKey]) {
        const questionsForInterest = interestBasedQuestions[interestKey]
        console.log(`Adding ${questionsForInterest.length} questions for ${interest}`)

        // Add all questions for this interest
        questionsForInterest.forEach((question) => {
          newQuestions.push({
            ...question,
            id: `${interest}_${question.id.split("_").slice(1).join("_")}`, // Ensure proper ID format
          })
        })
      }
    })

    console.log("Total new questions generated:", newQuestions.length)
    console.log(
      "New questions:",
      newQuestions.map((q) => q.id),
    )
    return newQuestions
  }

  const handleNext = () => {
    console.log("Current question:", currentQuestion.id)
    console.log("Current answer:", answers[currentQuestion.id])
    console.log("All current answers:", answers)

    // If this is the interests question and we haven't generated dynamic questions yet
    if (
      currentQuestion.id === "interests" &&
      answers.interests &&
      answers.interests.length > 0 &&
      !questionsGenerated
    ) {
      console.log("Generating dynamic questions for interests:", answers.interests)
      const dynamicQuestions = generateDynamicQuestions(answers.interests)

      // Insert dynamic questions after the base questions
      const updatedQuestions = [...assessmentQuestions, ...dynamicQuestions]

      console.log("Updated questions array length:", updatedQuestions.length)
      console.log(
        "All question IDs:",
        updatedQuestions.map((q) => q.id),
      )
      setAllQuestions(updatedQuestions)
      setQuestionsGenerated(true)
    }

    if (currentStep < allQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Complete assessment
      console.log("Assessment complete! Final answers:", answers)
      setIsComplete(true)
      // Store results in localStorage for the results page
      localStorage.setItem("assessmentResults", JSON.stringify(answers))
      setTimeout(() => {
        router.push("/results")
      }, 1500)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSingleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    })
  }

  const handleMultipleAnswer = (value: string, checked: boolean) => {
    const currentValues = answers[currentQuestion.id] || []
    let newValues

    if (checked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter((v: string) => v !== value)
    }

    setAnswers({
      ...answers,
      [currentQuestion.id]: newValues,
    })
  }

  const handleRatingAnswer = (questionId: string, skillId: string, rating: number) => {
    setAnswers({
      ...answers,
      [questionId]: {
        ...(answers[questionId] || {}),
        [skillId]: rating,
      },
    })
  }

  const isNextDisabled = () => {
    const currentAnswer = answers[currentQuestion.id]

    if (!currentAnswer) return true

    if (currentQuestion.type === "multiple") {
      return currentAnswer.length === 0
    }

    if (currentQuestion.type === "rating") {
      return Object.keys(currentAnswer || {}).length < currentQuestion.options.length
    }

    return false
  }

  // Debug logging
  useEffect(() => {
    console.log("Current step:", currentStep)
    console.log("Total questions:", allQuestions.length)
    console.log("Questions generated:", questionsGenerated)
  }, [currentStep, allQuestions.length, questionsGenerated])

  if (isComplete) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 py-12">
        <div className="container px-4 md:px-6 mx-auto max-w-md">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
              <CardDescription>
                Analyzing your responses and generating personalized career recommendations...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={100} className="h-2 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Processing {Object.keys(answers).length} responses across {allQuestions.length} questions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading assessment...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-12">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Career Assessment</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Answer the following questions to receive personalized career recommendations
          </p>
          <div className="w-full max-w-md mx-auto">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-gray-500">
              Question {currentStep + 1} of {allQuestions.length}
              {questionsGenerated && currentStep > assessmentQuestions.length - 1 && (
                <span className="text-purple-600 ml-2">(Personalized based on your interests)</span>
              )}
            </p>
          </div>
        </div>

        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            <CardDescription>{currentQuestion.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "single" && (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleSingleAnswer}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestion.type === "multiple" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={(answers[currentQuestion.id] || []).includes(option.value)}
                      onCheckedChange={(checked) => handleMultipleAnswer(option.value, checked === true)}
                    />
                    <Label htmlFor={option.value} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.type === "rating" && (
              <div className="space-y-6">
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="space-y-2">
                    <Label className="text-base font-medium">{option.label}</Label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          type="button"
                          variant={answers[currentQuestion.id]?.[option.value] === rating ? "default" : "outline"}
                          className="w-10 h-10 p-0"
                          onClick={() => handleRatingAnswer(currentQuestion.id, option.value, rating)}
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={handleNext} disabled={isNextDisabled()}>
              {currentStep === allQuestions.length - 1 ? "Complete" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-purple-600">
            Save and continue later
          </Link>
        </div>
      </div>
    </div>
  )
}
