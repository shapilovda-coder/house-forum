interface CategoryCoverProps {
  title: string
  description?: string
  imageSrc: string
  imageAlt: string
  compact?: boolean
}

export default function CategoryCover({
  title,
  description,
  imageSrc,
  imageAlt,
  compact = true
}: CategoryCoverProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden mb-6 ${compact ? '' : 'mb-8'}`}>
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="aspect-video md:aspect-square relative">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Text content */}
        <div className="md:w-2/3 lg:w-3/4 p-4 md:p-6 flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h1>          
          {description && (
            <p className="text-gray-600 text-sm md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
