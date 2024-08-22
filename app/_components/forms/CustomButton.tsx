import clsx from "clsx"

type Props = {
  label: string
  onClick: () => void
  className?: string
}

const CustomButton = ({ label, onClick, className }: Props) => {
  return (
    <div 
      className={clsx(className, "w-full py-4 bg-roomie hover:bg-roomieDark text-white text-center rounded-xl transition cursor-pointer")} 
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export default CustomButton