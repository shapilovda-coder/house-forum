import { ReactNode } from 'react'
import Link from 'next/link'

interface ArticleLayoutProps {
  children: ReactNode
  breadcrumbs: { label: string; href?: string }[]
  tag: string
  tagColor?: 'red' | 'green' | 'blue'
  date: string
  title: string
}

const tagColors = {
  red: 'bg-red-100 text-red-700',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
}

export function ArticleLayout({
  children,
  breadcrumbs,
  tag,
  tagColor = 'blue',
  date,
  title,
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Breadcrumbs */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {crumb.href ? (
                <>
                  <Link href={crumb.href} className="text-blue-600 hover:underline">
                    {crumb.label}
                  </Link>
                  <span className="mx-2">→</span>
                </>
              ) : (
                <span className="text-gray-900">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Article */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm p-6 md:p-10">
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className={`${tagColors[tagColor]} px-3 py-1 rounded-full font-medium`}>
              {tag}
            </span>
            <span>📅 {date}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>

          <div className="prose prose-lg max-w-none">{children}</div>
        </article>
      </div>
    </div>
  )
}
