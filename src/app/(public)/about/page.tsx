import { pagesContent } from '@/shared/config/content.config'
import { CheckIcon } from '@/shared/icons/CheckIcon'

export default function AboutUsPage() {
  const { description, idea, why, features, audience } = pagesContent.about

  return (
    <div className="flex flex-col gap-8 w-full text-gray">
      <section>
        <p>{description}</p>
      </section>
      <section>
        <h3 className="text-lg mb-2 text-primary-dark">what is the idea?</h3>
        <p className="mb-2">{idea}</p>

        <ul>
          {features.map((text) => {
            return (
              <li key={text} className="flex items-center gap-2">
                <CheckIcon />
                {text}
              </li>
            )
          })}
        </ul>
      </section>
      <section>
        <h3 className="text-lg mb-2 text-primary-dark">
          who this service is for?
        </h3>
        <ul>
          {audience.map((text) => {
            return (
              <li key={text} className="flex items-center gap-2">
                <CheckIcon />
                {text}
              </li>
            )
          })}
        </ul>
      </section>
      <section>
        <h3 className="text-lg mb-2 text-primary-dark">
          why this project exists?
        </h3>
        <p>{why}</p>
      </section>
    </div>
  )
}
