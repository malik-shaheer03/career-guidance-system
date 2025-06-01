import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code, Database, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About CareerAI</h1>
            <p className="text-xl text-purple-100">
              Empowering career decisions through artificial intelligence and expert knowledge
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At CareerAI, we believe everyone deserves to find fulfilling work that aligns with their skills,
                interests, and values. Our mission is to democratize career guidance by leveraging artificial
                intelligence and expert knowledge to provide personalized recommendations and insights.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to helping individuals navigate the complex landscape of career options, educational
                pathways, and skill development opportunities. By combining cutting-edge technology with comprehensive
                career data, we empower users to make informed decisions about their professional futures.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Our Core Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">User-Centered Guidance</h4>
                    <p className="text-gray-600">
                      Putting your unique needs and aspirations at the center of our recommendations
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Intelligent Insights</h4>
                    <p className="text-gray-600">
                      Leveraging AI and data science to provide accurate, relevant career guidance
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Continuous Growth</h4>
                    <p className="text-gray-600">Supporting lifelong learning and professional development</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Technology</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              CareerAI combines advanced artificial intelligence with comprehensive career data to deliver personalized
              guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <Brain className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>AI-Powered Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our system uses machine learning algorithms to analyze your skills, interests, and preferences,
                  matching them with suitable career paths and opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <Database className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Comprehensive Knowledge Base</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We maintain an extensive database of careers, skills, educational pathways, and industry trends that
                  is regularly updated to reflect the changing job market.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <Code className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Expert System Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our platform is built on a sophisticated expert system that simulates the reasoning of career
                  counselors, providing personalized recommendations based on complex rule sets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              CareerAI was developed by a dedicated team of experts in AI, career counseling, and technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Muhammad Shaheer Malik",
                role: "UI/UX Designer, Front-End Developer & AI Expert",
                description:
                  "Specializes in creating intuitive user experiences and implementing AI-driven interfaces for career guidance systems.",
                image: "/shaheer.jpg",
              },
              {
                name: "Muhammad Balaj Javed",
                role: "Back-End Developer, DevOps Specialist & ML Engineer",
                description:
                  "Expert in building scalable backend systems, machine learning algorithms, and deployment infrastructure for AI applications.",
                image: "/balaj.jpg",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-purple-600 font-medium text-base">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Vision for the Future</h2>
            <p className="text-xl text-purple-100 mb-8">
              We envision a world where everyone has access to personalized career guidance that helps them discover and
              pursue fulfilling work aligned with their unique talents and passions.
            </p>
            <p className="text-lg text-purple-100">
              As technology and the job market continue to evolve, CareerAI will remain at the forefront of innovation,
              continuously improving our recommendations and expanding our knowledge base to serve the changing needs of
              our users.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
