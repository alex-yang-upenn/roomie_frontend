'use client'

import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  src: string
  title: string
  selected: boolean
  onClick?: () => void
}

export function CategoryIcon({src, title, selected, onClick} : Props) {
  return (
    <div
      onClick={onClick}
      className={clsx("pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100",
                      {"border-black": selected, "border-white": !selected})}
    >
      <Image src={src} alt={title} width={20} height={20} />
      
      <span className="text-xs">
        {title}
      </span>
    </div>
  );
}

export default CategoryIcon