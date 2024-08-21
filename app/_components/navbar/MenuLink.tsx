'use client'

type Props = {
    label: string
    onClick: () => void
}

const MenuLink = ({ label, onClick }: Props) => {
  return (
    <div 
      className="px-5 py-4 hover:bg-gray-100 transition cursor-pointer"
      onClick={onClick}
    >
     {label}
    </div>
  )
}

export default MenuLink