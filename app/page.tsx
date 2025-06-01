import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, ChevronRight, Compass, GraduationCap, LineChart, Users, Sparkles } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { CareerExplorerCard } from "@/components/career-explorer-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Discover Your Perfect Career Path
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered career guidance system helps you explore opportunities that match your skills, interests,
              and aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-purple-600" />}
              title="AI-Powered Recommendations"
              description="Our intelligent system analyzes your skills and preferences to suggest the most suitable career paths."
            />
            <FeatureCard
              icon={<Compass className="h-10 w-10 text-purple-600" />}
              title="Career Exploration"
              description="Explore hundreds of career options across various industries with detailed information and insights."
            />
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-purple-600" />}
              title="Educational Guidance"
              description="Get recommendations for courses, certifications, and educational paths to achieve your career goals."
            />
            <FeatureCard
              icon={<LineChart className="h-10 w-10 text-purple-600" />}
              title="Market Trends"
              description="Stay informed about industry trends, salary expectations, and job market demands."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-purple-600" />}
              title="Personalized Assessment"
              description="Take our comprehensive skill assessment to discover your strengths and potential career matches."
            />
            <FeatureCard
              icon={<Sparkles className="h-10 w-10 text-purple-600" />}
              title="Growth Opportunities"
              description="Identify skills to develop and opportunities to pursue for career advancement and success."
            />
          </div>
        </div>
      </section>

      {/* Career Explorer Card */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <CareerExplorerCard />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from users who found their dream careers with our guidance system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="CareerAI helped me discover my passion for data science. The assessment was spot-on with my skills and interests!"
              author="Sarah Johnson"
              role="Data Scientist"
              image="/images/testimonial-1.png"
            />
            <TestimonialCard
              quote="After feeling lost about my career direction, the personalized recommendations gave me clarity and confidence."
              author="Michael Chen"
              role="UX Designer"
              image="/images/testimonial-2.png"
            />
            <TestimonialCard
              quote="The knowledge base and resources provided were invaluable in my transition to a new industry."
              author="Priya Patel"
              role="Product Manager"
              image="/images/testimonial-3.png"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Find Your Perfect Career?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Take our comprehensive assessment and discover career paths that align with your unique skills and passions.
          </p>
          <Link href="/assessment">
            <Button size="lg" variant="secondary" className="text-purple-700 hover:text-purple-800">
              Start Your Assessment
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
