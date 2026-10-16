import { cn } from '../../lib/cn.js'

const PADDINGS = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
}

// Biały „kafel” — podstawa większości bloków treści. Prop `as` pozwala wybrać znacznik
// (np. `section`, `article`), żeby wygląd nie wymuszał złej semantyki HTML.
export default function Card({ as: Component = 'div', padding = 'md', className = '', children, ...rest }) {
  return (
    <Component className={cn('rounded-2xl bg-surface shadow-card', PADDINGS[padding], className)} {...rest}>
      {children}
    </Component>
  )
}
