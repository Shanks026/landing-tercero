import { forwardRef } from 'react'

const base = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  ghost:   'bg-transparent hover:bg-accent hover:text-accent-foreground',
}

const sizes = {
  default: 'h-10 px-4 py-2',
  sm:      'h-9 px-3',
  lg:      'h-11 px-8',
}

export const Button = forwardRef(function Button(
  { variant = 'default', size = 'default', className = '', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})
