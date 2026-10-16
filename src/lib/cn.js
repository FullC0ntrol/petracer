// Skleja klasy CSS w jeden napis i pomija wartości „puste” (false, null, undefined, '').
// Dzięki temu można pisać warunkowo: cn('px-4', isActive && 'bg-pine', className).
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
