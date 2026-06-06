interface Props {
  title: string
  description: string
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3">
        <span className="text-gray-300 text-lg">∅</span>
      </div>
      <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}