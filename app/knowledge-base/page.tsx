import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Lightbulb, TrendingUp, GraduationCap } from "lucide-react"

export default function KnowledgeBasePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-4">
              <Brain className="h-6 w-6 text-white mr-2" />
              <span className="text-sm font-medium">Career Knowledge Base</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Career Knowledge Hub</h1>
            <p className="text-xl text-purple-100">
              Explore comprehensive information about skills, careers, and educational pathways
            </p>
          </div>
        </div>
      </section>

      {/* Knowledge Base Content */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    category: "Technical Skills",
                    skills: [
                      {
                        name: "Programming",
                        description: "Writing code to create software applications",
                        demand: "High",
                      },
                      {
                        name: "Data Analysis",
                        description: "Interpreting data to inform decision making",
                        demand: "High",
                      },
                      { name: "Web Development", description: "Building and maintaining websites", demand: "High" },
                      {
                        name: "Machine Learning",
                        description: "Creating systems that learn from data",
                        demand: "Very High",
                      },
                      {
                        name: "Cloud Computing",
                        description: "Using remote servers for data storage and processing",
                        demand: "High",
                      },
                    ],
                  },
                  {
                    category: "Soft Skills",
                    skills: [
                      { name: "Communication", description: "Clearly conveying information to others", demand: "High" },
                      { name: "Leadership", description: "Guiding and motivating teams", demand: "High" },
                      {
                        name: "Problem Solving",
                        description: "Finding solutions to complex challenges",
                        demand: "High",
                      },
                      {
                        name: "Adaptability",
                        description: "Adjusting to new conditions and requirements",
                        demand: "High",
                      },
                      { name: "Teamwork", description: "Collaborating effectively with others", demand: "High" },
                    ],
                  },
                  {
                    category: "Business Skills",
                    skills: [
                      { name: "Project Management", description: "Planning and executing projects", demand: "High" },
                      { name: "Strategic Thinking", description: "Planning for long-term success", demand: "High" },
                      {
                        name: "Financial Analysis",
                        description: "Evaluating financial data and performance",
                        demand: "Medium",
                      },
                      { name: "Marketing", description: "Promoting products or services", demand: "Medium" },
                      {
                        name: "Negotiation",
                        description: "Reaching agreements beneficial to all parties",
                        demand: "Medium",
                      },
                    ],
                  },
                ].map((category, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-purple-50">
                      <CardTitle>{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="divide-y">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold">{skill.name}</h4>
                            <Badge
                              className={
                                skill.demand === "Very High"
                                  ? "bg-purple-100 text-purple-800"
                                  : skill.demand === "High"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {skill.demand} Demand
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{skill.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                    Skills Development Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Technical Skills</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Take online courses on platforms like Coursera, Udemy, or edX</li>
                        <li>• Contribute to open-source projects to gain practical experience</li>
                        <li>• Build personal projects to demonstrate your abilities</li>
                        <li>• Earn certifications relevant to your field</li>
                        <li>• Join technical communities and attend workshops</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Soft Skills</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Practice public speaking through groups like Toastmasters</li>
                        <li>• Take on leadership roles in community organizations</li>
                        <li>• Seek feedback from colleagues and mentors</li>
                        <li>• Read books on communication and emotional intelligence</li>
                        <li>• Participate in team projects to develop collaboration skills</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="careers" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    industry: "Technology",
                    careers: [
                      { title: "Software Engineer", growth: "High", salary: "$80,000 - $140,000" },
                      { title: "Data Scientist", growth: "Very High", salary: "$95,000 - $150,000" },
                      { title: "UX Designer", growth: "High", salary: "$75,000 - $120,000" },
                      { title: "Product Manager", growth: "High", salary: "$85,000 - $140,000" },
                      { title: "Cybersecurity Analyst", growth: "Very High", salary: "$90,000 - $140,000" },
                    ],
                  },
                  {
                    industry: "Healthcare",
                    careers: [
                      { title: "Registered Nurse", growth: "High", salary: "$70,000 - $110,000" },
                      { title: "Physician Assistant", growth: "Very High", salary: "$100,000 - $130,000" },
                      { title: "Health Informatics Specialist", growth: "High", salary: "$75,000 - $120,000" },
                      { title: "Physical Therapist", growth: "Medium", salary: "$80,000 - $100,000" },
                      { title: "Healthcare Administrator", growth: "Medium", salary: "$70,000 - $120,000" },
                    ],
                  },
                  {
                    industry: "Business & Finance",
                    careers: [
                      { title: "Financial Analyst", growth: "Medium", salary: "$65,000 - $110,000" },
                      { title: "Marketing Manager", growth: "Medium", salary: "$70,000 - $130,000" },
                      { title: "Management Consultant", growth: "Medium", salary: "$85,000 - $150,000" },
                      { title: "Human Resources Specialist", growth: "Medium", salary: "$60,000 - $100,000" },
                      { title: "Business Intelligence Analyst", growth: "High", salary: "$75,000 - $120,000" },
                    ],
                  },
                  {
                    industry: "Creative & Media",
                    careers: [
                      { title: "Graphic Designer", growth: "Medium", salary: "$50,000 - $85,000" },
                      { title: "Content Creator", growth: "High", salary: "$45,000 - $90,000" },
                      { title: "Digital Marketing Specialist", growth: "High", salary: "$55,000 - $95,000" },
                      { title: "Video Producer", growth: "Medium", salary: "$60,000 - $100,000" },
                      { title: "Art Director", growth: "Low", salary: "$70,000 - $120,000" },
                    ],
                  },
                ].map((industry, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{industry.industry}</CardTitle>
                      <CardDescription>Career paths and opportunities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-2">Career</th>
                            <th className="pb-2">Growth</th>
                            <th className="pb-2">Salary Range</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {industry.careers.map((career, careerIndex) => (
                            <tr key={careerIndex} className="text-sm">
                              <td className="py-3 font-medium">{career.title}</td>
                              <td className="py-3">
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
                                  {career.growth}
                                </Badge>
                              </td>
                              <td className="py-3 text-gray-600">{career.salary}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                    Emerging Career Fields
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-800">Artificial Intelligence</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Rapidly growing field with opportunities in machine learning, natural language processing, and
                        AI ethics.
                      </p>
                      <Badge className="bg-green-100 text-green-800">Very High Growth</Badge>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-800">Renewable Energy</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Expanding sector with roles in solar, wind, and sustainable energy development.
                      </p>
                      <Badge className="bg-blue-100 text-blue-800">High Growth</Badge>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-purple-800">Remote Work Solutions</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Growing demand for specialists in virtual collaboration, remote team management, and digital
                        workspace design.
                      </p>
                      <Badge className="bg-purple-100 text-purple-800">High Growth</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    level: "Bachelor's Degrees",
                    programs: [
                      {
                        name: "Computer Science",
                        careers: ["Software Engineer", "Data Scientist"],
                        duration: "4 years",
                      },
                      {
                        name: "Business Administration",
                        careers: ["Product Manager", "Business Analyst"],
                        duration: "4 years",
                      },
                      { name: "Design", careers: ["UX Designer", "Graphic Designer"], duration: "4 years" },
                      { name: "Engineering", careers: ["Software Engineer", "Systems Analyst"], duration: "4 years" },
                      { name: "Psychology", careers: ["UX Researcher", "HR Specialist"], duration: "4 years" },
                    ],
                  },
                  {
                    level: "Master's Degrees",
                    programs: [
                      { name: "Data Science", careers: ["Data Scientist", "ML Engineer"], duration: "2 years" },
                      { name: "MBA", careers: ["Product Manager", "Consultant"], duration: "2 years" },
                      {
                        name: "Human-Computer Interaction",
                        careers: ["UX Designer", "UX Researcher"],
                        duration: "2 years",
                      },
                      { name: "Information Systems", careers: ["Systems Analyst", "IT Manager"], duration: "2 years" },
                      {
                        name: "Digital Marketing",
                        careers: ["Marketing Manager", "Digital Strategist"],
                        duration: "1-2 years",
                      },
                    ],
                  },
                  {
                    level: "Certifications",
                    programs: [
                      {
                        name: "AWS Cloud Practitioner",
                        careers: ["Cloud Engineer", "DevOps Engineer"],
                        duration: "3-6 months",
                      },
                      {
                        name: "Google Analytics",
                        careers: ["Digital Marketer", "Data Analyst"],
                        duration: "1-3 months",
                      },
                      {
                        name: "PMP (Project Management)",
                        careers: ["Project Manager", "Program Manager"],
                        duration: "3-6 months",
                      },
                      {
                        name: "Salesforce Administrator",
                        careers: ["CRM Specialist", "Business Analyst"],
                        duration: "2-4 months",
                      },
                      {
                        name: "Certified Ethical Hacker",
                        careers: ["Cybersecurity Analyst", "Security Engineer"],
                        duration: "3-6 months",
                      },
                    ],
                  },
                  {
                    level: "Online Courses",
                    programs: [
                      {
                        name: "Full Stack Web Development",
                        careers: ["Web Developer", "Software Engineer"],
                        duration: "6-12 months",
                      },
                      {
                        name: "Data Analysis with Python",
                        careers: ["Data Analyst", "Data Scientist"],
                        duration: "3-6 months",
                      },
                      {
                        name: "UX/UI Design Bootcamp",
                        careers: ["UX Designer", "Product Designer"],
                        duration: "3-9 months",
                      },
                      {
                        name: "Digital Marketing",
                        careers: ["Marketing Specialist", "Content Manager"],
                        duration: "2-4 months",
                      },
                      { name: "Machine Learning", careers: ["ML Engineer", "AI Specialist"], duration: "6-12 months" },
                    ],
                  },
                ].map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{category.level}</CardTitle>
                      <CardDescription>Educational pathways and their career outcomes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.programs.map((program, programIndex) => (
                          <div key={programIndex} className="border-l-4 border-purple-200 pl-4">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold">{program.name}</h4>
                              <Badge variant="outline">{program.duration}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Leads to: {program.careers.join(", ")}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                    Educational Planning Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Choosing the Right Path</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Consider your career goals and timeline</li>
                        <li>• Research industry requirements and preferences</li>
                        <li>• Evaluate cost vs. potential return on investment</li>
                        <li>• Look for programs with strong industry connections</li>
                        <li>• Consider online vs. in-person learning preferences</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Funding Your Education</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Research scholarships and grants</li>
                        <li>• Consider employer tuition reimbursement programs</li>
                        <li>• Look into income-share agreements for bootcamps</li>
                        <li>• Explore federal and state financial aid options</li>
                        <li>• Consider part-time programs to continue working</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-800">Popular Learning Platforms</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium">University Programs</h5>
                        <ul className="text-gray-600">
                          <li>• Coursera</li>
                          <li>• edX</li>
                          <li>• Udacity</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium">Skill-Based</h5>
                        <ul className="text-gray-600">
                          <li>• Udemy</li>
                          <li>• Skillshare</li>
                          <li>• LinkedIn Learning</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium">Tech Bootcamps</h5>
                        <ul className="text-gray-600">
                          <li>• General Assembly</li>
                          <li>• Lambda School</li>
                          <li>• Flatiron School</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium">Professional Certs</h5>
                        <ul className="text-gray-600">
                          <li>• AWS Training</li>
                          <li>• Google Career Certificates</li>
                          <li>• Microsoft Learn</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
