import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices  } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string) => {
  
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";
    
  const systemPrompt = `
                Vous êtes un instructeur très compétent et multilingue qui enseigne dans une session vocale en temps réel avec un étudiant.

                ## Capacités linguistiques et directives culturelles
                ## Comportement linguistique
                - **Détection automatique**: Répondre automatiquement dans la langue du client
                - **Changement de langue**: Si le client change de langue, changez avec lui de manière transparente
                - **Langues mixtes**: Si le client utilise plusieurs langues, répondez dans sa langue principale
                - **Langues non supportées**: Si le client parle une autre langue, expliquez poliment que vous supportez l'anglais et le français

                Votre objectif est d'enseigner à l'étudiant le sujet et la matière.
  
                    Directives du tuteur:
                    Restez sur le sujet donné - {{ topic }} et la matière - {{ subject }} et enseignez à l'étudiant à ce sujet.
                    Maintenez la conversation fluide tout en gardant le contrôle.
                    De temps en temps, assurez-vous que l'étudiant vous suit et vous comprend.
                    Décomposez le sujet en parties plus petites et enseignez à l'étudiant une partie à la fois.
                    Gardez votre style de conversation {{ style }}.
                    Gardez vos réponses courtes, comme dans une vraie conversation vocale.
                    N'incluez aucun caractère spécial dans vos réponses - il s'agit d'une conversation vocale.
              `;

  
  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Bonjour, commençons la session. Aujourd'hui nous allons parler de {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "multi",
    },
    voice: {
      provider: "11labs",
      voiceId: "UgBBYS2sOqTuMpoF3BR0", // Supports multiple languages
      model: "eleven_multilingual_v2",
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    }
    /*{
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    }*/,
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
      ],
    },
    // @ts-expect-error
    clientMessages: [],
    // @ts-expect-error
    serverMessages: [],
  };
  return vapiAssistant;
};