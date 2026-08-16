import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import { useState } from "react"

export default function Carousel({ slides }: { slides: any }) {
  const [current, setCurrent] = useState<undefined | number>();

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent((current ?? 0) - 1);
  }

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent((current ?? 0) + 1);
  }

  return (
    <div className="overflow-hidden relative">
      <div className="flex transition ease-out duration-400" style={{
        transform: `translateX(-${(current ?? 0) * 100}%)`,
      }}>
        {slides.map((s: any, index: any) => {
          return <img src={s} key={index} className="rounded-md" />
        })}
      </div>

      <div className="absolute w-full h-full top-0 justify-between items-center flex px-3 text-4xl text-white ">
        <button onClick={previousSlide}>
          <CircleArrowLeft />
        </button>
        <button onClick={nextSlide}>
          <CircleArrowRight />
        </button>
      </div>
    </div>
  )
}
