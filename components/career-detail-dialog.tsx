"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, GraduationCap, DollarSign, Users, Briefcase } from "lucide-react"

interface CareerDetailDialogProps {
  career: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CareerDetailDialog({ career, open, onOpenChange }: CareerDetailDialogProps) {
  if (!career) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-700">{career.title}</DialogTitle>
          <DialogDescription className="text-lg">{career.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Growth Outlook</p>
                <p className="font-semibold">{career.growth}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Salary Range</p>
                <p className="font-semibold">{career.salary}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{career.category}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Skills Required */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-600" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.skills?.map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-purple-50">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Education Requirements */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
              Education Requirements
            </h3>
            <p className="text-gray-700">{career.education}</p>
          </div>

          <Separator />

          {/* Why This Matches (if available) */}
          {career.reasons && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3">Why This Career Matches You</h3>
                <ul className="space-y-2">
                  {career.reasons.map((reason: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1">Save to Favorites</Button>
            <Button variant="outline" className="flex-1">
              View Similar Careers
            </Button>
            <Button variant="outline" className="flex-1">
              Find Education Paths
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
