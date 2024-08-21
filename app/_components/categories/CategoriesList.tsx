'use client'

import getIcons from "../../_libs/getIcons"
import CategoryIcon from "./CategoryIcon"
import { ScrollMenu, VisibilityContext, publicApiType } from "react-horizontal-scrolling-menu"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import clsx from "clsx"
import React, { useContext, useTransition, useState, useEffect } from "react"
import "react-horizontal-scrolling-menu/dist/styles.css"

type Props = {
  currentCategory: string
  onClick?: (category: string) => void
}

const CategoriesList = ({ currentCategory, onClick }: Props) => {
  const [icons, setIcons] = useState<{ src: string; title: string }[]>([])
  useEffect(() => {
    const fetchIcons = async () => {
      const fetchedIcons = await getIcons()
      setIcons(fetchedIcons)
    }
    fetchIcons();
  }, []);

  const LeftArrow = () => {
    const visibility = useContext<publicApiType>(VisibilityContext)
    const [_isPending, startTransition] = useTransition()
    const isFirstItemVisible = visibility.useIsVisible("first")
    return (
      <button 
        disabled={ isFirstItemVisible }
        onClick={ () => startTransition(visibility.scrollPrev) }
        className={ clsx("cursor-pointer flex flex-col justify-center right-[1%] select-none", {"opacity-0": isFirstItemVisible, "opacity-100": !isFirstItemVisible}) }
      >
        <FaChevronLeft />
      </button>
    )
  }

  const RightArrow = () => {
    const visibility = useContext<publicApiType>(VisibilityContext)
    const [_isPending, startTransition] = useTransition()
    const isLastItemVisible = visibility.useIsVisible("last")

    return (
      <button 
        disabled={ isLastItemVisible }
        onClick={ () => startTransition(visibility.scrollNext) }
        className={ clsx("cursor-pointer flex flex-col justify-center right-[1%] select-none", {"opacity-0": isLastItemVisible, "opacity-100": !isLastItemVisible}) }
      >
        <FaChevronRight />
      </button>
    )
  }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} scrollContainerClassName="cursor-pointer pt-3 pb-6 flex items-center space-x-12 overflow-x-scroll no-scrollbar">
      {icons.map((icon) => (
        <CategoryIcon
          {...icon} 
          key={icon.title}
          selected={currentCategory==icon.title}
          onClick={onClick ? () => onClick(icon.title) : undefined}
        />
      ))}
    </ScrollMenu>
  )
}

export default CategoriesList