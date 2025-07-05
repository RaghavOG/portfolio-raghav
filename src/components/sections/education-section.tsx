import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EducationSection() {
  return (
    <section id="education" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-12 font-space-grotesk">Education</h2>
        <Card className="bg-darkBackground border-darkBorder text-darkForeground text-left hover:border-accentGreen transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-space-grotesk text-accentGreen">Chitkara University</CardTitle>
            <CardDescription className="text-darkForeground/80 font-inter">
              BE CSE - AI | Aug 2023 - June 2027
            </CardDescription>
          </CardHeader>
          <CardContent className="font-inter">
            <p>
              Pursuing a Bachelor of Engineering in Computer Science with a specialization in Artificial Intelligence.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
