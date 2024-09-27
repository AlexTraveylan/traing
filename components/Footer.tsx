import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <p className="text-gray-600">
              Ma plateforme de gestion de formation offre des outils innovants
              pour suivre et améliorer vos parcours d'apprentissage.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/emargement"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Émargement
                </Link>
              </li>
              <li>
                <Link
                  href="/prerequis"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Prérequis
                </Link>
              </li>
              <li>
                <Link
                  href="/evaluation"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Évaluation
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Formateur</h3>
            <p className="text-gray-600">Email: timothee.Demares@gmail.com</p>
            <p className="text-gray-600">Tél: 0762457593</p>
            <Link
              href="https://www.alextraveylan.fr"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              https://www.alextraveylan.fr
            </Link>
            <div className="flex space-x-4 mt-4">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://x.com/Anonymanus_Ex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/tdemares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/AlexTraveylan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center">
          <p className="text-gray-600">
            &copy; 2024 AlexTraveylan. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
