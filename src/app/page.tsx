import { HeroRefined } from "@/components/sections/HeroRefined"
import { SelectedWorkRefined } from "@/components/sections/SelectedWorkRefined"


// migrated project typing handled by data source

// Removed - using InteractiveProjectCard instead

export default function HomePage() {
  return (
    <>
      <HeroRefined />
      <SelectedWorkRefined />
    </>
  )
}
