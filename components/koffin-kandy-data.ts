import { newStrains } from '@/data/new-strains'

// Registers the supplied partner strain before the library builds its catalog.
if (!newStrains.some((s) => s[0] === 'Koffin Kandy')) {
  newStrains.unshift(['Koffin Kandy', 'Hybrid', 'Mass Craft Botanicals', 'Cherry · Candy · Floral'] as never)
}

export default null
